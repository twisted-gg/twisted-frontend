import React, { Suspense, lazy } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { history } from './history'
import { connect } from 'react-redux'
import Spinner from './components/@vuexy/spinner/Loading-spinner'
import { ContextLayout } from './utility/context/Layout'
import { ChampionListing } from './views/pages/champions/listing/ChampionListing'
import { Summoner } from './views/pages/summoner/Summoner'

// Route-based code splitting
const Home = lazy(() =>
  import('./views/pages/Home')
)

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            const LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render () {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path='/'
            component={Home}
          />
          <AppRoute
            path='/champions'
            component={ChampionListing}
          />
          <AppRoute
            path='/summoner/:region/:summonerName'
            component={Summoner}
          />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
