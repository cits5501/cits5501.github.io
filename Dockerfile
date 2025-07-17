FROM adstewart/eleventy:1.0.0

WORKDIR /opt/site

COPY package.json package-lock.json ./

RUN \
  cd /opt/site && \
  npm install

# --save-dev \
# clean-css@=5.3.2                   \
# csslint@^1.0.5                     \
# eleventy-plugin-excerpt@^1.1.2     \
# eleventy-plugin-toc@^1.1.5         \
# @11ty/eleventy-plugin-rss@^1.2.0   \
# markdown-it-bracketed-spans        \
# markdown-it-deflist@^2.1.0         \
# markdown-it-div                    \
# markdown-it-docutils               \
# markdown-it-fancy-lists@=1.2.3     \
# markdown-it-footnote@^3.0.3        \
# markdown-it-html                   \
# markdown-it-katex                  \
# luxon@=3.4.3                       \
# moment@=2.29.4                     \
# string-strip-html@=8.3.0           \
# striptags

WORKDIR /app

# markdown-it-html:
# source repo is: https://github.com/Akimyou/markdown-it-html/

