import * as React from 'react';

export const useDraggable = () => {
    const [node, setNode] = React.useState<HTMLElement>(null);
    const [{ dx, dy }, setOffset] = React.useState({
        dx: 0,
        dy: 0,
    });
    const ref = React.useCallback((nodeEle) => {
        setNode(nodeEle);
    }, []);

    const handleMouseDown = React.useCallback((e) => {
        const startX = e.clientX - dx;
        const startY = e.clientY - dy;

        const handleMouseMove = (e) => {
            setOffset({
                dx: e.clientX - startX,
                dy: e.clientY - startY,
            });
        };
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [dx, dy]);

    React.useEffect(() => {
        if (node) {
            node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        }
    }, [node, dx, dy]);

    React.useEffect(() => {
        if (!node) {
            return;
        }
        node.addEventListener("mousedown", handleMouseDown);
        return () => {
            node.removeEventListener("mousedown", handleMouseDown);
        };
    }, [node, dx, dy]);

    return [ref];
};
