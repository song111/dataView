import React, { PureComponent, Fragment } from "react"
import { Modal, Input, Form, Button } from "antd"
import PropTypes from 'prop-types'
import Coder from 'src/components/Coder'

const FormItem = Form.Item
const TextArea = Input.TextArea
const formItemLayout = {
    labelCol: {
        sm: { span: 2 },
    },
    wrapperCol: {
        sm: { span: 16 },
    },
};


class SourceDetail extends PureComponent {
    static propTypes = {
        source: PropTypes.object
    }
    constructor() {
        super()
        this.state = {
            isEdit: false,
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

    handleChange(key, value) {
        console.log(key, value)
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { isEdit, source } = this.state
        return (
            <div className="source-Detail">
                <Form {...formItemLayout}>
                    <FormItem label="名称" >
                        {
                            isEdit ? getFieldDecorator('name', {
                                initalValue: source.name || '',
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
                                initalValue: source.description || '',
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
                <Coder codeStr={JSON.stringify(source.content, null, 2) || '{}'} />
                <div className="source-opeate-btn">
                    {
                        isEdit ?
                            <Fragment>
                                <Button onClick={() => { this.handleCancle() }}>取消</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button type="primary">保存</Button>
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