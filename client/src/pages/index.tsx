import React, { ReactElement, PropsWithChildren } from 'react'
import { HomeLayout } from '../layouts/HomePage'

interface PropTypes {
    children?: ReactElement
}

const Home: React.FC<PropTypes> = (props: PropsWithChildren<any>) => {
	return (
		<HomeLayout />
	)
}

export default Home
