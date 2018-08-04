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