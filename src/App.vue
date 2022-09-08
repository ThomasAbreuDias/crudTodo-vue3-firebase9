<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
              <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28">
            </a>
            <div class="navbar-menu">
              <div class="navbar-start">
                <RouterLink to="/" class="navbar-item">Home</RouterLink>
                <RouterLink to="/about" class="navbar-item">About</RouterLink>
              </div>
            </div>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        </nav>
    </header>
    <RouterView />
</template>

<style>
  .navbar {
    background-color: cornflowerblue !important;;
  }

</style>