<template>
  <div>
    <ul class="tab">
      <li class="tab-item">
        <router-link :to="{ name: 'manager-tasks' }">Tasks</router-link>
      </li>
      <li class="tab-item">
        <router-link :to="{ name: 'manager-users' }">Users</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'manager-index'
}
</script>
