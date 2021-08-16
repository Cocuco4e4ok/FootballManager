import React from 'react';
import styles from './style.module.scss';

const CommandTab = ({ info }) => (
  <div className={styles.infoTab}>
    <div>{info.name}</div>
    <img src={info.flag} alt="#" />
  </div>
);
export default CommandTab;
