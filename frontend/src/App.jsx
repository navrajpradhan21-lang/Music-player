
import Baddie from './pages/Baddie';
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/playlist/baddie' element={<Baddie/>}/>
      <Route path='songs/playlist/love'element={<Page2/>}/>
      <Route path='songs/playlist/heart-break'element={<Page3/>}/>
      <Route path = 'songs/playlist/zubeendaa❤️' element={<Page4/>}/>
    </Routes>
  )
}

export default App;