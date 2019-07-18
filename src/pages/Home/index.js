import React, { Component } from 'react';
import { observer, inject } from "mobx-react"

@inject("globleStore")
@observer
class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        const { background } = this.props.globleStore
        return (
            <div style={{ background }}>
                home
            </div>
        )
    }
}

export default Home