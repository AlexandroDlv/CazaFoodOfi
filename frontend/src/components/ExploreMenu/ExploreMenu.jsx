import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {menu_list} = useContext(StoreContext);
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explora nuestro menú</h1>
      <p className='explore-menu-text'>Nuestro menú está diseñado para satisfacer todos los antojos y necesidades de la comunidad universitaria, ofreciendo una gran variedad de opciones nutritivas, rápidas y deliciosas. Desde desayunos completos para arrancar el día hasta comidas y snacks ideales para recargar energía entre clases, en CazaFood encontrarás una selección de platillos frescos y bien preparados.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img src={item.menu_image} className={category===item.menu_name?"active":""} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
