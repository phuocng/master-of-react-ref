import { Slider } from './Slider';

export default App = () => {
    const numItems = 5;

    return (
        <Slider>
        {
            Array(numItems).fill(0).map((_, index) => (
                <div key={index}>
                    {index + 1}
                </div>
            ))
        }
        </Slider>
    );
};
