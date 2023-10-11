import * as React from 'react';

class Collapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        };
        this.bodyRef = React.createRef();
        this.contentRef = React.createRef();
        this.handleToggle = this.handleToggle.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    componentDidMount() {
        const bodyEle = this.bodyRef.current;
        bodyEle.style.height = `${bodyEle.clientHeight}px`;
    }

    handleToggle() {
        const { isOpened } = this.state;
        const bodyEle = this.bodyRef.current;
        const contentEle = this.contentRef.current;

        if (!isOpened) {
            bodyEle.classList.remove('truncate');
            bodyEle.style.height = `${contentEle.scrollHeight}px`;
        } else {
            contentEle.classList.add('truncate');
            const newHeight = contentEle.clientHeight;
            contentEle.classList.remove('truncate');
            bodyEle.classList.add('item__body--fading');
            bodyEle.style.height = `${newHeight}px`;
        }
    }

    handleTransitionEnd() {
        this.setState((prevState) => ({
            isOpened: !prevState.isOpened,
        }));
    }

    render() {
        const { isOpened } = this.state;

        return (
            <div>
                <div
                    className={`item__body ${isOpened ? '' : 'truncate item__body--fading'}`}
                    ref={this.bodyRef}
                    onTransitionEnd={this.handleTransitionEnd}
                >
                    <div ref={this.contentRef}>
                        {this.props.children}
                    </div>
                </div>
                <button
                    className="item__toggle"
                    onClick={this.handleToggle}
                >
                    {isOpened ? 'Less' : 'More'}
                </button>
            </div>
        );
    }
}
