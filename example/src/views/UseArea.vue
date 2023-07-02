<template>
    <UvArea v-model="pca">
        <template #province="{ options }">
            <el-select v-model="pca.p" placeholder="请选择">
                <el-option v-for="{ text, value } in options" :key="value" :label="text" :value="value"> </el-option>
            </el-select>
        </template>
        <template #city="{ options }">
            <el-select v-model="pca.c" placeholder="请选择">
                <el-option v-for="{ text, value } in options" :key="value" :label="text" :value="value"> </el-option>
            </el-select>
        </template>
        <template #area="{ options }">
            <el-select v-model="pca.a" placeholder="请选择">
                <el-option v-for="{ text, value } in options" :key="value" :label="text" :value="value"> </el-option>
            </el-select>
        </template>
    </UvArea>
</template>

<script>
export default {
    name: 'UseArea',
    data() {
        return {
            pca: {
                p: '',
                c: '',
                a: '',
            },
        };
    },
};
</script>
