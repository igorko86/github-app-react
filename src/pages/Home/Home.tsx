import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import styles from './home.module.scss';

export const Home = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>MY GITHUB RÉSUMÉ</h1>
      </header>
      <p>As a software startup owner I really enjoy when people send us their résumés and they include their github
        account so we can see tangible work they have done.</p>
      <p>After a tweet by John Resig I imagined that it may be nice for people to be able to generate their GitHub résumés.</p>
      <input value={value} type="text" onChange={(e) => setValue(e.target.value)}/>
      <button onClick={() => {
          navigate(`/${value}`);
      }}>Generate</button>
      <h3>See some popular users</h3>
      <div>
        {[].map(() => {
          return <div></div>
        })}
      </div>
      <p>Notes, Information and Future features</p>
      <p>This is the first version. I am planning on adding things as such as your most committed forks, most committed repositories
        and make the "My Popular Repositories" be built from your complete list of repositories. Feel free to fork the page if you want to help :-)
      </p>
      {/* TODO add div with styles*/}
      <br/>
    </div>
  );
};
