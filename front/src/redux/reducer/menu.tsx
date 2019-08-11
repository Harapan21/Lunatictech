import { TRIGGER_MENU, DASHBOARD_MENU } from '../constan';

const initState = {
  toggle: false,
  dashboard: 0
};

export default function menu(
  state = initState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case TRIGGER_MENU:
      return { ...state, toggle: !state.toggle };
    case DASHBOARD_MENU:
      return { ...state, dashboard: action.payload };
    default:
      return state;
  }
}
