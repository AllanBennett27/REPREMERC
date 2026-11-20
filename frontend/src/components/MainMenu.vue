<script setup>
defineProps({ sections: Array, activePath: String })
</script>

<template>
  <aside class="sidebar">
    <div class="brand"><span class="monogram" aria-hidden="true">R</span> REPREMERC</div>
    <nav aria-label="Principal">
      <a v-for="section in sections" :key="section.path" :href="section.path"
        :aria-current="section.path === activePath ? 'page' : undefined">
        <span aria-hidden="true">{{ section.icon }}</span>{{ section.label }}
      </a>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar { background: var(--ink); color: #fffaf0; padding: 1.75rem 1.3rem; }
.sidebar nav { display: flex; flex-direction: column; gap: .35rem; margin-top: 2.5rem; }
.sidebar a {
  display: flex;
  align-items: center;
  gap: .65rem;
  text-decoration: none;
  color: inherit;
  padding: .85rem;
  border-left: 3px solid transparent;
  border-radius: .25rem;
}
.sidebar a:hover, .sidebar a[aria-current="page"] { background: #263a51; }
.sidebar a[aria-current="page"] { border-left-color: var(--gold); }
.sidebar a span { color: #ebc88d; }

@media (max-width: 800px) {
  .sidebar { padding: 1rem; }
  .sidebar nav { flex-direction: row; flex-wrap: wrap; margin-top: 1rem; }
  .sidebar a { padding: .65rem .75rem; }
}
</style>
