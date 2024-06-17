export class ErrorHelper {
  static axios = {
    alert: 'Alert!!',
    sessionExpired: 'Your session has expired.',
    permissionIssue: 'Permission not granted.',
    internalIssue: 'Something went wrong. Try again later.',
    emailVerified: 'Your account is successfully verified.'
  }
  static login = {
    emailRequired: 'Please enter email addres.',
    emailEmail: 'Please enter valid email address.',
    passwordRequired: 'Please enter password.',
    passwordMinLength: 'Password must be at least 8 characters.'
  }
  static register = {
    nameRequired: 'Please enter your name.',
    emailRequired: 'Please enter you email.',
    emailEmail: 'Please enter valid email address.',
    passwordRequired: 'Please enter password.',
    passwordMinLength: 'Password must be at least 8 characters.'
  }
  static verify = {
    verificationPinRequired: 'Please enter verification pin.',
    verificationPinMinLength: 'Please enter 6 digit pin.',
    emailRequired: 'Please enter email addresss.',
    emailEmail: 'Please enter valid email address.'
  }
}
