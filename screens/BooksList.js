import React, {useEffect, useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView 
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getBooks, addBookmark, removeBookmark } from '../redux/action';

const BooksListApp = () => {
  const { books, bookmarks } = useSelector(state => state.booksReducer);

  const dispatch = useDispatch();

  const fetchBooks = () => dispatch(getBooks());
  const addToBookmarkList = book => dispatch(addBookmark(book));
  const removeFromBookmarkList = book => dispatch(removeBookmark(book));

  const handleAddBookmark = book => {
    addToBookmarkList(book);
  };
  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };
  
  const ifExist = book => {
    if (bookmarks.filter(item => item.id === book.id).length > 0)
    {
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{ marginVertical: 12 }}>
        <view style={{ flexDirection: 'row', flex: 1 }}>
          {/* Book Cover */}
          <Image 
            source={{ uri: item.image_url }}
            resizeMode='cover'
            style={{ width: 100, height: 150, borderRadius: 10 }}
          />
          {/* {Book Metadata} */}
          <View style={{ flex: 1, marginLeft: 0 }}>
            <View>
              <Text style={{ font: 22, paddingRight: 16, color: 'white' }}>{item.title}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center'
              }}
            >
              <MaterialCommunityIcons
                color='#64676D'
                name='book-open-page-variant'
                size={20}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.num_pages}
              </Text>
              <MaterialCommunityIcons
                color='#64676D'
                name='star'
                size={20}
                style={{ paddingLeft: 16 }}
              />
              <Text style={{ fontSize: 14, paddingLeft: 10, color: '#64676D' }}>
                {item.rating}
              </Text>
            </View>
  
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                onPress={() => 
                  ifExist(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
                }
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  padding: 2,
                  backgroundColor: ifExist(item)? '#F96D41':'#2D3038',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40
                }}
              >
                <MaterialCommunityIcons
                  color= {ifExist(item) ? 'white' : '#64676D'}
                  size={24}
                  name= {ifExist(item) ? 'bookmark-outline' : 'bookmark'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </view>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
      <View style = {{ flex: 1, paddingHorizontal: 16 }}>
        <Text style = {{ color: 'white', font:22 }}>BestSellers</Text>
        <View style = {{ flex:1 , marginTop: 8 }}>
          <FlatList
            data={ books }
            keyExtractor={ item => item.id.toString() }
            renderItem={ renderItem }
            showsVerticalScrollIndicator={ false }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}



export default BooksListApp;