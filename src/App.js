import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'
import SearchPage from './components/SearchPage'
import Account from './components/Account'
import NotFound from './components/NotFound'
import MovieDetailsPage from './components/MovieDetailsPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={SearchPage} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailsPage} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
