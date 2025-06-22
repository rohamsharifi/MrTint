import { useState } from 'react';
import Product from './product'

import './products.css'

const Products = ({ products, pagination, paginationRate }) => {

    const start = (pagination - 1) * paginationRate;
    const end = pagination * paginationRate;

    const newProducts = products.slice(start, end);

    return (
        <section className='products-sec'>
            {newProducts.map((p, index) => {
                return (
                    <Product product={p} index={index} length={newProducts.length} />
                );
            })}
        </section>
    );
}
export default Products;