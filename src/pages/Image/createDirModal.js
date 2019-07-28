import React, { PureComponent } from 'react'
import { Form,Modal,Input } from 'antd';
import PropTypes from 'prop-types'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        sm: { span: 6 }
    },
    wrapperCol: {
        sm: { span: 16 }
    },
};

class CreateDirModal extends PureComponent {
  static propTypes = {
      visible: PropTypes.bool,
      onCreateDir: PropTypes.func
  }

  constructor() {
      super()
      this.state = {
          dirName: ''
      }
  }

  handleSubmit() {
      this.props.form.validateFields((err, values) => {
          if (!err) {
              const { dirName } = values
              this.props.onCreateDir(dirName)
          }
      });
  }

  render() {
      const { getFieldDecorator } = this.props.form;
      const { dirName } = this.state
      const { visible } = this.props
      return (
          <Modal
              title="新建文件夹"
              visible={visible}
              destroyOnClose
              className="add-source-modal"
              okText="确认"
              cancelText="取消"
              onOk={() => { this.handleSubmit() }}
              onCancel={() => { this.props.onCancel() }}
          >
              <Form {...formItemLayout} >
                  <FormItem label="文件夹名称" >
                      {
                          getFieldDecorator('dirName', {
                              initialValue: dirName || '',
                              rules: [{ required: true, message: '请填写文件夹名称' }],
                          })(
                              <Input placeholder="请填写文件夹名称" />
                          )
                      }
                  </FormItem>
              </Form>
          </Modal>
      )
  }
}

CreateDirModal.defaultProps = {
    visible: false
}
export default Form.create()(CreateDirModal);