import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages'
import AppHeader from "../appHeader/AppHeader";


const App = () => {
const bob=0;
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path='*' element={<Page404/>}/> 
                            <Route path='/comics/:comicId' element={<SingleComicPage/>}/> 
                        </Routes>
                    </main>
                </div>
            </Router>
        )
    }

export default App;