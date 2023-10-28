import { SortableList } from './SortableList';
import './styles.css';

export default App = () => {
    return (
        <SortableList>
            <div className="item">A</div>
            <div className="item">B</div>
            <div className="item">C</div>
            <div className="item">D</div>
            <div className="item">E</div>
        </SortableList>
    );
};
