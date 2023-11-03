import * as React from 'react';
import { usePrevious } from './usePrevious';

export const useInView = (ref, onInView) => {
    const [isInView, setIsInView] = React.useState(false);
    const wasInView = usePrevious(isInView);

    const checkInView = () => {
        const ele = ref.current;
        if (!ele) {
            return;
        }
        const rect = ele.getBoundingClientRect();
        setIsInView(
            rect.top < window.innerHeight && rect.bottom >= 0
        );
    };

    React.useEffect(() => {
        checkInView();
    }, []);

    React.useEffect(() => {
        document.addEventListener("scroll", checkInView);
        window.addEventListener("resize", checkInView);
        return () => {
            document.removeEventListener("scroll", checkInView);
            window.removeEventListener("resize", checkInView);
        };
    }, []);

    React.useEffect(() => {
        const ele = ref.current;
        if (ele && !wasInView && isInView) {
            onInView(ele);
        }
    }, [isInView, ref]);
};
