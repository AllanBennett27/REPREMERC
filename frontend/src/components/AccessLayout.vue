<template>
  <div class="access-page">
    <div class="access-shell">
      <aside class="brand-panel">
        <div class="brand"><span class="monogram" aria-hidden="true">R</span> REPREMERC</div>
        <div class="brand-copy">
          <div class="gold-rule"></div>
          <p>Gestión<br />Jurídica</p>
        </div>
      </aside>

      <main class="access-main">
        <div class="access-content">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.access-page {
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: clamp(1rem, 5vw, 4rem);
  background: radial-gradient(ellipse at top, #faf8f3, #eae4d9);
}

.access-shell {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
  width: min(100%, 65rem);
  min-height: 35rem;
  overflow: hidden;
  border: 1px solid #ddd4c5;
  border-radius: 1.15rem;
  box-shadow: 0 1.25rem 4rem #1a293c20;
  background: #fffdf9;
}

.brand-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  padding: clamp(1.7rem, 5vw, 3.75rem);
  color: #fffaf0;
  background:
    repeating-linear-gradient(135deg, transparent 0 35px, #ebc88d13 36px 37px),
    linear-gradient(148deg, #12243c 35%, #27445d);
}

.brand-panel .brand { color: #fffaf0; }
.brand-copy { margin-bottom: .8rem; }
.brand-copy p {
  margin: 1rem 0 0;
  color: #fffaf0;
  font: clamp(2.25rem, 4.5vw, 4.5rem)/1.06 Georgia, serif;
  letter-spacing: -.045em;
}

.access-main { display: grid; place-items: center; padding: clamp(1.5rem, 5vw, 3.5rem); }
.access-content { width: min(100%, 25rem); }
.access-content :slotted(h1) { font-size: clamp(2.1rem, 4vw, 3.25rem); }
.access-content :slotted(.intro) { line-height: 1.55; }

@media (max-width: 680px) {
  .access-shell { grid-template-columns: minmax(0, 1fr); min-height: auto; }
  .brand-panel { gap: 1.1rem; }
  .brand-copy { margin-bottom: 0; }
  .brand-copy p { margin-top: .55rem; }
  .access-main { padding-block: 2rem; }
}
</style>
