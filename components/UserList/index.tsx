import { FC, useEffect } from 'react';
import { View, Text, FlatList, Alert, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { User } from '../../store/types';
import UserItem from './UserItem';
import { RootState } from '../../store';
import { SortDirection, SortType } from '../../types';

type UserListProps = {
  searchedUsername: string;
  onSort: (type: SortType, direction: SortDirection) => void;
  sort: { type: SortType; direction: SortDirection };
};

const UserList: FC<UserListProps> = ({ searchedUsername, onSort, sort }) => {
  const users = useSelector((state: RootState) => state.listUsers);

  useEffect(() => {
    if (searchedUsername && !users.find((u) => u.name === searchedUsername)) {
      Alert.alert(
        'Error',
        'This user name does not exist! Please specify an existing user name!',
      );
    }
  }, [searchedUsername, users]);

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <UserItem
      user={item}
      highlight={item.name.toLowerCase() === searchedUsername.toLowerCase()}
      index={index}
    />
  );

  const handleSort = (type: SortType) => () => {
    if (sort.type === type) {
      if (sort.direction === 'asc') {
        sort.direction = 'desc';
      } else {
        sort.direction = 'asc';
      }
    } else {
      sort.type = type;
      sort.direction = 'desc';
    }

    onSort(sort.type, sort.direction);
  };

  return (
    <Container>
      {users.size === 0 ? (
        <Text>No users to display</Text>
      ) : (
        <>
          <HeaderContainer>
            <View style={{ width: '20%' }}>
              <StyledText>Rank</StyledText>
            </View>
            <Pressable style={{ width: '40%' }} onPress={handleSort('name')}>
              <StyledText>
                Name {sort.type === 'name' && (sort.direction === 'asc' ? '⬆️' : '⬇️')}
              </StyledText>
            </Pressable>
            <Pressable style={{ width: '40%' }} onPress={handleSort('banana')}>
              <StyledText>
                Number of 🍌{' '}
                {sort.type === 'banana' && (sort.direction === 'asc' ? '⬆️' : '⬇️')}
              </StyledText>
            </Pressable>
          </HeaderContainer>

          <FlatList
            data={[...users]}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.uid}`}
          />
        </>
      )}
    </Container>
  );
};

const StyledText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const Container = styled(View)`
  padding: 20px;
  background-color: white;
  width: 100%;
  flex: 1;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

const HeaderContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  padding: 10px 20px;
`;

export default UserList;
