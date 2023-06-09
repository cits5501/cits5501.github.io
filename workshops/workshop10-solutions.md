---
title: |
  `\LARGE\textmd{`{=latex}
  CITS5501 Software Testing and Quality Assurance `\\`{=latex}
  Semester 1, 2022 `\\`{=latex}
   Workshop 10 (week 11) -- Formal methods  -- solutions 
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

You can access a [GitHub repository][alloy-analyser-gitpod] which lets you use
the Alloy analyser from within an online IDE using [Gitpod][gitpod] by 
visiting <https://github.com/arranstewart-dev/alloy-analyser-gitpod/>
and following the instructions there.

[gitpod]: https://gitpod.io

[alloy-analyser-gitpod]: https://github.com/arranstewart-dev/alloy-analyser-gitpod 

A limitation of Gitpod is that you can't copy and paste between the *Alloy analyser* window
and the clipboard of the computer you're using. However, you *can* copy and paste to the
tab in which Microsoft VS Code is open. So if you want to paste code into an Alloy `.als`
file, one way to do it is:

- Create the `.als` file using VS Code, using "File" / "New file" from the menus.
- *Also* open the `.als` file in the Alloy Analyser. \
  (Note that your VS Code files will be available under `/workspace/alloy-analyser-gitpod`.)
- Edit and/or paste content into the VS Code tab
- In the Alloy Analyser tab, after you've made a change, select "File" / "Reload all"
  to load the current version of the code.

Downloading and running the `.jar` file for Alloy avoids this limitation. 

## More information on Alloy

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




`~\vspace{1ex}`{=latex}
\solbox
<div class="solutions">

**Sample solutions**

a.  There exist such things as chessboards:

    ```
    sig Chessboard { }
    ```

#.  There is one, and only one, tortoise in the world:

    ```
    one sig Tortoise { }

    // Note that any time we want to constrain the number of
    // members of a sig, we can do it in the shorthand way
    // above; but it can also be constrained using a *fact*
    // (syntax below).
    // But putting it in the sig is usually easiest
    // to read.

    sig Tortoise {}

    fact oneTortoise {
      #Tortoise = 1
    }
    // The hash symbol operator means "cardinality" (or "size").
    // `#Tortoise = 1` means "The relation Tortoise has exactly
    // one row".
    ```


#.  There exists at least one policeman:

    ```
    some sig Policeman { }
    ```

#.  Files have exactly one parent directory.

    Note that we *only model what we are asked to model*;
    we don't add in any sigs or properties, besides the
    ones needed.

    The question doesn't say (for instance) that
    files and directories are both types of "file system
    object" -- so we shouldn't model it.

    ```
    sig Directory { }

    // note that we could leave the 'one' off if
    // we wanted -- it is the default multiplicity --
    // but it's often clearest to leave it in.
    sig File {  parent : one Directory }
    ```



#.  Directories have at most one parent directory.

    ```
    sig Directory { parent : lone Directory }
    ```

    There is no problem with having "recursive" sigs
    that "refer to themselves". Recall that a property
    is really just expressing a *relation* between
    entitities. The above code just says that
    there are such things as directories, and
    that any directory can be in a relationship with
    zero or one other directories.

    (Extra exercise: does the sig allow a directory
    to be its own parent? You should be able
    to work this out from the lecture slides and
    the tutorial -- or by using the Alloy Analyzer.)



#.  Configuration files have at least one section.

    ```
    sig ConfigFile { sections: some Section }

    sig Section {}
    ```

</div>
\endsolbox


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

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin: 1em 0em;">

`Int` is a special predefined sig in Alloy representing integers.

Alloy comes with other predefined sigs as will, but to use them
you will have to import them from the module where they
are defined using an "`open`" statement. If you write large Alloy
models, then you can also use modules to break up your model
into smaller, more comprehensible parts.

You can read more about Alloy modules [here][alloy-modules]
and see a list of modules the Alloy analyser ships with
[here][alloy-utils]. You should be able to open any of these "utility"
modules to see their contents.

[alloy-modules]: http://alloytools.org/quickguide/path.html
[alloy-utils]: http://alloytools.org/quickguide/util.html

</div>

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

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin: 1em 0em;">

For all the remaining problems in this worksheet, you should
check your work by:

- creating an appropriate model in Alloy
- using "`run`" commands to view the results.

If the results aren't what you expect, you need to adjust your model
and try again.

</div>


## C. Alloy facts

Recall that in Alloy, *facts* are additional constraints about the world,
that aren't expressed in the sigs, and can be used to "tighten"
the meaning of your model. (Some constraints can be expressed either in
the sig, or as a fact -- in that case, you should choose whatever
seems clearer.) For instance, using the example `File` and `Dir`
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




`~\vspace{1ex}`{=latex}
\solbox
<div class="solutions">

**Sample solutions:**

a\. Every lecture theatre is a venue

```
sig Venue {}
sig Lecture {}

// All lecture theaters are venues
fact { LectureTheatre in Venue }

// However note that you will get a warning in Alloy if you
// try this: by default, each sig is a distinct type.

// the following will run without warnings:
//
// sig Venue {} 
// sig Lecture in Venue {} 
```



b\. `Dog` is the intersection of `DomesticatedAnimal` and `Canine`.


```
sig DomesticatedAnimal { }
sig Canine { }
sig Dog {}

fact { Dog = DomesticatedAnimal & Canine }

// As before -- the above will give warnings.
//
// Code that runs without warnings:
//
// sig Animal {}
// sig DomesticatedAnimal in Animal {}
// sig Canine in Animal {}
// sig Dog in Canine {}
//
// fact { Dog = DomesticatedAnimal & Canine }
```


</div>
\endsolbox



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

The hash symbol operator ("`#`") gives us the *cardinality* or size
of a set. `cs` is a bit like a "loop variable" in a Java "`for ... each`"
loop: it gives us a way of refering to individuals in the set we're considering
(in this case, computer scientists). 
The pipe symbol can be read as "such that" or "it is the case that".

So with the addition of this fact, our model can be translated into English as:

- People can have zero or more hobbies; computer scientists
  are a sort of person.
- For all computer scientists -- let us use the name `cs`
  to refer to some arbitrary computer scientist. 
  If we look at their hobbies of `cs`,
  it is the case that their number of hobbies will always be 0.

  Or, more succinctly: all computer scientists have zero hobbies.

\newpage

It's also possible to write this using "no" (another sort of
"multiplicity", like `lone` or `set`):

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

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin: 1em 0em;">

If you have worked with formal or mathematical logic at all: "all" in
Alloy is the same as the "for all" quantifier in [predicate
logic][pred-logic].

[pred-logic]: https://en.wikipedia.org/wiki/First-order_logic

</div>




`~\vspace{1ex}`{=latex}
\solbox
<div class="solutions">

**Sample solutions:**

a.  Economists are also people:

    ```
    // if we assume Economist never overlaps with ComputerScientist
    sig Economist extends Person {}
    ```
#.  Economists have at most one hobby.

    ```
    fact {
      all econ : Economist | lone econ.hobbies
    }
    ```
#.  Students are people.

    ```
    sig Student extends Person {}
    // Alternative to this: plausibly, we might instead model
    // students as a subset of Person, so you can
    // be a student economist.
    ```
#.  Students have at least one hobby.

    ```
    fact {
      all s : Student | some s.hobbies
    }
    ```
#.  Bots are not people.

    ```
    // We can just declare bots as a separate sig --
    // by default, they won't overlap with Person
    sig Bot {}
    ```

</div>
\endsolbox


<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin: 1em 0em;">

<div style="text-align: center;"><b>Challenge exercise -- the Farmer River Crossing puzzle</b></div>

As a challenge exercise, you might like to try solving the "Farmer River
Crossing" puzzle using Alloy:

> A farmer is on one shore of a river and has with him a fox, a chicken,
> and a sack of grain. He has a boat that fits one object besides himself.
> If the farmer is present, nothing gets eaten; but if left without
> the farmer, the fox will eat the chicken, and the chicken will eat the
> grain. How can the farmer get all three possessions across the river
> safely?

Before attempting to solve it, you may wish to work through the online
[Alloy tutorial][tutorial], which covers some features of Alloy we
haven't looked at yet. The tutorial presents the problem (and a possible
solution) in [chapter
2](http://alloytools.org/tutorials/online/frame-RC-1.html).

[tutorial]: http://alloytools.org/tutorials/online/

</div>


<!-- vim: syntax=markdown
-->
