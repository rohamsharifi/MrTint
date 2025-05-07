import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { FaQuestion } from 'react-icons/fa';


import "./common-questions.css";

const CommonQuestions = () => {
    const [questions, setQuestions] = useState([
        {
            question: "آیا شما قبلا کچل نبودید ؟",
            answer: `
          این سوال شما برمی‌گردد به دوران آشنایی من با 
          خانم علیزاده. فکر می‌کنم علت اصلی ریزش موی من 
          وجود این خانم زیبا و متشخص در زندگی من بود. 
          خلاصه که همیشه پای یک علیزاده در میان است.
          `,
            isOpen: false

        },
        {
            question: "آیا شما قبلا کچل نبودید ؟",
            answer: `
          این سوال شما برمی‌گردد به دوران آشنایی من با 
          خانم علیزاده. فکر می‌کنم علت اصلی ریزش موی من 
          وجود این خانم زیبا و متشخص در زندگی من بود. 
          خلاصه که همیشه پای یک علیزاده در میان است.
          `,
            isOpen: false
        },
        {
            question: "آیا شما قبلا کچل نبودید ؟",
            answer: `
          این سوال شما برمی‌گردد به دوران آشنایی من با 
          خانم علیزاده. فکر می‌کنم علت اصلی ریزش موی من 
          وجود این خانم زیبا و متشخص در زندگی من بود. 
          خلاصه که همیشه پای یک علیزاده در میان است.
          `,
            isOpen: false
        },
        {
            question: "آیا شما قبلا کچل نبودید ؟",
            answer: `
          این سوال شما برمی‌گردد به دوران آشنایی من با 
          خانم علیزاده. فکر می‌کنم علت اصلی ریزش موی من 
          وجود این خانم زیبا و متشخص در زندگی من بود. 
          خلاصه که همیشه پای یک علیزاده در میان است.
          `,
            isOpen: false
        },
        {
            question: "آیا شما قبلا کچل نبودید ؟",
            answer: `
          این سوال شما برمی‌گردد به دوران آشنایی من با 
          خانم علیزاده. فکر می‌کنم علت اصلی ریزش موی من 
          وجود این خانم زیبا و متشخص در زندگی من بود. 
          خلاصه که همیشه پای یک علیزاده در میان است.
          `,
            isOpen: false
        },
    ])

    const handleOpenAnswer = (i) => {
        setQuestions(prevQuestions =>
            prevQuestions.map((q, index) =>
                index === i ? { ...q, isOpen: !q.isOpen } : q
            )
        );
    };

    return (
        <section className="questions-section">
            {questions.map((q, i) => {
                let containerClassname = `questions-container ${i === questions.length - 1 ? "last-child" : ""}`;
                let chevronClassname = `chevron-div ${q.isOpen ? "active" : ""}`;
                let answerClassname = `answer-row ${q.isOpen ? "open" : ""}`;

                return (
                    <div key={i} className={containerClassname}>
                        <div className="questions-row" onClick={() => handleOpenAnswer(i)}>
                            <div className="icon-div">
                                <div className='question-mark-div'>
                                    <FaQuestion className='question-mark-icon' />
                                </div>
                            </div>
                            <div className="question-div">
                                <h2 className='question-header'>{q.question}</h2>
                            </div>
                            <div className="icon-div">
                                <div className={chevronClassname}>
                                    <FaChevronDown className="chevron-icon" />
                                </div>
                            </div>
                        </div>
                        <div className={answerClassname}>
                            <div className="icon-div"></div>
                            <div className="answer-div">
                                <p className='answer-p'>{q.answer}</p>
                            </div>
                            <div className="icon-div"></div>
                        </div>
                    </div >
                )
            })}
        </section >
    );
};

export default CommonQuestions;