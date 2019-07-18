import { observable, action, runInAction } from "mobx";
import { to } from 'src/utils'
import sourceApi from "src/api/source"

class Source {
  @observable dataLoading = false
  @observable isDrawerVisible = false
  @observable sourceData = []
  @observable queryParams = {
      searchkey: "",
      pageNum: 1,
      pageSize: 10
  }


  @action
  setDrawerVisible(bool) {
      this.isDrawerVisible = bool
  }

  @action
  async querySources() {
      this.dataLoading = true
      const [err, result] = await to(sourceApi.querySources(this.queryParams))
      runInAction(() => {
          this.dataLoading = false;
          if (err || result.err) { return }
          if (result.data.success && result.data.data.length) {
              this.sourceData = result.data.data
          }
      })
  }

  @action
  async deleteSourceById(id){
      const [err, result] = await to(sourceApi.deleteSourceById(id))
      runInAction(() => {
          if (err || result.err) { return }
          if (result.data.success ) {
              this.querySources() 
          }
      })
  }
}

export default Source;