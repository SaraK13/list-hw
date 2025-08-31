import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function SortButton({ label, active, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.sortBtn, active && styles.sortBtnActive]}>
      <Text style={[styles.sortBtnText, active && styles.sortBtnTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    sortBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
    },
    sortBtnActive: {
        backgroundColor: '#cce0ff',
        borderColor: '#005ce6',
    },
    sortBtnText: {
        fontSize: 13,
    },
    sortBtnTextActive: {
        fontWeight: 700,
    }
});
