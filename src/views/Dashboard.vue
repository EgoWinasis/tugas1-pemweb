<template>
  <AppLayout title="Dashboard">
    <div class="space-y-6">
      <section class="rounded-3xl bg-gradient-to-r from-sitta-800 to-sitta-600 p-6 text-white shadow-lg sm:p-8">
        <p class="text-sm text-green-100">{{ greeting }}</p>
        <h2 class="mt-1 text-3xl font-bold">Selamat datang di SITTA</h2>
        <p class="mt-2 max-w-2xl text-sm text-green-50/80">Pantau bahan ajar dan proses pengiriman dalam satu dashboard.</p>
      </section>

      <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="item in stats" :key="item.label" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-slate-500">{{ item.label }}</p>
          <p class="mt-2 text-3xl font-bold text-slate-900">{{ item.value }}</p>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-lg font-bold text-slate-900">Menu Utama</h3>
        <div class="grid gap-4 md:grid-cols-3">
          <router-link v-for="menu in menus" :key="menu.title" :to="menu.to" class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sitta-200 hover:shadow-lg">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sitta-100 text-sitta-700">{{ menu.icon }}</div>
            <h4 class="mt-5 font-bold text-slate-900">{{ menu.title }}</h4>
            <p class="mt-2 text-sm leading-6 text-slate-500">{{ menu.desc }}</p>
          </router-link>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import AppLayout from '../components/AppLayout.vue'
const hour = new Date().getHours()
const greeting = computed(() => hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : 'Selamat sore')
const stats = [
  { label: 'Total Bahan Ajar', value: '311' },
  { label: 'Pesanan Aktif', value: '24' },
  { label: 'Dalam Pengiriman', value: '12' },
  { label: 'Selesai', value: '87' }
]
const menus = [
  { title: 'Informasi Bahan Ajar', desc: 'Lihat data dan ketersediaan bahan ajar.', to: '/stok', icon: 'BA' },
  { title: 'Tracking Pengiriman', desc: 'Cari dan pantau status Delivery Order.', to: '/tracking', icon: 'DO' },
  { title: 'Laporan & Rekap', desc: 'Monitoring progress dan rekap bahan ajar.', to: '/stok', icon: 'LP' }
]
</script>