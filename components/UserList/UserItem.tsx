import { View, Text } from 'react-native';
import { User } from '../../store/types';
import styled from 'styled-components/native';
import { ReactNode } from 'react';

type UserItemProps = {
  user: User;
  highlight: boolean;
  index: number;
};

const UserItemContainer = ({
  highlight,
  children,
}: {
  highlight: boolean;
  children: ReactNode;
}) => {
  return highlight ? (
    <StyledHighlightUserItem>{children}</StyledHighlightUserItem>
  ) : (
    <StyledUserItem>{children}</StyledUserItem>
  );
};

const UserItem: React.FC<UserItemProps> = ({ user, highlight, index }) => (
  <UserItemContainer highlight={highlight}>
    <View style={{ width: '20%' }}>
      <StyledText style={{ color: highlight ? 'white' : 'black' }}>
        {user.index ?? index + 1}
      </StyledText>
    </View>
    <View style={{ width: '40%' }}>
      <StyledText style={{ color: highlight ? 'white' : 'black' }}>
        {user.name}
      </StyledText>
    </View>
    <View style={{ width: '40%' }}>
      <StyledText style={{ color: highlight ? 'white' : 'black' }}>
        {user.bananas} 🍌
      </StyledText>
    </View>
  </UserItemContainer>
);

const StyledText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const StyledUserItem = styled(View)`
  padding: 20px;
  border-width: 1px;
  border-color: #e8e8e8;
  flex-direction: row;
  background-color: white;
`;

const StyledHighlightUserItem = styled(View)`
  padding: 20px;
  border-width: 1px;
  border-color: #e8e8e8;
  flex-direction: row;
  background-color: #3e4b7b;
`;

export default UserItem;
