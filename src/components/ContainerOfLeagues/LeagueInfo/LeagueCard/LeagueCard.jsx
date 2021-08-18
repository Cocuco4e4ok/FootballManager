import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

const LeaguCard = ({ info }) => (
  <div className={styles.leagueInfo}>
    <div className={styles.infoText}>
      <strong>{`Name of League - ${info.name}`}</strong>
      <span>Current season:</span>
      <span>
        Start date:
        {` ${info.startDate}`}
      </span>
      <span>
        End date:
        {` ${info.endDate}`}
      </span>
      <span>
        Current matchday:
        {` ${info.currentMatchday}`}
      </span>
      <span>
        Area:
        {` ${info.areaName}`}
      </span>
      <br />
      <img src={` ${info.areaFlag}`} alt="flag" />
      <Link to={`/matches/${info.compititionId}`} className={styles.btnAllMatches}>{`Show all matches of ${info.name}`}</Link>
    </div>

  </div>
);
export default LeaguCard;
