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
            const relativeChange = Number((data.values[data.values.length - 1] / noInvestmentRelChange));
            console.log(relativeChange);
            
            chipData.push({ticker: data.ticker, relativeChange: relativeChange})
        }
    }

    return chipData;
}
