---
title: "Assessment"
layout: page-layout.njk
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
---

{% set csmarks_url = siteinfo.csmarks_url %}
{% set cssubmit_url = siteinfo.cssubmit_url %}


The assessment for {{ siteinfo.unitcode }} consists of
two short assessments (online quiz or written exercise), a project,
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

## Week 3 quiz

- This quiz will be available on the {{ siteinfo.lms }}.


<!--!
<details>
<summary>Test details (click to expand)</summary>
<div style="border: inset 5pt var(--accent-v-light); margin: 2em; padding: 1em; border-radius: 5pt;">
!-->


- Ensure you leave at least 1-2 hours available in which to complete it.
  If you wait until 2 hours before the due time, and
  don't complete it, you will be awarded 0 marks.
- The quiz is not timed, and there is no time limit, but it will need to
  be completed in one sitting, and students are allowed only one attempt
  at it.
- Once you've started the quiz, it's best not to leave your browser
  or computer unattended -- the quiz may time out, or the browser
  may refresh, and LMS will record you as not having completed
  the quiz.
- You will not be able to correct your answer to a question once you
  have answered it.
- The quiz is open-book; you can make use of any book, website or
  software you like, but the answers must be your own work (not that
  of anyone else), and you must not distribute your answers to other
  people.
- Questions may be drawn from any content contained in lectures, lecture
  slides, lab/workshop exercises or assigned readings up until the end
  of week 2, or may require
  you to make reasonable inferences from that material or to investigate
  questions arising from that material.
- Ensure you have a good Internet connection when sitting the quiz -- you
  should sit it either on a UWA lab computer, or at home, but not using
  WiFi or a mobile device, as these could drop out part-way through.
- If you use a WiFi or mobile connection and it fails, you won't be
  given extra time to complete the quiz.
  If for some reason you can't access the quiz on the LMS, email me
  immediately from your University email account with a screenshot or
  photo showing the problem.

<!--!
</div>
</details>
!-->

## Week 7 exercise

The week 7 exercise will be made available
early in week 7 on the
{{ siteinfo.lms }}, under "Week 7 Exercise".

The exercise should not take long to do -- only brief answers
(a paragraph or two for each question) are expected. It is to
be done individually, but you may make use of any
textbooks, slides or similar resources you like.

The questions contained in the exercise should be
good practice for the [exam](#exam).

{#

The marking rubric is available [here][exercise-rubric] (PDF).

[exercise-rubric]: {{ "/workshops/exercise-rubric.pdf" | url }}

#}

## Project

The project for the unit, worth
{{ siteinfo.assessments.project.marksPercent }}%
of the unit's marks is due on
{{ siteinfo.assessments.project.dates.due | dateFormat("dddd D MMM") }}.

It will include both programming work and written work, plus an oral component.
Students will be required to book a short (less than 10 mins) meeting
(either face-to-face or via MS Teams) with a marker,
where they should expect to answer some basic questions about their project
and receive some feedback.

{#

The details are available [here][project-pdf] (PDF)

[project-pdf]: {{ "/workshops/project.pdf" | relative_url }}

Sample solutions are available
[**here**][project-solutions]{: class="hi-pri" :} (PDF file).

[csmarks]: https://secure.csse.uwa.edu.au/run/csmarks
[project-solutions]: {{ "workshops/project-solutions.pdf" | relative_url }}

#}


## Exam

The exam is a take-home exam, so open-book and not invigilated.

To maintain exam integrity, students may be selected for a short (less than 10 mins)
follow-up meeting (either face-to-face, or via MS Teams) with a marker,
where they should expect to answer some basic questions about their exam responses.

### Past exam papers

Exam papers from several previous years are available
via the {{ siteinfo.lms }} -- look under "Previous exams".
These exam papers are provided only to CITS5501 students for study
purposes, and may not be published or distributed elsewhere.

(Note that although the UWA Library's ["OneSearch" search][onesearch]
facility lists some past exams as being available via OneSearch
when "CITS5501" is entered as a query, the content
of the unit has changed significantly since they were
released, and they are no longer a good guide to what you can
expect.)

The best use of past exams is for your practice purposes --
if possible, try writing answers and timing how long you
take. I do *not* publish answers to past exams
for two reasons:

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

However, if you have attempted
a previous year's exam, I encourage you to drop in
during my
[**consultation time**]({{ "/#unit-coordinator" | url }})
(or make an appointment with me)
during weeks 11--13,
and I can provide feedback on your answers.

[onesearch]: https://onesearch.library.uwa.edu.au/

<!--
  vim: tw=72
-->
