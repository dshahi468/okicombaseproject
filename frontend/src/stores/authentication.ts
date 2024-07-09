import axios from 'axios'
import { defineStore } from 'pinia'
import {
  signUp,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  signIn,
  // getCurrentUser,
  fetchAuthSession,
  signOut
} from 'aws-amplify/auth'

export const authenticationStore = defineStore('authenticationStore', () => {
  const graphQlRegister = async (data: GraphQlSignupParameters) => {
    try {
      const response = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            name: data.name,
            email: data.email
          },
          autoSignIn: false
        }
      })
      return {
        userId: response.userId,
        email: data.email
      }
    } catch (error) {
      throw new Error('Error while registering.')
    }
  }

  const graphQlVerify = async (verifyData: EmailVerificationParameters) => {
    try {
      await confirmSignUp({
        username: verifyData.email,
        confirmationCode: verifyData.verificationPin.toString()
      })
      return true
    } catch (error) {
      throw new Error('Error while verifying.')
    }
  }

  const graphQlResendPin = async (email: string) => {
    try {
      await resendSignUpCode({ username: email })
      return true
    } catch (error) {
      throw new Error('Error while resending verification code.')
    }
  }

  const graphQlForgotPassword = async (email: string) => {
    try {
      await resetPassword({ username: email })
      return true
    } catch (error) {
      throw new Error('Error while getting forgot password.')
    }
  }

  const graphQlResetPassword = async (data: NewPasswordParameters) => {
    try {
      confirmResetPassword({
        username: data.email,
        confirmationCode: data.code.toString(),
        newPassword: data.password
      })
      return true
    } catch (error) {
      throw new Error('Error while resetting password.')
    }
  }

  const graphQlLogin = async (data: LoginParameters) => {
    console.log('I am being triggered.', data)
    try {
      await signIn({ username: data.email, password: data.password })
      const response2 = await fetchAuthSession()
      return {
        tokenInfo: {
          token: response2.tokens?.accessToken
        },
        userInfo: response2.tokens?.idToken?.payload
      }
    } catch (error) {
      console.log('Error is what:', error)
      throw new Error('Error while signing in.')
    }
  }

  const graphQlSignout = async () => {
    try {
      await signOut()
    } catch (error) {
      throw new Error('Error while signout.')
    }
  }

  const login = async (loginData: LoginParameters): Promise<loginResponse> => {
    const formData = new FormData()
    Object.entries(loginData).forEach(([key, value]) => {
      formData.set(key, value as string)
    })
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

  const register = async (registerData: GraphQlSignupParameters) => {
    const formData = new FormData()
    Object.entries(registerData).forEach(([key, value]) => {
      formData.set(key, value as string)
    })
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

  const emailverify = async (verifyData: EmailVerificationParameters) => {
    const formData = new FormData()
    Object.entries(verifyData).forEach(([key, value]) => {
      formData.set(key, value as string)
    })
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

  const resentPin = async (email: string) => {
    const formData = new FormData()
    formData.set('email', email)
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

  const forgot = async (email: string) => {
    const formData = new FormData()
    formData.set('email', email)
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

  const resetPasswords = async (resetData: NewPasswordParameters) => {
    const formData = new FormData()
    Object.entries(resetData).forEach(([key, value]) => {
      formData.set(key, value as string)
    })
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
    resetPasswords,
    graphQlRegister,
    graphQlVerify,
    graphQlResendPin,
    graphQlForgotPassword,
    graphQlResetPassword,
    graphQlLogin,
    graphQlSignout
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

export interface GraphQlSignupParameters {
  name: string
  password: string
  email: string
}

export interface EmailVerificationParameters {
  email: string
  verificationPin: string
}

export interface NewPasswordParameters {
  code: string
  email: string
  password: string
}

export interface LoginParameters {
  email: string
  password: string
  rememberMe: boolean
}
