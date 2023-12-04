

const getOutputDay3 = () => {
    getInputFileData(resolveProblemDay3, 'day3-input');
}

let result = [];
let tab = [];
const SYMBOLS = [
    '*',
    // '&', '#', '@', '$', '%', '*','-', '+', '=','/'
]

const NUMBERS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

const getNumber = (data, row, col) => {
    let number = data[row][col];
    let deb = col;
    let length = 1;
    
    if (col > 0 && NUMBERS.includes(data[row][col - 1] ) ) {
        deb = col - 1;
        length += 1;
        number = data[row][col - 1] + number;
    }

    if (col < data[row].length && NUMBERS.includes(data[row][col + 1]) ) {
        length += 1;
        number += data[row][col + 1];
    }

    if (length < 3 && col - 1 > 0 && NUMBERS.includes(data[row][col - 2]) && NUMBERS.includes(data[row][col - 1])) {
        deb = col - 2;
        length += 1;
        number = data[row][col - 2] + number;
    }

    if (length < 3 && col + 2 < data[row].length && NUMBERS.includes(data[row][col + 2]) && NUMBERS.includes(data[row][col + 1])) {
        length += 1;
        number += data[row][col + 2];
    }

    // console.log(number, row, deb, length)
    return {
        number: number,
        row: row,
        deb: deb,
        length: length
    };
}

const getSymbolIndex = (line, symbol) => {
    let indexList = [];
    for (let i = 0; i <line.length; i++) {
        if (line[i] === symbol) {
            indexList.push(i);
        }
    }
    return indexList;
}

const searchNumber = (data, row, col) => {
    let founded = [];
    if (col > 0 && NUMBERS.includes(data[row][col - 1])) {
        founded.push(getNumber(data, row, col - 1));
    }

    if (col + 1 < data[row].length && NUMBERS.includes(data[row][col + 1])) {
        founded.push(getNumber(data, row, col + 1));
    }

    if (row > 0 && NUMBERS.includes(data[row - 1][col])) {
        founded.push(getNumber(data, row - 1, col));
    }

    if (row + 1 < data.length && NUMBERS.includes(data[row + 1][col])) {
        founded.push(getNumber(data, row + 1, col));
    }

    if (row > 0 && col > 0 && NUMBERS.includes(data[row - 1][col - 1])) {
        founded.push(getNumber(data, row - 1, col - 1));
    }

    if (row + 1 < data.length && col + 1 < data[row].length && NUMBERS.includes(data[row + 1][col + 1])) {
        founded.push(getNumber(data, row + 1, col + 1));
    }

    if (row > 0 && col + 1 < data[row].length && NUMBERS.includes(data[row - 1][col + 1])) {
        founded.push(getNumber(data, row - 1, col + 1));
    }

    if (row + 1 < data.length && col > 0 && NUMBERS.includes(data[row + 1][col - 1])) {
        founded.push(getNumber(data, row + 1, col - 1));
    }

    return founded;
}



const resolveProblemDay3 = (data) => {

    result = [];
    tab = [];
    
    data.forEach((line, row) => {
        SYMBOLS.forEach(symbol => {
            let indexList = getSymbolIndex(line, symbol);
            indexList.forEach(col => {
                let foundedNumberList = searchNumber(data, row, col);
                // foundedNumberList.forEach(foundedNumber => {
                //     if (result.find(item => item.number === foundedNumber.number && item.row === foundedNumber.row && item.deb === foundedNumber.deb) === undefined) {
                //         result.push(foundedNumber);
                //     }
                // });

                // remove not existing
                foundedNumberList = foundedNumberList.filter(item => data[item.row].includes(item.number))
                console.log(foundedNumberList.filter(item => !data[item.row].includes(item.number)))

                // remove duplicate
                foundedNumberList = foundedNumberList.filter((item, index, self) => {
                    return index === self.findIndex((t) => (
                        t.number === item.number && t.row === item.row && t.deb === item.deb
                    ))
                })  

                if (foundedNumberList.length === 2) {
                    let canAdd = [];

                    // console.log("---------- gear : "+row + "-" + col + " ----------")
                    foundedNumberList.forEach(foundedNumber => {
                    //    console.log(foundedNumber)
                        if (tab.filter(item => item.number === foundedNumber.number && item.row === foundedNumber.row && item.deb === foundedNumber.deb).length > 0) {
                           canAdd.push(false);
                        } else {
                            canAdd.push(true);
                        }
                    });

                    if (canAdd[0] || canAdd[1]) {
                        result.push(foundedNumberList[0].number * foundedNumberList[1].number);
                        tab = [...tab, ...foundedNumberList]
                    }
                }
            })
        })
    })

    // sum of all numbers in result
    // let sum = 0;
    console.log(tab.filter(item => !data[item.row].includes(item.number)))

    let sum = 0;
    result.forEach(item => {
        sum += parseInt(item);
    })
    document.getElementById('day3-output').innerHTML = sum;

}

const dataTest3 =  [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598.."
]

// resolveProblemDay3(dataTest3);