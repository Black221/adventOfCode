

const getOutputDay4 = () => {
    getInputFileData(resolveProblemDay4, 'day4-input');
}

let res = [];

const resolveProblemDay4 = (data) => {

    res =  data.map((line, card) => ({
        card: card + 1,
        instance: 1,
        win: 0,
    }));

    data.forEach((line, card) => {
        let numbers = line.split(': ')[1].replace("\r", '');
        let winningNumbers = numbers.split(' | ')[0].split(' ');
        let numbersYouHave = numbers.split(' | ')[1].split(' ');

        // remove empty string
        winningNumbers = winningNumbers.filter(item => item);
        numbersYouHave = numbersYouHave.filter(item => item);

        let count = 0;
        winningNumbers.forEach(number => {
            if (numbersYouHave.includes(number)) {
                count++;
            }
        });
        res[card].win = count;
        for (let i = 1; i <= count; i++) {
            res[card + i].instance += res[card].instance;
        }
    });

    let sum = 0;
    res.forEach(item => {
        sum += item.instance;
    });
    console.log(res, sum);
}

const dataTest4 = [
    "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
]

resolveProblemDay4(dataTest4);