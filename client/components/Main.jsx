import React, { useEffect, useState, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import '../app/styles/main.css'
import {BsSearch} from 'react-icons/bs'
import { getProtocols, getUserFavorites } from '../slices/mainSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Search from './Search'
import Star from './Star'
import axios from 'axios'
import SortIcon from './SortIcon'
import {LuArrowUpDown, LuArrowDown, LuArrowUp} from 'react-icons/lu'
import { updateUserID } from '../slices/mainSlice';

const Main = ( {isSmallScreen} ) => {

  const startTime = performance.now(); // log start time

  const [marketData, setMarketData] = useState(null);
  const [dataType, setDataType] = useState('TVL')

  const dispatch = useDispatch();
  const userID = useSelector(state=>state.main.userID)
  const authID = useSelector(state=>state.auth.userId)
  const favorites = useSelector(state=>state.main.favorites)

  useEffect(() => {
    
    dispatch(updateUserID())
    
  }, [authID])
  

  useEffect(() => {
    dispatch(getUserFavorites(userID));
  }, [userID]);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [displayedProtocols, setDisplayedProtocols] = useState([])
  const [sortDirection, setSortDirection] = useState('default')
  const [sortTerm, setSortTerm] = useState('default')
  const [prevSortDirection, setPrevSortDirection] = useState('default');
  const [prevSortTerm, setPrevSortTerm] = useState('default')

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const topClass = windowHeight <= 777 ? 'top-[80%]' : 'top-[75%]';

  let chartClass = ''

  if (windowHeight <= 777) {
    chartClass = 'h-1/2';
  } else if (windowHeight > 777 && windowHeight <= 970) {
    chartClass = 'h-3/5';
  } else if (windowHeight > 970 && windowHeight <= 1200){
    chartClass = 'h-[70%]';
  } else {
    chartClass = 'h-[75%]';
  }

  useEffect(() => {
    const fetchStartTime = performance.now()
    dispatch(getProtocols()).then(() => {
      const fetchEndTime = performance.now();
      const fetchTime = fetchEndTime - fetchStartTime;
      console.log(`Fetching protocols took ${fetchTime}ms`);
      axios.post('http://localhost:3001/performance_logs', {
        event_category: 'page_load',
        event_type: 'load_time_protocols',
        event_value: fetchTime,
        page_url: window.location.href,
      });
    });
  }, [dispatch]);

  const protocols = useSelector((state) => state.main.protocols);

  async function fetchMarketData(dataType){
    let url;
    switch(dataType){
      case 'TVL':
        url = 'https://api.llama.fi/v2/historicalChainTvl/Arbitrum';
        break;
      case 'FEES':
        url = 'https://api.llama.fi/summary/fees/arbitrum?dataType=dailyFees';
        break;
      case 'PRICE':
        url = 'https://api.coingecko.com/api/v3/coins/arbitrum/market_chart?vs_currency=usd&days=max&interval=daily';
        break;
      default:
        throw new Error('Unknown data type')
    }

    const response = await axios.get(url);
    const data = response.data;

    let marketData = [];

    if(dataType === 'PRICE'){
      const {prices} = data;
      marketData = prices.map(price => ({
        time: price[0] / 1000, // convert ms to secs
        value: price[1]
      }));
    } else if (dataType === 'TVL') {
      marketData = data.map(datapoint => ({
        time: datapoint.date,
        value: datapoint.tvl
      }));
    } else if (dataType === 'FEES') {
      marketData = data.totalDataChart.map(datapoint => ({
        time: datapoint[0],  // Already in Unix timestamp format
        value: datapoint[1],
        color: 'blue'
      }));
    }

    return marketData;
  }
  fetchMarketData('TVL')

  useEffect(() => {
    fetchMarketData(dataType).then(data => setMarketData(data))
  }, [dataType]);

  const chartContainerRef = useRef();
  const chartRef = useRef(null);

  useEffect(() => {
    if(marketData === null){
      return;
    }

    console.log(`rendering chart`);

    if(chartRef.current){
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Create chart:
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#000033' },
        textColor: '#DDD'
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' }
      }
    })

    chartRef.current = chart;

    if(dataType === 'FEES'){
      const histogramSeries = chart.addHistogramSeries({
        color: 'rgba(56, 33, 110, 1)',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      })

      histogramSeries.setData(marketData)
    } else {
      const areaSeries = chart.addAreaSeries({
        lastValueVisible: false,
        crosshairMarkerVisible: false,
        lineColor: 'rgba(56, 33, 110, 1)',
        topColor: 'rgba(56, 33, 110, 0.6)',
        bottomColor: 'rgba(56, 33, 110, 0.1)', 
      });
      areaSeries.setData(marketData);

      const mainSeries = chart.addAreaSeries();
      mainSeries.setData(marketData);
    }

    const resizeObserver = new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
          for (let entry of entries) {
              const { width, height } = entry.contentRect;
              chart.resize(width, height);
          }
      });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      if (chartContainerRef.current){
        resizeObserver.unobserve(chartContainerRef.current);
      }
    };
  }, [marketData])

  useEffect(() => {
    
    setDisplayedProtocols(protocols)
    
  }, [protocols])

  const handleSort = (term) => {
    if (term === prevSortTerm) {
      setSortTerm(term)
      setSortDirection((prevDirection) => {
        // Inside this arrow function, prevDirection refers to the previous value of sortDirection
        if (prevDirection === 'asc') {
          console.log('asc')
          setPrevSortDirection('asc');
          return 'desc';
        } else if (prevDirection === 'desc') {
          console.log('desc')
          setPrevSortDirection('desc');
          setSortTerm('default')
          return 'default';
        } else {
          console.log('else')
          setPrevSortDirection('default');
          return 'asc';
        }
      });
    } else {
      setSortTerm(term);
      setPrevSortTerm(term);
      setPrevSortDirection('default');
      setSortDirection('asc');
    }
  };
  

  useEffect(() => {

    let updatedProtocols = protocols.map((protocol) => {
      const { TVL, MCAP } = protocol;
      const tvlMcapRatio = TVL && MCAP ? TVL / MCAP : 0;
      return {
        ...protocol,
        'TVL/MCAP': tvlMcapRatio,
      };
    });
    let sortedProtocols = [...updatedProtocols];
  
    if (sortTerm !== 'default') {
      console.log('now')
      sortedProtocols.sort((a, b) => {
        const valueA = a[sortTerm] || 0; // Consider null values as 0
        const valueB = b[sortTerm] || 0;
  
        if (sortTerm === 'name') {
          return valueA.localeCompare(valueB);
        } else {
          return valueA - valueB;
        }
      });
    }
  
    if (sortDirection === 'desc') {
      sortedProtocols.reverse();
    }
  
    setDisplayedProtocols(sortedProtocols);
  }, [protocols, sortTerm, sortDirection]);

  useEffect(() => {
    const endTime = performance.now(); // log end time
    const loadTime = endTime - startTime
    console.log('Component loaded in: ', loadTime, 'ms');
    
    axios.post('http://localhost:3001/performance_logs', {
      event_category: 'page_load',
      event_type: 'load_time',
      event_value: loadTime,
      page_url: window.location.href,
    });
  }, [])

  return (
    <div id='home' className='h-screen'>

        <div className={` relative ${isSmallScreen ? 'top-14 mainSmall' : 'left-56 mainBig'} bg-gray-800 h-full mx-auto p-2 sm:p-4 flex flex-col justify-start items-center`}>
          
          <Search />


          <div className='w-full h-3/5 sm:h-1/2 lg:h-3/5 bg-gray-900 rounded-3xl mt-6 p-6 text-gray-400 sm:grid grid-cols-4 grid-rows-4 grid-flow-col gap-2 '>
              <div className='font-bold max-sm:grid grid-cols-3 row-span-4'>
                <div className='m-2'>
                <p className='text-sm md:text-xl m-1 text-left'>Total Value Locked </p>
                <p className='max-sm:text-base md:text-2xl text-lg sm:mb-2 text-white m-1'>$2.17b</p>
                </div>
                <div className='m-2'>
                <p className='text-sm md:text-lg m-1 mb-2 text-left'>24hr Fees</p>
                <p className='max-sm:text-base text-lg text-white sm:mb-2 ml-1'>$205,417</p>
                </div>
                <div className='m-2'>
                <p className='text-sm md:text-lg m-1 text-left'>$ARB Price</p>
                <p className='max-sm:text-base text-lg text-white sm:mb-2 ml-1'>$1.17</p>
                </div>
              </div>
              
              
              <div className='w-full h-auto m-auto flex items-start justify-start sm:p-2 font-normal col-span-3 mb-2'>
                <button onClick={() => setDataType('TVL')} className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>TVL</button>
                <button onClick={() => setDataType('FEES')} className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>Fees</button>
                <button onClick={() => setDataType('PRICE')} className='bg-[#3267D6] lg:text-lg hover:scale-105 ease-in duration-300 rounded-2xl py-2 px-3 m-2 text-gray-200'>$ARB Price</button>
              </div>
              <div ref={chartContainerRef} className={`border-2 border-gray-400 w-full ${chartClass} sm:h-auto row-span-3 col-span-3`} />
              
          </div>            

          <div className={`max-md:absolute ${topClass} w-full text-white border-b border-gray-400 mt-2 p-2`}>
            <p className='flex items-center max-sm:justify-center px-4 text-xl font-semibold my-2'><img className='w-7 mx-2' src="/assets/arbitrum-logo.png" alt="/" />Protocols on Arbitrum</p>
          

          <div className='w-full text-white grid grid-cols-4'>
            <div className='p-2 font-semibold px-4 flex justify-center items-center border border-gray-400'>
              <p className={`flex items-center px-2 max-sm:text-sm cursor-pointer ${
                sortTerm === 'name' ? 'text-blue-600' : ''
              }`}
              onClick={() => handleSort('name')}
              >
                Name
                {sortTerm !== 'name' && (
                  <LuArrowUpDown className="ml-1"></LuArrowUpDown>
                )}
                {sortTerm === 'name' && (
                <SortIcon direction={sortDirection} />
              )}
              </p>

            </div> 
            <p className={`flex items-center justify-center border border-gray-400 p-2 font-semibold max-sm:text-sm text-center cursor-pointer ${
                sortTerm === 'TVL' ? 'text-blue-600' : ''
              }`} onClick={() => handleSort('TVL')}>TVL
            {sortTerm !== 'TVL' && (
                  <LuArrowUpDown className="ml-1"></LuArrowUpDown>
                )}
                {sortTerm === 'TVL' && (
                <SortIcon direction={sortDirection} />
              )}
            </p> 
            <p className={`flex items-center justify-center border border-gray-400 p-2 font-semibold max-sm:text-sm text-center cursor-pointer ${
                sortTerm === 'MCAP' ? 'text-blue-600' : ''
              }`} onClick={() => handleSort('MCAP')}>MCAP
            {sortTerm !== 'MCAP' && (
                  <LuArrowUpDown className="ml-1"></LuArrowUpDown>
                )}
                {sortTerm === 'MCAP' && (
                <SortIcon direction={sortDirection} />
              )}
            </p>
            <p className={`flex items-center justify-center border border-gray-400 p-2 font-semibold max-sm:text-sm text-center cursor-pointer ${
                sortTerm === 'TVL/MCAP' ? 'text-blue-600' : ''
              }`} onClick={() => handleSort('TVL/MCAP')}>TVL/MCAP
            {sortTerm !== 'TVL/MCAP' && (
                  <LuArrowUpDown className="ml-1"></LuArrowUpDown>
                )}
                {sortTerm === 'TVL/MCAP' && (
                <SortIcon direction={sortDirection} />
              )}
            </p>
          </div>

          {/* BEGIN PROTOCOLS */}
          <div className='w-full text-white grid grid-cols-4'>
          { 
            displayedProtocols.map((protocol, index) => (
                <React.Fragment key={index}>
                <div className='p-2 px-4 flex justify-start items-center border border-gray-400'>
                  <Star item={protocol}/>
                  <Link 
                  href={`/protocols/${protocol.name}`}
                  className='px-2 max-sm:text-sm text-center hover:text-blue-600 hover:font-bold flex flex-wrap justify-center items-center max-lg:text-left'
                  >
                    {
                      window.innerWidth > 768 ?  <img className='w-7 mx-2 rounded-full' src={protocol.logo} alt="protocol" />
                      : <div/>
                    }
                    {protocol.name}
                  </Link>
                </div> 
                <p className='flex items-center justify-center border border-gray-400 p-2 max-sm:text-sm max-[420px]:text-xs text-center'>{protocol.TVL ? `$${Math.round(protocol.TVL)}` : '-'}
                </p> 
                <p className='flex items-center justify-center border border-gray-400 p-2 max-sm:text-sm max-[420px]:text-xs text-center'>{protocol.MCAP ? `$${Math.round(protocol.MCAP)}` : '-'}
                </p>
                <p className='flex items-center justify-center border border-gray-400 p-2 max-sm:text-sm max-[420px]:text-xs text-center'>{protocol.TVL && protocol.MCAP ? `${(protocol.TVL / protocol.MCAP).toFixed(2)}` : '-'}
                </p>
              </React.Fragment>
            ))
          }
          </div>
          {/* END PROTOCOLS */}
          </div>

          


        </div>

    </div>
  )
}

export default Main