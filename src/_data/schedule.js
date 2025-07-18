
// returns an object schedule with the following properties:
//  - 'weeks', an array of topics (each with keys `weekNum`, `lectureTopic`,
//    `workshopTopic` and `reading`), and more importantly
//  - makeWeeksFromStartDate() -- given a `Date` object, it will
//    return the weeks array with a `.date` field added to each,
//    which is the Monday of that week.

// Citations are roughly MLA-ish.

module.exports = function(configData) {

  let schedule = {}

  schedule.weeks = [
    {weekNum: 1,
    lectureTopic:
        `
Introduction
        `,
    workshopTopic: "*No labs this week*",
    reading:
      `- Amman & Offutt, ch 1
      - Pressman, ch 8 ("Understanding Requirements"), ch 19 ("Quality concepts")
      - Bruegge and Dutoit, *Object-Oriented Software Engineering Using UML, Patterns, and Java* (3rd edn), ch 11 "Testing" (extract available [here](http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11308340080002101))`,
    assessmentDetails: ""
    },

    {weekNum: 2,
//    lectureTopic: |
//      [Introduction to testing](/Lectures/lect02.pdf)\
//      [Testing in Python](http://docs.python-guide.org/en/latest/writing/tests/)
//    workshopTopic: |
//      [Testing in Python](/Workshops/workshop01.pdf)
    lectureTopic:
      "Software quality plans",
    workshopTopic:
      `Introduction to testing
      `
      ,
    reading:
      `TBA`,
    assessmentDetails: ' ',
    },


    {weekNum: 3,
    lectureTopic:
        "Testing 1",
    workshopTopic:
        "Test case selection",
    reading:
      `- Amman & Offutt, ch 3
      - Pressman, ch 23 ("Testing conventional applications")`,
    assessmentDetails: ' ',
    },


    {weekNum: 4,
    lectureTopic:
      `
Testing 2 (ISP, graph testing)
      `,
    workshopTopic: 'Test automation',
    reading:
      `- Amman & Offutt, chs 6-7
      - Pressman, ch 23 ("Testing conventional applications")`,
    assessmentDetails: "Online quiz 1"
    },

    {weekNum: 5,
//    lectureTopic: |
//      [Mutation testing](../Lectures/lect05--mutation.pdf)\
//      [old slides](http://teaching.csse.uwa.edu.au/units/CITS5501/Lectures/Mutants.pdf)\
//      [MutPy mutation testing library](https://pypi.python.org/pypi/MutPy/0.4.0)
//    workshopTopic: |
//      [Mutation testing](../Workshops/workshop04.pdf)
//      <span class="unavailable"><a href="http://teaching.csse.uwa.edu.au/units/CITS5501/Workshops/Chow-TSE87.pdf">Chow’s Conformance Test</a>\
//      <a href="http://teaching.csse.uwa.edu.au/units/CITS5501/Workshops/workshop4Notes.pdf">Notes</a></span>
    lectureTopic:
      `
Testing 3 (logic testing)
      `,
    workshopTopic:
      "Graph-based testing",
    reading:
      `- Amman & Offutt, chs 8--9
      `,
      //<!--

      //- TODO http://marvin.cs.uidaho.edu/Handouts/grammar.pdf
      //-->
      //- [Beginner's Guide to Fuzzing](https://fuzzing-project.org/tutorials.html)
      //- [Hypothesis Quick Start Guide](https://hypothesis.readthedocs.io/en/latest/quickstart.html)
      //- [QuickTheories README](https://github.com/quicktheories/QuickTheories)`,
      // <!-- wld be nice:
      //   Jorgensen, *Software Testing: A Craftsman's Approach*, 4th edn, ch 21
      // -->
    assessmentDetails: 'Project phase 1 published',
    },

    {weekNum: 6,
    lectureTopic:
      "Testing 4",
    workshopTopic:
      `Property-based testing and mutation testing
      `
      ,
    reading:
      `- Pressman, ch 20 ("Review techniques"), ch 22 ("Software testing strategies")`,
    assessmentDetails: 'Project phase 1 due',
    },

    {weekNum: null,
    lectureTopic:
      `<span style="color: #696969;">***no class -- non-teaching week***</span>`,
    workshopTopic: "",
    reading: "",
    assessmentDetails: '',
    },


    {weekNum: 7,
      lectureTopic:
          'Testing 5 (syntax testing)',
      workshopTopic:
        'Software reviews',
      reading:
        `- Amman & Offutt, chs 10-12
        - Pressman ch 19 ("Quality concepts"), ch 21 ("Software quality assurance")`,
      assessmentDetails: 'Online quiz 2',
    },


    {weekNum: 8,
      lectureTopic:
        `Reviews, integration`,
      workshopTopic:
        `Systems and standards`,
      reading:
        `TBA`,
      assessmentDetails: ' ',
    },

    {weekNum: 9,
      lectureTopic:
          'Risk management',
      workshopTopic:
        'Risk management and QA strategies',
      reading:
        'TBA',
      assessmentDetails: 'TBA',
    },

    {weekNum: 10,
      lectureTopic:
          'Standards',
      workshopTopic:
          'Simple specifications',
      reading:
        `TBA`,
      assessmentDetails: ' ',
    },

    {weekNum: 11,
      lectureTopic:
          'Formal methods',
      workshopTopic:
          'Specifications in Alloy',
      reading:
        `TBA`,
      assessmentDetails: 'Project phase 2 due',
    },

    {weekNum: 12,
      lectureTopic:
          "Revision",
      workshopTopic:
          "no workshop",
      reading: ' ',
      assessmentDetails: "Project peer evaluations",
    },

  ]

  // add dates for start of week
  //const startDate = new Date(2023,01,27) // Mond 27 Feb, 2023
  //let dt = new Date(startDate);
  //for (let i=0; i < schedule.weeks.length; i+=1) {
  //  schedule.weeks[i].date = new Date(dt);
  //  dt.setDate( dt.getDate() + 7 );
  //}
  return schedule;

}
