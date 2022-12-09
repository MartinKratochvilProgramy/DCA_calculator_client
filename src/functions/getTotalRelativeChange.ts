import { TickerDataInterface } from "../types/TickerDataInterface";
import { TickerChipInterface } from "../types/TickerChipInterface";

export function getTotalRelativeChange(
    allData: TickerDataInterface[],
    startAmount: number
): TickerChipInterface[] {
    const chipData: TickerChipInterface[] = [];

    let noInvestmentRelChange: number = startAmount;

    for (const data of allData) {
        if (data.ticker === "No investment") {
            noInvestmentRelChange = Number((data.values[data.values.length - 1]));
        }
    }
    
    for (const data of allData) {
        if (data.ticker !== "No investment") {
            // length - 2 because the graph does not show the last value???
            const relativeChange = Number((data.values[data.values.length - 2] / noInvestmentRelChange) * 100 - 100);
            chipData.push({ticker: data.ticker, relativeChange: relativeChange})
        }
    }

    return chipData;
}
