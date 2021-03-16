---
title: "CITS5501 Software Testing and Quality Assurance"
layout: default
---

<style>

ul, ol, dl, li p {
  margin: 0 0 0.70em;
}
</style>

## Welcome to {{ site.data.globals.unitcode }}

Welcome to the website for {{ site.data.globals.unitcode }}
in {{ site.data.globals.year }}. **All material (lectures, workshops,
assignments) for this unit will be published on these pages, and not on
the LMS**{: class="hi-pri" :} -- with the exception of recorded lectures
and the unit outline (which are available through the
[LMS][lms]{: target="_blank" :} ).

[lms]: https://lms.uwa.edu.au

See below for quick details of the
[**weekly activities**](#weekly-activities){: class="hi-pri" :}
and
[**assessment**](#assessment){: class="hi-pri" :}
for the unit.

<!--
, as well as [who will be facilitating](#facilitators) the labs/workshops.
-->

The prerequisites for this unit are 12 points of programming units --
please note the [**assumed knowledge**](#assumed-knowledge){: class="hi-pri" :} for students taking this unit, below.

At the top of the page, you should find links that
give you more detail on the
[**schedule**](schedule){: class="hi-pri" :} of topics
covered and the online
[**resources**](resources){: class="hi-pri" :}
available to you (including lecture slides and lab/tutorial exercise
sheets).

If you have queries regarding the unit, a good place to ask them is
on the [**discussion forum**][help]{: target="_blank" :}
for the unit, [help{{ site.data.globals.citscode }}][help]{: class="hi-pri" target="_blank" :} --
that way, all students can benefit from answers to your questions.

[help]: https://secure.csse.uwa.edu.au/run/help{{ site.data.globals.citscode }}

#### Overview

Software testing and quality assurance processes are critical to ensure
the success of software projects.
This unit covers testing and quality assurance topics including:

{:start="1"}
1.  test processes – unit, integration, system, performance,
    acceptance, and installation tests;
1.  testing methods – code inspections, equivalence class tests, path testing
    and use case tests;
1.  verification and validation of software – inspections, test case design and
    execution, test metrics;
1.  quality assurance – ISO 9001 and CMMI standards, configuration management,
    process modelling, usability, complexity and process metrics, project and
    risk management, and reliability modelling; and
1.  formal methods for design and verification.

#### Unit Coordinator

[**{{ site.data.coordinator.name }}**][coordinator-dir]{: target="_blank" :}  

| **Office** |{{ site.data.coordinator.room }}
| **Email** | {{ site.data.coordinator.email | unescape }}
| **Availability** | I am at UWA (physically or virtually) on Tuesdays, Thursdays and Fridays. 
| **Consultation** | {{ site.data.coordinator.consultation | unescape }} 
{: class="inline-table"}

[coordinator-dir]: {{ site.data.coordinator.directory }}

#### Textbook

You will need access to the following:

{:start="1"}
1.  Ammann and Offutt,
    [*Introduction to Software Testing*][ammann-text]{: target="_blank" :},
    2nd ed, Cambridge University Press, 2016
1.  Either of:

    -   Pressman,
        [*Software Engineering: A Practitioner's Approach*][pressman-text]{: target="_blank" :},
        9th ed., 2019 **<span>*OR*</span>**
    -   Sommerville,
        [*Software Engineering*][sommerville-text]{: target="_blank" :},
        10th ed., Addison Wesley, 2015.

    &nbsp;\
    Earlier editions should be fine as well.

[ammann-text]: https://www.amazon.com/Introduction-Software-Testing-Paul-Ammann/dp/1107172012
[pressman-text]: https://www.amazon.com.au/ISE-Software-Engineering-Practitioners-Approach/dp/1260548007/
[sommerville-text]: https://www.amazon.com.au/Software-Engineering-Global-Ian-Sommerville/dp/1292096136/

The [UWA library][library]{: target="_blank" :} has copies of all of
these (some online). You can access the library's holdings of the
recommended texts [here][unit-texts]{: target="_blank" :}. There are
also extracted readings from several texts available
[here][unit-extracts]{: target="_blank" :}.

[library]: https://www.uwa.edu.au/library/home
[unit-texts]: http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11016332950002101
[unit-extracts]: http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11308340080002101

------

#### Weekly activities

- There is one two-hour lecture each week (starting <span>week one</span>{: class="hi-pri" :}). You should either attend in person,
  attend online (we will use Zoom), or watch the recorded lecture.
- You should attend one lab/workshop each week, starting in week
  ***two***{: class="hi-pri" :}.
  If there is room available for you, you are welcome to attend other
  lab sessions as well.

Currently, there are labs on Tuesdays, Wednesdays and Thursdays, all in the
CSSE building. You can get full details of times and venues by
visiting UWA's **2021 Timetable site**{: class="hi-pri" :} at
**<https://timetable.applications.uwa.edu.au/>** -- enter "CITS5501" in the
box labelled "Unit search", and then click "Show timetable".

**The lectures are recorded**{: class="hi-pri" :}, and will be
available via the LMS.

Note that materials presented during class sessions
**<span>*do not*</span> define the whole unit**{: class="hi-pri" :}.
A six-point unit is deemed to be equivalent to one quarter of a
full-time workload, and so you will be expected to commit 10--12 hours
per week to the unit, averaged over the entire semester.
Outside of the contact hours (3 hours per week) for the unit, the
remainder of your time should be spent reading the recommended reading,
attempting exercises and working on assignment tasks.

The [**schedule**](schedule){: class="hi-pri" :}
contains the list of **recommended readings**{: class="hi-pri" :} for each
topic. To gain maximum benefit from the lectures and workshops, I
recommend you at least review these *before* attending class.

-----

#### Assumed knowledge

Completion of 12 points of programming-based units is a prerequisite
for enrolling in CITS5501. In particular, it's assumed that you are
familiar with programming in at least one object-oriented language
(typically either Python or Java).

Some basic familiarity with testing frameworks for that language will be
helpful.
For CITS1001 (which uses the Java programming language), the relevant
testing framework is [JUnit][junit]{: target="_blank" :}. The textbook
for CITS1001,
[*Objects First with Java*][objects-first]{: target="_blank" :} by Barnes and Kölling,
contains good coverage of JUnit in Chapter 9, "Well-behaved objects".

For CITS1401 (which uses the Python programming language), the relevant
testing framework is [`unittest`][py-unittest]{: target="_blank" :}. The Python
documentation contains basic examples of usage of the `unittest`
library.

[junit]: https://junit.org/junit4/ 
[objects-first]: https://www.amazon.com.au/Objects-First-Java-Practical-Introduction-ebook/dp/B01H3UKO1E
[py-unittest]: https://docs.python.org/3/library/unittest.html

-----

#### Assessment

{{ site.data.globals.assessment | unescape }} See the
[Assessment]({{ "/assets/css/responsive-nav.css" | relative_url }})
page for further details.

| Assessment | % of final mark | Assessment Dates
|-
| [Project]({{"/assessment#project"| relative_url }}) | {{ site.data.globals.projmarks }}% | week 12
| [Short assessment (quiz or exercise)]({{"/assessment#quiz"| relative_url }}) | {{ site.data.globals.wkmarks }}% | weeks 3, 6, 9
| [Examination]({{"/assessment#exam"| relative_url }}) | {{ site.data.globals.exammarks }}% | June examination period
{: class="csse-table" style="width: 80%; text-align: center;" }

{{ site.data.globals.submission | unescape }} As the
semester proceeds, your marks will be updated and recorded in
[csmarks][csmarks]{: target="_blank" :}.

[cssubmit]: https://secure.csse.uwa.edu.au/run/cssubmit
[csmarks]: https://secure.csse.uwa.edu.au/run/csmarks

#### Who'll be helping in labs/workshops {#facilitators}

- Anna Taleb-Bendiab
- Manou Rosenberg

## Feedback survey

We want to ensure everyone enrolled in the unit is able to access
lectures, lab/workshops, and a suitable Java development environment in which to
complete exercises and assignments. We also want to find out what you're
finding useful (or not) about the unit.

So there is a survey for CITS2003/CITS4407 students available on the MS
Teams page for the unit -- you can also reach it by clicking
[**here**][survey-link]{: target="_blank" class="hi-pri" :}. If you can
assist us by completing the survey before the end of **week 4**{:
class="hi-pri" :} (i.e., 5 pm Friday, 19 March) that would be greatly
appreciated.

[survey-link]: https://teams.microsoft.com/l/entity/81fef3a6-72aa-4648-a763-de824aeafb7d/_djb2_msteams_prefix_225387803?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3A9a6540f366aa438c8fe185aadb8cb33a%40thread.tacv2%22%7D&groupId=8c2d8b6e-4af0-457b-8094-32e95c4d6107&tenantId=05894af0-cb28-46d8-8716-74cdb46e2226

## Policies

Before undertaking this unit,
students are strongly encouraged to read the university policies that apply
to this unit:

- UWA's [University charter of student rights and responsibilities][charter]{: target="_blank" :}
- UWA's [Policy on Assessment][assessment-policy]{: target="_blank" :} -- particularly &sect;10.2 <i>Principles of submission and penalty for late submission</i>,
- UWA's [Policy on Academic Conduct][academic-conduct]{: target="_blank" :}

[charter]: https://www.uwa.edu.au/policy/-/media/Policy/Policy/Student-Administration/Charter-of-Student-Right-and-Responsibilities/Charter-of-Student-Rights-and-Responsibilities.doc
[assessment-policy]: https://www.uwa.edu.au/policy/-/media/Policy/Policy/Teaching-and-Research-Training/Learning-and-Teaching/Assessment/Assessment-Policy.doc
[academic-conduct]: https://www.uwa.edu.au/policy/-/media/Policy/Policy/Student-Administration/Academic-Conduct/Academic-Conduct-Policy.doc

<!--
  vim: tw=72
-->
