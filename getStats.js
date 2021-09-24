import { graphql } from '@octokit/graphql'
import dotenv from 'dotenv'

dotenv.config()

const graphqlAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PAT}`,
  },
})

const gql = String.raw

const query = gql`
  {
    viewer {
      login
      name
      email
      createdAt
      location
      status {
        message
        emoji
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      sponsors {
        totalCount
      }
      sponsoring {
        totalCount
      }
      gists(privacy: PUBLIC) {
        totalCount
      }
      organizations {
        totalCount
      }
      repositoriesContributedTo(privacy: PUBLIC) {
        totalCount
      }
      packages {
        totalCount
      }
      projects {
        totalCount
      }
      pullRequests {
        totalCount
      }
      issues {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
      isBountyHunter
      isCampusExpert
      isDeveloperProgramMember
      isEmployee
      isGitHubStar
      isHireable
      isSiteAdmin
      repositories(
        first: 100
        isFork: false
        ownerAffiliations: OWNER
        privacy: PUBLIC
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
  }
`

const getStats = async function () {
  const { viewer } = await graphqlAuth(query)
  // console.log(viewer)
  let stats = {
    username: viewer.login,
    name: viewer.name || viewer.login,
    email: viewer.email,
    location: viewer.location || '???',
    status: viewer.status.message,
    followers: viewer.followers.totalCount,
    following: viewer.following.totalCount,
    sponsors: viewer.sponsors.totalCount,
    sponsoring: viewer.sponsoring.totalCount,
    gists: viewer.gists.totalCount,
    organizations: viewer.organizations.totalCount,
    contributedTo: viewer.repositoriesContributedTo.totalCount,
    packages: viewer.packages.totalCount,
    projects: viewer.projects.totalCount,
    pullRequests: viewer.pullRequests.totalCount,
    issues: viewer.issues.totalCount,
    stared: viewer.starredRepositories.totalCount,
    commits: viewer.contributionsCollection.totalCommitContributions,
    repositories: viewer.repositories.totalCount,
  }
  return stats
  //   const {
  //     login: username,
  //     name,
  //     email,
  //     location,
  //     status: { message: status },
  //     followers: {totalCount: followers}
  //   } = viewer
}

export default getStats
