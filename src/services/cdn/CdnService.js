import siteConfig from '../../configs/SiteConfig'
import axios from 'axios'
import { capitalize } from 'lodash'

function getBaseUrl () {
  return siteConfig.cdn
}

function getCurrentPatchUrl () {
  return `${getBaseUrl()}/current_patch`
}

export default {
  getResource (resource) {
    return axios(`${getBaseUrl()}/${resource}`)
  },
  getResourceUrl (resource) {
    return `${getBaseUrl()}/${resource}`
  },
  getProfileIcon (icon) {
    return `${getCurrentPatchUrl()}/profileicon/${icon}.png`
  },
  getChampionImage (champion) {
    champion = capitalize(champion)
    return `${getCurrentPatchUrl()}/champion/${champion}.png`
  }
}
