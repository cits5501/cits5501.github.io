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
      dt = moment(dt).format("ddd D MMM");
    } else {
      dt = moment(dt).format("h:mm a ddd D MMM");
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
  let { render, renderInline, extLink, safe } = configData.markdownConfig

  const year      =  2022;
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

  const lms               = safe(extLink("LMS", "https://lms.uwa.edu.au"));

  let assessments = {
      week3_quiz: {
        name: "[Week 3 quiz](/assessment/#week-3-quiz)",
        marksPercent: "7.5",
        //dates: "Available Mon 14 March\\\nCloses 5pm Thu 17 Mar",
        dates: {
          available: new Date(year, 2, 14), // Mon 14 Mar
          closes:    new Date(year, 2, 17, 17, 0) // 5pm Thu 17 Mar
        },
        submit: lms
      },
      week7_ex: {
        name: "[Week 7 written exercise](/assessment/#week-7-exercise)",
        marksPercent: "7.5",
        //dates: "Due 5pm Thu 14 Apr",
        dates: {
          available: new Date(year, 3, 11, 17, 0), // 5pm Mon 11 Apr
          due: new Date(year, 3, 14, 17, 0) // 5pm Thu 14 Apr
        },
        submit: lms
      },
      project: {
        name: "[Project](/assessment/#project)",
        marksPercent: "35",
        //dates: "Due 5pm Thu 26 May",
        dates: {
          "available:": "**TBA**",
          due: new Date(year, 4, 26, 17, 0) // 5pm Thu 26 May
        },
        submit: safe(extLink("cssubmit", `${cssubmit_url}?p=np&open=${unitcode}-1`))
      },
      exam: {
        name: "[Take-home exam](/assessment/#exam)",
        marksPercent: "50",
        //dates: "Available 5pm Wed 8 Jun\\\nDue 5pm Fri 10 Jun",
        dates: {
          available: new Date(year, 5, 8, 17, 0), // 5pm Wed 8 Jun
          due:       new Date(year, 5, 10, 17, 0) // 5pm Fri 10 Jun
        },
        submit: lms
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
                  "uwa", "testing", "quality assurance", "CITS5501"],

    lecture_time: "Tuesday 11 a.m.",

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
        { url:  handbook_url,
          name: "Handbook entry",
          ext:  true,
        },
        { url: unit_outline_url,
          name: "Unit outline",
          ext:  true,
        },
        { url: forum_url,
          name: "Help5501",
          ext:  true,
        },
    ],

    icon_menu: [],

    /// useful snippets

    timetable_url: timetable_url,

    csmarks_url: csmarks_url,

    cssubmit_url: cssubmit_url,

    lms: lms,

    help_forum: `help${citscode}`,

    forum_url: forum_url,

    formatAssessmentDate: formatAssessmentDate,

    assessments: assessments,

    assessment_table: {
      header: ["Assessment", "% of final mark", "Assessment dates", "Where to submit"],
      body: ["week3_quiz", "week7_ex", "project", "exam"].map( (key) => {
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

