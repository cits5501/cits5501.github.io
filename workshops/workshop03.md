---
title: |
  CITS5501 lab 3 (week 4)&nbsp;--&nbsp;ISP
---


`~\vspace{-5em}`{=latex}


## 1. Test coverage concepts

Suppose you are asked to write tests for a Java method in the `AgePricing` class, whose Javadoc and signature are
as follows:

```java
/** Returns true if age is eligible for adult ticket price.
 *
 * @arg age The age of the customer
 * @return true if someone of that age is eligible for the adult ticket price,
 *         false otherwise.
 */
public static boolean isAdult(int age);
```

Elsewhere in the API documentation, you're told that any person who is 18 or over
is considered an adult.

Suppose also you're given the following JUnit test for this method. (There's no need to
compile and run it, but you're welcome to do so if you want.)


```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class AgePricingTest {

  @Test
  void adultAgeShouldReturnTrue() {
    assertTrue(AgePricing.isAdult(30));
  }
}
```

The above test is the *only* test currently in place, and we aren't given access to the
implementation.

**Question**

:   Is this one test enough to be confident that the method works? If not, come up with additional *test cases*.[^test-cases] Think about:

    - What are all the different "kinds" of ages we might need to check?
    - Are there any special or edge values?
    - What's just inside or just outside the adult cut-off?
    - Are there unusual but possible inputs?

[^test-cases]: As a reminder -- when being asked to come up with *test cases*, you just
  need to come up with descriptions of tests; you're *not* being asked to write code (refer
  to the week 1 lectures) -- if an assessment is asking you to write code, it will say
  so (e.g. "Write JUnit 5-based tests for your test cases"). \
  &nbsp; Each *test case* must specify (i) the inputs to the thing being
  tested, and (ii) the expected outputs or results. The "thing being tested" is sometimes
  referred to as *the subject under test*.




In lectures, we've mentioned that Java code can be [instrumented][instrum] so that, after your tests
run, a coverage tool can report which lines of implementation code were executed.
One such tool is JaCoCo (Java Code Coverage), which integrates with build systems and IDEs to produce coverage reports:
<https://www.jacoco.org/jacoco/>.

[instrum]: https://en.wikipedia.org/wiki/Instrumentation_(computer_programming)

Suppose we now are given access to the implementation of the `isAdult(int age)` method
(feel free to suggest a plausible one). We
instrument the method, and run the original single-test suite,
then later your improved multi-test suite.

**Question**

:   Do you think the reported line coverage will change between the two suites? Why or why
    not?
    If the reported coverage doesn't change, what does that tell you about the limitations
    of line coverage as a measure of how thoroughly a method has been tested?



<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

::: block-caption

Pre-reading for remaining exercises

:::

The remaining exercises in this worksheet assume general familiarity with the steps of Input Space
Partitioning, so it's recommended you complete the recommended
reading for week 4 from the textbook before attempting them.

</div>

## 2. Binary search

Consider the Javadoc documentation and signature for the following Java method, which
searches inside an array of `char`s for a particular value.

(Adapted from the Android version of the Java standard library.)

```{=latex}
\begin{small}
```

``` {.java .numberLines}
/**
 * Performs a binary search for @code value in the ascending sorted
 * array @code array, in the range specified by fromIndex (inclusive)
 * and toIndex (exclusive).  Searching in an unsorted array has an
 * undefined result. It's also undefined which element is found if there
 * are multiple occurrences of the same element.
 *
 * @param array the sorted array to search.
 * @param startIndex the inclusive start index.
 * @param endIndex the exclusive start index.
 * @param value the element to find.
 * @return the non-negative index of the element, or a negative index
 *         which is <code>-index - 1</code> where the element would be
 *         inserted.
 * @throws IllegalArgumentException if <code>startIndex > endIndex</code>
 * @throws ArrayIndexOutOfBoundsException if
 *         <code>startIndex < 0 || endIndex > array.length</code>
 * @since 1.6
 */
public static int binarySearch(char[] array, int startIndex, int endIndex, char value)
```

Based on the prescribed reading,
discuss how you would go about creating tests using Input Space
Partitioning. 

a.  What steps are involved in doing ISP?
b.  What is the input domain here?
c.  What are some characteristics you could use? (You may wish to drop in on a timetabled
    lab session and compare with another student to see what characteristics they have
    come up with.
    Remember to make sure each characteristic does in fact give you
    a partitioning.)

Once you've answered these questions, you might like to try implementing some of your
tests in Java using JUnit.



## 3. Stack class

Suppose we have a Stack class that is intended to implement the
[stack abstract data type][stack-type]. The class stores `int`s, and provides methods for
observing the state of the stack, and for performing the "push" and "pop" operations.
The method signatures for the class are as follows:

[stack-type]: https://en.wikipedia.org/wiki/Stack_(abstract_data_type)


- `public IntStack ();`
- `public void push (int i);`
- `public int pop (); /** Throws an exception if empty */`
- `public boolean isEmpty()`

Assume the object state consists of an `int` array.

a.  If we wanted to model `push` as a function, what sort of function would
    we use? How about `pop`?
b.  Identify all the parameters for the `pop` method, and suggest
    some characteristics that can be used to partition the input space.



## 4. Further questions

Consider the following questions about ISP and try writing an answer to each.
(Questions like this are typical of ones you might be asked in the mid-semester test or
final exam.)
Once you've made an attempt, you might like to drop in on a timetabled lab session to
compare your answers with other students'.

There is not necessarily any single correct answer to such questions; students are expected
to base their answers on the information covered in class and in previous units, and on
reasonable deductions they can make from those.

a.  Suppose we need to test some method (let's suppose it is a static
    method `myMethod` that takes one
    `int` for the sake of argument, and that it's sensible to partition it into positive,
    negative and 0-valued `int`s. i.e. the signature is `static myMethod(int i)`).

    Suppose you've already written three tests for the function; each of your
    3 tests uses a test value from one partition.

    Your supervisor says three tests is not enough, and you should write
    more. What do you think? Would more tests be better? Could more
    tests be *worse*?


b.  Research suggests that the later in the development life cycle a
    fault is discovered, the more expensive it is to fix. Why do you
    think this is so?






<!-- vim: syntax=markdown tw=92 :
-->
