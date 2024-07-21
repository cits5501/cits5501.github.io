module.exports = {
  eleventyComputed: {
    // This will get executed for every file under ./src which
    // is to be rendered.
    // The only time we need to do anything is for the "schedule.md"
    // page, which will define a startDate for the semester.
    // We use that to mutate data.schedule.weeks (and also we return
    // a ref to it; so the schedule webpage can use either `weeksWithDates`,
    // or `schedule.weeks`, as it likes).
    weeksWithDates: data => {
      if ('startDate' in data) {
        console.log("generating 'weeksWithDates' using startDate " + data.startDate);

        // check provided startDate is a Monday
        const MONDAY = 1; // sun is 0
        const startDate = new Date(data.startDate);
        if (startDate.getDay() != MONDAY) {
          throw new Error("startDate must be a Monday, was: " + startDate);
        }

        // add dates for start of week
        let dt = new Date(startDate); // to mutate
        for (let i=0; i < data.schedule.weeks.length; i+=1) {
          data.schedule.weeks[i].date = new Date(dt);
          dt.setDate( dt.getDate() + 7 );
        }

        return data.schedule.weeks;
      }
    }
  }
};
