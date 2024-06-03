import { View, Text, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { User } from '../../store/types';
import UserItem from './UserItem';
import { RootState } from '../../store';
import { SortDirection, SortType } from '../../types';
import { useDispatch } from '../../utils/hooks/useDispatch';

const UserList = () => {
  const sortedUsers = useSelector((state: RootState) => state.sortedUsers);
  const users = useSelector((state: RootState) => state.listUsers);
  const searchedUsername = useSelector((state: RootState) => state.username);
  const sort = useSelector((state: RootState) => state.sort);
  const dispatch = useDispatch();

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <UserItem
      user={item}
      highlight={item.name.toLowerCase() === searchedUsername.toLowerCase()}
      index={index}
    />
  );

  const handleSortChange = (type: SortType) => () => {
    let newSort = { type, direction: 'asc' };
    if (sort.type === type) {
      if (sort.direction === 'asc') {
        newSort.direction = 'desc';
      } else {
        newSort.direction = 'asc';
      }
    } else {
      newSort.type = type;
      newSort.direction = 'desc';
    }

    setSortedUsers(newSort.type, newSort.direction as SortDirection);
  };

  const setSortedUsers = (type: SortType, direction: SortDirection) => {
    dispatch({ type: 'SET_SORT', payload: { type, direction } });
    const sorted = [...sortedUsers]
      .sort((a, b) => {
        if (type === 'banana') {
          return direction === 'asc' ? a.bananas - b.bananas : b.bananas - a.bananas;
        } else if (type === 'rank') {
          return direction === 'asc' ? a?.index! - b?.index! : b?.index! - a?.index!;
        }
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      })
      .slice(0, 10);

    dispatch({ type: 'SET_USERS', payload: sorted });
  };

  return (
    <Container>
      {users.size === 0 ? (
        <Text>No users to display</Text>
      ) : (
        <>
          <HeaderContainer>
            <Pressable
              style={{
                width: '20%',
                borderRightWidth: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onPress={handleSortChange('rank')}
            >
              <StyledText>Rank</StyledText>
              <StyledText>
                {sort.type === 'rank' && (sort.direction === 'asc' ? '⬆️' : '⬇️')}
              </StyledText>
            </Pressable>
            <Pressable
              style={{
                width: '40%',
                borderRightWidth: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onPress={handleSortChange('name')}
            >
              <StyledText>Name</StyledText>
              <StyledText>
                {sort.type === 'name' && (sort.direction === 'asc' ? '⬆️' : '⬇️')}
              </StyledText>
            </Pressable>
            <Pressable
              style={{ width: '40%', flexDirection: 'column', alignItems: 'center' }}
              onPress={handleSortChange('banana')}
            >
              <StyledText>Number of 🍌</StyledText>
              <StyledText>
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
