---
title: |
  CITS5501 lab 4 (week 5)&nbsp;--&nbsp;ISP and graphs
---

## 0. Recommended reading

Before attempting the exercises in this worksheet, it's recommended you complete the
recommended reading for week 5, and ensure you've reviewed the lecture slides on Input Space Partitioning
and graph-based testing.

It should be possible to attempt the exercises even without having attended the lectures on
graph-based testing, but you might want to revisit your answers after you have attended
those lectures.


## 1. ISP, graphs and control flow

Consider the following Java method for collapsing sequences of blanks, taken
from the `StringUtils` class of Apache Velocity
(<http://velocity.apache.org/>), version 1.3.1:


``` { .java .numberLines }

/**
* Remove/collapse multiple spaces.
*
* @param String string to remove multiple spaces from.
* @return String
*/

public static String collapseSpaces(String argStr) {
  char last = argStr.charAt(0);
  StringBuffer argBuf = new StringBuffer();

  for (int cIdx = 0 ; cIdx < argStr.length(); cIdx++) {
    char ch = argStr.charAt(cIdx);
    if (ch != ' ' || last != ' ') {
      argBuf.append(ch);
      last = ch;
    }
  }
  return argBuf.toString();
}

```

a.  Using the ISP principles we have covered in class, suggest
    some *characteristics* we could use to partition
    the `argStr` parameter.

    Once you have several characteristics, consider how you might choose
    combinations of partitions from them. A recommended approach is to aim
    for "Base Choice" coverage:

    i.  For each characteristic, pick a *base choice* (and explain the
        reasoning behind that choice). Usually, the base choice will be one that is
        simpler, smaller, or more likely to occur than the other possibilities.
    ii. Select test values for a "base choice" test.
    #.  Go through and derive test values for the "non-base" partitions.

    Try writing JUnit tests for some of your test values.

    After you have finished the lab exercises, you might like to drop into one of the
    timetabled lab sessions and compare the characteristics and
    test values you derived with those of another student. Are your solutions
    the same? If not, how do they differ? Do either of your solutions have an advantage over
    the other?

b.  Using the techniques outlined in lecture slides and readings on graph-based testing,
    try to construct a *control flow graph* of the method.

    How many nodes do you end up with? \
    How many edges?

For the purposes of this exercise, we'll take a simplified approach:
you may ignore calls
to other methods, such as `.charAt()`, and need only
model the control flow *within* the method. (What about possible
exceptions?  Should they be modelled, or not? Why?)

A typical way of "labelling" your graph nodes needs is to use letters
("A", "B", "C" and so on),
and to provide a legend, showing a reader which nodes correspond
to which lines (or fragments of lines) of code.

Sometimes there may be multiple nodes representing
fragments of code all within the same line (e.g. line 11).
As long as you have a clear explanation of what each node
represents (e.g. "node D: the line 11 loop condition") then
that's fine.






c.  Given your test cases from part (a), try mentally or on paper
    "executing" several tests, and see what paths of the graph
    get exercised by each of your tests.

    How would you subjectively rate the "coverage" of the graph
    by your tests -- good? reasonable? poor?



d.  Work out whether your tests give the following sorts
    of coverage:

    i.  node coverage
    #.  edge coverage



e.  What are the *prime paths* in your graph?
    What proportion of the prime paths are exercised by
    the tests you've given?

    Can you construct some tests which exercise prime paths
    you haven't already covered?



## 2. Test fixtures

Review the material from the textbook on test automation
(ch 6), and the JUnit 4 "Text fixtures" documentation
(at <https://github.com/junit-team/junit4/wiki/Test-fixtures>).




Consider the following code we wish to test:

```{.java}
class MyClass {
   private int x;
   public MyClass(int x) { this.x = x; }

   @Override
   public boolean equals(Object obj) {
      if (!(obj instanceof MyClass)) return false;
      return ((MyClass) obj).x == this.x;
   }
}
```

Find the Java library documentation for the `equals()` method (it's
in the `Object` class), and read what its requirements are.

In Java, all other classes automatically inherit from the `Object`
class, and may also *override* methods provided by the `Object`
class -- this is what the "`@Override`" annotation on the
`equals()` method means.

The `equals()` method should test whether the `Object` "`obj`" is "equal
to" the receiver object, `this`, where what "equal to" means is decided
on by the implementer of the class. (The `equals()` method in Java
serves the same purpose as the `__eq__` special method in Python.) The
implementer is free to decide for themselves what "equal to" means for
their class.

In order to avoid suprising behaviour for callers of the method, in
general equality should be an [*equivalence relation*][equiv]; for
instance, an object should always be equal to itself, and if
`a.equals(b)` is true and `b.equals(c)` is true, then `a.equals(c)`
should also be true.


[equiv]: https://en.wikipedia.org/wiki/Equivalence_relation


The `instanceof` keyword in Java allows us to check whether
an object is an instace of some class (or some class that
inherits from that class, directly or indirectly). Normally,
implementers of `equals` will want to return "`false`"
whenever we try to compare with objects not of the same class.

Create a new Java project, create a `MyClass.java`
file containing the code above,
and check that it compiles.

**A test class**

Suppose we use the following test code for our
`MyClass` class:


```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MyClassTest {
   private MyClass mc1;
   private MyClass mc2;
   private MyClass mc3;

   @BeforeEach
   public void setUp() {
     mc1 = new MyClass(3);
     mc2 = new MyClass(5);
     mc3 = new MyClass(3);
   }

   @Test
   /* Test the case when, for two objects, the second is null */
   public void equalsWhenNullRef() { fail("incomplete"); }

   @Test
   /* Test the case when, for two objects, they are not equal */
   public void equalsWhenNotEq() {/*...*/}

   @Test
   /* Test the case when, for two objects, they are equall */
   public void equalsWhenEq() {/*...*/}

}
```


In this case, the instance variables `mc1`, `mc2` and `mc3`
are potential *fixtures* for any test.

1.  Given the test code above, how many times will the `setUp()`
    method execute?

    Compile and run the tests and check whether this is the case.

#.  It is good practice, when writing new tests, to ensure
    that at first they *fail*. This is useful as a warning,
    so that you know the test is not yet complete.
    (We don't want to accidentally give our code to other
    developers when it contains tests that are incomplete,
    or do the wrong thing.)

    Insert code into the test
    methods that will always fail. What JUnit method have you
    used? Are there any other ways you can think of (or spot
    in the JUnit documentation) for
    writing a test that always fails?

#.  Fill in code for the test methods in this class.

#.  Are there any other tests you think we should add
    in order to thoroughly test our class? What are they?

#.  Using the material from lectures, and the JUnit user guide,
    write a "teardown" method. What code should go in it?
    Based on your understanding of the Java language, is a "teardown" method necessary in
    this case? Why or why not?



## 3. Class design, invariants, and testability

Suppose we are writing a `DigitalTimer` class representing 24-hour times -- it could be used, for example, in
simulation programs. Rather than measuring "real" time, it measures simulated time, where
every call to the `tick()` method causes one second to "elapse". Other objects in the
simulation could then query a `DigitalTimer` object to find out what the current time
is.[^simplified]

[^simplified]: This is a very simplified representation of how a simulated timer might work.
  In a real simulation, rather than other objects having to actively query a `DigitalTimer`
  object to find out its state, we would want to give them the ability to be *alerted* whenever
  a "tick" occurs. A typical approach is to use the ["Observer"][observer] or
  ["Publish-subscribe"][pubsub] software patterns. You can see example of "timer"
  classes which use the "Observer" pattern
  [here](https://users.cs.jmu.edu/foxcj/Public/ISED/aqualush/src/simulation/SimTime.java)
  and [here](https://gist.github.com/vilmaralmeida/1514576), and read more about
  how the pattern is implemented in Java [here](https://www.baeldung.com/java-observer-pattern).


[observer]: https://en.wikipedia.org/wiki/Observer_pattern
[pubsub]: https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern

A colleague has suggested the following method signatures and documentation for the class:

```java
/** Represents a simulated time, where the "tick" method causes the time to be incremented
  * by one second.
  */
public class DigitalTimer {
  /** Construct a new DigitalTimer, initialized to time zero.
   */
  public DigitalTimer();

  /** Get the "hours" component of the time elapsed since
   * the timer was started.
   */
  public int getHours();

  /** Get the "minutes" component of the time elapsed since
   * the timer was started.
   */
  public int getMinutes();

  /** Get the "seconds" component of the time elapsed since
   * the timer was started.
   */
  public int getSeconds();

  /** Cause one simulated second to elapse. Once the timer reaches
   * 23 hours, 59 minutes, and 59 seconds, further calls to tick will
   * have no effect.
   */
  public void tick();
}
```

The method signatures your colleague has written represent the public API for the class;
they don't show the implementation.

**Question 3.1:**

:   Before going on -- what might be useful attributes (fields) for the class? These will be part of
    the implementation. Can you think of multiple different alternatives? Should they
    be added to the API? Why, or why not?

**Question 3.2:**

:   Consider whether there are any *invariants* that govern the values of these
    attributes. Class invariants are constraints on what values the attributes of the class
    can take. They do *not* form part of the public API: they are an implementation detail,
    for use by the developer of the class (and any other developers maintaining the code).

For this lab, it's suggested you use three `int` attributes, `hours`, `minutes` and `seconds`.
Using your colleague's API sketch as a starting point, add in the attributes and add
"skeleton" method bodies to the code -- e.g., for `getSeconds()`, you might start with

```java
  public int getSeconds() {
    return -1;
  }
```

The aim is to write code that will compile (but isn't yet a correct implementation).

You
should be able to come up with a number of class invariants relating these attributes.
Write them down as inline comments (*not* as Javadoc comments) in the body of the class.
If you drop in on a timetabled lab session, compare the invariants you
have proposed with those of other students (or with the lab facilitator).



*Before* writing a constructor and filling in the method bodies, write a `DigitalTimerTest`
class:

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class DigitalTimerTest {

  @Test
  public void testConstructor() {

  }


  @Test
  public void testTick() {

  }

}
```

See if you can suggest some possible test cases for this JUnit class, and try implementing
them. Obviously, they will fail at first; but since your tests should rely only on the
documented behaviour of the class, it's quite possible to write them before the class has
been implemented. This approach is used in the [test-driven development methodology][tdd]
(TDD).

[tdd]: https://en.wikipedia.org/wiki/Test-driven_development

Lastly, try filling in the method bodies for `DigitalTimerTest`. Some notes to bear in mind:

- The job of a
  *constructor* is to initialize a new class object, ensuring (by the time the constructor has
  finished) that the object is in a sensible state and all the invariants hold.
- The job of any mutator method is to alter the state of an object in some way. Assuming the
  class invariants hold before the mutator is called, the mutator might break them
  temporarily (say, temporarily setting "`seconds`" to 60); but it should ensure the
  invariants hold again by the time it finishes executing.

You could find it useful, while testing, to write a `private` "`checkInvariants`" method,
which tests whether the invariants hold, and throws an
[`IllegalStateException`][illegal-state] if not. Such an exception typically signals a logic
error in the program, so generally shouldn't be caught.


[illegal-state]: https://docs.oracle.com/en%2Fjava%2Fjavase%2F11%2Fdocs%2Fapi%2F%2F/java.base/java/lang/IllegalStateException.html



How will you test that `tick` operates correctly after, say, 59 seconds, or once the time
reaches 23:59:59?

There are a few different options here:

**Test through public API**

:   If possible, it's usually preferable to test a class solely through its public
    methods and constructors, treating the implementation of the class as a "black box".
    The reason this is preferred is because it ensures the class behaves correctly when
    its behaviour is invoked via the API -- which is, after all, how we expect it to be used.

    However, it might prove challenging to test the class thoroughly when some behaviours
    are difficult to trigger. If this is the case, we might consider using another method
    (see below), or we might consider redesigning the API to make the class more testable.


**Use reflection**

:   Ideally, our classes should be designed with testability in mind. But if necessary, it's
    possible to use Java's [reflection API][reflection]. This allows us to obtain
    information about the methods and fields of an object at runtime, and to alter their
    visibility.

    You can see an example of how to access private field information
    [here][geeks-priv-field], and read more about the reflection API in Oracle's
    technical article on the topic [here][oracle-refl].

    This allows us to directly set particular internal states, which can be convenient for
    testing. But a disadvantage is that the tests are now tightly coupled to the class's
    implementation, and will likely break if that implementation is altered. By setting the
    state directly, we're also bypassing the publicly documented API -- we need to make
    sure that the state we set *is* one that could still be achieved directly through the
    API (otherwise, we're testing something that couldn't actually happen). Finally, use of
    reflection tends to make tests more complex and harder to maintain.

[reflection]: https://docs.oracle.com/javase/7/docs/api/java/lang/reflect/package-summary.html
[geeks-priv-field]: https://www.geeksforgeeks.org/how-to-access-private-field-and-method-using-reflection-in-java/
[oracle-refl]: https://www.oracle.com/technical-resources/articles/java/javareflection.html

**Use protected, "package-private" setter methods, and/or inheritance**

:   An alternative to using the reflection API is to write protected or "package-private"
    methods that set the state directly.

    Protected methods of some class can be invoked by other classes in the same package, or
    by subclasses; they're indicated by writing "`protected`" as a method modifier.
    "Package-private" methods can be accessed by other classes in the same package, and are
    indicated by not writing any method modifier -- for instance:

    ```
      public setMinutes(int minutes) {
        this.minutes = minutes;
      }
    ```

    Our test classes can then use these methods to directly set the state of the class under
    test. This is simpler than using the reflection API, but other than that, has much the
    same drawbacks: we're subverting the public API, and our tests are now more tightly
    coupled to the implementation.

    One variant of this is to *subclass* our original class-under-test, and add mutators to
    the subclass. Technically, if we haven't made our class under test `final`, this *isn't*
    subverting the API (as long as our subclass maintains all the invariants of the original
    class), since inheritance is an allowable way of using a class.

    But in general, it's better to only allow classes to be inherited from if they've been
    designed with that in mind -- it's better practice to make classes `final`, preventing
    inheritance.

In the present case, it should be possible to test the class entirely through its public API
(though it might seem a little awkward).

<!-- vim: syntax=markdown tw=92 :
-->
