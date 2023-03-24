function maxProfit(prices) {
    let left = 0; // buy
    let right = 1; // sell
    let profit = 0;

    while (right < prices.length) {
        // profitable?
        if (prices[left] < prices[right]) {
            profit = Math.max(profit, prices[right] - prices[left]);
        } else {
            // we found a left that is even smaller than the previous one (buy cheaper)
            left = right;
        }

        right++;
    }

    return profit;
}

console.log(maxProfit([7,1,5,3,6,4]));
console.log(maxProfit([7,6,4,3,1]));
