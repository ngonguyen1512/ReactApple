export const getNumberFromString = (string) => {
    let number = +string.match(/\d+/)[0];
    return number;
}