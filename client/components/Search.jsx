"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import Star from './Star'
import axios from 'axios';

const Search = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredProtocols, setFilteredProtocols] = useState([]);
  const [searchedProtocol, setSearchedProtocol] = useState("")

  const protocols = useSelector((state) => state.main.protocols);

  const handleSearchInput = async (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    if (inputValue === '') {
      setShowFiltered(false);
      setFilteredProtocols([]);
    } else {
      setShowFiltered(true);
      const filtered = protocols.filter((protocol) =>
        protocol.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredProtocols(filtered);
    }
  };

  const handleSubmit = async () => {
    if (searchInput !== ''){
      try {
        const response = await axios.post('http://localhost:3001/performance_logs', {
          event_category: 'protocol_search',
          event_type: 'search',
          event_value: searchedProtocol,
          page_url: window.location.href,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error logging search: ', error);
      }
    }
  }

  const submitToDB = (protocolName) => {
    setSearchedProtocol(protocolName);
  }

  useEffect(() => {
    handleSubmit();
  }, [searchedProtocol])

  useEffect(() => {
    console.log(searchInput);
    console.log(filteredProtocols);
  }, [searchInput, filteredProtocols]);

  return (
    <>
      <form className="bg-gray-900 relative rounded-3xl w-full h-24 flex items-start justify-center mx-2 flex-col">
        <div className="w-full h-1/2 rounded-t-3xl outline-none bg-black text-white p-2 px-4 flex items-center">
          <BsSearch className="mr-2 text-gray-400" />
          <input
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
            value={searchInput}
            onChange={handleSearchInput}
            type="search"
            placeholder="Search"
          />
        </div>
        {showFiltered && (
          <div className="z-10 absolute bg-black w-full max-h-44 overflow-auto text-white top-12 px-4 py-2 rounded-b-3xl shadow-lg">
            {filteredProtocols.map((protocol) => (
              <div className="flex">
              <Star item={protocol}/>
              <button onClick={() => submitToDB(protocol.name)}>
              <Link href={`/protocols/${protocol.name}`} key={protocol.id}>
                <div className="flex my-1">
                  <img className="w-7 mr-2 rounded-full" src={protocol.logo} alt="protocol logo" />
                  <div>{protocol.name}</div>
                </div>
              </Link>
              </button>
              </div>
            ))}
          </div>
        )}

        <div className="h-1/2 p-4 text-white flex justify-apart items-center w-full">
          <p className="flex justify-start items-center w-1/2 mx-3 text-sm">
            Powered by <img src="/assets/defillama.webp" className="h-9 mx-2" /> & <img src="/assets/coingecko-logo.png" className='h-[34px] ml-3' />
          </p>
        </div>
      </form>
    </>
  );
};

export default Search;
