import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import styles from '../styles/components/Slider.module.css'

const Slider = () => {
    return (
        <Swiper
            slidesPerView={8}
            spaceBetween={50}
            slidesPerGroup={1}
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
            [
                'hocus-pocus', 'wonderland', 'zapata',
                'tesla', 'pakas', 'molinarius',                
                'fumaconica', 'ignorus'
            ].map(brand => {
                return (
                <SwiperSlide>
                    {/* <div className={styles.swiperSlide}>
                    Slide {slide}
                    </div> */}
                    <Image src={`/brands/${brand}.png`} layout='fill' objectFit='contain' />
                </SwiperSlide>
                )
            })
            }            

      </Swiper>
    )
}

export default Slider