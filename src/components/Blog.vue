<template>
    <div class="about mx-auto flex justify-center items-center min-h-screen">
        <div class="pt-32 pb-32">
            <div class="max-w-xl">
                <h1 class="text-3xl mb-12">Blog</h1>
                <div class="max-w-sm bg-white rounded overflow-hidden shadow-lg">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Placeholder Title</div>
                        <p class="text-gray-700 text-base">
                            {{ user }}
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
import creds from '../../credentials.json'
export default {
    name: 'blog',
    data() {
        return {
            user: null,
            repos: null
        }
    },
    methods: {
        getUserRepos(user) {
            axios.request({
            method: "get",
            url: "users/" + user + "/repos",
            baseURL: "https://api.github.com/"
            }).then(function (response) {
                console.log(response)
                this.repos = response
            }.bind(this))
        }
    },
    mounted() {
        var self = this;
        axios.request({
            method: "get",
            url: "user",
            baseURL: "https://api.github.com/",
            auth: {
                username: creds.github_username,
                password: creds.github_access_token
            }
            }).then(function (response) {
                this.user = response.data
                this.getUserRepos(response.data.login)
            }.bind(this))
    }
}
</script>

<style>
</style>