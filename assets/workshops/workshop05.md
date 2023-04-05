---
title: CITS5501 lab 5 (week 6)&nbsp;--&nbsp;logic-based testing 
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

## 0. Notation

When writing logic expressions, we will normally use
mathematical notation for "and", "or", and "not":

- $\wedge$ -- "and"
- $\vee$ -- "or"
- $\neg$ -- "not"

If writing actual Java code, however, we use the normal
Java logical operators:

- `&&` -- "and"
- `||` -- "or"
- `!` -- "not"

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

**Other operators and languages**

Java also has non–short-circuiting logic operators, `|` and `&`.

We won't be using any Python in this unit -- but for reference,
in Python, the logic operators are all spelled out: "and", "or" and
"not".

</div>


## 1. Terminology -- clauses and predicates

If you need to, review the lecture material and recommended readings
that explain what
*predicates* and *clauses* are.

What are the *clauses* in the predicates below?


a.  $((f \leqslant g) \wedge (x > 0)) \vee (M \wedge (e < d +c))$

#.  $G \vee ((m > a) \vee (s \leqslant o + n)) \wedge U$





## 2. Making clauses active

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





## 3. Scenario -- trap-doors

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






## 4. Scenario -- login page

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








<!-- vim: syntax=markdown tw=72 :
-->
