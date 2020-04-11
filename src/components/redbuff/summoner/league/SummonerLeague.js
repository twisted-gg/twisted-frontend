import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CdnService from '../../../../services/cdn/CdnService'
import { Row, Col } from 'reactstrap'

import '../../../../assets/scss/components/summoner-league.scss'

export class SummonerLeague extends Component {
  getEmblemUrl () {
    const path = `img/tier-icons/${this.props.tier.toLowerCase()}_${this.props.rank}.png`
    return CdnService.getResourceUrl(path)
  }

  getWinrate () {
    const { wins, losses } = this.props
    return parseInt((wins / (wins + losses)) * 100, 10)
  }

  render () {
    const {
      league,
      tier,
      rank,
      points,
      wins,
      losses
    } = this.props
    return (
      <Row className='summoner-league'>
        <Col sm={12} className='text-center'>
          <img className='img-responsive center-block' src={this.getEmblemUrl()} alt={league} />
        </Col>
        <Col sm={12}>
          <p>{league}</p>
          <p>{tier} {rank}</p>
          <p>{points}LP / {wins}W {losses}L</p>
          <p>Winrate {this.getWinrate()}%</p>
        </Col>
      </Row>
    )
  }
}

SummonerLeague.propTypes = {
  league: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired
}
