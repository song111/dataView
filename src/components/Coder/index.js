import { UnControlled as CodeMirror } from 'react-codemirror2'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
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
        const { codeStr } = nextProps
        this.setState({ codeStr })
    }

    render() {
        const { codeStr } = this.state
        const { readOnly } = this.props
        return (
            <CodeMirror
                className="coder"
                value={codeStr}
                options={{
                    mode: { name: "javascript", json: true },
                    extraKeys: { "Ctrl": "autocomplete" },   //自动提示配置
                    theme: 'material',
                    lineNumbers: true,
                    readOnly
                }}
                onChange={(editor) => {
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