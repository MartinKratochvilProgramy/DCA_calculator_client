import { red } from '@mui/material/colors';
import { FC } from 'react'
import Plot from 'react-plotly.js';

interface TickerData {
    ticker: string
    dates: string[]
    values: number[]
}

interface SeriesData {
    x: string[]
    y: number[]
    mode: string
    name: string
}

interface Props {
    data: TickerData[]
}

export const Plots: FC<Props> = ({
    data
}) => {

    const allSeriesLayout = {
        yaxis: {
            title: {
                text: `Value ($)`,
                font: {
                    size: 18,
                }
            },
        },
        margin: {
            t: 10,
            b: 20,
            l: 55,
            r: 0
        },
        autosize: true,
        legend: {
            x: 0,
            y: 1.2,
        },
        plot_bgcolor: '#fafafa',
        paper_bgcolor: "#fafafa"
    };

    function initSeriesData(ticker: TickerData): SeriesData {
        const seriesData =
        {
            x: ticker.dates,
            y: ticker.values,
            mode: 'lines',
            name: ticker.ticker,
            line: { shape: 'spline' },
        }

        return seriesData;
    }

    const allSeriesData: SeriesData[] = [];
    for (const ticker of data) {
        allSeriesData.push(initSeriesData(ticker));
    }

    return (
        <div className='flex flex-col justify-center items-center w-full mb-0 md:mb-10'>
            <div className='flex justify-center items-center w-full min-h-[260px] md:min-h-[450px]'>
                <Plot
                    layout={allSeriesLayout}
                    data={allSeriesData}
                    useResizeHandler
                    className="w-[90%] lg:w-[70%] h-[260px] md:h-full"
                />
            </div>
        </div>
    )
}
