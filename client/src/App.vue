<template>
  <div id="app">
    <Header></Header>
    <Banner></Banner>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import Banner from '@/components/banner'
import Main from '@/components/main'
import Footer from '@/components/footer'
export default {
    components: {Header, Banner, Main, Footer},
    name: 'App'
}
</script>

<style>
a{
    text-decoration: none;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
