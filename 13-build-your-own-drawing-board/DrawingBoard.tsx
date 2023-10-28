import { generateId } from './generateId';
import * as React from 'react';
import './styles.css';

type Point = {
    x: number;
    y: number;
};
type Line = {
    id: string;
    points: Point[];
};

export const DrawingBoard = () => {
    const svgRef = React.useRef();
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [id, setId] = React.useState('');
    const [lines, setLines] = React.useState<Line[]>([]);

    const handleMouseDown = (e) => {
        handleStartDrawing(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
        handleStartDrawing(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleStartDrawing = (x, y) => {
        const id = generateId(6);
        const svgRect = svgRef.current.getBoundingClientRect();
        const startingPoint = {
            x: x - svgRect.x,
            y: y - svgRect.y,
        };
        setIsDrawing(true);
        setId(id);
        setLines((lines) => (
            lines.concat({
                id,
                points: [startingPoint],
            })
        ));
    };

    const handleMouseMove = (e) => {
        handleMoving(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
        handleMoving(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMoving = (x, y) => {
        if (!isDrawing) {
            return;
        }
        const svgRect = svgRef.current.getBoundingClientRect();

        setLines((lines) => (
            lines.map((line) => (
                line.id === id
                    ? {
                        ...line,
                        points: line.points.concat({
                            x: x - svgRect.x,
                            y: y - svgRect.y,
                        }),
                    }
                    : line
            ))
        ));
    };

    const handleStopDrawing = () => {
        setIsDrawing(false);
    };

    // For demo purspose
    React.useEffect(() => {
        const svgEle = svgRef.current;
        if (!svgEle) {
            return;
        }
        const { height, width } = svgEle.getBoundingClientRect();
        svgEle.setAttribute('width', width);
        svgEle.setAttribute('viewBox', `0 0 ${width} ${height}`);
    });

    return (
        <svg
            className="board"
            ref={svgRef}
            height="320"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleStopDrawing}
            onMouseLeave={handleStopDrawing}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleStopDrawing}
            style={{
                touchAction: "none",
            }}
        >
        {
            lines.map(({ id, points }) => (
                <polyline
                    key={id}
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    points={points.map(point => `${point.x},${point.y}`).join(" ")}
                />
            ))
        }
        </svg>
    );
};
