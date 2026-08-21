import { useState } from 'react'

import type { NextPage } from 'next'
/* import Head from 'next/head' */
/* import Image from 'next/image' */
import HtmlHead from '../components/htmlHead'

import styles from '../styles/Home.module.css'

import Slider from '../components/slider'
import Header from '../components/header'
/* import Item from '../components/item' */
import Footer from '../components/footer'
import Bestseller from '../components/bestseller'
import ProductModal from '../components/productModal'

import commerce from '../lib/commerce'

export async function getStaticProps() {
  
  const merchant = await commerce.merchants.about()
  const { data: categories } = await commerce.categories.list()
  const { data: products } = await commerce.products.list()

  return { props: { merchant, categories, products } }

}

interface IProductMap {
  name: string,
  categories: { name: string }[],
  price: { formatted: number },
  assets: { url: string }[],
  id: string
}

interface IProps {
  merchant: {},
  categories: {},
  products: []
}

const Home: NextPage<IProps> = ({ merchant, categories, products }) => {

  const [ modal, setModal ] = useState([ false, {} ])

  return (
    <div className={styles.container}>
      
      <HtmlHead />
      <Header />
      
      <div style={{}} className={styles.background}>
        <div style={{fontSize: 40, fontWeight: 'bold'}}>Precisamos conversar sobre</div>
        <div style={{fontSize: 40, fontWeight: 'bold', color: 'green'}}>cervejas artesanais</div>
        <div style={{width: '50%', margin: '20px 0 40px'}}>Gatsby is the fast and flexible framework that makes building websites with any CMS, API, or database fun again. Build and deploy headless websites <b>that drive more traffic, convert better, and earn more revenue!</b></div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        
        <div style={{
          width: 'max-content', padding: '10px 20px', borderRadius: 10, 
          backgroundColor: 'green', fontWeight: 'bold', marginRight: 30,
          cursor: 'pointer'
        }}>Começar</div>

        <div style={{
          textDecoration: 'underline', fontWeight: 'bold',
          cursor: 'pointer'
        }}>Conheça nossos parceiros</div>
        </div>
      </div>
      
      <Slider />

      <main className={styles.main}>

        <div style={{
          fontSize: 20, textAlign: 'left', alignSelf: 'flex-start', 
          margin: '0 0 50px', borderBottom: '1px solid black'
        }}>
          Mais vendidos
        </div>

        <Bestseller products={products} setModal={setModal} />          
        
        { modal[0] && <ProductModal modal={modal} setModal={setModal} /> }
        {/* <div>PRODUCTS</div>
        <pre>{JSON.stringify(products, null, 2)}</pre> */}

      </main>

      <Footer />

    </div>
  )
}

export default Home
