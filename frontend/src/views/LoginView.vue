<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import AccessLayout from '../components/AccessLayout.vue'

defineProps({ sessionError: String })
const emit = defineEmits(['enter-demo'])
const demo = !supabase && import.meta.env.DEV
const busy = ref(false)
const error = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

async function submit() {
  error.value = ''
  if (demo) {
    emit('enter-demo')
    return
  }
  if (!supabase || busy.value) return

  busy.value = true
  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value,
    })
    if (authError || !data.session) {
      error.value = 'No pudimos iniciar sesión. Verifica tu correo y contraseña.'
      return
    }
  } catch {
    error.value = 'No pudimos conectar con el servicio de acceso. Intenta nuevamente.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <AccessLayout>
    <h1>Iniciar sesión</h1>
    <p class="intro">Accede al panel de trabajo del bufete.</p>


    <p v-if="error || sessionError" class="error" role="alert">{{ error || sessionError }}</p>

    <form v-if="supabase" class="login-form" @submit.prevent="submit">
      <label for="email">Correo electrónico</label>
      <input class="access-input" id="email" v-model="email" type="email" autocomplete="username" placeholder="correo@ejemplo.com" required />
      <label for="password">Contraseña</label>
      <div class="password-field">
        <input class="access-input" id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password" required />
        <button type="button" class="text-action" aria-controls="password" @click="showPassword = !showPassword">
          {{ showPassword ? 'Ocultar' : 'Mostrar' }}
        </button>
      </div>
      <button class="primary" type="submit" :disabled="busy">
        {{ busy ? 'Ingresando…' : 'Ingresar' }} <span aria-hidden="true">→</span>
      </button>
    </form>
    <div v-else-if="demo" class="demo">
      <p>Modo demostración. Puedes explorar el panel sin credenciales.</p>
      <button class="primary" type="button" @click="submit">Ingresar <span aria-hidden="true">→</span></button>
    </div>
    <p v-else class="notice" role="status">Configura Supabase para habilitar el acceso.</p>
    <p v-if="supabase" class="invitation-note">Acceso por invitación del bufete.</p>
  </AccessLayout>
</template>

<style scoped>
.login-form { display: grid; gap: .55rem; }
.login-form label { font-size: .9rem; font-weight: 650; }
.login-form > input { margin-bottom: .7rem; }
.password-field { position: relative; }
.password-field input { padding-right: 5.5rem; }
.text-action {
  position: absolute;
  top: 50%;
  right: .45rem;
  transform: translateY(-50%);
  padding: .4rem;
  border: 0;
  color: var(--ink);
  background: transparent;
  font-size: .83rem;
  font-weight: 650;
}

.demo p, .notice {
  margin: 0;
  padding: .9rem 1rem;
  background: #eee6d7;
  border-left: 3px solid var(--gold);
  line-height: 1.5;
}
.invitation-note { color: var(--muted); font-size: .85rem; margin: 1.4rem 0 0; padding-top: 1rem; border-top: 1px solid var(--line); }
</style>


