<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { supabase } from '../lib/supabase'
import MainMenu from './MainMenu.vue'
import DashboardView from '../views/DashboardView.vue'
import ClientsView from '../views/ClientsView.vue'
import ClaimTypesView from '../views/ClaimTypesView.vue'
import SuppliersView from '../views/SuppliersView.vue'

defineProps({ user: Object })
const emit = defineEmits(['exit-demo'])
const busy = ref(false)
const error = ref('')

const sections = [
  { path: '#/inicio', label: 'Inicio', icon: '▦', view: DashboardView },
  { path: '#/clientes', label: 'Clientes', icon: '◎', view: ClientsView },
  { path: '#/tipos-de-demandas', label: 'Tipos de demandas', icon: '▤', view: ClaimTypesView },
  { path: '#/proveedores', label: 'Proveedores', icon: '□', view: SuppliersView },
]
const hash = ref(window.location.hash)
const current = computed(() => sections.find(section => section.path === hash.value) ?? sections[0])

function syncLocation() {
  hash.value = window.location.hash
}

onMounted(() => window.addEventListener('hashchange', syncLocation))
onUnmounted(() => window.removeEventListener('hashchange', syncLocation))

async function signOut() {
  error.value = ''
  if (!supabase) {
    emit('exit-demo')
    return
  }

  busy.value = true
  try {
    const { error: authError } = await supabase.auth.signOut({ scope: 'local' })
    if (authError) error.value = 'No pudimos cerrar la sesión. Intenta nuevamente.'
  } catch {
    error.value = 'No pudimos cerrar la sesión. Intenta nuevamente.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div class="workspace">
    <MainMenu :sections="sections" :active-path="current.path" />

    <div class="workspace-body">
      <header class="topbar">
        <span>{{ user.email }}</span>
        <button class="secondary" type="button" :disabled="busy" @click="signOut">Cerrar sesión</button>
      </header>

      <main class="workspace-content">
        <p v-if="error" class="error" role="alert">{{ error }}</p>
        <component :is="current.view" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.workspace { display: grid; min-height: 100vh; grid-template-columns: 15rem minmax(0, 1fr); }
.topbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem clamp(1.25rem, 5vw, 4rem);
  border-bottom: 1px solid var(--line);
  background: #fff;
}
.topbar span { color: var(--muted); overflow-wrap: anywhere; }
.secondary { border-radius: .4rem; font-weight: 650; padding: .55rem .8rem; border: 1px solid #bdb7ad; background: #fff; color: var(--ink); }
.secondary:hover { background: #f5f3ef; }
.workspace-content { max-width: 83rem; margin: auto; padding: clamp(1.25rem, 5vw, 4rem); }

@media (max-width: 800px) {
  .workspace { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
}
</style>
