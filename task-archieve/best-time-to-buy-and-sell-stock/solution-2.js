function maxProfit(prices) {
    if (prices.length < 2) {
        return 0;
    }

    let profit = 0;
    let [buy, sell] = prices;

    for (let i = 1; i < prices.length; i++) {
        let currentBuy = prices[i - 1];
        let currentSell = prices[i];

        if (currentSell > sell) {
            sell = currentSell;
        }

        if (currentBuy < buy) {
            buy = currentBuy;
            sell = currentSell;
        }

        profit = Math.max(profit, sell - buy);
    }

    return profit;
}

console.log(maxProfit([7,1,5,3,6,4]));
console.log(maxProfit([7,6,4,3,1]));
