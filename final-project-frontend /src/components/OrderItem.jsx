const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA 
const OrderItem = ({products})=> {
    const formatPrice = (price) => {
        if (price === undefined || price === null) return '';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className='w-[70%]'>
            <hr></hr>
            <div className='grid grid-cols-5 mt-3 items-center'>
                <img src={ URL_SERVER+products.image[0].url}
                    className='w-28 h-32 bg-gray-100 p-2 round-md border'/>
                <div className='col-span-2'>
                    <h2>{products.name}</h2>
                    <h2>Item Price: {formatPrice(products.price)} VND</h2>
                </div>
                <h2 className='ml-2'>Quantity: {products.amount}</h2>
                <h2>Price: {formatPrice(products.amount * products.price)}</h2>
            </div>
            <hr className="mt-3"></hr>
        </div>
    )
}
export default OrderItem;