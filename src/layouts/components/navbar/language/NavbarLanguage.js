import React, { Component } from 'react'
import ReactCountryFlag from 'react-country-flag'
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap'

export class NavbarLanguage extends Component {
  constructor () {
    super()
    this.state = {
      langDropdown: false,
      languages: [
        {
          code: 'us',
          name: 'English'
        },
        {
          code: 'es',
          name: 'Spanish'
        }
      ],
      selectedLanguage: 'es'
    }
  }

  getSelectedLanguage () {
    return this.state.languages.find(l => l.code === this.state.selectedLanguage)
  }

  render () {
    const selectedLanguage = this.getSelectedLanguage()
    return (
      <ul className='nav navbar-nav navbar-nav-user float-right language-selector'>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            <ReactCountryFlag
              className='country-flag'
              countryCode={selectedLanguage.code}
              svg
            />
            <span className='d-sm-inline-block d-none text-capitalize align-middle ml-50'>
              {selectedLanguage.name}
            </span>
          </DropdownToggle>
          <DropdownMenu>
            {this.state.languages.map(l => (
              <DropdownItem
                key={l.code}
                tag='a'
              >
                <ReactCountryFlag
                  className='country-flag'
                  countryCode={l.code} svg
                />
                <span className='ml-1'>{l.name}</span>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </ul>
    )
  }
}
