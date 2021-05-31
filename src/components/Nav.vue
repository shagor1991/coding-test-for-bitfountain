<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-info">
      <!-- <a class="navbar-brand" href="#">Bitfountain</a> -->
      <router-link class="navbar-brand" to="/"> Bitfountain</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link active" to="/">Home </router-link>
          </li>

          <li class="nav-item" v-if="LoginStatus">
              <router-link class="nav-link active" to="/dashboard">Dashboard </router-link>
          </li>
          
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
        <ul class="navbar-nav my-2 my-lg-0">
            <li class="nav-item" v-if="!LoginStatus">                        
                <router-link class="nav-link active" to="/login">Login </router-link>
            </li>
            <li class="nav-item" v-if="LoginStatus">
                <a class="nav-link active" @click="logout" href="javascript:void(0)">Logout</a>
            </li>
                   
        </ul>
      </div>
    </nav>

</template>

<script>
export default {
    name: 'Nav',
    mounted(){
        // this.$store.dispatch("allCategory")        
    }, 
    data(){
        return {
            isLoggedIn: localStorage.getItem('token') ? true : false
        }
    },
    computed: {
      LoginStatus(){
        return this.$store.getters.getLoginStatus
      }
    },
    methods: {
        logout(){
            // console.log(this.isLoggedIn)
            localStorage.removeItem('token')
            this.$store.dispatch('setLoginStatus', false)
            this.$router.push('/login')
        }
    }
}
</script>