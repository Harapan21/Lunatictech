import * as React from 'react';
import { useSelector } from 'react-redux';
import PostResult from './PostResult';

export default function Dashboard() {
  // tslint:disable-next-line:jsx-key
  const menu = [<DashboardResult />, <PostResult />];
  const INDEX_ACTIVE = useSelector(({ menu }: any) => menu.dashboard);
  return menu[INDEX_ACTIVE];
}

function DashboardResult() {
  return <div>Dashboard</div>;
}
