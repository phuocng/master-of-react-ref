import * as React from 'react';
import './styles.css';
import { useInView } from './useInView';

export const Card = ({ children }) => {
    const ref = React.useRef();
    const handleInView = (ele) => {
        ele.classList.add("card__animated");
    };

    useInView(ref, handleInView);

    return (
        <div className="card" ref={ref}>{children}</div>
    );
};
