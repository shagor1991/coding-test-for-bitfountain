<template>
    <div>
        <div class="col-md-6 offset-md-3">
            <h2>Login Here</h2>
            <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                type="email" 
                name="email"
                class="form-control" 
                :class="{'is-invalid' : formError.errors.email}"
                id="email" 
                v-model="form.email"
                placeholder="Email Here"
                >
                <div v-if="formError.errors.email" class="invalid-feedback">
                    {{Object.values(formError.errors.email)[0]}}
                </div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input 
                type="password" 
                name="password"
                class="form-control"
                :class="{'is-invalid' : formError.errors.password}" 
                id="password" 
                v-model="form.password"
                placeholder="Password Here"
                >
                <div v-if="formError.errors.password" class="invalid-feedback">
                    {{Object.values(formError.errors.password)[0]}}
                </div>
            </div>

            <div v-if="authMsg" class="alert alert-danger" role="alert">
            {{authMsg}}
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return {
            form: {
                email: '',
                password: ''
            },
            formError: {
                errors: {}
            },
            authMsg: null
        }
    },
    methods:  {
        submit(event){
            event.preventDefault()
            axios.post('http://163.47.115.230:30000/api/login', this.form)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.access_token)
                    this.$store.dispatch('user', res.data.user)
                    this.$store.dispatch('setLoginStatus', true)
                    this.$router.push('/dashboard')
                })
                .catch(error=> {
                    this.formError.errors= {}
                    console.log(error.response)
                    if(error.response.status == 400){                        
                        this.formError= error.response.data
                    }else if(error.response.status == 404){
                        this.authMsg=error.response.data.message
                    }                    
                })
        }
    }
}
</script>

<style scoped>

</style>