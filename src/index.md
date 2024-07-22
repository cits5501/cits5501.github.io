---
title: "Welcome"
layout: page-layout.njk
customStyle: |
  ul, ol, dl, li p {
    margin: 0 0 0.70em;
  }

  .questions li {
    padding-top: 2ex;
  }

  .quicklinks-table-ctr table
  {
    width: 110%;
    transform: translateX(-5%)
  }

  .quicklinks-table-ctr td
  {
    vertical-align: top;
    padding-top: 1ex;
  }

  /* quicklinks col 1 */
  .quicklinks-table-ctr td:nth-child(1)
  {
    width: 50%;
    text-align: start;
    padding-right: 0.5em;
  }

  /* quicklinks col 2 */
  .quicklinks-table-ctr td:nth-child(2)
  {
    width: 2em;
    text-align: center;
  }

  /* quicklinks col 3 */
  .quicklinks-table-ctr td:nth-child(3)
  {
    x-padding-left: 0.4em;
    text-align: start;
  }


---

{% set help_forum = siteinfo.help_forum %}
{% set forum_url  = siteinfo.forum_url %}
{% set help5501   = help_forum | extLink(forum_url) | safe %}
{% set outline_url  = siteinfo.unit_outline_url %}

## Welcome to {{ siteinfo.unitcode }}  {{ siteinfo.unitname }}

Welcome to the website for {{ siteinfo.unitcode }}
in {{ siteinfo.year }}. Unit material (lecture slides and lab
worksheets) for this unit will be **published on these pages, and not on
the UWA Blackboard LMS**{ class="hi-pri" }; but refer to the {{ siteinfo.lms }}
for recorded lectures and the unit outline.

**Do not** rely on the [Unit Outline]({{outline_url}}) for exact
assessment due dates: dates for assessments are listed on this site on the
unit [**Schedule**](/schedule){ class="hi-pri" }
(as well as on the [**Assessments page**](/assessment){ class="hi-pri" }),
and any changes will be published here, as well as being announced
on the unit [**discussion forum**]({{forum_url}}){ target="_blank" }.

{#

_x

#}


## On this page:

- [Unit overview](#unit-overview)
- [Unit coordinator](#unit-coordinator)
- [Weekly activities](#weekly-activities)
- [Assumed knowledge](#assumed-knowledge)
- [Policies and expectations](#expectations)

## Quick links

::: { class="quicklinks-table-ctr" }

```{list-table}
- - - Want to know [**what we'll be doing**](#weekly-activities){ class="hi-pri" } and
      [**when**](/schedule){ class="hi-pri" }?
  - <i class="fa fa-arrow-circle-right"></i>
  - See below for quick details of the [**weekly
    activities**](#weekly-activities){ class="hi-pri" } for the unit,
    and see the [**Schedule**](/schedule){ class="hi-pri" } for a guide
    to what will be covered in what week. (There's also a link to the
    schedule at the top of every page.)
- - - Want to know [**if the lectures are recorded**](/faq#are-lecturers-recorded){ class="hi-pri" }?
  - <i class="fa fa-arrow-circle-right"></i>
  - See the list of [**Frequently Asked Questions**](/faq#are-lecturers-recorded){ class="hi-pri" }.
- - - Want to know [**what the assessments are**](/assessment){ class="hi-pri" }, and
      [**when they are due**](/assessment){class="hi-pri"}?
  - <i class="fa fa-arrow-circle-right"></i>
  - See the [**Assessments page**](/assessment){ class="hi-pri" }.
- - - Want to know [**what topics are examinable**](/faq#examinable-material){ class="hi-pri" }?
  - <i class="fa fa-arrow-circle-right"></i>
  - See the "[**Examinable topics**](/faq#examinable-material){ class="hi-pri" }"
    section of the [**Frequently Asked Questions page**](/faq){ class="hi-pri" }.
- - - Looking for [**lecture slides**](/resources/#lectures){ class="hi-pri" }
      or [**lab exercise sheets**](/resources/#labworkshops)?
  - <i class="fa fa-arrow-circle-right"></i>
  - You can find them on the [**Resources page**](/resources){ class="hi-pri" }.
    (There's also a link to it at the top of every page.)
- - - Want to [ask a question]{ class="hi-pri" } about the unit?
  - <i class="fa fa-arrow-circle-right"></i>
  - Check the [**Frequently Asked Questions list**](/faq), and if your question
    isn't answered there, make a post on the [**discussion forum**]({{forum_url}}){ target="_blank" }
    for the unit, [**{{help_forum}}**]({{forum_url}}){ class="hi-pri" target="_blank" } --
    that way, all students can benefit from answers to your questions. \
    (Or, if it's not a topic suitable for the forum, feel free to [email me](#unit-coordinator) instead.)
- - - Want to know what you should
      [already know](#assumed-knowledge){ class="hi-pri" }
      before taking this unit?
  - <i class="fa fa-arrow-circle-right"></i>
  - See the [**assumed knowledge**](#assumed-knowledge){ class="hi-pri" }
    for students taking this unit, below, and note that a
    prerequisite for this unit is the completion of 12 points of
    programming units.
```

:::

<!--
x**
-->


[help]: https://secure.csse.uwa.edu.au/run/help{{ siteinfo.citscode }}

------

## Unit overview

Software testing and quality assurance processes are critical to ensure
the success of software projects.
This unit covers testing and quality assurance topics including:

-  testing methods and processes
-  verification and validation of software
-  quality assurance; and
-  formal methods for design and verification.

-------

## Unit Coordinator { #unit-coordinator }

[**{{ coordinator.name }}**][coordinator-dir]{ target="_blank" }

::: { class="inline-table-ctr" }

```{list-table}
- - **Office**
  - <address>{{ coordinator.room }}</address>
- - **Email**
  - <address>{% email_el_spannized coordinator.email %}</address>
- - **Availability**
  - I work half-time at UWA, and am normally only on campus on Tuesdays,
    Thursdays, and Friday afternoon.
- - **Consultation**
  - <!--!<address>!-->Email {% email_el_spannized coordinator.email %} for an appointment,
    or visit my office between 4--5pm Thursday. Students are also
    welcome to speak to me after the lectures. At busy times of semester,
    I may need one or two business days' notice to schedule an appointment.
    <!--!</address>!-->
```

:::

[coordinator-dir]: {{ coordinator.directory }}


------

## Weekly activities

*(Note that there are no labs in week 1, beginning {{ siteinfo.semesterStartDate | dateWithDay }};
labs don't start until week 2)*{ class="hi-pri" }

**Lecture** { #lecture }

:   There is one two-hour lecture each week
    (starting in week ***one***{ class="hi-pri" }), at
    {{ siteinfo.lecture_time }} in {{ siteinfo.lecture_venue }}.

    I strongly recommend you attend lectures in person -- they
    provide the best forum for asking questions
    about the unit content and clarifying your understanding.
    Lectures are recorded, so if you cannot attend, you can also watch the recorded lecture
    ([accessible via](/faq/#accessing-lecture-recordings)
    the UWA Blackboard {{ siteinfo.lms }}).

    Lecture slides are published [here](/resources/#lectures) on this website.

**Labs**  { #labs }

:   You should attend one lab each week, starting in week
    ***two***{ class="hi-pri" }.\
    However, as long as there is room available for you, you are welcome to attend other
    sessions as well.

    One of the lab facilitators will be available
    to assist you with the lab material and answer questions.

    Please make use of the lab facilitators! One of the best ways to
    gauge how well you understand a topic, or to find out if you are
    "on the right track" for a project, is to discuss them with the lab
    facilitators.

    **Laptop requirement**{ class="hi-pri" }: You will
    need to use **your own laptop**{ class="hi-pri" } when attending
    labs (as well as for the [final exam](/assessment/#exam)). The exact
    software you should install is discussed in more detail in the
    first lab (held in week *2*) – but in general, it is possible to
    access all the languages and frameworks we will look at using only a
    web browser.

    Lab worksheets are published [here](/resources/#labs) on this website.

**Moodle exercises** { #moodle-exercises }

:   Periodically, I'll post (unassessed) exercises on the school's
    {{ siteinfo.moodle }}{{blank}} server. You can complete these in your own time, and
    they will help you improve your understanding of secure coding concepts.
    (All assessments will be completed using the Moodle server, too.) More
    information about these will be available in the first lab.

You can always get full details of lecture and lab times and venues by
visiting UWA's **[Timetable site][timetable-site]{ target="_blank" }**{ class="hi-pri" }.
(If the information for {{ siteinfo.unitcode }} is not visible, then enter "{{ siteinfo.unitcode }}" in the
box labelled "Unit search", and then click "Show timetable".)

(Note, however, that in addition to all the labs that *are* running,
the Timetable site may also show some lab sessions which are not yet
running, due to insufficient demand -- check with the Unit Coordinator
if you want to be sure whether a session is running.)

[timetable-site]: https://timetable.applications.uwa.edu.au/?selectunits={{ siteinfo.unitcode }}

### Lecture recordings

**The lectures are recorded**{ class="hi-pri" } --
see the list of [**Frequently Asked
Questions**](/faq#are-lecturers-recorded){ class="hi-pri" }.

But please note that recordings do
sometimes fail -- so if you *can* attend the lecture in-person
{# or online #}, it's recommended.

### Time required

Note that materials presented during class sessions
**<span>*do not*</span> define the whole unit**{ class="hi-pri" }.
A six-point unit is deemed to be equivalent to one quarter of a
full-time workload, so you would be expected to commit 10--12 hours
per week to the unit, averaged over the entire semester.
Outside of the contact hours (4 hours per week) for the unit, the
remainder of your time should be spent reading the recommended reading,
attempting exercises and working on assignment tasks.

### Preparing for lectures

The [**schedule**](/schedule){ class="hi-pri" }
contains the list of **recommended readings**{ class="hi-pri" } for each
topic. To gain maximum benefit from the lectures, I
recommend you review these *before* attending class.

{#

### Who'll be helping in labs { #facilitators }

Our facilitators for labs are:

- James Arcus
- Abdullah Alelyani

{% set facilitators = ['james', 'abdullah'] %}

<div style="display: flex; justify-content: space-evenly;">
{% for facilitator in facilitators %}
<figure>
<img src="{{ '/images/' + facilitator + '.jpg' | url }}" alt="{{facilitator}}" width=120px height=120px style="border-radius: 30%;">
<figcaption style="text-align: center;" >{{ facilitator | initialCap }}</figcaption>
</figure>
{% endfor %}
</div>

#}

-----

## Assumed knowledge { #assumed-knowledge }

Completion of 12 points of programming-based units is a prerequisite
for enrolling in {{ siteinfo.unitcode }}. In particular, it's assumed that you are
familiar with programming in at least one statically type-checked language
(typically either C or Java). Please let the Unit Coordinator
know as soon as possible if this is not the case.

Advisable prior study for the unit is: familiarity with a
statically-typed language (e.g. Java, C), and
CITS3301/CITS4401 Software Requirements and Design.

Some basic familiarity with testing frameworks for an OO language will be
helpful, but are not required:

- **For CITS1001/CITS2005**{ class="hi-pri" } (which uses the Java programming
  language), the relevant testing framework is [JUnit][junit]{ target="_blank" }.
  The textbook for CITS1001, [*Objects First with
  Java*][objects-first]{ target="_blank" } by Barnes and Kölling,
  contains good coverage of JUnit in Chapter 9, "Well-behaved
  objects".
- **For CITS1401**{ class="hi-pri" } (which uses the Python programming
  language), the relevant testing framework is
  [`unittest`][py-unittest]{ target="_blank" }.  The Python
  documentation contains basic examples of usage of the `unittest`
  library.

{#
  x_
#}

[junit]: https://junit.org/junit4/
[objects-first]: https://www.amazon.com.au/Objects-First-Java-Practical-Introduction-ebook/dp/B01H3UKO1E
[py-unittest]: https://docs.python.org/3/library/unittest.html

-----


{#

## Feedback survey

We want to ensure everyone enrolled in the unit is able to access
lectures, lab, and a suitable development environment in which to
complete exercises and assignments. We also want to find out what you're
finding useful (or not) about the unit.

So there is a survey for CITS2003/CITS4407 students available on the MS
Teams page for the unit -- you can also reach it by clicking
[**here**][survey-link]{ target="_blank" class="hi-pri" }. If you can
assist us by completing the survey before the end of **week 4**{:
class="hi-pri" :} (i.e., 5 pm Friday, 19 March) that would be greatly
appreciated.

[survey-link]: https://teams.microsoft.com/l/entity/81fef3a6-72aa-4648-a763-de824aeafb7d/_djb2_msteams_prefix_225387803?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3A9a6540f366aa438c8fe185aadb8cb33a%40thread.tacv2%22%7D&groupId=8c2d8b6e-4af0-457b-8094-32e95c4d6107&tenantId=05894af0-cb28-46d8-8716-74cdb46e2226

#}

## Expectations


It is expected that you will act professionally at all times, both face to face and
via electronic media.
Please see the [UWA Code of Conduct][code-of-conduct], which is founded on
the [UWA Code of Ethics][code-of-ethics].

It is also expected that you act ethically in your studies.
You will have completed the [Academic Conduct Essentials][acad-essentials]
unit, which explains what is appropriate and inappropriate academic
conduct.

[code-of-conduct]: https://www.hr.uwa.edu.au/policies/policies/conduct/code/conduct
[code-of-ethics]: https://www.hr.uwa.edu.au/policies/policies/conduct/code/ethics
[acad-essentials]: https://www.uwa.edu.au/library/find-resources/ace

It is expected that you regularly (at least twice a week) check
the [**discussion forum**]({{forum_url}}){ target="_blank" }
for the unit
([**{{help_forum}}**]({{forum_url}}){ class="hi-pri" target="_blank" })
for announcements. {#
  x**
#}
(You can also [set up an email subscription][subscription] to the discussion forum
as follows -- see the [FAQ page][subscription] for details.)

[subscription]: /faq/#forum-subscriptions

It is expected that you keep [reliable backups][backups] of your work,
as computer and/or IT failures are [not grounds][no-it-failures] for special
consideration.

[backups]: /faq/#backups
[no-it-failures]: https://www.uwa.edu.au/students/My-course/Exams-assessments-and-results/Special-consideration#:~:text=computer%20and%2For%20IT%20failure


## Policies

Before undertaking this unit,
students are strongly encouraged to read the university policies that apply
to this unit:

- UWA's [Policy on Assessment][assessment-policy]{ target="_blank" }
- UWA's [charter of student rights and responsibilities][charter]{ target="_blank" }
- UWA's [Policy on Academic Integrity][academic-conduct]{ target="_blank" }

{#
    x_
#}


[charter]: https://www.uwa.edu.au/policy/-/media/Project/UWA/UWA/Policy-Library/Policy/Student-Administration/Student-Right-and-Responsibilities/Student-Rights-and-Responsibilities.doc
[assessment-policy]: https://www.uwa.edu.au/policy/home#f04e905d-06fd-4c3b-944e-c8cc1c5bd829=null&policy-search_q=assessment&policy-search_e=0
[academic-conduct]: https://www.uwa.edu.au/policy#faq-c3b2aea7-22c7-4991-81b5-4bf2698aa83e


<!--
  vim: tw=72
-->
