import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { my_required, my_email, my_minLength, my_checked } from './validators'


let state = reactive({
    email: '',
    password: '',
    name: '',
    agree: false
});


const rules = {
    email: { my_required, my_email },
    password: { my_required, minLength: my_minLength(3) },
    name: { my_required, minLength: my_minLength(3) },
    agree: { my_checked }
}

const validator = useVuelidate(rules, state);

export { state, validator }