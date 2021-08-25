import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLeagueStandings } from '../../../../../api/metods';
import Match from '../Match';
import styles from './style.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage } from '../../../../../store/action';

const LeagueAllMatches = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors);
  const { slug } = useParams();
  const [matchesOfLeague, setMatchesOfLeague] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    let cleanupFunction = false;
    getLeagueStandings(slug)
      .then(({ data: { matches } }) => {
        if (!cleanupFunction) setMatchesOfLeague(matches);
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

  const newSetStartDate = (data) => {
    setStartDate(new Date(data.getFullYear(), data.getMonth(), data.getDate(), 0, 0, 0));
  };
  const newSetEndDate = (data) => {
    setEndDate(new Date(data.getFullYear(), data.getMonth(), data.getDate(), 23, 59, 59));
  };

  const filterByDate = () => {
    const matches = matchesOfLeague.filter((match) => Date.parse(match.utcDate) >= Date.parse(startDate) && Date.parse(match.utcDate) <= Date.parse(endDate));
    const matchesOfTeam = () => {
      if (matches.length) {
        return matches.map((item) => (
          <Match
            key={item.id}
            teamsInfo={{
              awayTeam: item.awayTeam.name,
              homeTeam: item.homeTeam.name,
              date: item.utcDate,
            }}
          />
        ));
      }
      return <div>There are no matches in the selected period.</div>;
    };
    return matchesOfTeam();
  };
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
        {filterByDate()}
      </div>
    </div>
  );
};
export default LeagueAllMatches;
