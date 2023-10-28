import * as React from 'react';

export const useWatchSize = () => {
    const [node, setNode] = React.useState<HTMLElement>();
    const [width, setWidth] = React.useState(0);

    const resizeCallback = React.useCallback((entries) => {
        entries.forEach((entry) => {
            const rect = entry.target.getBoundingClientRect();
            setWidth(rect.width);
        });
    }, []);

    const ref = React.useCallback((nodeEle: HTMLElement | null) => {
        setNode(nodeEle);
    }, []);

    React.useEffect(() => {
        if (!node) {
            return;
        }
        const resizeObserver = new ResizeObserver(resizeCallback);
        resizeObserver.observe(node);

        return () => {
            resizeObserver.disconnect();
        };
    }, [node]);

    return [ref, width];
};
