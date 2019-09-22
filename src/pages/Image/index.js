import React, { Component, Fragment } from 'react';
import { observer, inject } from "mobx-react"
import { toJS } from 'mobx'
import { Table, Button, Upload, message, Spin } from 'antd';
import { dateFormat } from 'src/utils'
import dirImg from 'src/assets/images/dir.png'
import picImg from 'src/assets/images/pic.png'
import Navigation from './navigation'
import imagesApi from "src/api/images"
import CreateDirModal from './createDirModal'
import "./index.scss"

@inject("imagesStore")
@observer
class Image extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        const { pathName } = this.props.imagesStore
        this.props.imagesStore.setPathName(pathName)
    }

    // 点击文件
    handleClick(fileType, pathName) {
        if (fileType === 'dir') {
            this.props.imagesStore.setPathName(pathName)
        }
    }

    // 切换目录
    handleNavChange(pathName) {
        this.props.imagesStore.setPathName(pathName)
    }

    // 创建目录
    handleCreateDir(dirName) {
        const { pathName } = this.props.imagesStore
        this.props.imagesStore.createDir({ pathName, dirName })
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
                            <Button type="primary" onClick={() => { this.handleRemove(data.fileType,data.pathName) }}> 删除</Button>
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

    handleRemove(type,pathName) {
        if (type==='dir') {
            this.props.imagesStore.removeDir(pathName)
        } else {
            this.props.imagesStore.removeFile(pathName)
        }
    }

    render() {
        const { imagesData, dataLoading, pathName, uploadLoading, createDirModalVisible } = this.props.imagesStore
        return (
            <div className="image">
                <Spin tip="图片上传中..." spinning={uploadLoading}>
                    <div className="image-options clearfix">
                        <div className="option-buttons fl">
                            <Upload
                                multiple={true}
                                showUploadList={false}
                                action={imagesApi.updateExcelUrl}
                                data={{ pathName }}
                                accept=".png,.jpg,.jpeg,.gif"
                                beforeUpload={(file) => {
                                    if (file.size > 1024 * 1024 * 2) {  // 超过2mb禁止上传
                                        message.error('上传文件大小超过限制，请重新上传！');
                                        return false;
                                    }
                                }}
                                onChange={(data) => {
                                    this.props.imagesStore.uploadFile(data)
                                }}
                            >
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
                                icon="plus"
                                onClick={() => { this.props.imagesStore.setCreateDirModalVisible(true) }}
                            >
                                新建文件夹
                            </Button>
                        </div>
                    </div>
                    <Navigation path={pathName} onChange={this.handleNavChange.bind(this)} />
                    <Table
                        loading={dataLoading}
                        rowSelection={this.rowSelection}
                        columns={this.createColumns()}
                        pagination={false}
                        dataSource={toJS(imagesData)} />
                </Spin>
                <CreateDirModal
                    visible={createDirModalVisible}
                    onCreateDir={this.handleCreateDir.bind(this)}
                    onCancel={() => { this.props.imagesStore.setCreateDirModalVisible(false) }}
                />
            </div>
        )
    }
}

export default Image 