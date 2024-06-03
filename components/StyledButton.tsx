import { useState } from 'react';
import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';

type StyledButtonProps = PressableProps & {
  children: React.ReactNode;
};

const StyledComponent = styled(Pressable)<{ pressed: 'in' | 'out' | 'idle' }>`
  height: 60px;
  padding: 10px 20px;
  border-radius: 10px;
  border-bottom-width: 2px;
  border-bottom-color: #1b2134;
  justify-content: center;
  background-color: ${({ pressed }) => {
    if (pressed === 'in') return '#2b3658';
    return '#3e4b7b';
  }};
`;

const StyledButton = ({ children, ...props }: StyledButtonProps) => {
  const [pressed, setPressed] = useState<'in' | 'out'>('out');

  return (
    <StyledComponent
      {...props}
      pressed={pressed}
      onPressIn={() => setPressed('in')}
      onPressOut={() => setPressed('out')}
    >
      {children}
    </StyledComponent>
  );
};

export default StyledButton;
