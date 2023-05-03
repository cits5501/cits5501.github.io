---
title: CITS5501 lab 8 (week 9)&nbsp;--&nbsp;system testing 
---

`~\vspace{-5em}`{=latex}

## Reading

It is strongly suggested you complete the recommended readings for previous weeks
*before* attempting this lab/workshop.



## A. Sample web app

The Git repository at <https://github.com/cits5501/week-9-lab-system-testing>
contains a very simple sample web application.

You can use [GitPod](https://www.gitpod.io) to work with this code online. You will need a GitHub account; once you
have one set up, follow the link below:

&nbsp; <https://gitpod.io/new/#https://github.com/cits5501/week-9-lab-system-testing>

Alternatively, if you're familiar with using Git and Java from the command line, you
can download a copy of the source code using the command

```bash
git clone https://github.com/cits5501/week-9-lab-system-testing
```

This worksheet will assume you're using GitPod to access the repository.
GitPod provides you with access to the Visual Studio Code (VS Code) editor.
Once VS Code starts, it will take a few seconds to recognize the repository
as containing Java source code and to analyse it; once it does, the project
explorer should show expandable tabs entitled "JAVA PROJECTS" and "OUTLINE".

Spend some time looking at the source code for the web app.
The web app makes use of [Flak](https://github.com/pcdv/flak), a simple
web framework inspired by Python's [Flask](https://flask.palletsprojects.com/en/2.3.x/)
framework.

Some of the major components of the web app are:

[app-java]: https://github.com/pcdv/flak/blob/master/flak-api/src/main/java/flak/App.java


**The `app` instance variable.**

: The `App` interface is provided by Flak;
  you can see the source code for it [here][app-java]. It allows the web
  app to be started and stopped (using the `start()` and `stop()` methods),
  and also allows code within the web app to obtain information about
  the server it's running on (`getServer()`) and the web request currently
  being processed (`getRequest()`).

**Route handlers.**

:   The URLs a user can access within a website are referred to as
    *routes*, and when a user tries to access a particular URL,
    the Flak framework processes it using a particular *route handler*.

    Here is an example route handler for the `/login` route: 

    ```java
      @Route("/login")
      public String login() throws IOException {
        Path filePath = Path.of("resources/login.html");
        String contents = Files.readString(filePath);
        return contents;
      }
    ```

    The `@Route` annotation tells Flak what route this is the handler
    for. The code within the handler is responsible for returning
    the contents of the web page (here, as a `String`, though
    other formats are also possible).

    Different routes handle the case where a web page is being
    *viewed* (as in the case above), versus when data is being
    sent by the browser to the server. For an example of the latter,
    see the code that starts:

    ```java
      /**
       * process a "/login" form submission
       */
      @Post
      @Route("/login")
      public void login(Response r, Form form, SessionManager sessionManager) {
        // ...
    ```

    The `@Post` annotation here says that Flak should only invoke this handler
    when data (in this case, the contents of a login form) is being sent *to* the
    web server by a browser using what's called a "POST request".

**`main()` method**

:   The `VeryBasicWebApp` class has a `main()` method which can be used to start
    the server running, listening for requests on a particular port.

In VS Code, you should be able to start the web app running by right-clicking
on the "VeryBasicWebApp.java" file in the VS Code explorer, and selecting
"Run Java".

<div style="border: solid 2pt blue; background-color: hsla(241, 100%,50%, 0.1); padding: 1em; border-radius: 5pt; margin-top: 1em;">

<div style="text-align: center;"><b>Launching the app</b></div>

You can also launch the web app from the command line.

If the Java code for the web app has been compiled into `.class`
files contained in the directory "bin", then the following
will launch the app:

```bash
$ java -cp 'lib/*':.:bin VeryBasicWebApp
```

</div>

A notification will appear at the bottom right of the editor similar to the
following:

```{=html}
<div style="margin-left: auto; margin-right: auto; width: 80%;">
```

![](images/vs-code-service-available.png){ width=80% }

```{=html}
</div>
```

Click the "Open Browser" button, and a new browser tab should open,
displaying the content "To log in, visit the login page".

If you visit the "login" page, enter a username and password, and submit the
form, the following method is the one that handles the attempted login:

```{ .java .numberLines }
  /**
   * process a "/login" form submission
   */
  @Post
  @Route("/login")
  public void login(Response r, Form form, SessionManager sessionManager) {
    // just for debugging
    System.err.println("form params were:" + form.parameters());
    
    String username = form.get("username");
    String password = form.get("password");

    if (username.equals("foo") && password.equals("bar")) {
      SessionManager sm = sessionManager;
      FlakUser user = sm.createUser(username);
      sm.openSession(app, user, r);
      r.redirect("/app");
    }
    else
      r.redirect("/login");
  }
```

Key aspects of this code are:

[web-session]: https://en.wikipedia.org/wiki/Session_(computer_science)

- Currently, the code recognizes only one username ("foo") and
  one password ("bar") -- lines 10--13.
- If the username and password are correct, the code requests the
  Flak framework to create a new [web session][web-session]
  (a way of identifying a particular logged in user -- lines 14--16),
  and then redirects the user to the `/app` page (line 17).

  The `/app` page here represents protected content which only
  logged-in users can access; take a look at the `appPage()` method
  which handles it, and you can see a `@LoginRequired` annotation,
  which tells Flak to restrict access to this page.
- If the username and password are not correct, the user
  is redirected back to the `/login` page again (line 20).

## B. Load testing

Suppose we want to perform load testing of our web app -- ensuring
that it can handle the expected load of web requests. How can we do this?

It's possible to access our web app from the command line, using Unix
utilities such as cURL. In VS Code, with the server still running,
open a new Bash terminal, by clicking on
the "+" sign at the lower right of the window, and selecting "Bash".

Within the terminal, type

```bash
  curl -w '%{time_connect}:%{time_starttransfer}:%{time_total}\n' http://localhost:8080/login
```

cURL will download the page you requested, display the page content, and display some statistics
about how much data was transferred (with colons as separators) -- the time taken
to set up a connection to the server (`time_connect`), the time at which
cURL starts transferring data from the server (`time_starttransfer`), and
the total time spent retrieving the page (`time_total`).

We could do very simple load testing by making many requests using cURL in a short period
of time against our web app, and measuring the time taken. (In reality: we would likely want
the web app to be running on a different computer from the one where we do tests, so that
the process of running tests doesn't interfere with the running of the web app.)

A load test would follow the same 'Arrange, Act, Assert' pattern we have seen for
other sorts of test:

**Arrange**

:   Start the web app running

**Act**

:   Make requests against the web app, and measure the time taken to
    complete them.

**Assert**

:   Assert that the time taken meets whatever criterion we have specified.

We could write our tests using JUnit if we wishes
(perhaps using the [java.lang.Process][process] API to launch cURL,
or perhaps making and timing web requests using Java libraries),
or we could write our tests in a scripting language such as Bash or Python.

[process]: https://docs.oracle.com/javase/8/docs/api/java/lang/Process.html

More typically, however, we would use dedicated load-testing software.
An example of this is [Apache JMeter][jmeter], which can be used to test the
perform of a wide range of systems -- not just web applications, but also
systems that act as (for instance) mail servers or authentication servers.
As an exercise in your own time, you might like to try using JMeter to record and run
load tests (see <https://jmeter.apache.org/usermanual/get-started.html>),
but we will not include that in this lab.

[jmeter]: https://jmeter.apache.org


## C. Testability

Currently, the `login()` method is very limited -- only one username
and password are considered valid, and they are hard-coded into
the app.

We would like to allow different forms of authentication to be selected
at run-time. Besides being more useful in the end product, this has
other advantages, such as modularity.
Each sort of authentication can be encapsulated as a
class and tested separately from the main web application.

To do this, we'll alter the web app code to use a separate interface,
"Authenticator".

- Add a new instance variable to `VeryBasicWebApp` --
  `Authenticator auth`.

- Alter the current constructor, `VeryBasicWebApp(int port)`.
  It should now also take an `Authenticator auth` parameter,
  and set the instance variable to that parameter.

- Remove the code in the `login()` method, around
  `if (username.equals("foo") && password.equals("bar"))`. Instead of using
  those hard-coded values, query the `auth` instance variable to
  find out if a username and password are valid.

- If you've done the previous steps correctly, your editor or
  IDE should now show an error in the `main()` method. The line

  ```
    VeryBasicWebApp hw = new VeryBasicWebApp(port);
  ```

  is no longer correct.

- Add the following code to `main()`, near the top of the method:

  ```java
      Authenticator auth = new Authenticator() {
        
        @Override
        public boolean isValid(String username, String password) {
          return false;
        }
      };
  ```

  and then pass the new `auth` variable to the `VeryBasicWebApp` constructor.

We've now made our web app more testable. Rather than being hard-coded,
an `Authenticator` is created in the `main()` method, as the web app is started.
Currently, our new `Authenticator` only ever returns `false` (indicating
that a username and password combination is invalid). Alter the code so that
one particular username and password are valid.

If we wanted, we could analyse the `String[] args` parameters passed
to `main()` (or make use of the Java [Properties][properties] API),
and "slot in" different authenticators depending on how our web
app was invoked from the command line.
This is known as [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) --
we have made our web app more independent from the authenticator.

[properties]: https://docs.oracle.com/javase/8/docs/api/java/util/Properties.html

As an exercise in your own time, you might like to try adding
other implementations of `Authenticator`, which (for example)
obtain lists of valid username+password pairs from a text file
or a database.

## D. Security testing

We have seen that some portions of the web app are
restricted to logged-in users. From what has been covered in
lectures and the text books, what are some sorts of security testing
we could use to ensure that these restrictions are effective?
Are there any other security practices we would need to bear
in mind besides testing?
 



<!-- vim: syntax=markdown
-->

