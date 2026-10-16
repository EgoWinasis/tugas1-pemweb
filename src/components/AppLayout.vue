
<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Overlay untuk sidebar mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div
        class="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-5"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-sitta-600 font-bold text-white"
          >
            S
          </div>

          <div>
            <div class="font-bold text-slate-900">SITTA</div>
            <div class="text-xs text-slate-500">Bahan Ajar UT</div>
          </div>
        </div>

        <!-- Tombol tutup sidebar mobile -->
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Tutup menu"
          @click="sidebarOpen = false"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- Navigasi -->
      <nav class="flex-1 space-y-1 overflow-y-auto p-4">
        <router-link
          to="/dashboard"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-sitta-50 hover:text-sitta-700"
          active-class="!bg-sitta-50 !font-semibold !text-sitta-700"
          @click="sidebarOpen = false"
        >
          Dashboard
        </router-link>

        <router-link
          to="/tracking"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-sitta-50 hover:text-sitta-700"
          active-class="!bg-sitta-50 !font-semibold !text-sitta-700"
          @click="sidebarOpen = false"
        >
          Tracking Pengiriman
        </router-link>

        <router-link
          to="/stok"
          class="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-sitta-50 hover:text-sitta-700"
          active-class="!bg-sitta-50 !font-semibold !text-sitta-700"
          @click="sidebarOpen = false"
        >
          Informasi Stok
        </router-link>
      </nav>

      <!-- Footer sidebar -->
      <div class="shrink-0 border-t border-slate-200 px-5 py-4">
        <p class="text-xs text-slate-400">
          SITTA · Bahan Ajar Universitas Terbuka
        </p>
      </div>
    </aside>

    <!-- Konten utama -->
    <main class="min-h-screen lg:pl-64">
      <!-- Header -->
      <header
        class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4"
      >
        <div class="flex min-w-0 items-center justify-between gap-3">
          <div class="flex min-w-0 items-center gap-3">
            <!-- Tombol hamburger mobile -->
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
              aria-label="Buka menu navigasi"
              :aria-expanded="sidebarOpen"
              @click="sidebarOpen = true"
            >
              <Menu class="h-5 w-5" />
            </button>

            <div class="min-w-0">
              <p
                class="text-[10px] font-medium uppercase tracking-wider text-sitta-600 sm:text-xs"
              >
                Sistem Informasi
              </p>

              <h1
                class="truncate text-base font-bold text-slate-900 sm:text-lg"
              >
                {{ title }}
              </h1>
            </div>
          </div>

          <!-- Tombol keluar -->
          <button
            type="button"
            @click="logout"
            class="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600 sm:px-4"
          >
            <LogOut class="h-4 w-4" />
            <span class="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      <!-- Area halaman -->
      <div class="min-w-0 p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X, LogOut } from 'lucide-vue-next'

defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  }
})

const router = useRouter()
const route = useRoute()

const sidebarOpen = ref(false)

function logout() {
  sidebarOpen.value = false
  router.push('/login')
}

// Tutup menu jika halaman berubah melalui navigasi lain
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  }
)
</script>