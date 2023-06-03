import React,{ useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

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

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService(); 

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'));
    }

   const onCharListLoaded = (newCharList) => {

        // const {logger, secodLog} = await import('./someFunc');
        // logger()
        
        let ended = false;
        if ( newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(setNewItemLoading => false);
        setOffset(setOffset => offset + 9);
        setCharEnded(setCharEnded => ended);
    }

   const itemRefs = useRef([]);
    
  const focusOnItem = (id) => {
        itemRefs.current.forEach(ref => ref.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    
    const duration = 300;

   function renderItems(id){
        const items = id.map((item,i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item"
                    >
                    <li  
                    className="char__item"
                    key={item.id}
                    ref={el => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id); 
                        focusOnItem(i) 
                    }}
                    onKeyPres ={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id);
                            focusOnItem(i)
                        }
                    }}
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
                </CSSTransition>
            )
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        ) 
    }
        
        // if (loading) {
        //     import('./someFunc')
        //         .then(obj => obj.default())
        //         .catch()
        // }

        return (
            <div className="char__list">
                {setContent(process, () => renderItems(charList), newItemLoading)}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;