<template>
  <AppLayout title="Tracking Pengiriman">
    <div class="mx-auto max-w-5xl space-y-6">
      <div>
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-sitta-100 text-sitta-600">
            <Truck class="h-6 w-6" />
          </div>

          <div>
            <h2 class="text-2xl font-bold text-slate-900">
              Tracking Pengiriman
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              Masukkan Nomor Delivery Order untuk melihat detail pengiriman.
            </p>
          </div>
        </div>
      </div>

      <form
        @submit.prevent="search"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="flex flex-col gap-3 sm:flex-row">
          <div class="relative flex-1">
            <Search
              class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />

            <input
              v-model="noDO"
              type="text"
              class="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-sitta-500 focus:ring-4 focus:ring-sitta-100"
              placeholder="Contoh: 2023001234"
            />
          </div>

          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-sitta-600 px-6 py-3 font-semibold text-white transition hover:bg-sitta-700"
          >
            <Search class="h-4 w-4" />
            Cari
          </button>
        </div>

        <div class="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <Info class="h-4 w-4" />

          <span>
            Coba: 2023001234 atau 2023005678
          </span>
        </div>
      </form>

      <div
        v-if="result"
        class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div
          class="flex flex-col justify-between gap-4 border-b border-slate-100 p-6 sm:flex-row"
        >
          <div>
            <p class="text-xs uppercase tracking-wider text-slate-400">
              Delivery Order
            </p>

            <div class="mt-2 flex items-center gap-2">
              <Hash class="h-5 w-5 text-sitta-600" />

              <h3 class="text-xl font-bold text-slate-900">
                {{ result.nomorDO }}
              </h3>
            </div>
          </div>

          <span
            :class="[
              'inline-flex h-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold',
              statusClass
            ]"
          >
            <span class="h-2 w-2 rounded-full bg-current"></span>
            {{ result.status }}
          </span>
        </div>

        <div class="p-6">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-xl bg-slate-50 p-4">
              <div class="flex items-center gap-2">
                <User class="h-4 w-4 text-sitta-600" />

                <p class="text-xs text-slate-400">
                  Nama Mahasiswa
                </p>
              </div>

              <p class="mt-2 font-semibold text-slate-800">
                {{ result.nama }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
              <div class="flex items-center gap-2">
                <Truck class="h-4 w-4 text-sitta-600" />

                <p class="text-xs text-slate-400">
                  Ekspedisi
                </p>
              </div>

              <p class="mt-2 font-semibold text-slate-800">
                {{ result.ekspedisi }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
              <div class="flex items-center gap-2">
                <Calendar class="h-4 w-4 text-sitta-600" />

                <p class="text-xs text-slate-400">
                  Tanggal Kirim
                </p>
              </div>

              <p class="mt-2 font-semibold text-slate-800">
                {{ formatDate(result.tanggalKirim) }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
              <div class="flex items-center gap-2">
                <Package class="h-4 w-4 text-sitta-600" />

                <p class="text-xs text-slate-400">
                  Jenis Paket
                </p>
              </div>

              <p class="mt-2 font-semibold text-slate-800">
                {{ result.paket }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
              <div class="flex items-center gap-2">
                <Wallet class="h-4 w-4 text-sitta-600" />

                <p class="text-xs text-slate-400">
                  Total Pembayaran
                </p>
              </div>

              <p class="mt-2 font-semibold text-slate-800">
                {{ result.total }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
              <div class="flex items-center gap-2">
                <Route class="h-4 w-4 text-sitta-600" />

                <p class="text-xs text-slate-400">
                  Riwayat Perjalanan
                </p>
              </div>

              <p class="mt-2 font-semibold text-slate-800">
                {{ result.perjalanan?.length || 0 }} perjalanan
              </p>
            </div>
          </div>

          <div class="mt-8">
            <div class="mb-5 flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-sitta-100 text-sitta-600">
                <MapPin class="h-5 w-5" />
              </div>

              <div>
                <h4 class="font-bold text-slate-900">
                  Perjalanan Paket
                </h4>

                <p class="text-xs text-slate-400">
                  Riwayat proses pengiriman
                </p>
              </div>
            </div>

            <div
              v-if="result.perjalanan && result.perjalanan.length"
              class="relative ml-2"
            >
              <div
                class="absolute bottom-5 left-4 top-5 w-px bg-slate-200"
              ></div>

              <div
                v-for="(item, index) in result.perjalanan"
                :key="index"
                class="relative flex gap-4 pb-6 last:pb-0"
              >
                <div
                  class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white bg-sitta-600 text-white shadow-sm"
                >
                  <Check class="h-3.5 w-3.5" />
                </div>

                <div class="min-w-0 flex-1 rounded-xl bg-slate-50 p-4">
                  <div class="flex flex-col justify-between gap-2 sm:flex-row">
                    <p class="text-sm font-semibold text-slate-800">
                      {{ item.keterangan }}
                    </p>

                    <span class="shrink-0 text-xs font-medium text-slate-400">
                      {{ formatDateTime(item.waktu) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500"
            >
              Belum ada riwayat perjalanan.
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="searched"
        class="rounded-2xl border border-red-100 bg-red-50 p-5"
      >
        <div class="flex items-start gap-3">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertCircle class="h-5 w-5" />
          </div>

          <div>
            <p class="font-semibold text-red-800">
              Delivery Order tidak ditemukan
            </p>

            <p class="mt-1 text-sm text-red-600">
              Periksa kembali nomor Delivery Order yang kamu masukkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { dataTracking } from '../data/data.js'

import {
  Truck,
  Search,
  Info,
  Hash,
  User,
  Calendar,
  Package,
  Wallet,
  Route,
  MapPin,
  Check,
  AlertCircle
} from 'lucide-vue-next'

const noDO = ref('')
const result = ref(null)
const searched = ref(false)

function search() {
  searched.value = true
  result.value = null

  const nomor = noDO.value.trim()

  if (!nomor) {
    return
  }

  const tracking = dataTracking[nomor]

  if (tracking) {
    result.value = tracking
  }
}

const statusClass = computed(() => {
  if (!result.value) {
    return ''
  }

  const status = result.value.status.toLowerCase()

  if (
    status.includes('selesai') ||
    status.includes('diterima')
  ) {
    return 'bg-emerald-100 text-emerald-700'
  }

  if (
    status.includes('perjalanan') ||
    status.includes('dikirim')
  ) {
    return 'bg-sitta-100 text-sitta-700'
  }

  if (status.includes('proses')) {
    return 'bg-amber-100 text-amber-700'
  }

  return 'bg-slate-100 text-slate-700'
})

function formatDate(date) {
  if (!date) {
    return '-'
  }

  const parsed = new Date(`${date}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return parsed.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function formatDateTime(datetime) {
  if (!datetime) {
    return '-'
  }

  const parsed = new Date(datetime.replace(' ', 'T'))

  if (Number.isNaN(parsed.getTime())) {
    return datetime
  }

  return parsed.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>