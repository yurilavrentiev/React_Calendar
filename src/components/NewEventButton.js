import React, { useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';
import styles from './NewEventButton.module.css';


export default function NewEventButton() {
  
  const { setShowEventForm } = useContext(GlobalContext);

  return (
    <div className={styles.wrapper} >
    <button onClick={() => {setShowEventForm(true)}} className={styles.btn}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/3/3b/Flat_plus_icon.svg'
          alt='create_event'
          className={styles.logo} />
          <span className={styles.text}>Create</span>
    </button>
    </div>
  )
}
