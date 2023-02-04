import { Typography } from '@mui/material';


const ProfileOrderItem = (item: any)  => {
    return (
        <div key={item.id} className="order-item">
            <div>
                { item.produse.map((name: any, idx: any) => {
                        return (
                            <div className='order-product' key={name}>
                                <Typography className="price" variant="subtitle1">
                                    {name} x{item.cantitate[idx]} Pret: {item.pret[idx]} lei
                                </Typography>
                            </div>
                        )
                    })
                }
            </div>

            <Typography variant="h6" component="h6">
                Total: {item.total}
            </Typography>

            <Typography variant="h6" component="h6">
                Data: {new Date(item.data).toLocaleString("en-GB")}
            </Typography>
        </div>
    )
}

export default ProfileOrderItem;