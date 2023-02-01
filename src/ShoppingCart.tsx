import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartItem from './ShoppingCartItem';
import { clearCart } from './store/cartSlice';

import './ShoppingCart.scss'


function ShoppingCart() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
      dispatch(clearCart());
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
                  <Button
                    className = 'clear-items'
                    onClick = {() => handleClearCart()}
                    >
                      Goleste cos
                  </Button>
                </div>

                <div className="checkout">
                  <Typography className="total_cart" variant="h4" component="h4">
                    Total: {Math.round(cart.cartTotalAmount * 100) / 100} lei
                  </Typography>
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