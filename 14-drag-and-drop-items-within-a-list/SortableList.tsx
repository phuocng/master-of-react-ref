import * as React from 'react';

export const SortableList = ({ children }) => {
    const clonedItems = React.useMemo(() => {
        return React.Children.map(children, (child, index) => ({
            id: index,
            content: child,
        }));
    }, [children]);

    const [items, setItems] = React.useState(clonedItems);

    const [draggingIndex, setDraggingIndex] = React.useState(-1);
    const dragNode = React.useRef();

    const handleDragStart = (e, index) => {
        const { target } = e;
        setDraggingIndex(index);

        dragNode.current = target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', target);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (dragNode.current !== e.target) {
            let newItems = [...items];
            newItems.splice(index, 0, newItems.splice(draggingIndex, 1)[0]);
            setDraggingIndex(index);
            setItems(newItems);
        }
    };

    return (
        <div>
        {
            items.map((item, index) => (
                <div
                    key={item.id}
                    draggable='true'
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                >
                    {item.content}
                </li>
            ))
        }
        </div>
    );
};
