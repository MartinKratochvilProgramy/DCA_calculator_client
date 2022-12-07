import { FC } from 'react';
import { AddTickerForm } from './AddTickerForm';
import Chip from '@mui/material/Chip';
import { SelectRangesForm } from '../components/SelectRangesForm';
import { Dayjs } from 'dayjs';

import { TickerChipInterface } from '../types/TickerChipInterface';

interface Props {
    tickers: TickerChipInterface[];
    waitingForData: boolean;
    inputComplete: boolean;
    addTicker: (ticker: string) => void;
    deleteTicker: (ticker: string) => void;
    modifyStartDate: (startDate: Dayjs) => void;
    setStartAmount: (startAmount: number) => void;
    setIncrementAmount: (incrementAmount: number) => void;
    getData: () => void;
    investmentPeriod: string;
    setInvestmentPeriod: (investmentPeriod: string) => void;
}

export const TickersSelect: FC<Props> = ({ 
  tickers, 
  waitingForData, 
  inputComplete, 
  addTicker, 
  deleteTicker, 
  modifyStartDate, 
  setStartAmount, 
  setIncrementAmount, 
  getData ,
  investmentPeriod,
  setInvestmentPeriod
}) => {

  return (
      <div className="md:px-12 px-2 pt-1 lg:w-6/12 md:w-8/12 w-10/12 mb-0">

        <h1 className='text-3xl font-semibold text-center mt-2 py-4 md:py-4 mb-0 text-muiblue'>
          DCA CALCULATOR
        </h1>

        <AddTickerForm 
          addTicker={addTicker}
        />

        <div className="flex justify-center flex-wrap my-2 space-x-1">
          {tickers.map(item => {
            let itemRelativeChange = "";
            if (item.relativeChange !== null) {
              itemRelativeChange =  ((item.relativeChange - 1) * 100).toFixed(1) + "%"
              if (item.relativeChange > 1) {
                itemRelativeChange = "+" + itemRelativeChange;
              }
            }
            return (
              <div className='mt-1'>
                <Chip 
                  key={item.ticker}
                  label={item.ticker + " " + itemRelativeChange} 
                  color="primary" 
                  variant="outlined" 
                  onDelete={() => deleteTicker(item.ticker)}  
                />
              </div>
            )
          })}
        </div>


        <SelectRangesForm
          waitingForData={waitingForData}
          inputComplete={inputComplete}
          modifyStartDate={modifyStartDate}
          setStartAmount={setStartAmount}
          setIncrementAmount={setIncrementAmount}
          getData={getData}
          investmentPeriod={investmentPeriod}
          setInvestmentPeriod={setInvestmentPeriod}
        />
    </div>
  )
}
