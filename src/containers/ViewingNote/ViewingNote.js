import React from 'react'
import {connect} from 'react-redux'
import {deleteTag} from '../../store/store'
import './ViewingNote.scss'
import Button from '../../components/UI/Button/Button'

const ViewingNote = props => {
  
  const viewNote = props.note.find(item => {
    return item.id === props.id
  })
  
  const onClickTagDeleteHandler = event => {
    const id = props.id
    const tag = event.target.closest('li').textContent
  
    props.deleteTag(id, tag)
  }
  
  const renderTags = () => {
    return viewNote.tags.map(item => {
      return (
        <li key={item}>{item} <i className={'fa fa-times'} onClick={onClickTagDeleteHandler}></i></li>
      )
    })
  }

  return (
    <div className={'ViewingNote'}>
      <main>
        <h2>{viewNote.name}</h2>
        <ul>
          {renderTags()}
        </ul>
        <p>{viewNote.text}</p>
      </main>
      <Button
        type={'create'}
        onClick={props.onClick}
      >
        К списку
      </Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTag: (id, tag) => dispatch(deleteTag(id, tag))
  }
}

const mapStateToProps = state => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewingNote)