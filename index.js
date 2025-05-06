const prompt = require('prompt-sync')();
const title = {
    ex1: "1 Calculate the combination (Cnk)",
    ex2: "2 Get a random integer between 2 numbers: min, max",
    ex3: "3 Get a random element from an arrays",
    ex4: `4 Which elements in the second array are missing from the first array.`
}
ex()
function ex() {
    let input;
    do {
        console.log(title.ex1)
        console.log(title.ex2)
        console.log(title.ex3)
        console.log(title.ex4)
        input = prompt("please chose 1-4. Pess 0 for excape: ").trim()
        switch (input) {
            case "1":
                ex1()
                break;
            case "2":
                ex2()
                break;
            case "3":
                ex3()
                break;
            case "4":
                ex4()
                break;
            default:
            break;
        }
        console.log('\n')
    } while (input != "0");
}
// 1. Write the function to calculate the combination (Ckn) C(n,k) = n! / (k!(n-k)!)
function calCombination(n, k) {
    console.log(n, k)
    if (k < 0 || k > n) {
        return 0; // Invalid input
    }
    if (k < 0 || k > n) {
        return 0; // Invalid input
    }
    return factorialize(n) / (factorialize(k) * factorialize(n - k))
}

function factorialize(n) {
    if (n < 0) {
        return -1;
    }
    if (n == 1 || n == 0) {
        return 1;
    }
    for (let i = n - 1; i >= 1; i--) {
        n *= i;
    }
    return n
}
function isNumber(n) {
    n = Number(n)
    if (!n && n != 0) {
        console.log(`${n} is not a number`)
        return false;
    }
    return true;
}

function getNumberInput(str) {
    let n
    do {
        n = prompt(str)
    } while (!isNumber(n))
    return Number(n);
}

function ex1() {
    console.log(title.ex1)
    let k = getNumberInput("Enter k Number:")
    let n = getNumberInput("Enter n Number:")
    let res = calCombination(n, k);
    if (res > 0) {
        console.log(`C(${n},${k}) = ${res}`)
    } else {
        console.log("Invalid input k < 0 || k > n")
    }
}


// Write the function to get a random integer between 2 numbers: min, max;
function ex2() {
    console.log(title.ex2)
    let min = getNumberInput("Enter min Number:")
    let max = getNumberInput("Enter max Number:")
    if (min > max) {
        console.log("Invalid input: min > max")
    }
    let ran = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("Random integer between min,max:", ran)
}


// 3. Write the function get a random element from an arrays.
function ex3() {
    console.log(title.ex3)
    let str = prompt("Enter the array elements separated by a space: ");
    let arr = str.split(' ')
    let ran = Math.floor(Math.random() * arr.length);
    console.log(arr)
    console.log(`${ran + 1} from an arrays: ${arr[ran]}`)
}


// Given two arrays of integers,
//find which elements in the second array are missing from the first array.
//
function ex4() {
    console.log(title.ex4)
    let str = prompt("Enter the 1st array elements separated by a space: ");
    let arr1 = str.split(' ').map(Number)
    str = prompt("Enter the 2st array elements separated by a space: ");
    let arr2 = str.split(' ').map(Number)

    console.log(`array 1: ${arr1}`)
    console.log(`array 2: ${arr2}`)
    let arr = []
    arr2.forEach((element) => {
        if (!arr1.includes(element))
            arr.push(element)
    });
    if (arr.length != 0) {
        console.log("Elements missing: ", arr)
    } else {
        console.log("No element missing")
    }
}
