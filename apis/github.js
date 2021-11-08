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
    bio
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
    followers(first: 3) {
      totalCount
      recent: nodes {
        login
      }
    }
    following(first: 3) {
      totalCount
      recent: nodes {
        login
      }
    }
    sponsors(first: 3) {
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
    sponsoring(first: 3) {
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
      first: 3
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      totalCount
      recent: nodes {
        name
      }
    }
    organizations(first: 3) {
      totalCount
      recent: nodes {
        login
      }
    }
    packages(first: 3) {
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
    projects(first: 3, orderBy: { field: UPDATED_AT, direction: DESC }) {
      totalCount
      recent: nodes {
        name
      }
    }
    pullRequests(first: 3, orderBy: { field: CREATED_AT, direction: DESC }) {
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
    issues(first: 3, orderBy: { field: CREATED_AT, direction: DESC }) {
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
      first: 3
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
    stars: repositories(first: 100, privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
        stargazerCount
      }
    }
    topRepositories(orderBy: { field: UPDATED_AT, direction: DESC }, first: 3) {
      nodes {
        nameWithOwner
      }
    }
  }
`

const headers = {
  authorization: '',
}

function authenticate (token) {
  if (!token) throw new Error('Missing authentication token')
  headers.authorization = `token ${token}`
}

async function getUser (username) {
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

async function getUserStats(username) {
  const user = await getUser(username)
  const stats = {
    username: user.login,
    name: user.name || user.login,
    email: user.email,
    location: user.location || '???',
    bio: user.bio || '',
    status: user.status?.message || '',
    followers: user.followers.totalCount,
    recentFollowers: user.followers.recent.map(x => x.login),
    following: user.following.totalCount,
    recentFollowing: user.following.recent.map(x => x.login),
    sponsors: user.sponsors.totalCount,
    recentSponsors: user.sponsors.recent.map(x => x.login),
    sponsoring: user.sponsoring.totalCount,
    recentSponsoring: user.sponsoring.recent.map(x => x.login),
    gists: user.gists.totalCount,
    recentGists: user.gists.recent.map(x => x.name),
    organizations: user.organizations.totalCount,
    recentOrganizations: user.organizations.recent.map(x => x.login),
    contributedTo: user.repositoriesContributedTo.totalCount,
    recentContributedTo: user.repositoriesContributedTo.recent.map(x => x.nameWithOwner),
    packages: user.packages.totalCount,
    recentPackages: user.packages.recent.map(x => `${x.packageType}:${x.name}@${x.versions.nodes[0].version}`),
    projects: user.projects.totalCount,
    recentProjects: user.projects.recent.map(x => x.name),
    pullRequests: user.pullRequests.totalCount,
    recentPullRequests: user.pullRequests.recent.map(x => `#${x.number} ${x.repository.nameWithOwner}`),
    issues: user.issues.totalCount,
    recentIssues: user.issues.recent.map(x => `#${x.number} ${x.repository.nameWithOwner}`),
    starred: user.starredRepositories.totalCount,
    recentStarred: user.starredRepositories.recent.map(x => x.nameWithOwner),
    commits: user.contributionsCollection.totalCommitContributions,
    repositories: user.repositories.totalCount,
    stars: user.stars.nodes.reduce((acc, val) => { return acc + val.stargazerCount }, 0),
    topRepositories: user.topRepositories.nodes.map(x => x.nameWithOwner),
  }
  return stats
}

export { authenticate, getUserStats as fetch }
