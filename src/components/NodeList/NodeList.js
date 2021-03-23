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
          id={item.id}
          name={item.name}
          tags={item.tags}
          onDoubleClick={props.onDoubleClick}
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
    note: state.note,
    state
  }
}

export default connect(mapStateToProps, null)(NodeList)