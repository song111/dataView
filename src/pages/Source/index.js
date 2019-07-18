import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { toJS } from 'mobx'
import { Table, Drawer, Modal } from 'antd';

@inject("sourceStore")
@observer
class Source extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        this.props.sourceStore.querySources()
    }

    createColumns() {
        return [
            {
                title: "数据源名称",
                dataIndex: "name",
                width: 250
            },
            {
                title: "描述",
                dataIndex: "description"
            },
            {
                title: "创建日期",
                dataIndex: "createDate",
                width: '20%',
                render: (text) => { return text }
            },
            {
                title: "变更日期",
                dataIndex: "updateDate",
                width: '20%',
                render: (text) => { return text }
            },
            {
                title: "操作",
                width: 200,
                render: (text, data) => {
                    return (
                        <div className="operate">
                            <a onClick={this.handleDelete.bind(this, data.id)} href="javascript:;">删除</a>
                            <a onClick={this.handleView.bind(this, data)} href="javascript:;">查看</a>
                        </div>
                    )
                }
            }
        ]
    }

    handleView() {
        this.props.sourceStore.setDrawerVisible(true)
    }

    handleDelete(id) {
        Modal.warning({
            title: '是否确认删除该数据源？',
            onOk: () => {
                this.props.sourceStore.deleteSourceById(id)
            }
        })
    }

    handleDrawerClose() {
        this.props.sourceStore.setDrawerVisible(false)
    }


    render() {
        const { isDrawerVisible, dataLoading, sourceData } = this.props.sourceStore
        return (
            <div >
                <Table
                    loading={dataLoading}
                    columns={this.createColumns()}
                    dataSource={toJS(sourceData)} />
                <Drawer
                    title="Multi-level drawer"
                    width={'60%'}
                    closable={true}
                    onClose={this.handleDrawerClose.bind(this)}
                    visible={isDrawerVisible}
                ></Drawer>
            </div>
        )
    }
}

export default Source