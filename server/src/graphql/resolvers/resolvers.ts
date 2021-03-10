import { api } from '../../services/userService'
import { User } from '../../models/User'

export  const resolvers = {
	Query: {
		getUser: async (_: any, { username }: { username: string}) => {
			const userResponse = await api.get(`/users/${username}`)
			const reposResponse = await api.get(`/users/${username}/repos`)

			const user: User = {
				...userResponse.data,
				repos: [ ...reposResponse.data ]
			}

			return user
		}
	}
}
