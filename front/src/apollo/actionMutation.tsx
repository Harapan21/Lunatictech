import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';

export const getUser = () => {
  const { data, loading } = useQuery(GET_USER);
  return { data, loading };
};
