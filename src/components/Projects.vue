<template>
    <div class="about mx-auto flex justify-center items-center min-h-screen">
        <div class="pt-32 pb-32">
            <div class="max-w-xl mx-4">
                <h1 class="text-3xl mb-12">Projects</h1>
                <GitHub project-title="(Name Pending)" repo="note-taking-app"/>
                <GitHub project-title="My Personal Website" repo="jham"/>
                <Twitter />
            </div>
        </div>
    </div>
</template>

<script>
import GitHub from '@/components/GitHub'
import Twitter from '@/components/Twitter'
export default {
    name: 'projects',
    components: {
        GitHub,
        Twitter
    },
    data() {
        return {

        }
    },
    mounted() {

    }
}
</script>

<style>
</style>