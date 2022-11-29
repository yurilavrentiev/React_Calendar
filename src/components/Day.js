import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../Context/GlobalContext";
import styles from "./Day.module.css";

export default function Day({ day }) {
  const [dayEvents, setDayEvents] = useState([]);
  const { 
    setSelectedDay, 
    setShowEventForm, 
    filteredEvents, 
    setSelectedEvent,
    dispatchCalledEvent,
    selectedEvent 
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evnt) => dayjs(evnt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? {backgroundColor: '#2563EB', color: '#ffffff', borderRadius: '9999px'} : null;
  }

  const dragStartHandler = (e, evnt) => {
    setSelectedEvent(evnt)
  }

  const dragEndHandler = (e) => {
  }

  const dragOverHandler = (e) => {
    e.preventDefault();
  }
  const dropHandler = (e, day) => {
    e.preventDefault();
    const draggedEvent = {...selectedEvent}
    draggedEvent.day = day.valueOf()
    dispatchCalledEvent({type: 'update', payload: draggedEvent});
  }
  return (
    <div className={styles.wrap}>
      <p className={styles.pbody} style={getCurrentDayClass()} >{day.format("DD")} </p>
      <div className={styles.day} 
            onClick={() => {
              setSelectedDay(day);
              setShowEventForm(true);
            }}
            onDrop={(e) => dropHandler(e, day)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            >
        {dayEvents.map((evnt, idx) => (
          <div
            key={idx}
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, evnt)}
            className={styles.event}
            onClick={() => setSelectedEvent(evnt)}
            style={{backgroundColor: evnt.label}}
          >
            {evnt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
