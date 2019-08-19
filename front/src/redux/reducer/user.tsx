import { USER_FETCH_SUCCEEDED, USER_FETCH_FAILED } from '../constan';

export default function user(
  state = { isLogin: false, data: {}, loading: true },
  { type, payload }: { type: any; payload: any }
) {
  switch (type) {
    case USER_FETCH_SUCCEEDED:
      return { ...state, ...payload };
    case USER_FETCH_FAILED:
      return { ...state, ...payload };
    default:
      return state;
  }
}
