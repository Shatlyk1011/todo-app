<template>
  <div class="lists" v-for="list in lists" :key="list.id"  :class="{activeBorder: list.complete }" >
    <SingleList :list="list"/>
  </div>
  <div class="error">{{error}}</div>

  <router-link v-if="!lists.length" to="/add">
      <button class="btn">Добавить список </button>
  </router-link>
</template>

<script>
import SingleList from '@/components/SingleList.vue'

export default {
  name: 'MultipleLists',
  props: ['lists', 'error'],
  components: { SingleList },
}

  
</script>

<style  lang="scss" scoped>
.lists {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;
  background-color: rgb(244 244 245);
  border-left: 6px solid transparent;
  padding: 1.5rem 2rem;
}
.btn {
  font-size: 0.75rem;
  line-height: 1rem;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: rgb(82 82 91 );
  color: #fff;

  &:hover {
    background-color: rgb(63 63 70);
  }
}

.activeBorder {
  background-color: rgb(134 239 172);
  border-left-color: rgb(34 197 94);
}
</style>