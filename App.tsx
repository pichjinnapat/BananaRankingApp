import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import { useDispatch } from './utils/hooks/useDispatch';
import { StyleSheet, Text, View } from 'react-native';
import { SortDirection, SortType } from './types';
import { fuzzySearch } from './utils/fuzzySearch';
import StyledSwitch from './components/StyledSwitch';
import styled from 'styled-components/native';

const App = () => {
  const [searchedUsername, setSearchedUsername] = useState('');
  const [isFuzzySearch, setIsFuzzySearch] = useState(false);
  const [sort, setSort] = useState<{
    type: SortType;
    direction: SortDirection;
  }>({ type: 'banana', direction: 'desc' });
  const sortedUsers = store.getState().sortedUsers;
  const dispatch = useDispatch();

  const handleSearch = async (username: string) => {
    setSearchedUsername(username);

    try {
      if (isFuzzySearch) {
        const matchedUsers = fuzzySearch(username, [...sortedUsers]);

        if (matchedUsers.length === 0) {
          alert('This user name does not exist! Please specify an existing user name!');
          return;
        }

        const topUsers = matchedUsers.slice(0, 10);
        dispatch({ type: 'SET_USERS', payload: [...topUsers] });
      } else {
        const searchedUser = sortedUsers.find(
          (user) => user.name.toLowerCase() === username.toLowerCase(),
        );

        if (!searchedUser) {
          alert('This user name does not exist! Please specify an existing user name!');
          return;
        }

        let topUsers = [...sortedUsers].slice(0, 10);

        if (
          !topUsers.find((user) => user.name.toLowerCase() === username.toLowerCase()) &&
          !!username
        ) {
          topUsers.pop();
          topUsers.push(searchedUser);
          topUsers = topUsers.sort((a, b) => b.bananas - a.bananas);
        }

        dispatch({ type: 'SET_USERS', payload: [...topUsers] });
      }
    } catch (error) {
      console.error('Error handling user data:', error);
    }
  };

  const handleSetFuzzySearch = (val: boolean) => {
    setIsFuzzySearch(val);
    dispatch({ type: 'SET_USERS', payload: [...sortedUsers].slice(0, 10) });
  };

  const handleSort = (type: SortType, direction: SortDirection) => {
    setSort({ type, direction });
    const sorted = [...sortedUsers]
      .sort((a, b) => {
        if (type === 'banana') {
          return direction === 'asc' ? a.bananas - b.bananas : b.bananas - a.bananas;
        } else if (type === 'rank') {
          return direction === 'asc' ? a?.index! - b?.index! : b?.index! - a?.index!;
        }
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      })
      .slice(0, 10);

    dispatch({ type: 'SET_USERS', payload: sorted });
  };

  return (
    <Provider store={store}>
      <Container>
        <SwitchContainer>
          <Text style={{ marginRight: 5 }}>Fuzzy Search</Text>
          <StyledSwitch value={isFuzzySearch} onValueChange={handleSetFuzzySearch} />
        </SwitchContainer>
        <SearchBar onSearch={handleSearch} />
        <UserList searchedUsername={searchedUsername} onSort={handleSort} sort={sort} />
      </Container>
    </Provider>
  );
};

const Container = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 20px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #f6f6f6;
`;

const SwitchContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default App;
