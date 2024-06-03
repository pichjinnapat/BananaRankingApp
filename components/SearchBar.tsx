import { View, Text } from 'react-native';
import StyledTextInput from './StyledTextInput';
import StyledButton from './StyledButton';
import styled from 'styled-components/native';
import { RootState, store } from '../store';
import { useDispatch } from '../utils/hooks/useDispatch';
import { fuzzySearch } from '../utils/fuzzySearch';
import { initialState } from '../store/reducer';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const { sortedUsers } = store.getState();
  const username = useSelector((state: RootState) => state.username);
  const isFuzzySearch = useSelector((state: RootState) => state.isFuzzySearch);
  const dispatch = useDispatch();

  const handleTextChange = (text: string) => {
    if (text.length <= 0) {
      dispatch({ type: 'SET_USERNAME', payload: '' });
    }
    dispatch({ type: 'SET_USERNAME', payload: text });
  };

  const handleSearch = async (username: string) => {
    dispatch({ type: 'SET_SORT', payload: initialState.sort });

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

  return (
    <Container>
      <StyledTextInput
        onChangeText={handleTextChange}
        value={username}
        placeholder='Enter Username'
        blurOnSubmit
      />
      <StyledButton onPress={() => handleSearch(username)}>
        <StyledText>Search</StyledText>
      </StyledButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  column-gap: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledText = styled(Text)`
  color: #fff;
  text-align: center;
`;

export default SearchBar;
