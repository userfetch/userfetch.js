import { graphql } from '@octokit/graphql'
import dotenv from 'dotenv'

dotenv.config()

const graphqlAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PAT}`,
  },
})

const gql = String.raw

const querySelf = gql`
  query getSelfStats {
    user: user {
      ...userData
    }
  }
`
const queryOther = gql`
  query getOtherStats($login: String = "") {
    user: user(login: $login) {
      ...userData
    }
  }
`
const userDataFragment = gql`
  fragment userData on User {
    login
    name
    email
    createdAt
    location
    status {
      message
      emoji
    }
    isBountyHunter
    isCampusExpert
    isDeveloperProgramMember
    isEmployee
    isGitHubStar
    isHireable
    isSiteAdmin
    followers(first: 5) {
      totalCount
      recent: nodes {
        login
      }
    }
    following(first: 5) {
      totalCount
      recent: nodes {
        login
      }
    }
    sponsors(first: 5) {
      totalCount
      recent: nodes {
        ... on User {
          login
        }
        ... on Organization {
          login
        }
      }
    }
    sponsoring(first: 5) {
      totalCount
      recent: nodes {
        ... on User {
          login
        }
        ... on Organization {
          login
        }
      }
    }
    gists(
      privacy: PUBLIC
      first: 5
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      totalCount
      recent: nodes {
        name
      }
    }
    organizations(first: 5) {
      totalCount
      recent: nodes {
        login
      }
    }
    packages(first: 5) {
      totalCount
      recent: nodes {
        name
        packageType
        versions(first: 1) {
          nodes {
            version
          }
        }
      }
    }
    projects(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
      totalCount
      recent: nodes {
        name
      }
    }
    pullRequests(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
      totalCount
      recent: nodes {
        number
        title
        state
        repository {
          nameWithOwner
        }
      }
    }
    issues(first: 5, orderBy: { field: CREATED_AT, direction: DESC }) {
      totalCount
      recent: nodes {
        number
        title
        state
        repository {
          nameWithOwner
        }
      }
    }
    repositoriesContributedTo(
      privacy: PUBLIC
      contributionTypes: COMMIT
      first: 5
      orderBy: { direction: DESC, field: PUSHED_AT }
    ) {
      totalCount
      recent: nodes {
        nameWithOwner
      }
    }
    starredRepositories(
      first: 5
      orderBy: { field: STARRED_AT, direction: DESC }
    ) {
      totalCount
      recent: nodes {
        nameWithOwner
      }
    }
    contributionsCollection {
      totalCommitContributions
    }
    repositories(
      first: 100
      isFork: false
      ownerAffiliations: OWNER
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      totalCount
      nodes {
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
        stargazerCount
      }
    }
  }
`

const getStats = async function (username) {
  let query = ''
  let variables = {}
  if (!!username) {
    query = queryOther + userDataFragment
    variables.login = username
  } else {
    query = querySelf + userDataFragment
  }
  const {user} = await graphqlAuth(query, variables)
  console.log(user)
  let stats = {
    username: user.login,
    name: user.name || user.login,
    email: user.email,
    location: user.location || '???',
    status: user.status.message,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    sponsors: user.sponsors.totalCount,
    sponsoring: user.sponsoring.totalCount,
    gists: user.gists.totalCount,
    organizations: user.organizations.totalCount,
    contributedTo: user.repositoriesContributedTo.totalCount,
    packages: user.packages.totalCount,
    projects: user.projects.totalCount,
    pullRequests: user.pullRequests.totalCount,
    issues: user.issues.totalCount,
    stared: user.starredRepositories.totalCount,
    commits: user.contributionsCollection.totalCommitContributions,
    repositories: user.repositories.totalCount,
  }
  return stats
  //   const {
  //     login: username,
  //     name,
  //     email,
  //     location,
  //     status: { message: status },
  //     followers: {totalCount: followers}
  //   } = user
}

export default getStats
