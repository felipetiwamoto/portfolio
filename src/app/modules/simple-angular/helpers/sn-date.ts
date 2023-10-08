export const snDate = (date: Date) => {
	const sec = date.getSeconds()
	const min = date.getMinutes()
	const hour = date.getHours()
	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()

	const toUser = () => {
		return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hour
			.toString()
			.padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
	}

	const toDB = () => {
		return `${year}-${month.toString().padStart(2, '0')}-${year.toString().padStart(4, '0')} ${hour
			.toString()
			.padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
	}

	return {toUser, toDB}
}
