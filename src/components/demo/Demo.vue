<template>
  <ul>
    <li v-for="link in links">
      <a :href="link.href" target="_blank">{{ link.name }}</a>
    </li>
  </ul>
</template>
<style>
</style>
<script>
  export default {
    props: {
      links: {
        type: Array,
        required: true
      }
    }
  };
</script>
