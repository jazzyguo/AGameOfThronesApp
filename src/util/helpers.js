export const bookStrings = ['A Game of Thrones', 'A Clash of Kings', 'A Storm of Sword',
'The Hedge Knight', 'A Feast for Crows', 'The Sworn Sword', 'The Mystery Knight', 
'A Dance with Dragons', 'The Princess and the Queen', 'The Rogue Prince', 'The World of Ice and Fire',
'A Knight of the Seven Kingdoms'];

/* Takes a string date like '2018-06-29'
 * and converts it into June 29, 2018
 * @ param {date} - string
 */
export function dateToString(dateString) {
	const months = ['January', 'February', 'March', 'April',
					'May', 'June', 'July', 'August', 'September',
					'October', 'November', 'December'];
	const month = parseInt(dateString.split('-')[1], 10);
	const date = parseInt(dateString.split('-')[2], 10);
	const year = parseInt(dateString.split('-')[0], 10);
	return `${months[month-1]} ${date}, ${year}`;
}

/* The api returns an array of length 1 with a null element if no results are found
* Checks for this
* @ {return} - boolean if the response is actually empty
*/
export function checkArrayEmpty(array) {
	if(array.length > 1) {
	  return false;
	} else if(array[0] === "") {
	  return true;
	}
}

/* Checks to see if the character appears in a book
 * Used for filtering the sworn members
 * @ {bookArray} array - Array of books from the api
 * @ {bookNum} int - book to filter
 * @ return {bool}
 */
export function hasBook(bookArray, bookNum) {
	let result = false;
	bookArray.forEach((bookUrl) => {
		if(getNumber(bookUrl, false) === bookNum) {
			result = true;
		}
	});
	return result;
}

/* Returns the number found from a string
 * using a regex
 * @ {numType} bool - return is a number or string
 */
export function getNumber(string, numType=true) {
	const numRegex = /[0-9]+/;
	let number = string.match(numRegex)[0];
	const result = numType ? parseInt(number, 10) : number;
	return result;
}