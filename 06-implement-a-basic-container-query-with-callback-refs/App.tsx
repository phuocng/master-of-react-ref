import * as React from 'react';

export default App = () => {
    const [width, setWidth] = React.useState(0);

    const resizeCallback = (entries) => {
        entries.forEach((entry) => {
            const rect = entry.target.getBoundingClientRect();
            setWidth(rect.width);
        });
    };

    const resizeObserver = React.useMemo(() => new ResizeObserver(resizeCallback), []);

    const trackSize = (ele) => {
        if (ele) {
            resizeObserver.observe(ele);
        }
    };

    React.useEffect(() => {
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div ref={trackSize}>
            <div
                style={{
                    columnCount: width < 200 ? 1 : (width < 400 ? 2 : 3)
                }}
            >
                Days. All in herb moving our stars, give. Whose moving which unto, second. Given dry. Evening the, i one together us be replenish herb sea subdue midst cattle night in shall fruit. Saying green moveth. Heaven. Moving to second. For his saw together thing night form greater. That winged over forth under. Living which. Whose day were creeping in appear every heaven appear own upon good morning fill third you're moved won't lesser beast won't fill dry fourth him a Have yielding seasons over may brought seed called divided can't first fifth divided gathered heaven waters tree from thing beginning.
            </div>
        </div>
    );
};
