import * as React from 'react';
import { useSelector } from 'react-redux';
import PostResult from './PostResult';
import DashboardResult from './DashboardResult';
import DriveResult from './DriveResult';

export default () => {
  // tslint:disable-next-line:jsx-key
  const menu = [<DashboardResult />, <PostResult />, <DriveResult />];
  const INDEX_ACTIVE = useSelector(({ menu }: any) => menu.dashboard);

  return menu[INDEX_ACTIVE];
};
