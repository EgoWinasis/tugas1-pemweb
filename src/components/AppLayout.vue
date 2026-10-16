<template>
  <div class="min-h-screen bg-slate-50">
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
      <div class="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-sitta-600 font-bold text-white">S</div>
        <div>
          <div class="font-bold text-slate-900">SITTA</div>
          <div class="text-xs text-slate-500">Bahan Ajar UT</div>
        </div>
      </div>
      <nav class="space-y-1 p-4">
        <router-link to="/dashboard" class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-sitta-50 hover:text-sitta-700">Dashboard</router-link>
        <router-link to="/tracking" class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-sitta-50 hover:text-sitta-700">Tracking Pengiriman</router-link>
        <router-link to="/stok" class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-sitta-50 hover:text-sitta-700">Informasi Stok</router-link>
      </nav>
    </aside>

    <main class="lg:pl-64">
      <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-sitta-600">Sistem Informasi</p>
            <h1 class="text-lg font-bold text-slate-900">{{ title }}</h1>
          </div>
          <button @click="logout" class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Keluar</button>
        </div>
      </header>
      <div class="p-4 sm:p-6">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({ title: { type: String, default: 'Dashboard' } })
const router = useRouter()
function logout() { router.push('/login') }
</script>