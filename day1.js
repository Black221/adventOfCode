const DIGIT = {
    1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine'
}

const getOutputDay1 = () => {
    getInputFileData(resolveProblemDay1, 'day1-input');
}

const findDigits = (input, reverse = false) => {
    let found = [];
    if (reverse) input = input.split('').reverse().join('');

    for (let i = 1; i <= 9; i++) {
        let strToSearch = DIGIT[i];
        if (reverse) strToSearch = strToSearch.split('').reverse().join('');
        if (input.search(strToSearch) != -1) found.push({ digit: i, index: input.search(strToSearch) });
        if (input.search(i.toString()) != -1) found.push({ digit: i, index: input.search(i.toString()) });
    }
    return found;
}

const getDigit = (line, reverse = false) => {
    let found = findDigits(line, reverse);
    // take min index
    let min = found[0];
    for (let i = 1; i < found.length; i++) {
        if (found[i].index < min.index) {
            min = found[i];
        }
    }
    return min;
}

const resolveProblemDay1 = (data) => {
    let sum = 0;
    data.forEach((line) => {
        
        let firstDigit = getDigit(line);
        let lastDigit = getDigit(line, true);
        
        sum += parseInt(firstDigit.digit +''+ lastDigit.digit);
    });

    document.getElementById('day1-output').innerHTML = sum;
}