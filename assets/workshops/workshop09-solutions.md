---
title: |
  `\LARGE\textmd{`{=latex}
  CITS5501 Software Testing and Quality Assurance `\\`{=latex}
  Semester 1, 2022 `\\`{=latex}
   Workshop 9 (week 10) -- Formal methods  -- solutions 
  `}`{=latex}
include-before: |
  ```{=latex}
  \lstdefinestyle{vsmalllistingstyle}{
    breaklines=true,
    numbers=left,
    numberstyle=\tiny,
    frame=none,
    showstringspaces=true,
    columns=fullflexible,
    keepspaces=true,
    basicstyle={\ttfamily\small},
  }
  ```
---

`~\vspace{-5em}`{=latex}

## Reading

It is strongly suggested you complete the recommended readings for weeks 1-9
*before* attempting this lab/workshop.



## A. Applicability of formal methods

Discuss the following scenarios. Would you use formal methods for any of
the following systems? If so, which systems, and why? Do you think the
enterprise developing the system would share your view?

a.    The next version of *Confectionery Crush Story*, a web--
      and mobile-app--based puzzle video game your company
      develops. The game is available for both Android and
      iOS mobile devices, and the previous version
      grossed over $US 1 billion in revenue.
#.    *Exemplarex*, software produced for Windows and MacOS
      operating
      systems and licensed to educational institutions.
      The software semi-automatically invigilates exams set by the
      institutions: machine-learning techniques are used
      to analyse audio and video of exam candidates to identify
      possible academic misconduct.
#.    The online banking website provided by a major Australian
      bank, EastPac. Over 5 million customers use the
      website to perform banking transactions on
      personal or business bank accounts.
#.    A radiation therapy system
      used to treat cancer patients. The system has two principal
      components:

      - A radiation therapy machine that delivers controlled doses of
        radiation to tumour sites, controlled by an embedded software
        system.
      - A treatment database that includes details of the treatment
        given to each patient.
      
      <!-- q4: source: somerville, 9th end. -->




`~\vspace{1ex}`{=latex}
\solbox
<div class="solutions">

The aim of the exercise is just to get you to think
about what factors might make formal methods appropriate.

However, some possible answers are:

a.    Probably not, because speed-to-market is
      more important for the games industry
b.    Possibly; but if the market doesn't *demand*
      formal assurance that the software works as
      specified, it is probably not worth the effort of
      doing so. In any case, the end result of a machine-learning
      technique will be some sort of model used for prediction/classification,
      and formal methods probably can't prove that the classifier is "good".
c.    Possibly lightweight formal methods (e.g. advanced type systems)
      might be appropriate for use in securing web applications.
      In general, banks apply sufficient
      security techniques to bring losses through fraud etc to a tolerable
      level -- the cost of fully verifying systems is typically not worth the
      return.
d.    Yes, since this is critical software -- lives could be endangered 
      if it malfunctions -- the use of formal methods may well be
      appropriate. Any of the methods we have looked at (advanced type
      systems, formal verification, model-based methods) could be
      applied.\
      [Note that in practice, however, most medical software --
      even for critical applications -- is not, in fact,
      developed using formal methods.]

</div>
\endsolbox


## B. Introduction to Dafny

[Dafny][dafny-repo] is a "verification-aware" programming language. The
compiler for the language incorporates a program verifier -- as you write
a program, the verifier checks to see whether what you
have written can be proved correct, and flags any errors.

[dafny-repo]: https://github.com/dafny-lang/dafny


### Gitpod


You can also compile (as well as run) Dafny programs using
[Gitpod][gitpod], which provides you with an online
development environment based on [Microsoft VS Code][vs-code].

[vs-code]: https://code.visualstudio.com 
[gitpod]: https://www.gitpod.io/

Visit <https://gitpod.io/#https://github.com/arranstewart-dev/dafny-gitpod> in your browser.
Gitpod will download a Docker image containing the Dafny compiler, and create
an online IDE environment (this may take a couple of minutes).

\newpage

\begin{center}
\includegraphics[width=0.95\textwidth]{images/dafny-gitpod.png}
\end{center}

![](images/dafny-gitpod.png){ width=100% }

Once it appears, open the "sample.dfy" file in the editor, and an "editor extension"
will be installed which tells the editor how to highlight Dafny code and show errors.

(You can ignore any error messages saying the "dafny-lang.ide-cscode extension is not synced" --
those are a limitation of the VS Code setup, and can't easily be got rid of.)

Toward the bottom of the screen is also a "Terminal" tab, which gives you
command-line access to the virtual machine in which Microsoft VS Code is running.
Typing `dafny /help` in the terminal will display the compiler online help
(warning: it's very long).


```{=latex}
\genericbox

\begin{center}
\textbf{Dafny resources}
\end{center}
```

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">
<div style="text-align: center;"><b>Dafny resources</b></div>

In case you are interested, the paper introducing Dafny is available [here][dafny-paper].

Documentation for the language (including detailed tutorials
and reference material) is available at:

<https://dafny-lang.github.io/dafny/>

</div>

\endgenericbox


[dafny-paper]: https://www.microsoft.com/en-us/research/project/dafny-a-language-and-program-verifier-for-functional-correctness/

#### Dafny assertions

Take a look at the sample source file open in VS Code:


```c#
method Main() {
  print "hello, Dafny\n";
  assert 10 < 2;
}
```

You should see that the Dafny compiler reports an
*assertion violation*	in line 3; the assertion "$10 < 2$"
is not true.

Now comment out the assertion (using double forward-slashes -- "`//`" --
the same as Java.) The code should now compile.

#### Command line compiler

In the "Terminal" tab, you should be able to invoke the `dafny` command, which
lets you compile code to different targets (such as Java, C# and Go) and run the program.

```bash
$ dafny /version
```

should print the Dafny version and verify the command works.

```bash
$ dafny sample.dfy
```

will verify and compile the `sample.dfy` -- it
is actually short for the command:

```bash
$ dafny /compile:1 hello.dfy
```

Either command should produce output like the following:

```plain
Dafny program verifier finished with 0 verified, 0 errors
Compiled assembly into sample.dll
```

By default, Dafny compiles programs into libraries for use on Windows
(`.dll` files). If you list the directory contents, you will see `sample.dll`,
and a file `sample.runtimeconfig.json` which the compiler creates.

The following command verifies, compiles, *and* runs you program:

```bash
$ dafny /compile:3 sample.dfy
```

#### `Main` method

Change the name of the `Main` method to `Random` (or any other name you wish).

Try compiling, verifying and running the program again:


```bash
$ dafny /compile:3 sample.dfy
```

Although the program verifies and compiles properly, it will not execute and produce any output,
because the Dafny runtime looks for a `Main` method to execute. If it does not find one,
no warning or error is produced (you might have intended to create a library, rather than a program),
but nothing will be executed.


## C. Preconditions

Try compiling and running the following code:

```
method Main() {
  PrintInt(-1);
}

method PrintInt(x : int)
{
  print "the int is: \n";
  print x;
}
```

The int -1 should be printed with a message. Now
add a precondition to PrintInt, "`requires x >= 0`":

```
method Main() {
  PrintInt(-1);
}

method PrintInt(x : int)
  requires x >= 0
{
  print "the int is: \n";
  print x;
}
```

If you try compiling again, you will see that Dafny won't
permit you to call the `PrintInt` method, unless it can
verify all the preconditions hold. Change the `int` being
passed from -1 to 1, and you should see the code now compiles.

Create a new file `square.dfy` consisting of the following code.

```c#
method SquareMe(n:int)
{
  assert n*n > 0;
}
```

and try to verify the program using:

```bash
$ dafny square.dfy
```

It should generate the messages:

```plain
square.dfy(3,13): Error: assertion might not hold
Dafny program verifier finished with 0 verified, 1 error
```

Even though the assertion is true for *almost* all values of `n`, it fails for `n == 0`, and just one
failure is enough to make the assertion false. Dafny requires that assertions be true for *all*
possible inputs.

An assertion which *is* true, however, is the following -- try inserting it instead:

```c#
assert n!=0 ==> n*n>0
```

This reads "`n*n` is greater than 0, ***if*** `n` does not equal 0". This assertion
is true, so Dafny should allow the program to be verified and compiled.


\newpage

## D. Using Dafny features

The following Dafny code is intended to find
the position of the largest element of an array. It
is only guaranteed to produce a result if the array is *non-empty*,
however. We won't compile this (yet), but look
at the following code:


```
method FindMax(arr: array<int>) returns (r: int)
{
  var max_val : int := arr[0];
  var max_idx : int := 0;

  var i : int       := 1;

  while (i < arr.Length)
  {
    if arr[i] > max_val
      {
        max_idx := i;
        max_val := arr[i];
      }
    i := i + 1;  
  }
  return max_idx;
}
```

At what points in the code might we insert the following, and
what Dafny keywords would be used?

-   preconditions
-   postconditions
-   loop invariants
-   assertions

See if you can state what the preconditions and
postconditions are (in English is fine).





`~\vspace{1ex}`{=latex}
\solbox
<div class="solutions">


**Solution:**

Correct locations would be: 

```
method FindMax(arr: array<int>) returns (r: int)
   requires /* **preconditions go here** */
   ensures /* **postconditions go here** */
{

  var max_val : int := arr[0];
  var max_idx : int := 0;

  var i : int       := 1;

  /* **assertions could go anywhere in the body** */

  while (i < arr.Length)
    invariant /* **loop invariants go here** */
  {
    if arr[i] > max_val
      {
        max_idx := i;
        max_val := arr[i];
      }
    i := i + 1;  
  }
  return max_idx;
}
```

Preconditions (in English):

- The array is of length 1 or more.

Postcondition (in English):

- The return value `r` is greater than or equal
  to every element of the array. 

</div>
\endsolbox

\vspace{2ex}





**Challenge exercise**:  If you have some experience with
formal logic and would like a challenge, try verifying the above code
using the online Dafny verifier. You
will probably want to work through the online Dafny tutorial
first.
This will explain how to use the `forall` keyword,
which we have not covered, but which is needed for the
challenge.



`~\vspace{1ex}`{=latex}
\solbox
<div class="solutions">

**Sample solution:**

Fully verified code:

```
method FindMax(arr: array<int>) returns (r: int)
   requires arr.Length > 0
   ensures (0 <= r < arr.Length) && 
    (forall k :: 0 <= k < arr.Length ==> arr[r] >= arr[k])
{

  var max_val : int := arr[0];
  var max_idx : int := 0;

  var i : int       := 1;

  assert i >= 1;
  assert max_idx <= i;

  while (i < arr.Length)
    // probably could get away with fewer loop invariants
    invariant 1 <= i <= arr.Length
    invariant 0 <= max_idx  <= arr.Length
    invariant 0 <= max_idx  <= i
    invariant forall k :: 0 <= k <= i-1 ==> max_val >= arr[k]
    invariant (0 <= max_idx < arr.Length) 
        && (max_val == arr[max_idx]) 
        && (forall k :: 0 <= k <= i-1 ==> arr[max_idx] >= arr[k])
  {
    if arr[i] > max_val
      {
        max_idx := i;
        max_val := arr[i];
      }
    i := i + 1;  
  }
  return max_idx;
}
```

</div>
\endsolbox



## E. Writing Dafny methods

The following code does not yet compile:

```
method Max(a: int, b:int) returns (c: int)
  ensures c >= a
{
  return 0; 
}
```

Write the body of the method Max. It should take two integer parameters and
return their maximum. Add appropriate annotations (one is
already provided) and make sure your
code verifies. Refer to the documentation and tutorials,
if necessary.



\newpage

\solbox
<div class="solutions">

Solution:

```
method Max(a: int, b:int) returns (c: int)
  ensures c >= a
  ensures c >= b
{
  if (b > a) {
    return b;
  } else {
    return a;
  }    
}
```

</div>
\endsolbox


## F. Project submission sandbox

A Moodle submission sandbox is available for the CITS5501
[project][project] on the CSSE Moodle server. If you haven't yet attempted
any of the project questions, now would be a good opportunity to do so.


[project]: https://cits5501.github.io/assessment/#project 



<!-- vim: syntax=markdown
-->
