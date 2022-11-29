import React from 'react';
import styles from './SideBar.module.css'
import NewEventButton from './NewEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';

export default function SideBar() {
  return (
    <aside className={styles.sideBar}>
      <NewEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  )
}
