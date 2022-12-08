import React, { useState, useEffect } from 'react';
import { searchImage } from '../../utils/API';
import './SingleCountryHeader.scss';
import Autocomplete from 'react-autocomplete';
import {useQuery} from '@apollo/client';
import {QUERY_COUNTRY_NAME, QUERY_COUNTRIES} from '../../utils/queries';

const SingleCountryHeader = () => {

  //For Search country
  const [searchImgInput, setSearchImgInput] = useState("");
  const [searchedImgs, setSearchedImgs] = useState([]);
  const {loading, data}= useQuery(QUERY_COUNTRY_NAME);
  const countries=data?.countries||[];
  console.log(countries);
  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!searchImgInput) {
      return false;
    }
    try {
      const response = await searchImage(searchImgInput);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const items = await response.json();

      //Randomly pick 4 images out of 10 results
      const newImgs = [];
      for (let i = 0; i < 4; i++) {
        const newImg = items.results[Math.floor(Math.random() * items.results.length)];
        newImgs.push(newImg);
      }
      console.log(newImgs);
      //Save search image to searchedImgs
      setSearchedImgs(newImgs);
    }
    catch (err) {
      console.error(err);
    }

  };


  return (
    <div className="bg-info text-dark mb-4 display-flex align-center">
      <div>
        <div className="header-container max-h-44">
          <div className='relative flew-col'>
            <div className="flex flex-row max-h-44 max-w-lg">
              {searchedImgs.map((val) => {
                return (
                  <img
                    className="w-full"
                    src={val.urls.regular}
                    alt={val.alt_description}
                  />
                );
              })}
            </div>
            <div className='country-text border border-2 border-green_pear font-extrabold text-4xl px-4 py-1 bg-blustery_blue absolute bottom-10 left-10'>
              <h1 >{searchImgInput.toUpperCase()}</h1>
            </div>
          </div>
          <div className="flex flex-row mt-1 mx-2">

            <Autocomplete
              getItemValue={(item) => item.label}
              items={[
                { label: 'apple' },
                { label: 'banana' },
                { label: 'pear' }
              ]}
              renderItem={(item, isHighlighted) =>
                
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.label}
                </div>
              }
               value={searchImgInput}
               onChange={(e) => setSearchImgInput(e.target.value)}
               onSelect={(val) => searchImgInput = val}
              
            />
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="btn ml-1 px-3 py-1 bg-pastel_green rounded text-blustery_blue"
            >
              Search
            </button>
{/* 
            <input
              className="w-1/5 border rounded border-text-blustery_blue"
              type="text"
              placeholder="Search Country"
              value={searchImgInput}
              onChange={(e) => setSearchImgInput(e.target.value)}
            /> */}
            
          </div>
        </div>
      </div>
    </div >
  );
};

export default SingleCountryHeader;
