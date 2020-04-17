import {env} from '../package.json'

// 如果package配了生产 不做代理转发 否则去setupProxy修改环境
// 结论 部署到线上 package env必须配production
// 如果是本地开发 修改setupProxy的target
const prefix = env === 'production' ? 'https://prod.com' : ''

export default {}
