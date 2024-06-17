import axios from 'axios'
import { defineStore } from 'pinia'

export const authenticationStore = defineStore('authenticationStore', () => {
  const login = async (formData: FormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post('login', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.status == 200) {
            console.log('Response from api:', response.data)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return {
    login
  }
})
