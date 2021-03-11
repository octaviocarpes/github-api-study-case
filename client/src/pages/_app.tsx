import React from 'react'
import '../../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'


function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
	return (
		<>
			<Helmet>
				<title>Github API</title>
			</Helmet>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	)
}

export default MyApp
