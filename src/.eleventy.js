// .eleventy.js in the project root

const isProduction = process.env.ELEVENTY_ENV === 'production';

const { EleventyRenderPlugin } = require("@11ty/eleventy");

const nunjucks = require('nunjucks');

const yaml        = require("js-yaml");
//const pluginYamldata = require("eleventy-plugin-yamldata");

const fs          = require('fs');

// nice formatting of dates and times
const moment      = require('moment');
moment.locale('en-GB');

// css preprocessing
const CleanCSS    = require("clean-css"); //minifier
const CSSLint     = require('csslint').CSSLint;


const striptags   = require("striptags");
const stringstrip = require("string-strip-html");

const excerpt_length = 200;

const util = require('util');

function sortByDate(arr) {
  function compare( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }
  let res = arr.slice();
  res.sort(compare);
  return res;
}

function extractExcerpt(article) {

  let excerpt = null;
  let content = article._templateContent;

  if (content == null) {
    const msg = "bad article in .eleventy.js/extractExcerpt: article has no _templateContent. Probably dumped to " + dumpId;
    console.warn(msg);
    content = article.templateContent;
  }

  if (content == null) {
    const msg = "STILL bad article in .eleventy.js/extractExcerpt: article has no templateContent. Probably dumped to " + dumpId;
    console.warn(msg);
    if (true) { throw Error(msg); }
    return "```ERROR: " + msg + "```";
  }

  // some tags are stripped _with_ their content:
  excerpt = stringstrip.stripHtml(content, {
      stripTogetherWithTheirContents: [
        "script", // default
        "style",  // default
        "xml",    // default
        "sup",    // <-- custom-added
        "sub"
      ]
  }).result
    .substring(0, excerpt_length) // Cap length
    .replaceAll(/\s+/g, " ")
    .trim()
    .concat("...");
  return excerpt;
}

// return an object for passing around markdown
// utility funcs and config
function mkMarkdownConfig() {

  // adjust ugly default rendering of footnote refs:
  // adapted from https://github.com/markdown-it/markdown-it-footnote/blob/3.0.3/index.js
  function render_footnote_caption(tokens, idx/*, options, env, slf*/) {
    var n = Number(tokens[idx].meta.id + 1).toString();
    if (tokens[idx].meta.subId > 0) {
      n += ':' + tokens[idx].meta.subId;
    }
    return '' + n + '';
  }

  let markdownIt          = require("markdown-it");
  // Allow classes, identifiers and attributes in braces
  // e.g. {.class #identifier attr=value attr2="spaced value"}
  let markdownItAttrs     = require("markdown-it-attrs");
  let markdownItAnchor    = require("markdown-it-anchor");
  let markdownItDefList   = require('markdown-it-deflist');
  let markdownItDiv       = require('markdown-it-div');
  let markdownItDocutils  = require("markdown-it-docutils").docutilsPlugin;
  let markdownItFancyList = require("markdown-it-fancy-lists").markdownItFancyListPlugin;
  let markdownItFootnotes = require('markdown-it-footnote');
  let markdownItHtml      = require('markdown-it-html'); // allow html escape

  let options = {
    html: true,        // Enable HTML tags in source
    linkify: true,     // autoconvert URL-like text to links
    typographer: true  // quote beautification
  };

  let markdownLib = markdownIt(options)
                      .use(markdownItAttrs)
                      .use(markdownItAnchor)
                      .use(markdownItFootnotes)
                      .use(markdownItDefList)
                      .use(markdownItDiv)
                      .use(markdownItFancyList)
                      .use(markdownItDocutils)
                      .use(markdownItHtml)
                      .disable('code');
  markdownLib.renderer.rules.footnote_caption = render_footnote_caption

  return {
    markdownLib:  markdownLib,

    render:       (value) => markdownLib.render(value),
    renderInline: (value) => markdownLib.renderInline(value),

    safe:         (str)   => new nunjucks.runtime.SafeString(str),

    // external links. inner = inner html/markdown,
    // href = the href
    extLink:      (inner, href) =>
                      markdownLib.renderInline(`[${inner}](${href}){ target="_blank" }`)

  };
} // end mkMarkdownConfig

let markdownConfig = mkMarkdownConfig()


function stripTitle(title) {
  result = stringstrip.stripHtml(title).result
    .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
    .trim()
  return result;
}

function spannize_email(email_address) {
  let spanned = `<span>` + email_address.split(".").join(".</span><span>") + `</span>`
  return spanned;
}

function email_el(email_address, inner) {
  let obfuscated = btoa(email_address)
  return `<a href="mailto:${obfuscated}" rel="external" aria-label="email address" class="email">${inner}</a>`
};

function email_el_spannized(email_address) {
  let spanned = spannize_email(email_address)
  return email_el(email_address, spanned)
};

module.exports = function(eleventyConfig) {
  // Customizations go here

  console.log("whether using production env:", isProduction);

  ////
  // add markdown config to global data
  eleventyConfig.addGlobalData("markdownConfig", markdownConfig);

  ////
  // date plugin

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. 31 May 2019
  });

  eleventyConfig.addFilter('dateTimeReadable', date => {
    return moment(date).utc().format('LLLL'); // as above but w/ time
  });

  // for strftime-like codes, see
  // https://momentjs.com/docs/#/displaying/.
  //
  // the /date/ is what you pipe,
  // /format/ is an arg.
  eleventyConfig.addFilter('dateFormat', (date, format) => {
    return moment(date).utc().format(format);
  });



  ////
  // sort by date

  eleventyConfig.addFilter('sortByDate', arr => {
    return sortByDate(arr);
  });

  ////
  // nice legal titles
  eleventyConfig.addFilter("stripTitle", (title) => stripTitle(title));

  ////
  // page excerpts (teasers)

  //eleventyConfig.setFrontMatterParsingOptions({
  //  excerpt: true,
  //  excerpt_separator: "<!-- excerpt -->"
  //});
  //eleventyConfig.addPlugin(excerpt);
  eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  ////
  // debugging

  eleventyConfig.addFilter("stringify", function(value) {
    return JSON.stringify(value);
  });

  eleventyConfig.addFilter("inspect", function(value) {
    return util.inspect(value)
  });

  ////
  // css filters

  // actually this is just verifyinf valid syntax, rather than
  // linting. Linting warnings will be very repetitive if we re-lint the
  // same code over and over. TODO: find a way to fix this.
  eleventyConfig.addFilter("csslint", function(code, page, css_file) {
    let res = CSSLint.verify(code);
    let css_errors = res.messages.filter(msg => msg.type === "error")
    if (css_errors.length != 0) {
      let errMessage = "csslint failed to lint css from file '" + css_file + "', in page: " + util.inspect(page) +
                        ", errors were: " + util.inspect(css_errors);
      throw Error(errMessage);
    }
    //let warnMessage = "csslint warnings from file '" + css_file + "', in page: " + util.inspect(page)
    //console.warn(warnMessage, res.messages)
    return code;
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  ////
  // utility filters and shortcodes

  eleventyConfig.addFilter("initialCap", (str) =>
    str[0].toUpperCase() + str.slice(1)
  );






  eleventyConfig.addFilter("only_normal_tags", function(arr) {
    return arr.filter(el => el !== 'post' && el !== 'all');
  });

  eleventyConfig.addFilter("concatNotNull", function(arr) {
    var res = [];
    for(i = 0; i < arr.length; i=i+1) {
      if (arr[i] != null) {
        res = res.concat(arr[i]);
      }
    }
    return res;
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addGlobalData("currentDate", new Date());

  ////
  // markdown lib, shortcodes and filters

  eleventyConfig.setLibrary("md", markdownConfig.markdownLib);

  // add our own "markdownify" filters
  //
  // use paired shortcode like this:
  // `{% mdp %}some **markdown**{% endmdp %}`

  eleventyConfig.addFilter(           "md",       markdownConfig.renderInline);
  eleventyConfig.addShortcode(        "md",       markdownConfig.renderInline);
  eleventyConfig.addPairedShortcode(  "mdp",      markdownConfig.renderInline);

  eleventyConfig.addFilter(           "mdBlock",  markdownConfig.render)
  eleventyConfig.addShortcode(        "mdBlock",  markdownConfig.render);
  eleventyConfig.addPairedShortcode(  "mdpBlock", markdownConfig.render);

  // though mdpBlock is just the same as the
  // `renderTemplate "md"` paired shortcode:
  // see https://www.11ty.dev/docs/plugins/render/
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // extlink filter
  eleventyConfig.addFilter("extLink", (inner, href) => markdownConfig.extLink(inner, href));

  // email shortcodes

  // - b64 encoded href, pass in email addr
  eleventyConfig.addShortcode("email_el_spannized", (email_address) => email_el_spannized(email_address) );

  // external links. need to bracket the inner stuff. (either `(https://someurl/)`
  // or `[some_ref]`)
  eleventyConfig.addShortcode("exlink", (href, inner) =>
    `[${href}]${inner}{ target="_blank" }`
  );

  // links to materials shortcodes

  // create a "(pdf)" or "(md)" link for some resource
  // resource_type = workshop | lecture
  // format = md | pdf
  eleventyConfig.addShortcode("resourceLink", (resource_type, format, name) => {
    let url = eleventyConfig.javascriptFunctions.url,
        path = "/"
    if (resource_type == "lecture") {
      path = path + "lectures"
    } else if (resource_type == "workshop") {
      path = path + "workshops"
    } else {
      throw Exception("bad resource_type arg to shortcode 'resourceLink': " + resource_type);
    }

    path = url(path + `/${name}.${format}`);
    let result = `([${format}](${path}))`
    return result
  });

  // name = base name, e.g. workshop01 or lect03--autom
  // showSolutions = whether to include solutions
  // formats = a list, usually ["pdf", "md"]
  eleventyConfig.addShortcode("resourceList", (name, formats) => {
    let resourceLink  = eleventyConfig.javascriptFunctions.resourceLink,
        md            = eleventyConfig.javascriptFunctions.md

    if (name.startsWith("lect")) {
      let some_markdown = formats.map( format => resourceLink("lecture", format, name) ).join(" ")
      return md(some_markdown)

    } else if (name.startsWith("workshop")) {
      let some_markdown = formats.map( format => resourceLink("workshop", format, name) ).join(" ")
      return md(some_markdown)

    } else {
      throw Exception("bad 'name' argument to resourceList: " + name);
    }
  });


  /////
  // add RSS plugin
  let rssPlugin = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(rssPlugin);

  ////
  // Allow YAML data files

  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  ////
  // Copy over assets

  copy_config = {};

  // This will copy these folders to the output without modifying them at all
  // (NB: these won't get mininified, linted, etc. TODO: minify and lint them)
  var asset_dirs = ['css', 'fonts', 'images', 'js', 'lectures', 'workshops'];
  for (const dir of asset_dirs) {
    const src_dir = "/assets/" + dir;
    if (! fs.existsSync(src_dir) ) {
      console.log("warning: assets dir " + src_dir + " does not exist");
    }
    const dst_dir = dir;
    console.log("adding " + src_dir + ", dst " + dst_dir);
    copy_config[src_dir] = dst_dir;
  }

  eleventyConfig.addPassthroughCopy( copy_config );

  ////
  // post-processing:
  // - validate HTML using html tidy
  // - do markdown header navigation/permalinks
  const execa = require('execa');

  // if wanting to do postprocessing on the
  // output (e.g. adding links/anchors next to headers)
  // add them below in the spot indicated.
  //
  // We also run `tidy` to check for errors: the
  // build will fail if the HTML produced can't be parsed.

  eleventyConfig.addTransform("headernav", function(content, outputPath) {
    console.log("\nvalidating with 'tidy'. outputPath:", outputPath);

    // validate HTML output using `tidy`.
    if( this.outputPath && this.outputPath.endsWith(".html") ) {
      let outputPath = this.outputPath;
      console.log("executing 'tidy'");
      try {
        execa.commandSync('tidy -q -e -utf8', {
          timeout: 1000 * 4,
          input: content
      });
      } catch (err) {
        if (err.exitCode && err.exitCode == 0) {
          console.log("tidy: " + outputPath + " OK");
        } else if (err.exitCode && err.exitCode == 1) {
          console.log("tidy: " + outputPath + " produced warnings:", err.shortMessage);
          console.log("stderr was: ", err.stderr);
        } else {
          console.log("\n\nfailed running tidy on", outputPath, err.shortMessage );
          console.log("content start was: ",  content.substring(0, 100) );
          throw new Error('failed running tidy on ' + outputPath + ", " + err.toString(), { cause: err });
        }
      }

      const {parse, HTMLElement, TextNode}
                        = require('node-html-parser');
      const root        = parse(content, {
                            comment: true,
                            blockTextElements: {
                              script: true,
                              noscript: true,
                              style: true,
                              pre: true
                            }
                          });

      // TRANSFORMS HAPPEN HERE

      return root.toString();
    } else {
      return content;
    }
  })

  /// modify global data.
  // bit hackish - uses hardcoded port 8080
  // TODO: check actual port
  if (! isProduction) {
    eleventyConfig.addGlobalData("siteinfo.site_url", "http://localhost:8080/");
  }

  ////
  // eleventy options

  return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    dir: {
      input: "/src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "/out/_site/"
    },
    // use nunjucks for everything:
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // use this to shift base url if
    // deploying to somewhere below root (/)
    pathPrefix: isProduction ? '/' : '/'
  };
}

