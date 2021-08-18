import React, { useState, useEffect } from 'react';
import { getLeagueStandings } from '../../../../api/metods';
import LeagueMatch from './LeagueMatch';
import styles from './style.module.scss';

const LeagueStandings = ({ compititionId }) => {
  const [matchesOfLeague, setMatchOfLeague] = useState([]);
  const curentMatches = matchesOfLeague.slice(1, 10);

  useEffect(() => {
    getLeagueStandings(compititionId)
      .then(({ data: { matches } }) => setMatchOfLeague(matches));
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
