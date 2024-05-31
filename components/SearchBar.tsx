import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StyledTextInput from './StyledTextInput';
import StyledButton from './StyledButton';

const SearchBar = ({ onSearch }: { onSearch: (username: string) => void }) => {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <StyledTextInput
        onChangeText={setUsername}
        value={username}
        placeholder='Enter Username'
      />
      <StyledButton onPress={() => onSearch(username)}>
        <Text>Click Here</Text>
      </StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
  },
});

export default SearchBar;
