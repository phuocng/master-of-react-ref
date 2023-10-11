import * as React from 'react';

export class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.overlayEle = null;
        this.contentEle = null;
        this.state = {
            isOpened: false,
        };
        this.handleClickOverlay = this.handleClickOverlay.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    handleClickOverlay(e) {
        if (this.contentEle && !this.contentEle.contains(e.target)) {
            this.close();
        }
    }

    close() {
        this.setState({ isOpened: false });
    }

    open() {
        this.setState({ isOpened: true });
    }

    render() {
        const { isOpened } = this.state;
        return isOpened && (
            <div
                className="modal__overlay"
                ref={(ele) => this.overlayEle = ele}
                onClick={this.handleClickOverlay}
            >
                <div
                    className="modal__content"
                    ref={(ele) => this.contentEle = ele}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}
