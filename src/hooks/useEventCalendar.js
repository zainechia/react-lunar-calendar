import React, { useEffect, useState } from "react";
import moment from "moment";
import lunisolar from "lunisolar";

export default function useEventCalendar() {
  const [date, setDate] = useState(moment());
  const [daysGrid, setDaysGrid] = useState([]);

  // useEffect on first render + whenever date changes
  useEffect(() => getMonthDaysGrid(), [date]);

  function getMonthDaysGrid() {
    const firstDayofMonth = date.clone().startOf("month");
    const lastDayofMonth = date.clone().endOf("month");
    const currentMonthDays = date.daysInMonth();

    // If first day of the month is Sunday i.e. 0, then total last
    // month final days would be 6.
    const totalLastMonthFinalDays =
      firstDayofMonth.days() - 1 < 0 ? 6 : firstDayofMonth.days() - 1;

    // If last day of the month is Sunday i.e. 0, then the total next
    // month start days would be 0.
    const totalNextMonthStartDays =
      lastDayofMonth.days() - 1 < 0 ? 0 : 7 - lastDayofMonth.days();

    const totalDays =
      currentMonthDays + totalLastMonthFinalDays + totalNextMonthStartDays;

    const monthList = [];
    let counter = 1;

    const lastMonthDays = firstDayofMonth
      .clone()
      .subtract(1, "months")
      .daysInMonth();

    const nextMonthDays = firstDayofMonth
      .clone()
      .add(1, "months")
      .daysInMonth();

    for (let i = 0; i < totalDays; i++) {
      // Need to handle logic for last month, current month  and next month days separately
      let dayInfo = {};

      if (i < totalLastMonthFinalDays) {
        // Days from last month
        const date = firstDayofMonth
          .clone()
          .subtract(totalLastMonthFinalDays - i, "days");

        const d = lunisolar(date);

        dayInfo = {
          number: lastMonthDays - totalLastMonthFinalDays + i + 1,
          date: date,
          chineseDate: {
            year: d.lunar.year,
            month: d.lunar.month,
            day: d.lunar.day,
          },
          status: "lastMonth",
        };
      } else if (i < totalDays - totalNextMonthStartDays) {
        // Days from the current month
        const date = firstDayofMonth.clone().add(counter - 1, "days");

        const d = lunisolar(date);

        dayInfo = {
          number: i + 1 - totalLastMonthFinalDays,
          date: date,
          chineseDate: {
            year: d.lunar.year,
            month: d.lunar.month,
            day: d.lunar.day,
          },
          status: "currentMonth",
        };
        counter++;
      } else {
        // Days from the next month
        const date = lastDayofMonth
          .clone()
          .add(i - totalDays + totalNextMonthStartDays + 1, "days");
        const d = lunisolar(date);

        dayInfo = {
          number: i + 1 - totalLastMonthFinalDays - currentMonthDays,
          date: date,
          chineseDate: {
            year: d.lunar.year,
            month: d.lunar.month,
            day: d.lunar.day,
          },
          status: "nextMonth",
        };
      }

      monthList.push(dayInfo);
    }

    setDaysGrid(monthList);
    // console.log(monthList);
  }

  function changeMonth(action) {
    if (action === "add") {
      setDate((prevDate) => prevDate.clone().add(1, "months"));
    } else if (action === "subtract") {
      setDate((prevDate) => prevDate.clone().subtract(1, "months"));
    }
  }

  return { date, changeMonth, daysGrid };
}
