import Link from 'next/link'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/components/Header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            
            <div style={{
                /* border: '1px solid white',  */
                height: '100%', width: 250, position: 'relative',
                margin: '0 20px 0 50px',
                pointerEvents: 'none'
            }}>
                <Image src={'/header-logo.png'} layout='fill' objectFit='cover' objectPosition='top' />
            </div>
            
            <div className={styles.headerButtons}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {/* <div style={{border: '1px solid white', height: '100%'}}>Logo</div> */}
                    <div style={{fontSize: 30}}>cervejasBR</div>                                
                    <div 
                        className={styles.social}
                        onClick={() => window.open(
                            'https://instagram.com/cervejasbr.com.br/', 
                            '_blank'
                        )}
                    >
                        <FontAwesomeIcon icon={ faInstagram } />
                    </div>
                    <div className={styles.social}>
                        <FontAwesomeIcon icon={ faWhatsapp } />
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Link href={'/loja'}>
                        <div style={{cursor: 'pointer'}}>Loja</div>
                    </Link>
                    <Link href='/parceiros'>
                        <div style={{cursor: 'pointer'}}>Parceiros</div>
                    </Link>                
                    <div>Minha Conta</div>
                    <Link href={'/carrinho'}>
                        <div className={styles.cart}>
                            <FontAwesomeIcon icon={ faCartPlus } />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
