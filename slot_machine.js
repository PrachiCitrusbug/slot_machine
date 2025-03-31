// 1. Take a deposit amount
// 2. Get number of lines to bet on
// 3. Collect bet amount for each line
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their reward or discard the bet amount from deposit
// 7. Play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 3,
    B: 3,
    C: 4,
    D: 6
};

//value of each symbol (bet amount reward)
const SYMBOLS_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

function deposit() {    
    while (true){
        const depositAmount = prompt("Enter the initial deposit amount: ");
        const deposit = parseFloat(depositAmount);
        if (isNaN(deposit) || deposit <= 0){
            console.log("Invalid amount! Please type a valid amount.");
        }
        else{
            return deposit;
        }
    }
}

function getNumberOfLines(){
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines. Please enter a valid number(1-3).");
        }
        else{
            return numberOfLines;
        }
    }
}

function getBet(balance, numLines){
    while(true){
        const bet = prompt("Enter bet amount for each line: ");
        const betAmount = parseFloat(bet);
        if (isNaN(betAmount) || betAmount<=0 || betAmount > (balance / numLines)){
            console.log("Invalid bet amount. Please ensure bet amount greater than 0 and which ensures sufficient balance.");
        }
        else{
            return betAmount;
        }
    }
}

function spin(){
    const symbols = []
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i < count; i++){
            symbols.push(symbol)
        }
    }
    
    const reels = []
    for(let i=0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
            // console.log(reelSymbols);
        }
    }
    return reels;
}

function transpose(reels){
    const rows = []
    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

function printRows(rows){
    for (const row of rows){
        let rowString = ""
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != (row.length - 1)){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

b=[1,2,3].map(item => item)
a=[1,2,3].forEach(item => item)

const getMax = (a, b) => Math.max(a, b);

function getWinnings(rows, bet, lines){
    let winnings = [];
    for(let row=0; row < ROWS; row++){
        let symbols = rows[row];
        let allSame = true;
        for (let i=0; i<symbols.length; i++){
            if (symbols[i] != symbols[0]){
                allSame=false;
                winnings.push(0)
                break;
            }
        }
        if (allSame){
            winnings.push(bet * SYMBOLS_VALUE[symbols[0]]);
        }
    }
    let amount_won = 0;
    let max_value = winnings.reduce(getMax);
    if (max_value != 0){
        for(let i=0; i<lines; i++){
            amount_won += max_value;
            winnings[winnings.indexOf(max_value)] = 0;
            max_value = winnings.reduce(getMax);
            if (max_value == 0) break;
        }
    }
    return amount_won;
}

function game(){
    let balance = deposit();
    
    while(true){
        const numLines = getNumberOfLines();
        const bet = getBet(balance, numLines);
        balance -= bet*numLines;
        const reels = spin();
        // console.log(reels);
        const transposed = transpose(reels);
        // console.log(transposed);
        printRows(transposed);
        const winnings = getWinnings(transposed, bet, numLines);
        balance += winnings;
        console.log("You won: $" + winnings.toString());
        if (balance <= 0){
            console.log("Not enough balance to continue");
            break;
        }
        console.log("Your balance is $"+ balance.toString());
        const playAgain = prompt("Do you want to play again (y/n)?").toLowerCase();
        if (playAgain!='y' && playAgain!='yes') break;
    }
}

game();


var name='prachi';
