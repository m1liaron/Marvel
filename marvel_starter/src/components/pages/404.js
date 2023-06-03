import { Helmet } from 'react-helmet';
import ErrorMessage from '../errorMessage/Page404.gif'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1); // navigate back to the previous page
      }

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel Page Not Found</title>
            </Helmet>
            <p style={{'textAlign' : 'center', 'fontSize' : '25px'}}>Page not found</p>
            <img src={ErrorMessage} style={{'margin' : '0 auto'}} alt="404" />
            <Link style={{ 'display' : 'block','textAlign' : 'center', 'fontSize' : '25px', 'marginTop' : '30px'}} to='/' onClick={handleBackButtonClick}>Back</Link>
        </div>
    )
}


export default Page404;