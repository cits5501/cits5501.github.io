---
title: |
  CITS5501 lab 3 (week 4)&nbsp;--&nbsp;ISP
---


`~\vspace{-5em}`{=latex}

## 0. Recommended reading

Before attempting the exercises in this worksheet, it's recommended you complete the recommended
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
c.  What are some characteristics you could use? (You may wish to drop in on a timetabled
    lab session and compare with another student to see what characteristics they have
    come up with.
    Remember to make sure each characteristic does in fact give you
    a partitioning.)

Once you've answered these questions, you might like to try implementing some of your
tests in Java using JUnit.



## 2. Stack class

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



## 3. Further questions

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
