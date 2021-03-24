import React, {useState} from 'react'
import {connect} from 'react-redux'
import {deleteTag, editName, editTags, editText} from '../../store/store'
import './ViewingNote.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

const ViewingNote = props => {
  
  const viewNote = props.note.find(item => {
    return item.id === props.id
  })
  
  const [nameEdit, setNameEdit] = useState(false)
  const [tagsEdit, setTagsEdit] = useState(false)
  const [textEdit, setTextEdit] = useState(false)
  
  const [nameInput, setNameInput] = useState({
    value: viewNote.name,
    errorMessage: 'Вы не ввели название заметки'
  })
  
  const [tagsInput, setTagsInput] = useState({
    value: viewNote.tags.join(', ')
  })
  
  const [textArea, setTextArea] = useState({
    value: viewNote.text,
    errorMessage: 'Вы не ввели текст заметки'
  })
  
  const [nameInputValid, setNameInputValid] = useState(true)
  const [textAreaValid, setTextAreaValid] = useState(true)
  
  const onChangeNameInputHandler = event => {
    setNameInputValid(true)
    setNameInput({
      value: event.target.value,
      errorMessage: nameInput.errorMessage
    })
  }
  
  const onChangeTagsInputHandler = event => {
    setTagsInput({
      value: event.target.value,
    })
  }
  
  const onChangeTextAreaHandler = event => {
    setTextAreaValid(true)
    setTextArea({
      value: event.target.value,
      errorMessage: textArea.errorMessage
    })
  }
  
  const onClickTagDeleteHandler = event => {
    const id = props.id
    const tag = event.target.closest('li').textContent
    
    props.deleteTag(id, tag)
  }
  
  const onClickEditHandler = event => {
    if (event.target.id === 'name') {
      setNameEdit(true)
    }
    
    if (event.target.id === 'tag') {
      setTagsEdit(true)
    }
    
    if (event.target.id === 'text') {
      setTextEdit(true)
    }
  }
  
  const onSaveClickHandler = event => {
    const target = event.target.closest('div').classList[1]
    
    if (target === 'name') {
      if (nameInput.value === '') {
        setNameInputValid(false)
        return
      }
      
      setNameEdit(false)
      props.editName(props.id, nameInput.value)
    }
    
    if (target === 'tags') {
      const tagsSet = editTags()
      
      setTagsEdit(false)
      props.editTags(props.id, Array.from(tagsSet))
    }
    
    if (target === 'textarea') {
      if (textArea.value === '') {
        setTextAreaValid(false)
        return
      }
 
      const regexp = /((\s|^)#[A-Za-z0-9А-Яа-я]+)/g
      const result = textArea.value.matchAll(regexp)
      let tagsString = ''
      
      const tempSet = new Set(Array.from(result))
      
      Array.from(tempSet).forEach(item => {
        tagsString += ', ' + item[0].substring(2)
      })
      
      const tagsSet = editTags(tagsString)
      
      setTagsInput({
        value: tagsInput.value + ' ' + tagsString
      })
      
      setTextEdit(false)
      props.editText(props.id, textArea.value)
      props.editTags(props.id, Array.from(tagsSet))
    }
  }
  
  const renderTags = () => {
    if (viewNote.tags.length === 0) {
      return <p>Теги отсутствуют</p>
    }
    return viewNote.tags.map(item => {
      return (
        <li key={item}>{item} <i className={'fa fa-times'} onClick={onClickTagDeleteHandler}></i></li>
      )
    })
  }
  
  const getHighlightedText = text => {
    const regexp = /(\s|^)(#[A-Za-z0-9А-Яа-я]+)/
    const parts = text.split(regexp)
    console.log(parts)
    return (
      <p>
        {
          parts.map((item, index) => {
            if (regexp.test(item)) {
              return <span key={index} style={{fontWeight: 'bold'}}>&nbsp;{item.substring(1)}</span>
            } else {
              return <span key={index}>{item}</span>
            }
          })
        }
      </p>
    )
  }
  
  const editTags = tagsString => {
    let tags = []
    
    if (tagsString) {
      tags = tagsInput.value.concat(tagsString).split(',').map(item => {
        return item.trim()
      })
    } else {
      tags = tagsInput.value.split(',').map(item => {
        return item.trim()
      })
    }
    
    const filterTags = tags.filter(item => {
      if (item !== '') {
        return item.trim()
      }
    })
    
    const tagsSet = new Set(filterTags)
    
    return tagsSet
  }
  
  return (
    <div className={'ViewingNote'}>
      <main>
        {
          nameEdit
            ? <div className={'edit name'}>
              <div>
                <Input
                  label={'Название'}
                  value={nameInput.value}
                  onChange={onChangeNameInputHandler}
                />
                { !nameInputValid ? <small>{nameInput.errorMessage}</small> : null }
              </div>
              <Button
                type={'create'}
                onClick={onSaveClickHandler}
              >
                Сохранить
              </Button>
            </div>
            
            : <h2>{viewNote.name} <i id={'name'} className="fa fa-edit" onClick={onClickEditHandler}></i></h2>
        }
        {
          tagsEdit
            ? <div className={'edit tags'}>
              <Input
                label={'Теги'}
                value={tagsInput.value}
                onChange={onChangeTagsInputHandler}
              />
              <Button
                type={'create'}
                onClick={onSaveClickHandler}
              >
                Сохранить
              </Button>
            </div>
            
            : <div className={'ul'}>
              <ul>
                {renderTags()}
              </ul>
              <i id={'tag'} className="fa fa-edit" onClick={onClickEditHandler}></i>
            </div>
        }
        {
          textEdit
            ? <div className={'edit textarea'}>
              <label htmlFor={'textarea'}>Текст заметки</label>
              <div>
                <textarea
                  id={'textarea'}
                  value={textArea.value}
                  onChange={onChangeTextAreaHandler}
                />
                { !textAreaValid ? <small>{textArea.errorMessage}</small> : null }
              </div>
              <Button
                type={'create'}
                onClick={onSaveClickHandler}
              >
                Сохранить
              </Button>
            </div>
            
            : <div className={'text'}>
              <p>{getHighlightedText(viewNote.text)}</p>
              <i id={'text'} className="fa fa-edit" onClick={onClickEditHandler}></i>
            </div>
        }
      
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
    deleteTag: (id, tag) => dispatch(deleteTag(id, tag)),
    editName: (id, name) => dispatch(editName(id, name)),
    editTags: (id, tags) => dispatch(editTags(id, tags)),
    editText: (id, text) => dispatch(editText(id, text)),
  }
}

const mapStateToProps = state => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewingNote)