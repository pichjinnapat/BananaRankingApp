import { FC, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { User } from '../../store/types';
import UserItem from './UserItem';
import { RootState } from '../../store';

const UserList: FC<{ searchedUsername: string }> = ({ searchedUsername }) => {
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

  return (
    <Container>
      {users.size === 0 ? (
        <Text>No users to display</Text>
      ) : (
        <>
          <HeaderContainer>
            <View style={{ width: '20%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Rank
              </Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Name
              </Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Number of 🍌
              </Text>
            </View>
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
