---
title: "CITS5501 Software Testing and Quality Assurance"
layout: default
---

<style>

ul, ol, dl, li p {
  margin: 0 0 0.70em;
}
</style>

### Welcome to CITS5501

Welcome to the website for {{ site.data.globals.unitcode }}
in {{ site.data.globals.year }}. **All material (lectures, workshops,
assignments) for this unit will be published on these pages, and not on
the LMS**{: class="hi-pri" :} -- with the exception of recorded lectures
and the unit outline (which are available through the LMS).

See below for details of the [**textbook**](#textbook){: class="hi-pri" :},
the [**weekly timetable**](#weekly-timetable){: class="hi-pri" :}
for the unit,
[**assumed knowledge**](#assumed-knowledge){: class="hi-pri" :} for
students taking this unit, and
[**assessment**](#assessment){: class="hi-pri" :} details.

A link to the [**schedule**](schedule){: class="hi-pri" :} of topics
covered can be found on the left sidebar, as well as a link to the
[**Materials and reading**](resources){: class="hi-pri" :} section of the
website, where lecture slides and workshop exercise sheets will go up.
The schedule includes a list of *recommended readings* for each topic.
To gain maximum benefit from the lectures and workshops, I recommend you
at least review these *before* attending class.

If you have queries regarding the unit, a good place to ask them is
on the [**discussion forum**][help5501]
for the unit, [help5501][help5501]{: class="hi-pri" target="_blank" :} --
that way, all students can benefit from answers to your questions.

[help5501]: https://secure.csse.uwa.edu.au/run/help5501

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

[**Arran Stewart**][arran-stewart]{: target="_blank" :}  
Rm G.08m, CSSE Building  
**Email:** <span>arran.stewart</span>@<span>uwa.edu.au</span>

**Consultation:** TBA, or email
<span>arran.stewart</span>@<span>uwa.edu.au</span> for an appointment.  
Students are also welcome to speak to me after
the lectures.  

[arran-stewart]: https://directory.uwa.edu.au/view?dn=cn%3DArran+Stewart%2Cou%3DComputer+Science+and+Software+Engineering%2Cou%3DSchool+of+Physics\2C+Mathematics+and+Computing%2Cou%3DFaculty+of+Engineering+and+Mathematical+Sciences%2Cou%3DFaculties%2Co%3DThe+University+of+Western+Australia

#### Textbook

You will need access to the following:

1.  Ammann and Offutt,
    [*Introduction to Software Testing*][ammann-text]{: target="_blank" :},
    2nd ed, Cambridge University Press, 2016
2.  Either of:

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

#### Weekly timetable

There are two 1-hour lectures each week
(starting <span>week 1</span>{: class="hi-pri" :}), and a 1-hour workshop
(starting <span>week 2</span>{: class="hi-pri" :}).
**The lectures are recorded**{: class="hi-pri" :}, and will be
available via the LMS. 

The timetable for CITS5501 is available
[here][timetable-link]{: target="_blank" :}. Lectures
are in the CSSE seminar room (1.24), and workshops in lab 2.01.

Note that lab 2.01 is booked for the use of CITS5501 for two hours.
The *second* hour (10am–11am) is when workshop/seminar work
will be done, but you
are welcome to make use of the lab earlier as well. If demand requires
it, we'll run repeat sessions of the workshops.

[timetable-link]: http://timetable.applications.uwa.edu.au/?selectunits=CITS5501

It's recommended that you review the relevant textbook chapters for
lectures *before* attending the lecture. For a detailed schedule, see the links
in the left sidebar.

**Workshops** elaborate on material introduced in the lectures and provide
an opportunity to work on exercises in a group, and (in some weeks)
get hands-on experience with testing and quality assurance technologies.

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

The assessment for {{ site.data.globals.unitcode }} consists of a project,
short pieces of work submitted at workshops,
and a final examination.

<table class="csse-table" style="width: 80%; text-align: center;" >
 <tr>
   <th>   Assessment                  </th>
   <th>   % of final mark             </th>
   <th>   Assessment Dates            </th>
 </tr>
 <tr>
   <td>   Project                     </td>
   <td>   {{ site.data.globals.projmarks }}%</td>
   <td>   week 12                     </td>
 </tr>
 <tr>
   <td>   Workshop exercises          </td>
   <td>   {{ site.data.globals.wkmarks }}%</td>
   <td>   weeks 3, 6, 9               </td>
 </tr>
 <tr>
   <td>   Examination                 </td>
   <td>   {{ site.data.globals.exammarks }}</td>
   <td>   June examination period </td>
 </tr>
</table> 



All programming work is submitted using
[cssubmit][cssubmit]{: target="_blank" :}. As the semester
proceeds, your marks will be updated and recorded in
[csmarks][csmarks]{: target="_blank" :}.

[cssubmit]: https://secure.csse.uwa.edu.au/run/cssubmit
[csmarks]: https://secure.csse.uwa.edu.au/run/csmarks




