<template>
    <div class="about mx-auto flex justify-center items-center min-h-screen">
        <div class="pt-32 pb-32">
            <div class="max-w-xl">
                <h1 class="text-3xl mb-12">Blog</h1>
                <div class="max-w-md bg-white rounded overflow-hidden shadow-lg">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">My Recent GitHub Activity...</div>
                        <div v-for="commit in commits" v-bind:key="commit.id">
                            <div class="pt-4">
                                <p class="text-gray-700 text-md">{{ commit.commit.message }}</p>
                                <div class="flex">
                                    <p class="flex-1 text-gray-500 text-sm">{{ formatDate(commit.commit.author.date) }}</p>
                                    <a class="flex-end hover:text-green-700" target="_blank" v-bind:href="commit.html_url"><i class="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import creds from '../../credentials.json'
export default {
    name: 'blog',
    data() {
        return {
            user: null,
            commits: null
        }
    },
    methods: {
        getUserRepos(user) {
            axios.request({
            method: "get",
            url: "repos/" + user + "/jham/commits",
            baseURL: "https://api.github.com/"
            }).then(function (response) {
                this.commits = response.data.slice(0, 5)
                console.log(response)
            }.bind(this))
        },
        formatDate(date){
            return moment(date).format('ll')
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