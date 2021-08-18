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
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    getLeagueStandings(slug)
      .then(({ data: { matches } }) => setMatchesOfLeague(matches));
  }, []);
  if (!matchesOfLeague.length) {
    return (
      <div className={styles.preloader}>Loading...</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div>
          <span>Change start date</span>
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.datepicker}
          />
        </div>
        <div>
          <span>Change end date</span>
          <ReactDatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.datepicker}
          />
        </div>

      </div>
      <div>
        {matchesOfLeague.map((item) => (
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
