import { initialState, reducer } from '../reducer';
import {
  Action,
  AppState,
  SetFuzzySearchAction,
  SetSortAction,
  SetUsernameAction,
  SetUsersAction,
  User,
} from '../types';
import { setFuzzySearch, setSort, setUsername, setUsers } from '../actions';
import { List } from 'immutable';
import { SortType } from '../../types';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as Action)).toEqual(initialState);
  });

  it('should not modify state for unknown actions', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as SetUsersAction;
    expect(reducer(initialState, unknownAction)).toEqual(initialState);
  });

  describe('SET_USERS', () => {
    it('should handle SET_USERS', () => {
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
      const expectedState: AppState = {
        ...initialState,
        listUsers: List(users),
      };

      expect(reducer(initialState, setUsers(users) as SetUsersAction)).toEqual(
        expectedState,
      );
    });
  });

  describe('SET_USERNAME', () => {
    it('should handle SET_USERNAME', () => {
      const username = 'Alice';
      const expectedState: AppState = {
        ...initialState,
        username,
      };

      expect(reducer(initialState, setUsername(username) as SetUsernameAction)).toEqual(
        expectedState,
      );
    });
  });

  describe('SET_FUZZY_SEARCH', () => {
    it('should handle SET_FUZZY_SEARCH', () => {
      const isFuzzySearch = true;
      const expectedState: AppState = {
        ...initialState,
        isFuzzySearch,
      };

      expect(
        reducer(initialState, setFuzzySearch(isFuzzySearch) as SetFuzzySearchAction),
      ).toEqual(expectedState);
    });
  });

  describe('SET_SORT', () => {
    it('should handle SET_SORT', () => {
      const sort: SetSortAction['payload'] = { type: 'banana', direction: 'asc' };
      const expectedState: AppState = {
        ...initialState,
        sort,
      };

      expect(reducer(initialState, setSort(sort) as SetSortAction)).toEqual(
        expectedState,
      );
    });
  });
});
