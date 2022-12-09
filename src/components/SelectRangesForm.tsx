import React, { FC } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Button, TextField, Select, FormControl, MenuItem, InputLabel } from '@mui/material'


interface Props {
    waitingForData: boolean;
    inputComplete: boolean;
    modifyStartDate: (startDate: Dayjs) => void;
    setStartAmount: (startAmount: number) => void;
    setIncrementAmount: (incrementAmount: number) => void;
    getData: () => void;
    investmentPeriod: string;
    setInvestmentPeriod: (investmentPeriod: string) => void;
}

export const SelectRangesForm: FC<|Props>  = ({ 
    waitingForData, 
    inputComplete, 
    modifyStartDate, 
    setStartAmount, 
    setIncrementAmount, 
    getData,
    investmentPeriod,
    setInvestmentPeriod
}) => {

    const [dateValue, setDateValue] = React.useState<Dayjs | null>(null);

    function handleChange(newValue: Dayjs | null): void {
        if (newValue === null) return;

        setDateValue(newValue);
        modifyStartDate(newValue);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        getData();
    }


  return (
    <div className='flex justify-center items-center w-full'>
        <form 
            onSubmit={(e) => {handleSubmit(e)}}
            className='flex justify-center items-center flex-col px-0 py-4 rounded w-full'>
            <div className='flex flex-col mb-4 space-y-4'>
                <TextField 
                    id="standard-basic" 
                    label="Starting amount ($)" 
                    variant="standard" 
                    type='number'
                    onChange={(e) => setStartAmount(parseFloat(e.target.value))}
                    />
                <div className='flex items-end space-x-1'>
                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        label={`${investmentPeriod} investment ($)`}
                        variant="standard" 
                        type='number'
                        onChange={(e) => setIncrementAmount(parseFloat(e.target.value))}
                    />
                    <div className='w-[110px]'>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Period</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={investmentPeriod}
                                label="Period"
                                onChange={(e) => setInvestmentPeriod(e.target.value)}
                            >
                                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Starting date"
                        inputFormat="DD/MM/YYYY"
                        value={dateValue}
                        onChange={handleChange}
                        disableFuture={true}
                        renderInput={(params) => <TextField {...params} />}
                        />
                </LocalizationProvider>
            </div>
            
            <div className='min-h-[36px] flex'>
                {waitingForData ? 
                    <LoadingButton
                        size="small"
                        variant="contained"
                        loading={true}
                        disabled
                        >
                    </LoadingButton>
                :
                    <Button 
                        variant="contained"
                        type='submit'
                        disabled={!inputComplete}
                    >
                        Load data
                    </Button>
                }
            </div>

        </form>
    </div>
  )
}
