import React, {useState, useRef, useEffect} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {connect} from 'react-redux'
import {addNote} from '../../store/store'
import {withRouter} from 'react-router-dom'
import './CreationMenu.scss'

const CreationMenu = props => {
  const [nameInput, setNameInput] = useState({
    label: 'Введите название заметки',
    value: '',
    errorMessage: 'Вы не ввели название заметки'
  })
  
  const [tagsInput, setTagsInput] = useState({
    label: 'Введите теги(Пример: тег1, тег2, тег3)',
    value: '',
    tags: []
  })
  
  const [textArea, setTextArea] = useState({
    label: 'Введите вашу заметку',
    value: '',
    id: 1,
    errorMessage: 'Вы не ввели текст заметки'
  })
  
  const [nameInputValid, setNameInputValid] = useState(true)
  const [textAreaValid, setTextAreaValid] = useState(true)
  
  const onChangeNameInputHandler = event => {
    setNameInputValid(true)
    setNameInput({
      label: 'Введите название заметки',
      value: event.target.value,
      errorMessage: nameInput.errorMessage
    })
 }

  const onChangeTagsInputHandler = event => {

    const tags = event.target.value.split(',').map(item => {
      return item.trim()
    })

    
    const filterTags = tags.filter(item => {
      if (item !== '') {
        return item.trim()
      }
    })

    const tagsSet = new Set(filterTags)
    
    setTagsInput({
      label: 'Введите теги(Пример: тег1, тег2, тег3)',
      value: event.target.value,
      tags: Array.from(tagsSet)
    })
  }
  
  const onChangeTextAreaHandler = event => {
    setTextAreaValid(true)
    setTextArea({
      label: 'Введите вашу заметку',
      value: event.target.value,
      errorMessage: textArea.errorMessage
    })
  }
  
  const onClickButtonHandler = () => {
    if (!validation()) {
      return
    }

    if (nameInputValid && textAreaValid) {
      props.createNote(nameInput.value, tagsInput.tags, textArea.value)
      props.history.push({
        pathname: '/'
      })
    }
  }
  
  const validation = () => {
    let isValid = true
    
    if (nameInput.value.trim() === '') {
      setNameInputValid(false)
      isValid = false
    }
  
    if (textArea.value.trim() === '') {
      setTextAreaValid(false)
      isValid = false
    }
    
    return isValid
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
        { !nameInputValid ? <small>{nameInput.errorMessage}</small> : null }
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
        { !textAreaValid ? <small>{textArea.errorMessage}</small> : null }
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