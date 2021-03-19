import {createStore} from 'redux'
import note from '../json/note.json'

const add = 'ADD_NOTE'

const reducer = (state = note, action) => {
  switch (action.type) {
    case add:
      break;
    default:
      return state
  }
}

export const store = createStore(reducer)

export const addNote = (name, tags, text) => {
  return {
    type: add,
    name,
    tags,
    text
  }
}