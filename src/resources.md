---
title: "Resources"
tags: ['toppage']
layout: page-toc-layout.njk
customStyle: |
  .resource-list > ul > li {
    padding-top: 1ex;
    padding-bottom: 1ex;
  }

---

## Lecture slides

Lecture slides will be published here progressively throughout
the semester. (It's also possible to access
[previous years' content](/faq/#previous-content) if you'd
like to get an idea in advance of what will be covered.)

{#
  NBB: there must be **NO BLANK LINEs** between list items here -- else
       ugly extra para elements will appear

 
 if you have commented out text mid-list, you probably want to use

  <hyphen><end-comment> to strip out whitespace after

  i.e. -# but with a brace at the end.

#}


::: { .resource-list }

- Week 1
  - Lecture 1 -- introduction {% resourceList "lect01--intro", ["pdf", "md"] %}
  - Lecture 2 -- testing concepts {% resourceList "lect02--testing", ["pdf", "md"] %}
- Week 2
  - Lecture 3 -- test automation {% resourceList "lect03--autom", ["pdf", "md"] %}
- Week 3
  - Lecture 4a -- input space partitioning intro {% resourceList "lect04a--isp-intro", ["pdf", "md"] %}
  - Lecture 4b -- input space partitioning {% resourceList "lect04b--isp", ["pdf", "md"] %}
- Week 4
  - ISP continued
- Week 5
  - Quality Assurance {% resourceList "lect05a--quality", ["pdf", "md"] %}
  - Git Hub Workshop {% resourceList "lect05b--github-workshop", ["pdf", "md"] %}
- Week 6
  - Lecture 6a -- logic-based testing {% resourceList "lect06a--logic", ["pdf", "md"] %}
  - Lecture 6b -- graph-based testing {% resourceList "lect06b--graph", ["pdf", "md"] %}
- Week 7
  - Lecture 7a -- syntax-based testing {% resourceList "lect07a--syntax-BNF", ["pdf", "md"] %}
  - Lecture 7b -- program-based mutation testing       {% resourceList "lect07b--syntax-mutation", ["pdf", "md"] %}
- Week 8
  - Lecture 8, integration, system and acceptance testing {% resourceList "lect08--system", ["pdf", "md"] %}
  - Other material -- "[Mocks, stubs and spies with Mockito](https://youtu.be/xXO8ft-tsrY)" (YouTube) \
    (see also ch 12 of Amman & Offutt textbook)
- Week 9
  - Lecture 9, reviews and metrics  {% resourceList "lect09--reviews", ["pdf", "md"] %}
- Week 10
  - Lecture 10 -- Risk    {% resourceList "lect10--risk", ["pdf", "md"] %}
-  Week 11
  - Guest Lecture -- Formal Methods in Industry
- Week 12
  - Unit Review and Exam Questions  [(pdf)][sample-pdf]

:::

[sample-pdf]: {{ "/lectures/sample.pdf" | url }}

## Labs { #labs }

Labs begin in week 2.
Some of the labs will require you to completed coding
exercises; others might involve pair or group activities with other
students in the lab.

### Worksheets

Worksheets for the labs will be published here progressively throughout
the semester.

{#
  NBB: there must be **NO BLANK LINEs** between list items here -- else
       ugly extra para elements will appear
#}



::: { .resource-list }

- Week 2 -- testing intro
  - Lab worksheet {% resourceList "workshop01", ["html", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-01-code.zip" | url }}))
  - A (very brief) revision document on important concepts from the Java language is
    available ([PDF]({{ "/workshops/java-revision.pdf" | url }})), should you need it.
  - Sample worksheet solutions {% resourceList "workshop01-solutions", ["html", "md"] %}
- Week 3 -- data-driven tests
  - Lab worksheet {% resourceList "workshop02", ["html", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-02-code.zip" | url }}))
  - Sample worksheet solutions {% resourceList "workshop02-solutions", ["html", "md"] %}
- Week 4 -- ISP
  - Lab worksheet {% resourceList "workshop03", ["html", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop03-solutions", ["html", "md"] %}
- Week 5 -- Testability, ISP and control flow
  - Lab worksheet {% resourceList "workshop04", ["html", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop04-solutions", ["html", "md"] %}
- Week 6 -- logic
  - Lab worksheet {% resourceList "workshop05", ["html", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop05-solutions", ["html", "md"] %}
- Week 7 -- syntax
  - Lab worksheet {% resourceList "workshop06", ["html", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-06-code.zip" | url }}))
{#  - Sample worksheet solutions {% resourceList "workshop06-solutions", ["html", "md"] %} -#}
- Week 8 -- code reviews
  - Lab worksheet               {% resourceList "workshop07", ["html", "md"] %}
{#   - Sample worksheet solutions  {% resourceList "workshop07-solutions", ["html", "md"] %} -#}
- Week 9 -- system testing
  - Lab worksheet               {% resourceList "workshop08", ["html", "md"] %}
{#   - Sample worksheet solutions  {% resourceList "workshop08-solutions", ["html", "md"] %} -#}
- Week 10 and 11 -- work on project
{# 2024 additional workshops
- Week 10 -- program verification
  - Lab worksheet               {% resourceList "workshop09", ["html", "md"] %}
  - Writing English answers using Moodle editors ([html](/workshops/moodle-editors.html)) ([md](/workshops/moodle-editors.md))
  - Sample worksheet solutions  {% resourceList "workshop09-solutions", ["html", "md"] %}
- Week 11 -- specification languages
  - Lab worksheet               {% resourceList "workshop10", ["html", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop10-solutions", ["html", "md"] %}
#}
:::


<!--
  vim: tw=92
-->
