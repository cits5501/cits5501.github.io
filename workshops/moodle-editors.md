---
title: Writing long answers in Moodle for CITS5501 assessments
include-before: |
  ```{=html}
  <style>
  .pre-like {
    margin: 0;
    background-color: hsl(0, 0%, 98%);
    padding: 0 0.5em;
    overflow: auto;
    white-space: pre;
    font-family: Menlo, Monaco, 'Lucida Console', Consolas, monospace;
    overflow: auto !important;
  }

  figure {
    text-align: center;
  }

  img {
    border: 1px solid #888;
    border-radius: 5px;
  }        

  </style>

  ```
---

## A. Introduction

In tests or projects, you may be asked to write long-form English answers to questions.
When such a question is displayed, Moodle provides a web-based editor for you to create your answer in.
The default editor provided by Moodle is called [**Atto**][atto].

[atto]: https://docs.moodle.org/404/en/Atto_editor
[tinymce]: https://docs.moodle.org/404/en/TinyMCE_editor
[plain-text]: https://docs.moodle.org/404/en/Formatting_text#Formatting_text_options
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[markdown]: https://missing.csail.mit.edu/2020/potpourri/#markdown

It's possible to choose other editor options, however. The other options are:

[**TinyMCE editor**][tinymce]

:   This is another web-based editor, but compared to Atto, it gives you more control
    over the formatting applied to your answer. We discuss it further [below](#tinymce).

[**Authoring using a markup language**][plain-text]

:   If you select "Plain text area", then whenever a long-form answer box is presented, you
    can write your answer in a markup language such as [HTML][html] or [Markdown][markdown],
    and can decide for each individual answer which markup language you wish to use.


The Atto editor allows you to apply a range of format styles to your code (for instance,
bolding, underlining, or indentation), and to insert content such as equations, tables, and images.
Details of the formatting options Atto provides can be found
[here](https://docs.moodle.org/28/en/Text_editor#Using_a_text_editor).

## B. Writing code in the Atto editor

When writing a long English answer, you may want to include fragments of code.
In the Atto editor, the best way to do so is to select "preformatted" as the paragraph style.
Text with the "preformatted" style is displayed using a [*monospaced* font][monospace] and highlighted
in red.

[monospace]: https://en.wikipedia.org/wiki/Monospaced_font

Look at the screenshot below for how to do this.

![Selecting paragraph styles in Atto](20-atto-para-styles.png)

## C. Changing your preferred editor

You can change your preferred editor by going to *Your profile icon* > *Preferences* > *Editor preferences*,
and selecting a particular editor. Take a look at the screenshots below for how t do this.

![Moodle preference settings](05-prefs.png)

<br>

![Moodle editor preferences](10-editor-prefs.png)


## D. Writing code in the TinyMCE editor { #tinymce }

The TinyMCE editor provides more control over your text formatting than the Atto editor,
and uses a different method for inserting code fragments.

A list of all the TinyMCE features you can use is available on the [Moodle documentation
website](https://docs.moodle.org/404/en/TinyMCE_editor#Tiny_features).

To insert code fragments in TinyMCE, select the *Insert* > *code sample*
menu item.

![Code fragment insertion using TinyMCE](30-tinymce-code.png)

You will then be presented with a popup entry box in which you can write code, and can select a
language to use for syntax highlighting.
Syntax highlighting is not displayed while you write your code fragment, but *is* visible
in your final answer.

## E. Writing code using a markup language

If you select ["Plain text area"][plain-text] as your preferred editor, then whenever a
long-form entry box is displayed, you are given a choice of what markup language you wish to
write your answer in.

Explanations of the different markup languages you can use are available
[here](https://docs.moodle.org/404/en/Formatting_text).
For students who are familiar with it, [*Markdown*][markdown] is often the most convenient choice.

Markdown offers a number of advantages over other formats for writing documents:

**Simplicity**

:   Markdown's syntax is straightforward and easy to pick up -- it's modelled on the way
    people informally indicated formatting such as bold or italics in their text documents
    even before markup languages became common.

**Readability**

:   Even in its raw form, Markdown is highly readable, which is helpful when sharing code
    snippets or writing documentation that you or others might need to quickly scan without
    rendering it in a browser or editor.

**Widespread support in industry**

:   Markdown is used in many tools you'll likely encounter in both academic and professional
    settings, like [GitHub](https://github.com), [Jupyter notebooks](https://jupyter.org),
    [Discord forums](https://discord.com) and [Slack](https://slack.com/). Mastering it now
    means you'll be better prepared for collaboration and documentation tasks in the
    workplace.

**Ease of conversion**

:   Tools like [Pandoc](https://pandoc.org) allow Markdown files to be easily converted to a
    multitude of other formats, including text formats such as HTML, and binary formats such as
    PDF, Word, PowerPoint. This is especially handy when you need to submit reports or
    documents in multiple formats without rewriting them, and unlike binary formats,
    changes to Markdown files can easily be recorded in [version control][version-control]
    systems.

[version-control]: https://missing.csail.mit.edu/2020/version-control/

You can read more about how to use Markdown in Moodle [here][moodle-markdown] and
[here][moodle-markdown-adv].

[moodle-markdown]: https://docs.moodle.org/404/en/Markdown
[moodle-markdown-adv]: https://docs.moodle.org/404/en/Advanced_use_of_Markdown

<!--
  vim: syntax=markdown tw=92 :
-->
