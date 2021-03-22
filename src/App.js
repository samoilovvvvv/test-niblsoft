import MainPage from './containers/MainPage/MainPage'
import CreationMenu from './containers/CreationMenu/CreationMenu'
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route path={'/creating-note'} component={CreationMenu}/>
      <Route path={'/'} exact={true} component={MainPage}/>
    </Switch>
  );
}

export default App;
