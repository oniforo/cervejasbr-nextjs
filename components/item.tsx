import Image from 'next/image'

import styles from '../styles/components/Item.module.css'
import { useCartDispatch } from '../context/cart'
import commerce from '../lib/commerce'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

interface IItem {
  name: string,
  style: string,
  price: number,
  url: string,
  id: string,
  sku: string,
  onClick: VoidFunction
}

const Item = ({ name, style, price, url, id, sku, onClick }: IItem) => {

    const getVolume = (sku: string) => {
      const skuPart = sku.split('-')
      const volume = skuPart[skuPart.length - 1]
      return volume
    }

    const { setCart } = useCartDispatch()

    const addToCart = () => {
      commerce.cart.add(id)
        .then(({ cart }: any) => setCart(cart))
        .catch((err: Error) => console.error('Failed to add to cart:', err.message))
    }

    return (
        <div>
          <div className={styles.item}>
            <div className={styles.image}>
              {url && <Image src={ url } layout='fill'/>}
            </div>
            
            <div style={{flex: 1}}>
              <div style={{fontWeight: 'bold'}}>{ name }</div>
              <div>{ style }</div>
              <div>{ getVolume(sku) } ml</div>
            </div>
            
            <div className={styles.price}>R$ { price }</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', height: 50}}>
            <div className={styles.additional} onClick={onClick}>
              Mais informações
            </div>
            <div className={styles.cart} onClick={addToCart}>
              <FontAwesomeIcon icon={faCartPlus} />
            </div>
          </div>
        </div>
    )
}

export default Item