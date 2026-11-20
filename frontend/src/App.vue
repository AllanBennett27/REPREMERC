<script setup>
import { useAuthSession } from './lib/useAuthSession'
import WorkspaceLayout from './components/WorkspaceLayout.vue'
import InviteView from './views/InviteView.vue'
import LoginView from './views/LoginView.vue'

const { user, restoring, acceptingInvite, error } = useAuthSession()
</script>

<template>
  <main v-if="restoring" class="loading" role="status">Comprobando sesión…</main>
  <InviteView v-else-if="acceptingInvite" :email="user.email" @accepted="acceptingInvite = false" />
  <WorkspaceLayout v-else-if="user" :user="user" @exit-demo="user = null" />
  <LoginView v-else :session-error="error" @enter-demo="user = { email: 'Modo demostración' }" />
</template>

<style scoped>
.loading { display: grid; min-height: 100vh; place-items: center; }
</style>

