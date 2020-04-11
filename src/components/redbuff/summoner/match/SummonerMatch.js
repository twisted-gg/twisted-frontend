import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'
import CdnService from '../../../../services/cdn/CdnService'

import '../../../../assets/scss/components/summoner-match.scss'

export class SummonerMatch extends Component {
  getChampionIndex () {
    const {
      championListing,
      match: {
        summoner: {
          champion
        }
      }
    } = this.props
    let index = 0
    let name = ''
    for (const champ of championListing) {
      if (+champ.key === champion) {
        index = champ.index
        name = champ.name
        break
      }
    }
    return {
      index,
      name
    }
  }

  render () {
    const { name } = this.getChampionIndex()
    return (
      <Row className='summoner-match'>
        <Col sm={2}>
          <Col>
            <Col>
              Ranked solo
            </Col>
            <Col>
              16 hours ago
            </Col>
          </Col>
          <Col>
            <Col>
              Defeat
            </Col>
            <Col>
              32m 16s
            </Col>
          </Col>
        </Col>
        <Col sm={2}>
          <Row>
            <Col sm={6}>
              <div className='champion-image'>
                <img src={CdnService.getChampionImage(name)} alt={name} />
              </div>
            </Col>
            <Col sm={6}>
              <Col>
                Summoners
              </Col>
              <Col>
                Runes
              </Col>
            </Col>
          </Row>
        </Col>
        <Col sm={2}>
          1
        </Col>
        <Col sm={2}>
          1
        </Col>
        <Col sm={2}>
          1
        </Col>
        <Col sm={2}>
          1
        </Col>
      </Row>
    )
  }
}

SummonerMatch.propTypes = {
  championListing: PropTypes.array.isRequired
}
