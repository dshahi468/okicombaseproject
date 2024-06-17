import { required, email, minLength, helpers } from '@vuelidate/validators'
import { ErrorHelper } from './ErrorHelper'

export class ValidationHelper {
  static loginValidation = {
    email: {
      required: helpers.withMessage(ErrorHelper.login.emailEmail, required),
      email: helpers.withMessage(ErrorHelper.login.emailEmail, email)
    },
    password: {
      required: helpers.withMessage(ErrorHelper.login.passwordRequired, required),
      minLength: helpers.withMessage(ErrorHelper.login.passwordMinLength, minLength(8))
    }
  }
}
