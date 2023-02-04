import { IconButton, Tooltip, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { decItems, incItems, removeItem } from './store/cartSlice';


const ShoppingCartItem = (item: any)  => {
    const dispatch = useDispatch()

    const handleRemoveItem = (item: any) => {
        dispatch(removeItem(item));
    }

    const handleDecItem = (item: any) => {
        dispatch(decItems(item));
    }

    const handleIncItem = (item: any) => {
        dispatch(incItems(item));
    }

    return (
        <div key={item.id} className="item">
            <div className="product">
                <img src={item.url_poza} alt="item img"/>

                <Typography variant="h5" component="h5">
                    {item.denumire}
                </Typography>
            </div>

            <Typography className="price" variant="h5" component="h5">
                {item.pret}
            </Typography>

            <div className="quantity">
                <Tooltip title="Scade">
                    <span>
                        <IconButton
                            disabled = {item.cartQuantity === 1}
                            onClick = {() => handleDecItem(item)}
                            >
                            <RemoveIcon
                                sx={{
                                    color: 'white',
                                    fontSize: "20px"
                                }}
                                />
                        </IconButton>
                    </span>
                </Tooltip>

                <Typography variant="h5" component="h5">
                    {item.cartQuantity}
                </Typography>

                <Tooltip title="Adauga">
                    <IconButton
                        onClick= {() => handleIncItem(item)}
                        >
                        <AddIcon
                            sx={{
                                color: 'white',
                                fontSize: "20px"
                            }}
                            />
                    </IconButton>
            </Tooltip>
            </div>

            <Typography className="total" variant="h5" component="h5">
                {Math.round(item.pret * item.cartQuantity * 100) / 100} lei
            </Typography>

            <Tooltip title="Remove">
                <IconButton
                    onClick= {() => handleRemoveItem(item)}
                    >
                    <HighlightOffIcon
                        sx={{
                            color: 'white',
                            fontSize: "40px"
                        }}
                        />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ShoppingCartItem