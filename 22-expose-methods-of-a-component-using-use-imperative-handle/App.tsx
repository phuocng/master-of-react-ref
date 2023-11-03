import * as React from 'react';
import { Slider } from './Slider';
import './styles.css';

export default App = () => {
    const numItems = 5;

    const sliderRef = React.useRef();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleClickPreviousButton = () => {
        const slider = sliderRef.current;
        if (slider) {
            slider.goToPreviousItem();
        }
    };

    const handleClickNextButton = () => {
        const slider = sliderRef.current;
        if (slider) {
            slider.goToNextItem();
        }
    };

    const handleClickDot = (index) => {
        const slider = sliderRef.current;
        if (slider) {
            slider.jump(index);
        }
    };

    return (
        <div className="container">
            <Slider onActivate={setCurrentIndex} ref={sliderRef}>
            {
                Array(numItems).fill(0).map((_, index) => (
                    <div key={index}>
                        {index + 1}
                    </div>
                ))
            }
            </Slider>
            <div className="container__navigation">
            {
                Array(numItems).fill(0).map((_, index) => (
                    <div
                        className={`container__dot ${index === currentIndex ? 'container__dot--active' : ''}`}
                        key={index}
                        onClick={() => handleClickDot(index)}
                    />
                ))
            }
            </div>
            <div className="container__prev" onClick={handleClickPreviousButton}></div>
            <div className="container__next" onClick={handleClickNextButton}></div>
        </div>
    );
};
