import * as React from 'react';
import { mergeRefs } from './mergeRefs';
import './styles.css';
import { useDraggable } from './useDraggable';
import { useResizable } from './useResizable';

export default App = () => {
    const [draggableRef] = useDraggable();
    const [resizableRef] = useResizable();
    const ref = mergeRefs([draggableRef, resizableRef]);

    return (
        <div className="element resizable" ref={ref}>
            <div className="resizer resizer--r" />
            <div className="resizer resizer--b" />
        </div>
    );
};
