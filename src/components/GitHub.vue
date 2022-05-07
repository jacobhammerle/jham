<template>
    <div class="max-w-2xl">
        <div class="bg-gray-700 rounded-t text-white overflow-hidden shadow-lg px-6 py-4 font-bold text-xl">
            <span v-if="projectTitle">
                {{ projectTitle }}
            </span>
            <span v-else>
                {{ repo }}
            </span>
            <p class="text-gray-100 text-sm">{{ repoDescription }}</p>
            <p class="text-gray-100 text-xs italic">created on {{ formatDate(repoStartDate) }}</p>
        </div>
        <div class="bg-white rounded-b overflow-hidden shadow-lg mb-4">
            <div class="px-6 py-4">
                <div class="flex">
                    <div class="flex-1 font-bold text-lg mb-2">Most Recent Activity...</div>
                    <span class="flex-end"><i class="fab fa-github text-lg mt-1"></i></span>
                </div>
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
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import creds from '../../credentials.json'
export default {
    name: "GitHub",
    props: ['repo', 'projectTitle'],
    data() {
        return {
            user: null,
            commits: null,
            repoDescription: null,
            repoStartDate: null
        }
    },
    methods: {
        getCommits(user) {
            axios.request({
            method: "get",
            url: "repos/" + user + "/" + this.repo + "/commits",
            baseURL: "https://api.github.com/"
            }).then(function (response) {
                this.commits = response.data.slice(0, 5)
            }.bind(this))
        },
        getRepo(user, repo) {
            axios.request({
            method: "get",
            url: "repos/" + user + "/" + repo,
            baseURL: "https://api.github.com/"
            }).then(function (response) {
                this.repoDescription = response.data.description
                this.repoStartDate = response.data.created_at
            }.bind(this))
        },
        formatDate(date){
            return moment(date).format('ll')
        }
    },
    mounted() {
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
                this.getRepo(response.data.login, this.repo)
                this.getCommits(response.data.login)
            }.bind(this))
    }
}
</script>

<style>
</style>