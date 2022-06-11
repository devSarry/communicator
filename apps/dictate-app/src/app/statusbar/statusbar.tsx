import styles from './statusbar.module.css';

/* eslint-disable-next-line */
export interface StatusbarProps {}

export function Statusbar(props: StatusbarProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Statusbar!</h1>
    </div>
  );
}

export default Statusbar;
