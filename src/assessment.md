---
title: "Assessment"
layout: page-toc-layout.njk
customStyle: |
  ul, ol, dl, li p {
    margin: 0 0 0.70em;
  }

  /* small */
  @media (max-width: 767px) {
    .assessment-table-ctr {
      width: 100%;
      overflow-x: scroll;
    }

    .assessment-table-ctr table {
      width: 110%;
      min-width: 500px;
    }
  }
  /* big */
  @media (min-width: 768px) {
    .assessment-table-ctr table {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .assessment-table-ctr th {
    background-color: var(--accent-v-v-light);
  }

  .assessment-table-ctr table {
    border-bottom: 1pt solid black;
    border-collapse: collapse;
  }

  .assessment-table-ctr th {
    text-align: center;
    border-top: 1pt solid black;
    border-bottom: 1pt solid black;
  }

  .assessment-table-ctr th,
  .assessment-table-ctr td
  {
    padding-top: 1ex;
    padding-left: 1em;
    padding-right: 1em;
    vertical-align: top;
  }

  /* col 1 */
  .assessment-table-ctr td:nth-child(1)
  {
    text-align: left;
    width: 24%;
  }

  /* col 2 */
  .assessment-table-ctr td:nth-child(2)
  {
    text-align: right;
    padding-right: 3em;
    width: 18%;
  }

  /* col 3 */
  .assessment-table-ctr td:nth-child(3)
  {
    text-align: left;
    width: 40%;
    padding-left: 2em;
  }


  /* col 4 */
  .assessment-table-ctr td:nth-child(4)
  {
    text-align: left;
    padding-left: 3em;
    width: 18%;
  }

  .resource-list > ul > li {
    padding-top: 0.2ex;
    padding-bottom: 0.5ex;
  }


---

{% set csmarks_url = siteinfo.csmarks_url %}
{% set cssubmit_url = siteinfo.cssubmit_url %}

{% set help_forum = siteinfo.help_forum %}
{% set forum_url  = siteinfo.forum_url %}

## About the unit assessments

### What are the assessment items, when are they due, and what are they worth?

The assessment for {{ siteinfo.unitcode }} consists of
an online quiz, a mid-semester take-home test, a project,
and a final examination.


::: { class="assessment-table-ctr" }

```{list-table}
:header-rows: 1
- {%- for header_item in siteinfo.assessment_table.header %}
  - {{ header_item }}
  {%- endfor %}
{%- for row in siteinfo.assessment_table.body %}
- {%- for el in row %}
  - {{ el }}
  {%- endfor %}
{%- endfor %}
```

:::

Assessments will be due at **11:59 pm**{ class="hi-pri" } on
<span
 class="tooltip"
 data-tooltip-text="Then if submission fails, there's a weekday left to contact the UC and fix it.">
**Thursdays**{ class="hi-pri" }</span>.
Any changes to the due date will be announced in the
[**{{help_forum}}**]({{forum_url}}){ class="hi-pri" target="_blank" }
help forum,
as well being noted on this website.

<!--

_x

-->

**Do not**{ class="hi-pri" } rely on the [Unit Outline]({{outline_url}})
for exact
assessment due dates -- the software used to generate the unit outlines
is known to be buggy, and may insert incorrect due dates.
Instead, use the assessment dates published here (also available from
the [**Schedule**](/schedule){ class="hi-pri" }).
Any changes will be published here, as well as being announced
on the unit [**discussion forum**]({{forum_url}}){ target="_blank" }.

<!--

x_

-->

Online quizzes, tests and exams **must**{ class="hi-pri" } be submitted by the
due date and time – this will be enforced strictly (just as it is for
face-to-face tests and exams), and late submissions will receive a mark
of 0. It is your responsibility to ensure you submit by the due date and
time -- even if you think a website such as Moodle will not stop you
from making a late submission.

[No extensions are permitted](/faq#extensions){ class="hi-pri" }
for quizzes and tests: they must be
done on the dates specified (just as for face-to-face tests and exams).
For more details, see [**"Can I get an extension on the deadline for an
assessment?"**](/faq#extensions){ class="hi-pri" } in the unit FAQ.

Your submitted work or answers for any assessment item
[may be submitted](/faq#plagiarism-checks) to plagiarism detectors
such as `JPlag`, `moss` or `turnitin` to detect plagiarism.

The quizzes, tests and exam do contain theoretical questions, but are
also intended to assess *practical* skills and knowledge.
They're not completed on paper, but instead on your own computer,
and they may ask you to write compileable and executable code.

### Common questions about assessments { #assessment-faqs # }

Several common questions about assessment are answered on the
unit [**FAQ**](/faq){ class="hi-pri" } (Frequently Asked Questions) page.

These include the following:

- [What material is examinable/testable?](/faq#examinable-material)
- [What are the expectations regarding citation of sources/academic
  conduct?](/faq#source-citation-conduct-expectations)<br>
  (In brief: abide by UWA's academic conduct policy; be careful not to
  plagiarize.)
- [What is the marking rubric for assessments?](/faq#marking-rubric)
- [Are the quizzes/tests/exams open book?](/faq#test-conduct)


## Assessment item details


### Week 4 quiz

- This quiz will be available on {{ siteinfo.moodle }}.

<!--!
<details>
<summary>Quiz details (click to expand)</summary>
<div style="border: inset 5pt var(--accent-v-light); margin: 2em; padding: 1em; border-radius: 5pt;">
!-->


- Ensure you leave at least 1-2 hours available in which to complete it.
  If you wait until 2 hours before the due time, and
  don't complete it, you will be awarded 0 marks for incomplete
  questions.
- The quiz will need to
  be completed in one sitting, and students are allowed only one attempt
  at it. There is a time limit of 2 hours (though the quiz should take
  less than that).
- Once you've started the quiz, it's best not to leave your browser
  or computer unattended -- the quiz may time out, or the browser
  may refresh, and Moodle may record you as not having completed
  the quiz.
- The quiz is open-book; you can ***look at*** any book, website or
  software you like. However, the answers must be your own work (not that
  of anyone else) and in your own words, and you must not distribute your answers to other
  people.
- Ensure you have a good Internet connection when sitting the quiz -- you
  should sit it either on a UWA lab computer, or at home, but not using
  WiFi or a mobile device, as these could drop out part-way through.
- If you use a WiFi or mobile connection and it fails, you won't be
  given extra time to complete the quiz.
  If for some reason you can't access the quiz on {{ siteinfo.moodle }}, email me
  immediately from your University email account with a screenshot or
  photo showing the problem.
- Once you've finished the quiz, **take and keep** a
  **screenshot** of your completed attempt.

<!--!
</div>
</details>
!-->


### Mid-semester test { #mid-sem-test }

The week 7 mid-semester test will be made available
in week 7 on
{{ siteinfo.moodle }}, under "Week 7 mid-semester test". You will have 24
hours to complete the test, and
should submit it via {{ siteinfo.moodle }}.

The same instructions apply to the mid-semester test as for the week 4
quiz.

### Project

The project for the unit, worth
{{ siteinfo.assessments.project.marksPercent }}%
of the unit's marks, is due on
{{ siteinfo.assessments.project.dates.due | dateFormat("dddd D MMM") }}.

It is to be completed individually.

It includes both programming work and written work. Students may make
*look at* any texts or online materials they wish, but any work must
be their own, and in their own words.
As with all open assessments – any
statistical anomalies will be investigated, and anybody may be asked
to (orally)
[explain their thought process]{ class="hi-pri" } in coming up with their
answers.

The following project resources are available for you:

::: { .resource-list }

- The project description [(PDF)][proj-pdf] [(markdown)][proj-md] (**Revised 9 Oct 2024, 14 Oct 2024**)
- [Source code for the project][proj-code]
- A testing area on {{ siteinfo.moodle }}, where you can run several (very basic)
  tests on your submitted project answers. Note that passing these tests is no guarantee of
  a good mark -- they verify only that your project meets minimum standards for
  a submission.
- An EBNF parsing command-line tool for Linux:
  <a href="{{ "/project/ebnf-parse.tgz" | url }}" onclick="ga('send', 'event', 'download', 'download_clicked', 'ebnf-parse_tgz');">ebnf-parse.tgz</a> \
  This should run on almost any x86-64 Linux system. Un-tar the executable
  and run `./ebnf-parse -h` for options. A `man` page (in `man` and Markdown
  formats) explaining the use is contained in the tar file.

:::

[proj-md]: {{ "/project/project-spec.md" | url }}
[proj-pdf]: {{ "/project/project-spec.pdf" | url }}
[proj-code]: {{ "/project/system-code.zip" | url }}
[proj-tgz]: {{ "/project/ebnf-parse.tgz" | url }}


{#

Please note that [revisions were
made]{ style="color: #B72240;" }  to the project on 9th May
and 12th May -- make sure you're working from the most up-to-date
version. Announcements about revisions were posted in the
[Help5501][help5501] forum.

[help5501]: {{ forum_url }}

### Model solutions

**Update**{ style="color: #B72240;" }: Sample solutions are available
[**here**][project-solutions]{: class="hi-pri" :} (PDF file).

[project-solutions]: {{ "/assignments/project-solutions.pdf" | url }}

[csmarks]: https://secure.csse.uwa.edu.au/run/csmarks

#}

### Exam

The
exam is a [**face-to-face**]{ class="hi-pri" }, paper-based exam, held during
the UWA examination period. For the exact time and venue, consult
your exam timetable using StudentConnect.

The exam is *not* open book.
You are permitted to bring into the exam one A4, double-sided page of notes (handwritten or
typed).


#### Past exam papers

For revision purposes, you may find it useful to look at some older paper-based exams, which
are available via the {{ siteinfo.lms }} -- look under "Previous exams".
These exam papers are provided only to CITS5501 students for study purposes, and may not be
published or distributed elsewhere.

(Note that although the UWA Library's ["OneSearch" search][onesearch] facility lists some
past exams as being available via OneSearch when "CITS5501" is entered as a query, the
content of the unit has changed significantly since they were released, and they are no
longer a good guide to what you can expect.)

The best use of past exams is for your practice purposes -- if possible, try writing answers
and timing how long you take. I do *not* publish answers to past exams for two reasons:

- For many of the questions, there *is* no one correct answer.
  The exam questions often require you to analyse a scenario and argue
  in favour of a particular decision or test design. Questions
  like this are assessed on your ability to identify relevant
  factors and justify a decision/conclusion, and not on whether you
  have mentioned particular things in your answer.
- Providing an "answer" often encourages students to
  think that if they have read through the answers and understood it,
  they have revised well for the exam. This is not correct!
  You need to actually go through the process of writing
  an answer yourself.

However, if you have attempted a previous year's exam, I encourage you to discuss your
answers with me in order to get feedback.
See ["Are past exams available?"](/faq#past-exams-availability) in the unit FAQ.

[onesearch]: https://onesearch.library.uwa.edu.au/

<!--
  vim: tw=92
-->
