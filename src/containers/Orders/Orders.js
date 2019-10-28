import React, {useState, useEffect} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                setOrders(fetchOrders)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    let orderOutput = <Spinner/>
    if(!loading){
        orderOutput = orders.map(order => {
            return <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}    
            />
        })
    }

    return (
        <div className="Orders">
            {orderOutput}
        </div>
    )
}

export default Orders
