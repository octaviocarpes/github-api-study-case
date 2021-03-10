import axios from 'axios'

const API_URL = 'https://api.github.com'

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Accept': 'application/vnd.github.v3+json'
	}
})
