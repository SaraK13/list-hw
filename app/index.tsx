import { FlatList, View, TextInput, StyleSheet } from 'react-native';
import { users as mockUsers } from '../data/users';
import UserCard from '../components/userCard';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const [users, setUsers] = useState(mockUsers);
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  
  const router = useRouter();

  useEffect(() => {
    const lower = query.toLowerCase();
    const filtered = users.filter((u) =>
      u.name.toLowerCase().startsWith(lower)
    );
    setFilteredUsers(filtered);
  }, [query, users]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by name..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => router.push({ pathname: '/[id]', params: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 12,
    margin: 12,
  },
});