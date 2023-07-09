import React , {useState, useEffect} from 'react'
import { createChart } from 'lightweight-charts'
import axios from 'axios'



const Chart = ({name, type}) => {

    console.log(type)
    console.log(name)

    const updateName = (name) => {
        const lower = name.toLowerCase();
        const noSpace = lower.replace(/ /g, '-');
        return noSpace;
      };
      

    const [updatedName, setUpdatedName] = useState(updateName(name))
    const [dataType, setDataType] = useState('TVL')
    const [marketData, setMarketData] = useState(null);

    console.log(updatedName)


    // 'https://api.coingecko.com/api/v3/coins/arbitrum/market_chart?vs_currency=usd&days=max&interval=daily'


    async function fetchMarketData(dataType){
        let url;
        switch(dataType){
          case 'TVL':
            url = `https://api.llama.fi/protocol/${updatedName}`;
            break;
          case 'PRICE':
            let priceName;
            if(updatedName === 'curve-dex'){
                priceName = 'curve-dao-token'
            }
            else{
                priceName = updatedName
            }
            url = `https://api.coingecko.com/api/v3/coins/${priceName}/market_chart?vs_currency=usd&days=max&interval=daily`;
            break;
          default:
            throw new Error('Unknown data type')
        }
    
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        let marketData = [];
    
        if(dataType === 'PRICE'){
          const {prices} = data;
          marketData = prices.map(price => ({
            time: price[0] / 1000, // convert ms to secs
            value: price[1]
          }));
        } else if (dataType === 'TVL') {
          marketData = data.tvl.map(datapoint => ({
            time: datapoint.date,
            value: datapoint.totalLiquidityUSD
          }));
        } 
    
        console.log(marketData);
        return marketData;
      }
      fetchMarketData(type)
    
      useEffect(() => {
        fetchMarketData(dataType).then(data => setMarketData(data))
      }, [dataType]);
  return (
    <div>
      
    </div>
  )
}

export default Chart
