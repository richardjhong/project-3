import React, { createContext, useState, useContext, useEffect } from 'react';
import { getSavedCountries, saveCountries } from './localStorage';

export const SearchContext = React.createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider= ({children})=>{
    const [searches, setSearches] = useState(getSavedCountries());

    useEffect(() => {
      return () => saveCountries(searches);
    });

    const addSearch = (search)=>{
        setSearches([search,...searches]);
        saveCountries(searches);
        
    }
    const updateSearch = (search)=>{
      const index=searches.findIndex(val=>val.name===search.name);
      searches[index]=search;
      saveCountries(searches);
    }

  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    <SearchContext.Provider value={{ searches, addSearch,updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

