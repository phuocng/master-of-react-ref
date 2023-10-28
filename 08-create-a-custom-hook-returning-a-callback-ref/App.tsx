import * as React from 'react';

export default App = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const openModal = () => setIsOpen(!isOpen);

    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openModal}>
                Open the modal
            </button>
            {isOpen && (
                <Modal onClose={closeModal}>
                    Good lights appear gathering for don't under. Together third his multiply without multiply over herb. Us was fish from of said a abundantly void signs is fish replenish very heaven own of it stars.
                </Modal>
            )}
        </div>
    );
};
