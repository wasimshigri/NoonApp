import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/Navigation';
import { SearchItem} from '@/types';
import SearchInput from './SearchInput';
import {useSearch} from '@/hooks/api/useSearch';
import TextBold from '@/components/atom/text/TextBold';
import TextRegular from '@/components/atom/text/TextRegular';
import colors from '@/theme/colors';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

const SearchScreen = ({
  navigation,
}: {
  navigation: SearchScreenNavigationProp;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {data: searchResults, isLoading, error} = useSearch(searchQuery);
  const renderItem = ({item}: {item: SearchItem}) => {
    if (item.menuItem) {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          key={item.menuItem.id}
          onPress={() => handleItemClick(item)}>
          <TextBold>{item.menuItem.name}</TextBold>
          <TextRegular style={styles.itemDescription}>
            {item.menuItem.description}
          </TextRegular>
          <TextRegular style={styles.itemPrice}>
            ${item.menuItem.price.toFixed(2)}
          </TextRegular>
        </TouchableOpacity>
      );
    } else if (item.outlet) {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          key={item.outlet.id}
          onPress={() => handleItemClick(item)}>
          <TextBold>{item.outlet.name}</TextBold>
          <TextRegular style={styles.itemDescription}>{item.outlet.description}</TextRegular>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const handleItemClick = (item: SearchItem) => {
    if (item.menuItem) {
      navigation.navigate('OutletDetails', {outletId: item.menuItem.outletId});
    } else if (item.outlet) {
      navigation.navigate('OutletDetails', {outletId: item.outlet.id});
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search outlets or menu..."
        onSearch={setSearchQuery}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>Error: {error.message}</Text>}
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemDescription: {
    color: 'gray',
    marginBottom: 4,
  },
  itemPrice: {
    color: 'green',
  },
});
export default SearchScreen;
