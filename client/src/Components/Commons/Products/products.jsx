import { useState } from 'react';

import Product from './product'
import Pagination from '../Pagination/pagination';

import './products.css'
import { useProduct } from '../../../Contexts/ProductContext';

const Products = () => {
    const [orderIndex, setOrderIndex] = useState(1);

    const { products } = useProduct();
    const { checkboxLabel } = useProduct();

    let firstLiClass = `byorder-li-medium ${orderIndex === 1 ? 'active' : ''}`;
    let secondLiClass = `byorder-li-medium ${orderIndex === 2 ? 'active' : ''}`;
    let thirdLiClass = `byorder-li-medium ${orderIndex === 3 ? 'active' : ''}`;
    let fourthLiClass = `byorder-li-medium ${orderIndex === 4 ? 'active' : ''}`;

    return (
        <section className='products-sec'>
            {checkboxLabel !== null &&
                <h2 className='subcategory-label-medium'>جستجو در {checkboxLabel}</h2>
            }
            <div className='byorder-div-medium'>
                <p>ترتیب نمایش:</p>
                <ul className='byorder-list-medium'>
                    <li
                        className={firstLiClass}
                        onClick={() => setOrderIndex(1)}
                    >مرتبط ترین</li>
                    <li
                        className={secondLiClass}
                        onClick={() => setOrderIndex(2)}
                    > ارزان ترین</li>
                    <li
                        className={thirdLiClass}
                        onClick={() => setOrderIndex(3)}
                    >گران ترین</li>
                    <li
                        className={fourthLiClass}
                        onClick={() => setOrderIndex(4)}
                    >پرفروش ترین</li>
                </ul>
            </div>
            {products.map((p, index) => {
                return (
                    <Product product={p} index={index} />
                );
            })}
            <Pagination />
        </section>
    );
}
export default Products;