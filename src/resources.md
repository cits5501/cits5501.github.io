---
title: "Resources"
tags: ['toppage']
layout: page-layout.njk
customStyle: |
  .resource-list > ul > li {
    padding-top: 1ex;
    padding-bottom: 1ex;
  }

---

## Streamed lectures

If attending a lecture online, details of how
to join the relevant Microsoft Teams meeting are:

- **Tuesdays 11am**:
  [Click here](https://teams.microsoft.com/l/meetup-join/19%3abf7b28f2b615463e9ad26cc8fa1370ed%40thread.tacv2/1645692284503?context=%7b%22Tid%22%3a%2205894af0-cb28-46d8-8716-74cdb46e2226%22%2c%22Oid%22%3a%22e72c5de6-8733-4bc9-95bc-08b3eb1354a2%22%7d)
  Or call in (audio only): +61 8 6118 1761, conference 466 151 513#

If you have any difficulty attending the streamed lecture,
you can still access recordings of the lectures via the
university's [LMS][lms]{ target="_blank" } (Learning Management System).

{# _x #}

[lms]: http://www.lms.uwa.edu.au/


## Lecture slides

Lecture slides will be published here as the semester
progresses.




::: { .resource-list }

- Week 1
  - Lecture 1 -- introduction {% resourceList "lect01--intro", ["pdf", "md"] %}
  - Lecture 2 -- testing concepts {% resourceList "lect02--testing", ["pdf", "md"] %}
- Week 2
  - Lecture 3 -- test automation {% resourceList "lect03--autom", ["pdf", "md"] %}
- Week 3
  (continuing slides from week 2)
- Week 4
  - Lecture 4a -- input space partitioning intro {% resourceList "lect04a--isp-intro", ["pdf", "md"] %}
  - Lecture 4b -- input space partitioning {% resourceList "lect04b--isp", ["pdf", "md"] %}
- Week 5
  - Lecture 5a -- model-based testing {% resourceList "lect05a--intro", ["pdf", "md"] %}
  - Lecture 5b -- graph-based testing {% resourceList "lect05b--graph", ["pdf", "md"] %}
  - Lecture 5c -- logic-based testing {% resourceList "lect05c--logic", ["pdf", "md"] %}
- Week 6--7
  - Lecture 6a -- syntax-based testing {% resourceList "lect06a--syntax", ["pdf", "md"] %}
  - Lecture 6b -- random testing       {% resourceList "lect06b--random", ["pdf", "md"] %}
- Week 8
  - Lecture 7A, integration and system testing {% resourceList "lect07a--system", ["pdf", "md"] %}
  - Lecture 7B, reviews and quality assurance  {% resourceList "lect07b--quality", ["pdf", "md"] %}
- Week 9
  - Lecture 8A, Risk                  {% resourceList "lect08a--risk", ["pdf", "md"] %}
  - Lecture 8A, Formal methods intro  {% resourceList "lect08b--formal", ["pdf", "md"] %}
  - Case study -- Knight Capital trading loss {% resourceList "lect08c--knight", ["pdf", "md"] %}
- Week 10
  - Lecture 9, Program verification {% resourceList "lect09a--verification", ["pdf", "md"] %}
  - Other material -- "[Mocks, stubs and spies with Mockito](https://youtu.be/xXO8ft-tsrY)" (YouTube) \
    (see also ch 12 of the textbook)
- Week 11
  - Lecture 10, Program specification -- alloy {% resourceList "lect10--alloy", ["pdf", "md"] %}
- Week 12
  - Lecture 11, Program specification -- alloy, continued {% resourceList "lect11--alloy", ["pdf", "md"] %}

{#
- Week 11
  Lecture 11, Program specification -- alloy ([pdf]({{ "/lectures/lect11.pdf" | url }}))
  Lecture 12, Standards ([pdf]({{ "/lectures/lect12.pdf" | url }}))

{% resourceList "lect07a--system", ["pdf", "md"] %}
#}

:::

## Lab/workshops { #lab-workshops }

Lab/workshops begin in week 2.
Worksheets for the lab/workshops will be published here as the semester
progresses.

### Attending lab/workshops online

If you are enrolled in {{ siteinfo.unitcode }} online,
you can attend your lab/workshop by going to the
{{ siteinfo.unitcode }} team in MS Teams, finding the
"channel" for your lab, and clicking "join"
to join the online lab/workshop.

### Worksheets

{#

If attending a workshop/lab online, details of how
to join the relevant Microsoft Teams meeting are:

- **Tuesdays 12 noon**:
  [Click here](https://teams.microsoft.com/l/meetup-join/19%3a532e791d85b8469e8264524bacf5d283%40thread.tacv2/1614927592108?context=%7b%22Tid%22%3a%2205894af0-cb28-46d8-8716-74cdb46e2226%22%2c%22Oid%22%3a%22e72c5de6-8733-4bc9-95bc-08b3eb1354a2%22%7d)
  Or call in (audio only): +61 8 6118 1761, conference ID 999 304 813#  
- **Wednesdays 9am**:
  [Click here](https://teams.microsoft.com/l/meetup-join/19%3a242ae279c0e54c7d94973ce8a65630c3%40thread.tacv2/1615873670275?context=%7b%22Tid%22%3a%2205894af0-cb28-46d8-8716-74cdb46e2226%22%2c%22Oid%22%3a%22128db1d9-3ae1-4ba6-8c2b-13f85693a6ba%22%7d)
  Or call in (audio only): +61 8 6118 1761, conference ID 946 381 391#  
- **Thursdays 2pm**:
  [Click here](https://teams.microsoft.com/l/meetup-join/19%3a58a2e590d5164f6e97f826f3ee06189b%40thread.tacv2/1614928022425?context=%7b%22Tid%22%3a%2205894af0-cb28-46d8-8716-74cdb46e2226%22%2c%22Oid%22%3a%22e72c5de6-8733-4bc9-95bc-08b3eb1354a2%22%7d)
  Or call in (audio only): +61 8 6118 1761, conference ID 330 345 938#  
{ class="spaced-list" }

#}


::: { .resource-list }

- Week 2 -- testing intro
  - Lab worksheet {% resourceList "workshop01", ["pdf", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-01-code.zip" | url }}))
  - Sample worksheet solutions {% resourceList "workshop01-solutions", ["pdf", "md"] %}
- Week 3 -- data-driven tests
  - Lab worksheet {% resourceList "workshop02", ["pdf", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-02-code.zip" | url }}))
  - Sample worksheet solutions {% resourceList "workshop02-solutions", ["pdf", "md"] %}
- Week 4 -- ISP
  - Lab worksheet {% resourceList "workshop03", ["pdf", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop03-solutions", ["pdf", "md"] %}
- Week 5 -- graphs
  - Lab worksheet {% resourceList "workshop04", ["pdf", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop04-solutions", ["pdf", "md"] %}
- Week 6 -- logic
  - Lab worksheet {% resourceList "workshop05", ["pdf", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop05-solutions", ["pdf", "md"] %}
- Week 7 -- syntax
  - Lab worksheet {% resourceList "workshop06", ["pdf", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-06-code.zip" | url }}))
  - Sample worksheet solutions {% resourceList "workshop06-solutions", ["pdf", "md"] %}
- Week 8 -- code reviews
  - Lab worksheet               {% resourceList "workshop07", ["pdf", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop07-solutions", ["pdf", "md"] %}
- Week 9 -- risk
  - Lab worksheet               {% resourceList "workshop08", ["pdf", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop08-solutions", ["pdf", "md"] %}
- Week 10 -- program verification
  - Lab worksheet               {% resourceList "workshop09", ["pdf", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop09-solutions", ["pdf", "md"] %}
- Week 11 -- specification languages
  - Lab worksheet               {% resourceList "workshop10", ["pdf", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop10-solutions", ["pdf", "md"] %}
{#
- Week 9
  Lab worksheet {% resourceList "workshop08", ["pdf", "md"] %}
  Sample worksheet solutions {% resourceList "workshop08-solutions", ["pdf", "md"] %}
- Week 10
  Lab worksheet {% resourceList "workshop09", ["pdf", "md"] %}
  Sample worksheet solutions {% resourceList "workshop09-solutions", ["pdf", "md"] %}
- Week 11
  Lab worksheet {% resourceList "workshop10", ["pdf", "md"] %}
  Sample worksheet solutions {% resourceList "workshop10-solutions", ["pdf", "md"] %}
- Week 12
  Lab worksheet {% resourceList "workshop11", ["pdf", "md"] %}

#}

:::




