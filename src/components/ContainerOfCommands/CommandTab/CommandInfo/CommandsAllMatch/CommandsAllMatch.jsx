/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { getCommandStandings } from '../../../../../api/metods';
import styles from './style.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Match from '../../../../ContainerOfLeagues/LeagueInfo/LeagueStandings/Match';

const CommandsAllMatch = () => {
  const { slug } = useParams();
  const [matchesOfCommand, setMatchesOfCommand] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!matchesOfCommand.length) {
      getCommandStandings(slug)
        .then(({ data: { matches } }) => setMatchesOfCommand(matches))
        .catch((err) => { console.log((err)); });
    }
  }, []);

  if (!matchesOfCommand.length) {
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

  const filterByDate = () => {
    const matches = matchesOfCommand.filter((match) => Date.parse(match.utcDate) >= Date.parse(startDate) && Date.parse(match.utcDate) <= Date.parse(endDate));
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
export default CommandsAllMatch;
