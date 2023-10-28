import * as React from 'react';

export const useClickOutside = (handler: () => void) => {
    const [node, setNode] = React.useState<HTMLElement>(null);

    const ref = React.useCallback((nodeEle) => {
        setNode(nodeEle);
    }, []);

    const handleClick = React.useCallback((e) => {
        if (node && !node.contains(e.target)) {
            handler();
        }
    }, [node]);

    React.useEffect(() => {
        document.addEventListener("click", handleClick, true);
        document.addEventListener("touchstart", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
            document.removeEventListener("touchstart", handleClick, true);
        };
    }, [handleClick]);

    return [ref];
};
