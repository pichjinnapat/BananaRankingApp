import { useState } from 'react';
import { View, Text } from 'react-native';
import StyledTextInput from './StyledTextInput';
import StyledButton from './StyledButton';
import styled from 'styled-components/native';

const SearchBar = ({ onSearch }: { onSearch: (username: string) => void }) => {
  const [username, setUsername] = useState('');

  return (
    <Container>
      <StyledTextInput
        onChangeText={setUsername}
        value={username}
        placeholder='Enter Username'
      />
      <StyledButton onPress={() => onSearch(username)}>
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
