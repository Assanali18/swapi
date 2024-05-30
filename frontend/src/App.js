import React from 'react';
import PlanetList from "./components/Lists/PlanetList";
import PlanetInfo from "./components/Info/PlanetInfo";
import PeopleList from "./components/Lists/PeopleList";
import PeopleInfo from "./components/Info/PeopleInfo";
import StarshipList from "./components/Lists/StarshipList";
import StarshipInfo from "./components/Info/StarshipInfo";
import Login from "./pages/Login"
import Register from "./pages/Registration"
import {Routes, Route, Navigate} from "react-router-dom";
import {Header} from "./components/Header/Header";
import SearchResult from "./components/Search/SearchResult";

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path = 'planets' element={<PlanetList/>}/>
            <Route path = 'planets/:name' element={<PlanetInfo/>}/>
            <Route path = 'people' element={<PeopleList/>}/>
            <Route path = 'people/:name' element={<PeopleInfo/>}/>
            <Route path = 'starships' element={<StarshipList/>}/>
            <Route path = 'starships/:name' element={<StarshipInfo/>}/>
            <Route path="/search" element={<SearchResult />} />
            <Route path = 'login' element={<Login/>}/>
            <Route path = 'register' element={<Register/>}/>

            <Route path={''} element={<Navigate to={'planets'}/>}/>
            <Route path={'/'} element={<Navigate to={'planets'}/>}/>
        </Routes>
    </div>
  );
}

export default App;
