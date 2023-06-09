---
title: |
  `\LARGE\textmd{`{=latex}
  CITS5501 Software Testing and Quality Assurance `\\`{=latex}
  Semester 1, 2022 `\\`{=latex}
   Workshop 4 (week 5) -- graphs 
  `}`{=latex}
---

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

    i.  For each characteristic, pick a "base choice" (and explain the
        reasoning behind that choice)
    ii. Select test values for a "base choice" test.
    #.  Go through and derive test values for the "non-base" partitions.

    Try 
    writing JUnit tests for some of your test values.
    Compare the characteristics and test
    values you derived with those of someone else in the same lab.
    Are your solutions the same?

b.  Using the techniques outlined in the last lecture,
    try to construct a *control flow graph* of the method.

    How many nodes do you end up with? \
    How many edges?

You may wish to work with a partner for these exercises, and
compare your answers.

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


```
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
    Is it necessary in this case? Why or why not?




<!-- vim: syntax=markdown tw=72 :
-->
