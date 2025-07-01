const CartProducts = ({ products }) => {
    return (
        <section className='cart-products-sec'>
            {products.map((p) => {
                console.log(p.name);
                return (
                    <div>{p.name}</div>
                )
            })}
        </section>
    );
};

export default CartProducts;