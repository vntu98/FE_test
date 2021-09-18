import { Server } from 'miragejs'
import userDefault from './user'

export default function ({ environment = 'development' } = {}) {
    return new Server({
        environment,
        routes() {
            this.urlPrefix = 'http://fresh.test/api/user',

            this.get('/mock/user', () => ({
                user: userDefault,
            })),

            this.put('/mock/user/:id', (schema, request) => {
                const user = JSON.parse(localStorage.getItem('user')) || userDefault
                console.log(user, formData)
                const formData = JSON.parse(request.requestBody)
                
                return {
                    ...user,
                    ...formData
                }
            })

            this.passthrough()
        },
    })
}
