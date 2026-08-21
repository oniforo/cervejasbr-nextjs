import { useState } from 'react'

import type { NextPage } from 'next'
/* import Head from 'next/head' */
/* import Image from 'next/image' */
import HtmlHead from '../components/htmlHead'

import styles from '../styles/Loja.module.css'

/* import Slider from '../components/slider' */
import Header from '../components/header'
import Item from '../components/item'
import Footer from '../components/footer'
import ProductModal from '../components/productModal'

import { getStorefrontData } from '../lib/commerce'

export async function getStaticProps() {

  const { merchant, categories, products } = await getStorefrontData()

  return { props: { merchant, categories, products }, revalidate: 60 }

}

interface IProductMap {
  name: string,
  categories: { name: string }[],
  price: { formatted: number },
  assets: { url: string }[],
  id: string,
  sku: string
}

interface IProps {
  merchant: {},
  categories: {},
  products: []
}

const Home: NextPage<IProps> = ({ merchant, categories, products }) => {

  const [ modal, setModal ] = useState([true, {}])

  return (
    <div className={styles.container}>
      
      <HtmlHead />
      <Header />


      <main className={styles.main}>
        
      <div style={{
          borderRight: '1px solid black', height: 'calc(100vh - 60px)', 
          position: 'fixed', left: 0, width: 250, top: 60, overflow: 'scroll'
      }}>
        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </div>

        <div style={{
          /* border: '1px solid black', */
          display: 'flex', justifyContent: 'space-around', width: '100%', 
          flexWrap: 'wrap', padding: 20, paddingTop: 50}}>
          {
            products.length > 0
            ? products.map((product: IProductMap) => {
              return (
                <div style={{margin: 10, marginBottom: 50, /* border: '1px solid black' */}}>
                  <Item
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    style={product.categories[0].name}
                    price={product.price.formatted}
                    url={product.assets[0]?.url}
                    sku={product.sku}
                    onClick={() => setModal([ true, product ])}
                  />
                </div>
              )
            })
            : <div>Produtos temporariamente indisponíveis. Tente novamente em instantes.</div>
          }

        </div>

        <div style={{width: '100%'}}>
          <Footer />
        </div>
      
      </main>

      { modal[0] && <ProductModal modal={modal} setModal={setModal} /> }

    </div>
  )
}

export default Home
