import React, { ReactNode } from 'react';
import css from '../Loader/Loader.module.css';

type loaderProps = {
  children: ReactNode;
}

const Loader = ({ children }: loaderProps): React.ReactElement => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loader}>{children}</div>
    </div>
  );
};

export default Loader;
