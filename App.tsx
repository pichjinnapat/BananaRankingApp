import { Provider } from 'react-redux';
import { store } from './store';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';
import FuzzySearchToggle from './components/FuzzySearchToggle';

const App = () => {
  return (
    <Provider store={store}>
      <Container os={Platform.OS}>
        <FuzzySearchToggle />
        <SearchBar />
        <UserList />
      </Container>
    </Provider>
  );
};

const Container = styled(View)<{ os: Platform['OS'] }>`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #f6f6f6;
  padding-top: ${({ os }) => {
    if (os === 'ios') return '60px';
    return '20px';
  }};
`;

export default App;
