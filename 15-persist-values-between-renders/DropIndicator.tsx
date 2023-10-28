import * as React from 'react';
import './styles.css';

export const DropIndicator = () => {
    const containerRef = React.useRef();
    const dragCount = React.useRef(0);
    const [isDragging, setDragging] = React.useState(false);

    const handleDrop = (e: DragEvent): void => {
        e.preventDefault();
        setDragging(false);
        dragCount.current = 0;
        // Do something with `e.dataTransfer.files` ...
    };

    const handleDragOver = (e: DragEvent): void => {
        e.preventDefault();
    };

    const handleDragEnter = (e: DragEvent): void => {
        e.preventDefault();
        dragCount.current += 1;
        if (dragCount.current <= 1) {
            setDragging(true);
        }
    };

    const handleDragLeave = (e: DragEvent): void => {
        e.preventDefault();
        dragCount.current -= 1;
        if (dragCount.current <= 0) {
            setDragging(false);
        }
    };

    return (
        <div
            className={`indicator ${isDragging ? 'indicator__dragging' : ''}`}
            ref={containerRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {isDragging ? 'Drag and drop a file here' : (
                <button>Upload a file</button>
            )}
        </div>
    );
};
