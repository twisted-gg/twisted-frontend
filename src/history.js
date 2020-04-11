import { createBrowserHistory } from 'history'
import GoogleAnalyticsService from './services/analytics/GoogleAnalyticsService'

export const history = createBrowserHistory()

history.listen(GoogleAnalyticsService.historyListener)
