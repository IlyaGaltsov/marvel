import {useState} from "react";
import PropTypes from 'prop-types'

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList"

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar,setSelectedChar]=useState(null);
    const onCharSelected=(id)=>{
            setSelectedChar(id)
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                */}
                <ComicsList/>
            </main>
        </div>
    )
}
App.propTypes={
    onCharSelected: PropTypes.number
}
export default App;