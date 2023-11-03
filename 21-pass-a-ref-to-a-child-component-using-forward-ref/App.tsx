import * as React from 'react';
import { Uploader } from './Uploader';
import './styles.css';

export default App = () => {
    const uploaderRef = React.useRef();

    const handleClickContainer = () => {
        const uploadBtn = uploaderRef.current;
        if (uploadBtn) {
            uploadBtn.click();
        }
    };

    return (
        <div className="container" onClick={handleClickContainer}>
            <svg className="container__icon" height="24" width="24" viewBox="-0.5 -0.5 24 24">
                <path d="M15.620833333333335 15.228875h2.3s4.120833333333334 -0.537625 4.120833333333334 -4.583708333333334a4.5741249999999996 4.5741249999999996 0 0 0 -4.748541666666667 -4.5741249999999996A6.406458333333333 6.406458333333333 0 0 0 5.102166666666666 8.427583333333335 3.4365833333333335 3.4365833333333335 0 0 0 0.9583333333333334 11.787500000000001c0 3.493125 3.6665833333333335 3.4385000000000003 3.6665833333333335 3.4385000000000003h2.7437083333333336" />
                <path d="m11.5 9.958041666666666 0 10.541666666666668" />
                <path d="m14.375 12.833041666666666 -2.875 -2.875 -2.875 2.875" />
            </svg>
            <div className="container__uploader">
                <Uploader ref={uploaderRef} />
            </div>
        </div>
    );
};
