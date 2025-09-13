---
title: |
  CITS5501 lab 4 (week 5)&nbsp;--&nbsp;Testability, ISP and control flow&nbsp;--&nbsp;solutions
---

## 1. Test fixtures

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



`\begin{solbox}`{=latex}
<div class="solutions">

**1\. setUp method**

As suggested in the question -- you should compile and run the tests
to find out how many times the `setUp()` method executes.

**2\. failing tests**

Some possibilities are:

- inserting an assertion you know will fail (e.g.
  `assertTrue(false)`)
- throwing an exception (if your test is *intended* to throw an
  exception, then throwing an exception other than the expected
  one). For example:

  ```java
    throw new RuntimeException("test not implemented yet");
  ```

- calling the method `fail(String message)` from
  the `org.junit.jupiter.api.Assertions` class
  (or one of several similar overloaded `fail` methods). For
  instance:

  ```java
    fail("test not implemented yet");
  ```

Of these, the last is the best, as it most clearly demonstrates the
intention -- to fail, not because some assertion is false,
but because a test is not complete or has not yet been written.

(You can also check out the answers to this [StackOverflow
question][so-pending] for some other possibilities.)

Some testing frameworks have special assertions or annotations
for marking a test as *pending* (not yet running, for some reason),
but JUnit does not yet have this functionality built into it.

[so-pending]: https://stackoverflow.com/questions/14341277/is-there-a-general-way-to-mark-a-junit-test-as-pending

**3--4\. unit test practice**

You should gain practise writing tests by doing these exercises
yourself -- model solutions are not provided. Feel free to show your
code to facilitators or the unit coordinator for feedback
if you have attempted them.

**5\. tearDown method**


You could write something like

```java
  @AfterEach
  public void tearDown() {
    mc1 = null;
    mc2 = null;
    mc3 = null;
  }
```

But this is not actually necessary. The order of events is that for
each test, the JVM will

- create an instance of `MyClassTest`
- run the `setUp` method, and
- execute the test

and sometime after this, the instance of `MyClassTest` will get
garbage-collected and any memory associated with it will be
freed. Since the Java

We only need to write a `tearDown` method when there are resources
(e.g. files on disk, database tables) that are *not* cleaned up by
the JVM. In that case, we would write a `tearDown` method that,
for instance, deletes any created files.

</div>
`\end{solbox}`{=latex}



## 2. Class design, invariants, and testability

Suppose we are writing a `DigitalTimer` class representing 24-hour times -- it could be used, for example, in
simulation programs. Rather than measuring "real" time, it measures simulated time, where
every call to the `tick()` method causes one second to "elapse". Other objects in the
simulation could then query a `DigitalTimer` object to find out what the current time
is.[^simplified]

[^simplified]: This is a very simplified representation of how a simulated timer might work.
  In an actual simulation, rather than other objects having to actively query a `DigitalTimer`
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

**Question:**

:   Before going on -- what might be useful attributes (fields) for the class? These will be part of
    the implementation. Can you think of multiple different alternatives? Should they
    be added to the API? Why, or why not?




`\begin{solbox}`{=latex}
<div class="solutions">

**Solution**

There should be two obvious possibilities for an implementation:

a.  We could add `int` attributes `hours`, `minutes` and `seconds`. In this case, the
    implementations of `getHour`, `getMinute` and `getSecond` will be very simple;
    but the `tick` implentation
    will need to ensure values are properly "carried" when, for instance, `seconds` equals
    59 and `tick` is invoked.

b.  We could add a single `second` attribute, and no others. In this case, the `tick`
    implementation will be very simple (we simply increment our `seconds` attribute), but
    the `getHour`, `getMinute` and `getSecond` will be more complex.

The fields should be kept private, because otherwise, any user of the class can alter them,
and we have no ability to maintain the invariants (see next question) -- and thus, no way of ensuring our
objects are still in a sensible, consistent state.

</div>
`\end{solbox}`{=latex}




**Question:**

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



`\begin{solbox}`{=latex}
<div class="solutions">

**Solutions**

The invariants will depend on whether we chose implementation (a) or (b).

But in either case, there are some obvious invariants that apply to the class. For instance,
assuming we have chosen implementation (b):

- `seconds`, `hours` and `minutes` should always be greater than or equal to 0.
- Attributes will have a maximum value they can never exceed -- 23 for hours, 59 for seconds,
  and 59 for seconds.




</div>
`\end{solbox}`{=latex}



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



`\begin{solbox}`{=latex}
<div class="solutions">

Sample solution code (not including the Javadoc):

```java
public class DigitalTimer {
  private int hours; // invariant: 0 <= hours <= 23
  private int minutes; // invariant: 0 <= minutes <= 59
  private int seconds; // invariant: 0 <= seconds <= 59

  public DigitalTimer() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  public int getHours() {
    return hours;
  }

  public int getMinutes() {
    return minutes;
  }

  public int getSeconds() {
    return seconds;
  }

  public void tick() {
    if (hours == 23 && minutes == 59 && seconds == 59)
      return;

    seconds++;

    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

}
```

Note that the `tick` method sometimes breaks the invariants (for instance, `seconds` might
temporarily be set to 60), but they are restored again by the time the method ends.

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DigitalTimerTest {

  @Test
  public void testConstructor_initialValues() {
    DigitalTimer timer = new DigitalTimer();
    assertEquals(0, timer.getHours(), "Initial hours should be 0");
    assertEquals(0, timer.getMinutes(), "Initial minutes should be 0");
    assertEquals(0, timer.getSeconds(), "Initial seconds should be 0");
  }

  @Test
  public void testTick_incrementSeconds() {
    DigitalTimer timer = new DigitalTimer();
    timer.tick();
    assertEquals(0, timer.getHours(), "Hours should still be 0 after 1 tick");
    assertEquals(0, timer.getMinutes(), "Minutes should still be 0 after 1 tick");
    assertEquals(1, timer.getSeconds(), "Seconds should be incremented by 1");
  }

  @Test
  public void testTick_incrementMinutes() {
    DigitalTimer timer = new DigitalTimer();

    for (int i = 0; i < 60; i++) {
      timer.tick();
    }

    assertEquals(0, timer.getHours(), "Hours should still be 0 after 60 ticks");
    assertEquals(1, timer.getMinutes(), "Minutes should be incremented by 1 after 60 ticks");
    assertEquals(0, timer.getSeconds(), "Seconds should reset to 0 after 60 ticks");
  }

  @Test
  public void testTick_incrementHours() {
    DigitalTimer timer = new DigitalTimer();

    for (int i = 0; i < 3600; i++) {
      timer.tick();
    }

    assertEquals(1, timer.getHours(), "Hours should be incremented by 1 after 3600 ticks");
    assertEquals(0, timer.getMinutes(), "Minutes should reset to 0 after 3600 ticks");
    assertEquals(0, timer.getSeconds(), "Seconds should reset to 0 after 3600 ticks");
  }

  @Test
  public void testTick_maxTimeReached() {
    DigitalTimer timer = new DigitalTimer();

    // Set the timer to 23:59:59
    for (int i = 0; i < (23 * 3600 + 59 * 60 + 59); i++) {
      timer.tick();
    }

    assertEquals(23, timer.getHours(), "Hours should be 23 after 86399 ticks");
    assertEquals(59, timer.getMinutes(), "Minutes should be 59 after 86399 ticks");
    assertEquals(59, timer.getSeconds(), "Seconds should be 59 after 86399 ticks");

    // Tick once more, timer should remain at 23:59:59
    timer.tick();

    assertEquals(23, timer.getHours(), "Hours should remain 23 after max time is reached");
    assertEquals(59, timer.getMinutes(), "Minutes should remain 59 after max time is reached");
    assertEquals(59, timer.getSeconds(), "Seconds should remain 59 after max time is reached");
  }
}
```

</div>
`\end{solbox}`{=latex}



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

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

::: block-caption

Pre-reading

:::

The following exercises in this worksheet assume general familiarity with graph-based
testing concepts, so it's recommended you work through chapter 7 from the Ammann and Offutt
textbook before attempting them.

</div>


## 3. ISP and control flow

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

**Exercise**

:   Using the ISP principles we have covered in class, suggest
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



`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

**ISP characteristics**

Here are some possible characteristics, and values we might
select from each partition:

- Is the string empty, or non-empty?
  - This gives us two partitions.
  - For the "non-empty" option, we might choose  as test values a
    "typical" string, say
    `"too many assessments :/"`,
    and maybe some less typical options
    (perhaps very long strings, strings using non-English Unicode
    characters, or the string
    `"not nearly enough assessments :/"`)

We can define some *sub*-characteristics for the non-empty option.
Some sample characteristics follow, all of which assume the string is
non-empty:

- Does the string contain spaces? (Gives 2 partitions; strings that do,
  and strings that don't)
- Does the string contain only spaces? (ditto -- gives 2 partitions)
- Does the string contain spaces at the start? (gives 2 partitions)
- Does the string contain spaces at the end? (gives 2 partitions)
- Does the string contain a run of two or more contiguous spaces? (gives 2 partitions)
- Does the string contain a run of two or more tab (`\t`) characters? (gives 2 partitions)
- Does the string contain a run of two or more [zero-width
  space](https://en.wikipedia.org/wiki/Zero-width_space) (unicode
  `U+200B`) characters? (gives 2 partitions)

For a *base choice*, we might select the following partitions from
those:

- Does the string contain spaces? Base choice: yes. (A string containing
  some spaces would be a typical use case for this method.)
- Does the string contain only spaces? Base choice: no. (A string with
  all spaces would be atypical.)
- Does the string contain spaces at the start? Base choice: no. (We
  might think that the most common case is where the parameter starts
  and ends with a letter or punctuation.)
- Does the string contain spaces at the end? Base choice: no. (See
  previous point)
- Does the string contain a run of two or more contiguous spaces? Base
  choice: we might decide either way, but let's say that we think "Yes"
  represents a more typical use case here.
- Does the string contain a run of two or more tab (`\t`) characters?
  Base choice: we might select "no", on the grounds that spaces are more
  common than tabs.
- Does the string contain a run of two or more [zero-width
  space](https://en.wikipedia.org/wiki/Zero-width_space) (unicode
  `U+200B`) characters? Base choice: no, again (see previous point).

We can then construct a test *value* which satisfies all those base
choices -- `"some␣random␣␣string"`, perhaps (here, we've used the
`␣` character to represent a space -- note the 2 spaces after
"random").

We would then go through and vary the partitions for different
characteristics. (This *doesn't* mean we have to use our original test
*value* as a template, though we could if we want.)

For instance, "Does the string contain spaces at the start?". The base
choice selects from the "no" partition; we could vary this by using
`"␣some␣random␣␣string"` as a test value.

There might well be better ways of organizing our characteristics --
what were yours? (For instance, one other possibility is: partition
strings into "Strings containing a run of two or more consecutive
whitespace characters" vs "Strings that don't". We might then make most
of the characteristics listed above *sub-*partitions of the "Strings that
do..." partition.)

</div>
`\end{solbox}`{=latex}




In previous labs, we've seen that attempting to measure test coverage simply
by recording which lines of code a test suite exercises can mislead us as to
how thoroughly our tests exercise the code.

One alternative is to construct a *control flow graph* of the code being tested.
A control flow graph (CFG) is a way of representing all the possible paths that a program's
execution can take.

- The graph is made up of *nodes*. Each node represents a *basic block* of code: a chunk of
  instructions that will always run together in sequence. Sometimes, a node corresponds to
  only *part* of a statement -- for example, in a Java `for` loop like

  ```java
  for (int i = 0; i < mylist.size(); i++) {
    // loop body
  }
  ```

  there might be a node for the *initialisation* (`int i = 0`), a node for the *condition check* (`i < mylist.size()`), a node for the *update* (`i++`), and nodes for the loop body.
- The connections between nodes are called *edges* (we can think of them informally as
  “arrows”). An edge shows that after finishing one node, control may flow to another node.
- By following the arrows, we can trace out every possible route execution might take through the code.

Take another look at the `collapseSpaces` method. Can we construct a control flow graph for
the method?
For the purposes of this lab, we'll take a simplified approach:
we'll ignore calls to other methods, such as `.charAt()`, and only
model the control flow *within* the method. (Initially, you may want to
ignore possible exceptions, too. Once you've completed the exercises, see if you
can revise your graph to include them -- do they seem useful?)  

A typical way of "labelling" graph nodes needs is to use letters
("A", "B", "C" and so on),
and to provide a legend, showing a reader which nodes correspond
to which lines (or fragments of lines) of code.

Note that sometimes there may be multiple nodes representing
fragments of code all within the same line (e.g. line 11).
But as long as we have a clear explanation of what each node
represents (e.g. "node D: the line 11 loop condition") then
that's fine.

**Exercise**

:   Try to construct a control flow graph of the `collapseSpaces` method.
    How many nodes do you end up with? How many edges?





`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

**b\. control flow graph**

Here is one possible control flow graph:

`\begin{center}`{=latex}
<!-- ![](images/controlflow-solution.eps){ width=70% } -->
![](images/controlflow-solution.svg){ width=70% }
`\end{center}`{=latex}

Here, the nodes are labelled with the section of code they
represent. Contiguous lines of code (e.g. lines 9--10 and the
start of 12) are "collapsed" together to save space --
since they must *always* be executed together (in our simple
model of the function), there's no real point in giving
each line its own node.

</div>
`\end{solbox}`{=latex}




c.  Given your test cases from part (a), try mentally or on paper
    "executing" several tests, and see what paths of the graph
    get exercised by each of your tests.

    How would you subjectively rate the "coverage" of the graph
    by your tests -- good? reasonable? poor?



`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

**c\. subjective graph coverage**

The answers here will depend on your suggested tests.

</div>
`\end{solbox}`{=latex}



d.  Work out whether your tests give the following sorts
    of coverage:

    i.  node coverage
    #.  edge coverage



`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

**d\. node and edge coverage**

The answers here will depend on your suggested tests.

</div>
`\end{solbox}`{=latex}



e.  What are the *prime paths* in your graph?
    What proportion of the prime paths are exercised by
    the tests you've given?

    Can you construct some tests which exercise prime paths
    you haven't already covered?



`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

**e\. prime paths**

For the graph solution shown earlier, the prime paths are
(we have grouped related paths together -- e.g. when they have a shared
prefix, or represent paths through the same loop):

- ABG, ABCDEF, ABCDF
- BCDEFB, CDEFBC, DEFBCD, EFBCDE, FBCDEF *(these all execute the left-hand 'if' branch)*
- BCDFB, CDFBC, DFBCD *(these all execute the right-hand 'if' branch)*
- CDEFBG *(takes left branch)*
- CDFBG *(takes right branch)*

What proportion of the prime paths your tests cover will
depend on what tests you chose.
But note that if your tests don't have
node or statement coverage,
then they certainly won't have prime path coverage.

One useful path is the path ABG, which will get exercised
when we pass in the empty string. This is a useful test because
it reveals a problem with the code -- passing in empty strings
causes an exception to be thrown when we reach line 9 (the
`.charAt` call fails).

We might arrive at this test *either* by applying ISP
techniques, or by looking to see what sort of graph coverage
we have -- as long as we find the bug, either approach
is fine!

</div>
`\end{solbox}`{=latex}




<!-- vim: syntax=markdown tw=92 :
-->
