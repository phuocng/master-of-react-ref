import * as React from 'react';

export const Masonry = ({ children, numColumns, gap }) => {
    const resizeCallback = (entries) => {
        entries.forEach((entry) => {
            const itemEle = entry.target;
            const innerEle = itemEle.firstElementChild;

            const itemHeight = innerEle.getBoundingClientRect().height;
            const gridSpan = Math.ceil((itemHeight + gap) / gap);

            innerEle.style.height = `${gridSpan * gap - gap}px`
            itemEle.style.gridRowEnd = `span ${gridSpan}`;
        });
    };

    const resizeObserver = new ResizeObserver(resizeCallback);

    const trackItemSize = (ele) => {
        resizeObserver.observe(ele);
    };

    React.useEffect(() => {
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            style={{
                display: 'grid',
                gridGap: `${gap}px`,
                gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
            }}
        >
            {
                React.Children.toArray(children).map((child, index) => (
                    <div
                        key={index}
                        ref={(ele) => trackItemSize(ele)}
                    >
                        {child}
                    </div>
                ))
            }
        </div>
    );
};
