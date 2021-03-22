import React from 'react'
import './NodeItem.scss'
import {connect} from 'react-redux'
import {deleteNote, deleteTag} from '../../store/store'

const NodeItem = props => {
  
  const renderTags = () => {
    return props.tags.map(item => {
      return (
        <p key={item}>{item} <i className={'fa fa-times'} onClick={onClickTagDeleteHandler}></i></p>
      )
    })
  }
  
  const onClickNoteDeleteHandler = event => {
    props.deleteNote(event.target.closest('li').id)
  }
  
  const onClickTagDeleteHandler = event => {
    const id = event.target.closest('li').id
    const tag = event.target.closest('p').textContent
    
    props.deleteTag(id, tag)
  }
  
  return (
    <li id={props.id} className={'NodeItem'}>
      <h3>{props.name}</h3>
      <div>{renderTags()}</div>
      <i onClick={onClickNoteDeleteHandler} className={'fa fa-times li'}></i>
    </li>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteNote: id => dispatch(deleteNote(id)),
    deleteTag: (id, tag) => dispatch(deleteTag(id, tag))
  }
}

const mapStateToProps = state => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeItem)