---
subtitle: |
  ```{=latex}
  \LARGE\textmd{
  Week 3 workshop -- ISP  }
  ```
---

`~\vspace{-5em}`{=latex}

## 1. Binary search

Consider the Javadoc documentation and signature for
the following Java method, which searches inside
an array of `char`s for a particular value.

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

```{=latex}
\end{small}
```
Discuss how you would go about creating tests using Input Space
Partitioning. 

a.  What steps are involved?
b.  What is the input domain?
c.  what characteristics and partitions would you use?



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






## 3. Requirements

Consider the following, each of which is
supposed to be a system requirement. Discuss with a partner --
do you think it would be
straightforward to write tests for them?
If not, why not?

a.  The flight booking system should be easy for travel agents to use.
#.  The `int String.indexOf(char ch)` method should return a -1 if `ch`
    does not appear in the receiver string, or the index at which it
    appears, if it does.
#.  Internet-aware Toast-O-Matic toasters should have a mean time
    between failure of 6 months.












<!-- vim: syntax=markdown tw=72 :
-->
