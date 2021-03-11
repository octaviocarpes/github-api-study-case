import React, { ReactElement, ReactNode, PropsWithChildren, memo, useState } from 'react'
import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	SkeletonCircle,
	SkeletonText,
	Skeleton,
	Avatar,
	Text,
	Stack,
	List,
	ListItem,
	FormErrorMessage,
	useToast,
	FormControl,
	Link
} from '@chakra-ui/react'
import { Icon, SearchIcon } from '@chakra-ui/icons'
import { User } from '../../models/User'
import { useForm } from 'react-hook-form'
import { GET_USER } from '../../graphql/queries/getUser'
import { client } from '../../graphql/client'
import { BsFolderFill } from 'react-icons/bs'


interface PropTypes {
    children?: ReactNode
}

const HomeLayout: React.FC<PropTypes> = memo((props: PropsWithChildren<any>): ReactElement => {
	const toast = useToast()
	const [user, setUser] = useState<User>({
		id: 0,
		name: '',
		login: '',
		avatar_url: '',
		followers: 0,
		following: 0,
		public_repos: 0,
		repos: []
	})
	const [isLoading, setIsLoading] = useState(false)
	const { register, errors, handleSubmit } = useForm()


	const paddingSize = '16%'

	const onSubmit = async ({ username }: { username: string }) => {
		setIsLoading(true)
		try {
			const response = await client.query({ query: GET_USER(username) })
			setIsLoading(false)
			setUser(response.data.getUser)
		} catch (error) {
			setIsLoading(false)
			toast({
				title: 'User not found',
				variant: 'solid',
				isClosable: true,
				status: 'error',
				position: 'top'
			})
		}
	}

	const renderUserData = () => {
		if (user.id) {
			return (
				<Box>
					<Box
						marginBottom={4}
					>
						<Flex
							alignItems={'center'}
						>
							<Box>
								<Avatar
									size={'2xl'}
									src={user.avatar_url}
									name={user.name}
									marginRight={4}
								/>
							</Box>
							<Box>
								<Heading fontSize={['md', 'lg', 'xl', '2xl']} marginBottom={2}>{user.name}</Heading>
								<Text fontSize={['sm', 'md', 'lg', 'xl']} marginBottom={4}>{user.bio}</Text>
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>Followers: {user.followers}</Text>
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>Following: {user.following}</Text>
							</Box>
						</Flex>
					</Box>
					<Box>
						<Heading
							size={'md'}
							marginBottom={8}
						>
							Repositories
						</Heading>
						<List>
							{user.repos.map(repository => (
								<ListItem marginBottom={4} key={repository.id}>
									<Box  border={'1px solid'} borderRadius={'5px'} padding={2}>
										<Flex alignItems={'center'} marginBottom={2}>
											<Icon as={BsFolderFill} marginRight={2} />
											<Link isExternal href={repository.html_url}>
												<Heading size={'sm'}>{repository.full_name}</Heading>
											</Link>
										</Flex>
										<Text>{repository.description}</Text>
									</Box>
								</ListItem>
							))}
						</List>
					</Box>
				</Box>
			)
		}
		return null
	}

	return (
		<Box
			width={'100vw'}
			height={'100vh'}
			paddingRight={['2%', '4%', '10%', '15%']}
			paddingLeft={['2%', '4%', '10%', '15%']}
			paddingTop={'4%'}
		>
			<Flex
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Box>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex>
							<FormControl isInvalid={errors.username}>
								<InputGroup
									marginBottom={4}
								>
									<InputLeftElement pointerEvents={'none'} marginRight={6}>
										<SearchIcon color={'gray.300'} />
									</InputLeftElement>
									<Input
										width={['200px', '300px', '400px', '500px']}
										height={['36px', '36px', '40px', '40px']}
										type={'text'}
										name={'username'}
										id={'username'}
										placeholder={'Search for a user on Github'}
										errorBorderColor={'crimson'}
										isInvalid={errors.username}
										ref={register({ required: true })}
									/>
								</InputGroup>
								<FormErrorMessage>Username is required</FormErrorMessage>
							</FormControl>
							<Button
								isLoading={isLoading}
								type={'submit'}
							>
								Search
							</Button>
						</Flex>
					</form>
				</Box>
			</Flex>
			<Grid
				width={'100%'}
			>
				{ isLoading ? (
					<Box>
						<Flex marginBottom={8}>
							<SkeletonCircle size={'20'} marginRight={4} />
							<Box width={'100%'}>
								<SkeletonText mt="4" noOfLines={4} spacing="4" />
							</Box>
						</Flex>
						<Box>
							<Stack>
								<Skeleton height="20px" />
								<Skeleton height="20px" />
								<Skeleton height="20px" />
							</Stack>
						</Box>
					</Box>
				): renderUserData()}
			</Grid>
		</Box>
	)
})

HomeLayout.displayName = 'HomeLayout'

export { HomeLayout }
