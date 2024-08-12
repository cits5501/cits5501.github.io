---
title: |
  CITS5501 lab 3 (week 4)&nbsp;--&nbsp;ISP&nbsp;--&nbsp;solutions
---


`~\vspace{-5em}`{=latex}

## 0. Recommended reading

Before attempting the exercises in this lab, it's recommended you complete the recommended
reading for week 4, and review the lecture slides on Input Space Partitioning.

## 1. Binary search

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
c.  What are some characteristics you could use? Check with a partner
    (or small group), and make sure each characteristic does give you
    a partitioning.



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
- the set of all possible `char`s (there are 256 of them)

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



## 2. Stack class

Suppose we have a Stack class that stores `int`s, with the following
method signatures:

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



## 3. Discussion questions

Discuss the following questions about ISP in pairs or a small group, and
come up with answers:

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

The main reason is that the compnent which contains the fault
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
