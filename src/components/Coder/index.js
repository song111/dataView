import { UnControlled as CodeMirror } from './node_modules/react-codemirror2'

import React, { PureComponent } from './node_modules/react'

class Coder extends PureComponent {

    render() {
        return (
            <div className="coder">
                <CodeMirror
                    value='<h1>I ♥ react-codemirror2</h1>'
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