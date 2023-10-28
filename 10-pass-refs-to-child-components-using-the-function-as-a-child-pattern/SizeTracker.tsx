import * as React from 'react';

export const SizeTracker = ({ children }) => {
    const [width, setWidth] = React.useState(0);

    const resizeCallback = React.useCallback((entries) => {
        entries.forEach((entry) => {
            const rect = entry.target.getBoundingClientRect();
            setWidth(rect.width);
        });
    }, []);

    const resizeObserver = React.useMemo(() => new ResizeObserver(resizeCallback), []);

    const trackSize = (ele) => {
        if (ele) {
            resizeObserver.observe(ele);
        }
    };

    React.useEffect(() => {
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return children({
        ref: trackSize,
        width,
    });
};
