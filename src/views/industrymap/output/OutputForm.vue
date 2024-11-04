<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="矿种" prop="mineralType">
        <el-input v-model="formData.mineralType" placeholder="请输入矿种" />
      </el-form-item>
      <el-form-item label="年份" prop="yearDesc">
        <el-input v-model="formData.yearDesc" placeholder="请输入年份" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="formData.unit" placeholder="请输入单位" />
      </el-form-item>
      <el-form-item label="数据类型" prop="dataType">
        <el-input v-model="formData.dataType" placeholder="请输入数据类型" />
      </el-form-item>
      <el-form-item label="工艺环节" prop="procedureDesc">
        <el-input v-model="formData.procedureDesc" placeholder="请输入工艺环节" />
      </el-form-item>
      <el-form-item label="国家/地区" prop="countryState">
        <el-input v-model="formData.countryState" placeholder="请输入国家/地区" />
      </el-form-item>
      <el-form-item label="产量" prop="outputVal">
        <el-input v-model="formData.outputVal" placeholder="请输入产量" />
      </el-form-item>
      <el-form-item label="重点企业" prop="company">
        <el-input v-model="formData.company" placeholder="请输入重点企业" />
      </el-form-item>
      <el-form-item label="重点企业产量" prop="outputValCompany">
        <el-input v-model="formData.outputValCompany" placeholder="请输入重点企业产量" />
      </el-form-item>
      <el-form-item label="产量总量" prop="outputValTotal">
        <el-input v-model="formData.outputValTotal" placeholder="请输入产量总量" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { OutputApi, OutputVO } from '@/api/industrymap/output'

/** 产量分布 表单 */
defineOptions({ name: 'OutputForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  mineralType: undefined,
  yearDesc: undefined,
  unit: undefined,
  dataType: undefined,
  procedureDesc: undefined,
  countryState: undefined,
  outputVal: undefined,
  company: undefined,
  outputValCompany: undefined,
  outputValTotal: undefined,
})
const formRules = reactive({
  mineralType: [{ required: true, message: '矿种不能为空', trigger: 'blur' }],
  yearDesc: [{ required: true, message: '年份不能为空', trigger: 'blur' }],
  unit: [{ required: true, message: '单位不能为空', trigger: 'blur' }],
  countryState: [{ required: true, message: '国家/地区不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OutputApi.getOutput(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as OutputVO
    if (formType.value === 'create') {
      await OutputApi.createOutput(data)
      message.success(t('common.createSuccess'))
    } else {
      await OutputApi.updateOutput(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    mineralType: undefined,
    yearDesc: undefined,
    unit: undefined,
    dataType: undefined,
    procedureDesc: undefined,
    countryState: undefined,
    outputVal: undefined,
    company: undefined,
    outputValCompany: undefined,
    outputValTotal: undefined,
  }
  formRef.value?.resetFields()
}
</script>