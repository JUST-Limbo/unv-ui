<template>
    <div class="item" @click="selectAddress" :class="{ active }">
        <div>{{ date }}</div>
        <div>{{ name }}</div>
        <div>{{ address }}</div>
    </div>
</template>

<script>
export default {
    name: 'SelectOption1',
    inheritAttrs: false,
    inject: ['$Selector'],
    model: {
        prop: 'value',
        event: 'select',
    },
    props: {
        value: [String, Number],
        data: Array,
        date: {},
        name: {},
        address: {},
    },
    computed: {
        active() {
            return this.$Selector.calcOptActive(this.value);
        },
    },
    methods: {
        selectAddress() {
            this.$Selector.optSelect({ value: this.value });
        },
    },
};
</script>

<style lang="scss" scoped>
.item {
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    width: 178px;
    height: 178px;
    border-radius: 6px;
    margin-left: 6px;
    &.active {
        background-color: #409eff;
    }
}
</style>
