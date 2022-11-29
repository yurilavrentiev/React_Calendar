import React, { useEffect, useMemo, useReducer, useState } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

function savedEventsReducer (state, { type, payload }) {
  switch (type) {

    case 'push':
      return [...state, payload];

    case 'update':
      return state.map((evnt) => evnt.id === payload.id ? payload : evnt);

    case 'delete':
      return state.filter((evnt) => evnt.id !== payload.id);

    default:
     throw new Error();
  }
}

function initEvents () {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalledEvent] = useReducer(
    savedEventsReducer, 
    [], 
    initEvents
  );
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) => 
    labels
      .filter((lbl) => lbl.checked)
      .map((lbl) => lbl.label)
      .includes(evt.label)
    )
  }, [savedEvents, labels])

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map(evt => evt.label))].map(label => {
        const currentLabel = prevLabels.find(lbl => lbl.label === label)
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        }
      })
    })
  }, [savedEvents])

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
  }, [savedEvents]);

  useEffect(() => {
    if(smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
  }
  return (
    <GlobalContext.Provider 
      value={{
        monthIndex, 
        setMonthIndex, 
        smallCalendarMonth, 
        setSmallCalendarMonth,
        selectedDay,
        setSelectedDay,
        showEventForm,
        setShowEventForm,
        dispatchCalledEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
        }}>
      {props.children}
    </GlobalContext.Provider>
  )
}
