// Created with AI, looked over by me

function coinCombo(amount) {
    // Return an empty result if the amount is negative
    if (amount < 0) {
        return {
            amount: amount,
            combinations: [],
            totalCombinations: 0
        };
    }

    const coinValues = [1, 5, 10, 25, 50, 100]; // Pennies, Nickels, Dimes, Quarters, Halves, Dollars
    const coinNames = ['pennies', 'nickels', 'dimes', 'quarters', 'halves', 'dollars'];

    const results = [];
    
    // Try all possible combinations of coin values
    for (let pennies = 0; pennies <= Math.floor(amount / coinValues[0]); pennies++) {
        for (let nickels = 0; nickels <= Math.floor((amount - pennies * coinValues[0]) / coinValues[1]); nickels++) {
            for (let dimes = 0; dimes <= Math.floor((amount - pennies * coinValues[0] - nickels * coinValues[1]) / coinValues[2]); dimes++) {
                for (let quarters = 0; quarters <= Math.floor((amount - pennies * coinValues[0] - nickels * coinValues[1] - dimes * coinValues[2]) / coinValues[3]); quarters++) {
                    for (let halves = 0; halves <= Math.floor((amount - pennies * coinValues[0] - nickels * coinValues[1] - dimes * coinValues[2] - quarters * coinValues[3]) / coinValues[4]); halves++) {
                        for (let dollars = 0; dollars <= Math.floor((amount - pennies * coinValues[0] - nickels * coinValues[1] - dimes * coinValues[2] - quarters * coinValues[3] - halves * coinValues[4]) / coinValues[5]); dollars++) {
                            const totalAmount = pennies * coinValues[0] + nickels * coinValues[1] + dimes * coinValues[2] + quarters * coinValues[3] + halves * coinValues[4] + dollars * coinValues[5];
                            if (totalAmount === amount) {
                                results.push({
                                    pennies,
                                    nickels,
                                    dimes,
                                    quarters,
                                    halves,
                                    dollars
                                });
                            }
                        }
                    }
                }
            }
        }
    }

    return {
        amount: amount,
        combinations: results,
        totalCombinations: results.length
    };
}

// Function to calculate the total value of the coins
function coinValue(coinCounts) {
    const { pennies = 0, nickels = 0, dimes = 0, quarters = 0, halves = 0, dollars = 0 } = coinCounts;

    const totalCents = pennies * 1 + nickels * 5 + dimes * 10 + quarters * 25 + halves * 50 + dollars * 100;
    const totalDollars = (totalCents / 100).toFixed(2);

    return {
        coins: coinCounts,
        totalCents,
        totalDollars
    };
}


module.exports = { coinCombo, coinValue };


// ----------------------------
// Manual Test Cases
// ----------------------------
if (require.main === module) {

    console.log('\n===== Manual Tests for coinCombo() =====');
    const testCombo1 = coinCombo(5);
    console.log(`Test 1 - coinCombo(5)`);
    console.log(`Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`);
    console.log('Sample:', testCombo1.combinations.slice(0, 3));
  
    const testCombo2 = coinCombo(0);
    console.log(`\nTest 2 - coinCombo(0)`);
    console.log(`Expected: 1 combination with all zeros`);
    console.log('Actual:', testCombo2.combinations);
  
    const testCombo3 = coinCombo(-5);
    console.log(`\nTest 3 - coinCombo(-5)`);
    console.log(`Expected: 0 combinations`);
    console.log('Actual:', testCombo3.totalCombinations);
  
    console.log('\n===== Manual Tests for coinValue() =====');
    const testValue1 = coinValue({ pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 });
    console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
    console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154`);
    console.log('Actual:', testValue1.totalCents, `($${testValue1.totalDollars})`);
  
    const testValue2 = coinValue({});
    console.log(`\nTest 2 - coinValue({})`);
    console.log(`Expected: 0 cents`);
    console.log('Actual:', testValue2.totalCents, `($${testValue2.totalDollars})`);
  
    const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
    console.log(`\nTest 3 - coinValue(string inputs)`);
    console.log(`Expected: 10 + 10 + 100 = 120`);
    console.log('Actual:', testValue3.totalCents, `($${testValue3.totalDollars})`);
  }
