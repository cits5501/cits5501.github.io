---
title: "Group Assessment Frequently Asked Questions"
tags: ['toppage']
layout: page-toc-layout.njk
customStyle: |
  .resource-list > ul > li {
    padding-top: 1ex;
    padding-bottom: 1ex;
  }

  div.toc > ul > li {

    margin-bottom: 1rem;

  }

  main h2, main h3 {
    margin-left: -1.5rem;
  }

---

{% set year         = siteinfo.year %}
{% set help_forum   = siteinfo.help_forum %}
{% set forum_url    = siteinfo.forum_url %}
{% set helpforum     = help_forum | extLink(forum_url) | safe %}
{% set outline_url  = siteinfo.unit_outline_url %}
{% set moodle_url   = siteinfo.moodle_url %}
{% set quiz_percent  = siteinfo.assessments["quiz1"]["marksPercent"] %}

{% set blank  = "{ target=\"_blank\" }" %}

{#
  x_
#}

-----

## Getting started and general queries

### Are project groups self-selected or allocated? Why?

Students will be **allocated** to a group of (approx.) 5 students for the project.
Each group is assigned a lab facilitator who will meet with the group fortnightly to support team forming and project matters, and
who will mark the project.

Project groups are randomly allocated. This method simulates real-world working
environments where you'll often collaborate with colleagues and clients you haven't chosen.
Random allocation also promotes fairness by ensuring that students who might struggle to form a group independently are included.
Our aim is to foster diverse and inclusive teams, as working with diverse perspectives tends
to lead to more nuanced understanding of the unit material.

<!--
{#

on group assessment, see
<https://teaching.cornell.edu/teaching-resources/active-collaborative-learning/collaborative-learning/how-evaluate-group-work>

#}
-->

When students choose their own groups, they often select friends or close acquaintances.
While this can create a [comfortable working environment][groupthink],
learning to communicate effectively with different working styles is crucial in real-world
teams,
and research shows that personal growth is best fostered when students go [outside their comfort zone][comfort].

<!--
{#
comment:
also - some evidence suggests students have more creative ideas
when groups _don't_ self-select.
https://pubsonline.informs.org/doi/10.1287/orsc.2021.1520
#}
-->

[groupthink]: https://www.bbcdigital.com.au/breaking-the-consensus-trap-how-to-avoid-groupthink-in-the-workplace/
[comfort]: https://news.cornell.edu/stories/2022/03/leaving-your-comfort-zone-inspires-motivation-growth

### My team and I have difficulty finding a time when we can all meet -- what can we do?

Groups are allocated based on the lab session you selected in CAS -- so you can meet
before, during, or after your lab session.
Groups can meet online or face-to-face, but at least some face-to-face meetings are encouraged,
and group members are expected to make themselves available during their timetabled lab sessions for discussion
with their facilitator, if needed.

Any problems with group attendance should be raised in the first instance with
your assigned facilitator, or with the unit coordinator by emailing {% email_el_spannized coordinator.email %}.

<!--
{#
comment: NO SWAPS as first remedy.
Initially, we try to resolve problems via discussion, mediation with staff.
If problems persist, then group swaps are amongst the options we might pursue --
but they aren't a first option.
#}
-->

### We have been unable to make initial contact with a member of our group -- what should we do?

If you have made attempts to contact a group member via their UWA email address, and have allowed several days
for a response, but have not received a reply, then contact the unit coordinator promptly (by the end
of the first week of the project / week 3 at the latest) on {% email_el_spannized coordinator.email %}. 

## Assessment

### Is individual contribution taken into account?

Yes, individual contributions are taken into account. Students are asked to quantify the
contributions made by each team member, including themselves. A Contribution Factor (ranging
from 0.0 to 1.2) is calculated based on these evaluations and is used to adjust the final
project grade accordingly (with a maximum possible final grade of 100%).

It is a requirement that groups keep a record (updated weekly) tracking each
member's allocated tasks and contributions, and use a private Git repository to track version control.
While these records are not submitted with the project, teaching staff may request to see
them if any discrepancies arise during the grading process.

### Can we ask for help from lab facilitators or other teaching staff?

<!--
- We encourage groups to show their work to their lab facilitator to ensure they're roughly on track.
- Lab facilitators normally won't provide answers about what to do, or whether some deliverable is "good" -- but
_can_ guide students away from unproductive avenues.
- Questions of relevance to all groups should go on the discussion board -- advice like that needs to be
  provided to the entire class equally.
-->
Yes -- your lab facilitator is there to help your group make progress throughout the
project. We encourage you to discuss your approach, show your work in progress,
and ask questions if your group is unsure whether it is heading in the right
direction.

Teaching staff will usually not tell you exactly how to solve the project, nor
will they "pre-mark" deliverables or tell you whether a particular solution is
the best one. Instead, we will try to help you identify potential problems,
clarify misunderstandings, and suggest productive directions for further work.

If your question is about the project brief and the answer would be
useful to multiple groups, please post it on the discussion board on the Blackboard LMS.
This helps ensure that any clarifications or additional guidance are available to the
entire class. If you ask an individual staff member a question of general
interest, they may ask you to post it on the discussion board instead.

## Deliverable submission

### Who submits project deliverables, and how? { #online-submission }

Project deliverables are submitted electronically through {{ siteinfo.moodle }}.

Only one member of the group may submit a deliverable -- they submit on behalf of the entire team. However,
all group members remain responsible for ensuring that the submission was successful and that the correct
files were submitted before the deadline.

We recommend including your group number in submitted filenames where practical,
although this is not required.

### What are the rules for late submissions and special considerations for the group project? { #late-project }

Groups must submit the project deliverables by their due date.  Penalties will be applied to late submissions according to UWA policy.
UWA's assessment policy states that 
"In cases where a student who is part of a group assessment receives approval for an EVA application, the outcome must be considered in consultation with the unit coordinator."
For this project, in accordance with UWA's assessment policy, the 
unit coordinator will, if required, provide an alternative assessment for an individual student and/or 
mark to a reduced assessment task for the group.
Any questions about EVA or UAAPs can be discussed with the unit coordinator at consultation times or via email to {% email_el_spannized coordinator.email %}.

<!--
COMMENT: Note that UWA's sem 2 2025 EAV policy DOES allow extensions for group submissions at the discretion of the UC

5.6	In cases where a student who is part of a group assessment receives approval for an EVA application, the outcome must be considered in consultation with the Unit Coordinator. The possible outcomes include:
(a)	extension to an assessment deadline for the whole group;
(b)	provision of alternative assessment for the individual student; and 
i.	redistribution of the assigned work to the rest of the group members with the possibility of an extension to the assessment deadline; and/or
ii.	a reduced assessment task for the group
(c)	Reassignment of group mark to other assessments if assessment task/item is weighted 10 per cent or less. This may be relevant for in-class group activities such as group presentations.
(d)	Where a group member has a UAAP in place, any approved adjustment may be extended to the whole group within reason at the discretion of the UC.
-->

## Dealing with problems

### Who should we contact if problems arise?

In the first instance, your lab facilitator is usually the best person to contact (in person, at your
next timetabled lab session) if you run into problems. If the problem is urgent, feel free to
contact the unit coordinator via email to {% email_el_spannized coordinator.email %}.

### I got sick during semester and couldn't contribute for a while. What should I do?

Let your teammates know as soon as possible so they understand what is happening and can plan around your
temporary absence.

You should also apply for an EVA ([Exceptional Variation of Assessment][eva-page]) through the University's
normal process, even if you expect to recover quickly. This creates an official record of the circumstances.

An individual student's illness does not automatically result in an extension for the entire group project.
However, having your circumstances documented can be important if questions later arise about your level of
contribution to the project.

[eva-page]: https://www.uwa.edu.au/students/your-studies/exceptional-variation-of-assessment

### My teammates want to ignore the required project processes (for example, not using version control or task tracking). Should I go along with this?

No -- the project processes are part of the assessment and are intended to protect both the project and the
students working on it. They provide evidence of who contributed what, help the group coordinate its work, and
make it much easier to resolve disagreements if they occur.
Experience in both industry and
education shows they substantially reduce coordination problems and give better visibility of project progress.

If your group is reluctant to use them, discuss the reasons first. If you cannot reach agreement, discuss this with
your lab facilitator as soon as possible. Raising the issue early gives us the best chance of helping the group
before this becomes a larger problem.

### I am doing all the work. What should I do?

Don't do that!

One of the aims of this assessment is to work effectively as a team. If one student takes over all work on the
project, that usually makes the situation worse rather than better.

You should first discuss the issue with your teammates and make expectations clear. If the problem continues,
raise the issue with your lab facilitator as soon as possible.

It is important to do this _early_. The earlier we know there is a problem, the more options we have to help the group resolve it.

Also be aware that putting in more effort than the rest of the group is not guaranteed to result
in higher marks. The [Group Contribution Factor][gcf] is capped at 1.2, meaning an individual can never
achieve more than 20% over the group's raw mark.
Doing significantly more than an even share of the work is therefore unlikely to improve your final result.

[gcf]: https://help.feedbackfruits.com/hc/en-us/articles/23527092093202-Group-Member-Evaluation-Group-Contribution-Grading-Group-Contribution-Factor

<!--
TBD:
Mention that peer evaluations / appeals are more useful when staff have contemporaneous evidence rather than
hearing about problems after submission.
-->

### My teammates are not contributing. Should I just finish the project myself?

No -- while it can be tempting to complete the missing work yourself, doing so often hides the problem until the end
of semester, when it is much harder for staff to help resolve the issues.

Instead, raise your concerns with the group, keep using the required project management tools, and
raise this with your lab facilitator
if the issue is still not resolved. Early communication gives us the best opportunity to
help.

### We're having problems working together. When should we contact teaching staff?

As early as possible.

Many group problems can be resolved if we know about them while the project is still in progress. Once the
project has been submitted, our ability to investigate events or help the group is much more limited.

If communication has broken down, required project processes are not being followed, or you believe the
workload has become seriously unbalanced, please raise this with your lab facilitator promptly rather than waiting
until the end of semester.

### Our group disagrees about a technical decision. Who decides?

Disagreement is a normal part of software engineering.

Where possible, decisions should be based on evidence rather than opinion. This might involve referring back
to the project specification, consulting reliable technical documentation, building a small prototype, or
comparing alternative approaches against the project requirements.

If, after reasonable discussion, the group is still unable to reach agreement, ask your lab facilitator
for advice. It is usually better to spend a few minutes getting guidance than several days
arguing over a design decision.

### A team member says they'll do work, but never finishes it -- what should we do?

Start by discussing the issue within the group rather than making assumptions
about why work has not been completed. Sometimes expectations, deadlines, or
the scope of a task have not been clearly communicated.

If missed deadlines become a pattern, document agreed tasks and due dates using
your project tracking system, redistribute work where appropriate, and raise the
issue with your facilitator or the unit coordinator as early as possible.

Don't wait until the project has been submitted before telling us there has been a persistent problem! Early
communication gives us a much better chance of helping the group resolve it.

### Our project is falling behind. What should we do?

Don't panic, and don't wait until the submission deadline before asking for help.

Many projects fall behind at some point. What matters is recognising the problem early and taking steps to address it.

Start by identifying the highest-priority requirements in the project brief and make a realistic plan for what can still be completed to a good standard. It is usually better to submit a smaller amount of well-designed, well-tested work than a larger amount of incomplete or unreliable work.

Discuss the situation with your lab facilitator as soon as possible. They can help your group identify the major risks, suggest where effort is best spent, and help you develop a realistic plan for the remainder of the project.

If after this your group still has concerns about being able to complete the project successfully, contact the
unit coordinator promptly. While we cannot reduce the assessment requirements, we can often help groups
identify a sensible path forward. We would much rather know about problems while there is still time to
improve the outcome than hear about them after the project has been submitted.

As with other group issues, early communication and evidence of an organised development process make it much
easier for us to provide useful advice.

## Communication

### How quickly should group members reply to messages?

<!--
TODO:
This is something they can put in their group agreement.
-->

Every group should agree on communication expectations during the first week of the project.

We recommend acknowledging messages within about 24 hours during teaching weeks, even if you cannot provide a
complete answer immediately. Even a brief reply such as "I have seen this and will look at it tonight/tomorrow/before
next meeting" is often enough to let your teammates know you are engaged.

Remember that everyone has different schedules and commitments. The goal is not to be constantly online, but
to communicate reliably and keep your teammates informed.


### Can we use Discord/WhatsApp/Messenger instead of university tools?

<!--
students may use any platform they all agree on, but everyone must have access and important decisions
should be visible to the whole team.
-->
Yes, your group may use any communication platform that all members of the group can
access and are willing to use. Normally this is something you would decide in the first
week of the project.

Whichever platform you choose, important decisions should be visible to the
whole group rather than taking place in private conversations between a subset
of members. Everyone should have an equal opportunity to participate in project
discussions.

Official communications from the teaching staff will still be sent through the University's normal
communication channels (typically email).

### A team member has stopped responding. How long should we wait?

<!--
TBD: If there has been no response after several days and repeated attempts, let staff know.
-->
Try contacting the student using the communication methods your group has agreed
to use, as well as their UWA email address.

If there has been no response after several days and repeated reasonable
attempts to make contact, let your facilitator or the unit coordinator know.
Don't wait until the end of semester before raising the issue!

Early notification allows us to determine whether there are circumstances the
student has not yet communicated to the group and, where appropriate, help the
group make alternative arrangements.

### I feel like decisions are being made without me. What should I do?

All members of the group should have a reasonable opportunity to contribute to important project decisions.
Good software engineering is a collaborative process, and teams generally make better decisions when they
consider a range of viewpoints.

If you feel your ideas are not being heard, raise the issue with your teammates early rather than becoming
disengaged. In many cases, your teammates may not realise that discussions have become one-sided.

It can help to suggest a more structured way of making decisions. For example, your group might:

- ensure everyone has a chance to speak before a major decision is made;
- use a "round-robin" discussion format so each person can explain their view;
- agree on objective criteria (such as the project requirements, evidence from a prototype, or technical
  documentation) before choosing between alternatives; or
- summarise decisions in writing so everyone has the opportunity to raise concerns if something has been
  misunderstood.

If, after making a genuine effort to resolve the issue within the group, you still feel excluded from the
project's decision-making, speak with your lab facilitator or the unit coordinator. Contact teaching staff
early, if possible -- it is much easier for us to assist with problems like this while the project is still in
progress than after it has been submitted.


## Development process

### Do we have to use Git for version control?

<!--
TODO: yes. It's a requirement to use Git for distributed version control -- though you can choose where
to host your respository (GitHub, GitLab, sourcehut, others. Version control (and web-based forges) allow version history to be tracked,
collaboration on issues and changes, recovery from mistakes, and provide evidence of contribution.
Git is also overwhelmingly the most-used version control tool in industry - so getting familiar with it
is worthwhile.
-->

Yes -- using Git for distributed version control is a required part of the project.
Version control is an essential professional software engineering practice. It allows multiple people to
collaborate safely, records the history of changes, makes it easier to recover from mistakes, and provides
visibility into how a project has developed over time -- and it also provides useful evidence of contribution
if questions arise during assessment (although this is not its primary purpose).

Git is overwhelmingly the most-used version control tool in industry, so it's important to get familiar with
it.
Your group may choose any suitable hosting service (for example [GitHub][github], [GitLab][gitlab],
[SourceHut][srchut], or another Git hosting provider), and strategies for working with Git will be discussed
in lectures.

[github]: https://github.com/
[gitlab]: https://gitlab.com/ 
[srchut]: https://sourcehut.org/

### Can we use AI tools while working on the project?

<!--
revise as needed
-->

Yes. Students are encouraged to use GenAI tools to research problems, obtain ideas, and even produce draft code.

However:

- It's important to be aware of the limitations of GenAI tools, and check the accuracy of results.
- Groups must acknowledge what project deliverables GenAI tools have been used for, and keep a record of prompts used.
- A (human!) member of the group must review any output from a GenAI tool.
- All team members remain responsible for the correctness of the submitted work.

And note also that for any assessment -- covered elsewhere in the CITS5501 FAQ under "plagiarism" --
any student or group may be asked to orally explain their thought process in coming up with their answers.


<!--
  vim: tw=110 :
-->
