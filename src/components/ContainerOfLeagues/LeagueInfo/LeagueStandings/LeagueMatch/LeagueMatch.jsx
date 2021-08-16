import React from 'react';
import styles from './style.module.scss';

const LeagueMatch = ({ teamsInfo }) => {
  const date = new Date(teamsInfo.date);
  return (
    <div className={styles.leagueMatch}>
      <span>{`${teamsInfo.awayTeam} vs ${teamsInfo.homeTeam}`}</span>
      <span>{date.toDateString()}</span>
    </div>
  );
};

export default LeagueMatch;
