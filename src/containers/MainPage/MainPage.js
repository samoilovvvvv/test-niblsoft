import React, {useState} from 'react'
import NodeList from '../../components/NodeList/NodeList'
import Button from '../../components/UI/Button/Button'
import {withRouter} from 'react-router-dom'
import './MainPage.scss'

const MainPage = props => {
  const buttonClickHandler = () => {
    props.history.push({
      pathname: '/creating-note'
    })
  }
  
  return (
    <div className={'MainPage'}>
      <header>
        <h1>Заметки</h1>
      </header>
      <main>
        <NodeList/>
      </main>
      <Button
        type={'create'}
        onClick={buttonClickHandler}
      >
        Create
      </Button>
    </div>
  )
}

export default withRouter(MainPage)