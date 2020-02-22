<template>
    <div class="max-w-md bg-white rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
            <div class="flex">
                <div class="flex-1 font-bold text-xl mb-2">Recent Tweets...</div>
                <span class="flex-end"><i class="fab fa-twitter text-xl mt-1"></i></span>
            </div>
            <div>
                <div class="pt-4">
                    <p class="text-gray-700 text-md">Coming soon...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import creds from '../../credentials.json'
export default {
    name: "Twitter",
    data() {
        return {
        }
    },
    methods: {
        
    },
    mounted() {
        
    }
}
</script>

<style>
</style>