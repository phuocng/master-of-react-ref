import { usePrevious } from './usePrevious';
import * as React from 'react';

export default App = () => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const previousScrollPosition = usePrevious(scrollPosition);

    const handleScroll = () => setScrollPosition(window.scrollY);

    React.useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);    

    React.useEffect(() => {
        if (previousScrollPosition < scrollPosition) {
            console.log("Scroll down");
        } else if (previousScrollPosition > scrollPosition) {
            console.log("Scroll up");
        }
    }, [scrollPosition, previousScrollPosition]);
    

    return (
        <div></div>
    );
};
