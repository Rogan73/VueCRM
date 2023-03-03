import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { my_required, my_minValue, my_minLength } from './validators'


let state = reactive({
    title: '',
    limit: 1,
});

let stateEd = reactive({
    title: '',
    limit: 1,
});

const clearState = () => {
    state.limit = 1;
    state.title = '';
    validator.value.$reset();
}

const clearStateEd = () => {
    state.limit = 1;
    state.title = '';
    validatorEd.value.$reset();
}


const rules = {
    title: { required: my_required, minLength: my_minLength(3) },
    limit: { required: my_required, minValue: my_minValue(1) },
}

const validator = useVuelidate(rules, state);
const validatorEd = useVuelidate(rules, stateEd);

export { state, stateEd, validator, validatorEd, clearState, clearStateEd }