---
title: |
  CITS5501 lab 1&nbsp;--&nbsp;Testing introduction&nbsp;--&nbsp;solutions
reference-section-title: "References"
link-citations: true

references:
- id: NewmanGoogle2018
  type: article-magazine
  title: Google+ Exposed Data of 52.5 Million Users and Will Shut Down in April
  container-title: Wired
  abstract: A month after Google had already decided to shut down Google+, a new bug
    made its problems much, much worse.
  URL: "<https://www.wired.com/story/google-plus-bug-52-million-users-data-exposed/>"
  language: en-US
  author:
  - family: Newman
    given: Lily Hay
  issued:
    date-parts:
    - - 2018
      - 12
      - 10
  accessed:
    date-parts:
    - - 2022
      - 3
      - 1
- id: WeissteinMean2005
  type: webpage
  title: Arithmetic Mean
  container-title: MathWorld
  URL: "<https://mathworld.wolfram.com/ArithmeticMean.html>"
  language: en
  author:
  - family: Weisstein
    given: Eric W.
  issued:
    date-parts:
    - - 2005
      - 3
      - 4
  accessed:
    date-parts:
    - - 2022
      - 3
      - 1
- id: ParamhansOla2015
  type: post
  title: "Fooling the Startup of the Year: Hacking into Ola Wallet"
  container-title: Medium
    remember what that was. I was monitoring my phone traffic from
  URL: "<https://medium.com/@CodeTheDevil/busting-ola-wallet-1ceea6174b1f>"
  #URL: "https://medium.com/foo"
  language: en
  author:
  - family: Paramhans
    given: Shubham
  issued:
    date-parts:
    - - 2015
      - 3
      - 19
  accessed:
    date-parts:
    - - 2022
      - 3
      - 1

---

`~\vspace{-5em}`{=latex}


## 1. Accessing required software

We will be using the Java language for the bulk of the labs,
so you should make sure you have access to a platform where
the Java Development Kit (JDK) is installed, and you can make
use of a good Java IDE (Integrated Development Environment) or editor.

**Microsoft VS Code**

:   One recommended editor is [Microsoft Visual Studio Code][vs-code] ("VS
    Code", for short) --
    it is available on all common operating systems (Windows, Linux and Mac
    OS), so you should be able to install it on a laptop or home PC.
    (It should also be available in the UWA computer labs.)
    
    [vs-code]: https://code.visualstudio.com/download 
    
    Some guidelines on configuring VS Code
    for Java development can be found [on the VS Code website][vs-code-java].
    
    [vs-code-java]: https://code.visualstudio.com/docs/java/java-tutorial 
    
    If using VS Code, you will need to make sure that
    
    - you have the JDK installed (see the [Oracle website][jdk] for
      downloads)
    - you've installed the [Extension Pack for Java][java-ext] as a VS Code.
      Click the "extensions" icon in the left sidebar of VS Code (looks like
      this: ![](VSCode-Extension-Icon.png){ width="0.7cm" }), search for "Extension Pack for
      Java" in the search bar at top, and click "install".
    
    [jdk]: https://www.oracle.com/au/java/technologies/downloads/
    [java-ext]: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
    [bluej]: https://www.bluej.org

    Download the `lab-01-code.zip` file from
    <https://cits5501.github.io/resources/#lab-labs>, and unzip it
    somewhere on your computer. Then run VS Code, select "File" / "Open
    Folder", and open the folder containing the lab 1 code. (You can
    "agree to trust" the authors of the code, if a message about that
    pops up.)

    Then open one of the `.java` files in the `src` subdirectory. 

**GitPod**

:   It's possible to access a VS Code–like environment on the web, without
    needing to install any software. You'll first need to create a
    [GitHub][github] account, so do so. Once that's done, ensure you're
    logged in to GitHub.

    Then, paste into your web browser the address
    <https://gitpod.io#>, followed by the address of some GitHub repository --
    for this lab, you can use <https://github.com/cits5501/lab01>.
    (So the full address in your browser should be
    <https://gitpod.io#https://github.com/cits5501/lab01>.)
    Agree to let GitPod access your GitHub account, and you should see the
    message "Starting ..." come up, and then a VS Code–like environment.
    Close any message that pops up asking "Do you want to open this workspace
    in VS Code Desktop?".

    Then open one of the `.java` files in the `src` subdirectory. 

[github]: https://github.com/

Using either VS Code on the desktop, or the VS Code–like environment,
you should see a message about "Java projects being opened". Wait for
that to pass, and there'll now be a "Testing" icon on the left sidebar,
in the shape
of a conical lab flask (like this: ![](vs-code-testing-icon.png){ width="0.7cm" }).

Click on the testing icon, and then on the button "Enable Java Tests".
Select "JUnit Jupyter" tests from the options that pop up, and you
should see a message saying that "Test libraries have been downloaded
into 'lib/'".

If you open the `CalculatorSimpleTest.java` file, then after a short
while, a green triangle icon should appear to the left of the line
"`public class CalculatorSimpleTest`". Clicking it will run all `@Test`
methods in the class.

(If the icon doesn't appear: select "View" / "Problems" from the menu,
and see if there have been any compilation problems. If there have:
select "Java Projects" from the left sidebar, "Reference Libraries",
and then the "+" (add) button. Add the
`lib/junit-platform-console-standalone-1.9.2.jar` file that should be in
the `lib` directory, then hit the "refresh" icon under "Referenced
Libraries". Ideally, the "Problems" should now disappear and the green
triangle icon appear. If it doesn't: click somewhere in the
`CalculatorSimpleTest.java` source code, hit the `ctrl-shift-P` key
combination, and type "java: run tests".)

If you are able to run the tests, you should see some tests pass (for instance, `testAdd`),
but most tests fail. This is expected!


**Other IDEs**

Some other freely available IDEs are:

- Netbeans, downloadable from <https://netbeans.org>
- Eclipse IDE for Java Developers, downloadable from
  <https://www.eclipse.org/downloads/packages/release/2020-12/r/eclipse-ide-java-developers>
- IntelliJ IDEA Community, downloadable from
  <https://www.jetbrains.com/idea/download/>

As a first step for today's lab, ensure you can install and/or
access at least one of these.

After downloading and opening the lab code from
<https://cits5501.github.io/resources/#lab-labs>,
you may need to
instruct your IDE to add the "JUnit 5" libraries to the project;
typically, viewing the project *properties* in your IDE will
reveal some way of doing this.


## 2. JUnit tests

### Download and compile lab code

Take a look at the `Calculator` class, in `Calculator.java` --
this class has trivial functionality, but is useful as an
example of a *class under test*.

Take a look at the `CalculatorSimpleTest` class, in
`CalculatorSimpleTest.java`. This class defines a number of
*JUnit tests* for our `Calculator` class.

Test classes can be called anything, but by convention,
*unit tests* (which are written to test a single class)
usually start with the same name as the *class under test*,
followed by a description of the test (or just the word "Test").

### Run the JUnit tests

Run the tests in the `CalculatorSimpleTest` class.

In many IDEs, this can be done by right-clicking on the class (after compiling)
and selecting "Test All". In VS Code, it can be done by clicking the
green triangle icon in the left margin of the code (see previous
section).

You should see that some tests "pass" (with green ticks) and
some "fail" (with red crosses) -- see if you can work out
what the failing `testSubstract` test is telling you about what the problem is.

### Inspect the JUnit tests

Look at the parts of the `CalculatorSimpleTest` test class,
using the JUnit User Guide (<https://junit.org/junit5/docs/current/user-guide/>)
as a reference.

- Test classes can be called anything.
- Test cases are written in methods annotated `@Test`
- For each test, the methods annotated `@BeforeEach` and `@AfterEach`
  are run before the test and after the test, respectively.\
  These methods can be used to create and destroy test *fixtures* --
  in Java, fixtures are normally a set of objects in a known state.
  (The state *can* include things outside the Java program, however --
  databases, files on a remote system, anything we like. But for unit tests,
  the fixtures will only be Java objects.)
- The `testSubtractThrowsException()` test is intended to discover whether
  the `Calculator.subtract()` method throws an *exception* in
  circumstances where it should.

  The code

  ```{ .java startFrom="47"}
      Throwable exception = assertThrows(
          ArithmeticException.class,
          () -> c.subtract()
      );
  ```

  calls the `assertThrows` method, which is used to assert that when its
  second parameter (a bit of executable
  Java code, called a *lambda expression*) is run, it throws
  the exception specified by its first parameter.

  We will look at these more later.
- Note that the first few test methods take no arguments,
  but the test `\texttt{addZeroHasNoEffect}`{=latex}
  is what JUnit calls a parameterized test --
  unlike other test methods, it does take arguments.\
  We will look at these more later; but JUnit's parameterized tests are
  designed to make it easy to run what are called *data-driven tests*
  (see Wikipedia on [Data-driven testing][ddt]), as well as a subset
  of data-driven testing called *property-based testing*
  (see the explanation given by the [Hypothesis][hypothesis]
  Python-based library for doing this sort of testing).

[hypothesis]: https://hypothesis.readthedocs.io/en/latest/


[ddt]: https://en.wikipedia.org/wiki/Data-driven_testing]


Consider the following question: if you want to get
all the tests passing, how do you determine what each
method is supposed to *do*, and when it is correct?
(After all, someone writing the test could have made
a mistake in the test code.)



<div class="solutions">

**Sample solutions**:

To find out what each method is supposed to do, the only reliable
option is to read its documentation. If there is no documentation
for the method, then you can never really know what the
developer's intention was.

</div>




## 3. API documentation

Look at the `Calculator.java` class from the lab 1 code.

Can you identify

a.  A Javadoc comment, which documents the API?
b.  A Java comment which is *not* Javadoc?

Use your IDE to run the `javadoc` tool, which generates
API documentation from source code.

- In BlueJ, select "Tools" / "Project Documentation",
  then look for a directory called "`doc`" which should
  be created within the source code directory.
- BlueJ should automatically open the generated documentation in your browser.

View the generated documentation in your browser.

Identify one class member marked `private`, and make it `public`
and write a Javadoc comment for it.
Re-run `javadoc` -- what changes do you see in the generated
documentation?

\newpage

## 4. Fix the code

See if you can fix the code in the `Calculator` class
so that all the tests pass.

For the `subtract` method -- aside from other changes you might
need to make, you might want code something
like the following:


```
  if (/* some condition goes here */) {
    throw new ArithmeticException("can't return a negative result");
  }
```

Try creating your own new tests. In BlueJ, if you right click
on a class, there should be an option to create a test class.
Use the existing tests as an example -- can you think of
other tests we might add?



<div class="solutions">


**Sample solutions**:

\small

Fixing errors:

The code for `subtract` has the numbers in the wrong order.

The code for `subtract` also needs to throw an exception
when the result would be negative.

e.g.

```java
  if (num2 > num1) {
    throw new ArithmeticException("can't return a negative result");
  }
```

</div>



## 5. Concepts review questions

Answer the following questions to test your understanding of
concepts introduced in the lectures and prescribed reading.

For each of the following scenarios,
explain whether you think a *failure*, a *fault*
or an *erroneous state* (or none of these, or more than one) has occurred, and explain why. If
it is a failure --
is it non-conformance with a functional or a non-functional
requirement?

a. The social media site "Witter" allows users to specify
   that their email and date of birth should not be displayed
   publicly. But after a system update, that information
   is now visible for all users.
#. The ride-sharing app Habari runs on a user's mobile phone,
   and communicates with Habari's servers to find nearby divers
   and arrange a ride. However, the communications are not encrypted,
   meaning a tech-savvy user could manipulate the system
   and obtain free rides.
#. Your colleague Mila is writing a method which should
   return the arithmetic mean of numbers in a list:

    ```java
    double total = 0;
    for (double num : number_list) { total += num ; }
    return total / number_list.length
    ```

    However, when the list is of length 0, this code
    returns the result "`INFINITY`".



<div class="solutions">

**Possible solutions and discussion**:

To come to a conclusion for these questions you will
need to make *reasonable assumptions* and state what they
are. Your answer can vary, depending on what assumptions
you make.

The answers below are one possibility; but yours may be
different.

\small

a.  We are told that users can specify that their email and date of birth
    should not be displayed publicly. So if those are displayed
    publicly, then that's a failure: the system is not behaving in
    accordance with requirements.

    We don't know in this case what the exact requirement is, but most
    likely, it is something like:

    > "If the user specifies that their email and address and date of
    > birth should not be displayed publicly on their profile, then
    > those details should not appear on the user's public profile."

    So the failure is non-conformance with a functional requirement.

    Presumably, there's also a problem somewhere in the code for the
    Witter site that causes this failure, but we aren't given details:
    this problem constitutes a *defect*.
    And once execution hits that point in the code, the system will go
    into an *erroneous state*.

    [This scenario is loosely based on a security failure that occurred
    to Google's social networking site, "Google+", in 2018. See the
    article by @NewmanGoogle2018 reporting on this [here][newman]; there
    is also a [Wikipedia page][googleplus-wiki] on the incident.]

[newman]: https://www.wired.com/story/google-plus-bug-52-million-users-data-exposed/
[googleplus-wiki]: https://en.wikipedia.org/wiki/2018_Google_data_breach


\small

b.  In this scenario, we aren't told exactly what the requirements for
    the Habari system are; but presumably one of them is that
    communications between the mobile app and the Habari company servers
    should be secure.
    (Even if this is not an explicit requirement, it's a reasonable
    expectation of drivers, users, and Habari management.
    Drivers and users presumably don't want details of transactions to
    be visible to third parties, and management presumably would like
    people to pay for rides rather than getting them for free -- else
    the company will go out of business.)

    If the requirement is something like
    "All communications between the mobile app and the Habari servers
    should be made securely"
    then this would be a *non-functional* requirement.
    (We'll discuss later in the unit whether that requirement is precise
    enough.)
    In this context, "functional" means "treating the system as if it
    were a *function*, a black box that takes in inputs and spits out
    outputs"; and "non-functional" means "the manner in which
    some system function executes", rather "not functioning".

    For this unit, you aren't expected to know the details of how secure
    computer communications work, but if you do, you are welcome to
    discuss what you can infer about the defect in the source code which
    causes the above failure.
    (In the scenario given, we probably could point to specific spots in
    the code where things should have been done differently -- spots in
    the code where the programmers developing the Android app and the
    Habari servers should have used appropriate techniques to ensure
    that communications were secure. These would be *defects*.)

    [This scenario is loosely based on one described by Shubham
    Paramhans [-@ParamhansOla2015], who identified flaws in the security
    for the "Ola" ride-sharing app, as described in a
    [Medium.com](https://medium.com) article, "[Fooling the Startup of
    the Year][fooling]".]

[fooling]: https://medium.com/@CodeTheDevil/busting-ola-wallet-1ceea6174b1f


\small

c.  When Mila's method returns the result "`INFINITY`", we'd need to
    know what method's specifications where in order to know if this
    was a failure or not (i.e., we'd need to look at the method's
    documentation).

    As a matter of mathematics, the
    arithmetic mean for $n$ numbers $a_0$ through $a_n$ is
    defined as $\displaystyle \frac{1}{n}\sum_{i=1}^n a_i$, or
    $\displaystyle \frac{a_1+a_2+\cdots+a_n}{n}$ [@WeissteinMean2005].

    So when n = 0, the result is undefined, because dividing by zero is
    not defined.
    If we were writing a specification for this method, what are some
    reasonable things we could require the method to do in this case?

    Here are a few reasonable options:

    i.  The method should return the special floating-point value
        "`INFINITY`". This is Java's default behaviour when
        floating-point numbers are divided by zero. The advantage of
        this approach is it requires no extra work; but "`INFINITY`"
        perhap isn't the best choice, since it doesn't mean exactly the
        same thing as "undefined".
    #.  The method should return the special floating-point value
        "`Nan`" ("Not A Number"). This will require a little extra code,
        but reflects the correct mathematical answer slightly better
        than option (i) does.
    #.  The method should throw an exception (e.g. something like
        Java's `ArithmeticException` class). Throwing an exception
        is usually what maps best to a mathematically undefined result;
        but the caller having to handle the exception may not
        be very convenient.

    We'd need to know more about the business requirements here to
    know which is the best option.

    In any case: if the behaviour of Mila's method does match its
    requirements, then there hasn't been a failure; but if it doesn't
    match them, then there has.

</div>






## 6. Moodle sign up

There are two Moodle quizzes (not assessed, but it's recommended you
attempt them) available for you to test your
understanding of prerequisite knowledge and week 1 topics
in CITS5501:

- Java revision quiz, and
- Testing concepts review quiz

Visit <https://quiz.jinhong.org> and sign up
with your UWA email address, then attempt the quizzes
(in your own time, if you don't finish them in the lab).


<!-- vim: syntax=markdown tw=72 :
-->
