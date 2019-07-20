import { UnControlled as CodeMirror } from 'react-codemirror2'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css'
import 'codemirror/theme/paraiso-dark.css'


class Coder extends PureComponent {
    static propTypes={
        codeStr:PropTypes.string
    }
    constructor(){
        super()
    }
    render() {
        return (
            <div className="coder">
                <CodeMirror
                    value={'{name:"小红"}'}
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

Coder.default      

export default Coder;