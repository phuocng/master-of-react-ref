import { useDraggable } from './useDraggable';
import './styles.css';

export default App = () => {
    const [ref] = useDraggable();
    return (
        <div className="element" ref={ref}>
            Drag me
        </div>
    );
};
