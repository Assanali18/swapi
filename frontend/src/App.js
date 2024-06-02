import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import List from "./components/List/List";
import planetImage from "./images/planet.webp";
import personImage from "./images/person.jpg";
import starshipImage from "./images/starship.webp";
import PlanetInfo from "./pages/PlanetInfo/PlanetInfo";
import PeopleInfo from "./pages/PeopleInfo/PeopleInfo";
import StarshipInfo from "./pages/StarshipInfo/StarshipInfo";
import SearchResult from "./pages/SearchResult/SearchResult";
import Auth from "./pages/Auth/Auth";


function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route path="planets" element={<List apiUrl="http://localhost:4444/api/planets/" itemName="Planets"
                                                         image={planetImage} itemKey="planets"/>}/>
                    <Route path="people" element={<List apiUrl="http://localhost:4444/api/people/" itemName="People"
                                                        image={personImage} itemKey="people"/>}/>
                    <Route path="starships"
                           element={<List apiUrl="http://localhost:4444/api/starships/" itemName="Starships"
                                          image={starshipImage} itemKey="starships"/>}/>
                    <Route index element={<Navigate replace to="planets"/>}/>
                </Route>
                <Route path='planets/:name' element={<PlanetInfo/>}/>
                <Route path='people/:name' element={<PeopleInfo/>}/>
                <Route path='starships/:name' element={<StarshipInfo/>}/>
                <Route path="/search" element={<SearchResult/>}/>
                <Route path="/login" element={<Auth action="login"/>}/>
                <Route path="/register" element={<Auth action="register"/>}/>
            </Routes>
        </div>
    );
}

export default App;
