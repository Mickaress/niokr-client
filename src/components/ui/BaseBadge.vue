<template>
  <div class="badge">
    <slot></slot>
  </div>
</template>

<style scoped>
  .badge {
    padding: 0.5rem;
    width: 7.5rem;
    text-align: center;
    font-size: 0.875rem;
    justify-self: end;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 6.25rem;
  }
  .badge.active {
    color: var(--green-color);
    border: 2px solid var(--green-color);
  }
  .badge.archived {
    color: var(--dark-gray-color);
    border: 2px solid var(--dark-gray-color);
  }
  .badge.review {
    color: var(--accent-color);
    border: 2px solid var(--accent-color);
  }
  .badge.approved {
    color: var(--green-color);
    border: 2px solid var(--green-color);
  }
  .badge.rejected {
    color: var(--red-color);
    border: 2px solid var(--red-color);
  }
</style>
