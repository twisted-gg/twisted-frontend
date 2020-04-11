import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CdnService from '../../../../services/cdn/CdnService'
import { Row, Col } from 'reactstrap'

import '../../../../assets/scss/components/champion-summoner-stat.scss'

export class ChampionSummonerStat extends Component {
  render () {
    const {
      championName,
      cssAverage,
      cssAveragePerMinute,
      kda,
      kdaDetails,
      winrate,
      games
    } = this.props
    return (
      <Row className='champion-summoner-stat'>
        <Col size={3} className=''>
          <img src={CdnService.getChampionImage(championName)} alt={championName} />
        </Col>
        <Col size={3} className='item'>
          <Row>
            <p>{championName}</p>
          </Row>
          <Row>
            <p>CSS {cssAverage} ({cssAveragePerMinute})</p>
          </Row>
        </Col>
        <Col size={3} className='item'>
          <Row>
            <p>KDA {kda}</p>
          </Row>
          <Row>
            <p>{kdaDetails}</p>
          </Row>
        </Col>
        <Col size={3} className='item'>
          <Row>
            <p>{winrate}%</p>
          </Row>
          <Row>
            <p>{games} played</p>
          </Row>
        </Col>
      </Row>
    )
  }
}

ChampionSummonerStat.propTypes = {
  championName: PropTypes.string.isRequired,
  cssAverage: PropTypes.number.isRequired,
  cssAveragePerMinute: PropTypes.number.isRequired,
  kda: PropTypes.number.isRequired,
  kdaDetails: PropTypes.string.isRequired,
  winrate: PropTypes.number.isRequired,
  games: PropTypes.number.isRequired
}
