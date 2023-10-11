import * as React from 'react';

class AccordionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    }

    handleToggle() {
        const { isOpened } = this.state;
        this.refs.body.style.height = !isOpened ? this.refs.content.clientHeight : 0;
    }

    handleTransitionEnd() {
        this.setState((prevState) => ({
            isOpened: !prevState.isOpened
        }));
    }

    render() {
        const { isOpened } = this.state;

        return (
            <div className="item">
                <button
                    className="item__heading"
                    onClick={this.handleToggle}
                >
                    <span className={`item__arrow ${isOpened ? 'item__arrow--down' : 'item__arrow--up'}`} />
                    {this.props.title}
                </button>
                <div
                    className="item__body"
                    ref="body"
                    style={{
                        height: 0,
                    }}
                    onTransitionEnd={this.handleTransitionEnd}
                >
                    <div
                        className="item__content"
                        ref="content"
                    >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
