---
title: |
  CITS5501  Software Testing and Quality Assurance\
  System, integration and regression testing
author: 'Unit coordinator: Arran Stewart'
---

### Overview

- Types of tests
- Testing strategy
- Integration testing
- Other types of testing:
  - Regression testing
  - "Smoke" testing
  - End-to-end
  - Alpha/beta
- System testing

### Types of tests

Recall the "test pyramid" from lecture 3:

![](../A--intro/lect03-images/test-pyramid.eps){ width=80% }

### Types of tests

- We've looked in detail at unit tests, which test some "unit" of software
  - They are intended to check the *behaviour* of that unit -- to exercise it and look for deviations from its specification
  - We normally *mock* other external classes used in the test

&nbsp;

- *Integration testing* focuses on the flow of data and information
  between two components, and their *interface*
  - It asks, "Do they work properly together?"
- It is probably impossible to draw a hard dividing line between units tests
  and integration tests -- some tests might be hard to classify
- But many tests will either have as their focus a small unit of code
  in isolation (unit tests) or the interaction between two or more
  components (integration tests)

### Types of tests

- *System* tests aim to test the entire system against its requirements
  and specifications.

&nbsp;

- Recall that many \alert{non-functional} requirements (security, scalability,
  maintainability, performance) are *emergent* properties: they aren't a property
  of any single component in isolation, but rather emerge from the way
  multiple components interact as a whole
- This means that towards the *bottom* of the test pyramid, we'll often be
  more focussed on testing functional requirements/specifications
- But as we move towards the top of the pyramid, it becomes possible to test
  for non-functional requirements.


### Testing strategy

-   Typically, we begin by 'testing-in-the-small' and move toward 'testing-in-the-large'
    -   Start with units (functions/classes)
    -   Then start integrating them

### Testing strategy

-   While doing unit testing, we will typically make use
    of "mocks"/doubles in place of other units or modules
-   In integration testing, we can test how two (or more) units or modules work together
    - The units or modules under test will *not* be mocked, obviously, since what we want to know
      is whether they work properly together
    - But they might rely on additional components (e.g. databases) which *are* mocked.
-   The closer we get to the top of the test pyramid, the fewer mocks we use,
    in favour of using components which are as close to the production environment
    as we can get.

### Integration vs unit testing

- Do we need both?

\pause

Yes ...

- Unit testing is a necessary basis for integration testing
  - gives maximum control over individual
    units
- Integration testing 
  - *may* discover module faults not found in unit testing -- \
    but that's a sign of insufficient unit testing
  - Ideally, should discover faults in the interfaces / flow
    of control between otherwise correct modules
  - Can be used to test third-party components which
    we can't unit test

### Why do integration testing?

- Unit tests only test the unit in isolation
- Many failures arise from faults in the *interaction*
  between components
- Letting faults persist until system testing or deployment
  can be very expensive

### Integration testing

-   The entire system is viewed as a collection of subsystems (sets of
    classes) determined during the system and object design.
-   The order in which the subsystems are selected for testing and
    integration determines the testing strategy

### Examples of integration faults

- One component calls another incorrectly
  - e.g. perhaps calls must happen in a particular order
- Components have inconsistent interpretation of parameters or values
  - e.g. a parameter represents units of force -- but is it
    in Newtons (SI system) or pounds (US)? (Cause of a Martian
    Lander fault)
- Conflicts arising due to side effects
  - e.g. two components try to make use of same temporary file

### Examples of integration faults, cont'd

- Emergent failures (non-functional properties)
  - We said that many qualities of a system (e.g. performance, security)
    can't be localised to a single component, but
    arise from the interaction of components.
  - It follows that *failures* relating to those qualities (poor performance,
    poor security) sometimes can only be detected from the interaction
    of components     

### Integration testing strategies

Main options:

-   Big bang integration (nonincremental)
-   Bottom up integration
-   Top down integration
-   Sandwich testing
-   Variations of the above

### Drivers and stubs

Terminology sometimes used in integration testing:

- \alert{Driver}: A program that makes calls
  into the module being tested and reports the
  results
  - The driver simulates some module that (in the final system)
    *will call* the module under test
- \alert{Stub}: A module that has the same interface as
  the module under test, but is simpler
  - The stub simulates a module which is *called by*
    the module under test

### "Big Bang" Integration Testing

The approach:

- Do no integration testing until all modules have been
  completed; \
  then try and test everything at once.

Problems:

- Expensive, if faults could've been detected earlier
- Poor ability to observe faults and diagnose/localize them

### Top-down integration

- Test the top layer or controlling subsystem first
  - It's the "top" module in the sense that it *uses*
    or calls into other modules
- Use stubs to simulate components we haven't implemented/integrated
  yet
- Then start implementing the subsystems called by that
  top system, and test them in the same way ...
- And continue "down" until everything is done.

### Top-down integration {.fragile}

```{=latex}
\begin{columns}[t]
\begin{column}{0.6\textwidth}
```

`\begin{center}`{=latex}
![](images/top-down.eps){ width=110% }
`\end{center}`{=latex}


```{=latex}
\end{column}
\begin{column}{0.4\textwidth}
```


Begin with the top level, test it by letting it call stubs.

(From material earlier on test doubles: our stubs can be
*spies*, that allow us check how they're being called
and whether it's being done correctly.)


```{=latex}
\end{column}
\end{columns}
```

### Top-down integration {.fragile}

```{=latex}
\begin{columns}[t]
\begin{column}{0.6\textwidth}
```

`\begin{center}`{=latex}
![](images/top-down-2.eps){ width=110% }
`\end{center}`{=latex}


```{=latex}
\end{column}
\begin{column}{0.4\textwidth}
```

As we implement and incorporate more modules,
test *them* using stubs.


```{=latex}
\end{column}
\end{columns}
```

### Pros and cons of top-down integration testing

\small

Pro:

-   Test cases can be defined in terms of the functionality of the
    system (functional requirements)

Cons:

-   Writing stubs can be difficult: stubs should allow for a wide range
    of conditions to be tested.
-   Possibly a very large number of stubs may be required, especially if
    the lowest level of the system contains many methods.
-   One solution to avoid too many stubs: Modified top-down testing
    strategy
    -   Test each layer of the system decomposition individually before
        merging the layers
    -   Disadvantage of modified top-down testing: Both stubs and
        drivers are needed

### Bottom-up integration

- Start by implementing and testing the modules/subsystems in the
  "lowest" layer, individually
- Use test drivers to simulate calling into them
- Then start replacing drivers with actual implementations,
  and work "upwards"

### Bottom-up integration

```{=latex}
\begin{columns}[t]
\begin{column}{0.5\textwidth}
```

`\begin{center}`{=latex}
![](images/bottom-up.eps){ width=50% }
`\end{center}`{=latex}


```{=latex}
\end{column}
\begin{column}{0.5\textwidth}
```

Start by implementing modules at the *bottom* of the
"uses" hierarchy.

&nbsp;

They will be tested by *drivers*, which simulate
making calls into the module under test.


```{=latex}
\end{column}
\end{columns}
```




### Bottom-up integration

```{=latex}
\begin{columns}[t]
\begin{column}{0.5\textwidth}
```

`\begin{center}`{=latex}
![](images/bottom-up-2.eps){ width=90% }
`\end{center}`{=latex}


```{=latex}
\end{column}
\begin{column}{0.5\textwidth}
```

As we implement more modules, we
need to write drivers for them, too.


```{=latex}
\end{column}
\end{columns}
```


### Bottom-up integration

```{=latex}
\begin{columns}[t]
\begin{column}{0.5\textwidth}
```

`\begin{center}`{=latex}
![](images/bottom-up-3.eps){ width=90% }
`\end{center}`{=latex}


```{=latex}
\end{column}
\begin{column}{0.5\textwidth}
```

But once we've finished a "mid-layer" module, it replaces
the driver modules which previously simulated it.


```{=latex}
\end{column}
\end{columns}
```


### Pros and cons of bottom up integration testing

-   Pro: Systems tested as they are ready
-   Con: Typically tests one important subsystem (UI) last

### "Sandwich" integration

- Combine top-down with bottom-up -- work
  from both "ends" inwards

### "Sandwich" integration

```{=latex}
\begin{columns}[t]
\begin{column}{0.6\textwidth}
```

`\begin{center}`{=latex}
![](images/sandwich.eps){ width=110% }
`\end{center}`{=latex}


```{=latex}
\end{column}
\begin{column}{0.4\textwidth}
```

We may end up not needing as many
stubs or drivers as in previous approaches.


```{=latex}
\end{column}
\end{columns}
```



### Steps in integration testing

1.  Based on the integration strategy, select a component to be tested.  Unit
    test all the classes in the component.
2.  Put selected component together; do any preliminary fix-up necessary to
    make the integration test operational (drivers, stubs)
3.  Do functional testing: Define test cases that exercise all uses cases
    with the selected component
4.  Do structural testing: Define test cases that exercise the selected
    component
5.  Execute performance tests
6.  Keep records of the test cases and testing activities.
7.  Repeat steps 1 to 7 until the full system is tested.\
    The primary goal of integration testing is to identify errors in the
    (current) component configuration.

### Which integration strategy should you use?

-   Factors to consider
    -   Amount of test harness (stubs &drivers)
    -   Location of critical parts in the system
    -   Availability of hardware
    -   Availability of components
    -   Scheduling concerns

### Which integration strategy should you use?, cont'd

-   Bottom up approach
    -   good for object oriented design methodologies
    -   Test driver interfaces must match component interfaces
    -   Top-level components are usually important and cannot be neglected up
        to the end of testing
    -   Detection of design errors postponed until end of testing

### Which integration strategy should you use?, cont'd

-   Top down approach
    -   Test cases can be defined in terms of functions examined
    -   Need to maintain correctness of test stubs
    -   Writing stubs can be difficult


### Regression testing

-   Mentioned in previous lectures:
    -   \alert{Regression testing} is the re-execution of some subset of tests
        that have already been conducted, to ensure that changes have not
        propagated unintended side effects
-   Whenever software is corrected, some aspect of the software configuration
    (the program, its documentation, or the data that support it) is changed.
-   Regression testing helps to ensure that changes (due to testing or for
    other reasons) do not introduce unintended behavior or additional errors.
-   Regression testing may be conducted manually, by re-executing a subset of
    all test cases or using automated tools.

### Smoke Testing

A common approach for creating "daily builds" for product software\
Smoke testing steps:

-   Software components that have been translated into code are integrated
    into a "build."
    -   A build includes all data files, libraries, reusable modules, and
        engineered components that are required to implement one or more
        product functions.
-   A series of tests is designed to expose errors that will keep the build
    from properly performing its function.
    -   The intent should be to uncover "show stopper" errors that have the
        highest likelihood of throwing the software project behind
        schedule.
-   The build is integrated with other builds and the entire product (in
    its current form) is smoke tested daily.
    -   The integration approach may be top down or bottom up.

<!--

### WebApp Testing - I

-   The content model for the WebApp is reviewed to uncover errors.
-   The interface model is reviewed to ensure that all use cases can be
    accommodated.
-   The design model for the WebApp is reviewed to uncover navigation errors.
-   The user interface is tested to uncover errors in presentation and/or
    navigation mechanics.
-   Each functional component is unit tested.

### WebApp Testing - II

-   Navigation throughout the architecture is tested.
-   The WebApp is implemented in a variety of different environmental
    configurations and is tested for compatibility with each configuration.
-   Security tests are conducted in an attempt to exploit vulnerabilities in
    the WebApp or within its environment.
-   Performance tests are conducted.
-   The WebApp is tested by a controlled and monitored population of end-users.
    The results of their interaction with the system are evaluated for content
    and navigation errors, usability concerns, compatibility concerns, and
    WebApp reliability and performance.

-->

### Other sorts of testing

-   End-to-end testing
    - Checks how a system or component behaves in a particular user-focused scenario (e.g.
      use case, or user story), usually in a near-production environment,
      and whether it behaves as expected.
    - The focus differs a little from typical "system tests"
    - System tests show that the system satisfies some requirement or specification      
    - End-to-end tests demonstrates that particular processes can be done by or using the system
    - e.g. Can a user successfully login, go to the product page, add a product to the
      shopping cart, pay for items, and log out.

### Other sorts of testing, cont'd

-   Validation testing
    - Ensures that the product actually meets the client's needs
    - Demonstrates that the system fulfills its intended use when deployed in
      an appropriate environment
-   Alpha/Beta testing
    -   Focus is on customer usage
    -   Alpha testing = done by employees of development organisation,
        simulates typical use tasks
    -   Beta testing = done by releasing to a limited number of real users

# System testing

### Testing non-functional requirements

Some sorts of non-functional, system-level test, we've already mentioned:

- Load testing -- How does our software perform under high loads --
  the largest volumes of data we expect to receive? Does it perform
  correctly?
- Stress testing -- How does our software behave when we *exceed*
  the expected maximum? \
  Does it degrade gracefully?
- Robustness testing -- How well does our system handle malformed
  inputs? \
  Does it avoid undesirable behaviours (e.g. segfaults, security holes,
  displaying raw stack traces to end users)?

### Testing non-functional requirements

What do tests of this sort look like?

Good tests follow exactly the same pattern we've seen previously -- Arrange, Act, Assert.

For a unit or integration test, we usually "Act" (invoke behaviour) by calling
a method or function.

But for tests of non-functional requirements, we could be

- invoking the whole program and measuring particular properties
  (e.g. how long it takes to execute)
- starting a program (e.g. a web app), making requests against it,
  and measuring the response to those requests

### Frameworks for non-functional testing

Sometimes we might write our tests of non-functional requirements
in the same language(s) as our system, sometimes not.

\alert{Scripting languages} like Bash, Python, and Perl are especially
convenient for executing programs, launching other test utilities, and
extracting performance data from the OS.

So even if our system is written in Java, it might be convenient to
write these tests using a Perl or Python test framework.

### Testing non-functional requirements

Besides load, stress, and robustness testing, some
other sorts of system testing include:

-   Recovery testing
    -   forces the software to fail in a variety of ways and verifies that
        recovery is properly performed
-   Security testing
    -   verify that the system meets security requirements and
        is protected from improper penetration
-   Performance Testing
    -   test the run-time performance of software within the context of an
        integrated system
 
 

### Load, stress and robustness testing

For load and stress testing, we will normally generate random
traffic/data for our system, and conduct tests which measure
performance against requirements.


For robustness testing, *fuzzing* (and other sorts of randomized testing)
can be very effective.


### Security testing

Note that security problems cannot (typically) be avoided through
testing alone -- good system security requires us to be mindful of
security and incorporate it at all stages of the software development lifecycle.

### Types of security testing


Some typical sorts of security testing:

- Vulnerability scanning: using automated software which aims to detect known
  security vulnerabilities in a system.
  - Vulnerabilities detected can include misconfigured software, versions
    of particular packages known to be insecure, and more
  - The term "vulnerability scanner" normally means a program which is run
    against a live (running) system.
  - Some popular vulnerability scanners include [Nessus][nessus] and [Nexpose][nexpose]
    (both commercial), or [Nmap][nmap] and [Metasploit][metasploit] (partially or wholly
    open source)

[nessus]: https://www.tenable.com/products/nessus
[nexpose]: https://www.rapid7.com/products/nexpose/
[nmap]: https://nmap.org
[metasploit]: https://www.metasploit.com

### Types of security testing, cont'd

- Penetration testing

  - This simulates an attack by a malicious party. It usually involves evaluating a system (including
    vulnerability scanning) and exploiting found vulnerabilities to gain access to the system
    and breach data confidentiality, data integrity, or the availability of services.

- Fuzzing

  - Fuzzing, which we've looked at previously, can often identify security vulnerabilities.
    The most common cause of program crashes is improper access to memory locations,
    and these can often be exploited so as to compromise security.

### Secure software development techniques

Security tests should be part of a broader approach to security which
might include:

- Threat modelling: a structured way of identifying threats and mitigations
  that could affect a system, and then organizing and communicating that information.
  (The [OWASP page on threat modelling][owasp-threat] has more information on this.)
- Security reviews: review of code (or other artifacts, e.g. design documents or specifications)
  by a human reviewer, looking for insecure or problematic code.
- Static code analysis: using programs which analyse code statically (i.e., without running it),
  and aim to detect code that is likely to cause security problems
  or is known to be problematic in other ways.

[owasp-threat]: https://owasp.org/www-community/Threat_Modeling

### Secure software development techniques, cont'd

- Compliance or conformance testing: assessing whether a system conforms to particular
  standards.
- Security audits: a type of security review; a security audit
  is a structured process for reviewing a system according to some defined standard.

<!--

### Aside -|- bug in binary search

-   The implemenntation of binary search we saw last week
    in fact contains a bug ...

<https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html>\
<https://thebittheories.com/the-curious-case-of-binary-search-the-famous-bug-that-remained-undetected-for-20-years-973e89fc212>

### TODO

cover:

- integration testing
- performance testing
- robustness?
- smoke testing
- acceptance testing

-->
