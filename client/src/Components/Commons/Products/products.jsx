import { useState } from 'react';

import Product from './product'
import Pagination from '../Pagination/pagination';

import './products.css'

const Products = ({ products, label }) => {
    let [pagination, setPagination] = useState(1);
    const [paginationRate] = useState(6);

    const start = (pagination - 1) * paginationRate;
    const end = pagination * paginationRate;

    const newProducts = products.slice(start, end);

    return (
        <section className='products-sec'>
            {label !== null && <h2 className='subcategory-label'>جستجو در {label}</h2>}
            {newProducts.map((p, index) => {
                return (
                    <Product product={p} index={index} length={newProducts.length} />
                );
            })}
            <Pagination
                pagination={pagination}
                rate={paginationRate}
                setPagination={setPagination}
                length={products.length}
            />
        </section>
    );
}
export default Products;