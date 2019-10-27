import React, {useState, useEffect, Fragment} from 'react'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);
        useEffect(() => {
            axios.interceptors.request.use(res => {
                setError(null)
            })
            axios.interceptors.response.use(res => res, err => {
                setError(err)
                console.log(err)
            })
        });

        const errorConfirmHandler = () => {
            setError(null)
        }

        return(
            <Fragment>
                <Modal show={error} modalClosed={errorConfirmHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Fragment>
        )
    }
}

export default withErrorHandler;