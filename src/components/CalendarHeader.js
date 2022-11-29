import dayjs from 'dayjs';
import React, { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';
import styles from './CalendarHeader.module.css';


export default function CalendarHeader() {

  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
        );
  }

  return (
    <header className={styles.header}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2943/2943592.png"
        alt="calendar"
        className={styles.logo}
      />
      <h1 className={styles.text}>My Calendar</h1>
      <button className={styles.todayBTN} onClick={handleReset}>Today</button>
      <button onClick={handlePrevMonth} className={styles.chevronCont} >
        <span className={styles.chevron} >&#60;</span>
      </button>
      <button onClick={handleNextMonth} className={styles.chevronCont} >
        <span className={styles.chevron} >&#62;</span>
      </button>
      <h2 className={styles.month}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  );
}
