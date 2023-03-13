const moment  = require('moment');
const util    = require('util');

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// formate a [dateType, dateVal] pair
// where dateType is a string ("available", "due", etc)
function formatAssessmentDate(asstDate) {
  let [dateType, dt] = asstDate;
  // initial cap
  dateType = dateType[0].toUpperCase() + dateType.slice(1);
  // dt is string (leave as is), or date
  if (isValidDate(dt)) {
    // either date, or date+time
    if (dt.getHours() == 0) {
      // for debugging: try
      //    dt = moment(dt).format("ddd D MMM YYYY");
      dt = moment(dt).format("ddd D MMM");
    } else {
      dt = moment(dt).format("h:mm a ddd D MMM");
      // for debugging: try
      //    dt = moment(dt).format("h:mm a ddd D MMM YYYY");
    }
  }
  return `${dateType} ${dt}`
}

// format a (dateType => date) mapping
// (where dateType = string "open", "closed", "due" etc
function formatAssessmentDates(asstDates) {
  let dates = Object.entries(asstDates).map(formatAssessmentDate);
  return dates.join("\\\n");
}

module.exports = function(configData) {
  console.log("siteinfo. configData = ", configData);

  let { render, renderInline, extLink, safe } = configData.markdownConfig

  const year      =  2023;
  const citscode  = "5501";
  const unitcode  = `CITS${citscode}`;
  const unitname  = "Software Testing and Quality Assurance";
  const locode    = unitcode.toLowerCase();

  const handbook_url      = `https://handbooks.uwa.edu.au/unitdetails?code=${unitcode}`;
  const unit_outline_url  = `https://lms.uwa.edu.au/bbcswebdav/institution/Unit_Outlines_${year}/${unitcode}_SEM-1_${year}/${unitcode}_SEM-1_${year}_UnitOutline.html`;
  const forum_url         = `https://secure.csse.uwa.edu.au/run/help${citscode}`;
  const timetable_url     = 'https://timetable.applications.uwa.edu.au/';
  const csmarks_url       = "https://secure.csse.uwa.edu.au/run/csmarks";
  const cssubmit_url      = "https://secure.csse.uwa.edu.au/run/cssubmit";
  const moodle_url        = "https://quiz.jinhong.org/";
  const lms_url           = "https://lms.uwa.edu.au";

  const lms               = safe(extLink("LMS",    lms_url));
  const moodle            = safe(extLink("Moodle", moodle_url));

  let assessments = {
      week3_quiz: {
        name: "[Week 3 quiz](/assessment/#week-3-quiz)",
        marksPercent: "5",
        dates: {
          available: new Date(year, 2, 13, 10, 30), // 10.30am Mon 13 Mar, 2023
          closes:    new Date(year, 2, 16, 17, 0) // 5pm Thu 16 Mar, 2023
        },
        submit: moodle
      },
      week7_ex: {
        name: "[Week 6 take-home test](/assessment/#week-6-test)",
        marksPercent: "7.5",
        //dates: "Due 5pm Thu 14 Apr",
        dates: {
          //available: new Date(year, 3, 11, 17, 0), // 5pm Mon 11 Apr
          available: "TBA",
          due: new Date(year, 3, 6, 17, 0) // 5pm Thurs 6 Apr, 2023
        },
        submit: moodle
      },
      week7b_ex: {
        name: "[Take-home review exercise](/assessment/#week-6-test-review)",
        marksPercent: "2.5",
        //dates: "Due 5pm Thu 14 Apr",
        dates: {
          //available: new Date(year, 3, 11, 17, 0), // 5pm Mon 11 Apr
          available: "TBA",
          due: new Date(year, 3, 13, 17, 0) // 5pm Thurs 13 Apr, 2023
        },
        submit: moodle
      },
      project: {
        name: "[Project](/assessment/#project)",
        marksPercent: "35",
        //dates: "Due 5pm Thu 26 May",
        dates: {
          //available: new Date(year, 4, 5, 17, 0), // 5pm Thu 5 May,
          available: "TBA",
          due: new Date(year, 4, 19, 17, 0) // 5pm Fri 19 May, 2023
        },
        //submit: safe(extLink("cssubmit", `${cssubmit_url}?p=np&open=${unitcode}-1`))
        submit: moodle
      },
      exam: {
        name: "[Take-home exam](/assessment/#exam)",
        marksPercent: "50",
        //dates: "Available 5pm Wed 8 Jun\\\nDue 5pm Fri 10 Jun",
        dates: {
          available: new Date(year, 5, 14, 17, 0), // 5pm Wed 15 Jun
          due:       new Date(year, 5, 16, 17, 0) // 5pm Fri 17 Jun
        },
        submit: moodle
      },
    }



  let config = {
    year:         year,
    citscode:     citscode,
    unitcode:     unitcode,
    unitname:     unitname,
    locode:       locode,


    title:        `${unitcode} ${unitname}`,
    subtitle:     `${unitcode} in ${year}`,
    description:  `${unitcode} ${unitname} unit @uwa`,
    repository:   `${locode}/${locode}.github.io`,
    site_url:     `https://${locode}.github.io/`,

    timezone:     "Australia/Perth",
    language:     "en",

    author:       "Arran D. Stewart",

    keywords:     ["computer science", "software engineering",
                   "education", "tertiary education",
                   "university of western australia", "uwa",
                   "testing", "quality assurance", `${unitcode}`],

    lecture_time: "Tuesday 3 p.m.",

    lecture_venue: safe(extLink("the Robert Street Lecture Theatre (Robert Street Building, room G.16)", "https://link.mazemap.com/UOjeeiDP")),

    // google analytics
    ga_code:      "G-1JWXS3FSPZ",
    gua_code:     "UA-40672453-4",

    // themeing
    accent: "hsl(230,34.6%,40.8%)", // medium-dark blue for navbar
    // with hue, saturation, lightness
    accent_h: 230,
    accent_s: "34.6%",
    accent_l: "40.8%",


    main_menu: [
        { url:  "/",
          name: "Home",
          ext:  false,
        },
        { url:  "/schedule/",
          name: "Schedule",
          ext:  false,
        },
        { url:  "/resources/",
          name: "Resources",
          ext:  false,
        },
        { url:  "/assessment/",
          name: "Assessment",
          ext:  false,
        },
        { url:  "/faq/",
          name: "FAQ",
          ext:  false,
        },
        { url:  handbook_url,
          name: "Handbook entry",
          ext:  true,
        },
        { url: unit_outline_url,
          name: "Unit outline",
          ext:  true,
        },
        { url: forum_url,
          name: "Help" + citscode,
          ext:  true,
        },
    ],

    icon_menu: [],

    /// useful snippets

    timetable_url:  timetable_url,
    csmarks_url:    csmarks_url,
    cssubmit_url:   cssubmit_url,
    moodle_url:     moodle_url,
    lms_url:        lms_url,
    forum_url:      forum_url,

    lms: lms,
    moodle: moodle,

    help_forum: `help${citscode}`,


    formatAssessmentDate: formatAssessmentDate,

    assessments: assessments,

    assessment_table: {
      header: ["Assessment", "% of final mark", "Assessment dates", "Where to submit"],
      body: ["week3_quiz", "week7_ex", "week7b_ex", "project", "exam"].map( (key) => {
        let the_assessment = assessments[key];
        return [
          the_assessment.name,
          the_assessment.marksPercent,
          formatAssessmentDates(the_assessment.dates),
          the_assessment.submit,
        ]
      })
    },

  }

  return config;
}

