import { UnControlled as CodeMirror } from 'react-codemirror2'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css'
import 'codemirror/theme/paraiso-dark.css'


class Coder extends PureComponent {
    static propTypes = {
        codeStr: PropTypes.string
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
        return (
            <div className="coder">
                <CodeMirror
                    value={codeStr}
                    options={{
                        mode: { name: "javascript", json: true },
                        theme: 'paraiso-dark',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => { }}
                />
            </div>
        )
    }
}

Coder.defaultProps = {
    codeStr: '{}'
}

export default Coder;