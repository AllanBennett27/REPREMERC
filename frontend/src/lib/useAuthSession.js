import { onMounted, onUnmounted, ref } from 'vue'
import { invitation, supabase } from './supabase'

export function useAuthSession() {
  const user = ref(null)
  const restoring = ref(Boolean(supabase))
  const acceptingInvite = ref(false)
  const error = ref('')
  let subscription

  onMounted(() => {
    if (!supabase) return
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user ?? null
      if (event === 'INITIAL_SESSION' && invitation) {
        acceptingInvite.value = Boolean(invitation.accessToken && session?.access_token === invitation.accessToken)
        if (!acceptingInvite.value && !session) {
          error.value = 'El enlace de invitación no es válido o ha vencido. Solicita otro al bufete.'
        }
      }
      if (!session) acceptingInvite.value = false
      if (event === 'INITIAL_SESSION') restoring.value = false
    })
    subscription = data.subscription
  })
  onUnmounted(() => subscription?.unsubscribe())

  return { user, restoring, acceptingInvite, error }
}
