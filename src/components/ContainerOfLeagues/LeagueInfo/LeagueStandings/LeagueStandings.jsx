import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeagueStandings } from '../../../../api/metods';
import { ErrorMessage } from '../../../../store/action';
import LeagueMatch from './Match';
import styles from './style.module.scss';

const LeagueStandings = ({ compititionId }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors);
  const [matchesOfLeague, setMatchOfLeague] = useState([]);
  const curentMatches = matchesOfLeague.slice(1, 10);

  useEffect(() => {
    let cleanupFunction = false;
    getLeagueStandings(compititionId)
      .then(({ data: { matches } }) => {
        if (!cleanupFunction) setMatchOfLeague(matches);
      })
      .catch((err) => dispatch(ErrorMessage(`${err.message}. Try again later.`)));
    return () => {
      cleanupFunction = true;
    };
  }, []);

  if (!matchesOfLeague.length && !errorMessage.length) {
    return (
      <div className={styles.preloader}>Loading...</div>
    );
  }

  if (errorMessage.length) {
    return <div className={styles.preloader}>{errorMessage}</div>;
  }

  return (
    <div className={styles.leagueMatches}>
      {curentMatches.map((item) => (
        <LeagueMatch
          key={item.id}
          teamsInfo={{
            awayTeam: item.awayTeam.name,
            homeTeam: item.homeTeam.name,
            date: item.utcDate,
          }}
        />
      ))}
    </div>
  );
};
export default LeagueStandings;
