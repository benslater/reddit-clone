import { SetAccessTokenAction, SET_ACCESS_TOKEN } from 'actions/global';

type GlobalAction = SetAccessTokenAction;

interface GlobalState {
  accessToken: string | null;
}
const initialState: GlobalState = {
  accessToken: null,
};

const global = (
  state = initialState,
  { type, payload }: GlobalAction,
): GlobalState => {
  switch (type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
    default:
      return state;
  }
};

export default global;
