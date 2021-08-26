import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLeaguesList } from '../../api/metods';
import { ErrorMessage, GETLeagueListTabResponse } from '../../store/action';
import styles from './style.module.scss';

const ContainerOfLeagues = () => {
  const dispatch = useDispatch();
  const aviableCompetition = ['BL1', 'PPL', 'DED', 'PD', 'FL1', 'ELC', 'PPL', 'WC', 'SA', 'PL', 'CL', 'BSA', 'CLI'];
  const leagues = useSelector((state) => state.leagues);
  const errorMessage = useSelector((state) => state.errors);
  const [searchValue, setSearchValue] = useState('');
  const filteredLeagues = leagues.filter((league) => league.name.toLowerCase().includes(searchValue.toLowerCase()));
  useEffect(() => {
    if (!leagues.length) {
      getLeaguesList()
        .then(
          ({ data: { competitions } }) => {
            const resultData = competitions.filter((item) => aviableCompetition.includes(item.code));
            dispatch(GETLeagueListTabResponse(resultData));
          },
        )
        .catch((err) => dispatch(ErrorMessage(`${err.message}. Try again later.`)));
    }
  }, []);

  if (!leagues.length && !errorMessage.length) {
    return <div className={styles.preloader}>Loading...</div>;
  }

  if (errorMessage.length) {
    return <div className={styles.preloader}>{errorMessage}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterByName}>
        <input type="text" placeholder="Search" onChange={(event) => setSearchValue(event.target.value)} />
      </div>
      <div className={styles.containerOfLeagues}>
        {filteredLeagues.map((item) => (
          <Link to={`/league/${item.id}/`} key={item.id} className={styles.leagueCard} id={item.id}>
            <div className={styles.leagueCard__name}>
              {item.name}
            </div>
            <div className={styles.leagueCard__emblem}>
              <img src={item.emblemUrl ? item.emblemUrl : 'https://i.gogov.ru/icons/a/disabled-parking.svg'} alt="" className={styles.leagueCard__emblem} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContainerOfLeagues;
