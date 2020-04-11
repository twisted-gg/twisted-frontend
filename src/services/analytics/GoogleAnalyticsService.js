import ReactGA from 'react-ga'
import siteConfig from '../../configs/SiteConfig'

const { analytics } = siteConfig

const pageView = `${window.location.pathname}${window.location.search}`

// Export methods
export default {
  initialize () {
    ReactGA.initialize(analytics.code, analytics.options)
    ReactGA.pageview(pageView)
  },
  historyListener (location) {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  },
  trackEvent (category, action, value) {
    ReactGA.event({ category, action, value })
  }
}
