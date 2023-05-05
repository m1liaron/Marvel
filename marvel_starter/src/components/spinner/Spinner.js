import { Ring } from '@uiball/loaders'
import './Spinner.scss'
const Spinner = () => {
    return (
        <div className="spinner">
        <Ring 
        size={40}
        lineWeight={5}
        speed={2} 
        color="black" 
        />
        </div>
        )
}

export default Spinner;  