//@ts-ignore
import { required, email, minLength, helpers, maxLength } from '@vuelidate/validators'
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

  static forgotValidation = {
    email: {
      required: helpers.withMessage(ErrorHelper.forgot.emailRequired, required),
      email: helpers.withMessage(ErrorHelper.forgot.emailEmail, email)
    }
  }

  static resetValidation = {
    code: {
      required: helpers.withMessage(ErrorHelper.reset.codeRequired, required),
      minLength: helpers.withMessage(ErrorHelper.reset.codeMinLength, minLength(6))
    },
    email: {
      required: helpers.withMessage(ErrorHelper.reset.emailRequired, required),
      email: helpers.withMessage(ErrorHelper.reset.emailEmail, email)
    },
    password: {
      required: helpers.withMessage(ErrorHelper.reset.passwordRequired, required),
      minLength: helpers.withMessage(ErrorHelper.reset.passwordMinLength, minLength(8))
    }
  }

  static todoValidation = {
    name: {
      required: helpers.withMessage('Name is required', required)
    },
    description: {
      maxLength: helpers.withMessage('Max length is 100', maxLength(100))
    }
  }
}
