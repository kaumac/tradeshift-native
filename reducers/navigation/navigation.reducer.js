import { Navigator } from "../../navigation";

export default (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};
