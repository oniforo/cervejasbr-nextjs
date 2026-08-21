import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Item from '../components/item'

import styles from '../styles/components/Bestseller.module.css'

const Bestseller = ({ products, setModal }: any) => {
    
    const onClick = (product: any) => {
        setModal([ true, product ])
        /* console.log('here') */
    }

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={100}
            slidesPerGroup={4}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
            clickable: true
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles.swiper}
        >            
            {
            products.map((product: any) => {
                return (
                <SwiperSlide>
                    <div className={styles.swiperSlide}>
                    <Item
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        style={product.categories[0].name}                        
                        price={product.price.formatted}
                        url={product.assets[0]?.url}
                        sku={product.sku}
                        onClick={() => onClick(product)}
                        />
                    </div>
                </SwiperSlide>
                )
            })
            }

      </Swiper>
    )
}

export default Bestseller