import './productCount.css';

const ProductCount = ({
    setProductCount,
    setInventoryErr,
    productCount,
    product }) => {

    const increaseProductCount = () => {
        if (productCount < product.inventory)
            setProductCount(productCount + 1);
        else
            setInventoryErr(true);
    }

    const decreaseProductCount = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
            setInventoryErr(false);
        }
    }

    const changeProductCount = (value) => {
        let newValue = '';
        for (let i = 0; i < value.length; i++) {
            const code = value.charCodeAt(i);
            if (code > 47 && code < 58) {
                newValue += value[i];
            }
        }

        const number = Number(newValue);

        if (newValue !== '') {
            setProductCount(number);
        } else {
            setProductCount('');
        }
    }

    const blurProductCount = () => {
        if (productCount === '' || productCount === 0) setProductCount(1);
        if (productCount > product.inventory) {
            setProductCount(product.inventory);
            setInventoryErr(true);
        }
    }

    let minusClass = `count-product-button decrease ${productCount === 1 ? 'disabled' : ''}`;
    let plusClass = `count-product-button increase ${productCount >= product.inventory ? 'disabled' : ''}`;

    return (
        <div className='count-product-div'>
            <button
                className={plusClass}
                onClick={increaseProductCount}
            >
                +
            </button>
            <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={productCount}
                onChange={(e) => changeProductCount(e.target.value)}
                onBlur={blurProductCount}
                className='count-product-input'
            />
            <button
                className={minusClass}
                onClick={decreaseProductCount}
            >
                -
            </button>
        </div>
    )
}

export default ProductCount;