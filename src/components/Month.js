import React from 'react';
import Day from './Day';
import styles from './Month.module.css';

export default function Month({ month }) {
  return (
  
    <div className={styles.main}>
    <header className={styles.header} >
        { month[0].map((day, i) => <p className={styles.ptop} key={i}>{day.format("ddd").toUpperCase()}</p>) }
      </header>
    <div className={styles.container}>
    
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i}/>
          ))}
        </React.Fragment>
      ))}
    </div>
    </div>

  )
}
