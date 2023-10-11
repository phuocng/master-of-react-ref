import * as React from 'react';
import { Masonry } from './Masonry';

export default App = () => {
    const randomInteger = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    const items = Array(20).fill(0).map((_, i) => ({
        index: i,
        height: 10 * randomInteger(10, 20),
    }));

    return (
        <Masonry gap={8} numColumns={3}>
        {
            items.map((item) => (
                <div
                    className="item"
                    key={item.index}
                    style={{
                        height: `${item.height}px`,
                    }}
                >
                    {item.index + 1}
                </div>
            ))
        }
        </Masonry>
    );
};
