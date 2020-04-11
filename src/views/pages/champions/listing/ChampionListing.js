import React, { Component } from 'react'
import { FindChampion } from '../../../../components/redbuff/champions/listing/FindChampion'
import ChampionListingService from '../../../../services/champions/ChampionListingService'
import { ChampionItem } from '../../../../components/redbuff/champions/listing/ChampionItem'
import { Card, CardBody, Row, Col } from 'reactstrap'

export class ChampionListing extends Component {
  constructor () {
    super()
    this.state = {
      champions: [],
      filteredChampions: []
    }
  }

  championNameChange (value) {
    const filteredChampions = this.state.champions.filter(c => {
      return new RegExp(value, 'gi').test(c.name)
    })
    this.setState({ filteredChampions })
  }

  async loadChampions () {
    if (this.state.champions.length !== 0) return
    const champions = await ChampionListingService.getListing()
    this.setState({ champions, filteredChampions: champions })
  }

  getChampions () {
    const champions = this.state.filteredChampions
    if (!champions.length) {
      return (
        <em>No champions found</em>
      )
    }
    return champions.map(c => (
      <ChampionItem
        key={c.id}
        champion={c}
      />
    ))
  }

  componentDidMount () {
    this.loadChampions()
  }

  render () {
    return (
      <>
        <Row>
          <Col size={12}>
            <FindChampion
              onChange={value => this.championNameChange(value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={12}>
            <Card>
              Implementation in course
            </Card>
          </Col>
          <Col md={9} sm={12}>
            <Card>
              <CardBody>
                {this.getChampions()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
