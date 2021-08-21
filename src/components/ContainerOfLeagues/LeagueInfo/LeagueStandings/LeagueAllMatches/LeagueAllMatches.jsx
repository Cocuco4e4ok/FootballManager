import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { getLeagueStandings } from '../../../../../api/metods';
import LeagueMatch from '../LeagueMatch';
import styles from './style.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const LeagueAllMatches = () => {
  const { slug } = useParams();
  const [matchesOfLeague, setMatchesOfLeague] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (!matchesOfLeague.length) {
      getLeagueStandings(slug)
        .then(({ data: { matches } }) => setMatchesOfLeague(matches));
    }
  }, []);
  if (!matchesOfLeague.length) {
    return (
      <div className={styles.preloader}>Loading...</div>
    );
  }
  let filteredMatches = [];
  for (let i = Date.parse(startDate.toISOString().substr(0, 10)); i <= Date.parse(endDate.toISOString().substr(0, 10)); i += 86400000) {
    filteredMatches = (matchesOfLeague.filter((match) => Date.parse(match.utcDate.substr(0, 10)) === i));
  }
  return (
    <div className={styles.container}>

      <div className={styles.calendar}>
        <div className={styles.datepicker}>
          <span>Change start date</span>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className={styles.datepicker}>
          <span>Change end date</span>
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      <div>
        {filteredMatches.map((item) => (
          <LeagueMatch
            className={styles.kal}
            key={item.id}
            teamsInfo={{
              awayTeam: item.awayTeam.name,
              homeTeam: item.homeTeam.name,
              date: item.utcDate,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default LeagueAllMatches;
