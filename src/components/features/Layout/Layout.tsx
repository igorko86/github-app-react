import {Outlet} from "react-router-dom";

import styles from './layout.module.scss';
export const Layout = () => {
    return (
        <main className={styles.main}>
            <Outlet/>
        </main>
    );
};