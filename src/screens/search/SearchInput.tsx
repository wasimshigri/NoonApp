import colors from '@/theme/colors';
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type SearchInputProps = {
  onSearch: (text: string) => void;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = 'Search...' }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedText, setDebouncedText] = useState<string>(searchText);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300); // 300 mili-secnds debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    onSearch(debouncedText);
  }, [debouncedText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
         placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
  },
});

export default SearchInput;
