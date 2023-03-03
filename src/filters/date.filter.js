 const dateFilter = (value, format = 'date') => {

     //if (!value) return;
     //console.log('value1', value);

     if ((value instanceof Date) == false) {
         value = new Date(Date.parse(value));
     }

     if ((value instanceof Date) == false) {
         return '';
     }



     const options = {};
     if (format.includes('date')) {
         options.year = 'numeric'
         options.month = 'long'
         options.day = '2-digit'
     }
     if (format.includes('time')) {
         options.hour = '2-digit'
         options.minute = '2-digit'
         options.second = '2-digit'
     }

     if (format.includes('short')) {
         options.year = '2-digit'
         options.month = '2-digit'
         options.day = '2-digit'

     }

     return new Intl.DateTimeFormat('ru-RU', options).format(value);

 }

 export default dateFilter