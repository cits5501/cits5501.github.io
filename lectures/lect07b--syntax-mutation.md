
---
title: |
  CITS5501  Software Testing and Quality Assurance\
  Syntax-based testing:\
  Program-Based Mutation Testing
author: "Arran Stewart and Rachel Cardell-Oliver"
---

### Previous Lecture


  - Motivation - What is syntax-based testing?

  - Theory - Formal Grammars and Coverage Criteria
  
  - Applications of Syntax-based testing

  - Input-Space Mutation Testing

  - \alert{Program-Based Mutation Testing (this lecture)}
  
### Overview

- Motivation - What is Program-Based Mutation testing?

- Theory and Definitions

- In Practice - Worked Example and Tools



*Reading*: Ammann and Offutt. Introduction to Software Testing,  2016. *Ch 9 Syntax-Based Testing*

Also see this great introduction: [pitest.org][pit]

# Motivation

### Program-Based Mutation testing Motivation: Are we missing any tests?

Some useful techniques for working out if there are gaps in our tests are:

  - **graph coverage** techniques -|- may show us that there are
        portions of code that have never been tested
        
  - **logic coverage** techniques -|- may show us we haven't
        tested different sub-parts of conditions
        
  - **program-based mutation testing** can be used to "test the tests" -|- if we mutate
        a program, and it still passes all our tests, something is wrong

In this lecture we will explore program-based mutation testing.

### Program-Based Mutation Testing in a nutshell

- Mutation testing is conceptually quite simple.


- Faults (or mutations) are automatically seeded into your code, then your tests are run. If your tests fail then the mutation is killed, if your tests pass then the mutation lived.

- The quality of your tests can be gauged from the percentage of mutations killed.

- Source: see this great introduction: [pitest.org][pit]


### Program-Based Mutation Testing

\alert{Program-Based Mutation testing} (also called "mutation analysis") is a
technique for evaluating the \alert{quality} of a \alert{suite of software tests}

- Suppose we have some program under a test, and a suite of tests
  designed to identify defects in it.
- Mutation testing works by \alert{modifying the program under test} in
  small ways (e.g. flipping a less-than sign to a greater-than;
  changing a hard-coded number from 0 to 1).
  

### Program-Based Mutation testing (cont)
  
  - Mutations are usually designed to mimic typically programming
    errors, such as typographical errors, wrong choice of operator,
    or off-by-one errors
    
  - If one of our \alert{tests} behaves differently for the mutant (vs on the original program), we say that test \alert{kills} the mutant
  - If the test suite doesn't detect and reject the mutated code, we consider the test suite is defective, and we need to consider more/different test cases.

### Mutation example

-   A sample method to test (in a Java-like language):\
    &nbsp;&nbsp; `int mult(int a, int b) { return a * b; }`{.java}
-   A possible test:\
    &nbsp;&nbsp; `assertEquals( 1, mult(1,1) );`
-   Is this a useful test?

### Mutation example (2)

-   ans.: No, it's terrible.
-   Consider the following **mutation** of the original code:\
    &nbsp;&nbsp;&nbsp; `int mult(int a, int b) { return a * b; }`{.java} \
    \
    $\Rightarrow$ `int mult(int a, int b) { return a ** b; }`{.java} \
    \
    (where `**` is a "power" operator)
-   `1*1 == 1**1` so our test will still pass -
    - so it's a pretty poor test because it *does not* ''kill'' the mutant

-   A **good quality** suite of tests should be able to catch these types of errors

# Theory

### Mutation testing is a syntax-based test method

Mutatation testing is a form of **syntax-based testing** 

Mutations (changes) to the program under test can be defined by a grammar

### Mutation testing -- terminology

-   \alert{Ground string}: A string in the grammar
    -   (The term "ground" basically means "not having any variables" -- in
        this context, not having any non-terminals)
        
-    \alert{Mutation operator}: A rule that specifies syntactic variations of
    strings generated from a grammar
    -   (e.g. "If the string has a less-than symbol in it, flip that intro a greater-than symbol")
        
-    \alert{Mutant}: The result of one application of a mutation operator on the ground string

-   A mutant is a string

### Killing Mutants

- An example of a ground string is -- our program under test.
- ... since it's a string in the grammar of "syntactically valid Java
  programs"
- We apply our mutation operator to the ground strings to generate
  *mutants*, new valid strings
- \alert{Killing mutants}: If we have some mutant generated from the
  original ground string, and we look at one or several of our
  tests, we can ask: do they "\alert{kill}" the mutant?
  - i.e. Does the test(s) give a different result for the mutant,
    compared to the original?
  - If it does, it's said to "kill" the mutant.



# Coverage Criteria

### Syntax-based coverage criteria -- mutant coverage

-   We can define a coverage criterion in terms of killing mutants:

\alert{Mutation Coverage (MC)}

:   For each mutant $m$, the test requirements contain exactly one
    requirement to kill $m$.

-   Coverage in mutation equates to number of mutants killed

-   The number of mutants killed is called the \alert{mutation score}

### Coverage criteria -- creating invalid strings

-   When creating mutants (i.e. invalid strings), two simple criteria:
	-  use every operator once or 
	- use every production once
	
- TR is \alert{test requirements}.
TR are descriptions of test cases that will be refined into executable tests

\alert{Mutation Production Coverage (MPC)}

:   For each mutation operator, TR contains several requirements, to create
    one mutated string $m$ that includes every production that can be mutated
    by that operator

\alert{Mutation Operator Coverage (MOC)}

:   For each mutation operator, TR
    contains exactly one requirement, to create a mutated string $m$ that is
    derived using the mutation operator



### Coverage criteria -- practical concerns

-   The number of test requirements for mutation is somewhat difficult to quantify
because it depends on the syntax of the artifact as well as the mutation operators

-   In most situations, **mutation yields more test requirements than any other coverage
criterion** 


# In Practice



### Frameworks for mutation testing

Mutation testing is difficult to apply by hand and automation is more complicated than for most other criteria.

As a result, mutation is widely considered a
*high-end* coverage criterion, more effective than most but also more expensive.

One common use of mutation is as a sort of *gold standard* in experimental studies
for comparative evaluation of other test criteria.

Some example mutation testing frameworks are:

- [PIT][pit], for Java (originally stood for "Parallel Isolated
  Test")
- [Mutpy][mutpy], for Python
- [Stryker][stryker], for C#
- [Mutagen][mutagen], for Rust (motto: "Breaking your Rust code for
  fun & profit")

[pit]: https://pitest.org/
[mutpy]: https://github.com/mutpy/mutpy
[stryker]: https://stryker-mutator.io/
[mutagen]: https://github.com/llogiq/mutagen

### Advantages and disadvantages

Advantages and disadvantages of mutation testing:

```{=latex}
\begin{columns}[t]
\begin{column}{0.4\textwidth}
```

- Identifies weak/ineffective tests
- Very effective at finding problems
- Helps quantify how useful your tests are

```{=latex}
\end{column}
\begin{column}{0.5\textwidth}
```

- Can be time-consuming (large number of mutants to generate, whole
  test suite needs to be run many times)
- Results require some familiarity with mutation testing to be
  properly understood.


```{=latex}
\end{column}
\end{columns}
```


### Mutation testing example[^alexb] -- IOT cat door

Suppose we have an Internet of Things (IoT)--enabled
cat door. The final cat door will be implemented as hardware
with embedded software; but we can still check our logic using
testing techniques we have seen before.

We have the following user story describing the purpose of
the cat door: `\\[1em]`{=latex}

> Using my home automation system (HAS), \
> I want to control when the cat can go outside, \
> because I want to keep the cat safe overnight.

[^alexb]: Adapted from Alex Bunardzic, "[Mutation testing by
  example: Failure as experimentation][mut-example]" (2019)

[mut-example]: https://opensource.com/article/19/9/mutation-testing-example-failure-experimentation

### Cat door interface

We represent the cat door using the following
interface:

\small

```java
  public interface ICatDoor {
    /** When "day" is supplied, unlock the door;
      * when "night" is supplied, lock the door */
    public void control(String dayOrNight);
    /** Returns either "locked" or "unlocked" */
    public String getStatus();
  }
```

### Testing scenario

We want to write tests revolving around the following scenario:

::: block

#### Scenario #1: Disable cat trap door during nighttime

Given that the day/night detector detects that it is nighttime \
When the day/night detector notifies the HAS \
Then HAS disables the IoT-capable cat door

:::

(We won't worry about how the day/night detector is implemented.
Perhaps it uses ambient light levels; perhaps it consults a database
of sunrise/sunset times for its current geographical location.)

### Cat door code under test

\small

```java
  public class CatDoor implements ICatDoor {
    // ...
    public void control(String dayOrNight) {
      if (dayOrNight.equals("night")) {
        this.lock();
      } else {
        this.unlock();
      }        
    }
  }
```

### Cat door test code

\small

```java
  public class TestGivenNighttimeDoorLocked {
    @Test
    public void test() {
      ICatDoor door = new CatDoor();
      door.control("night");
      String expected = "locked";
      String actual   = door.getStatus(); 
      assertEquals(expected, actual, "status should be locked");
    }
  }
```

### start PIT running

\small

```
27:46 am PIT >> INFO : Completed in 2 seconds
================================================================================
- Mutators
================================================================================
> org.pitest.mutationtest.engine.gregor.mutators.rv.ROR3Mutator
>> Generated 1 Killed 1 (100%)
> KILLED 1 SURVIVED 0 TIMED_OUT 0 NON_VIABLE 0 
> MEMORY_ERROR 0 NOT_STARTED 0 STARTED 0 RUN_ERROR 0 
> NO_COVERAGE 0 
--------------------------------------------------------------------------------
> org.pitest.mutationtest.engine.gregor.mutators.VoidMethodCallMutator
>> Generated 2 Killed 2 (100%)
> KILLED 2 SURVIVED 0 TIMED_OUT 0 NON_VIABLE 0 
<more output snipped>
```

### PIT output

`\begin{center}`{=latex}
![](images/pit-mut-output-A.png)
`\end{center}`{=latex}


### PIT output

`\begin{center}`{=latex}
![](images/pit-mut-output-B.png){width="110%"}
`\end{center}`{=latex}


  
### Summary

- Motivation - What is Program-Based Mutation testing?

- Theory Definitions

- Coverage Criteria

- In Practice - Worked Example and Tools


