import { USER_FETCH_SUCCEEDED } from '../constan';

export default function user(
  state = { isLogin: false, data: null },
  { type, payload }: { type: any; payload: any }
) {
  switch (type) {
    case USER_FETCH_SUCCEEDED:
      return { isLogin: true, data: payload };
    default:
      return state;
  }
}
