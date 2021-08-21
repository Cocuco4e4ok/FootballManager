import React from 'react';
import styles from './style.module.scss';

const Match = ({ teamsInfo }) => {
  const date = new Date(teamsInfo.date);
  return (
    <div className={styles.Match}>
      <span>{`${teamsInfo.awayTeam} vs ${teamsInfo.homeTeam}`}</span>
      <span>{date.toDateString()}</span>
    </div>
  );
};

export default Match;
