<template>
  <nav class="nav" >
    <router-link :to="{name: 'HomeView'}">Список</router-link>
    <router-link :to="{name: 'AddListView'}">Добавить</router-link>
  </nav>
</template>

<script>
</script>

<style ang="scss" scoped>
.nav {
  margin: 1.5rem auto 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: rgb(107 114 128);
  text-transform: uppercase;
}

 .router-link-active {
  color: #011627;
 }

</style>