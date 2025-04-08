import { Routes, Route } from 'react-router' 
import HomePage from '../pages/Home/HomePage.jsx'
import SignIn from '../pages/SignIn/SignIn.jsx'
import LogIn from '../pages/LogIn/LogIn.jsx'
import Shop from '../pages/Shop.jsx'
import NotFound from '../pages/NotFound.jsx'
import ItemPage from '../pages/ItemPage.jsx'
import Channel from '../pages/Channel/Channel.jsx'
import Profile from '../pages/Profile/Profile.jsx'
import Hangman from '../pages/Hangman/Hangman.jsx'
import Chat from '../pages/Chat/Chat.jsx'
import ModificaProfilo from '../pages/ModificaProfilo/ModificaProfilo.jsx'
import { CookiesProvider } from 'react-cookie';

export default function App() {
    return (
    
    <CookiesProvider>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path='/Home'>
                <Route index element={<HomePage/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/SignIn'>
                <Route index element={<SignIn/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/LogIn'>
                <Route index element={<LogIn/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/Channel'>
                <Route index element={<Channel/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/Profile'>
                <Route index element={<Profile/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/ModificaProfilo'>
                <Route index element={<ModificaProfilo/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/Hangman'>
                <Route index element={<Hangman/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/Chat'>
                <Route index element={<Chat/>}/>
                <Route path=':itemId' element={<ItemPage/>}/>
            </Route>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </CookiesProvider>)
}