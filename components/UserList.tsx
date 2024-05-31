import { FC, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { User } from '../store/types';

interface UserItemProps {
  user: User;
  highlight: boolean;
  index: number;
}

const UserItem: React.FC<UserItemProps> = ({ user, highlight, index }) => (
  <View style={highlight ? styles.itemHighlight : styles.item}>
    <View style={{ width: '20%', backgroundColor: 'lightyellow' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        {user.index ?? index + 1}
      </Text>
    </View>
    <View style={{ width: '40%', backgroundColor: 'lightpink' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        {user.name}
      </Text>
    </View>
    <View style={{ width: '40%', backgroundColor: 'lavender' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
        {user.bananas} 🍌
      </Text>
    </View>
  </View>
);

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
    <UserItem user={item} highlight={item.name === searchedUsername} index={index} />
  );

  return (
    <View style={styles.container}>
      {users.size === 0 ? (
        <Text>No users to display</Text>
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Name
              </Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Rank
              </Text>
            </View>
            <View style={{ width: '40%' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                Number of 🍌
              </Text>
            </View>
          </View>

          <FlatList
            data={[...users]}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.uid}`}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
  },
  itemHighlight: {
    backgroundColor: 'yellow',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
});

export default UserList;
