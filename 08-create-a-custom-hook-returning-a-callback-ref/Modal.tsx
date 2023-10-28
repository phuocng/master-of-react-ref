import { useClickOutside } from './useClickOutside';
import './styles.css';

export const Modal = ({ children, onClose }) => {
    const [ref] = useClickOutside(onClose);
    return (
        <div className="modal__overlay">
            <div
                className="modal__content"
                ref={ref}
            >
                {children}
            </div>
        </div>
    );
};
