import axios from 'axios'
import { alertStore } from '@/stores/alert'
import { ErrorHelper } from '@/components/helper/ErrorHelper'

axios.defaults.withCredentials = true
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://server-name/'
    : import.meta.env.VITE_APPLICATION_BACKEND === 'laravel'
      ? 'http://localhost:8000/api/'
      : 'https://hivf719bw2.execute-api.us-east-1.amazonaws.com/dev/'
// 'https://24ceqhz8wd.execute-api.ap-northeast-1.amazonaws.com/dev/'
// 'https://hivf719bw2.execute-api.us-east-1.amazonaws.com/dev/'
// 'https://hivf719bw2.execute-api.us-east-1.amazonaws.com/dev/'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Accept'] = 'application/json'
const accessToken = localStorage.getItem('accessToken')
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        alertStore().updateAlerts({
          title: ErrorHelper.axios.alert,
          type: 'danger',
          message: ErrorHelper.axios.sessionExpired
        })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userinfo')
        window.location.href = '/user/login'
        break
      case 400:
        alertStore().updateAlerts({
          title: ErrorHelper.axios.alert,
          type: 'danger',
          message: error.response.data.error
        })
        break
      case 422:
        alertStore().obtainErrorMessage(error)
        break
      case 403:
        alertStore().updateAlerts({
          title: ErrorHelper.axios.alert,
          type: 'danger',
          message: ErrorHelper.axios.permissionIssue
        })
        break
      default:
        alertStore().updateAlerts({
          title: ErrorHelper.axios.alert,
          type: 'danger',
          message: ErrorHelper.axios.internalIssue
        })
        break
    }
  }
)
