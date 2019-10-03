export default {
	readCookie(key) {
		let cookieValue = ''
		const cookieArray = document.cookie.split(';')
		cookieArray.forEach((cookieString) => {
			const cookiePair = cookieString.trim().split('=')
			if (cookiePair[0] === key) {
				cookieValue = cookiePair[1]
			}
		})
		return cookieValue
	},
	setCookie(key, value, domain = '.tesco.com') {
		document.cookie = `${key}=${value};path=/;domain=${domain}`
	},
}
