import { List } from 'immutable';

export interface User {
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  name: string;
  stars: number;
  subscribed: boolean;
  uid: string;
  index?: number;
}

export interface AppState {
  sortedUsers: List<User>;
  listUsers: List<User>;
}

export interface SetUsersAction {
  type: 'SET_USERS';
  payload: User[];
}

export type UserAction = SetUsersAction;
