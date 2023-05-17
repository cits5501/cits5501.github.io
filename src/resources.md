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



::: { .resource-list }

- Week 1
  - Lecture 1 -- introduction {% resourceList "lect01--intro", ["pdf", "md"] %}
  - Lecture 2 -- testing concepts {% resourceList "lect02--testing", ["pdf", "md"] %}
- Week 2
  - Lecture 3 -- test automation {% resourceList "lect03--autom", ["pdf", "md"] %}
  - Lecture 3b -- exceptions {% resourceList "lect03b--exceptions", ["pdf", "md"] %}
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
- Week 8-9
  - Lecture 7a, integration and system testing {% resourceList "lect07a--system", ["pdf", "md"] %}
  - Lecture 7b, reviews and quality assurance  {% resourceList "lect07b--reviews", ["pdf", "md"] %}
  - Lecture 7c, quality assurance  {% resourceList "lect07c--quality", ["pdf", "md"] %}
- Week 10
  - Lecture 8a, Risk                  {% resourceList "lect08a--risk", ["pdf", "md"] %}
  - Lecture 8b, Formal methods intro  {% resourceList "lect08b--formal", ["pdf", "md"] %}
  - Case study -- Knight Capital trading loss {% resourceList "lect08c--knight", ["pdf", "md"] %}
  - Lecture 9, Program verification {% resourceList "lect09--verification", ["pdf", "md"] %}
  - Other material -- "[Mocks, stubs and spies with Mockito](https://youtu.be/xXO8ft-tsrY)" (YouTube) \
    (see also ch 12 of the textbook)
- Week 11
  - Lecture 10, Program specification -- alloy {% resourceList "lect10--alloy", ["pdf", "md"] %}

{#
- Week 9
  - Lecture 8A, Risk                  {% resourceList "lect08a--risk", ["pdf", "md"] %}
  - Lecture 8A, Formal methods intro  {% resourceList "lect08b--formal", ["pdf", "md"] %}
  - Case study -- Knight Capital trading loss {% resourceList "lect08c--knight", ["pdf", "md"] %}
- Week 10
- Week 11
  - Lecture 10, Program specification -- alloy {% resourceList "lect10--alloy", ["pdf", "md"] %}
- Week 12
  - Lecture 11, Program specification -- alloy, continued {% resourceList "lect11--alloy", ["pdf", "md"] %}

#}

{#
- Week 11
  Lecture 11, Program specification -- alloy ([pdf]({{ "/lectures/lect11.pdf" | url }}))
  Lecture 12, Standards ([pdf]({{ "/lectures/lect12.pdf" | url }}))

{% resourceList "lect07a--system", ["pdf", "md"] %}
#}

:::

## Labs { #labs }

Labs begin in week 2.
Some of the labs will require you to completed coding
exercises; others might involve pair or group activities with other
students in the lab.

### Worksheets

Worksheets for the labs will be published here progressively throughout
the semester.


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
- Week 5 -- ISP, graphs and fixtures
  - Lab worksheet {% resourceList "workshop04", ["html", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop04-solutions", ["html", "md"] %}
- Week 6 -- logic
  - Lab worksheet {% resourceList "workshop05", ["html", "md"] %}
  - Sample worksheet solutions {% resourceList "workshop05-solutions", ["html", "md"] %}
- Week 7 -- syntax
  - Lab worksheet {% resourceList "workshop06", ["html", "md"] %}
  - Source code ([zip]({{ "/workshops/workshop-06-code.zip" | url }}))
  - Sample worksheet solutions {% resourceList "workshop06-solutions", ["html", "md"] %}
- Week 8 -- code reviews
  - Lab worksheet               {% resourceList "workshop07", ["html", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop07-solutions", ["html", "md"] %}
- Week 9 -- system testing
  - Lab worksheet               {% resourceList "workshop08", ["html", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop08-solutions", ["html", "md"] %}
- Week 10 -- program verification
  - Lab worksheet               {% resourceList "workshop09", ["html", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop09-solutions", ["html", "md"] %}
- Week 11 -- specification languages
  - Lab worksheet               {% resourceList "workshop10", ["html", "md"] %}

{#
- Week 9 -- risk
  - Lab worksheet               {% resourceList "workshop08", ["html", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop08-solutions", ["html", "md"] %}
- Week 11 -- specification languages
  - Lab worksheet               {% resourceList "workshop10", ["html", "md"] %}
  - Sample worksheet solutions  {% resourceList "workshop10-solutions", ["html", "md"] %}
- Week 12 -- system testing
  - Lab worksheet {% resourceList "workshop11", ["html", "md"] %}
#}


:::



<!--
  vim: tw=72
-->
