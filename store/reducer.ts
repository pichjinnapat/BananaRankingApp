import { List } from 'immutable';
import { AppState, Action } from './types';
import { users } from '../utils/userData';

const sorted = Object.values(users)
  .sort((a, b) => {
    if (b.bananas === a.bananas) {
      return a.name.localeCompare(b.name);
    }
    return b.bananas - a.bananas;
  })
  .map((user, index) => ({ ...user, index: index + 1 }));

export const initialState: AppState = {
  sortedUsers: List(sorted),
  listUsers: List(sorted.slice(0, 10)),
  username: '',
  isFuzzySearch: false,
  sort: { type: 'banana', direction: 'desc' },
};

export const reducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, listUsers: List(action.payload) };
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_FUZZY_SEARCH':
      return { ...state, isFuzzySearch: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};
