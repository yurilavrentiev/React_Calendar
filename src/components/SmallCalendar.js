import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../Context/GlobalContext";
import getMonth from "../util";
import styles from "./SmallCalendar.module.css";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setSmallCalendarMonth, selectedDay, setSelectedDay } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };
  const getCurrentDayClass = (day) => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const selDay = selectedDay && selectedDay.format(format)
    if (currDay === nowDay) {
      return ({backgroundColor: '#2563EB', color: '#ffffff', borderRadius: '100px'})
    } else if (currDay === selDay) {
      return ({backgroundColor: '#DBEAFE', color: '#2563EB', fontWeight: '700', borderRadius: '9999px' });
    } else {
      return null;
    }}

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.text}>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className={styles.btnWrapper}>
          <button className={styles.btn} onClick={handlePrevMonth}>
            <span className={styles.chevron}>&#60;</span>
          </button>
          <button className={styles.btn} onClick={handleNextMonth}>
            <span className={styles.chevron}>&#62;</span>
          </button>
        </div>
      </header>
      <div className={styles.calendarContainer}>
        {currentMonth[0].map((day, i) => (
          <span key={i} className={styles.daysOfWeek}>
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i} >
            {row.map((day, idx) => (
              <button 
                key={idx} 
                className={styles.dayBTN} 
                style={getCurrentDayClass(day)}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setSelectedDay(day);
                }
                }>
                <span className={styles.dayText}>{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
