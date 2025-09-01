import { FlatList, View, TextInput, StyleSheet } from 'react-native';
import { users as mockUsers } from '../data/users';
import type { User } from '../types/user';
import UserCard from '../components/userCard';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { sortUsers, type SortKey, type SortOrder } from '../utils/userUtils';
import SortButton from '../components/sortButton';

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [sortKey, setSortKey] = useState<SortKey>('none');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const router = useRouter();

  const handleSortPress = (key: SortKey) => {
    if (key === 'none') {
      setSortKey('none');
      setSortOrder('desc');
      return;
    }
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  useEffect(() => {
    const lower = query.toLowerCase();
    const filtered = users.filter((u) =>
      u.name.toLowerCase().startsWith(lower)
    );
    const sorted = sortUsers(filtered, { key: sortKey, order: sortOrder });
    setFilteredUsers(sorted);
  }, [users, query, sortKey, sortOrder]);

  const dateLabel = () => {
    if (sortKey !== 'date') return 'Date';
    return sortOrder === 'asc' ? 'Date (Oldest first)' : 'Date (Newest first)';
  };

  const statusLabel = () => {
    if (sortKey !== 'status') return 'Status';
    return sortOrder === 'asc' ? 'Status (Active first)' : 'Status (Inactive first)';
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by name..."
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.sortRow}>
        <SortButton
          label="None"
          active={sortKey === 'none'}
          onPress={() => handleSortPress('none')}
        />
        <SortButton
          label={dateLabel()}
          active={sortKey === 'date'}
          onPress={() => handleSortPress('date')}
        />
        <SortButton
          label={statusLabel()}
          active={sortKey === 'status'}
          onPress={() => handleSortPress('status')}
        />
      </View>

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
  sortRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 12,
    marginBottom: 8,
  },
});