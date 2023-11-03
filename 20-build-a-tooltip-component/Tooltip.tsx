import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mergeRefs } from './mergeRefs';
import './styles.css';

export const Tooltip = ({ children, tip }) => {
    const triggerRef = React.useRef();
    const tipRef = React.useRef();

    const [isOpen, setIsOpen] = React.useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    React.useEffect(() => {
        if (!isOpen || !triggerRef.current || !tipRef.current) {
            return;
        }
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tipRect = tipRef.current.getBoundingClientRect();
        const top = (triggerRect.y + window.pageYOffset) + triggerRect.height + 8;
        const left = (triggerRect.x + window.pageXOffset) + ((triggerRect.width - tipRect.width) / 2);
        tipRef.current.style.transform = `translate(${left}px, ${top}px)`;
    }, [isOpen, triggerRef, tipRef]);

    const child = typeof children === 'string' ? <span>{children}</span> : React.Children.only(children);
    const clonedEle = React.cloneElement(child, {
        ...child.props,
        ref: mergeRefs([child.ref, triggerRef]),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    });

    return (
        <>
        {clonedEle}
        {isOpen && ReactDOM.createPortal(
            <div className="tip__content" ref={tipRef}>{tip}</div>,
            document.body
        )}
        </>
    );
};
