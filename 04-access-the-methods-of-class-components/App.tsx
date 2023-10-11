import * as React from 'react';
import { Modal } from './Modal';

export default App = () => {
    let modalInstance;

    const handleClickOpenModal = () => {
        modalInstance.open();
    };

    return (
        <div>
            <button onClick={handleClickOpenModal}>
                Open the modal
            </button>
            <Modal ref={(modal) => modalInstance = modal}>
                Good lights appear gathering for don't under. Together third his multiply without multiply over herb. Us was fish from of said a abundantly void signs is fish replenish very heaven own of it stars.
            </Modal>
        </div>
    );
};
