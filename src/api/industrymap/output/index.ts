import request from '@/config/axios'

// 产量分布 VO
export interface OutputVO {
  id: number // 产量分布ID
  mineralType: string // 矿种
  yearDesc: string // 年份
  unit: string // 单位
  dataType: number // 数据类型
  procedureDesc: string // 工艺环节
  countryState: string // 国家/地区
  outputVal: number // 产量
  company: string // 重点企业
  outputValCompany: number // 重点企业产量
  outputValTotal: number // 产量总量
}

// 产量分布 API
export const OutputApi = {
  // 查询产量分布分页
  getOutputPage: async (params: any) => {
    return await request.get({ url: `/industrymap/output/page`, params })
  },

  // 查询产量分布详情
  getOutput: async (id: number) => {
    return await request.get({ url: `/industrymap/output/get?id=` + id })
  },

  // 新增产量分布
  createOutput: async (data: OutputVO) => {
    return await request.post({ url: `/industrymap/output/create`, data })
  },

  // 修改产量分布
  updateOutput: async (data: OutputVO) => {
    return await request.put({ url: `/industrymap/output/update`, data })
  },

  // 删除产量分布
  deleteOutput: async (id: number) => {
    return await request.delete({ url: `/industrymap/output/delete?id=` + id })
  },

  // 导出产量分布 Excel
  exportOutput: async (params) => {
    return await request.download({ url: `/industrymap/output/export-excel`, params })
  },
}