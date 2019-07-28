import React, { PureComponent } from 'react'
import { Modal, Input, Form } from "antd"
import PropTypes from 'prop-types'

const FormItem = Form.Item
const TextArea = Input.TextArea
const formItemLayout = {
    labelCol: {
        sm: { span: 4 }
    },
    wrapperCol: {
        sm: { span: 18 }
    },
};

class AddSourceModal extends PureComponent {
    static propTypes = {
        visible: PropTypes.bool,
        onAddSource: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            sourceData: {
                name: '',
                description: ''
            }
        }
    }

    handleSubmit() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAddSource(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.props
        const { name, description } = this.state
        return (
            <Modal
                title="新建数据源"
                visible={visible}
                destroyOnClose
                className="create-dir-modal"
                okText="确认"
                cancelText="取消"
                onOk={() => { this.handleSubmit() }}
                onCancel={() => { this.props.onCancel() }}
            >
                <Form {...formItemLayout} >
                    <FormItem label="名称" >
                        {
                            getFieldDecorator('name', {
                                initialValue: name || '',
                                rules: [{ required: true, message: '请填写名称' }],
                            })(
                                <Input placeholder="请填写名称" />
                            )
                        }

                    </FormItem>
                    <FormItem label="描述" >
                        {
                            getFieldDecorator('description', {
                                initialValue: description || '',
                                rules: [{ required: true, message: '请填写名称' }],
                            })(
                                <TextArea
                                    placeholder="请填写描述"
                                    autosize={{ minRows: 4, maxRows: 6 }}
                                />
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

AddSourceModal.defaultProps = {
    visible: false
}
export default Form.create()(AddSourceModal) 