import * as React from 'react';
import { Card } from './Card';

export default App = () => {
    return (
        <div className="grid">
        {
            Array(40).fill(0).map((_, index) => (
                <Card key={index}>{index + 1}</Card>
            ))
        }
        </div>
    );
};
