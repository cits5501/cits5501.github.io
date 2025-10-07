---
title: |
  CITS5501 lab 7 (week 8)&nbsp;--&nbsp;reviews &nbsp;--&nbsp;solutions
---

## Reading

It is strongly suggested you complete the recommended readings for weeks 1-7
*before* attempting this lab/workshop.

## A. Code review

*Code review* is careful, systematic study of source code by people who are not
the original author of the code. It's analogous to having someone proofread
a written essay or assignment before you submit it.

It has two main purposes:

-   **Improving the code.** Finding bugs, anticipating possible bugs,
    checking the clarity of the code, and checking for consistency with
    the project's style standards.
-   **Improving the programmer.** Code review is an important way that
    programmers learn and teach each other about new language features,
    changes in the design of the project or its coding standards, and
    new techniques. In open source projects, particularly, much
    conversation happens in the context of code reviews.

Code review is widely practiced in open source projects like Apache and
[Mozilla](http://blog.humphd.org/vocamus-1569/?p=1569), as well as in
industry.

Most companies and large projects have coding style standards (for
example, the [Google Java Style](https://google-styleguide.googlecode.com/svn/trunk/javaguide.html)).
These can get pretty detailed, even to the point of specifying
whitespace (how deep to indent) and where curly braces and parentheses
should go. We won't get into that much detail, but we stress that

- it's important to be self-consistent
- when working on a team project, it's *very* important to follow
  the conventions or style guide adopted by that project.

If you're interested in getting more details about how code review works,
then there is more information available in the *Pressman* textbook,
as well as a whole [StackExchange site][code-review-stack] dedicated
to code review.

[code-review-stack]: https://codereview.stackexchange.com 

## B. Exercise


<!--
For this exercise you
should split up into small groups of 2-3 people.
If you are attending online via Teams, your facilitator should  be able to
create "breakout rooms" for you, by following the [MS Teams
instructions][ms-teams-breakout]; but failing that, instead do a solo review of the
code, and report back to the class as a whole with your findings.

[ms-teams-breakout]: https://support.microsoft.com/en-us/office/use-breakout-rooms-in-teams-meetings-7de1f48a-da07-466c-a5ab-4ebace28e461#bkmk_create-breakout-rooms
-->

For each of the following code samples, take the time
to read through the code carefully,
bearing in mind the "Code review instructions" at the end of this sheet
and recording problems they find (and possibly suggesting
concrete improvements).

After you've attempted the exercises, it's recommended you drop in on
one of the timetabled labs, to compare your answers with other students
(or to discuss them with one of the lab facilitors).

### Code sample 1 -- `dayOfYear`

```java
public static int dayOfYear(int month, int dayOfMonth, int year) {
    if (month == 2) {
        dayOfMonth += 31;
    } else if (month == 3) {
        dayOfMonth += 59;
    } else if (month == 4) {
        dayOfMonth += 90;
    } else if (month == 5) {
        dayOfMonth += 31 + 28 + 31 + 30;
    } else if (month == 6) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31;
    } else if (month == 7) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31 + 30;
    } else if (month == 8) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31 + 30 + 31;
    } else if (month == 9) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31;
    } else if (month == 10) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30;
    } else if (month == 11) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31;
    } else if (month == 12) {
        dayOfMonth += 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 31;
    }
    return dayOfMonth;
}
```


What problems can you see with this code? What improvements
would you suggest?

Does it violate any of the guidelines given in the "Code review instructions"?


<div class="solutions">

\solbox

Some problems with code sample 1:

- No Javadoc comment: there's no specification or explanation of what the
  method is supposed to do.
- Confusing order of arguments: they are in the order month, then
  day, then year. More logical would be day, month, year (or year,
  month, day). In languages with [keyword arguments][keyword],
  like Python,
  you could do better still, and insist the caller clearly label
  each argument with what it is supposed to represent.
- Violates the DRY principle: the code is *extremely* repetitive.
  For instance, the number of days in January (31) is repeated many times
  through the code.
- Contains "magic numbers".
- The result is actually *wrong* for any year that is a leap year.
  In the improved code sample below, we assume we have access to an
  `isLeapYear(int year)` method.
- One purpose for each variable: the parameter `dayOfMonth` is
  re-used to store the result. It's better for each variable to
  serve one clear and distinct purpose.

[keyword]: https://en.wikipedia.org/wiki/Named_parameter 

There are many possible ways to improve this code, but here's one
(quick) possibility:

```java
/** Given a date, specified by providing a day of the month (bounds
 * depend on the exact month, but should always be between 1 and 31
 * inclusive), a month (from 1 to 12), and a 4-digit year,
 * return what day of the year that date occurs on.
 */
public static int dayOfYear(int dayOfMonth, int month, int year) {
  // For non-leap years: days in Jan-Nov.
  int monthLength = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 31 };
  int result = dayOfMonth;

  // e.g. days in Feb have added to them the no. of days in Jan
  // (array pos 0) added to them, only.
  for int (i = 0; i < month - 1; i++) {
    result += monthLength[i];
  }
  // months past Feb are affected by leap years
  if (isLeapYear(year) && month > 2) {
    result += 1;
  }
  return result;
}
```


It too could still be improved:

- The Javadoc should explicitly
  document each parameter and the return value.
- We could add to the Javadoc an explanation of what happens if
  out-of-bounds values are supplied (e.g. -1 or 0 for the month) -- probably,
  throwing an exception would be most appropriate.

  (Note that in *this* context -- improving a piece of code -- it's
  perfectly fine to alter the specifications/design. But when
  writing *tests* for a method, the only thing you can test against
  is what the documentation says.)
- Rather than using magic numbers for months -- we could define a
  Java [enum][java-enum]:

  ```java
  enum Month {
    JAN = 1,
    FEB,
    MAR,
    // ... etc.
  ```

  Then callers (and readers of the code) wouldn't have to guess at
  what `month > 2` means (it'd be written `month > FEB`). 

[java-enum]: https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html

</div>
\endsolbox


\newpage

### Code sample 2 -- `leap`

Hopefully you spotted one problem with the previous code sample --
it gives the wrong answer, when the year is a leap year!

So suppose a colleague writes the following method, intended to determine
whether a year is a leap year. Again,
look for problems in and potential improvements to this code, and
drop in on one of the labs to compare solutions.


```java
public static boolean leap(int y) {
    // convert to string so we can access 1st, 2nd digit etc
    String tmp = String.valueOf(y);
    if (tmp.charAt(2) == '1' || tmp.charAt(2) == '3' || tmp.charAt(2) == 5 || 
        tmp.charAt(2) == '7' || tmp.charAt(2) == '9') {
          if (tmp.charAt(3)=='2'||tmp.charAt(3)=='6') return true; /*R1*/
          else
              return false; /*R2*/
    }else{
        if (tmp.charAt(2) == '0' && tmp.charAt(3) == '0') {
            return false; /*R3*/
        }
        if (tmp.charAt(3)=='0'||tmp.charAt(3)=='4'||tmp.charAt(3)=='8')
          return true; /*R4*/
    }
    return false; /*R5*/
}
```



<div class="solutions">

\solbox

Some problems with code sample 2:

- Still no Javadoc comment!
- Also, there's no need for a one-letter parameter name: why not
  call the `y` paramater `year`?
- The year is converted into a String, simply so we can access
  particular digits. This is needlessly expensive (at worst),
  and an obscure way of doing things (at best).
- The method could be named better. Method names are usually verb
  phrases, like `getDate` or `isUpperCase`, while variable and class
  names are usually noun phrases.
- Comments have been added, but they are cryptic -- there's
  no information as to what "R1", "R2" etc are.
  (Though presumably they're some sort of reference to different
  bits for the algorithm for determining a leap year,
  <https://en.wikipedia.org/wiki/Leap_year#Algorithm>.
  Perhaps this one:
  <https://docs.microsoft.com/en-us/office/troubleshoot/excel/determine-a-leap-year#how-to-determine-whether-a-year-is-a-leap-year>.)

  Don't do this! If trying to implementing a specific, publicly
  available algorithm or data structure, give a citation so people
  know exactly what you're using. e.g. "This implementation of a
  Red-Black Tree is based on Cormen, Leiserson, Rivest and Stein,
  *Introduction to Algorithms*, 3rd edn, chapter 13."
- Code formatting is very inconsistent, making it harder to
  understand what the method is doing (e.g. why is the "return"
  statement in line 6 on the same line?)
- The method makes the assumption that the year is a 4-digit year
  (if it's only 2-digit, expressions like `tmp.charAt(3)` in line
  13 will throw
  exceptions). This assumption should be clearly documented (or
  better yet, not made at all -- what if historians or astronomers
  want to use this code for proleptic Gregorian years in the 1st century
  A.D.?)
- It uses an extremely obscure algorithm, and gets many years wrong,
  anyway -- try 1600 or 1552.

There are many possible ways to improve this code, but here's one
(quick) possibility, which makes improvements including the
following:

- a good practice is to name methods that return booleans "is ...
  (something)" or "are ... (something)".

```java
/** Returns whether the proleptic Gregorian calendar year
  * <code>year</code> is a leap year.
  *
  * Uses the algorithm described in *Calendrical Calculations* by
  * Reingold & Dershowitz, chapter 3.
  */
public static boolean isLeapYear(int year) {
  if (year % 4 != 0) {
    return false;
  } else if (year % 100 != 0) {
    return true;
  } else if (year % 400 != 0) {
    return false;
  } else {
    return true;
  }
}
```
<!-- end**  -->

If following a well-known algorithm (especially one this short), inline comments
probably aren't necessary (but Javadoc documentation still is).

</div>
\endsolbox




## C. Linters and formatters

In general, it's expensive to spend the time of humans doing
something a computer could do equally well -- like formatting code
correctly, or spotting errors that can be checked for mechanically.
So before a human reviews your code, you should ensure it's already
been checked for basic errors by a computer.

Programs called [*code formatters*][formatters], *code beautifiers* or
*pretty-printers* apply consistent formatting to code. Some
apply a single rigid, built-in style (e.g. "all indents are 4 spaces")
but most can be customised to reproduce a style the team prefers.
One commonly-used formatter used in Java projects is
[*Spotless*][spotless], which can be integrated easily with the
Microsoft Visual Studio Code editor, or the [IntelliJ IDEA
IDE][intellij]. If you use either of those tools to write your Java
code, you might like to experiment with it.

[formatters]: https://en.wikipedia.org/wiki/Prettyprint
[spotless]: https://github.com/diffplug/spotless
[intellij]: https://www.jetbrains.com/idea/

[*Linters*][linter] analyse your source code looking for common programming
errors, poor style, and programming language constructs which
should be used with caution. They are performing a simple form of
*static code analysis* (which we'll talk more about later).
Examples of linters for Java include
[Checkstyle][checkstyle], [Spotbugs][spotbugs], and [PMD][pmd].
In your own time, you might like to try running one of these
tools over code you have written, to see what sort of
problems they can flag.

[linter]: https://en.wikipedia.org/wiki/Lint_(software)  



[checkstyle]: http://checkstyle.sourceforge.net/
[spotbugs]: https://spotbugs.github.io/
[pmd]: https://pmd.github.io/

\newpage

## D. Ant build files and code coverage tools

This exercise is to get you familiar with code coverage tools and some of their weaknesses.

A repository with Java code is provided at 
<https://github.com/cits5501/week-8-lab-coverage-example> which contains a simple class
for detecting whether a Java string is a palindrome (`Palindrome.java`), and tests for
this class using JUnit.

You can use [GitPod](https://www.gitpod.io) to work with this code online. You will need a GitHub account; once you
have one set up, follow the link below:

&nbsp; <https://gitpod.io/new/#https://github.com/cits5501/week-8-lab-coverage-example>

and select "New workspace".

After a minute or two, you should get access to an online version of the VS Code editor in which
the source code for the repository is available. Take a look at the `build.xml` file; this file
is used by the [Apache Ant][ant] build automation tool. It defines
several "targets" representing tasks that can be run using the build
file:

[ant]: https://en.wikipedia.org/wiki/Apache_Ant

- init
- compile
- compileTest
- test, and
- report.

(Some of these tasks you can also do just using VS Code. For instance,
open `PalindromeTest.java`, expand the "outline" and "java projects"
panes, and wait for the background tasks to finish.
A green triangle should appear next to the start of the `PalindromeTest`
class, indicating that it can be clicked to run the JUnit tests it
contains.)

Click the "Terminal" pane, and type `ant test` to run the JUnit tests.
The messages should indicate that four tests were run with no failures.

Now run `ant report`, and not only will the tests be run, but the paths
they take through the code of `PalindromeTest` will be recorded by a
tool called [JaCoCo][jacoco], and a report produced.

[jacoco]: https://www.jacoco.org/jacoco/

You can view this by clicking "Go Live" in the VS Code taskbar (towards
the right). This serves up the contents of the repository directory via
HTTP, so it can be viewed in the browser. Click "report", and by
clicking through, you should be able to see a coverage report for our
tests.


![](jacoco-coverage-rep.png){ width="20cm" }


Read the JaCoco documentation on "Coverage Counters", [here][cov],
for more information about exactly what is being measured.

[cov]: https://www.eclemma.org/jacoco/trunk/doc/counters.html

**Exercises**

- Comment out one of the assert statements (e.g. the one containing
  `p.isPalindrome("redivider")`) and replace it with the bare call to
  `p.isPalindrome()`.

  Does the coverage report change at all? Try doing the same for all
  tests, and check again. What weakness of coverage tools does this
  suggest?

- Comment out all but one of the tests. Again, does the coverage report
  change?

- Applying the ideas from ISP (but without necessarily doing a detailed
  analysis) -- can you spot any test cases that are missing from the
  test suite?


<div class="solutions">

\solbox

**Solution**

The coverage report doesn't change in any of the above
cases.

This suggests we could have a very weak test suite, consisting
of just one test case -- say, an empty string (`""`) -- and with no
assertions, and full coverage would still be reported.

If changes are made to the code, we could easily introduce errors that
aren't picked up by the test suite.

When we look at mutation testing, we will see ways of assessing the
quality of our tests which do not depend on measuring coverage as
reported by tools like JaCoCo.

As for a missing test case: an empty string (a degenerate or "border"
case) would be a good thing to test for, as would single-letter strings,
but this is not done.


</div>
\endsolbox


\newpage




## E. Summary

Code review is a widely-used technique for improving software quality by
human inspection. Code review can detect many kinds of problems in code,
but in this workshop we looked at code samples which highlighted
the following general principles:

-   Don't Repeat Yourself (DRY)
-   Comments where needed
-   Avoid magic numbers
-   One purpose for each variable
-   Use good names
-   Use whitespace for readability

These general principles help ensure that code is:

-   **Safe from bugs.** In general, code review uses human reviewers to
    find bugs. DRY code lets you fix a bug in only one place, without
    fear that it has propagated elsewhere. Commenting your assumptions
    clearly makes it less likely that another programmer will introduce
    a bug.

-   **Easy to understand.** Code review is really the only way to find
    obscure or confusing code, because other people are reading it and
    trying to understand it. Using judicious comments, avoiding magic
    numbers, keeping one purpose for each variable, using good names,
    and using whitespace well can all improve the understandability of
    code.

-   **Ready for change.** Code review helps here when it's done by
    experienced software developers who can anticipate what might change
    and suggest ways to guard against it. DRY code is more ready for
    change, because a change only needs to be made in one place.




# Appendix -- Code review instructions

This document describes how and why to perform code reviews.

You can't learn how to write without learning how to read -- and
programming is no exception. Code reviewing is widely used in software
development, both in industry and in open source projects. Some
companies like Google even make it a policy that *all* code must be
reviewed before being committed to version control -- this means
that for every single line of code in Google's repository, another
software developer has
read it, given feedback
on it, and signed off on it.

Code review can be seen as a type of *static quality assurance*
technique (it doesn't require the code to be run), and has multiple
benefits:

- It helps find bugs, in a way that's complementary to other techniques (like
  testing and static analysis)
- Reviewing uncovers code that is confusing, poorly documented,
  unsafe, or otherwise not ready for maintenance or future change. 
- Reviewing spreads knowledge through an organization, allowing developers to learn from each other by
  explicit feedback and by example.

So code reviewing is not only a practically important skill that you
will need in the real world, but also a learning opportunity.

## What to look for

In the exercises for this workshop,
you can make comments about *anything* you think is relevant.
But some guiding principles are that we want code to be:

- free from bugs
- easy to understand, and
- easy for another developer to change.
 
So read the code with those principles in mind. What follows are
some concrete examples of problems to look for -- feel free to add
others.

**Bugs or potential bugs.**

-   Repetitive code (remember the "DRY" principle -- "[Don't Repeat Yourself][dry-princ]").
-   Disagreement between code and specification.
-   Off-by-one errors.
-   Using global variables when a smaller scope could be used.
-   Optimistic, undefensive programming.
-   [Magic numbers](https://en.wikipedia.org/wiki/Magic_number_(programming)).

[dry-princ]: https://en.wikipedia.org/wiki/Don't_repeat_yourself

**Unclear, messy code.**

-   Bad variable or method names.
-   Inconsistent indentation.
-   Convoluted control flow (if and while statements) that could be
    simplified.
-   Packing too much into one line of code, or too much into one method.
-   Failing to comment obscure code.
-   Having too many trivial comments that are simply redundant with the
    code.
-   Variables used for more than one purpose.

**Misusing (or failing to use) essential design concepts.**

-   Incomplete or incorrect specification for a method or class.
-   Exposing (as `public` or `protected`) implementation details
    that should be kept `private`.
-   Invariants that aren't really invariant, or aren't even stated.

Positive comments are also a good thing. Don't be afraid to make
comments about things you really like, for example:

- unusually elegant code
- creative solutions, or
- great design.



# Credits

The code samples, instructions and exercises in sections
A--B and E are adapted from MIT's course 6.005, "Software Construction",
reading 4, "Code Review", available from the [MIT website][mit-code-rev], which was
collaboratively authored with contributiopn by Saman Amarasinghe, Adam
Chlipala, Srini Devadas, Michael Ernst, Max Goldman, John Guttag, Daniel
Jackson, Rob Miller, Martin Rinard, and Armando Solar-Lezama. This worksheet
(as well as the original MIT content) is licensed under the [CC BY-SA
4.0][cc-by-sa] license.




[mit-code-rev]: https://web.mit.edu/6.005/www/fa15/classes/04-code-review/
[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/ 

<!-- vim: syntax=markdown
-->

