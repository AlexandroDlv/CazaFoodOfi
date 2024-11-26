import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>La diversión no termina al pedir tu comida. Síguenos en nuestras redes sociales para ser parte de la comunidad CazaFood y descubrir sorpresas exclusivas para ti.</p>
            <p>¡Síguenos en nuestras redes sociales!</p>
            <div className="footer-social-icons">
                <a href="https://www.facebook.com/utchoficial/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                <img src={assets.facebook_icon} alt="Facebook" /> </a>

                <a href="https://x.com/utch_oficial?s=11" target="_blank" rel="noopener noreferrer">
                <img src={assets.twitter_icon} alt="Twiter" /> </a>

                <a href="https://www.utch.edu.mx/" target="_blank" rel="noopener noreferrer">
                <img src={assets.linkedin_icon} alt="" />  </a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Compañia</h2>
            <ul>
                <li>Inicio</li>
                <li>Sobre nosotros</li>
                <li>Entregas</li>
                <li>Politicas de privacidad</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contáctanos</h2>
            <ul>
                <li>+52-614-242-0888</li>
                <li>cazafood@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 ©  CazaFood.com - Todos los derechos reservados.</p>
    </div>
  )
}

export default Footer
