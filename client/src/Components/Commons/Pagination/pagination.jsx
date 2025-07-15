import { useEffect, useState } from 'react';

import { useProduct } from '../../../Contexts/ProductContext';
import { RiArrowDropLeftLine } from 'react-icons/ri';
import { RiArrowDropRightLine } from 'react-icons/ri';

import './pagination.css';

const Pagination = () => {
    const [firstButton, setFirstButton] = useState(2);

    const { totalPages, currentPage, setCurrentPage } = useProduct();

    const pages = [1, 2, 3, 4, 5];
    const newPages = pages.slice(0, totalPages);

    useEffect(() => {
        if (currentPage <= 3) setFirstButton(2);

        if (currentPage > 3 && currentPage < totalPages - 1) setFirstButton(currentPage - 1);

        if (currentPage >= totalPages) setFirstButton(totalPages - 3);
    }, [currentPage])

    const handlePreviousButton = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handleNextButton = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    let firstBtnClass = `pag-btn ${currentPage === 1 ? 'active' : ''}`;
    let lastBtnClass = `pag-btn ${currentPage === totalPages ? 'active' : ''}`;
    let midFirstBtnClass = `pag-btn ${currentPage === firstButton ? 'active' : ''}`;
    let midSecondBtnClass = `pag-btn ${currentPage === firstButton + 1 ? 'active' : ''}`;
    let midThirdBtnClass = `pag-btn ${currentPage === firstButton + 2 ? 'active' : ''}`;

    let firstDotsClass = `pag-dots ${currentPage < 4 ? 'none' : ''}`
    let secondDotsClass = `pag-dots ${currentPage > totalPages - 3 ? 'none' : ''}`

    return (
        <section className='pagination-sec'>
            {totalPages > 5 ? (
                <div className='pag-btns-big'>
                    <button
                        className='pag-arrow-btn'
                        onClick={handlePreviousButton}
                    >
                        <RiArrowDropRightLine className='pag-arrow-icon' />
                    </button>
                    <button
                        className={firstBtnClass}
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </button>
                    <span className={firstDotsClass} >...</span>
                    <button
                        className={midFirstBtnClass}
                        onClick={() => setCurrentPage(firstButton)}
                    >
                        {firstButton}
                    </button>
                    <button
                        className={midSecondBtnClass}
                        onClick={() => setCurrentPage(firstButton + 1)}
                    >
                        {firstButton + 1}
                    </button>
                    <button
                        className={midThirdBtnClass}
                        onClick={() => setCurrentPage(firstButton + 2)}
                    >
                        {firstButton + 2}
                    </button>
                    <span className={secondDotsClass}>...</span>
                    <button
                        className={lastBtnClass}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </button>
                    <button
                        className='pag-arrow-btn'
                        onClick={handleNextButton}
                    >
                        <RiArrowDropLeftLine className='pag-arrow-icon' />
                    </button>
                </div>
            ) : (
                <div className='pag-btns'>
                    <button
                        className='pag-arrow-btn'
                        onClick={handlePreviousButton}
                    >
                        <RiArrowDropRightLine className='pag-arrow-icon' />
                    </button>
                    {newPages.map((p) => {
                        let classname = `pag-btn ${p === currentPage ? 'active' : ''}`
                        return (
                            <button className={classname} onClick={() => setCurrentPage(p)}>
                                {p}
                            </button>
                        )
                    })}
                    <button
                        className='pag-arrow-btn'
                        onClick={handleNextButton}
                    >
                        <RiArrowDropLeftLine className='pag-arrow-icon' />
                    </button>
                </div>
            )}
        </section>
    );
}
export default Pagination;