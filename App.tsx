import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import { useDispatch } from './utils/hooks/useDispatch';
import { StyleSheet, View } from 'react-native';
import { SortDirection, SortType } from './types';

const App = () => {
  const [searchedUsername, setSearchedUsername] = useState('');
  const [sort, setSort] = useState<{
    type: SortType;
    direction: SortDirection;
  }>({ type: 'banana', direction: 'desc' });
  const sortedUsers = store.getState().sortedUsers;
  const dispatch = useDispatch();

  const handleSearch = async (username: string) => {
    setSearchedUsername(username);

    try {
      const searchedUser = sortedUsers.find(
        (user) => user.name.toLowerCase() === username.toLowerCase(),
      );

      if (!searchedUser) {
        alert('This user name does not exist! Please specify an existing user name!');
        return;
      }

      const searchedUserIndex = sortedUsers.indexOf(searchedUser);

      let topUsers = [...sortedUsers].slice(0, 10);

      if (!topUsers.find((user) => user.name.toLowerCase() === username.toLowerCase())) {
        topUsers.pop();
        topUsers.push({ ...searchedUser, index: searchedUserIndex + 1 });
        topUsers = topUsers.sort((a, b) => b.bananas - a.bananas);

        topUsers = topUsers.map((user, index) => ({
          ...user,
          index: user.index ?? index + 1,
        }));
      } else {
        topUsers = topUsers.map((user, index) => ({ ...user, index: index + 1 }));
      }

      dispatch({ type: 'SET_USERS', payload: [...topUsers] });
    } catch (error) {
      console.error('Error handling user data:', error);
    }
  };

  const handleSort = (type: SortType, direction: SortDirection) => {
    const sorted = [...sortedUsers]
      .sort((a, b) => {
        if (type === 'banana') {
          return direction === 'asc' ? a.bananas - b.bananas : b.bananas - a.bananas;
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
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <UserList searchedUsername={searchedUsername} onSort={handleSort} sort={sort} />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
});

export default App;
