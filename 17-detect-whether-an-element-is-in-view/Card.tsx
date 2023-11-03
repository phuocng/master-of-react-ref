import * as React from 'react';
import './styles.css';
import { usePrevious } from './usePrevious';

export const Card = ({ children }) => {
    const eleRef = React.useRef();
    const [isInView, setIsInView] = React.useState(false);
    const wasInView = usePrevious(isInView);

    const checkInView = () => {
        const ele = eleRef.current;
        if (!ele) {
            return;
        }
        const rect = ele.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom >= 0);
    };

    React.useEffect(() => {
        checkInView();
    }, []);

    React.useEffect(() => {
        document.addEventListener("scroll", checkInView);
        window.addEventListener("resize", checkInView);
        return () => {
            document.removeEventListener("scroll", checkInView);
            window.removeEventListener("resize", checkInView);
        };
    }, []);

    React.useEffect(() => {
        const ele = eleRef.current;
        if (!ele) {
            return;
        }
        if (!wasInView && isInView) {
            // Element has come into view
            ele.classList.add('card__animated');
        }
    }, [isInView]);

    return (
        <div className="card" ref={eleRef}>
            {children}
        </div>
    );
};
