import React, { Component, Fragment } from 'react';
import { observer, inject } from "mobx-react"
import { toJS } from 'mobx'
import { Table, Button, Upload } from 'antd';
import { dateFormat } from 'src/utils'
import "./index.scss"
import dirImg from 'src/assets/images/dir.png'
import picImg from 'src/assets/images/pic.png'
import Navigation from './navigation'

@inject("imagesStore")
@observer
class Image extends Component {
    static propTypes = {

    };

    constructor() {
        super()
        this.state = {
            path: '/images'
        }
    }

    componentDidMount() {
        const { path } = this.state
        this.props.imagesStore.queryImages(path)
    }


    handleClick(fileType, pathName) {
        if (fileType === 'dir') {
            this.setState({
                path: pathName
            })
            this.props.imagesStore.queryImages(pathName)
        }
    }



    handleNavChange(pathName) {
        this.setState({ path: pathName })
        this.props.imagesStore.queryImages(pathName)
    }

    createColumns() {
        return [
            {
                title: "文件名",
                dataIndex: "fileName",
                render: (text, data) => {
                    return (
                        <div className="image-file" onClick={() => { this.handleClick(data.fileType, data.pathName) }} >
                            <img className="image-file-icon" src={data.fileType === 'img' ? picImg : dirImg} />
                            <span className="image-file-name" >{data.fileName}</span>
                        </div>
                    )
                }
            }, {
                title: "大小",
                dataIndex: "size",
                width: 120,
                render: (text, data) => { return data.fileType === 'dir' ? '--' : text }
            }, {
                title: "创建时间",
                dataIndex: "createTime",
                width: 250,
                render: (time) => { return dateFormat(new Date(time), 'yyyy-MM-dd hh:mm:ss') }
            },
            {
                title: "修改时间",
                dataIndex: "modifyTime",
                width: 250,
                render: (time) => { return dateFormat(new Date(time), 'yyyy-MM-dd hh:mm:ss') }
            },
            {
                title: "操作",
                width: 200,
                render: (text, data) => {
                    return (
                        <div className="image-table-options">
                            <Button type="primary"> 删除</Button>
                            &nbsp;  &nbsp;
                            <Button type="primary"> 下载</Button>
                        </div>
                    )
                }
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
        const { path } = this.state
        const { imagesData, dataLoading } = this.props.imagesStore
        return (
            <div className="image">
                <div className="image-options clearfix">
                    <div className="option-buttons fl">
                        <Upload>
                            <Button
                                type="primary"
                                icon="upload">
                                上传图片
                            </Button>
                        </Upload>
                    </div>
                    <div className="option-buttons fl">
                        <Button
                            type="default"
                            icon="plus">
                            新建文件夹
                        </Button>
                    </div>
                </div>
                <Navigation path={path} onChange={this.handleNavChange.bind(this)} />
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

export default Image 