<template>
    <div class="about mx-auto flex justify-center items-center min-h-screen">
        <div class="pt-32 pb-32">
            <div class="max-w-xl">
                <h1 class="text-3xl mb-12">Blog</h1>
                <div class="max-w-sm bg-white rounded overflow-hidden shadow-lg">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Placeholder Title</div>
                        <p class="text-gray-700 text-base">
                            {{ info.data.bpi.USD.description }}
                        </p>
                    </div>
                    <div class="px-6 py-4">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#sample</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#test</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#beta</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'blog',
    data() {
        return {
            info: null
        }
    },
    mounted() {
        axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (this.info = response))
    }
}
</script>

<style>
</style>