import { useState } from 'react';

import './pagination.css';

const Pagination = ({ pagination, rate, setPagination, length }) => {
    const [firstButton, setFirstButton] = useState(2);

    const lastPage = length % rate === 0 ? length / rate : length / rate + 1;

    const decreasePagination = () => {
        const tempLastPage = length % rate === 0 ? length / rate : length / rate + 1;

        if (pagination > 1) {
            setPagination(pagination - 1);
        }
        if (pagination < tempLastPage - 1 && pagination > 3) {
            setFirstButton(firstButton - 1);
        }
    }

    const increasePagination = () => {
        const tempLastPage = length % rate === 0 ? length / rate : length / rate + 1;

        if (pagination < tempLastPage) {
            setPagination(pagination + 1);
        }
        if (pagination > 2 && pagination < tempLastPage - 2) {
            setFirstButton(firstButton + 1);
        }
    }

    const handleFirstButton = () => {
        setPagination(1);
        setFirstButton(2);
    }

    const handleSecondButton = () => {
        setPagination(firstButton);

        if (pagination > 4) {
            setFirstButton(firstButton - 1);
        }
    }

    const handleThirdButton = () => {
        const tempLastPage = length % rate === 0 ? length / rate : length / rate + 1;

        if (pagination < 3) {
            setPagination(3)
        }

        if (pagination > tempLastPage - 2) {
            setPagination(tempLastPage - 2)
        }
    }

    const handleFourthButton = () => {
        const tempLastPage = length % rate === 0 ? length / rate : length / rate + 1;

        setPagination(firstButton + 2);

        if (pagination < tempLastPage - 2) {
            setFirstButton(firstButton + 1);
        }
    }

    const handleLastButton = () => {
        const tempLastPage =
            length % rate === 0 ?
                length / rate :
                length / rate + 1;

        setPagination(tempLastPage);
        if (tempLastPage > 4) setFirstButton(tempLastPage - 3);
    }

    let firstDotsClass = `pagination-dots-first ${firstButton < 3 ? 'none' : null}`
    let secondDotsClass = `pagination-dots-second ${firstButton > lastPage - 4 ? 'none' : null}`

    let firstButtonClass = `pagination-button first ${pagination === 1 ? 'active ' : ''}`;
    let secondButtonClass = `pagination-button second ${((pagination === firstButton) && (lastPage !== 2)) && ((pagination < lastPage - 2) || (lastPage < 5)) ? 'active' : ''}`;
    let thirdButtonClass = `pagination-button third ${pagination === firstButton + 1 ? 'active ' : ''}`;
    let fourthButtonClass = `pagination-button fourth ${pagination === firstButton + 2 ? 'active ' : ''}`;
    let lastButtonClass = `pagination-button last ${pagination === lastPage ? 'active ' : ''}`;

    let paginationSecClass = `pagination-sec ${length <= rate ? 'none' : ''}`

    if (lastPage < 3) {
        secondButtonClass = secondButtonClass + 'none';
        thirdButtonClass = thirdButtonClass + 'none';
        fourthButtonClass = fourthButtonClass + 'none';
    } else if (lastPage < 4) {
        thirdButtonClass = thirdButtonClass + 'none';
        fourthButtonClass = fourthButtonClass + 'none';
    } else if (lastPage < 5) {
        fourthButtonClass = fourthButtonClass + 'none';
    }

    return (
        <section className={paginationSecClass}>
            <button className='pagination-button previous' onClick={decreasePagination}>{`<`}</button>
            <button
                className={firstButtonClass}
                onClick={handleFirstButton}
            >
                1
            </button>
            <span className={firstDotsClass}>...</span>
            <button
                className={secondButtonClass}
                onClick={handleSecondButton}
            >
                {firstButton}
            </button>
            <button
                className={thirdButtonClass}
                onClick={handleThirdButton}
            >
                {firstButton + 1}
            </button>
            <button
                className={fourthButtonClass}
                onClick={handleFourthButton}
            >
                {firstButton + 2}
            </button>
            <span className={secondDotsClass}>...</span>
            <button
                className={lastButtonClass}
                onClick={handleLastButton}
            >
                {lastPage}
            </button>
            <button className='pagination-button next' onClick={increasePagination}>{`>`}</button>
        </section>
    );
}
export default Pagination;