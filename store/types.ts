import { List } from 'immutable';

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
};

export type SetUsersAction = {
  type: 'SET_USERS';
  payload: User[];
};

export type UserAction = SetUsersAction;
