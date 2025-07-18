---js
{
  // For semester dates, see startDate (at bottom of this js section)
  // and siteinfo.semesterStartDateStr
  title: "Schedule",
  layout: "special-layout.njk",

  // css
  customStyle:  `
  ul, ol, dl, li p {
    margin: 0 0 0.70em;
  }

  td p {
    padding: 0pt;
    margin: 0pt;
  }

  .ref {
    font-variant: small-caps;
  }

  /* big */
  @media (min-width: 768px) {
    .schedule-table {
      flex: 1 0 auto;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 95vw;
      max-width: 950px;
      border-collapse: collapse;
    }

    .table-container table {
      margin: 0 5pt;
    }
  }
  /* small */
  @media (max-width: 767px) {
    .table-container {
      width: 100%;
      left: 0;
      padding-left: 5px;
      overflow-x: scroll;
    }

    .table-container table {
      left: 0;
      margin-left: 3px;
      width: 110%;
      min-width: 800px;
    }
  }



  .schedule-table {
    border-collapse: collapse;
    border-bottom: solid black 2pt;
  }

  .schedule-table tr.oddrow {
    background-color: var(--accent-v-v-light);
  }

  .schedule-table th {
    border-top: solid black 1pt;
    border-bottom: solid black 1pt;
    background-color: var(--accent-v-light);
  }

  .schedule-table td
  {
    padding: 1ex 1em;
    border-bottom: solid black 0.5pt;
    vertical-align: top;
  }

  /* small */
  @media (max-width: 767px) {
    .schedule-table {
      font-size: 15px;
    }
  }
  /* big */
  @media (min-width: 768px) {
    .schedule-table {
      font-size: 14px;
    }
  }

  `,
  // end css

  // formatter: func that takes
  //    [asstType, date]
  // pair and returns nice string
  assessmentDates: (assessments, formatter) => {
    let res = {};
    function isValidDate(d) {
      return d instanceof Date && !isNaN(d);
    }
    const util = require('util');
    for (let [asstname, asst] of Object.entries(assessments)) {
      for(const dateType in asst.dates) {
        let theDate = asst.dates[dateType];
        let pretty  = formatter([dateType, theDate]);
        if (isValidDate(theDate)) {
          res[theDate.getTime()] = `${asst.name}: ${pretty}`;
        }
      }
    }
    return res;
  },

  datesForWeek: (weekStartDate, assessmentDates_) => {
    const moment  = require('moment');
    function formatty(dt) {
      return moment(dt).format("h:mm a ddd D MMM")
    }

    // if we have multiple items, render as a list
    // ^H^H actually, do it for single items as well
    function joinItems(arr) {
      if (arr.length == 0) {
        return ""
      } else if (arr.length == 1) {
        return "- " + arr[0]
      } else {
        return arr.map( (x) => "- " + x).join("\n")
      }
    }

    let wkEndDate = new Date(weekStartDate);
    wkEndDate.setDate( weekStartDate.getDate() + 7 );
    let res = []
    for(let tm in assessmentDates_) {
      let dt = new Date(tm);
      dt.setTime(tm);
      if (weekStartDate <= dt  && dt < wkEndDate) {
        res.push(assessmentDates_[tm]);
      }
    }
    return joinItems(res);
  },

  stripIndent: (str) =>
    str.replaceAll(/\n\s+/g, '\n'),

  stripNewlines: (str) =>
    str.replaceAll(/\n/g, ''),

  // semester start date
  startDate: '2024-07-22',
  // should be same as siteinfo.semesterStartDateStr.
  // ugh. can we DRY?

}
---

{% set help_forum = siteinfo.help_forum %}
{% set forum_url  = siteinfo.forum_url %}
{% set helpforum   = help_forum | extLink(forum_url) | safe %}

{% set weeks   = schedule.weeks %}

<!--!
<main>
<div class="page">
!-->

# {{ title }}

The table below shows the topics intended to be covered in
each week of semester.
The order or delivery date of
lectures on this page may change during the semester.

- For **lecture slides**{ class="hi-pri" } and
  **lab worksheets**{ class="hi-pri" }
  see the [Resources page]({{ "/resources/" | url }}).
- For [**recordings**]({{ siteinfo.lms_url }}){ class="hi-pri" } of the lectures,
  visit UWA's {{ siteinfo.lms }} (Learning
  Management System).

## Recommended readings

The schedule gives **recommended readings**{ class="hi-pri" }
for each topic: either chapters from the textbooks, or extracts
from other books.

Online copies of the textbooks and the extracts are available via
the {{ siteinfo.lms }} (look under "Unit Readings").
The
readings may be added to or modified as the semester progresses.

Your understanding of the lecture and workshop
material will be greatly enhanced if you work through these readings
*prior*{ class="hi-pri" } to attending.

- References to "Ammann & Offutt" are to Ammann, P., & Offutt, J.,
  *Introduction to software testing*, 2nd edn (Cambridge University
  Press, 2016).
- References to "Pressman" are to Pressman, R.S., & Maxim, B.R.,
  *Software engineering: A practitioner's approach*, 8th edn
  (McGraw-Hill, 2015), but earlier and later editions should have
  equivalent sections.

[unit-readings]: https://www.unitreadings.library.uwa.edu.au/leganto/readinglist/lists/13685908730002101

### Java resources

The unit assumes you are familiar with at least one statically type-checked
language (e.g. Java or C). If you are not already familiar with Java,
you should make sure you have access to a Java textbook which covers the
language.

One recommended textbook is:

- Barnes and Kölling, [Objects First with Java: A Practical
  Introduction using BlueJ][barnes-java] (6th edn, Pearson 2016).

[barnes-java]: https://www.bluej.org/objects-first/

It not only introduces the the Java language and object-oriented programming, but also
explains the basics of design, testing and debugging in Java (see ch. 9, "Well-behaved
Objects").

You may also want to take a look at
the following (very brief) revision document on Java language concepts, available
[here]({{ "/workshops/java-revision.pdf" | url }}) (PDF). In addition to basic language
concepts, it provides references to books and resources that may be useful.

<!--!
</div>
!-->



<!--!
<div class="table-container">

<table class="schedule-table" >
<colgroup>
<col style="width: 10%;">
<col style="width: 16%">
<col style="width: 18%">
<col style="width: 43%">
<col style="width: 21%">
</colgroup>
<tbody>
<tr>
<th>
  Week
</th>
<th>
 Lecture
</th>
<th>
 Lab
</th>
<th>
  Reading
</th>
<th>
 Assessment
</th>
</tr>
!-->

{% set assessmentDates_  = assessmentDates( siteinfo.assessments, siteinfo.formatAssessmentDate ) %}
{%- for week in weeks -%}
<tr{{ (' class = "oddrow"' | safe) if (loop.index % 2 == 1) else "" }}>
  <td style="text-align: center;">
   <strong>{{ week.weekNum        }}</strong>
   <br/>
   {{ week.date | dateFormat('D MMM') }}
  </td>
  <td>
    {{ week.lectureTopic      | mdBlock | safe }}
  </td>
  <td>{{ stripIndent(week.workshopTopic) | mdBlock | safe }}</td>
  <td>{{ stripIndent(week.reading)  | mdBlock | safe }}</td>
  <td>{{ stripIndent(week.assessmentDetails)  | mdBlock | safe }}</td>
</tr>
{%- endfor %}



<!--!
</tbody>
</table>

</div>
!-->



<!--!
</main>
!-->

{# vim: tw=92
#}
