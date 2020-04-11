import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { Pie } from 'react-chartjs-2'
import PropTypes from 'prop-types'

import '../../../../assets/scss/components/summoner-match-stats.scss'

export class SummonerMatchStats extends Component {
  generateChartData () {
    const themeColors = ['#3366ff', '#ff1a1a']
    return {
      labels: ['Wins', 'Losses'],
      datasets: [
        {
          data: [this.props.wins, this.props.losses],
          backgroundColor: themeColors
        }
      ]
    }
  }

  getChart () {
    const options = {
      legend: {
        display: false
      }
    }
    const height = 70
    return <Pie data={this.generateChartData()} options={options} height={height} />
  }

  getTotal () {
    return this.props.wins + this.props.losses
  }

  render () {
    return (
      <Row id='summoner-match-stats'>
        <Col id='summoner-match-graph' md={3}>
          {this.getChart()}
          <p>{this.getTotal()}G {this.props.wins}W {this.props.losses}L</p>
        </Col>
      </Row>
    )
  }
}

SummonerMatchStats.propTypes = {
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired
}
