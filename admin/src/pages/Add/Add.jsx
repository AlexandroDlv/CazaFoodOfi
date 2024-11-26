import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { assets, url } from '../../assets/assets';
import './Add.css';

const Add = () => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Ensalada"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Subir imagen</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Nombre del producto</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Escribe aquí' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Descripción del Producto</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Escribe contenido aquí' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Categoría de producto</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Ensalada">Ensalada</option>
                            <option value="Burritos">Burritos</option>
                            <option value="Montados">Montados</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Tortas">Tortas</option>
                            <option value="Chilaquiles">Chilaquiles</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Precio del producto</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >Agregar</button>
            </form>
        </div>
    )
}

export default Add
