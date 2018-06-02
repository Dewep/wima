<template>
  <div>
    <ul class="tab">
      <li class="tab-item">
        <router-link :to="{ name: 'my-tasks' }">My tasks</router-link>
      </li>
      <li class="tab-item">
        <router-link :to="{ name: 'my-planning' }">Planning</router-link>
      </li>
      <li class="tab-item">
        <router-link :to="{ name: 'my-profile' }">Profile</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'my-index'
}
</script>
