import {
  USER_FETCH_SUCCEEDED,
  USER_LOGOOUT_EVENT,
  USER_FETCH_FAILED
} from '../constan';

const initialState = { isLogin: false, data: {} };
export default function user(
  state = { ...initialState, loading: true },
  { type, payload }: { type: any; payload: any }
) {
  switch (type) {
    case USER_LOGOOUT_EVENT:
      return { ...state, ...initialState };
    case USER_FETCH_SUCCEEDED:
      return { ...state, ...payload };
    case USER_FETCH_FAILED:
      return { ...state, ...payload };
    default:
      return state;
  }
}
