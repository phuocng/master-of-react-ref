import * as React from 'react';

export const Slider = React.forwardRef(({ children, onActivate }, ref) => {
    const innerRef = React.useRef();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const cloneChildren = React.Children.toArray(children);

    React.useImperativeHandle(ref, () => ({
        goToPreviousItem,
        goToNextItem,
        jump,
    }));

    const jump = (index) => {
        const innerEle = innerRef.current;
        if (!innerEle) {
            return;
        }
        innerEle.animate([
            {
                transform: `translateX(${-100 * index}%)`,
            }
        ], {
            duration: 400,
            easing: 'ease-in-out',
            fill: 'forwards',
        }).addEventListener('finish', () => {
            setCurrentIndex(index);
            onActivate(index);
        });
    };

    const goToPreviousItem = () => {
        if (currentIndex > 0) {
            jump(currentIndex - 1);
        }
    };

    const goToNextItem = () => {
        const numItems = cloneChildren.length;
        if (currentIndex < numItems - 1) {
            jump(currentIndex + 1);
        }
    };

    return (
        <div className="slider">
            <div className="slider__inner" ref={innerRef}>
            {
                cloneChildren.map((children, index) => (
                    <div
                        className="slider__item"
                        key={index}
                        style={{
                            transform: `translateX(${100 * index}%)`,
                        }}
                    >
                        {children}
                    </div>
                ))
            }
            </div>
        </div>
    );
});
