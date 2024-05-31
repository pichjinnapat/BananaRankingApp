import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';

type StyledButtonProps = PressableProps;

const StyledComponent = styled(Pressable)`
  background-color: red;
  padding: 10px 20px;
  border-radius: 5px;
`;

const StyledButton = (props: StyledButtonProps) => {
  return <StyledComponent {...props} />;
};

export default StyledButton;
