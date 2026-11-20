<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import AccessLayout from '../components/AccessLayout.vue'

defineProps({ email: String })
const emit = defineEmits(['accepted'])
const busy = ref(false)
const error = ref('')
const password = ref('')
const confirmation = ref('')
const mismatch = ref(false)

async function submit() {
  if (busy.value) return
  mismatch.value = password.value !== confirmation.value
  if (mismatch.value) return

  busy.value = true
  error.value = ''
  try {
    const { error: authError } = await supabase.auth.updateUser({ password: password.value })
    if (authError) {
      error.value = authError.code === 'weak_password'
        ? 'La contraseña no cumple los requisitos del bufete. Prueba una más larga y variada.'
        : 'No pudimos guardar la contraseña. Intenta nuevamente o solicita una nueva invitación.'
      return
    }
    emit('accepted')
  } catch {
    error.value = 'No pudimos conectar con Supabase. Intenta nuevamente.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <AccessLayout>
    <h1>Aceptar invitación</h1>
    <p class="intro">Define una contraseña para <strong>{{ email }}</strong>.</p>

    <form @submit.prevent="submit" @input="mismatch = false">
      <label for="new-password">Contraseña nueva</label>
      <input id="new-password" v-model="password" class="access-input" type="password"
        autocomplete="new-password" minlength="8" aria-describedby="password-hint" required />
      <small id="password-hint">Usa al menos 8 caracteres.</small>

      <label for="confirm-password">Confirmar contraseña</label>
      <input id="confirm-password" v-model="confirmation" class="access-input" type="password"
        autocomplete="new-password" minlength="8" required />

      <p v-if="mismatch" class="error" role="alert">Las contraseñas deben coincidir.</p>
      <p v-else-if="error" class="error" role="alert">{{ error }}</p>

      <button class="primary" type="submit" :disabled="busy">
        {{ busy ? 'Guardando…' : 'Guardar contraseña e ingresar' }}
      </button>
    </form>
  </AccessLayout>
</template>

<style scoped>
form { display: grid; gap: .55rem; }
label { font-size: .9rem; font-weight: 650; }
small { color: var(--muted); margin-bottom: .7rem; }
strong { overflow-wrap: anywhere; }
</style>

