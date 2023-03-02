import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { my_required, my_email, my_minLength } from './validators'


let state = reactive({
    email: '',
    password: '',
});


const rules = {
    email: { required: my_required, email: my_email },
    password: { required: my_required, minLength: my_minLength(3) },
}

const validator = useVuelidate(rules, state);

export { state, validator }