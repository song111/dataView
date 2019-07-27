import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
import { toJS } from 'mobx'
import { withRouter } from "react-router";
import { Table, Drawer, Modal, Input, Button, Icon } from 'antd';
import PropTypes from 'prop-types'
import { parseUrl } from 'src/utils'
import "./index.scss"
import dirImg from 'src/assets/images/dir.png'
import picImg from 'src/assets/images/pic.png'
import DirList from './dirList'

@inject("imagesStore")
@observer
class Image extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor() {
        super()
        this.state = {
            pathList: ['images']
        }
    }

    componentDidMount() {
        const { pathname, search } = this.props.location
        console.log(pathname, search)
        this.props.imagesStore.queryImages()
    }

    handleClick(fileType, pathName) {

        if (fileType === 'dir') {
            this.props.imagesStore.queryImages(pathName)
        }
    }

    createColumns() {
        return [
            {
                title: "文件名",
                dataIndex: "fileName",
                render: (text, record) => {
                    return (
                        <div className="image-file" onClick={() => { this.handleClick(record.fileType, record.pathName) }} >
                            <img className="image-file-icon" src={record.fileType === 'img' ? picImg : dirImg} />
                            <span className="image-file-name" >{record.fileName}</span>
                        </div>
                    )
                }
            }, {
                title: "大小",
                dataIndex: "size",
                width: 250
            }, {
                title: "创建时间",
                dataIndex: "createTime",
                width: 250,
                render: (text) => { return text }
            },
            {
                title: "修改时间",
                dataIndex: "modifyTime",
                width: 250,
                render: (text) => { return text }
            }
        ]
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    render() {
        const { imagesData, dataLoading } = this.props.imagesStore
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
                <DirList />
                <Table
                    loading={dataLoading}
                    rowSelection={this.rowSelection}
                    columns={this.createColumns()}
                    pagination={false}
                    dataSource={toJS(imagesData)} />
            </div>
        )
    }
}

export default withRouter(Image) 