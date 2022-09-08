<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ComputedRef } from 'vue'

const store = useStore()

const searchHistoryArr: ComputedRef = computed(() => store.state.search.data.searchHistory)

</script>

<template>
    <div class="searchHistoryWrap">
        <h3>搜索历史：</h3>
        <span class="searchHistoryWord" v-for="item in searchHistoryArr" :key="item">
            {{ item }}
        </span>
    </div>
</template>

<style scoped lang="less">
.searchHistoryWrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    h2 {
        margin: 5px 5px;
    }

    .searchHistoryWord {
        border: 1px solid black;
        border-radius: 27%/54%;
        padding: 0 5px;
        margin: 5px 5px;
    }
}
</style>
