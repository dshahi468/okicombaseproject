import { ErrorHelper } from '@/components/helper/ErrorHelper'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Alerts {
  title: string
  type: string
  message: string
}

export const alertStore = defineStore('alert', () => {
  const alertsList = ref<Alerts[]>([])

  const obtainErrorMessage = (error: any) => {
    Object.keys(error.response.data.errors).forEach((key) => {
      let errorMessage = ''
      error.response.data.errors[key].forEach((message: string) => {
        errorMessage += `${message}\n`
      })
      updateAlerts({
        title: ErrorHelper.axios.alert,
        type: 'danger',
        message: errorMessage
      })
    })
  }

  const updateAlerts = (errorAlert: Alerts) => {
    alertsList.value.push(errorAlert)
    setTimeout(() => popAlertFromArray(), 5000)
  }

  const popAlertFromArray = () => {
    if (alertsList.value.length > 0) {
      alertsList.value.shift()
    }
  }

  return {
    alertsList,
    updateAlerts,
    obtainErrorMessage
  }
})
