import React from 'react';
import PlanetList from "./components/PlanetList";
import PlanetInfo from "./components/PlanetInfo";
import PeopleList from "./components/PeopleList";
import PeopleInfo from "./components/PeopleInfo";
import StarshipList from "./components/StarshipList";
import StarshipInfo from "./components/StarshipInfo";
import {Routes, Route, Navigate} from "react-router-dom";
import {Header} from "./components/Header";
import SearchResult from "./components/SearchResult";

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
            {/*<Route path = 'login' element={<Login/>}/>*/}
            {/*<Route path = 'register' element={<Register/>}/>*/}

            <Route path={''} element={<Navigate to={'planets'}/>}/>
            <Route path={'/'} element={<Navigate to={'planets'}/>}/>
        </Routes>
    </div>
  );
}

export default App;
