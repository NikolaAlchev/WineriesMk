import React, {useState, useEffect} from 'react'
import { request, setAuthHeader, getAuthToken } from '../../Helpers/axios_helper';
import {SliderBox} from "../SliderBox"
import "./css/Cart.css"
import { FixedSizeList as List } from 'react-window';


export const Cart = () => {
    const[results, setResults] = useState([])
    const[wines, setWines] = useState([])

    const handleOrder = () => {
        request(
          "POST",
          "/orders/order/create",
          {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
            },
          }
          ).then(
            (response) => {
                console.log(response)
            }).catch(
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }

      const initalData = () => {
        request(
            "GET",
            "/cart/view",
            {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`,
                },  
            }).then(
            (response) => {
                setResults(response.data)
                console.log(response)
            }).catch(
            (error) => {
              console.error('Error fetching data:', error);
            }
          );
      };
    
      useEffect(() => {
          initalData();
      }, []);

      return(
            <div className='cart-outer-container'>
                <div className='cart-inner-container'>
                    <h1>CART</h1>
                    <div className='cart-content'>
                            {results.cartWines && results.cartWines.length > 0 ? (
                                <List height={500} itemCount={results.cartWines.length} itemSize={500} width={600}>
                                    {({ index, style }) => (
                                        // Render your content here based on the index
                                        <div style={style} className='cart-wine'>
                                            <img src={results.cartWines[index].wine.photoUrl} alt={results.cartWines[index].wine.name} />
                                            <div>
                                                <h2>{results.cartWines[index].wine.name.toUpperCase()}</h2>
                                                <p>Price: {results.cartWines[index].wine.price} mkd</p>
                                                <p>Total Price: {results.cartWines[index].wine.price} x {results.cartWines[index].quantity} = {(results.cartWines[index].wine.price)*(results.cartWines[index].quantity)} mkd</p>
                                                <p>WINERY: {results.cartWines[index].wine.winery.name}</p>
                                            </div>
                                        </div>
                                    )}
                                </List>
                                ) : (
                                    <p>No items in the cart.</p>
                            )}
                        <div className='order-confirmation'>
                                <h2>SUMMARY</h2>
                                <p>Total: mkd</p>
                                <p>Delivery: mkd</p>
                                <hr/>
                                <h2>TOTAL: <span>mkd</span></h2>
                                <button onClick={handleOrder}>ORDER</button>
                        </div>
                        <div>

                        </div>
                    </div>
                    <hr/>
                    <div className='recommended-container'>
                        <h1>RECOMMENDED</h1>
                        <div className='recommended-list'>
                            <SliderBox results={wines} display="wine"/>
                        </div>
                    </div>                    
                </div>
            </div>
      );

}