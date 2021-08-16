import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

export default function NavBar() {
  return (
    <div className={styles.tabs}>
      <Link to="/" className={styles.tab}>Leagues</Link>
      <Link to="/commands" className={styles.tab}>Commands</Link>
    </div>
  );
}
