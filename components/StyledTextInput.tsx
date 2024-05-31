import { FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';

type StyledTextInputProps = TextInputProps;

const StyledInput = styled(TextInput)`
  border-width: 1px;
  padding: 8px;
  border-color: gray;
  border-radius: 5px;
  padding: 10px 20px;
`;

const StyledTextInput = (props: StyledTextInputProps) => {
  return <StyledInput {...props} />;
};

export default StyledTextInput;
