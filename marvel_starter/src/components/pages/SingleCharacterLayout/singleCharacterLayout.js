import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './singleCharacterLayout.scss'

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail} = data;

    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1); 
      }

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link style={{ 'display' : 'block','textAlign' : 'center', 'fontSize' : '25px', 'marginTop' : '30px'}} to='/' onClick={handleBackButtonClick}>Back</Link>
        </div>
    )
}

export default SingleCharacterLayout;