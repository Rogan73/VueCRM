import { ref, computed, getCurrentInstance } from "vue";
import { defineStore } from "pinia";
//import { useAuth } from "firebase/app";
import currencyFilter from '@/filters/currency.filter'
import dateFilter from '@/filters/date.filter'


export const useStore = defineStore("store", () => {

    let user = ref()
    let currency = ref()
    let loader = ref(true)
    let CurBase = ref(0)
    let ArrCurr = ref([])
    const ListCur = ['UAH', 'USD', 'EUR']

    const app = getCurrentInstance();


    const gLoader = computed(() => {
        return loader.value;
    })

    const setLoader = (v) => {
        //console.log('setLoader', v);
        loader.value = v;
    }

    const setCurrency = (v) => {
        currency.value = {...v }
    }

    const gCurBase = computed(() => {
        return CurBase.value
    })

    const gArrCurr = computed(() => {
        return ArrCurr.value;
    })



    const setArrCurr = () => {
        let res = []
        let res2 = []

        const base = gCurBase.value
            //        console.log('base', base);
            //        console.log('rates', currency.value.rates);


        ListCur.forEach(r => {
            let value = Math.floor(base * currency.value.rates[r]);
            let curs = (currency.value.rates[r]).toFixed(3);
            //console.log('currency.value.date', currency.value.date);

            res.push({
                value1: currencyFilter(value, r),
                value2: curs,
                name: r,
                date: dateFilter(currency.value.date, 'short')
            })

        })

        //console.log('res', res);
        ArrCurr.value = [...res];
    }

    const setCurBase = () => {

        // console.log('user.value', user.value.bill);
        // console.log('UAH', currency.value.rates['UAH']);
        // console.log('EUR', currency.value.rates['EUR']);

        CurBase.value = (user.value.bill / currency.value.rates['UAH'] / currency.value.rates['EUR'])

    }


    const showMessage = (m) => {
        app.appContext.config.globalProperties.$message(m)
    }

    let error = ref()

    const setError = (message) => {
        error.value = message;
        showMessage(message);
    }

    // STARTUP
    const setUser = async(obj) => {
        //console.log('setUser', obj);
        user.value = {...obj }

        const c = await fetchCurrency();
        setCurrency(c);
        setCurBase();
        setArrCurr();

        setLoader(false);

    }

    const setClearUser = () => {
        user.value = {};
    }

    const g_userName = computed((v) => {
        return user.value ? user.value.name : '';
    })


    const g_user = computed((v) => {
        return user.value ? user.value : {};
    })


    const updateCurrencies = async() => {
        setLoader(true);
        const c = await fetchCurrency();
        setCurrency(c);
        setCurBase();
        setArrCurr();
        setLoader(false);
    }

    const fetchCurrency = async() => {
        //console.log('fetchCurrency');

        const key =
            import.meta.env.VITE_FIXER;

        let headers = new Headers()
        headers.append("apikey", key);

        const Options = {
            method: 'GET',
            redirect: 'follow',
            headers: headers
        };

        // https://api.apilayer.com/fixer/latest?base=USD&symbols=EUR,GBP
        // https://api.apilayer.com/fixer/convert?to={to}&from={from}&amount={amount}
        // --header 'apikey: YOUR API KEY'
        const res = await fetch("https://api.apilayer.com/fixer/latest?base=EUR&symbols=UAH,USD,EUR", Options);
        //return await res.json();

        return await res.json();
    }


    return { error, setError, setUser, g_user, g_userName, setClearUser, fetchCurrency, gLoader, gCurBase, gArrCurr, updateCurrencies };

});