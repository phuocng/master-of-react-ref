import * as React from 'react';
import { useInView } from './useInView';

export default App = () => {
    const initialProducts = Array(20).fill(0).map((_, index) => ({
        name: `${index + 1}`,
    }));
    const [isFetching, setIsFetching] = React.useState(false);
    const [products, setProducts] = React.useState(initialProducts);

    const bottomRef = React.useRef();

    const fetchMoreData = () => {
        const fetched = Array(20).fill(0).map((_, index) => ({
            name: `${products.length + index + 1}`,
        }));
        setIsFetching(false);
        setProducts(products.concat(fetched));
    };

    const handleReachBottom = () => {
        setIsFetching(true);
        setTimeout(fetchMoreData, 2000);
    };

    useInView(bottomRef, handleReachBottom);

    return (
        <>
            <div className="grid">
            {
                products.map((product, index) => (
                    <Card key={index}>
                        {product.name}
                    </Card>
                ))
            }
            </div>
            <div ref={bottomRef} />
            {isFetching && (
                <div className="loading">
                    <div className="loading__inner">
                        Loading more data ...
                    </div>
                </div>
            )}
        </>
    );
};
