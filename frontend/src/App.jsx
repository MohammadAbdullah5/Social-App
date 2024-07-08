import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NewsFeed from './components/NewsFeed'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import Header from './components/Header'
import CreatePost from './components/CreatePost'
import Home from './pages/Home'

const App = () => {

  return (
    <> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
          <Route path='/feed' element={<NewsFeed />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
