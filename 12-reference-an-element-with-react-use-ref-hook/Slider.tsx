import * as React from 'react';
import './styles.css';

export const Slider = ({ children }) => {
    const innerRef = React.useRef();
    const navigationRef = React.useRef();
    const activeDotRef = React.useRef();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const cloneChildren = React.Children.toArray(children);

    const jump = (index) => {
        const innerEle = innerRef.current;
        const navigationEle = navigationRef.current;
        const activeDotEle = activeDotRef.current;
        if (!innerEle || !navigationEle || !activeDotEle) {
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
        });

        const dots = [...navigationEle.querySelectorAll('.slider__dot')];
        const left = dots[index].offsetLeft;
        activeDotEle.animate([
            {
                transform: `translateX(${left}px)`,
            }
        ], {
            duration: 400,
            easing: 'ease-in-out',
            fill: 'forwards',
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
            <div className="slider__navigation" ref={navigationRef}>
                {
                    cloneChildren.map((_, index) => (
                        <div
                            className="slider__dot"
                            key={index}
                            onClick={() => jump(index)}
                        />
                    ))
                }
                <div className="slider__dot--active" ref={activeDotRef} />
            </div>
            <div className="slider__prev" onClick={goToPreviousItem}></div>
            <div className="slider__next" onClick={goToNextItem}></div>
        </div>
    );
};
