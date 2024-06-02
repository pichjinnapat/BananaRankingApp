import { List } from 'immutable';
import { AppState, UserAction } from './types';
import { users } from '../utils/userData';

const sorted = Object.values(users)
  .sort((a, b) => {
    if (b.bananas === a.bananas) {
      return a.name.localeCompare(b.name);
    }
    return b.bananas - a.bananas;
  })
  .map((user, index) => ({ ...user, index: index + 1 }));
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
