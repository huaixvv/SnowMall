<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabbar/MainTabBar'

export default {
  name: 'app',
  components: {
    MainTabBar,
  }
}
</script>

<style>
  @import url('./assets/css/base.css');
</style>
