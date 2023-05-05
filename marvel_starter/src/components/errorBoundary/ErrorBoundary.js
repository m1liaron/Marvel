import { Component} from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) {
    //     return { error: true }
    // }

    // getDerivedStateFromError - відновлює стан

    componentDidCatch(err, errorInfo) {
        console.log(err,errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return  <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;