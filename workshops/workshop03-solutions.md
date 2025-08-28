---
title: |
  CITS5501 lab 3 (week 4)&nbsp;--&nbsp;ISP&nbsp;--&nbsp;solutions
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




<div class="solutions">

**Sample solutions**:

This one test is _not_ enough to be confident the method works. The method implementation
ought to be extremely simple -- just return `age >= 18` -- but if we want have high
confidence that the method is implemented correctly, we should probably check, in addition
to the "30" case:

2. The boundary at the minimum adult age (18)
#. One below that boundary (17)
#. Zero and/or or negative ages

Once those tests are in place, we still don't _know_ for sure that the method is correct
in all cases -- the only way of knowing that would be to test every single `int` value -- but our confidence in it should be much higher. It's _possible_ that the
implementer of the method has written it as

```java
public static boolean isAdult(int age) {
  if (age == 999)
    return false;
  else
    return age >= 18;
}
```

But unless the implementer is trying to be deliberately unhelpful, that seems unlikely. 
More realistically, if there is a mistake, it would be

- A mis-typed comparator (e.g. `<=` or `>` instead of `>=`), or (less likely)
- An incorrect age (some number other than 18).

Given the sorts of mistake an implementer is _likely_ to make, the four tests above
(including the original test) should give us a high confidence the method works. 

Beyond that, any additional tests reach a point of diminishing returns -- they don't
increase our confidence much, and the extra tests constitute additional code that needs to be
maintained. (You might like to think about: _why_ don't the additional tests increase our
confidence? Then read the material in the textbook about Input Space Partitioning and see if
that helps you formulate your answer.) 

</div>



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



<div class="solutions">

**Sample solutions**:

The line coverage will almost certainly _not_ change --
it will likely be exactly the same for both test suites.

As we've noted, the implementation is likely to be (assuming it is correctly written):

```java
public static boolean isAdult(int age) {
  return age >= 18;
}
```

So there _is_ only one line in the body -- and all possible execution paths are short and
go through the same single statement.
Even with just the first test (age = 30), that line is executed.
Adding more tests (e.g. boundary values) executes the same set of lines — so the line
coverage number doesn't increase. (It's possible, though not likely, that a naive
implementer might write the method using an `if ... else` statement -- but even then,
one "false" and one "true" test case suffice to exercise all the lines in it.)

What does this tell us about the limitations of line coverage?

Line coverage measures whether a line was executed at least once, not how thoroughly its
behaviour was tested.
In our example, we can have 100% line coverage while missing critical behaviours at
boundaries (e.g., age == 18) or in invalid input cases. For a boolean expression (`age >=
18`) with only one variable in it, there will likely not be too many boundaries (just one in
fact) -- but
hopefully you can see that more complex expressions would give rise to more complex
boundaries.
Good testing needs to explore different conditions and [equivalence classes][equiv], not just "touch
every line". In the material from this week and the following weeks, we'll look at ways of
assessing coverage which go beyond simple metrics of "number of lines executed". ISP,
graph-based testing, logic-based testing, and syntax-based testing all do the following:

1. Suggest a model or possible way of viewing the subject under test -- e.g. as a mathematical
   function (ISP), or as a set of logic expressions (logic-based testing).
2. Once we've modeled the subject under test in a particular way, they give us ways of assessing
   the thoroughness of a test suite.

[equiv]: https://en.wikipedia.org/wiki/Equivalence_partitioning

</div>



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



`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

***a\. Steps involved are:***

1. Identify functions
2. Identify parameters
3. Model the input domain (partitioning it using
   characteristics)
4. Choose partitions, and values within them
5. Refine these into tests
6. Review

***b\. input domain***

The input domain consists of:

- the set of all possible *arrays* of `char`s (for all practical
  purposes, we can consider this domain as being infinite in size)
- the set of all possible `int`s (2 parameters of this sort)
- the set of all possible `char`s (if we assume for simplicity
  that only ASCII characters are used,[^unicode] there are 256 of them)

[^unicode]: In actuality, Java `char`s are 2 bytes in size and can
  hold 65,536 distinct values, representing a subset of [Unicode code points][unicode] --
  see e.g. the documentation for the [`Character` class][jchar] for the version
  of Java you're interested in.\
  &nbsp; &nbsp; In Java, methods that need to take a "character" (in the broad
  sense) as an argument can do so in two ways: they can take a `char`, or they can
  take an `int`.\
  &nbsp; &nbsp; If they take a `char`, they'll be limited to the 65,536 possible values of a `char`.
  If they take an `int`, then they can represent all possible code points (there are
  1,114,112 of them), but also will have to deal with values outside that range
  (e.g. by throwing an exception, or having undefined behaviour). Assuming the `int`
  does represent a possible code point, it may or may not be assigned to some
  actual character -- in [Unicode version 16.0][unicode16], only 154,998 characters are
  assigned so far -- so again may need some way of handling invalid values.
  Different versions of Java will implement different versions of the Unicode standard,
  so the exact number of assigned code points will vary
  from version to version.\
  &nbsp; &nbsp; An example of a method taking an `int` is the [`indexOf` method](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#indexOf-int-) of
  the [`java.lang.String`
  class](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html). That method says
  what the behaviour of the function will be if an `int` is passed that falls in the U+0000
  to U+10FFFF range (1,114,112 values), but doesn't say what the behaviour will be if an
  `int` outside that range is passed; so we must take the behaviour to be undefined. \
  &nbsp; &nbsp; When answering questions in tests or exams, you're welcome to make
  simplifying assumptions, if needed; since you probably won't have access
  to the Unicode standard, you can make the simplifying assumption that
  we're only considering ASCII characters. (You should clearly state
  that you're making this assumption, however, and that the actual number of
  characters is larger.) Markers are generally more interested in your *reasoning* than
  in whether you can recall exactly the size of a `char` or how many Unicode characters
  there are, so this sort of simplifying assumption is fine.

[unicode]: https://en.wikipedia.org/wiki/Unicode
[jchar]: https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html 
[unicode16]: https://www.unicode.org/versions/Unicode16.0.0/

Technically, the input domain consists of a 4-tuple made up of
*(arrays-of-chars, ints, ints, chars)*. (We could, if needed, make
the sets here a little more mathematically precise, but it's not
needed for our purposes.)

***c\. Characteristics and partitions:***

Some characteristics we could use for our `int`s are:

i.  Are they less than, greater than, or equal to zero?
#.  Do one (or both) of them represent positions at the start of the array
    (i.e. are they zero)?
#.  Do one (or both) of them represent positions at the end of the array
   (i.e. are they `array.length - 1`)?
#.  Is the first parameter greater than, equal to, or less than the
    second?\
    (this gives us 3 partitions)

Some comments on these:

Characteristic (i) is acceptable, but not a particularly
useful characteristic in this case. Ask yourself: is it especially
likely that the sorting routine would treat positive and negative
values differently? If not, then what is the point of dividing
an `int` up in this way? Recall that the purpose of partitioning is to
divide a domain up into equivalence classes -- values where any one
value is likely to be as good as any other. For a sorting routine,
that's *already* true of an `int` -- there is little value to be got
from splitting it up further (though you might do so for completeness,
once other, more useful characteristics have been applied).

In fact, this characteristic is something a machine might come up with
(interface-based), as opposed to a person thinking about the intended
behaviour of the method.

Characteristic (iii) is a characteristic of *two* parameters
combined (which is fine).

For characteristic (iv) - all of these partitions *are* sensible,
and are worth testing for. When the first parameter is greater than
the second, then the method documentation says an
`IllegalArgumentException` should be thrown -- so we should
test for that and make sure that it is.

(You might ask: why should we write a test just to make sure some
exception is thrown?
The answer is that this is part of the "contract" of the
method, and *is* important. In practice, software developers *do*
want to know what exceptions a method can throw, and do rely
on methods throwing what they say they will.)

Some characteristics we could use for our array are:

-   Is it of size zero, one, or is it larger than one? \
    (Note that if it is of zero, our int parameters will necessarily be
    outside it, and exceptions will be thrown.)

Note that a characteristic like "is the array in ascending sorted
order?" is *not* a useful characteristic here. The array *must* be
in ascending sorted order; that's a precondition of calling the
method, and if it's not true, the behaviour is undefined, so what
"expected behaviour" could we possibly test for?

Some characteristics we could use for our char are:

-   Is it equal to 0?
-   Is it equal to 255?

(These are boundary values for the `char` type.)

&nbsp;

</div>
`\end{solbox}`{=latex}



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



`\begin{solbox}`{=latex}
<div class="solutions">

**Sample solutions**:

\def\Z{\mathbb{Z}}

a\. We would model the  `push` Java method as a
mathematical function that maps from "the old state" and an integer,
to a new state:

$$
push : ([\Z], \Z) \rightarrow [\Z]
$$

(We use $[\Z]$ here to indicate an array of integers.)

If we wanted our mathematical notation to be a little more informative
to a reader, we could say:

- Let $StateOfStack = [\Z]$
- Let `push` be a function with signature: $push : (StateOfStack, \Z) \rightarrow StateOfStack$

Basically, the function is treating the method as if it were something more
like a `static` Java method with the signature
`static [int] push( int oldState[], int i)`, which takes *in* a state,
and returns a new state.

For `pop`, we would model it as $pop : [\Z] \rightarrow (\Z, [\Z])$ -- a function
that takes in the state  of the stack, and returns a result and a new
state. That is, it's as if the method instead of
having signature
`public int pop ()` had instead
a signature something like
`static Pair<int, [int]> pop()`.

(See <https://docs.oracle.com/javase/9/docs/api/javafx/util/Pair.html>
for the `Pair` type.)

b\. Pop has effectively one parameter, the object state. 

Some possible characteristics:

- Does the array have zero elements in it, or one, or more?\
  (This partitions the domain into 3.)

Note that it doesn't make sense to have "nullness" as a characteristic.
If the array were null, the object would be in an invalid state,
and what "expected behaviour" could we possibly test for?

</div>
`\end{solbox}`{=latex}



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



<div class="solutions">

***a\. Number of tests***

The idea behind partitioning is that we've split the domain up into
what are called equivalence classes, where any one value from each
partition is "as good as any other" (so far as the behaviour of the
method is concerned).

If that really is the case, then once we have three tests for
`myMethod`, writing more tests adds nothing of value. In fact, excessive
tests could make things worse: more tests means regression tests become
slower to run, and we have more code to maintain. Every test you write
should "carry its weight" -- it should serve some useful purpose, and
add more value than it costs to maintain.

So -- if these really are equivalence classes, then writing more tests
adds nothing of value. But in fact, we know that
programmers tend to make
mistakes around boundaries, so it's not *quite* true that every value
from each partition is "as good as" any other.

We could add in tests that use -1 and 1 as test values (or maybe even
the maximum and minimum values of an `int`), and still have tests that
"carry their weight".

***b\. Costs of fixing defects***

The main reason is that the component which contains the fault
becomes a more and more integral part of the system, and affects more
components -- the fault has become "built in" to the documentation,
larger components, other tests, etc.

This means that *fixing* the fault is (a) likely to take more effort,
because we have to consider all the other components/documentation/tests
that it affects, and (b) can have unexpected consequences -- our
components may interact in complex ways.

</div>






<!-- vim: syntax=markdown tw=92 :
-->
