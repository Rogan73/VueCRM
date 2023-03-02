export default {
    install: (app, options) => {

        app.provide('message', (text) => {
            M.toast({ html: text })
        })

        app.config.globalProperties.$mes = "hello";

        app.config.globalProperties.$message = (text) => {
            //     //app.prototype.$message = (text) => {
            //     console.log('globalProperties $message');
            M.toast({ html: text })
        }
    }
}