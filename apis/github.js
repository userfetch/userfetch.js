import { graphql, GraphqlResponseError } from '@octokit/graphql'

const gql = String.raw

const querySelf = gql`
  query getSelfStats {
    user: viewer {
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

const headers = {
  authorization: '',
}

const authenticate = function (token) {
  headers.authorization = `token ${token}`
}

const getUser = async function (username) {
  let query = ''
  let variables = {}

  if (!!username) {
    query = queryOther + userDataFragment
    variables.login = username
  } else {
    query = querySelf + userDataFragment
  }

  try {
    const { user } = await graphql(query, { ...variables, headers })
    return user
  }
  
  catch (error) {
    console.log('ERROR!')
    if (error instanceof GraphqlResponseError) {
      console.error(JSON.stringify(error.errors, null, 2))
      process.exit(process.exitCode)
    }
    throw error
  }
}

const getUserStats = async function (username) {
  const user = await getUser(username)
  const stats = {
    username: user.login,
    name: user.name || user.login,
    email: user.email,
    location: user.location || '???',
    status: user.status?.message || '',
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
    starred: user.starredRepositories.totalCount,
    commits: user.contributionsCollection.totalCommitContributions,
    repositories: user.repositories.totalCount,
  }
  return stats
}

export default { authenticate, fetch: getUserStats }
