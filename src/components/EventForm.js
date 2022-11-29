import React, { useContext, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SegmentIcon from "@mui/icons-material/Segment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from "./EventForm.module.css";
import GlobalContext from "../Context/GlobalContext";

const labelClasses = ["orange", "gray", "green", "blue", "red", "purple"];

export default function EventForm() {
  const { 
    setShowEventForm, 
    selectedDay, 
    dispatchCalledEvent, 
    selectedEvent,
    setSelectedEvent, 
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
    ? labelClasses.find((lbl) => lbl === selectedEvent.label)
    : labelClasses[0]
  );
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const calendarEvent = {
      title: title,
      description: description,
      label: selectedLabel,
      day: selectedDay.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now()
    };
    if (selectedEvent) {
      dispatchCalledEvent({type: 'update', payload: calendarEvent});
    } else {
      dispatchCalledEvent({type: 'push', payload: calendarEvent});
    }
    setSelectedEvent(null);
    setShowEventForm(false);
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.formHeader}>
          <div>
            {selectedEvent && (
              <button
              className={styles.iconContainer}
              onClick={() => {
                dispatchCalledEvent({type: 'delete', payload: selectedEvent});
                setSelectedEvent(null);
                setShowEventForm(false);
              }}
            >
              <DeleteForeverIcon />
            </button>
            )}
            <button
              className={styles.iconContainer}
              onClick={() => {
                setSelectedEvent(null);
                setShowEventForm(false);
              }}
            >
              <CancelIcon />
            </button>
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.gridTemplate}>
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              className={styles.input}
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              required
            />
            <span>
              <ScheduleIcon />
            </span>
            <p>{selectedDay.format("dddd, MMMM DD")}</p>
            <span>
              <SegmentIcon />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              className={styles.inputDesc}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              required
            />
            <span>
              <BookmarkBorderIcon />
            </span>
            <div className={styles.colorsHolder}>
              {labelClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={styles.label}
                  style={{ backgroundColor: lblClass }}
                >
                  {selectedLabel === lblClass && (
                    <span className={styles.iconHolder}>
                      <CheckIcon />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <button type="submit" className={styles.submit} >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
