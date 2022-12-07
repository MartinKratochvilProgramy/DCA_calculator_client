import { TickerDataInterface } from "../types/TickerDataInterface";
import { TickerChipInterface } from "../types/TickerChipInterface";

export function getTotalRelativeChange(
    allData: TickerDataInterface[]
): TickerChipInterface[] {
    const chipData: TickerChipInterface[] = [];

    let noInvestmentRelChange: number = 1;

    for (const data of allData) {
        if (data.ticker === "No investment") {
            noInvestmentRelChange = Number((data.values[data.values.length - 1]));
        }
    }
    
    for (const data of allData) {
        if (data.ticker !== "No investment") {
            const relativeChange = Number((data.values[data.values.length - 1] / noInvestmentRelChange));
            chipData.push({ticker: data.ticker, relativeChange: relativeChange})
        }
    }

    return chipData;
}
