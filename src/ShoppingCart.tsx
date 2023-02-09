import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartItem from './ShoppingCartItem';
import { clearCart, resetCart } from './store/cartSlice';
import { useGet_ordersQuery, usePost_cartMutation } from './store/cartApi';
import { useState } from 'react';
import { toast } from 'react-toastify';

import './ShoppingCart.scss'


function ShoppingCart(user: any) {
  const [nume, setNume] = useState("");
  const [post_cart] = usePost_cartMutation();
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const {refetch} = useGet_ordersQuery(user?.user?.uid);

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  const handleOrder = async() => {
    if(user.user){
      const cart_data = {
        produse: cart.cartItems.map((data: any) => data.denumire),
        cantitate: cart.cartItems.map((data: any) => data.cartQuantity),
        pret: cart.cartItems.map((data: any) => data.pret),
        total: Math.round(cart.cartTotalAmount * 100) / 100,
        data: new Date().toISOString(),
        user: user.user.uid
      }

      await post_cart(cart_data)
            .then(() => dispatch(resetCart()))
            .then(() => refetch());
    } else {
      if (nume !== ""){
        const cart_data = {
          produse: cart.cartItems.map((data: any) => data.denumire),
          cantitate: cart.cartItems.map((data: any) => data.cartQuantity),
          pret: cart.cartItems.map((data: any) => data.pret),
          total: Math.round(cart.cartTotalAmount * 100) / 100,
          data: new Date().toISOString(),
          nume: nume
        }

        await post_cart(cart_data)
              .then(() => dispatch(resetCart()));
      } else {
        toast.error(`Adauga numele si prenumele in comanda!`, {position: "bottom-left"});
      }
    }
  }


  return (
    <div className="shoppingCart">
      <header className="shoppingCart-header">
        <Typography variant="h3" component="h3">
          Cosul meu
        </Typography>
      </header>

      {
        cart.cartItems.length !== 0
          ?
            <div className='content'>
              <div className='shoppingCart-title'>
                <Typography className="product" variant="h4" component="h4">
                  Produs
                </Typography>
                <Typography className="price" variant="h4" component="h4">
                  Pret
                </Typography>
                <Typography className="quantity" variant="h4" component="h4">
                  No.
                </Typography>
                <Typography className="total" variant="h4" component="h4">
                  Total
                </Typography>
              </div>

              {cart.cartItems.map((item: any) => ShoppingCartItem(item))}

              <div className="summary">
                <div>
                  {
                    !user.user && <Box
                                  className = "field"
                                  sx = {{ display: 'flex', width: "fit-content", columnGap: "1.5vw" }}
                              >
                                  <label className='scris'>Nume si prenume: </label> 
                                  <TextField
                                      className = "raspuns"
                                      variant = "outlined"
                                      placeholder = {nume}
                                      onChange = {(e) => {
                                          setNume(e.target.value);
                                      }}
                                      value = {nume}
                                      sx = {{
                                        borderWidth: "1px",
                                        borderRadius: "12px",
                                        borderColor: "white",
                                        borderStyle: "solid",
                                        input: {color: "white"},
                                      }}
                                  />
                              </Box>
                  }

                  <div>
                    <Button
                      className = 'clear-items'
                      onClick = {() => handleClearCart()}
                      >
                        Goleste cos
                    </Button>
                  </div>
                </div>

                <div className="checkout">
                  <Typography className="total_cart" variant="h4" component="h4">
                    Total: {Math.round(cart.cartTotalAmount * 100) / 100} lei
                  </Typography>

                  <div>
                    <Button
                      className = 'place-order'
                      onClick = {async() => handleOrder()}
                      >
                        Plaseaza comanda
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          :
            <Typography className='empty_cart' variant="h5" component="h5">
              Cosul tau de cumparaturi este gol!
            </Typography>
      }
    </div>
  );
}

export default ShoppingCart;