import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import LogComponent from './components/LogComponent'
import Register from './components/Register'
import NewRecord from './components/NewRecord'
import ShowRecord from './components/ShowRecord'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <div className="container">
    <BrowserRouter>
      <Header />
      <div className='all-container'>
        <Switch>
          <Route exact path="/" component={LogComponent} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/newrecord" component={NewRecord} />
          <ProtectedRoute path="/showrecord" component={ShowRecord} /> 
          <Route component={NotFound} />
        </Switch>
      </div>
      
    </BrowserRouter>
  </div>
)

export default App