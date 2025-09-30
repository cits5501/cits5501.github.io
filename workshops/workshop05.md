---
title: |
  CITS5501 lab 5 (week 6)&nbsp;--&nbsp;version control, logic-based testing 
include-before: |
  ```{=html}
  <style>
  xtable {
    border: solid 1pt black;
  }

  table tr, table th {
    border: solid 1pt black;
  }

  tr td, th td {
    border: solid 1pt black;
  }
  </style>
  ```
---

## 1. Project version control

The week 5 lectures include a workshop on using Git and GitHub for [version control][vc].

[vc]: https://en.wikipedia.org/wiki/Version_control

If this is the first time you have used Git and GitHub, you should work through the
resources included there, including the [Github Hello World Step by
  Step](https://docs.github.com/en/get-started/start-your-journey/hello-world) tutorial.

If you *have* used Git and GitHub before, you might like to think in more depth about how
version control can contribute to (or pose problems for) software quality. The questions
below ask you to reflect on this.

**Question**

:   What is the basic purpose of version control? How does it differ from simply keeping copies of files with different names or dates?

**Question**

:   How might version control make software development easier or harder? You may want to
    check online resources to help you answer these questions.

    - How can version control make it easier to trace the source of a bug?
    - In what ways might poor version control practices (e.g. unclear commit messages, cluttered history) make testing or debugging harder?
    - How might including large generated files in a repository affect development speed and
      reliability?\
      &nbsp;

**Question**

:   In group assessments from previous units, has your group adopted any conventions
    or best practices when using version control? If so, do you think they were useful -- and in
    what ways? If not, did you encounter any problems where adopting a convention might
    have made things easier?

    Think about the following:

    - Why might a team agree on a commit message convention or branching strategy?
    - What problems can arise if different team members ignore these agreements?
    - How could poor version control practices create extra work for testers or integrators? \
      &nbsp;

**Question**

:   Can you think of any indicators in a version control repository that might be
    a sign of good version control discipline (or conversely, or poor version control
    discipline)? If you were reviewing a peer's repository, what would you look for as signs
    of good or bad version control discipline?

Version control tools can either support software quality or undermine it, depending on how
they're used. Good practices make repositories easier to work with, simplify testing, and
reduce the risk of errors. But poor practices can lead to confusion, wasted time, and hidden bugs.

In a well-managed repository, the version control history
should clearly show

- *what* changed
- *when* it changed
- and *why*.

Information about the first two items comes directly from the version control tool -- all
version control tools will show what content in what files was changed, and when a commit
occurred. However, providing reasons *why* the change was made can only be done by the
developer who committed it. In
version control systems, *commit messages* are used to explain the reasons for a change.
You can read more about what makes for good or bad commit messages in Simon Tatham's
guide to ["Writing commit messages"][tatham-messages].

[tatham-messages]: https://www.chiark.greenend.org.uk/~sgtatham/quasiblog/commit-messages/

When used properly, version control systems make it much easier to solve problems like

- Diagnosing when and how a bug was introduced.
- Understanding the reasons for implementation decisions.
- Reverting buggy software to a known good state.
- Letting teams work on multiple features in parallel (using branches and merges).

#### Version control best practices

We won't discuss version control best practices in exhaustive detail here, but will
highlight a few important ones. For more detail, you can read Michael Ernst's ["Version
control concepts and best practices"][ernst-vc].

[ernst-vc]: https://homes.cs.washington.edu/~mernst/advice/version-control.html

- *Avoid committing generated files.* They add "noise" to the version control history,
  are a common source of merge conflicts, and can quickly bloat the repository.
  <!-- see also https://kentcdodds.com/blog/why-i-dont-commit-generated-files-to-master -->
- *Avoid versioning binary files where possible.* Instead, version the text format or build
  recipe. If you do need to track binary files, consider specialised tools (e.g. Git LFS).
- *Write informative commit messages.* A good message explains *what* changed and *why*. If
  your team follows a standard (e.g. [Conventional Commits][cc]), stick to it.
- *Commit early, commit often*. Don't leave work uncommitted for any extended period of time --
  you lose the advantage of having a version control system if you do that.
- *Create commits at logical points.* Each commit should represent a coherent change, small enough to review and test in isolation.
<!--
- *Use branches for features and fixes.** This keeps experimental work separate from production-ready code and makes integration safer.
-->
- *Review before merging.* Code review not only catches bugs, it also enforces quality in
  commit history and documentation.

[cc]: https://www.conventionalcommits.org/

You might notice that some of these practices are in tension -- if you *commit early and
commit often* to stop work from being lost, how can you also ensure that you've
provided good commit messages, or created commits at logical points?

The answer to this apparent paradox is that it's possible to *rewrite the local history* of
your repository, and in fact it's a good idea to

- *Tidy history before sharing.* Squash or reorganise commits so that the branch history tells a clear story.

Once you've pushed your commits to a remote repository, it's generally a bad idea to alter
them, since other team-mates' work may be affected by any changes. But *before* you push
your commits, it's perfectly alright -- in fact, recommended -- to tidy up the history
before pushing it. Read Carlos Schults's post ["Make Your Git History Look Beautiful Using
Amend and Rebase"][schults-history] for more information on how to do this.

[schults-history]: https://carlosschults.net/en/git-beautiful-history/


<!--
https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests
-->

<!--

for another semester - some exercises

1. **Commit Messages and History**

   * Create a small repository and add a simple program (e.g. “Hello world”).
   * Make three changes to it, but commit with vague messages like “fix”, “update”, or “stuff”.
   * Now try to identify *why* you made each change.
   * Redo the exercise with clear, descriptive messages. Compare the difference in traceability.

2. **Generated and Binary Files**

   * Add a large generated file (e.g. a compiled binary, log file, or data export) to the repository and commit it.
   * Observe how the repo size changes. Then make a trivial edit and commit again—note that the *entire file* is stored again.
   * Remove the file from version control, add it to `.gitignore`, and discuss why this is a better approach.

3. **Commit Granularity**

   * Make multiple unrelated changes in your code (e.g. fix a bug, add a feature, update documentation). Commit them *all together*.
   * Now imagine trying to undo just the bug fix—how easy is it?
   * Redo the exercise, this time committing each change separately. Compare the flexibility.

4. **Branching and Integration**

   * Create a new branch for a “feature” and make a couple of commits.
   * Switch back to main, make a conflicting change, then try merging the feature branch.
   * Resolve the conflict, then tidy the history (e.g. squash commits).
   * Reflect on how branching helps isolate work, and how merge practices affect repository clarity.

5. **Code Review Simulation (Optional, Pair Activity)**

   * Swap repositories with a partner. Review their commit history for clarity, granularity, and adherence to best practices.
   * Give each other feedback: what would make the history easier to understand or maintain?

-->

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

::: block-caption

Pre-reading

:::

The following exercises in this worksheet assume general familiarity with logic-based
testing concepts, so if you haven't already, it's recommended you work through chapter 8 from the Ammann and Offutt
textbook before attempting them.

</div>

## 2. Logic notation

The remaining sections of this lab focus on assessing whether a test suite thoroughly
exercises (i.e., has good coverage of) the logic expressions contained in the component
under test.

When writing logic expressions, we will often use
mathematical notation for "and", "or", and "not":

- $\wedge$ -- "and"
- $\vee$ -- "or"
- $\neg$ -- "not"

This notation is independent of any language; it could be turned into Java, or C, or Python -- each
of which uses different logical operators -- depending on what language our system and our
tests are implemented in.

If writing actual Java code, however, we use the normal
Java logical operators:

- `&&` -- "and"
- `||` -- "or"
- `!` -- "not"

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

::: block-caption

Other operators and languages

:::

Java also has non–short-circuiting logic operators, `|` and `&`.

We won't be focusing on Python in this unit -- but for reference,
in Python, the logic operators are all spelled out as English words: "and", "or" and
"not".

</div>


## 3. Terminology -- clauses and predicates

If you need to, review the lecture material and recommended readings
that explain what
*predicates* and *clauses* are.

What are the *clauses* in the predicates below?


a.  $((f \leqslant g) \wedge (x > 0)) \vee (M \wedge (e < d +c))$

#.  $G \vee ((m > a) \vee (s \leqslant o + n)) \wedge U$





## 4. Making clauses active

To make a particular clause $c$ in some predicate *active*
means to assign values to variables so that the
truth-value of the whole predicate depends on $c$.

When coming up with test values which make clauses active,
the easiest way of showing your test values is in a table.

E.g. Suppose we have a predicate $s \wedge (m \vee w)$, where

- $m$ = "the moon is full"
- $s$ = "the sky is clear"
- $w$ = "the wind is calm"

If asked to come up with test inputs which make each clause active
in turn, and achieve Restricted Active Clause Coverage, we could
show them like this:

```{=latex}
\begin{mdframed}[
    linecolor=white,
    leftmargin=10pt,
    rightmargin=10pt,
    skipabove=10pt,
    %bottommargin=10pt
  ]
\small
\begin{tabular}{@{}lll@{}}
\toprule
\textbf{Test description} & \textbf{Inputs}                & \textbf{Predicate value} \\ \hline
Make s active, and        &                                &                          \\
\hspace{1em} s = true                  & s = true, m = true, w = false  & true      \\
\hspace{1em} s = false                 & s = false, m = true, w = false & false     \\  \hline
Make m active, and        &                                &                          \\
\hspace{1em} m = true                  & s = true, m = true, w = false  & true      \\
\hspace{1em} m = false                 & s = true, m = false, w = false & false     \\  \hline
Make w active, and        &                                &                          \\
\hspace{1em} w = true                  & s = true, m = false, w = true  & true      \\
\hspace{1em} w = false                 & s = true, m = false, w = false & false     \\ \bottomrule
\end{tabular}
\end{mdframed}
```

+-------------------------------+------------------------------------------+------------------------------+
| **Test description**          | **Inputs**                               | **Predicate value**          |
+===============================+==========================================+==============================+
| Make s active, and<br>        |                                          |                              |
| &nbsp;       s = true<br>     | s = true, m = true, w = false<br>        | true<br>                     |
| &nbsp;       s = false        | s = false, m = true, w = false           | false                        |
+-------------------------------+------------------------------------------+------------------------------+
| Make m active, and<br>        |                                          |                              |
| &nbsp;       m = true<br>     | s = true, m = true, w = false<br>        | true<br>                     |
| &nbsp;       m = false        | s = true, m = false, w = false           | false                        |
+-------------------------------+------------------------------------------+------------------------------+
| Make w active, and<br>        |                                          |                              |
| &nbsp;       w = true<br>     | s = true, m = false, w = true<br>        | true<br>                     |
| &nbsp;       w = false        | s = true, m = false, w = false           | false                        |
+-------------------------------+------------------------------------------+------------------------------+



(Here, we aren't told what the expected outcome is if the predicate
comes out true or false; if we were, we could add a column "Expected
outcome" which listed this.)

If you aren't told the exact *types* of variables or methods used in a
predicate, that means you should be able to work them out from context.
For example, for the predicate

$$
(x > 0) \vee (M \wedge (e < d +c))
$$

you can assume that $M$ is a boolean, and that $x$, $c$, $d$ and $e$
are some numeric type (such as `int`).


For each of the clauses in the predicates below,
identify test inputs which will make the
clause *active*
(that is: state what values need to be assigned to the variables
in the predicate), and vary that clause so it takes on both true
and false values. (In other words: write test values that
achieve Restricted Active Clause Coverage.)
Explain your reasoning.

a.  $A \vee (B \wedge \neg C)$
#.  $x > 0 \; \vee  (M \wedge (e < d +c))$
#.  $G \vee (m \geqslant a) \vee H \wedge U$





## 5. Scenario -- trap-doors

Suppose a component under test has the following requirements:


\genericbox
<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

If the lever is pulled and the chair is occupied, open
the trap-door.

If the button is pressed, open the trap-door.

</div>
\endgenericbox


Represent the component as a set of logic expressions.
You should explain what each variable in your expressions
means. (For an example, look in section 2 at the way we gave
definitions for the variables in the predicate $s \wedge (m \vee w)$.)

(Hint: if you're stuck, try writing out what the
component does as one or more "`if`" statements,
in pseudocode.
Then recall that the set of all predicates in a system
means the set of all logical expressions found in things
like "`if`" statements.)






## 6. Scenario -- login page

Suppose you are part of a team developing a website
called "RateMyVeterinarian", where people can log in
and provide anonymous reviews of the veterinarian
services they use.

Requirements for the site are currently being finalised,
and one requirement is stated as follows:

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

When a user enters a user ID and password into
the login page and hits the "log in" button,
then if that user ID is listed in the "users" database,
and the password matches against the password in
the record for that user, and the user record
does not state that the account has been disabled,
a "Welcome" page should be displayed.

</div>



a.  How easy to understand do you think this requirement
    is? If you think it could be made easier to understand,
    suggest how.

b.  One of your colleagues suggests that because correctly
    authenticating users (and keeping their details secure) is an
    important feature, this requirement should be thoroughly tested --
    so you should design a test suite that meets RAC (Restricted
    Active Clause) levels of coverage.
    Do you agree? Why or why not?



## 7. Tips and tricks

When solving problems that involve logic-based testing, make sure you understand the
difference between *expressions* and *statements* in the programming language or languages
that you're using.

For instance, simple Java `if` statements [are of the form][java-if]:

&nbsp;&nbsp;  `if (` **`Boolean expression`** `) {` **`Statements`** `}`

Statements are parts of the language that *do* things; we usually execute them in order to
achieve some side effect. Boolean expressions evaluate
to a Java `boolean` value, and we typically intend that they should *not* have side effects --
they just evaluate to `true` or `false`.

When we do logic-based testing, we're focusing on the collection of logic *expressions* of a program or system that
control program flow, and working out how to write tests that thoroughly exercise the
component parts (the clauses) of those expressions.

<!--
 (unless they happen to have more logic expressions within them); we're just
working out how to get the correct clauses to be evaluated. If using the "Arrange, Act, Assert"
pattern, we're focusing on the "Act" portion -- what parameters etc. we need to supply in
order for the correct clauses to be evaluated.
-->

Confusing expressions with statements, or vice versa, is a common reason for students to do poorly in test or
exam questions involving logic-based testing.


[java-if]: https://docs.oracle.com/javase/specs/jls/se22/html/jls-14.html#jls-14.9



<!-- vim: syntax=markdown tw=92 :
-->
