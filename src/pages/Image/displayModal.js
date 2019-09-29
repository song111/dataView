import React, { Component } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types';

class DisplayModal extends Component {
  static propTypes = {
      url: PropTypes.string,
      visible: PropTypes.bool,
      onCancel: PropTypes.func
  }
  constructor() {
      super()
  }


  render() {
      const { url, visible } = this.props
      return (
          <Modal
              className="display_image_modal"
              visible={visible}
              maskClosable
              onCancel={() => {
                  this.props.onCancel()
              }}
              centered={true}
              closable={false}
              footer={null}
          >
              <div className="image_container">
                  {
                      url ? <img src={url} width={'100%'}  /> : null
                  }
              </div>

          </Modal>
      )
  }
}

export default DisplayModal