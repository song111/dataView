import React, { PureComponent, Fragment } from "react"
import { Modal, Input, Form, Button } from "antd"
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import Coder from 'src/components/Coder'
import { from } from "rxjs";

const FormItem = Form.Item
const TextArea = Input.TextArea
const formItemLayout = {
    labelCol: {
        sm: { span: 2 }
    },
    wrapperCol: {
        sm: { span: 16 }
    }
};


class SourceDetail extends PureComponent {
    static propTypes = {
        source: PropTypes.object
    }
    constructor() {
        super()
        this.state = {
            isEdit: false,
            formatError: false,
            source: {
                name: '',
                description: '',
                content: {
                    fieldMap: [],
                    data: []
                }
            }
        }
    }

    componentDidMount() {
        const { source } = this.props
        this.setState({ source })
    }

    componentWillReceiveProps(nextProps) {
        const { source } = nextProps
        this.setState({ source })
    }

    handleEdit() {
        this.setState({ isEdit: true })
    }

    handleCancle() {
        this.setState({ isEdit: false, source: this.props.source })
    }

    handleSave() {

    }

    handleChange(str) {
        const { formatError, source } = this.state
        let sourceData = Object.assign({}, source)
        try {
            value = JSON.parse(str)
            this.setState({ formatError: false, })
            if (formatError) this.setState({ formatError: false })
        } catch (e) {
            if (!formatError) this.setState({ formatError: true })
            return
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isEdit, source, formatError } = this.state
        return (
            <div className="source-Detail">
                <Form {...formItemLayout}>
                    <FormItem label="名称" >
                        {
                            isEdit ?
                                getFieldDecorator('name', {
                                    initialValue: source.name || '',
                                    rules: [{ required: true, message: '请填写名称' }],
                                })(
                                    <Input placeholder="请填写名称" />
                                ) :
                                <span>{source.name || ''}</span>
                        }
                    </FormItem>
                    <FormItem label="描述" >
                        {
                            isEdit ? getFieldDecorator('description', {
                                initialValue: source.description || '',
                                rules: [{ required: true, message: '请填写名称' }],
                            })(
                                <TextArea
                                    placeholder="请填写描述"
                                    autosize={{ minRows: 4, maxRows: 6 }}
                                />
                            ) :
                                <span>{source.description || ''}</span>
                        }
                    </FormItem>
                </Form>
                <div className="source-code">
                    <Coder
                        readOnly={isEdit ? false : true}
                        codeStr={JSON.stringify(source.content, null, 2) || '{}'}
                        onChange={(value) => { this.handleChange(value) }} />
                    {
                        formatError ? <span className="source-codeError">格式错误</span> : ''
                    }
                </div>
                <div className="source-opeate-btn">
                    {
                        isEdit ?
                            <Fragment>
                                <Button onClick={() => { this.handleCancle() }}>取消</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="primary" onClick={() => { this.handleSave() }}>保存</Button>
                            </Fragment>
                            :
                            <Button type="primary" onClick={() => { this.handleEdit() }} >编辑</Button>
                    }
                </div>
            </div>
        )
    }
}


export default Form.create()(SourceDetail);