import React, {useState} from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import {connect} from 'react-redux'
import {addNote} from '../../store/store'
import {withRouter} from 'react-router-dom'
import './CreationMenu.scss'

const CreationMenu = props => {
  const [nameInput, setNameInput] = useState({
    label: 'Введите название заметки',
    value: ''
  })
  
  const [tagsInput, setTagsInput] = useState({
    label: 'Введите теги(Пример: тег1 тег2 тег3)',
    value: ''
  })
  
  const [textArea, setTextArea] = useState({
    label: 'Введите вашу заметку',
    value: '',
    id: 1
  })
  
 const onChangeNameInputHandler = event => {
    setNameInput({
      label: 'Введите название заметки',
      value: event.target.value
    })
 }
  
  const onChangeTagsInputHandler = event => {
    setTagsInput({
      label: 'Введите теги(Пример: тег1 тег2 тег3)',
      value: event.target.value
    })
  }
  
  const onChangeTextAreaHandler = event => {
    setTextArea({
      label: 'Введите вашу заметку',
      value: event.target.value
    })
  }
  
  const onClickButtonHandler = () => {
    props.createNote(nameInput.value, tagsInput.value, textArea.value)
    props.history.push({
      pathname: '/'
    })
  }
  
  return (
    <div className={'CreationMenu'}>
      <h1>Создание заметки</h1>
      <form>
        <Input
          label={nameInput.label}
          value={nameInput.value}
          onChange={onChangeNameInputHandler}
        />
        <Input
          label={tagsInput.label}
          value={tagsInput.value}
          onChange={onChangeTagsInputHandler}
        />
        <label htmlFor={textArea.id}>{textArea.label}</label>
        <textarea
          id={textArea.id}
          value={textArea.value}
          onChange={onChangeTextAreaHandler}
        />
      </form>
      <Button
        type={'create'}
        onClick={onClickButtonHandler}
      >
        Создать
      </Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createNote: (name, tags, text) => dispatch(addNote(name, tags, text))
  }
}


export default withRouter(connect(null, mapDispatchToProps)(CreationMenu))