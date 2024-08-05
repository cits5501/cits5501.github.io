---
title: |
  CITS5501 lab 2 (week 3)&nbsp;--&nbsp;Data-driven tests and test design
---

`~\vspace{-5em}`{=latex}

## 1. Parameterized tests

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

`\genericbox`{=latex}
<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">


**Exercises**

a.  Run the tests in your IDE or editor to confirm that all those ints are
    used -- how can you tell?
#.  Try changing them and/or adding to the list.
#.  `addZeroHasNoEffect` is a single method. But (based on the material
    from lectures and the textbooks) is it also a single *test case*?
    If not, how many test cases does it comprise?


</div>
`\endgenericbox`{=latex}



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




`\genericbox`{=latex}
<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

**Exercises**

a.  How many *test cases* would you say `tableOfTests` and
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
#.  If you have used testing frameworks in languages other than Java --
    how do they compare with JUnit? Do they offer facilities for
    creating data-driven tests? Are these more or less convenient
    than the way things are done with JUnit?

[snake-case]: https://en.wikipedia.org/wiki/Snake_case#:~:text=SCREAMING_SNAKE_CASE&text=uses-,SCREAMING_SNAKE_CASE 
[enum-types]: https://docs.oracle.com/javase/tutorial/java/javaOO/enum.html

</div>
`\endgenericbox`{=latex}




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







<!-- vim: syntax=markdown tw=92 :
-->
