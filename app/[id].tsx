import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

type User = {
  id: string;
  name: string;
  status: 'active' | 'inactive' | string;
  createdAt: string;
};

export default function UserDetailScreen() {
  const params = useLocalSearchParams<{ id: string; name?: string; status?: string; createdAt?: string }>();

  const user: User = {
    id: String(params.id),
    name: (params.name as string) ?? 'Unknown',
    status: (params.status as string) ?? 'inactive',
    createdAt: (params.createdAt as string) ?? '',
  };

  const createdLabel = user.createdAt
  ? new Date(user.createdAt).toLocaleDateString()
  : '-';

  return (
    <>
      <Stack.Screen />
      <View style={styles.container}>
        <Text style={styles.title}>{user.name}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.value}>{user.id}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.badge, user.status === 'active' ? styles.active : styles.inactive]}>
            {user.status}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>{createdLabel}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        marginLeft: 15,
        marginRight: 30,
    },
    label: {
        fontSize: 14,
        color: '#555'
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        textTransform: 'capitalize'
    },
    active: {
        backgroundColor: '#d9f2e0',
        color: '#1a7f37'
    },
    inactive: {
        backgroundColor: '#ffcccc',
        color: '#cc0000'
    },
});