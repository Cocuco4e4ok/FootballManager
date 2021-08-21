import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { getLeagueStandings } from '../../../../../api/metods';
import Match from '../Match';
import styles from './style.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const LeagueAllMatches = () => {
  const { slug } = useParams();
  const [matchesOfLeague, setMatchesOfLeague] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const newSetStartDate = (data) => {
    setStartDate(new Date(data.getFullYear(), data.getMonth(), data.getDate(), 0, 0, 0));
  };
  const newSetEndDate = (data) => {
    setEndDate(new Date(data.getFullYear(), data.getMonth(), data.getDate(), 23, 59, 59));
  };

  const filterByDate = () => matchesOfLeague.filter((match) => Date.parse(match.utcDate) >= Date.parse(startDate) && Date.parse(match.utcDate) <= Date.parse(endDate));

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.datepicker}>
          <span>Change start date</span>
          <ReactDatePicker
            selected={startDate}
            onChange={newSetStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className={styles.datepicker}>
          <span>Change end date</span>
          <ReactDatePicker
            selected={endDate}
            onChange={newSetEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      <div>
        {filterByDate().map((item) => (
          <Match
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
