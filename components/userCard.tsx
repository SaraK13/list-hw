import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

type User = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
};

type Props = {
  user: User;
  onPress?: () => void;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE'); 
}

export default function UserCard({ user, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Status: </Text>
        <Text style={user.status === 'active' ? styles.active : styles.inactive}>
          {user.status}
        </Text>
      </View>
      <Text>Created: {formatDate(user.createdAt)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  active: {
    color: '#1a7f37'
  },
  inactive: {
      color: '#cc0000'
  },
});
