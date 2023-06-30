// import React, {useState, useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {getProtocols} from '../slices/mainSlice'

// const Search = () => {

//     const dispatch = useDispatch()

//     const protocols = useSelector(state=>state.main.protocols)


//     useEffect(() => {
      
//         dispatch(getProtocols())
      
//     }, [])

    
    
//   return (
//    <>
//     <ul>
//         {protocols.map(protocol=>{
//            return <li className="bg-gray-900 text-white">{protocol.name}</li>
//         })}
//     </ul>
//    </>
//   )
// }

// export default Search
