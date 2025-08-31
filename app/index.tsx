import { FlatList } from 'react-native';
import { users } from '../data/users';
import UserCard from '../components/userCard';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          onPress={() => router.push({ pathname: `/${item.id}`, params: item })}
        />
      )}
    />
  );
}