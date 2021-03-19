import React from 'react'
import NodeItem from '../NodeItem/NodeItem'
import {connect} from 'react-redux'
import './NodeList.scss'

const NodeList = props => {
  
  const renderItems = () => {
    return props.note.map(item => {
      return (
        <NodeItem
          key={item.id.toString()}
          name={item.name}
          tags={item.tags}
        />
      )
    })
  }
  
  return (
    <ul className={'NodeList'}>
      {renderItems()}
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps)(NodeList)