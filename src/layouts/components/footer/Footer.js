import React from 'react'
import ScrollToTop from 'react-scroll-up'
import { Button } from 'reactstrap'
import { ArrowUp } from 'react-feather'
import classnames from 'classnames'

const Footer = props => {
  const footerTypeArr = ['sticky', 'static', 'hidden']
  return (
    <footer
      className={classnames('footer footer-light', {
        'footer-static': props.footerType === 'static' || !footerTypeArr.includes(props.footerType),
        'd-none': props.footerType === 'hidden'
      })}
    >
      <p className='mb-0 clearfix'>
        <span className='float-md-left d-block d-md-inline-block mt-25'>
          <span>COPYRIGHT &copy;</span>
          <span>{new Date().getFullYear()}</span>
          <a href='https://www.redbuff.net' rel='nofollow'>REDBUFF.NET</a> isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games
or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are
trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
        </span>
      </p>
      {props.hideScrollToTop === false ? (
        <ScrollToTop showUnder={160}>
          <Button color='primary' className='btn-icon scroll-top'>
            <ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null}
    </footer>
  )
}

export default Footer
