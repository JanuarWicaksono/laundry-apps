
import $axios from '../api.js'

const state = () => ({
    couriers: [], //UNTUK MENAMPUNG DATA KURIR
    page: 1, //PAGE AKTIF
    id: '' //NANTI AKAN DIGUNAKAN UNTUK EDIT DATA
})

const mutations = {
    //MEMASUKKAN DATA YANG DITERIMA KE DALAM STATE KURIR
    ASSIGN_DATA(state, payload) {
        state.couriers = payload
    },
    //MENGUBAH STATE PAGE
    SET_PAGE(state, payload) {
        state.page = payload
    },
    //MENGUBAH STATE ID
    SET_ID_UPDATE(state, payload) {
        state.id = payload
    }
}

const actions = {
    //FUNGSI INI AKAN MELAKUKAN REQUEST KE SERVER UNTUK MENGAMBILD ATA
    getCouriers({ commit, state }, payload) {
        let search = typeof payload != 'undefined' ? payload:''
        return new Promise((resolve, reject) => {
            //DENGAN MENGGUNAKAN AXIOS METHOD GET
            $axios.get(`/couriers?page=${state.page}&q=${search}`)
            .then((response) => {
                //KEMUDIAN DI COMMIT UNTUK MELAKUKAN PERUBAHA STATE
                commit('ASSIGN_DATA', response.data)
                resolve(response.data)
            })
        })
    },

    submitCourier({ dispatch, commit}, payload) {
        return new Promise((resolve, reject) => {
            $axios.post(`/couriers`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                dispatch('getCouriers').then(() => {
                    resolve(response.data)
                })
            }).catch((error) => {
                if (error.reponse.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
        })
    },

    editCourier({ commit }, payload) {
        return new Promise((resolve, reject) => {
            $axios.get(`/couriers/${payload}/edit`).then((response) => {
                resolve(response.data)
            })
        })
    },

    updateCourier({state}, payload) {
        return new Promise((resolve, reject) => {
            //FUNGSI UNTUK MELAKUKAN REQUEST DATA PERUBAHAN DATA KURIR BERDASARKAN STATE ID KURIR
            $axios.post(`/couriers/${state.id}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                resolve(response.data)
            })
        })
    },

    removeCourier({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            //MELAKUKAN PERMINTAAN KE SERVER DENGAN METHOD DELETE DAN MENGIRIMKAN ID YANG AKAN DIHAPUS
            $axios.delete(`/couriers/${payload}`)
            .then((response) => {
                //MENGAMBIL DATA TERBARU DARI SERVER
                dispatch('getCouriers').then(() => resolve(response.data))
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}