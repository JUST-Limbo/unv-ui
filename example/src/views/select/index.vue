<template>
    <div>
        <!-- e.g.1 -->
        <div>{{ selectedValue }}</div>
        <UvSelect v-model="selectedValue">
            <SelectOption1 v-for="item in tableData" :key="item.id" :value="item.id" v-bind="item"></SelectOption1>
        </UvSelect>
        <!-- e.g.2 -->
        <div>{{ selectedValue2 }}</div>
        <UvSelect v-model="selectedValue2" multiple>
            <SelectOption2 v-for="item in tableData" :key="item.id" :value="item.id" v-bind="item"></SelectOption2>
        </UvSelect>
    </div>
</template>

<script>
import SelectOption1 from './SelectOption1.vue';
import SelectOption2 from './SelectOption2.vue';

export default {
    components: {
        SelectOption1,
        SelectOption2,
    },
    data() {
        return {
            selectedValue: '',
            selectedValue2: '',
            tableData: [
                {
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
            ],
        };
    },
};
</script>
