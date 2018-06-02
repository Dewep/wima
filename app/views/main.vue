<template>
  <div class="main-container container">
    <header id="main-navbar" class="navbar">
      <section class="navbar-section"></section>
      <section class="navbar-center">
        <router-link to="home" class="btn btn-link tooltip tooltip-bottom" data-tooltip="My tasks"><b>WIMA</b></router-link>
      </section>
      <section class="navbar-section">
        <router-link :to="{ name: 'my' }" class="btn btn-link">My workspace</router-link>
        <router-link :to="{ name: 'manager' }" class="btn btn-link">Manager</router-link>
      </section>
    </header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import guards from '../router/guards'

export default {
  name: 'main-index'

  // beforeRouteEnter: guards.connected,
  // beforeRouteUpdate: guards.connected,

  // data () {
  //   return {
  //     sidebar: false
  //   }
  // }

  // computed: mapGetters(['user']),

  // watch: {
  //   user (newUser) {
  //     if (newUser) {
  //       this.$router.push({ name: 'home' })
  //     }
  //   }
  // }
}
</script>

<style lang="scss">
#main-navbar {
  // max-width: 40rem;
  padding: .5rem;
  // border-bottom: 1px solid #EEE;
  // margin-bottom: 1rem;

  .navbar-section a.active {
    display: none;
  }
}

.main-container {
  max-width: 70rem;
}
</style>
