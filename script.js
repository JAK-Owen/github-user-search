
const { createApp, ref } = Vue

createApp({
    setup() {
        const message = ref('TESTING!')
        return {
            message
        }
    }
}).mount('#app')
