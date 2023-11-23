import { Fragment } from 'react';
import MainHeader from './MainHeader';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader
        setIsCartShown={props.setIsCartShown}
        isCartShown={props.isCartShown}
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
