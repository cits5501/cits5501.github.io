---
title: |
  CITS5501 lab 2 (week 3)&nbsp;--&nbsp;Data-driven tests and test design&nbsp;--&nbsp;solutions
---

`~\vspace{-5em}`{=latex}

## 1. Data-driven tests

In this lab, we examine a testing pattern commonly referred to as ["data-driven
testing"][ddt].
The JUnit documentation calls tests created with this pattern "parameterised tests".

[ddt]: https://en.wikipedia.org/wiki/Data-driven_testing

Normal test methods in JUnit don't take any parameters at all --
for instance, the `testAdd` method from last week's code:

```java
  @Test
  public void testAdd() {
      Calculator c = new Calculator(3, 4);
      int result = c.add();
      assertEquals(result, 7, "result should be 7");
  }
```

But in last week's lab, we briefly saw an example of a *parameterized
test* in JUnit -- these *do* take parameters.
The parameterized test was `addZeroHasNoEffect`, which checks,
for a range of `int` values, that using the `Calculator` to add 0
to the number gives back the original `int`:

```java
  /** Adding zero to a number should always
    * give us the same number back.
    */
  @ParameterizedTest
  @ValueSource( ints = { -99, -1, 0, 1, 2, 101, 337  })
  void addZeroHasNoEffect(int num) {
      Calculator c = new Calculator(num, 0);
      int result = c.add();
      assertEquals(result, num, "result should be same as num");
  }
```

What do the `@ParameterizedTest` and `@ValueSource` annotations
on this test method mean?

Adding the `@ParameterizedTest` tells JUnit that this test
needs to be run in a special way.
In effect, this annotation tells
JUnit: "You need to call this test multiple times. Each time
you should call it with a different `int`." Where does Junit get the
`int`s from?
We supplied a
`@ValueSource` annotation which tells JUnit "Here is the list of `int`s
to use with the test". (But there are other ways of supplying the list
of `int`s besides writing them out explicitly as we've done here -- you could
put them in [a `.csv` text file][csv-source], or write a special method that
[returns a "stream" of ints][method-source].[^param-sources])

[csv-source]: https://junit.org/junit5/docs/5.7.1/api/org.junit.jupiter.params/org/junit/jupiter/params/provider/CsvFileSource.html
[method-source]: https://junit.org/junit5/docs/5.7.1/api/org.junit.jupiter.params/org/junit/jupiter/params/provider/MethodSource.html 

[^param-sources]: You can find a list of all the possible annotations
  you can use for supplying parameters to parameterized tests in the
  JUnit [API documentation][junit-providers] -- look down the bottom of
  the page for class names ending in "`Source`". The API documentation
  is fairly terse, though -- if you'd like to see examples of how the
  different sources are used in practice, check out the
  ["Guide to JUnit 5 Parameterized Tests"][baeldung-guide] by
  [Ali Dehghani](https://www.baeldung.com/author/ali-dehghani).

[baeldung-guide]: https://www.baeldung.com/parameterized-tests-junit-5

[junit-providers]:

So to summarize: the test method, `addZeroHasNoEffect`, takes *one*
parameter, an `int`,
and each time the method is called, it is passed a different
int from the list given by `@ValueSource`.

The code for this week's lab is the same as last week's,
but with some new test methods, so you can try out the
`addZeroHasNoEffect` test if you haven't already:

**Exercises**

:   a.  Run the tests in your IDE or editor to confirm that all those ints are
        used -- how can you tell?
    #.  Try changing them and/or adding to the list.
    #.  `addZeroHasNoEffect` is a single method. But (based on the material
        from lectures and the textbooks) is it also a single *test case*?
        If not, how many test cases does it comprise?





`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

a.  Most IDEs should show you exactly what tests cases have
    been run -- check the documentation for your IDE if it is not clear.
b.  No solution needed here; the aim is just to practice working
    with JUnit-based code.
c.  Seven test cases, because there are seven `int`s in the list.

</div>
`\end{solbox}`{=latex}



Hopefully the use of `@ValueSource` seems straightforward.
But a question may now arise: the `addZeroHasNoEffect(int num)`
test method takes only one parameter, but what if we were
working with a method that took two parameters (a `String` and an `int`,
say).
Or what if we wish to specify not just the *test* values, but also the
*expected* values (a very common situation)? How could we supply
multiple sets of parameters in that case?

Below is an example of such a method with multiple parameters.
It's taken from this week's code, which includes an additional
test method when compared with last week's:
`tableOfTests()`. The `tableOfTests()` method is another parameterized
test; it draws its test values and expected values from
a method called `additionTestCasesProvider()`:

```java
  @ParameterizedTest
  @MethodSource("additionTestCasesProvider")
  /** Test Calculator.add() with multiple test values
   * and expected values.
   *
   * @param num1 First test value to be passed to Calculator.add()
   * @param num1 Second test value to be passed to Calculator.add()
   * @param expectedResult The expected result for Calculator.add()
   */
  void tableOfTests(int num1, int num2, int expectedResult) {
      Calculator c = new Calculator(num1, num2);
      int result = c.add();
      assertEquals(expectedResult, result, "result should be same as as expected result");
  }
```

In the previous example, we used the `@ValueSource` annotation, which is
used when you have
a straightforward list of literal values you want JUnit
to iterate over.
But in `tableOfTests`, we're using a new annotation,
`@MethodSource`. If we annotate our test method with
`@MethodSource("additionTestCasesProvider")`,
<!--
`\texttt{@MethodSource("additionTestCasesProvider")}`{=latex}
-->
we are saying to JUnit, "Go and call the
`additionTestCasesProvider` method in order to get a list of test values
and expected values".
You can read more about `MethodSource`s in the
JUnit documentation on [writing parameterized tests][junit-param-tests].

[junit-param-tests]: https://junit.org/junit5/docs/snapshot/user-guide/index.html#writing-tests-parameterized-tests

This sort of testing is called *data-driven* testing -- we have basically the same
test being run, but with different values each time; so it makes sense to
write the logic for the test just once (rather than four times).[^dry]

[^dry]: This is an example of the ["DRY" principle][dry-wiki]
  ("Don't Repeat Yourself") in action. Writing out the same test method
  four times, but each time with different test values and expected
  values, would just lead to unmaintainable code.

[dry-wiki]: https://en.wikipedia.org/wiki/Don't_repeat_yourself 

Let's look at the `additionTestCasesProvider()` method
which supplies the parameters used by `tableOfTests()`.
The `additionTestCasesProvider()` method uses Java's
[Stream API][stream-api], introduced in
Java 8. For the moment, you don't need to know the details
of how the Stream API works -- just that it when used with
JUnit, it gives us a convenient
way of constructing "lists of lists". In the code below,
the `arguments()` method will take any number of arguments
we like (here, three `int`s, comprising two test values and
an expected value) and group them together into a list-like
object (`Arguments`); and the `Stream.of()` method will take
any number of `Arguments` objects we like, and group *those* together
in a list-like object (of type `Stream<Arguments>`):

[stream-api]: https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/package-summary.html

```java
  static Stream<Arguments> additionTestCasesProvider() {
      return Stream.of(
          // the arguments are:
          //    num1, num2, and expected result.
          arguments(1, 2, 3),
          arguments(3, 7, 10),
          arguments(3, 7, 11)
          arguments(99, 1, 100)
      );
  }
```




**Exercises**

:   a.  How many *test cases* would you say `tableOfTests` and
        `additionTestCasesProvider` comprise?
    #.  Read through the JUnit documentation on writing parameterized tests.
        (You might find the [baeldung.com](https://www.baeldung.com/)
        ["Guide to JUnit 5 Parameterized Tests"][baeldung-guide] by
        [Ali Dehghani](https://www.baeldung.com/author/ali-dehghani)
        helpful as well.) If you have time, try experimenting
        with the different features it describes.
    #.  In Java, `enum` types are used to represent types that can
        take on values from only a distinct set. By convention, the values
        are given names in ALL CAPS with underscores to separate
        words (also called ["SCREAMING_SNAKE_CASE"][snake-case]).
    
        For instance,
    
        ```java
        public enum Weekday {
          MON, TUE, WED, THU, FRI, SAT, SUN
        }
        ```
    
        or
    
        ```java
        public enum Color {
          RED, ORANGE, YELLOW, BLUE, GREEN, INDIGO, VIOLET
        }
        ```
    
        (For more on Java enums, including how to create
        enums with constructors and fields,
        see the Java documentation on [enum types][enum-types].)
    
        Suppose we need to run a test which should be passed each `Weekday`
        in turn. Which JUnit annotation should we use for this?
    #.  See what you can find out about data-driven testing on the web.
        (You could also try using an LLM or other AI tool, but it's useful
        to know what sources it's using -- so enable that, if it's an option.)

        Why is it useful? When should it be used? When shouldn't it be used?
    #.  If you have used testing frameworks in languages other than Java --
        how do they compare with JUnit? Do they offer facilities for
        creating data-driven tests? Are these more or less convenient
        than the way things are done with JUnit?

[snake-case]: https://en.wikipedia.org/wiki/Snake_case#:~:text=SCREAMING_SNAKE_CASE&text=uses-,SCREAMING_SNAKE_CASE 
[enum-types]: https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html




`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

a.  Together, they comprise four test cases: `tableOfTests` will get
    invoked four times, each time with different test values and
    expected result.
b.  No solution needed; the aim is just to familiarize yourself
    with JUnit's parameterized tests.
c.  The JUnit documentation explains how the `@EnumSource` annotation
    can be used with enum types. By default, an `@EnumSource` will
    iterate over all the possible values of an enum type,
    calling the test method once with each value.
d.  Data-driven testing is helpful to reduce duplication, express
    intent more clearly, and make tests easier to maintain.
  
    If we have a large number of test cases which differ only
    in the test values used, then the data-driven testing pattern
    is a convenient and helpful way of writing them. It also
    makes new test cases much easier to add -- often, that will
    involve just adding a single row or line to a data source,
    rather than writing a whole JUnit method -- which encourages
    testers to be comprehensive.

    It's also much easier for someone reading the source code to
    see if any edge cases may have been left off.

    Data-driven testing _isn't_ appropriate where different test
    cases need different setup, or have very different types of expected
    value (e.g. in one test case we expect an int to be returned, but in
    another we expect an exception to be thrown). It's also not appropriate
    if different test cases require different control flow, or different
    ways of verifying that the test past. If you are applying the data-driven
    testing pattern, and are trying to do something more complex than just
    creating a "table" of
    test values and expected results -- then data-driven testing is probably
    not the right approach.

    A good rule of thumb is: if _what_ you're testing and _how_ you're
    testing it remains the same, but the _data_ changes -- then data-driven
    testing is probably a good fit. 
#.  Writing data-driven tests tends to be more convenient (and less
    verbose) in languages which either are not statically type-checked
    (for instance, JavaScript, Python and Ruby and Lisp-family
    languages) or which have
    rich type systems and type inference[^type-inference] (like Scala, Ocaml
    and Haskell).\
    But as we have seen, it is certainly possible in Java, and the
    Streams API allows for more concise code than in earlier
    versions of Java.

[^type-inference]: [Type inference](https://en.wikipedia.org/wiki/Type_inference)
  is a feature of some programming languages which allows the programmer
  to omit types where compiler can work out what they should be.\
  The Java language has only a very limited form of type inference.
  It allows you to omit type arguments to generic types, in some cases --
  e.g. `Map<String, List<String>> myMap = new HashMap<>()` doesn't need
  type arguments after `new HashMap` -- and (since Java 10) allows you
  to omit local variable declarations, instead using `var`.
  See the Oracle documentation on [generics type inference][generics-infer]
  and on [Java 10 local variable type inference][java-local-infer]

[generics-infer]: https://docs.oracle.com/javase/tutorial/java/generics/genTypeInference.html
[java-local-infer]: https://developer.oracle.com/learn/technical-articles/jdk-10-local-variable-type-inference


</div>
`\end{solbox}`{=latex}




`\genericbox`{=latex}
<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

**Challenge exercise**

Based on this example, try writing your own parameterized
tests for other methods (for instance, subtraction).

(Challenge exercises aren't compulsory, but may be interesting
or good practice if you've completed all other work in the
lab.)

</div>
`\endgenericbox`{=latex}

\newpage

## 2. Preconditions and postconditions

Work through following scenario and exercises. After you've done so, it's suggested you drop
in to a timetabled lab sessions to discuss and compare your answers with other students,
and/or obtain feedback from the lab facilitator.

Consider the following scenario:

`\genericbox`{=latex}
<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

<div style="text-align: center;">
<b>Enrolment database</b>
</div>

`\begin{center}\textbf{Enrolment database}\end{center}`{=latex}


A database has a table for students, a table for units being
offered, and a table for enrolments.  When a *unit* is removed as an
offering, all *enrolments* relating to that unit must also be removed.
The code for doing a unit removal currently looks like this:

```java
/** Remove a unit from the system
 */
void removeUnit(String unitCode) {
  units.removeRecord(unitCode);
}
```

</div>
`\endgenericbox`{=latex}


If possible, it's recommended you discuss the following questions
with a partner or in a small group,
and come up with an answer for each. But if that is not feasible,
spend several minutes thinking about the questions yourself
before sharing ideas with the class.

`\genericbox`{=latex}
<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

**Exercises**

a.  What *preconditions* do you think there should be for calling
    removeUnit()?
#.  What *postconditions* should hold after it is called?
#.  Does the scenario give rise to any system *invariants*?
#.  Can you identify any problems with the code? Describe what defects,
    failures and erroneous states might exist as a consequence.

<!-- x** -->

If you don't recall what preconditions, postconditions, and
invariants are, you might wish to review the week 1 readings.

</div>
`\endgenericbox`{=latex}




`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

***a\. Preconditions***

Preconditions for `removeUnit` to complete properly, and
bring about the postconditions, might include:

-   `unitCode` is not `null`
-   `unitCode` represents a valid, existing unit code
-   The receiver object for `removeUnit()` (i.e., the object
    reference it is being called on) is not `null`
-   A valid database and database connection exist

*However*, note that we would not necessarily mention all of these
in the Javadoc comment for `removeUnit()`:

-   Although it may be a precondition that `unitCode` is not `null`,
    it is true for nearly all Java methods that their arguments
    must not be null; we are more likely to document the *opposite*
    case, where a `null` value *is* allowed.
-   It is likely that "A valid database and database connection
    exist" are preconditions for many of the methods in
    the class we are considering. So we probably would mention
    this in the Javadoc comment for the class as a whole, to save
    repeating ourselves.\
    (For example, take a look at the documentation for Java's
    [`java.util.TreeMap`][treemap] class. It says
    "This implementation provides guaranteed log(n) time cost for the
    `containsKey`, `get`, `put` and `remove` operations", rather
    than repeating that statement four times.)
-   It is a property of the Java language that a method can only be
    successfully be called when the receiver object is not `null`,
    else a `NullPointerException` will be thrown. So this
    need not be mentioned.

[treemap]: https://docs.oracle.com/javase/8/docs/api/java/util/TreeMap.html

Other preconditions we need not document:

-   That `unitCode` is of type `String`. If `unitCode` were not of type
    `String`, the source code couldn't possibly have compiled,
    and we couldn't be running the program.\
    (Or: if, somehow, `unitCode` referred to a spot in memory
    that did *not* contain a String object,
    this would be an indication that the Java Runtime Environment
    had somehow become corrupted.)\
    It is a guarantee of the Java language that parameters always
    have the correct types.

    (In Python, the situation is different. We might require
    that `unitCode` supports particular string operations,
    since at runtime, the parameter passed need not be of type
    `str`.)

**Tip**: If asked in assignments or the exam to specify preconditions
for a method, we will nearly always be using the Java language.
If you specify preconditions like "The parameter `String s` must be a
`String`"
you generally (a) will not get any marks for saying so, and (b) will
make the markers think you don't understand how Java works.


`\end{solbox}`{=latex}






`\begin{solbox}`{=latex}


**Alternative solutions:**

-   If we adopt the solution above, then that means that
    if `unitCode` does not refer to a valid, existing unit code,
    either this method or one of the methods we call should
    throw an exception. (We would document *that* in our Javadoc
    as well, so callers know what exceptions can be thrown.)\
    But an alternative design is to simply do nothing when the
    unit code does not exist. In that case, we should *not*
    throw an exception.

\orangealert If you are not clear on what preconditions are from the
lecture slides, you might want to read
[chapter 3][horstmann-ch3] of
*Object-Oriented Design and Patterns* (2nd edn)
by Cay S. Horstmann. (This can be found in the "Unit Readings"
via the LMS.)

[horstmann-ch3]: https://secure.csse.uwa.edu.au/CITS5501-protected/


`\end{solbox}`{=latex}






`\begin{solbox}`{=latex}


**Sample solutions, cont'd**:

***b\. Postconditions***

The postcondition here could be stated as:

-   "The unit with code `unitCode`
    does not exist in the database, and no records in the
    enrolment table exist that refer to it."

***c\. System invariants***

Recall that invariants are assertions that should
hold true before and after every method call of a class
(or, if we are describing invariants for a whole subsystem or system,
for all methods of classes in the subsystem or system).

From what we are told, we can infer that there is at least
the following invariant (presumably, for the whole system):

-   If an entry in the enrolments table refers to a unit
    code, then a corresponding entry in the units table
    must exist.

There might be others as well.

***d\. Problems with the code***

We are not told what
`units.removeRecord()` does, exactly.

However, if we make the following assumption:

-   `removeRecord()` removes an entry from the units table,
    and does not alter any other tables

then there *is* a problem with the code: it should have updated
the enrolments table, to remove any references to the deleted unit.

So a *defect* in the code is that it does not call whatever
methods are necessary to delete records from the enrolments table.
(This is a static property of the code.)

The system enters an *erroneous state* immediately after
the `removeUnit` method call, because now one of the system
invariants is not satisfied -- the system is inconsistent.

As for *failures*: recall that these are ways in which the
system observably departs from its specification. It is likely that
no failure will occur *directly* after the `removeUnit` method call.
But the next time someone queries the system to see what units
a student was enrolled in: they may be recorded as being enrolled
in a non-existent unit, which likely *is* a failure.

\orangealert If you are not clear about the difference between
*faults*, *failures*, and *erroneous states*, you
might want to read
[chapter 11][bruegge-ch11] of
Bruegge and Dutoit, *Object-Oriented Software Engineering Using UML, Patterns, and Java* (3rd edn), particularly section 11.3, "Testing Concepts".

[bruegge-ch11]: https://secure.csse.uwa.edu.au/CITS5501-protected/content/



`\end{solbox}`{=latex}






`\begin{solbox}`{=latex}


**Alternative solution:**

-   On the other hand, if we make the assumption that `removeRecord`
    *does* correctly remove all enrolment records which
    mention the deleted unit, then there is no fault. (This is called
    "cascading a deletion", in database terminology.) \
    But we have to make one assumption or the other, and
    say which one we are making and why.


</div>
`\end{solbox}`{=latex}




## 3. Testability

Consider the following, each of which is supposed to be a requirement or specification.
Do you think it would be straightforward to write tests for them?  If not, why not?
After answering these questions, you might like to drop in to a timetabled lab session to
compare your answers with other students. Although model solutions will be provided, there
is often no single definitive answers to software engineering questions such as these --
different students may come up with slightly different answers.

a.  The flight booking system should be easy for travel agents to use.
#.  The `int String.indexOf(char ch)` method should return a -1 if `ch`
    does not appear in the receiver string, or the index at which it
    appears, if it does.
#.  Internet-aware Toast-O-Matic toasters should have a mean time
    between failure of 6 months.




`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

System requirements:

***a\. "Easiness of use" requirement***

This would be difficult to test.

- "Easy to use" is not a very *precise* requirement.
  It is the opposite of precise -- it is *vague* or *fuzzy*;
  it is difficult to pinpoint exactly which systems satisfy
  it and which don't.

  A better requirement might be something like:

  > "Travel agents shall be able to use all the system functions after
  > successful completion of a training course designed by the software
  > provider. After this training, the average number of errors made by
  > experienced users shall not exceed two per hour of system use."

  (This is adapted from *Pressman*.)

- A test like this requires human users, and would
  often not
  be done until the *acceptance
  testing* phase. Prior to that, the software provider
  might try to come up with a quicker and cheaper test
  to act as a *proxy* for the acceptance test -- they
  might test it on non-technical staff in their own
  organisation, for instance.

  (The staff in their own organisation are acting as
  a sort of *test double* or *mock*, here -- we will see more
  about these later. When we write unit tests,
  a "mock" is some sort of object that "stands in for"
  a real object that for some reason is difficult or inappropriate
  to use.)

\orangealert If you are not clear about what makes a good requirement,
you might want to review the chapter from the *Pressman* textbook
on "Understanding Requirements" (in the 9th edition)
or "Requirements Engineering" (in earlier editions).\
There is also a quick summary (taken from documentation
for an IBM requirements management product) available
[here][good-requirements].

[good-requirements]: https://www.informit.com/articles/article.aspx?p=1152528&seqNum=4

</div>
`\end{solbox}`{=latex}






<!-- vim: syntax=markdown tw=92 :
-->
