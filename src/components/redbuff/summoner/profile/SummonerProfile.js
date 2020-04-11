import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CdnService from '../../../../services/cdn/CdnService'

import '../../../../assets/scss/components/summoner-profile.scss'

export class SummonerProfile extends Component {
  handleProfileIconError (e) {
    // Icon 0 as default
    const icon = 0
    e.target.src = CdnService.getProfileIcon(icon)
  }

  render () {
    const {
      summonerName,
      region,
      icon,
      level
    } = this.props
    return (
      <div id='summoner-profile'>
        <div id='profile-icon'>
          <img
            src={CdnService.getProfileIcon(icon)}
            alt={summonerName}
            onError={this.handleProfileIconError}
          />
          <div className='summoner-level'>
            <p>{level}</p>
          </div>
        </div>
        <div id='summoner-name'>
          <h3>{summonerName}</h3>
          <p>{region.toUpperCase()}</p>
        </div>
      </div>
    )
  }
}

SummonerProfile.propTypes = {
  summonerName: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired
}
