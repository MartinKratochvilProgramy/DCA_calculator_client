import React, { useState, useEffect, FC } from 'react'
import { TickersSelect } from './components/TickersSelect'
import { Plots } from './components/Plots'
import { serverRoute } from './serverRoute'
import { Dayjs } from 'dayjs'
import { TickerChipInterface } from './types/TickerChipInterface'
import { TickerDataInterface } from './types/TickerDataInterface'
import { getTotalRelativeChange } from './functions/getTotalRelativeChange'

export const App: FC = () => {
  const [tickers, setTickers] = useState<TickerChipInterface[]>([])
  const [data, setData] = useState<TickerDataInterface[]>([])
  const [waitingForData, setWaitingForData] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [startAmount, setStartAmount] = useState<number>(1)
  const [incrementAmount, setIncrementAmount] = useState<number | null>(null)
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('Monthly')

  const [inputComplete, setInputComplete] = useState<boolean>(false)

  useEffect(() => {
    if (startAmount !== null && incrementAmount !== null && tickers.length > 0 && startDate !== null) {
      setInputComplete(true)
    }
  }, [startAmount, incrementAmount, tickers, startDate])

  function getData (): void {
    setWaitingForData(true)

    const tickerNames = []
    for (const ticker of tickers) {
      tickerNames.push(ticker.ticker)
    }

    fetch(serverRoute + '/get_chart_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tickers: tickerNames,
        startDate,
        startAmount,
        incrementAmount,
        investmentPeriod
      })
    })
      .then(async (response) => await response.json())
      .then((res: TickerDataInterface[]) => {
        setData(res)
        setWaitingForData(false)

        setTickers(getTotalRelativeChange(res, startAmount))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  function addTicker (newTicker: string): void {
    if (tickers.filter((item) => { return item.ticker === newTicker }).length === 0) {
      // if not ticker already in ticker
      setTickers([...tickers, { ticker: newTicker, relativeChange: null }])
    }
  }

  function deleteTicker (tickerName: string): void {
    const newTickers = tickers.filter((item) => {
      return item.ticker !== tickerName
    })

    setTickers([...newTickers])
  }

  function modifyStartDate (startDate: Dayjs): void {
    setStartDate(startDate)
  }

  return (
    <div className="flex flex-col justify-start items-center bg-neutral-50 w-full h-full">
      <TickersSelect
        tickers={tickers}
        waitingForData={waitingForData}
        inputComplete={inputComplete}
        addTicker={addTicker}
        deleteTicker={deleteTicker}
        modifyStartDate={modifyStartDate}
        setStartAmount={setStartAmount}
        setIncrementAmount={setIncrementAmount}
        getData={getData}
        investmentPeriod={investmentPeriod}
        setInvestmentPeriod={setInvestmentPeriod}
      />
      <Plots
        data={data}
      />
    </div>
  )
}
