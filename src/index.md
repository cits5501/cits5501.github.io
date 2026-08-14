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
{% set outline_url  = siteinfo.unit_outline_url %}

## Welcome to {{ siteinfo.unitcode }}  {{ siteinfo.unitname }}

Welcome to the website for CITS5501/3501
in {{ siteinfo.year }}. Unit material (lecture slides and lab
worksheets) for this unit will be **published on these pages, and not on
the UWA Blackboard LMS**{ class="hi-pri" }; but refer to the {{ siteinfo.lms }}
for recorded lectures and the unit outline.

## 2026 material

For lecture slides and lab worksheets for the 2026, semester 2, iteration of this course,
please refer to the Blackboard LMS.


<!--
  vim: tw=92
-->
