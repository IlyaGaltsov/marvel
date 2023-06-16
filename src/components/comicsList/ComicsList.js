import { useEffect,useState,useRef } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(()=>{
        onRequest(offset,true)
    },[])

    const onRequest =(offset,initial)=>{
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
        .then(onComicsListLoaded)
    } 

    const onComicsListLoaded =(newComicsList)=>{
        let ended = false
        if(newComicsList.length<8){
            ended=true
        }

        setComicsList(comicsList=>[...comicsList,...newComicsList]);
        setNewComicsLoading(newComicsLoading=>false);
        setOffset(offset=>offset+8)
        setComicsEnded(comicsEnded=>ended)
    }

    function renderItems(arr){
        const items = arr.map((item,i)=>{
            return(
                <li className="comics__item" key={i}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            );
        });
        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;
    
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newComicsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}> 
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;