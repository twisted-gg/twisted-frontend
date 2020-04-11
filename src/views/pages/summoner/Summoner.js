import React, { Component } from 'react'
import { SummonerProfile } from '../../../components/redbuff/summoner/profile/SummonerProfile'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { SummonerLeague } from '../../../components/redbuff/summoner/league/SummonerLeague'
import { SummonerMatchStats } from '../../../components/redbuff/summoner/match-stats/SummonerMatchStats'
import { ChampionSummonerStat } from '../../../components/redbuff/champions/summoner/ChampionSummonerStat'
import { orderBy } from 'lodash'
import ChampionListingService from '../../../services/champions/ChampionListingService'

import '../../../assets/scss/pages/summoner.scss'
import { SummonerMatch } from '../../../components/redbuff/summoner/match/SummonerMatch'

// TODO Remove this function
function getRandomArbitrary (min, max) {
  return Number.parseInt(Math.random() * (max - min) + min, 10)
}

export class Summoner extends Component {
  constructor () {
    super()
    this.state = {
      champions: [],
      profile: {
        name: '',
        region: '',
        // TODO
        icon: 1407,
        level: 25
      },
      // TODO
      leagues: [
        {
          league: 'Ranked Solo',
          tier: 'PLATINUM',
          rank: 1,
          points: 10,
          wins: 83,
          losses: 65
        },
        {
          league: 'Flex 5:5 Rank',
          tier: 'GOLD',
          rank: 4,
          points: 0,
          wins: 0,
          losses: 10
        }
      ],
      matches: {
        stats: {
          wins: getRandomArbitrary(0, 100),
          losses: getRandomArbitrary(0, 100)
        },
        games: [
          {
            summoner: {
              champion: 157
            }
          }
        ]
      },
      championStats: [
        {
          championName: 'Yasuo',
          cssAverage: 123,
          cssAveragePerMinute: 6,
          kda: 3.5,
          kdaDetails: '5/5/5',
          winrate: 60,
          games: 70
        },
        {
          championName: 'Irelia',
          cssAverage: 123,
          cssAveragePerMinute: 6,
          kda: 2.5,
          kdaDetails: '5/5/5',
          winrate: 30,
          games: 123
        }
      ]
    }
  }

  async loadChampions () {
    const champions = await ChampionListingService.getListing()
    this.setState({ champions })
  }

  getLeagues () {
    const { leagues } = this.state
    return leagues.map(l => (
      <Card key={l.league}>
        <CardBody>
          <SummonerLeague
            league={l.league}
            tier={l.tier}
            rank={l.rank}
            points={l.points}
            wins={l.wins}
            losses={l.losses}
          />
        </CardBody>
      </Card>
    ))
  }

  getChampStats () {
    const items = orderBy(this.state.championStats, c => c.games, 'desc')
    return (
      <Card>
        <CardBody>
          {items.map((champion) => (
            <ChampionSummonerStat
              key={`championStat${champion.championName}`}
              championName={champion.championName}
              cssAverage={champion.cssAverage}
              cssAveragePerMinute={champion.cssAveragePerMinute}
              kda={champion.kda}
              kdaDetails={champion.kdaDetails}
              winrate={champion.winrate}
              games={champion.games}
            />
          ))}
        </CardBody>
      </Card>
    )
  }

  componentDidMount () {
    this.loadChampions()
    const {
      match: {
        params: {
          summonerName: name,
          region
        }
      }
    } = this.props
    const profile = {
      ...this.state.profile,
      name,
      region
    }
    this.setState({ profile })
  }

  render () {
    const {
      champions,
      profile: {
        name,
        region,
        icon,
        level
      }
    } = this.state
    return (
      <>
        <Row>
          <Col md={3} sm={12}>
            <Card>
              <CardBody>
                <SummonerProfile
                  summonerName={name}
                  region={region}
                  icon={icon}
                  level={level}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={12}>
            {this.getLeagues()}
            {this.getChampStats()}
          </Col>
          <Col md={9} sm={12}>
            <Card>
              <CardBody>
                <SummonerMatchStats
                  wins={this.state.matches.stats.wins}
                  losses={this.state.matches.stats.losses}
                />
              </CardBody>
            </Card>
            <Card id='matches-listing'>
              <CardBody>
                <SummonerMatch
                  championListing={champions}
                  match={this.state.matches.games[0]}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
