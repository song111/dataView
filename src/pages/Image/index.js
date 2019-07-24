import React, { Component } from 'react';
import { Table, Drawer, Modal, Input, Button, Icon } from 'antd';
import "./index.scss"

class Image extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    createColumns() {
        return [
            {
                title: "文件名",
                dataIndex: "fileName"
            }, {
                title: "大小",
                dataIndex: "size",
                width: 250
            }, {
                title: "修改日期",
                dataIndex: "updateDate",
                width: 250,
                render: (text) => { return text }
            }
        ]
    }


    render() {
        return (
            <div className="image">
                <div className="options clearfix">
                    <div className="option-buttons fl">
                        <Button
                            type="primary"
                            icon="upload">
                            上传图片
                        </Button>
                    </div>
                    <div className="option-buttons fl">
                        <Button
                            type="default"
                            icon="plus">
                            新建文件夹
                        </Button>
                    </div>
                </div>
                <Table
                    loading={false}
                    columns={this.createColumns()}
                    dataSource={[]} />
            </div>
        )
    }
}

export default Image