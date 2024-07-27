<script setup lang="ts">
import {useUserService} from "~/services/user";
import {usePostService} from "~/services/post";
import {useCommentService} from "~/services/comment";

const {getAllUsers} = useUserService()
const {getAllPosts} = usePostService()
const {getAllComments} = useCommentService()

const {data: users, pending: usersPending} = useAsyncData('users', () => getAllUsers().then(res => res.users) , {
  lazy: true
})

const {data: posts, pending: postsPending} = useAsyncData('posts', () => getAllPosts().then(res => res.posts) , {
  lazy: true
})

const {data: comments, pending: commentsPending} = useAsyncData('comments', () => getAllComments().then(res => res.comments) , {
  lazy: true
})

const pending = computed(() => usersPending.value || postsPending.value || commentsPending.value);
</script>

<template>
  <div v-loading="pending" class="container mx-auto">
    <el-empty v-if="!users || !posts || !comments" description="Data not found"/>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <el-card shadow="never">
        <el-statistic title="Users" :value="users.length" />
      </el-card>
      <el-card shadow="never">
        <el-statistic title="Posts" :value="posts.length" />
      </el-card>
      <el-card shadow="never">
        <el-statistic title="Comments" :value="comments.length" />
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>