<template>
    <div>
        {{ posts }}
    </div>
</template>

<script setup>
import { onMount } from "vue";
import userPosts from "../composables/Posts";

const { posts, getPosts } = userPosts();

onMount(getPosts);
</script>

<style lang="scss" scoped></style>
