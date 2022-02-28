
FROM adstewart/eleventy:1.0.0

RUN \
  cd /opt/site && \
  npm install --save-dev \
    clean-css                     \
    csslint                       \
    eleventy-plugin-excerpt       \
    @11ty/eleventy-plugin-rss     \
    markdown-it-deflist           \
    markdown-it-div               \
    markdown-it-docutils          \
    markdown-it-fancy-lists       \
    markdown-it-footnote          \
    markdown-it-html              \
    moment                        \
    string-strip-html@8.3.0       \
    striptags

# markdown-it-html:
# source repo is: https://github.com/Akimyou/markdown-it-html/
