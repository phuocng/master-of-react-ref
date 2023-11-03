import * as React from 'react';

export const Uploader = React.forwardRef((props, ref) => {
    const inputRef = React.useRef();

    const handleClick = () => {
        const inputEle = inputRef.current;
        if (inputEle) {
            inputEle.click();
        }
    };

    const handleFileChange = (e) => {
        // Handle the selected file `e.target.files` ...
    };

    return (
        <div className="uploader">
            <button
                className="uploader__button"
                ref={ref}
                onClick={handleClick}
            >
                Choose a file
            </button>
            <input
                className="uploader__input"
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
        </div>
    );
});
