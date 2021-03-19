import {applyMiddleware, createStore} from 'redux'
import note from '../json/note.json'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'

const add = 'ADD_NOTE'

const reducer = (state = note, action) => {
  switch (action.type) {
    case add:
      return {
        ...state,
        note: action.payload
      }
    default:
      return state
  }
}

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export const addNote = (name, tags, text) => {
  return async dispatch => {
    const noteObj = {
      id: note.note.length + 1,
      name,
      tags: tags.split(' '),
      text
    }
  
    note.note.push(noteObj)
    
    await fetch('http://localhost:3001/api/update_json', {
      method: 'POST',
      body: JSON.stringify(note)
    })
    
    dispatch({
      type: add,
      payload: note.note
    })
  }
}