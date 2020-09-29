<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="500px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="截止时间" prop="deadline">
        <el-date-picker type="date" v-model="form.deadline" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status" v-show="detail.id">
        <el-select v-model="form.status" style="width: 100%;">
          <el-option label="待办" :value="1"></el-option>
          <el-option label="完成" :value="2"></el-option>
          <el-option label="删除" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveClick">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {createApi, updateApi} from './api'
import moment from 'moment'
export default {
  name: 'dialogComponent',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    value (n) {
      if (n) {
        this.$refs.form && this.$refs.form.resetFields()
      }
      this.dialogVisible = n
    },
    dialogVisible (n) {
      this.$emit('input', n)
    },
    detail: {
      handler (n) {
        if (n.id) {
          this.dialogTitle = '编辑'
          this.form = {
            ...this.form,
            ...n
          }
        } else {
          this.dialogTitle = '添加'
        }
      }
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogTitle: '添加',
      form: {
        name: '',
        deadline: '',
        status: 1,
        content: ''
      },
      rules: {
        name: [{required: true, message: '此项为必填项'}],
        deadline: [{required: true, message: '此项为必填项'}],
        content: [{required: true, message: '此项为必填项'}]
      }
    }
  },
  methods: {
    saveClick () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.deadline = moment(this.form.deadline).format('YYYY-MM-DD')
          if (this.detail.id) {
            updateApi(this.form).then(() => {
              this.$message.success('编辑成功')
            })
          } else {
            createApi(this.form).then(() => {
              this.$message.success('保存成功')
            })
          }
          this.dialogVisible = false
          this.$emit('updateList')
        }
      })
    }
  }
}
</script>