const COLOR = [
    'blue', 'green', 'red'
]

const target = {
    'blue': 14,
    'green': 13,
    'red': 12
}

const compare = (obj) => {
    if (obj['blue'] <= target['blue'] && obj['green'] <= target['green'] && obj['red'] <= target['red'])
        return true;
    return false;
}

const getFewest = (obj1, obj2) => {
    let res = {
        'blue': 0,
        'green': 0,
        'red': 0
    }
    COLOR.forEach((color) => {
        if (obj1[color] > obj2[color]) {
            res[color] = obj1[color];
        } else {
            res[color] = obj2[color];
        }
    });
    return res;
}

const getOutputDay2 = () => {
    getInputFileData(resolveProblemDay2, 'day2-input');
}

const resolveProblemDay2 = (data) => {

    let res = 0;

    data.forEach((line, index) => {
        
        let arr = line.substring(line.indexOf(':') + 1).split(';');
        let possible = true;
        let fewest = {
            'blue': 0,
            'green': 0,
            'red': 0
        }

        arr.forEach((s) => {
            let obj = {
                'blue': 0,
                'green': 0,
                'red': 0
            }
            let sarr = s.split(',');
            sarr.forEach((e, i) => {
                let color = e.split(' ')[2]
                let value = e.split(' ')[1]
                obj[color.trim()] += parseInt(value);
            });
            // if (!compare(obj)) {
            //     possible = false;
            // }
            fewest = getFewest(fewest, obj);
        });
        // if (possible) {
        //     console.log('Game '+ (index + 1) + ' is possible')
        //     res += index + 1;
        // }
        res += fewest['blue'] * fewest['green'] * fewest['red'];
    });

    document.getElementById('day2-output').innerHTML = res;

}

let dataTest = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
]

// resolveProblemDay2(dataTest);