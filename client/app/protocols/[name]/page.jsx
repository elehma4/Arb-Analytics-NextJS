"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useRouter } from 'next/router';
import {getProtocols} from '../../../slices/mainSlice'

const DetailsPage = ({params}) => {

  const protocols = useSelector(state=>state.main.protocols)

  const [protocol, setProtocol] = useState(null);

  if(params){

    useEffect(() => {
      if (params && params.name) {
        console.log(params.name);
    
        const originalString = params.name;
        const modifiedString = originalString.replace(/%20/g, ' ');
    
        console.log(modifiedString);

        console.log(protocols)
    
        const foundProtocol = protocols.find((protocol) => {
  
          console.log(protocol.name, modifiedString)
          return protocol.name === modifiedString});
        setProtocol(foundProtocol);
        console.log(protocol)
      }
    }, []);

  }

  

  

  return (
    
    <>
    {protocol && (
      <>
      <div>{protocol.name}</div>
      <div>{protocol.description}</div>
      </>
    )}
      {/* Rest of the details component */}
      details
    </>
  );
};

export default DetailsPage;
