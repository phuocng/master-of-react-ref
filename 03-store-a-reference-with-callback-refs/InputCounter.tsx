import * as React from 'react';
import './styles.css';

export const InputCounter = ({ maxCharacters }) => {
    let inputEle: HTMLInputElement | null;
    let counterEle: HTMLElement | null;

    const [value, setValue] = React.useState('');
    const [remainingChars, setRemainingChars] = React.useState(maxCharacters);

    const handleChange = () => {
        const newValue = inputEle.value;
        const remainingChars = maxCharacters - newValue.length;
        setValue(newValue);
        setRemainingChars(remainingChars);

        if (remainingChars < 1) {
            counterEle.classList.add('container__counter--warning');
        }
    };

    handleAnimationEnd = () => {
        counterEle.classList.remove('container__counter--warning');
    };

    return (
        <div className="container">
            <input
                className="container__input"
                value={value}
                ref={(ele) => inputEle = ele}
                onChange={handleChange}
            />
            <div
                className="container__counter"
                ref={(ele) => counterEle = ele}
                onAnimationEnd={handleAnimationEnd}
            >
                {remainingChars}
            </div>
        </div>
    );
};
