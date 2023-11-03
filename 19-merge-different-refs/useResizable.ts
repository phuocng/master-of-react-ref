import * as React from 'react';

export const useResizable = () => {
    const [node, setNode] = React.useState<HTMLElement>(null);
    const [{ w, h }, setSize] = React.useState({
        w: 0,
        h: 0,
    });
    const ref = React.useCallback((nodeEle) => {
        setNode(nodeEle);
    }, []);

    const handleMouseDown = React.useCallback((e) => {
        e.stopPropagation();

        const startX = e.clientX;
        const startY = e.clientY;

        const styles = window.getComputedStyle(node);
        const w = parseInt(styles.width, 10);
        const h = parseInt(styles.height, 10);

        const handleMouseMove = (e) => {
            const newDx = e.clientX - startX;
            const newDy = e.clientY - startY;
            setSize({
                w: w + newDx,
                h: h + newDy,
            });
        };
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [node]);

    React.useEffect(() => {
        if (node && w > 0 && h > 0) {
            node.style.width = `${w}px`;
            node.style.height = `${h}px`;
        }
    }, [node, w, h]);

    React.useEffect(() => {
        if (!node) {
            return;
        }
        const resizerElements = [...node.querySelectorAll('.resizer')];
        resizerElements.forEach((resizerEle) => {
            resizerEle.addEventListener("mousedown", handleMouseDown);
        });

        return () => {
            resizerElements.forEach((resizerEle) => {
                resizerEle.removeEventListener("mousedown", handleMouseDown);
            });
        };
    }, [node]);

    return [ref];
};
