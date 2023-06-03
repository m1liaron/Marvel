import { Helmet } from 'react-helmet';
import ErrorMessage from '../errorMessage/spidermanpng.parspng.com-8-1.png'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './404.scss'

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
            <div className="flex">
                <img src={ErrorMessage} className='img' style={{ 'margin': '0 auto' }} alt="404" />
            </div>
            <Link style={{ 'display' : 'block','textAlign' : 'center', 'fontSize' : '25px', 'marginTop' : '30px'}} to='/' onClick={handleBackButtonClick}>←Back</Link>
        </div>
    )
}


export default Page404;