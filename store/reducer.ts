import { List } from 'immutable';
import { AppState, UserAction } from './types';
import { users } from '../utils/userData';

const sorted = Object.values(users).sort((a, b) => b.bananas - a.bananas);
const initialState: AppState = {
  sortedUsers: List(sorted),
  listUsers: List(sorted.slice(0, 10)),
};

export const reducer = (state = initialState, action: UserAction): AppState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, listUsers: List(action.payload) };
    default:
      return state;
  }
};
