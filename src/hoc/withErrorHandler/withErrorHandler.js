import React, {useState, useEffect, Fragment} from 'react'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);
        useEffect(() => {
            const reqInterceptors = axios.interceptors.request.use(req => {
                setError(null)
                return req;
            })
            const resInterceptors =axios.interceptors.response.use(res => res, err => {
                setError(err)
            })

            return () => {
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resInterceptors);
            }
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