import http from '../http-common'

const MovementService = {

    getAll: () => {
        return http.get('/movements')
    },

    get: id => {
        return http.get(`/movements/${id}`)
    },

    create: data => {
        return http.post(`/movements`, data)
    },

    update: (id, data) => {
        return http.put(`/movements/${id}`, data)
    },

    remove: id => {
        return http.delete(`/movements/${id}`)
    }

}

export default MovementService