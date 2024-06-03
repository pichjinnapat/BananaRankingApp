import { setFuzzySearch, setSort, setUsername, setUsers } from '../actions';
import { User } from '../types';

describe('actions', () => {
  it('should create an action to set users', () => {
    const users: User[] = [
      {
        name: 'Alice',
        bananas: 10,
        lastDayPlayed: '',
        longestStreak: 0,
        stars: 0,
        subscribed: false,
        uid: '',
      },
      {
        name: 'Bob',
        bananas: 5,
        lastDayPlayed: '',
        longestStreak: 0,
        stars: 0,
        subscribed: false,
        uid: '',
      },
    ];
    const expectedAction = {
      type: 'SET_USERS',
      payload: users,
    };
    expect(setUsers(users)).toEqual(expectedAction);
  });

  it('should create an action to set username', () => {
    const username = 'Alice';
    const expectedAction = {
      type: 'SET_USERNAME',
      payload: username,
    };
    expect(setUsername(username)).toEqual(expectedAction);
  });

  it('should create an action to set fuzzy search', () => {
    const isFuzzySearch = true;
    const expectedAction = {
      type: 'SET_FUZZY_SEARCH',
      payload: isFuzzySearch,
    };
    expect(setFuzzySearch(isFuzzySearch)).toEqual(expectedAction);
  });

  it('should create an action to set sort', () => {
    const sort = { type: 'banana', direction: 'asc' };
    const expectedAction = {
      type: 'SET_SORT',
      payload: sort,
    };
    expect(setSort(sort)).toEqual(expectedAction);
  });
});
