const currencyFilter = (value, currency = 'UAH') => {
    return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency
    }).format(value)
}

export default currencyFilter;


// export default function currencyFilter(value, currency = 'UAH') {
//     return new Intl.NumberFormat('ru', {
//         style: 'currency',
//         currency
//     }).format(value)
// }

//ar, be, bg, ca, cs, da, de, el, en, es, et, fa, fi, fil, fr, he, hi, hr, hu, id, is, it, ja, ko, lt, lv, mk, ms, mt, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, uz, vi, and zh.