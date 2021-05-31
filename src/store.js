import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        user: null,
        modelTypes: null,
        deviceType: null
    },
    getters: {
        getLoginStatus(state){
            return state.isLoggedIn
        },
        getUser(state){
            return state.user
        },
        getModelTypes(state){
            return state.modelTypes
        },
        getDeviceTypes(state){
            return state.deviceType
        }
    },
    mutations: {
        mutSetLoginStatus(state, data){
            return state.isLoggedIn=data
        },
        mutUser(state,data){
            return state.user = data
        },
        mutModelTypes(state, data){
            return state.modelTypes = data
        },
        mutDeviceTypes(state, data){
            return state.deviceType = data
        }
    },
    actions: {
        user(context, data){
            context.commit('mutUser', data)
            
        },
        setLoginStatus(context, data){
            context.commit('mutSetLoginStatus', data)
        },
        modelTypes(context){
            axios.get('api/overview/modeltype')
                .then(res=> {
                    // console.log(res)
                    context.commit('mutModelTypes', res.data.reverse())
                })
                .catch(error=> {
                    console.log(error)
                })
            // context.commit('mutModelTypes', data)
        },
        getDeviceType(context){
            axios.get('api/devicetype')
                .then(res => {
                    let alldata= res.data[0].concat(res.data[1])
                    context.commit('mutDeviceTypes', alldata)
                })
                .catch(error=> {
                    console.log(error)
                })
        },

    }
})