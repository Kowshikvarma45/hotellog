import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { RecoilRoot } from 'recoil'
import { Read } from './pages/Read'
import { Publish } from './pages/Publish'
import { Account } from './pages/Account'
import { Edit } from './pages/Edit'
import { Passcheck } from './pages/Passcheck'
import { Update } from './pages/Update'
import { Reservations } from './pages/Reservations'
function App() {

  return (
    //@ts-ignore
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hotels" element={<Blog />} />
          <Route path="/read/:id" element={<Read/>} />
          <Route path='/publish' element={<Publish />} />
          <Route path='/Account' element={<Account/>}/>
          <Route path="/Edit/:id" element={<Edit/>} />
          <Route path='/Check' element={<Passcheck/>}/>
          <Route path='/Reservations' element={<Reservations/>}/>
          <Route path='/Update' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App