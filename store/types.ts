import { List } from 'immutable';
import { SortDirection, SortType } from '../types';

export type User = {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
  index?: number;
};

export type AppState = {
  sortedUsers: List<User>;
  listUsers: List<User>;
  username: string;
  isFuzzySearch: boolean;
  sort: { type: SortType; direction: SortDirection };
};

export type SetUsersAction = {
  type: 'SET_USERS';
  payload: User[];
};

export type SetUsernameAction = {
  type: 'SET_USERNAME';
  payload: string;
};

export type SetFuzzySearchAction = {
  type: 'SET_FUZZY_SEARCH';
  payload: boolean;
};

export type SetSortAction = {
  type: 'SET_SORT';
  payload: { type: SortType; direction: SortDirection };
};

export type Action =
  | SetUsersAction
  | SetUsernameAction
  | SetFuzzySearchAction
  | SetSortAction;
