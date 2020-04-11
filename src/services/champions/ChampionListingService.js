import cdnService from '../cdn/CdnService'

const defaultLang = 'en_US'

export default {
  async getListing () {
    const resource = `data/${defaultLang}/champion.json`
    const championList = Object.values(
      (await cdnService.getResource(resource))
        .data
        .data
    )
    // Put index
      .map((val, index) => ({
        index,
        ...val
      }))
    return championList
  }
}
