```vue
<template>
  <AppLayout title="Dashboard">
    <div class="space-y-6">
      <!-- Sambutan -->
      <section
        class="rounded-3xl bg-gradient-to-r from-sitta-800 to-sitta-600 p-6 text-white shadow-lg sm:p-8"
      >
        <p class="text-sm text-green-100">
          {{ greeting }}
        </p>

        <h2 class="mt-1 text-2xl font-bold sm:text-3xl">
          Selamat datang, {{ namaPengguna }}!
        </h2>

        <p class="mt-2 max-w-2xl text-sm leading-6 text-green-50/80">
          Pantau bahan ajar dan proses pengiriman dalam satu dashboard.
        </p>
      </section>

      <!-- Statistik -->
      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="item in stats"
          :key="item.label"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <p class="text-sm text-slate-500">
            {{ item.label }}
          </p>

          <p class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {{ item.value }}
          </p>
        </div>
      </section>

      <!-- Menu Utama -->
      <section>
        <h3 class="mb-4 text-lg font-bold text-slate-900">
          Menu Utama
        </h3>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <router-link
            v-for="menu in menus"
            :key="menu.title"
            :to="menu.to"
            class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sitta-200 hover:shadow-lg sm:p-6"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-sitta-100 text-sm font-bold text-sitta-700 transition group-hover:bg-sitta-600 group-hover:text-white"
            >
              {{ menu.icon }}
            </div>

            <h4 class="mt-5 font-bold text-slate-900">
              {{ menu.title }}
            </h4>

            <p class="mt-2 text-sm leading-6 text-slate-500">
              {{ menu.desc }}
            </p>

            <div
              class="mt-4 text-sm font-semibold text-sitta-600 transition group-hover:text-sitta-800"
            >
              Buka menu &rarr;
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import AppLayout from '../components/AppLayout.vue'

// Ambil data pengguna yang sedang login
const user = computed(() => {
  try {
    const storedUser = localStorage.getItem('sitta_user')

    if (!storedUser) {
      return {}
    }

    return JSON.parse(storedUser) || {}
  } catch (error) {
    console.error('Gagal membaca data pengguna:', error)
    return {}
  }
})

// Nama pengguna
const namaPengguna = computed(() => {
  return user.value.nama || 'Pengguna'
})

// Ucapan berdasarkan waktu
const hour = new Date().getHours()

const greeting = computed(() => {
  if (hour < 11) {
    return 'Selamat pagi'
  } else if (hour < 15) {
    return 'Selamat siang'
  } else if (hour < 18) {
    return 'Selamat sore'
  } else {
    return 'Selamat malam'
  }
})

// Data statistik
const stats = [
  {
    label: 'Total Bahan Ajar',
    value: '311'
  },
  {
    label: 'Pesanan Aktif',
    value: '24'
  },
  {
    label: 'Dalam Pengiriman',
    value: '12'
  },
  {
    label: 'Selesai',
    value: '87'
  }
]

// Menu utama
const menus = [
  {
    title: 'Informasi Bahan Ajar',
    desc: 'Lihat data dan ketersediaan bahan ajar.',
    to: '/stok',
    icon: 'BA'
  },
  {
    title: 'Tracking Pengiriman',
    desc: 'Cari dan pantau status Delivery Order.',
    to: '/tracking',
    icon: 'DO'
  },
  {
    title: 'Laporan & Rekap',
    desc: 'Monitoring progress dan rekap bahan ajar.',
    to: '/stok',
    icon: 'LP'
  }
]
</script>
```