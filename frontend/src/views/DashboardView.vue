<script setup>
const sections = [
  { icon: '▤', name: 'Expedientes', description: 'Consulta el estado de los asuntos del bufete.' },
  { icon: '◎', name: 'Clientes', path: '#/clientes', description: 'Organiza la información de contacto del bufete.' },
  { icon: '□', name: 'Agenda', description: 'Consulta audiencias, citas y vencimientos.' },
]
</script>

<template>
  <div class="dashboard-heading">
    <div class="gold-rule"></div>
    <h1>Panel principal</h1>
    <p>Resumen del bufete</p>
  </div>

  <ul class="cards" aria-label="Áreas de trabajo">
    <li v-for="section in sections" :key="section.name">
      <span class="card-icon" aria-hidden="true">{{ section.icon }}</span>
      <h2>
        <a v-if="section.path" :href="section.path">{{ section.name }}</a>
        <template v-else>{{ section.name }}</template>
      </h2>
      <p>{{ section.description }}</p>
    </li>
  </ul>

  <section class="activity" aria-labelledby="activity-title">
    <h2>Actividad reciente</h2>
    <p>Aquí se mostrará la actividad del bufete cuando se habiliten los módulos.</p>
  </section>
</template>

<style scoped>
.dashboard-heading p { margin: .7rem 0 2rem; color: var(--muted); }
.dashboard-heading .gold-rule { margin-bottom: 1rem; }
.cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; padding: 0; list-style: none; }
.cards li, .activity { padding: 1.4rem; border: 1px solid var(--line); border-radius: .6rem; background: #fff; }
.card-icon { display: inline-grid; place-items: center; width: 2.4rem; height: 2.4rem; background: #eee6d7; color: #684917; border-radius: .35rem; font-size: 1.35rem; }
.cards h2 { margin: .9rem 0 .45rem; }
.cards a { color: inherit; text-underline-offset: .2em; }
.cards p, .activity p { margin: 0; color: var(--muted); line-height: 1.55; }
.activity { margin-top: 1.5rem; }
.activity h2 { margin: 0 0 .7rem; }
@media (max-width: 620px) {
  .cards { grid-template-columns: 1fr; }
}
</style>
