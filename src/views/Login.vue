<template>
  <div class="min-h-screen bg-slate-100">
    <div class="grid min-h-screen lg:grid-cols-2">
      <section class="hidden bg-gradient-to-br from-sitta-900 via-sitta-700 to-sitta-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold">S</div>
            <div class="text-xl font-bold">SITTA</div>
          </div>
          <div class="mt-28 max-w-xl">
            <p class="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-200">Universitas Terbuka</p>
            <h1 class="text-5xl font-bold leading-tight">Sistem Informasi Tiras dan Transaksi Bahan Ajar</h1>
            <p class="mt-6 text-lg leading-8 text-green-50/80">Kelola informasi bahan ajar, pemesanan, pengiriman, dan stok secara mudah.</p>
          </div>
        </div>
        <p class="text-sm text-green-100/70">Tugas Praktik 1 Pemrograman Web</p>
      </section>

      <section class="flex items-center justify-center p-5 sm:p-10">
        <div class="w-full max-w-md rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
          <div class="mb-8">
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sitta-100 font-bold text-sitta-700 lg:hidden">S</div>
            <p class="text-sm font-semibold text-sitta-600">Selamat Datang</p>
            <h2 class="mt-1 text-3xl font-bold text-slate-900">Masuk ke SITTA</h2>
            <p class="mt-2 text-sm text-slate-500">Gunakan email dan password Anda.</p>
          </div>

          <form @submit.prevent="login" class="space-y-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input v-model="email" type="email" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sitta-500 focus:ring-4 focus:ring-sitta-100" placeholder="nama@email.com" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input v-model="password" type="password" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-sitta-500 focus:ring-4 focus:ring-sitta-100" placeholder="••••••••" />
            </div>
            <div v-if="error" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</div>
            <button class="w-full rounded-xl bg-sitta-600 px-4 py-3 font-semibold text-white shadow-lg shadow-sitta-600/20 transition hover:bg-sitta-700">Login</button>
          </form>

          <div class="mt-6 flex justify-between text-sm">
            <button @click="showForgot = true" class="font-medium text-sitta-700 hover:underline">Lupa Password</button>
            <button @click="showRegister = true" class="font-medium text-sitta-700 hover:underline">Daftar</button>
          </div>

          
        </div>
      </section>
    </div>

    <div v-if="showForgot || showRegister" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" @click.self="closeModal">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 class="text-xl font-bold text-slate-900">{{ showForgot ? 'Lupa Password' : 'Daftar Akun' }}</h3>
        <p class="mt-2 text-sm text-slate-500">{{ showForgot ? 'Masukkan email untuk mendapatkan petunjuk reset password.' : 'Form pendaftaran akun SITTA.' }}</p>
        <input class="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-sitta-500" :placeholder="showForgot ? 'Email' : 'Nama lengkap'" />
        <div class="mt-5 flex justify-end gap-3">
          <button @click="closeModal" class="rounded-xl border border-slate-200 px-4 py-2 text-sm">Tutup</button>
          <button @click="closeModal" class="rounded-xl bg-sitta-600 px-4 py-2 text-sm font-semibold text-white">{{ showForgot ? 'Kirim' : 'Daftar' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { dataPengguna } from '../data/data.js'

const router = useRouter()

const email = ref('egowinasis@ut.ac.id')
const password = ref('053062337')
const error = ref('')

const showForgot = ref(false)
const showRegister = ref(false)

function login() {
  error.value = ''

  const emailInput = email.value.trim().toLowerCase()
  const passwordInput = password.value

  const user = dataPengguna.find(
    (item) =>
      item.email.toLowerCase() === emailInput &&
      item.password === passwordInput
  )

  if (!user) {
    error.value = 'email/password yang anda masukkan salah'
    return
  }

 localStorage.setItem('sitta_user', JSON.stringify(user)) 

  router.push('/dashboard')
}

function closeModal() {
  showForgot.value = false
  showRegister.value = false
}
</script>