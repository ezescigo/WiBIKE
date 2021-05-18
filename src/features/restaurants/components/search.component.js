import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Searchbar} from 'react-native-paper';

import {LocationContext} from '../../../services/location/location.context';

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: flex-start;
  justify-content: center;
  background-color: transparent;
`;

export const Search = ({isFavoritesToggled, onFavoritesToggle}) => {
  const {keyword, search} = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavoritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavoritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  )
}