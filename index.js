var testMatrix1 = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19]
];
var testMatrix2 = [
    [3, 15, 0, 2, 22],
    [9, 18, 13, 17, 5],
    [19, 8, 7, 25, 23],
    [20, 11, 10, 24, 4],
    [14, 21, 16, 12, 6]
];
var testMatrix3 = [
    [14, 21, 17, 24, 4],
    [10, 16, 15, 9, 19],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7]
];




var winningMatrixes = new Map();



window.onload = function () {

    var lines = text.trim().split('\n').filter(x => x.length > 0);
    var matrixesInput = [];

    for (let i = 0; i < lines.length; i += 5) {
        var matrix = [];

        for (let j = i; j < i + 5; j++) {
            try {
                var row = lines[j].trim().split(' ').filter(x => x != "").map(Number);
                matrix.push(row);

            } catch (e) {
                console.log(e)
            }
        }

        matrixesInput.push(matrix);
    }

    // console.log(matrixesInput);

    //First exercise
    // var matrixesInput = [testMatrix1, testMatrix2, testMatrix3];
    // var numbersInput = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];
    //Second exercise
    var numbersInput = [1, 76, 38, 96, 62, 41, 27, 33, 4, 2, 94, 15, 89, 25, 66, 14, 30, 0, 71, 21, 48, 44, 87, 73, 60, 50, 77, 45, 29, 18, 5, 99, 65, 16, 93, 95, 37, 3, 52, 32, 46, 80, 98, 63, 92, 24, 35, 55, 12, 81, 51, 17, 70, 78, 61, 91, 54, 8, 72, 40, 74, 68, 75, 67, 39, 64, 10, 53, 9, 31, 6, 7, 47, 42, 90, 20, 19, 36, 22, 43, 58, 28, 79, 86, 57, 49, 83, 84, 97, 11, 85, 26, 69, 23, 59, 82, 88, 34, 56, 13];
    findLastWinner(numbersInput, matrixesInput);

    var mapEntries = Array.from(winningMatrixes);
    var lastEntry = mapEntries[mapEntries.length - 1];
    var [lastNumber, lastMatrix] = lastEntry;

    var score = sumMatrixValues(lastMatrix) * lastNumber.split('-')[0];
    console.log(`Last winner Matrix: Matrix with index: ${lastNumber.split('-')[1]}, and its score is ${score}`)
};


function findLastWinner(numbers, matrixes) {
    var index = 0;
    for (var number of numbers) {
        var matrixIndex = 0;
        for (var matrix of matrixes) {
            if (!Array.from(winningMatrixes.values()).includes(matrix)) {//if the matrix already won don't do anything on it to free up time
                markNumbers(matrix, number);
                if (index >= matrixes[0].length - 1) {//only check winner after enough numbers have been iterated
                    var isWinner = hasWinningRowOrColumn(matrix);
                    if (isWinner) {
                        winningMatrixes.set(number + '-' + matrixIndex, matrix);
                    }
                }

            }
            matrixIndex++;
        }

        index++;
    }
}

function markNumbers(matrix, number) {
    // Here I loop through rows and then columns to find the given number and substitute it by -1
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === number) {
                matrix[i][j] = -1;
            }
        }
    }
}

function hasWinningRowOrColumn(matrix) {
    if (matrix.some(row => row.every(value => value === -1))) {
        return true;
    }

    const numColumns = matrix[0].length;
    for (let col = 0; col < numColumns; col++) {
        if (matrix.every(row => row[col] === -1)) {
            return true;
        }
    }

    return false;
}

function sumMatrixValues(matrix) {
    let sum = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] !== -1) {
                sum += matrix[i][j];
            }
        }
    }
    return sum;
}




