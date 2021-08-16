import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComandsList as getCommandsList } from '../../api/metods';
import { GETCommandsListTabResponse } from '../../store/action';
import CommandTab from './CommandTab';
import styles from './style.module.scss';

const ContainerOfCommands = () => {
  const dispatch = useDispatch();
  const commands = useSelector((state) => state.commands);
  const [searchValue, setSearchValue] = useState('');
  const filteredCommands = commands.filter((command) => command.name.toLowerCase().includes(searchValue.toLowerCase()));
  useEffect(() => {
    if (!commands.length) {
      getCommandsList()
        .then(({ data: { teams } }) => dispatch(GETCommandsListTabResponse(teams)))
        .catch((err) => { throw new Error(err); });
    }
  }, []);
  if (!commands.length) {
    return <div className={styles.preloader}>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.formInput}>
        <form action="">
          <input type="text" placeholder="Search" onChange={(event) => setSearchValue(event.target.value)} />
        </form>
      </div>
      <div className={styles.containerOfCommands}>
        {filteredCommands.map((team) => (
          <Link to={`/commands/${team.id}`} key={team.id} id={team.id}>
            <CommandTab
              key={team.id}
              info={{ name: team.shortName, flag: team.crestUrl }}
            />
          </Link>

        ))}
      </div>
    </div>

  );
};

export default ContainerOfCommands;
