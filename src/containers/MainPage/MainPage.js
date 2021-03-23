import React, {useState} from 'react'
import NodeList from '../../components/NodeList/NodeList'
import ViewingNote from '../ViewingNote/ViewingNote'
import Button from '../../components/UI/Button/Button'
import {withRouter} from 'react-router-dom'
import {filterNote} from '../../store/store'
import {connect} from 'react-redux'
import './MainPage.scss'

const MainPage = props => {
  const [viewMode, setViewMode] = useState(false)
  const [viewNote, setViewNote] = useState({})
  
  const buttonClickHandler = () => {
    props.history.push({
      pathname: '/creating-note'
    })
  }

  const filterNotesHandler = () => {
    const filterNotes = props.note.sort((a, b) => {
      if (a.tags.join() > b.tags.join()) return 1
      if (a.tags.join() < b.tags.join()) return -1
      return 0
    })
    
    props.filterNote(filterNotes)
  }
  
  const toListClickHandler = () => {
    setViewMode(false)
  }
  
  const doubleClickNoteHandler = event => {
    const processedNote = props.note.find((item) => {
      return item.id === Number(event.target.closest('li').id)
    })
    
    setViewNote({
      id: processedNote.id
    })
    
    setViewMode(true)
  }
  
  return (
    <>
      {
        viewMode
        ? <ViewingNote
            id={viewNote.id}
            onClick={toListClickHandler}
          />
        : <div className={'MainPage'}>
            <header>
              <h1>Заметки</h1>
            </header>
    
            {
              props.note.length !== 0
                ? <main>
                    <NodeList
                      onDoubleClick={doubleClickNoteHandler}
                    />
                  </main>
        
                :   <p>На данный момент у вас нет заметок, нажмите "Create" чтобы создать заметку</p>
            }
            <div className={'buttons'}>
              <Button
                type={'create'}
                onClick={buttonClickHandler}
              >
                Create
              </Button>
              <Button
                type={'create'}
                onClick={filterNotesHandler}
              >
                Filter
              </Button>
            </div>
  
          </div>
      }
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterNote: note => dispatch(filterNote(note))
  }
}

const mapStateToProps = state => {
  return {
    note: state.note
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage))