import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MANU_ACTIVE } from '../apollo/query';

export default function Dashboard() {
  const { data } = useQuery(MANU_ACTIVE);
  console.log(data);
  return <div> hai</div>;
}
