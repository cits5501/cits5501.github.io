---
title: "Schedule"
tags: ['toppage']
layout: page
---

**Lecture slides**{: class="hi-pri" :} and 
**lab/workshop sheets**{: class="hi-pri" :} can be downloaded
from the [Resources page]({{ "/resources/" | relative_url }}).
The order or delivery date of
lectures on this page may change during the semester.

**Recordings**{: class="hi-pri" :} of the lectures will be
available through UWA's [LMS][lms]{: target="_blank" :} (Learning
Management System).

[lms]: http://www.lms.uwa.edu.au/

The schedule below gives <span>**recommended readings**</span>{:
class="hi-pri" :} for each topic: either chapters from the recommended
texts, or extracts.  Your understanding of the lecture and workshop
material will be greatly enhanced if you work through these readings
<span>*prior*</span>{: class="hi-pri" :} to attending.

References to
"Ammann & Offutt" are to Ammann, P., & Offutt, J., *Introduction to
software testing*, 2nd edn (Cambridge University Press, 2016).
References to "Pressman" are to Pressman, R.S., & Maxim, B.R., *Software
engineering: A practitioner's approach*, 8th edn (McGraw-Hill, 2015),
but earlier and later editions should have equivalent sections. The
readings may be added to or modified as the semester progresses.

The [UWA library][library]{: target="_blank" :} has copies of all the
**recommended textbooks**{: class="hi-pri" :} (some online).  You can
access the library's holdings of the recommended texts via the Unit
Readings site
[**here**][unit-texts]{: class="hi-pri" target="_blank" :}.

**Extracts**{: class="hi-pri" :} referred to are likewise available
via the Unit Readings site, [here][unit-extracts]{: target="_blank" :}.

[unit-texts]: http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11016332950002101
[library]: https://www.uwa.edu.au/library/home
[unit-extracts]: http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11308340080002101

<!-- chews up footer, but oh well -->
<div class="expanded">

<table class="csse-table" >
<colgroup>
<col style="width: 10%;">
<col style="width: 18%">
<col style="width: 18%">
<col style="width: 39%">
<col style="width: 15%">
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
 Lab/workshop
</th>
<th>
  Reading
</th>
<th>
 Assessment
</th>
</tr>
{%- for week in site.data.schedule.weeks -%}
  {% capture idx %}{{ forloop.index }}{% endcapture %}
  {% assign oddrow = idx | modulo: 2  %}
  <tr
  {% if oddrow == 1 %}
      class="odd-row"
  {% else %}
      class="even-row"
  {% endif %}
  >
  <td style="text-align: center;">
   <strong>{{ week.weekNum        }}</strong>
   <br/>
   {{ week.date                   }}
  </td>
  <td>{{ week.lectureTopic      | markdownify }}</td>
  <td>{{ week.workshopTopic     | markdownify }}</td>
  <td>{{ week.reading           | markdownify }}</td>
  <td>{{ week.assessmentDetails | markdownify }}</td>
  </tr>
{%- endfor -%}
</tbody>
</table>

<p>&nbsp;</p>

</div>
<!-- end expanded -->

