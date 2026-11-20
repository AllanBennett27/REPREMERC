<script setup>
defineProps({ title: String, description: String })
</script>

<template>
  <header class="section-heading">
    <div class="gold-rule"></div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </header>
  <section class="section-panel">
    <slot />
  </section>
</template>

<style scoped>
.section-heading .gold-rule { margin-bottom: 1rem; }
.section-heading p { color: var(--muted); margin: .7rem 0 1.8rem; }
.section-panel {
  padding: clamp(1.25rem, 4vw, 2rem);
  border: 1px solid var(--line);
  border-radius: .6rem;
  background: #fff;
}
.section-panel :slotted(p) { color: var(--muted); margin: .5rem 0 0; line-height: 1.5; }
.section-panel :slotted(h2) { margin: 0; }
</style>
