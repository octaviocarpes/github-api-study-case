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
	Link,
	Divider,
	useBreakpointValue,
} from '@chakra-ui/react'
import { Icon, SearchIcon } from '@chakra-ui/icons'
import { User } from '../../models/User'
import { useForm } from 'react-hook-form'
import { GET_USER } from '../../graphql/queries/getUser'
import { client } from '../../graphql/client'
import { BsFolderFill } from 'react-icons/bs'
import { AiOutlineFork, AiFillStar } from 'react-icons/ai'


interface PropTypes {
    children?: ReactNode
}

const HomeLayout: React.FC<PropTypes> = memo((props: PropsWithChildren<any>): ReactElement => {
	const toast = useToast()
	const breakpoint = useBreakpointValue<'row' | 'column'>({
		base: 'column',
		xs: 'column',
		sm: 'row',
		md: 'row',
		lg: 'row',
		xl: 'row'
	})

	console.log(breakpoint)

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

	const boxShadow = `
  		0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  		0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  		0 12.5px 10px rgba(0, 0, 0, 0.035),
  		0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  		0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  		0 100px 80px rgba(0, 0, 0, 0.07);
	`

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
							flexDirection={breakpoint}
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
								<ListItem   border={'1px solid lightgray'} borderRadius={'5px'} marginBottom={4} key={repository.id}>
									<Box padding={2}>
										<Flex alignItems={'center'} marginBottom={2}>
											<Icon color={'blue.500'} as={BsFolderFill} marginRight={2} />
											<Link color={'blue.500'} isExternal href={repository.html_url}>
												<Heading fontSize={['xs', 'sm', 'md', 'lg']}>{repository.full_name}</Heading>
											</Link>
										</Flex>
										<Text marginBottom={4}>{repository.description}</Text>
										<Flex>
											<Box marginRight={8}>
												<Flex alignItems={'center'}>
													<Icon as={AiFillStar} marginRight={2} />
													<Text>Stars {repository.stargazers_count}</Text>
												</Flex>
											</Box>

											<Box>
												<Flex alignItems={'center'}>
													<Icon as={AiOutlineFork} marginRight={2} />
													<Text>Forks {repository.forks}</Text>
												</Flex>
											</Box>
										</Flex>
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
			<Box
				boxShadow={boxShadow}
				backgroundColor={'white'}
				padding={8}
				borderRadius={'5px'}
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
				<Divider marginTop={6} marginBottom={6} />
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
			<Box height={'24px'} />
		</Box>
	)
})

HomeLayout.displayName = 'HomeLayout'

export { HomeLayout }
