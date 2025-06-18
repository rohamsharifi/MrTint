import Product from './product'

const Products = ({ products }) => {
    return (
        <section className='products-sec'>
            {products.map((p) => {
                return (
                    <Product product={p} />
                );
            })}
        </section>
    );
}
export default Products;