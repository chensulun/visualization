import request from '@/utils/request'
// 能源管理通用接口
export function getEnergyList(data) {
  return request({
    url: `https://test.zgdrkj.cn:8443/cs/api/data/getEnergyList?type=${data.type}&&phase=${data.phase}`,
    method: 'get'
  })
}

// 质量管理配比接口
export function qualityParameters(data) {
  return request({
    url: `https://test.zgdrkj.cn:8686/prod-api/push/qualityParameters/list?peId=1&qpType=0&peProductionType=` + data,
    method: 'get'
  })
}
// 天气接口
export function tianqi(data) {
  return request({
    url: `https://test.zgdrkj.cn:8443/cs/api/weather`,
    method: 'get'
  })
}
