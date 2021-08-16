import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLeaguesList } from '../../../api/metods';
import LeaguCard from './LeagueCard';
import LeagueStandings from './LeagueStandings';
import styles from './style.module.scss';

const LeagueInfo = () => {
  const [leagueInfo, setLeagueInfo] = useState({});
  const { slug } = useParams();
  const leagues = useSelector((state) => state.leagues);
  useEffect(() => {
    if (!leagues.length) {
      getLeaguesList()
        .then(({ data: { competitions } }) => setLeagueInfo(competitions.find(({ id }) => id.toString() === slug)));
    } else {
      setLeagueInfo(leagues.find(({ id }) => id.toString() === slug));
    }
  }, []);
  if (!Object.keys(leagueInfo).length) {
    return null;
  }
  return (
    <div className={styles.containerOfLeagueInfo}>
      <LeaguCard info={{
        name: leagueInfo.name,
        areaName: leagueInfo.area.name,
        areaFlag: leagueInfo.area.ensignUrl,
        startDate: leagueInfo.currentSeason.startDate,
        endDate: leagueInfo.currentSeason.endDate,
        currentMatchday: leagueInfo.currentSeason.currentMatchday,
      }}
      />
      <LeagueStandings compititionId={slug} />
    </div>
  );
};

export default LeagueInfo;
