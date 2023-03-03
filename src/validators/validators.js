import { required, email, minLength, minValue, helpers } from '@vuelidate/validators'

const my_required = helpers.withMessage('Необходимо заполнить', required);
const my_email = helpers.withMessage('Правильно внесите email', email);
const my_minLength = (min) => helpers.withMessage(({ $params }) => `Минимальная длина ${$params.min} символа`, minLength(min))
const my_minValue = (min) => helpers.withMessage(({ $params }) => `Минимальная значение ${$params.min}`, minValue(min))


//const my_checked1 = (v0) => { return v0 == true }
//const my_checked = (v) => helpers.withMessage('Xdfsdfsd', my_checked1(v)) 

const my_checked = (v) => v == true


export { my_required, my_email, my_minLength, my_checked, my_minValue }