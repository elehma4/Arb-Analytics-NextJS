"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import Star from './Star'

const Search = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState('');
  const [showFiltered, setShowFiltered] = useState(false);
  const [filteredProtocols, setFilteredProtocols] = useState([]);

  const protocols = useSelector((state) => state.main.protocols);

  const handleSearchInput = (event) => {
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
              <Link href={`/protocols/${protocol.name}`} key={protocol.id}>
                <div className="flex my-1">
                  <img className="w-7 mr-2 rounded-full" src={protocol.logo} alt="protocol logo" />
                  <div>{protocol.name}</div>
                </div>
              </Link>
              </div>
            ))}
          </div>
        )}

        <div className="h-1/2 p-4 text-white flex justify-apart items-center w-full">
          <p className="flex justify-start items-center w-1/2 mx-3 text-sm">
            Powered by <img src="/assets/defillama.webp" className="h-9 mx-2" />
          </p>
        </div>
      </form>
    </>
  );
};

export default Search;
