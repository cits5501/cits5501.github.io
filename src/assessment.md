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
two online quizzes, a group project, and a final examination.


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



<!--

_x

-->


<!--

x_

-->


Your submitted work or answers for any assessment item
[may be submitted](/faq#plagiarism-checks) to plagiarism detectors
such as `JPlag`, `moss` or `turnitin` to detect plagiarism.

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

Additional details of assessments will be published here throughout the course
of the semester.

{# 

### Quiz 1

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


### Quiz 2

The week 7 mid-semester test will be made available
in week 7 on
{{ siteinfo.moodle }}, under "Week 7 mid-semester test". You will have 24
hours to complete the test, and
should submit it via {{ siteinfo.moodle }}.

The same instructions apply to the mid-semester test as for the week 4
quiz.

#}

### Group project (phase 1)

Details of phase 1 of the group project are now available.

Tasks and information about the project are specified in a GitHub repository
[here](https://github.com/cits5501/Group-Project-Information-2025/). The information
provided includes the [project specification][project-spec] (PDF) and marks breakdown.

Also provided is a GitHub repository containing [scaffolding code][scaff] for the project.

[project-spec]: https://github.com/cits5501/Group-Project-Information-2025/blob/main/project-spec-2025-phase-1.pdf?raw=true
[scaff]: https://github.com/cits5501/project-2025-phase-1-scaffolding


{#

### Exam

The
exam is a [**face-to-face**]{ class="hi-pri" }, paper-based exam, held during
the UWA examination period. For the exact time and venue, consult
your exam timetable using StudentConnect.

The exam is *not* open book.
You are permitted to bring into the exam one A4, double-sided page of notes (handwritten or typed).


#### Past exam papers

For revision purposes, you may find it useful to look at some older paper-based exams, which
are available via the {{ siteinfo.lms }} -- look under "Previous exams".
These exam papers are provided only to CITS5501 students for study purposes, and may not be
published or distributed elsewhere.

(Note that although the UWA Library's ["OneSearch" search][onesearch] facility lists some
past exams as being available via OneSearch when "CITS5501" is entered as a query, the
content of the unit has changed significantly since they were released, and they are no
longer a good guide to what you can expect.)

The best use of past exams is for your practice purposes -- if possible, try writing answers,
 timing how long you take, and working with a study partner to compare answers.

[onesearch]: https://onesearch.library.uwa.edu.au/

#}

<!--
  vim: tw=92
-->
