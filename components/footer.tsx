import Image from 'next/image'

import styles from '../styles/components/Footer.module.css'

const Footer = () => {
    return (            
        <footer className={styles.footer}>
            <div>Nossos <br/>Parceiros</div>
            <div>Perguntas <br/>Frequentes</div>
            <div>Termos e <br/>Condições</div>          
            <div>Política de <br/>Privacidade</div>
        </footer>       
    )
}

export default Footer