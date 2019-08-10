import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MANU_ACTIVE } from '../apollo/query';

export default function Dashboard() {
  const { data } = useQuery(MANU_ACTIVE);
  // tslint:disable-next-line:jsx-key
  const menu = [<DashboardResult />, <PostResult />];
  return menu[data.MenuToggle];
}

function PostResult() {
  return <div>Post</div>;
}

function DashboardResult() {
  return <div>Dashboard</div>;
}
