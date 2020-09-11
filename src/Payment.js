import React, {useState, useEffect} from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Currencyformat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";


function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate special stripe secret which allows charge to customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expecs the total in a currency subunit
                url: `/payments/create?total=${getBasketTotal(basket)*100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
    
    console.log('THE SECRET IS >>>', clientSecret)

    const handleSubmit = async(event) => {
        // do all the fancy stripe stuff
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace("/orders");
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout ({<Link to="/checkout">{basket?.length} items </Link>})
                </h1>
                {/* Payment delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3> Delivery Address </h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user ? user?.email : "Guest"}</p>
                        <p>123 Somewhere St.</p>
                        <p>Seattle, WA</p>
                    </div>

                </div>
                {/* Payment Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3> Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {/*Product lists here*/}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>

                </div>
                {/* Payment payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3> Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* Stripe magic will go here*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__priceContainer'>
                                <Currencyformat
                                    renderText={(value) => (
                                       <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparators={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing ||disabled || succeeded}>
                                    <span>{processing ? <p>Procesing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Payment
