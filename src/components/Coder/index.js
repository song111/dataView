import { UnControlled as CodeMirror } from 'react-codemirror2'
import React, { PureComponent } from 'react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'

class Coder extends PureComponent {

    render() {
        return (
            <div className="coder">
                <CodeMirror
                    value={'{name:"小红"}'}
                    options={{
                        mode: 'xml',
                        theme: 'material',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => { }}
                />
            </div>
        )
    }
}

export default Coder;