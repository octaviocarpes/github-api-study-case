import { ApolloServer } from 'apollo-server'

import { typeDefs } from './graphql/types'
import { resolvers } from './graphql/resolvers/resolvers'

const server = new ApolloServer({
	typeDefs,
	resolvers
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})
