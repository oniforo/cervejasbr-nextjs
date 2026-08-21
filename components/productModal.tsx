/* import { useState, useEffect } from 'react'

import commerce from '../lib/commerce' */

import styles from '../styles/components/ProductModal.module.css'

const ProductModal = ({ modal, setModal }: any) => {
    
    /* const [ productData, setProductData ] = useState()

    const fetchProductData = async (permalink: string) => {
        const product = await commerce.products.retrieve(permalink, {
            type: 'permalink'
        })
        setProductData(product)
    }

    useEffect(() => {
        fetchProductData(modal[1].permalink)
    }, [modal]) */

    /* console.log('modal: ', modal) */

    const closeModal = () => {
        setModal([ false, {} ])
    }

    return (
        <>
        <div className={styles.background} onClick={() => setModal([false, {}])} />
        <div className={styles.modal}>
            <div className={styles.closeModal} onClick={closeModal}>
                X
            </div>
            Subproduct modal
            <div style={{display: 'flex'}}>
            {/* <pre>ABC: {JSON.stringify(productData, null, 2)}</pre> */}
            <pre>{JSON.stringify(modal, null, 2)}</pre>
            </div>
        </div>
        </>
    )
}

export default ProductModal