<template>
    <div class="about mx-auto flex justify-center items-center min-h-screen">
        <div class="pt-32 pb-32">
            <div class="max-w-xl">
                <h1 class="text-3xl mb-12">Blog</h1>
                <!-- GitHub Card -->
                <GitHub />
                <!-- Twitter Card -->
                <Twitter />
            </div>
        </div>
    </div>
</template>

<script>
import GitHub from '@/components/GitHub'
import Twitter from '@/components/Twitter'
export default {
    name: 'blog',
    components: {
        GitHub,
        Twitter
    },
    data() {
        return {

        }
    }
}
</script>

<style>
</style>