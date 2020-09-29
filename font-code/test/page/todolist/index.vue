<template>
  <section>
    <el-button round @click="dialogVisible = true">添加</el-button>
    <el-select v-model="selectStatus" style="margin-left: 16px;" @change="searchStatus">
      <el-option label="全部" :value="-1"></el-option>
      <el-option label="待办" :value="1"></el-option>
      <el-option label="完成" :value="2"></el-option>
      <el-option label="删除" :value="3"></el-option>
    </el-select>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="deadline" label="截止日期" width="180"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status">{{statusOps[scope.row.status]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <section>
            <el-button @click="editClick(scope.row)">编辑</el-button>
            <span  v-for="(value, key) in statusOps" :key="key">
              <el-button style="margin-left: 4px;"
              @click="changeStatusClick(scope.row, key)" 
              v-show="scope.row.status!== Number(key)"
              :type="key === '3' ? 'danger' : (key === '2' ? 'success' : '')" :plain="key === '3' || key === '2'">
                {{value}}
              </el-button>
            </span>
          </section>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: center; margin-top: 16px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>
    <dialog-component v-model="dialogVisible" :detail="dialogDetail" @updateList="updateList"></dialog-component>
  </section>
</template>
<script>
import {getPageData, changeStatus} from './api'
import dialogComponent from './dialogComponent'
export default {
  name: 'todolist',
  components: {dialogComponent},
  mounted () {
    this.getPageData()
  },
  data () {
    return {
      selectStatus: -1,
      tableData: [],
      dialogVisible: false,
      pageNo: 1,
      pageSize: 20,
      pageTotal: 0,
      dialogDetail: {},
      statusOps: {
        1: '待办',
        2: '完成',
        3: '删除'
      }
    }
  },
  methods: {
    addClick () {
      this.dialogVisible = true
      this.dialogDetail = {}
    },
    editClick (row) {
      this.dialogVisible = true
      this.dialogDetail = row
    },
    changeStatusClick (row, key) {
      changeStatus({
        id: row.id,
        status: key
      }).then(() => {
        this.$message.success('修改状态成功')
        this.getPageData()
      })
    },
    searchStatus () {
      this.getPageData()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getPageData()
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.getPageData()
    },
    async getPageData () {
      let params = {
        status: this.selectStatus,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      let {list} = await getPageData(params)
      this.tableData = list.rows || []
      this.pageTotal = list.count || 0
    },
    updateList () {
      this.getPageData()
    }
  }
}
</script>