
// look down bottom for `startDate`

module.exports = function(configData) {

  let schedule = {}

  schedule.weeks = [
    {weekNum: 1,
    lectureTopic:
        "Unit info, testing and QA concepts",
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
      "Introduction to testing",
    workshopTopic:
      `Introduction to testing

      *No Monday lab (Labour Day holiday) -- attend another lab or self-directed study*`
      ,
    reading:
      `- Pressman, ch 14 ("Component-level design"), ch 22 ("Software Testing Strategies"), ch 28 ("Formal modeling and verification")
      - Horstmann, *Object-Oriented Design and Patterns* (2nd edn), ch 3 "Guidelines for Class Design" (extract available [here](http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11308340080002101))
      - Barnes and Kölling, *Objects First With Java: A Practical Introduction Using BlueJ* (5th edn), ch 7 "Well-behaved objects" (extract available [here](http://www.unitreadings.library.uwa.edu.au/leganto/public/61UWA_INST/lists/11016332940002101?auth=SAML&section=11308340080002101))`,
    assessmentDetails: ' ',
    },


    {weekNum: 3,
    lectureTopic:
        "Test automation",
    workshopTopic:
        "Test case selection",
    reading:
      `- Amman & Offutt, ch 3
      - Pressman, ch 23 ("Testing conventional applications")`,
    assessmentDetails: "[Week 3 quiz](https://cits5501.github.io/assessment/#week-3-quiz) (deadline Sun 11:59pm)"
    },


    {weekNum: 4,
    lectureTopic:
      `Input space partitioning\\
      Graph testing`,
    workshopTopic: 'Test automation',
    reading:
      `- Amman & Offutt, chs 6-7
      - Pressman, ch 23 ("Testing conventional applications")`,
    assessmentDetails: ' ',
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
      `Logic testing\\
      Mutation testing\\
      Property-based testing`,
    workshopTopic:
      "Graph-based testing",
    reading:
      `- Amman & Offutt, chs 8--9
      - [Beginner's Guide to Fuzzing](https://fuzzing-project.org/tutorials.html)
      - [Hypothesis Quick Start Guide](https://hypothesis.readthedocs.io/en/latest/quickstart.html)
      - [QuickTheories README](https://github.com/quicktheories/QuickTheories)`,
      // <!-- wld be nice:
      //   Jorgensen, *Software Testing: A Craftsman's Approach*, 4th edn, ch 21
      // -->
    assessmentDetails: ' ',
    },

    {weekNum: 6,
    lectureTopic:
      "Quality assurance, software reviews, performance testing",
    workshopTopic:
      `Property-based testing and mutation testing

      *No Friday lab (Good Friday holiday) -- catchup in week 7 lab*`
      ,
    reading:
      `- Pressman, ch 20 ("Review techniques"), ch 22 ("Software testing strategies")`,
    assessmentDetails: 'Test design exercise, due Sun 11:59 pm',
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
          'Systems and standards, risk management',
      workshopTopic:
        'Software reviews',
      reading:
        `- Amman & Offutt, chs 10-12
        - Pressman ch 19 ("Quality concepts"), ch 21 ("Software quality assurance")`,
      assessmentDetails: '',
    },


    {weekNum: 8,
      lectureTopic:
        `Risk management\\
        software metrics

        *Tue 25 Apr: ANZAC day public holiday -- recorded lecture*`,
      workshopTopic:
        `Systems and standards`,
      reading:
        `- Pressman, ch 30 ("product metrics"), ch 32 ("process and project metrics"), ch 35 ("Risk management")`,
      assessmentDetails: ' ',
    },

    {weekNum: 9,
      lectureTopic:
          'Formal methods & program verification',
      workshopTopic:
        'Risk management and QA strategies',
      reading:
        '- Pressman, ch 28 ("Formal modeling and verification")',
      assessmentDetails: 'TBA',
    },

    {weekNum: 10,
      lectureTopic:
          'Formal specifications',
      workshopTopic:
          'Simple specifications',
      reading:
        `- [Dafny language tutorial](https://dafny.org/dafny/OnlineTutorial/guide.html)`,
      assessmentDetails: ' ',
    },

    {weekNum: 11,
      lectureTopic:
          'Specifications in Alloy',
      workshopTopic:
          'Specifications in Alloy',
      reading:
        `- [Alloy Analyzer tutorial](http://alloytools.org/tutorials/online/)`,
      assessmentDetails: '',
    },

    {weekNum: 12,
      lectureTopic:
          "revision",
      workshopTopic:
          "no workshop",
      reading: ' ',
      assessmentDetails: "Project due",
    },

  ]

  // add dates for start of week
  const startDate = new Date(2023,01,27) // Mond 27 Feb, 2023
  let dt = new Date(startDate);
  for (let i=0; i < schedule.weeks.length; i+=1) {
    schedule.weeks[i].date = new Date(dt);
    dt.setDate( dt.getDate() + 7 );
  }
  return schedule;

}
