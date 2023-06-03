import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner />;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage />;
            break;
        default:
            throw new Error('Unexpected process state');
        }
}

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService(); 

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
          .then(onComicsListLoaded)
          .then(() => setProcess('confirmed'));
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
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);
      
        const handleScroll = () => {
          if (window.pageYOffset > 100) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
      
        const scrollToTop = () => {
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
        const comics = id.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
        return (
            <ul className='comics__grid'>
                {comics}
            </ul>
        )
    }
const btn = <button   
            disabled={newItemLoading} 
            style={{'display' : comicsEnded ? 'block' : 'none'}}
            className="button button__main button__long"
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
            </button>

    const loadList = newItemLoading ? <Spinner/> : btn;
    const scrollUpBtn = loading ? null : <ScrollUpButton/>;

    return (
        <div className="comics__list">
                {setContent(process, () => renderItems(comicsList), newItemLoading)}
                {loadList}   
                {scrollUpBtn}
        </div>
    )
}
export default ComicsList;