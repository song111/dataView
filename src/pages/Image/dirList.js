import React, { PureComponent } from 'react';
import { Breadcrumb, Icon } from 'antd';

class DirList extends PureComponent {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="images-dir-list">
                <Breadcrumb>
                    <Breadcrumb.Item >
                        <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Icon type="user" />
                        <span>Application List</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Application</Breadcrumb.Item>
                </Breadcrumb>
            </div>

        )
    }

}

export default DirList