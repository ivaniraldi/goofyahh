
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import GH_View from './components/GH_View'
import Snake from './components/Snake'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/guitarjesus' element={<GH_View />}/>
      <Route path='/snake' element={<Snake />}/>
    </Routes>

    </>
  )
}

export default App
