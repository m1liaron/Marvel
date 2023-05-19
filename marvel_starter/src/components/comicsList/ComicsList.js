import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './comicsList.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import Avengers_logo from '../../resources/img/Avengers_logo.png';
import Avengers from '../../resources/img/Avengers.png';
import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService(); 

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if ( newComicsList.length < 9) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(setNewItemLoading => false);
        setOffset(setOffset => offset + 9);
        setComicsEnded(setCharEnded => ended);
    }

    const ScrollUpButton = () => {
        const [isVisible, setIsVisible] = useState(false);
      
        useEffect(() => {
          // Add scroll event listener to check if the button should be visible
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);
      
        const handleScroll = () => {
          // Check the scroll position and update the visibility of the button
          if (window.pageYOffset > 100) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
      
        const scrollToTop = () => {
          // Scroll to the top of the page when the button is clicked
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        };
      
        return (
          <button
            className={`scroll-up-button button-up ${{'display' : comicsEnded ? 'block' : 'none'}}`}
            onClick={scrollToTop}>
          </button>
        );
      };

    function renderItems(id){
        const comics = id.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li className="comics__item">
                    <a href="#">
                        <img src={item.thumbnail} alt="ultimate war" style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })
        return (
            <ul className='comics__grid'>
                {comics}
            </ul>
        )
    }
const btn =             <button 
                        disabled={newItemLoading} 
                        style={{'display' : comicsEnded ? 'block' : 'none'}}
                        className="button button__main button__long"
                        onClick={() => onRequest(offset)}>
                        <div className="inner">load more</div>
                        </button>
    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const addNewItems = newItemLoading ? <Spinner/> : btn;

    return (
        <div className="comics__list">
            {/* <div className="comics__banner">
                <img src={Avengers} alt="Avengers" />
                <h1>New comics every week! Stay tuned!</h1>
                <img src={Avengers_logo} alt="Avengers_logo" />
            </div> */}
                {errorMessage}
                {spinner}
                {items}
                {addNewItems}   
                <ScrollUpButton />
        </div>
    )
}

ComicsList.propTypes = {
    onComicsSelected: PropTypes.func.isRequired
}

export default ComicsList;