import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark, faArrowLeftLong, faPlus, faMinus
} from '@fortawesome/free-solid-svg-icons'

import Header from '../components/header'
import HtmlHead from '../components/htmlHead'

import { useCartState, useCartDispatch } from '../context/cart'
import commerce from '../lib/commerce'

import styles from '../styles/Cart.module.css'

interface ICartItem {
    id: string,
    image: { url: string },
    name: string,
    price: { formatted: string },
    quantity: number,
    line_total: { formatted: string },
    currency: string,
    sku: string
}

const CartItem = ({ id, image, name, price, quantity, line_total, currency, sku }: ICartItem) => {
    
    const { setCart } = useCartDispatch()

    const handleUpdateCart = ({ cart }: any) => { setCart(cart) }

    const handleCartError = (err: Error) => console.error('Failed to update cart:', err.message)

    const incrementQuantity = () => {
        commerce.cart
            .update(id, { quantity: quantity + 1 })
            .then(handleUpdateCart)
            .catch(handleCartError)
    }

    const decrementQuantity = () => {
        quantity > 1
        ?
        commerce.cart
            .update(id, { quantity: quantity - 1 })
            .then(handleUpdateCart)
            .catch(handleCartError)
        :
        removeItem()
    }

    const removeItem = () => {
        commerce.cart
            .remove(id)
            .then(handleUpdateCart)
            .catch(handleCartError)
    }

    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <Image src={ image.url } layout='fill'/>
            </div>
            <div style={{marginRight: 30, width: 300}}>
            <div style={{fontWeight: 'bold'}}>{ name }</div>
            <div style={{fontSize: 12, color: 'gray'}}>{ sku }</div>
            </div>
            <div style={{
                /* border: '1px solid black',  */
                width: 70, marginRight: 30,
                display: 'flex', justifyContent: 'space-between'
            }}>
                <div style={{cursor: 'pointer'}} onClick={decrementQuantity}>
                    <FontAwesomeIcon icon={ faMinus } />
                </div>
                <div style={{
                    border: '1px solid gray', width: 30,
                    borderRadius: 5, textAlign: 'center',
                    /* display: 'flex', justifyContent: 'center' */
                }}>{ quantity }</div>
                <div style={{cursor: 'pointer'}} onClick={incrementQuantity}>
                    <FontAwesomeIcon icon={ faPlus } />
                </div>
            </div>

            <div className={styles.price}>{ price.formatted }</div>
            <div className={styles.price}>{ line_total.formatted }</div>
            
            <div style={{cursor: 'pointer'}} onClick={removeItem}>
                <FontAwesomeIcon icon={ faXmark } />
            </div>

        </div>
    )
}

const Cart: NextPage = () => {

    const { line_items, subtotal, currency, discount } = useCartState()
    const isEmpty = line_items.length === 0

    console.log(line_items)

    if (isEmpty) return <p>Your cart is empty</p>

    return (
        <div className={styles.container}>
            
        <HtmlHead />
        <Header />

        <main className={styles.main}>

            <h1>Shopping Cart</h1>
            
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
            }}>

                <div style={{maxWidth: 'max-content'}}>
                    {
                        line_items.map((item: any) => {
                            return (
                                <CartItem 
                                    key={item.id} 
                                    currency={currency.symbol}    
                                    {...item} 
                                />
                            )
                        })
                    }
                
                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px 0', fontWeight: 'bold', alignItems: 'center'}}>
                        <Link href='/loja'>
                        <div style={{color: 'green', cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                            <FontAwesomeIcon icon={ faArrowLeftLong } />
                            <div style={{marginLeft: 10}}>Continuar comprando</div>
                        </div>
                        </Link>
                        <div style={{color: 'lightgray'}}>
                            Subtotal: 
                            <span style={{color: 'black', fontSize: 24}}> {currency.symbol} {subtotal.formatted}</span>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        border: '1px solid black',
                        width: '30%',
                        maxWidth: 400,
                        borderRadius: 15,
                        padding: 30,
                        backgroundColor: '#404040',
                        color: '#8E8E97'
                    }}
                >

                    <div style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Card Details</div>

                    <div>Card Type</div>

                    <div style={{
                        /* border: '1px solid black',  */
                        height: 200, display: 'flex', alignItems: 'center',
                        margin: '20px 0'
                    }}>
                        
                        <div style={{
                            /* border: '1px solid green',  */
                            height: 200, width: 400, 
                            borderRadius: 15, marginLeft: -100, marginRight: 20,
                            backgroundColor: 'lightgray'
                        }}>

                        </div>
                        <div>
                            <Image src="/mastercard.png" height={100} width={140} />
                        </div>
                    </div>

                    <div>Name on Card</div>
                    <div style={{
                        borderBottom: '1px solid #8E8E97', height: 40, marginBottom: 20
                    }}></div>
                    <div>Card Number</div>
                    <div style={{
                        borderBottom: '1px solid #8E8E97', height: 40, marginBottom: 20
                    }}></div>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div>Expiration date</div>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <div style={{
                                    borderBottom: '1px solid #8E8E97', height: 40, marginBottom: 20, width: 100, marginRight: 30
                                }}></div>
                                <div style={{
                                    borderBottom: '1px solid #8E8E97', height: 40, marginBottom: 20, width: 100
                                }}></div>   
                            </div>
                        </div>
                        <div style={{flex: 1, marginLeft: 30}}>
                            <div>CVV</div>
                            <div style={{
                                borderBottom: '1px solid #8E8E97', height: 40, marginBottom: 20
                            }}></div>
                        </div>
                    </div>

                    <div style={{
                        /* border: '1px solid black',  */
                        height: 60, borderRadius: 10, display: 'flex', 
                        alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#3076F0', color: 'white', fontWeight: 'bold',
                        marginTop: 30
                    }}>Check Out</div>

                </div>

            </div>
        </main>

      
        </div>
  )
}

export default Cart
