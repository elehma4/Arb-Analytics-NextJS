import React , {useState, useEffect, useRef} from 'react'
import { createChart } from 'lightweight-charts'
import axios from 'axios'



const Chart = ({name, type}) => {

    const updateName = (name) => {
        const lower = name.toLowerCase();
        const noSpace = lower.replace(/ /g, '-');
        return noSpace;
      };
      

    const [updatedName, setUpdatedName] = useState(updateName(name))
    const [marketData, setMarketData] = useState(null);

    // 'https://api.coingecko.com/api/v3/coins/arbitrum/market_chart?vs_currency=usd&days=max&interval=daily'


    async function fetchMarketData(type){
        let url;
        switch(type){
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
        console.log(url)
    
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        let marketData = [];
    
        if(type === 'PRICE'){
          const {prices} = data;
          marketData = prices.map(price => ({
            time: price[0] / 1000, // convert ms to secs
            value: price[1]
          }));
        } else if (type === 'TVL') {
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
        fetchMarketData(type).then(data => setMarketData(data))
      }, [type]);

      const chartContainerRef = useRef();
      const chartRef = useRef(null);

      useEffect(() => {
        console.log(marketData)
        if(marketData === null){
          return;
        }

        console.log(marketData)
    
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
    
        if(type === 'FEES'){
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
  return (
    <div ref={chartContainerRef} className="w-full h-full" />
  )
}

export default Chart
