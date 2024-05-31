import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';

type StyledButtonProps = PressableProps;

const StyledComponent = styled(Pressable)`
  height: 60px;
  background-color: #3e4b7b;
  padding: 10px 20px;
  border-radius: 10px;
  border-bottom-width: 2px;
  border-bottom-color: #1b2134;
  justify-content: center;
`;

const StyledButton = (props: StyledButtonProps) => {
  return <StyledComponent {...props} />;
};

export default StyledButton;
