import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

import {USERS_URL} from "../../shared/constants";

import {NoUser} from "./NoUser";
import {UserInfo} from "./types";

import styles from './resume.module.scss';

export const Resume = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const {userName} = useParams();

  useEffect(() => {
    (async() => {
      const userData = await getUser(userName);

      if (!userData.name) return;

      const repositories = await getRepositories(`${userData.reposUrl}?per_page=20&sort=updated&direction=desc`) // TODO add public, and check if it's possible to get array of public urls
      const languages = await getLanguages(userData.reposUrl);

      setUserInfo({...userData, languages, repositories});
    })()
  }, [userName]);

  if (!userInfo?.name) return <NoUser/>

  const {name, created, reposUrl, repos, languages: langs, repositories} = userInfo;

  return (
    <div className={styles.resume}>
      <h1>{name}</h1>
      <div>Created: {created}</div>
      <div>Public repositories: {repos}</div>
      <div>
        Languages:
      <ul>
        {Object.values(langs.languages).map((lang) => {
          return <li key={lang.name}> {lang.name} - {(lang.size / langs.sum * 100).toFixed(1)}%</li>
        })}
      </ul>
      <ul>
        {repositories.map((rep) => {
          console.log(rep)
          // TODO check uniq id
          return <li key={rep.publicUrl}>
            <a href={rep.publicUrl}>{rep.name}</a>
          </li>
        })}
      </ul>
      </div>
    </div>
  );
};


// TODO move fetch methods to middleware actions or context
const getUser = async (userName) => {
  try {
    const res = await fetch(`${USERS_URL}${userName}`);
    const userInfo = await res.json();
    const { public_repos, name, created_at, repos_url } = userInfo;

    return { repos: public_repos, name, created: created_at, reposUrl: repos_url }
  } catch (e) {}
};

const getLanguages = async (repoUrl: UserInfo['reposUrl']): Promise<UserInfo['languages']> => {
  try {
    const repositories = await getRepositories(repoUrl); // TODO che if it posible to get only languages_url array

    const promises = repositories.map(async (repo) => {
      try {
        const languagesResponse = await fetch(repo.languagesUrl);

        return await languagesResponse.json();
      } catch (e) {
        console.log("Something went wrong");
      }
    });
    const languagesArray = await Promise.all(promises);

    return languagesArray.reduce(
        (acc, statLangs) => {
          for (const lang in statLangs) {
            const current = acc.languages[lang];

            if(!current) {
              acc.languages[lang] = {
                name: lang,
                size: 0
              }
            }
            acc.languages[lang].size +=  statLangs[lang];
            acc.sum += statLangs[lang];
          }
          return acc;
        },
        { sum: 0, languages: {} as {[key: string]: {}} }
    );
  } catch (e) {
    console.log("Something went wrong");
  }
};

const getRepositories = async (url: string) => { // TODO add type
  try {
    const repositoriesResponse = await fetch(url);
    const data = await repositoriesResponse.json();
    console.log('DATAT', data)
    return data.map((d) =>{
      const {languages_url, name, id, svn_url} = d;

      return {
        id,
        name,
        languagesUrl: languages_url,
        publicUrl: svn_url
      }
    })
  } catch (e) {
    console.log("Something went wrong");
  }
}