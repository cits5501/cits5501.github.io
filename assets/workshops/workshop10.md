---
title: |
  `\LARGE\textmd{`{=latex}
  CITS5501 Software Testing and Quality Assurance `\\`{=latex}
  Semester 1, 2022 `\\`{=latex}
   Workshop 10 (week 11) -- Formal methods 
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

It is strongly suggested you complete the recommended readings for weeks 1--10
*before* attempting this lab/workshop.

## Acessing the Alloy Analyser

The Alloy Analyzer is a tool used for
checking Alloy models.

You can download the analyzer to run on your own
computer (or a lab computer) -- it should run on (at least)
Windows, MacOS X and Linux, as long as you have a [Java runtime][java]
installed.

[java]: https://www.java.com/en/download/

### Running on your own laptop/PC

You can download the analyzer from the web page here:

- <https://github.com/AlloyTools/org.alloytools.alloy/releases/tag/v6.0.0>

Use the `alloy.dmg` file if you are on a Mac, and the
`org.alloytools.alloy.dist.jar` file if you are on Windows or Linux.

On many systems, to run the analyzer, you simply need to
double-click on the `.jar` file. If this doesn't work, then
it can be run from the command line:

```
$ java -jar org.alloytools.alloy.dist.jar
```

The running analyser should look something like this:

`\begin{center}`{=latex}

![](images/alloy-screenshot.png){ width=100% }

`\end{center}`{=latex}



If the *fonts* displayed look odd -- from the "Options" / "Font" menu,
select "Courier" or "Courier New", and a reasonable font size (12pt or
14pt), then restart the analyser.

### Accessing via Gitpod

I have also set up a [GitHub repository][alloy-analyser-gitpod] which lets you use
the Alloy analyser from within an online IDE using [Gitpod][gitpod] -- \
visit 
<https://github.com/arranstewart-dev/alloy-analyser-gitpod/>
and follow the instructions there.

[alloy-analyser-gitpod]: https://github.com/arranstewart-dev/alloy-analyser-gitpod 

A limitation of Gitpod is that you can't copy and paste between the *Alloy analyser* window
and the clipboard of the computer you're using. However, you *can* copy and paste to the
tab in which Microsoft VS Code is open. So if you want to paste code into an Alloy `.als`
file, the way to do it:

- Create the `.als` file using VS Code, using "File" / "New file" from the menus.
- *Also* open the `.als` file in the Alloy Analyser. \
  (Note that your files will be available under `/workspace/alloy-analyser-gitpod`.)
- Edit and/or pase into the VS Code tab
- In the Alloy Analyser tab, after you've made a change, select "File" / "Reload all"
  to load the current version of the code.
 

## Further information

Note that an "Alloy syntax cheat sheet" is available at
<https://esb-dev.github.io/mat/alloy-cheatsheet.pdf>, but
we will be covering only a small fraction of the Alloy syntax.

For your reference, a tutorial for using the Alloy Analyzer is available here:

- <https://alloytools.org/tutorials/online/index.html>

An online book that shows in more detail how to create and analyse software
specifications with Alloy is available here:

- <https://haslab.github.io/formal-software-design/>

## A. Sigs and properties

We will start with Alloy by investigating how to model entities ("sigs", in Alloy)
and their properties.

How would you translate the following into Alloy syntax? All of these can be done by declaring *sigs* and *properties*.

a.  There exist such things as chessboards.
#.  There is one, and only one, tortoise in the world.
#.  There exists at least one policeman.
#.  Files have exactly one parent directory.
#.  Directories have at most one parent directory.
#.  Configuration files have at least one section.




## B. Viewing "possible universes"

Alloy has two *commands*, "`run`" and "`check`". We'll consider "`run`" first.
We can ask Alloy to generate sample "universes" which meet the
constraints set out by our model, by using the "`run`" command.

Let's suppose we want to model a situation in which "Houses have doors,
and houses can have more than one door".

Try entering the following into a fresh `.als` file:

```java
sig Door {}
sig House { doors: set Door }

pred example() {
}

run example for exactly 2 House, 2 Door
```

Save the file, and under the "Execute" menu, you should now see a menu itme
"Run example for exactly 2 House, 2 Door" -- select that menu item. (Or,
press the "Execute" button.)

In the right-hand alloy pane, you should see the message "Instance found", and
a clickable link -- click the instance, and you should see one "possible universe"
that the Alloy analyser has created for us.

Some points to note:

- The `run` command takes one mandatory argument, a predicate. The predicate acts
  as a sort of "filter", limiting the possible "universes" Alloy will show us.
  An empty predicate, like `example`, means "no limits".
- The "`for exactly 2 House, 2 Door`" part specifies a *scope*, and is optional.
  Try deleting it and execute the `run` command again. By default, the analyser
  assumes there may up to three of each top-level signature, and any number
  of relations. You can read more about scopes in the [alloy documentation][alloy-scopes].
- We can have more than one `run` command in a file: by default, the analyser
  will execute the first one it encounters.

[alloy-scopes]: https://alloy.readthedocs.io/en/latest/language/commands.html#scopes 

Reinstate the scope we originally had and re-execute the `run` command,
and click on the link to show the visualisation. 
You should see one "possible universe"
that the Alloy analyser has created for us:

`\begin{center}`{=latex}

![](images/house-door-underconstrained.png)


`\end{center}`{=latex}

Assuming we think that doors should only ever belong to a single house, then the universe
we're being shown here is *underconstrained* -- our specification is too loose,
and allows in "silly" possibilities we don't actually want.

There are multiple ways we could fix this.

#### Option 1:

We could decide that doors aren't really important enough to be an entity,
and model the number of doors a house has as just an `Int` (capital "I"):

```java
sig House { numDoors: one Int }

pred example() {}

run example for exactly 2 House
```

#### Option 2:

We could add in additional *facts* to constrain our "universes".
The easiest way to do this is to do the following:

- Give each `Door` a property `house: one House`
- Constrain the model so that for all houses and doors: if $d$ is
  the door of some house $h$, then $d.house = h$. (In other words --
  the property "house" is like the inverse, or opposite direction,
  of "door".)

We end up with

```java
sig Door  { house: one House }
sig House { doors: set Door }

fact HouseDoorInverse {
  all h: House, d: Door | d in h.doors implies d.house = h
}

pred example() {
}

run example for exactly 2 House, 2 Door
```

Try running this again. You should end up with the following visualisation:

`\begin{center}`{=latex}

![](images/house-door-underconstrained2.png)


`\end{center}`{=latex}

If we think every house should have at least one door, then
our model is still underconstrained, because the analyser is showing
us houses with no doors; we should have use "some"
instead of "set" when writing `sig House { doors: set Door }`.
Try changing "set" to "some", and run again.

Experiment with different scopes for the "run" command.


## C. Alloy facts

Recall that in Alloy, *facts* are additional constraints about the world,
that aren't expressed in the sigs, and can be used to "tighten"
the meaning of your model. (Some constraints could be expressed either in
the sig, or as a fact.) For instance, using the example `File` and `Dir`
and `FSObject` sigs from the lecture:

```
fact {
  File + Dir = FSObject
}
```

means, "the set of files, plus the set of directories, is the same
as the set of all file-system objects".

Or, if we give our fact a name:

```
fact noOtherFSObjects {
  File + Dir = FSObject
}
```

Take a look at the Alloy quick reference, which gives other operators
you can use besides "`+`" and "`=`". For instance, "`-`" (set
subtraction), "`#`" (set cardinality, or "size"), "`&`" (set
intersection),  "`in`" (set membership), typical comparison
operators ("`<`", "`>`", "`=<`", "`=>`"), and typical logical operators
("`&&`", "`||`", "`!`"), and see if you can give Alloy facts which express the
following.

a.  Assume we have a sig `LectureTheatre{}` and a sig `Venue{}`.

    Give a fact which constrains every lecture theatre to also be
    a venue. (Note that we could do this using "extends" in the sig, also.
    But sometimes it's more convenient to express things using facts,
    or the constraint we want is too complicated for just "extends".)
#.  Assume we have the sigs `DomesticatedAnimal{}`, `Canine{}`, `Dog{}`.
    Write a fact constraining `Dog` to be the intersection of
    `DomesticatedAnimal` and `Canine`.





## D. Facts with quantifiers

The facts in the previous section constrain sets
(e.g. the set of lecture theatres, or the set of omnivores).

We can also write constraints that apply to every entity *in*
some set.

For example, suppose we have the following sigs:

```
  sig Activity {}
  sig Person { hobbies: set Activity }
  sig ComputerScientist extends Person {}
```

We can apply the following constraint: "Computer scientists have no
hobbies:"

```
  fact {
    all cs : ComputerScientist | #cs.hobbies = 0
  }
```

In other words: people can have zero or more hobbies; but for
all people who are computer scientists, if we look at their hobbies,
the cardinality will be 0.

\newpage

It's also possible to write this using "no" (another sort of
"multiplicty", like `lone` or `set`):

```
  fact {
    all cs : ComputerScientist | no cs.hobbies
  }
```

Challenge exercise: try extending this model to say:

a.  Economists are also people.
#.  Economists have at most one hobby.
#.  Students are people.
#.  Students have at least one hobby.
#.  Bots are not people.



<!-- vim: syntax=markdown
-->
