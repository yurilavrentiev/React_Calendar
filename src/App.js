import React, { useState, useContext, useEffect} from "react";
import styles from "./App.module.css";
import getMonth from "./util";
import CalendarHeader from "./components/CalendarHeader";
import SideBar from "./components/SideBar";
import Month from "./components/Month";
import GlobalContext from "./Context/GlobalContext";
import EventForm from "./components/EventForm";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventForm } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex]);

  return (
    <>
      {showEventForm && <EventForm />}
      <div className={styles.main}>
        <CalendarHeader />
        <div className={styles.container}>
          <SideBar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
