import React, { PureComponent } from 'react'
import classnames from 'classnames'
import Sidebar from './components/menu/vertical-menu/Sidebar'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { connect } from 'react-redux'
import {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
} from '../redux/actions/customizer/index'

class VerticalLayout extends PureComponent {
  constructor () {
    super()
    this.state = {
      width: window.innerWidth,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false
    }
    this.collapsedPaths = []
    this.mounted = false

    // Binds
    this.updateWidth = this.updateWidth.bind(this)
    this.handleCustomizer = this.handleCustomizer.bind(this)
    this.handleCollapsedMenuPaths = this.handleCollapsedMenuPaths.bind(this)
    this.toggleSidebarMenu = this.toggleSidebarMenu.bind(this)
    this.sidebarMenuHover = this.sidebarMenuHover.bind(this)
    this.handleSidebarVisibility = this.handleSidebarVisibility.bind(this)
    this.handleCurrentLanguage = this.handleCurrentLanguage.bind(this)
    this.handleAppOverlay = this.handleAppOverlay.bind(this)
    this.handleAppOverlayClick = this.handleAppOverlayClick.bind(this)
  }

  updateWidth () {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }))
    }
  }

  handleCustomizer (bool) {
    this.setState({
      customizer: bool
    })
  }

  componentDidMount () {
    this.mounted = true
    const {
      location: { pathname },
      app: {
        customizer: { direction }
      }
    } = this.props

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false)
      }
      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true)
      }

      const dir = direction
      if (dir === 'rtl') { document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl') } else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr')
      return document.body.classList.add('dark-layout')
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      location: { pathname },
      app: {
        customizer: { sidebarCollapsed }
      }
    } = this.props

    if (this.mounted) {
      document.body.classList.add('dark-layout')
      if (
        prevProps.app.customizer.sidebarCollapsed !==
        this.props.app.customizer.sidebarCollapsed
      ) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        })
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
          this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(true)
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
          this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        !this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(false)
      }
    }
  }

  handleCollapsedMenuPaths (item) {
    const collapsedPaths = this.collapsedPaths
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item)
      this.collapsedPaths = collapsedPaths
    }
  }

  toggleSidebarMenu (val) {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    })
  }

  sidebarMenuHover (val) {
    this.setState({
      sidebarState: val
    })
  }

  handleSidebarVisibility () {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener('resize', () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden
            })
          }
        })
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      })
    }
  }

  componentWillUnmount () {
    this.mounted = false
  }

  handleCurrentLanguage (lang) {
    this.setState({
      currentLang: lang
    })
  }

  handleAppOverlay (value) {
    if (value.length > 0) {
      this.setState({
        appOverlay: true
      })
    } else if (value.length < 0 || value === '') {
      this.setState({
        appOverlay: false
      })
    }
  }

  handleAppOverlayClick () {
    this.setState({
      appOverlay: false
    })
  }

  render () {
    const appProps = this.props.app.customizer
    const menuThemeArr = [
      'primary',
      'success',
      'danger',
      'info',
      'warning',
      'dark'
    ]
    const sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width
    }
    const navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    }

    const footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    }
    return (
      <div
        className={classnames(
          `wrapper vertical-layout theme-${appProps.menuTheme}`,
          {
            'menu-collapsed':
              this.state.collapsedContent === true && this.state.width >= 1200,
            'fixed-footer': appProps.footerType === 'sticky',
            'navbar-static': appProps.navbarType === 'static',
            'navbar-sticky': appProps.navbarType === 'sticky',
            'navbar-floating': appProps.navbarType === 'floating',
            'navbar-hidden': appProps.navbarType === 'hidden',
            'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
          }
        )}
      >
        <Sidebar {...sidebarProps} />
        <div
          className={classnames('app-content content', {
            'show-overlay': this.state.appOverlay === true
          })}
          onClick={e => this.handleAppOverlayClick(e)}
        >
          <Navbar {...navbarProps} />
          <div className='content-wrapper'>{this.props.children}</div>
        </div>

        <Footer {...footerProps} />
        <div
          className='sidenav-overlay'
          onClick={this.handleSidebarVisibility}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    app: state.customizer
  }
}
export default connect(mapStateToProps, {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
})(VerticalLayout)
