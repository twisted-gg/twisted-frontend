import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card, CardBody, FormGroup, Input, Row, Col } from 'reactstrap'
import { Search } from 'react-feather'
import '../../../../assets/scss/components/find-summoner.scss'

class FindSummonerComponent extends Component {
  constructor () {
    super()
    this.state = {
      summonerName: '',
      region: 'lan' // TODO
    }
  }

  redirectToSummonerPage () {
    const {
      region,
      summonerName
    } = this.state
    if (!summonerName) return
    this.props.history.push(`/summoner/${region}/${summonerName}`)
  }

  onChange (e) {
    const { value } = e.target
    if (typeof value !== 'string') return
    this.setState({ summonerName: value })
  }

  onKeyDown (e) {
    const { keyCode } = e
    const enterKeyCode = 13
    if (keyCode !== enterKeyCode) return
    e.preventDefault()
    this.redirectToSummonerPage()
  }

  render () {
    return (
      <Row>
        <Col sm='12' className='find-summoner'>
          <Card className='find-summoner-bg'>
            <CardBody>
              <h1 className='white'>Summoners</h1>
              <p className='mb-2 white'>Find a summoner and see its stats, historic and more!</p>
              <form>
                <FormGroup className='position-relative has-icon-left mb-0'>
                  <Input
                    type='text'
                    placeholder='Summoner name'
                    bsSize='lg'
                    className='find-summoner-input'
                    value={this.state.summonerName}
                    onChange={e => this.onChange(e)}
                    onKeyDown={e => this.onKeyDown(e)}
                  />
                  <div className='form-control-position'>
                    <Search size={14} />
                  </div>
                </FormGroup>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export const FindSummoner = withRouter(FindSummonerComponent)
