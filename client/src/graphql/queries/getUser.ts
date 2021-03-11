import { gql } from '@apollo/client'

export const GET_USER = (username: string) => gql`
    query {
        getUser(username: "${username}") {
            login
            id
            name
            bio
            avatar_url
            followers
            following
            public_repos
            repos {
              id
              full_name
              stargazers_count
              html_url
              forks
              description
            }
        }
    }
`
