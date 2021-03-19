import React, {useState} from 'react'
import NodeList from '../../components/NodeList/NodeList'
import Button from '../../components/UI/Button/Button'
import CreationMenu from '../../components/CreationMenu/CreationMenu'
import {withRouter} from 'react-router-dom'
import './MainPage.scss'

const MainPage = props => {
  const [creationMenu, setCreationFlag] = useState(true)
  
  const buttonClickHandler = () => {
    setCreationFlag(!creationMenu)
    props.history.push({
      pathname: '/creating-note'
    })
  }
  
  return (
    <div className={'MainPage'}>
      {
        creationMenu
          ? <CreationMenu/>
          :
            (
              <>
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
              </>
            )
      }
    </div>
  )
}

export default MainPageexport default withRouter(MainPage)