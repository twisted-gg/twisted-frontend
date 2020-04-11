import React from 'react'
import * as Icon from 'react-feather'

const navigationConfig = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    navLink: '/',
    icon: <Icon.Home size={20} />
  },
  {
    type: 'groupHeader',
    groupTitle: 'Champions'
  },
  {
    id: 'listing',
    title: 'Listing',
    type: 'item',
    icon: <Icon.List size={20} />,
    navLink: '/champions'
  },
  {
    id: 'buildFinder',
    title: 'Build finder',
    type: 'item',
    icon: <Icon.Search size={20} />,
    navLink: '/build-finder'
  },
  {
    id: 'championStatistics',
    title: 'Statistics',
    type: 'item',
    icon: <Icon.BarChart size={20} />,
    navLink: '/build-finder'
  },
  {
    type: 'groupHeader',
    groupTitle: 'Summoners'
  },
  {
    id: 'summonerLeaderboard',
    title: 'Leaderboard',
    type: 'item',
    icon: <Icon.BarChart2 size={20} />,
    navLink: '/summoner/leaderboard'
  },
  {
    type: 'groupHeader',
    groupTitle: 'Esports'
  },
  {
    id: 'esportsTeams',
    title: 'Teams',
    type: 'item',
    icon: <Icon.Award size={20} />,
    navLink: '/esports/teams'
  },
  {
    id: 'esportsProplayers',
    title: 'Leaderboard',
    type: 'item',
    icon: <Icon.UserPlus size={20} />,
    navLink: '/esports/players'
  },
  {
    id: 'esportsPromatches',
    title: 'Matches',
    type: 'item',
    icon: <Icon.Airplay size={20} />,
    navLink: '/esports/matches'
  }
]

export default navigationConfig
