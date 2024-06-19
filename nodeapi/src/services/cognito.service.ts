import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ResendConfirmationCodeCommand,
  AuthFlowType
} from '@aws-sdk/client-cognito-identity-provider'
import crypto from 'crypto'

class Cognitoservice {
  private config = {
    region: 'us-east-1'
  }

  private secretHash: string = '9gzEhbzCkghN6l8zNnjipEQrD4iqPydRy'
  private clientId: string = '6fni5s2lnsj5ubsq0mgi4qgcjm'
  private accessId: string = 'AKIAXQ22ZELNS5C6BYU2'
  private cognitoIdentity: CognitoIdentityProviderClient

  constructor() {
    this.cognitoIdentity = new CognitoIdentityProviderClient(this.config)
  }

  public async signUpUser(email: string, password: string, userAttr: Array<any>) {
    return new Promise(async (resolve, reject) => {
      const params = {
        ClientId: this.clientId,
        Password: password,
        Username: email,
        //   SecretHash: this.generateHash(email),
        UserAttributes: userAttr
      }

      try {
        const command = new SignUpCommand(params)
        const data = await this.cognitoIdentity.send(command)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  public async verifyUser(email: string, code: string) {
    const params = {
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code
    }

    try {
      const command = new ConfirmSignUpCommand(params)
      const data = await this.cognitoIdentity.send(command)
      return data
    } catch (error) {
      throw error
    }
  }

  public async resendConfirmationCode(email: string) {
    const params = {
      ClientId: this.clientId,
      Username: email
    }

    try {
      const command = new ResendConfirmationCodeCommand(params)
      const data = await this.cognitoIdentity.send(command)
      return data
    } catch (error) {
      throw error
    }
  }

  public async signInUser(email: string, password: string) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH' as AuthFlowType, // Use the specific type for AuthFlow
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    }

    try {
      const command = new InitiateAuthCommand(params)
      const data = await this.cognitoIdentity.send(command)
      return data
    } catch (error) {
      throw error
    }
  }

  public async forgotPassword(email: string) {
    const params = {
      ClientId: this.clientId,
      Username: email
    }

    try {
      const command = new ForgotPasswordCommand(params)
      const data = await this.cognitoIdentity.send(command)
      return data
    } catch (error) {
      throw error
    }
  }

  public async confirmForgotPassword(email: string, code: string, newPassword: string) {
    const params = {
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword
    }

    try {
      const command = new ConfirmForgotPasswordCommand(params)
      const data = await this.cognitoIdentity.send(command)
      return data
    } catch (error) {
      throw error
    }
  }

  //   private generateHash(username: string): string {
  //     return crypto
  //       .createHmac('SHA256', this.secretHash)
  //       .update(username + this.clientId)
  //       .digest('base64')
  //   }
}

export default Cognitoservice
