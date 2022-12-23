import React, { useState, FC } from 'react'
import { serverRoute } from '../serverRoute'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  addTicker: (ticker: string) => void
}

interface Error {
  code: string
  description: string
}

export const AddTickerForm: FC<Props> = ({
  addTicker
}) => {
  const [error, setError] = useState<null | Error>(null)
  const [waitingForValidation, setWaitingForValidation] = useState<boolean>(false)
  const [tickerInput, setTickerInput] = useState<string>('')

  function handleInputClick (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    if (tickerInput === '') return

    setTickerInput('')
    setWaitingForValidation(true)

    // validate ticker input
    fetch(serverRoute + '/validate_ticker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ticker: tickerInput.toUpperCase()
      })
    })
      .then(async (response) => await response.json())
      .then((res: null | Error) => {
        setError(res)
        setWaitingForValidation(false)
        if (res === null) {
          addTicker(tickerInput.toUpperCase())
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='flex flex-col justify-center items-center'>
        <form
            onSubmit={(e) => handleInputClick(e)}
            className="flex flex-col items-center w-full max-w-xl">
            <label htmlFor ="add-stock" className="sr-only">Add stock</label>
            <div className="relative flex flex-row justify-center h-full w-full space-x-2">
                <div className='flex w-full'>
                    <label htmlFor ="add-stock" className="sr-only">Ticker input</label>
                    <input
                    type="text"
                    id="ticker-input"
                    className="bg-gray-100 border w-full border-gray-300 text-gray-900 text-sm focus:outline-none block pl-4 p-2.5 rounded"
                    placeholder="Ticker ('AAPL', 'MSFT', ... )"
                    autoFocus
                    onChange={(e) => {
                      setTickerInput(e.target.value)
                      setError(null)
                    }}
                    value={tickerInput}
                    />

                </div>
                <div className="w-4/12 lg:w-3/12 flex">
                  {waitingForValidation
                    ? <LoadingButton
                      size="small"
                      variant="contained"
                      loading={true}
                      fullWidth={true}
                      disabled
                      >
                    </LoadingButton>
                    : <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    fullWidth={true}
                    >
                        Add ticker
                    </Button>
                  }

                </div>
            </div>
            <div className='text-gray-400 text-sm mt-1'>
              (Search for corresponding tickers on <a href='https://finance.yahoo.com' className='text-muiblue' target="_blank" rel="noreferrer">https://finance.yahoo.com</a>)
            </div>
        </form>
      {(error != null) && (<span className='font-semibold text-xl text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'>{error.code}: {error.description}<br /></span>)}
    </div>
  )
}
