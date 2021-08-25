import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLeaguesList } from '../../../api/metods';
import { ErrorMessage } from '../../../store/action';
import LeaguCard from './LeagueCard';
import LeagueStandings from './LeagueStandings';
import styles from './style.module.scss';

const LeagueInfo = () => {
  const dispatch = useDispatch();
  const [leagueInfo, setLeagueInfo] = useState({});
  const { slug } = useParams();
  const leagues = useSelector((state) => state.leagues);
  const errorMessage = useSelector((state) => state.errors);

  useEffect(() => {
    if (!leagues.length) {
      getLeaguesList()
        .then(({ data: { competitions } }) => setLeagueInfo(competitions.find(({ id }) => id.toString() === slug)))
        .catch((err) => dispatch(ErrorMessage(`${err.message}. Try again later.`)));
    } else {
      setLeagueInfo(leagues.find(({ id }) => id.toString() === slug));
    }
  }, []);

  if (!Object.keys(leagueInfo).length) {
    return null;
  }

  if (errorMessage.length) {
    return <div className={styles.preloader}>{errorMessage}</div>;
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
        compititionId: slug,
      }}
      />
      <LeagueStandings compititionId={slug} />
    </div>
  );
};

export default LeagueInfo;
