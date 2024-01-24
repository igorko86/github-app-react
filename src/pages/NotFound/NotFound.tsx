import { useNavigate } from 'react-router-dom';

import styles from './notFound.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
        Not Found page
    </div>
  );
};
