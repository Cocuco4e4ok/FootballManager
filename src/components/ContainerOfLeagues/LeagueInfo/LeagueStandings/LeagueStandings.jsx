import React, { useState, useEffect } from 'react';
import { getLeagueStandings } from '../../../../api/metods';
import LeagueMatch from './Match';
import styles from './style.module.scss';

const LeagueStandings = ({ compititionId }) => {
  const [matchesOfLeague, setMatchOfLeague] = useState([]);
  const curentMatches = matchesOfLeague.slice(1, 10);

  useEffect(() => {
    let cleanupFunction = false;
    getLeagueStandings(compititionId)
      .then(({ data: { matches } }) => {
        if (!cleanupFunction) setMatchOfLeague(matches);
      })
      .catch((err) => { console.log((err)); });
    return () => {
      cleanupFunction = true;
    };
  }, []);

  if (!matchesOfLeague.length) {
    return (
      <div className={styles.preloader}>Loading...</div>
    );
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
