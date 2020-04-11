import React from 'react'
import '../../../../assets/scss/components/champion-item.scss'

export function ChampionItem ({ champion }) {
  return (
    <div className='champion-item'>
      <div className={`background-champions champion-item-${champion.index}`} />
      {champion.name}
    </div>
  )
}
