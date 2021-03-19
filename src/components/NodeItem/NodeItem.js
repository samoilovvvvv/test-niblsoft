import React from 'react'
import './NodeItem.scss'

const NodeItem = props => {
  
  const renderTags = () => {
    return props.tags.map(item => {
      return (
        <p key={item}>{item}</p>
      )
    })
  }
  
  return (
    <li className={'NodeItem'}>
      <h3>{props.name}</h3>
      <div>{renderTags()}</div>
      <i className={'fa fa-times'}></i>
    </li>
  )
}

export default NodeItem