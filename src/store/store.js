import {applyMiddleware, createStore} from 'redux'
import note from '../json/note.json'
import {composeWithDevTools} from "redux-devtools-extension";
import axios from 'axios'
import thunk from 'redux-thunk'

const ADD_NOTE = 'ADD_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'
const DELETE_TAG = 'DELETE_TAG'
const FILTER_NOTE = 'FILTER_NOTE'

const reducer = (state = note, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        note: action.payload
      }
    case DELETE_NOTE:
      return {
        ...state,
        note: action.payload
      }
    case DELETE_TAG:
      return {
        ...state,
        note: action.payload
      }
    case FILTER_NOTE:
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
    try {
      const noteObj = {
        id: note.note.length + 1,
        name,
        tags,
        text
      }
  
      note.note.push(noteObj)
  
      dispatch({
        type: ADD_NOTE,
        payload: note.note
      })
      
      await axios.post('http://localhost:3001/api/update_json', note)
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteNote = id => {
  return async dispatch => {
    try {
      note.note = note.note.filter(item => {
        if (item.id !== Number(id)) {
          return item
        }
      })
  
      dispatch({
        type: DELETE_NOTE,
        payload: note.note
      })
      
      await axios.post('http://localhost:3001/api/update_json', note)
      
    } catch(e) {
      console.log(e)
    }
  }
}

export const deleteTag = (id, tag) => {
  return async dispatch => {
    try {
      const processedNote = note.note.find(item => {
        return item.id === Number(id)
      })
      
      processedNote.tags = processedNote.tags.filter(item => {
        return item !== tag.trim()
      })
 
      note.note = note.note.filter(item => {
        if (item.id === id) {
          return processedNote
        }
        return item
      })
  
      dispatch({
        type: DELETE_TAG,
        payload: note.note
      })
      
      await axios.post('http://localhost:3001/api/update_json', note)
    } catch (e) {
      console.log(e)
    }
  }
}

export const filterNote = notes => {
  return async dispatch => {
    try {
  
      note.note = notes
  
      dispatch({
        type: FILTER_NOTE,
        payload: notes
      })
      
      await axios.post('http://localhost:3001/api/update_json', note)
    } catch (e) {
      console.log(e)
    }
  }
}