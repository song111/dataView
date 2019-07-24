import { Controlled as CodeMirror } from 'react-codemirror2'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import './index.scss'


class Coder extends PureComponent {
    static propTypes = {
        codeStr: PropTypes.string,
        readOnly: PropTypes.bool,
        onChange: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            codeStr: '{}'
        }
    }

    componentDidMount() {
        const { codeStr } = this.props
        this.setState({ codeStr })
    }

    componentWillReceiveProps(nextProps) {
        const { codeStr, readOnly } = nextProps
        if (readOnly) {
            this.setState({ codeStr })
        }
    }

    render() {
        const { readOnly } = this.props
        return (
            <CodeMirror
                className="coder"
                value={this.state.codeStr}
                options={{
                    mode: { name: "javascript", json: true },
                    theme: 'material',
                    lineNumbers: true,
                    readOnly
                }}
                onBeforeChange={(editor, data, value) => {
                    this.setState({ codeStr: value });
                }}
                onChange={(editor, data, value) => {
                    this.props.onChange(editor.getValue())
                }}
            />
        )
    }
}

Coder.defaultProps = {
    codeStr: '{}',
    readOnly: false,
    onChange: () => { }
}

export default Coder;