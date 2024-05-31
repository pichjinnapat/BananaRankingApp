import { FC } from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import SearchIcon from '../assets/icons/SearchIcon';

type StyledTextInputProps = TextInputProps;

const Container = styled(View)`
  position: relative;
  display: flex;
  flex: 1;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: #fff;
  padding: 10px 20px 10px 40px;
  border-bottom-width: 2px;
  border-bottom-color: #d1d3d4;
  font-size: 14px;
`;

const StyledTextInput = (props: StyledTextInputProps) => {
  return (
    <Container>
      <SearchIcon style={{ position: 'absolute', top: 18, left: 10 }} />
      <StyledInput {...props} />
    </Container>
  );
};

export default StyledTextInput;
