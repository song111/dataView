import { observable, action, runInAction, toJS } from "mobx";
import { to } from 'src/utils'
import imagesApi from "src/api/images"
import { message } from 'antd'
import _ from 'lodash'

class Images {
  @observable dataLoading = false
  @observable imagesData = []


  @action
  async queryImages(pathName = '') {
      this.dataLoading = true
      let [err, res] = await to(imagesApi.qyeryImages(pathName))
      runInAction(() => {
          this.dataLoading = false
          if (err) { message.error('目录获取失败！'); return }
          this.imagesData = res.data.data
      })
  }

}
export default Images;