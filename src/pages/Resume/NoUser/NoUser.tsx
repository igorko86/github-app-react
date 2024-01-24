
import styles from './noUser.module.scss';

export const NoUser = () => {
    return (
        <div className={styles.noUser}>
            <h1>THIS USER HASN'T OPTED IN</h1>
            <p>This user has not opted in to this unofficial GitHub résumé service.</p>
            <p>If you would like to opt-in, simply go to our GitHub Project page and star the project.</p>
        </div>
    );
};