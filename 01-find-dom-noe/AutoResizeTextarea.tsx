import * as React from 'react';
import * as ReactDOM from 'react-dom';

class AutoResizeTextarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue,
        }
        this.handleInput = this.handleInput.bind(this);
    }

    parseValue(v) {
        return v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0;
    }

    fit() {
        const textarea = ReactDOM.findDOMNode(this);
        textarea.style.height = 'auto';
        const styles = window.getComputedStyle(textarea);

        const borderTopWidth = this.parseValue(styles.borderTopWidth);
        const borderBottomWidth = this.parseValue(styles.borderBottomWidth);

        textarea.style.height = `${textarea.scrollHeight + borderTopWidth + borderBottomWidth}px`;
    }

    handleInput(e) {
        this.setState({
            value: e.target.value,
        });
        this.fit();
    }

    componentDidMount() {
        this.fit();
    }

    render() {
        return (
            <textarea
                className="textarea"
                value={this.state.value}
                onInput={this.handleInput}
            ></textarea>
        );
    }
}
