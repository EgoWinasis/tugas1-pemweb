<template>
  <AppLayout title="Informasi Stok Bahan Ajar">
    <div class="space-y-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div class="flex items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-sitta-100 text-sitta-600">
              <Package class="h-6 w-6" />
            </div>

            <div>
              <h2 class="text-2xl font-bold text-slate-900">
                Stok Bahan Ajar
              </h2>

              <p class="mt-1 text-sm text-slate-500">
                Data stok bahan ajar Universitas Terbuka.
              </p>
            </div>
          </div>
        </div>

        <button
          @click="showAdd = true"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-sitta-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sitta-700"
        >
          <Plus class="h-4 w-4" />
          Tambah Stok
        </button>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px] text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th class="px-5 py-4">
                  Kode Lokasi
                </th>

                <th class="px-5 py-4">
                  Kode Barang
                </th>

                <th class="px-5 py-4">
                  Bahan Ajar
                </th>

                <th class="px-5 py-4">
                  Jenis
                </th>

                <th class="px-5 py-4">
                  Edisi
                </th>

                <th class="px-5 py-4">
                  Stok
                </th>

                <th class="px-5 py-4 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="item in stocks"
                :key="item.id"
                class="transition hover:bg-slate-50"
              >
                <td class="px-5 py-4">
                  <div class="flex items-center gap-2">
                    <MapPin class="h-4 w-4 text-slate-400" />

                    <span class="font-semibold text-sitta-700">
                      {{ item.kodeLokasi }}
                    </span>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <div class="flex items-center gap-2">
                    <Hash class="h-4 w-4 text-slate-400" />

                    <span class="font-medium text-slate-800">
                      {{ item.kodeBarang }}
                    </span>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <div class="h-12 w-9 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <img
                        v-if="item.cover"
                        :src="item.cover"
                        :alt="item.namaBarang"
                        class="h-full w-full object-cover"
                        @error="handleImageError"
                      />

                      <div
                        v-else
                        class="flex h-full w-full items-center justify-center"
                      >
                        <BookOpen class="h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div class="min-w-0">
                      <div class="truncate font-medium text-slate-800">
                        {{ item.namaBarang }}
                      </div>

                      <div class="mt-1 text-xs text-slate-400">
                        Bahan Ajar
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <span class="inline-flex items-center gap-1.5 rounded-lg bg-sitta-50 px-3 py-1.5 text-xs font-semibold text-sitta-700">
                    <Layers class="h-3.5 w-3.5" />
                    {{ item.jenisBarang }}
                  </span>
                </td>

                <td class="px-5 py-4 text-slate-600">
                  Edisi {{ item.edisi }}
                </td>

                <td class="px-5 py-4">
                  <div class="flex items-center gap-2">
                    <Package
                      class="h-4 w-4"
                      :class="
                        item.stok <= 100
                          ? 'text-red-500'
                          : item.stok <= 250
                            ? 'text-amber-500'
                            : 'text-emerald-500'
                      "
                    />

                    <span
                      :class="[
                        'font-semibold',
                        item.stok <= 100
                          ? 'text-red-600'
                          : item.stok <= 250
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                      ]"
                    >
                      {{ item.stok }}
                    </span>

                    <span class="text-xs text-slate-400">
                      eksemplar
                    </span>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <div class="flex justify-center">
                    <button
                      @click="remove(item.id)"
                      type="button"
                      title="Hapus data"
                      class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="stocks.length === 0">
                <td
                  colspan="7"
                  class="px-5 py-12 text-center"
                >
                  <div class="flex flex-col items-center justify-center">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <Package class="h-6 w-6 text-slate-400" />
                    </div>

                    <p class="mt-3 font-medium text-slate-700">
                      Tidak ada data bahan ajar
                    </p>

                    <p class="mt-1 text-sm text-slate-400">
                      Silakan tambahkan stok bahan ajar.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        v-if="showAdd"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
        @click.self="showAdd = false"
      >
        <form
          @submit.prevent="add"
          class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-sitta-100 text-sitta-600">
                <Package class="h-5 w-5" />
              </div>

              <div>
                <h3 class="font-bold text-slate-900">
                  Tambah Stok
                </h3>

                <p class="text-xs text-slate-500">
                  Tambahkan bahan ajar baru
                </p>
              </div>
            </div>

            <button
              type="button"
              @click="showAdd = false"
              title="Tutup"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Kode Lokasi
              </label>

              <div class="relative">
                <MapPin class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  v-model="form.kodeLokasi"
                  required
                  type="text"
                  class="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                  placeholder="Contoh: 0JKT01"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Kode Barang
              </label>

              <div class="relative">
                <Hash class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  v-model="form.kodeBarang"
                  required
                  type="text"
                  class="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                  placeholder="Contoh: ASIP4301"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Nama Bahan Ajar
              </label>

              <div class="relative">
                <BookOpen class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  v-model="form.namaBarang"
                  required
                  type="text"
                  class="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                  placeholder="Nama bahan ajar"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Jenis Barang
              </label>

              <div class="relative">
                <Layers class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  v-model="form.jenisBarang"
                  required
                  class="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                >
                  <option value="BMP">
                    BMP
                  </option>

                  <option value="Suplemen">
                    Suplemen
                  </option>

                  <option value="Modul">
                    Modul
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Edisi
              </label>

              <div class="relative">
                <BookOpen class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  v-model="form.edisi"
                  required
                  type="text"
                  class="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                  placeholder="Contoh: 2"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Stok
              </label>

              <div class="relative">
                <Package class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  v-model.number="form.stok"
                  required
                  type="number"
                  min="0"
                  class="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                  placeholder="Jumlah stok"
                />
              </div>
            </div>

            <div>
              <label class="mb-1.5 block text-xs font-semibold text-slate-700">
                Cover
              </label>

              <input
                v-model="form.cover"
                type="text"
                class="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-sitta-500 focus:ring-2 focus:ring-sitta-100"
                placeholder="img/cover.jpg"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-3">
            <button
              type="button"
              @click="showAdd = false"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <X class="h-4 w-4" />
              Batal
            </button>

            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-xl bg-sitta-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sitta-700"
            >
              <Save class="h-4 w-4" />
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import { dataBahanAjar } from '../data/data.js'

import {
  Plus,
  Trash2,
  X,
  Save,
  Package,
  MapPin,
  BookOpen,
  Hash,
  Layers
} from 'lucide-vue-next'

const stocks = ref(
  dataBahanAjar.map((item, index) => ({
    id: index + 1,
    ...item
  }))
)

const showAdd = ref(false)

const form = ref({
  kodeLokasi: '',
  kodeBarang: '',
  namaBarang: '',
  jenisBarang: 'BMP',
  edisi: '',
  stok: 0,
  cover: ''
})

function add() {
  stocks.value.push({
    id: Date.now(),
    kodeLokasi: form.value.kodeLokasi,
    kodeBarang: form.value.kodeBarang,
    namaBarang: form.value.namaBarang,
    jenisBarang: form.value.jenisBarang,
    edisi: form.value.edisi,
    stok: form.value.stok,
    cover: form.value.cover
  })

  resetForm()
  showAdd.value = false
}

function resetForm() {
  form.value = {
    kodeLokasi: '',
    kodeBarang: '',
    namaBarang: '',
    jenisBarang: 'BMP',
    edisi: '',
    stok: 0,
    cover: ''
  }
}

function remove(id) {
  stocks.value = stocks.value.filter(
    (item) => item.id !== id
  )
}

function handleImageError(event) {
  event.target.style.display = 'none'
}
</script>