import { User } from './types';

export const setUsers = (users: User[]) => {
  return { type: 'SET_USERS', payload: users };
};

export const setUsername = (username: string) => {
  return { type: 'SET_USERNAME', payload: username };
};

export const setFuzzySearch = (isFuzzySearch: boolean) => {
  return { type: 'SET_FUZZY_SEARCH', payload: isFuzzySearch };
};

export const setSort = (sort: { type: string; direction: string }) => {
  return { type: 'SET_SORT', payload: sort };
};
