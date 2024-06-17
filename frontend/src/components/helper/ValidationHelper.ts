//@ts-ignore
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

  static registerValidation = {
    name: {
      required: helpers.withMessage(ErrorHelper.register.nameRequired, required)
    },
    email: {
      required: helpers.withMessage(ErrorHelper.register.emailRequired, required),
      email: helpers.withMessage(ErrorHelper.register.emailEmail, email)
    },
    password: {
      required: helpers.withMessage(ErrorHelper.register.passwordRequired, required),
      minLength: helpers.withMessage(ErrorHelper.register.passwordMinLength, minLength(8))
    }
  }

  static emailVerificationValidation = {
    email: {
      required: helpers.withMessage(ErrorHelper.verify.emailRequired, required),
      email: helpers.withMessage(ErrorHelper.verify.emailEmail, email)
    },
    verificationPin: {
      required: helpers.withMessage(ErrorHelper.verify.verificationPinRequired, required),
      minLength: helpers.withMessage(ErrorHelper.verify.verificationPinMinLength, minLength(6))
    }
  }
}
