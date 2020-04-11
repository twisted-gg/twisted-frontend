import React, { Component } from 'react'
import { Row, Col, Card, CardBody, Input, FormGroup } from 'reactstrap'
import { Search } from 'react-feather'

import '../../../../assets/scss/components/find-champion.scss'

export class FindChampion extends Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
  }

  onChange (e) {
    const { value } = e.target
    if (typeof value !== 'string') return
    this.setState({ value })
    this.props.onChange(value)
  }

  onKeyDown (e) {
    const { keyCode } = e
    const enterKeyCode = 13
    if (keyCode === enterKeyCode) {
      e.preventDefault()
    }
  }

  render () {
    return (
      <Row>
        <Col sm='12' className='find-champion'>
          <Card className='find-champion-bg'>
            <CardBody>
              <h1 className='white'>Champions</h1>
              <p className='mb-2 white'>Filter champions</p>
              <form>
                <FormGroup className='position-relative has-icon-left mb-0'>
                  <Input
                    type='text'
                    placeholder='Champion name'
                    bsSize='lg'
                    className='find-champion-input'
                    value={this.state.value}
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
