import axios from 'axios'
import { defineStore } from 'pinia'

export const authenticationStore = defineStore('authenticationStore', () => {
  const login = async (formData: FormData): Promise<loginResponse> => {
    return new Promise((resolve, reject) => {
      axios
        .post('login', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const register = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post('register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const emailverify = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post('verify-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const resentPin = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post('resend-confirmation-pin', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const forgot = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post('forgot-password', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const resetPassword = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post('confirm-password', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            resolve(response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return {
    login,
    register,
    emailverify,
    resentPin,
    forgot,
    resetPassword
  }
})

interface TokenInfo {
  created_at: string
  expires_at: string
  token: string
  tokenable_type: string
}

interface UserInfo {
  id: string
  name: string
  email: string
}
export interface loginResponse {
  message: string
  tokenInfo: TokenInfo
  userInfo: UserInfo
}
