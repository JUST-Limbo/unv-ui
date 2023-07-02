# unv-ui

## Introduce

`unv-ui`并不是一个严格意义上的`UI`库，它更像是一个工具库。

它的部分组件实际上并没有任何样式，比如`UvSelect`、`UvArea`只是做了数据的兼容层。

它也包含一些公共的指令，比如`v-form`。

## Links

[unv-ui - npm (npmjs.com)](https://www.npmjs.com/package/unv-ui)

[unv-ui - github(github.com)](https://github.com/JUST-Limbo/unv-ui)

## Requirements

|      | Minimum |
| ---- | ------- |
| Vue  | 2.6.14  |

## Install

```bash
npm install unv-ui
```

## Quick Start

```js
import Vue from 'vue'
import UnvUi from 'unv-ui'
Vue.use(UnvUi)
```

## Docs

### UvArea

省市区选择器，数据兼容层，你可以使用任意基于`v-model`的选择器组件传入到具名插槽中。

当`省`切换时，你**不再需要**组织代码来重置`市 区`的选择结果和对应的选项数组。`UvArea`会帮你做这些事。

你只需要关注`省市区`单个选择器组件的实现。

> `UvArea`的行政区划数据来自[`@/vant/area-data`](https://github.com/youzan/vant/tree/main/packages/vant-area-data)。

**Usage**

```vue
<template>
    <UvArea v-model="pca">
        <template #province="{ options }">
            <el-select v-model="pca.p">
                <el-option v-for="{ text, value } in options" :key="value" :label="text" :value="value"> </el-option>
            </el-select>
        </template>
        <template #city="{ options }">
            <el-select v-model="pca.c">
                <el-option v-for="{ text, value } in options" :key="value" :label="text" :value="value"> </el-option>
            </el-select>
        </template>
        <template #area="{ options }">
            <el-select v-model="pca.a">
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
```

**todo**

+ 行政区划源数据支持自定义
+ 指定选项的值为选项对象的某个属性值



### UvSelect

选择器，数据兼容层。

你**不再需要**组织单选、多选的功能代码，也不需要关注选中结果的收集，`UvSelect`会帮你做这些事。

你只需要专注`option`选项组件的实现。

**Usage**

```vue
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

```

**SelectOption1**

注意`inject`

```vue
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

```

**Select Attributes**

| 参数          | 说明         | 类型                | 可选值 | 默认值 |
| ------------- | ------------ | ------------------- | ------ | ------ |
| value/v-model | 绑定值，必填 | string/number/Array |        |        |
| multiple      | 多选         | boolean             |        | false  |

**Select Provide**

| 参数      | 说明             |
| --------- | ---------------- |
| $Selector | UvSelect实例对象 |

**Select Methods**

| 参数          | 说明                                                         |              |
| ------------- | ------------------------------------------------------------ | ------------ |
| optSelect     | 用于修改UvSelect的值。如果multiple为true，既能用来选中也能用来取消选中某个option | {value:'xx'} |
| calcOptActive | 用于表示当前option的值是否被选中                             | value        |

```js
computed: {
    active() {
        return this.$Selector.calcOptActive(this.value);
    },
},
methods: {
    curOptionSelect() {
        this.$Selector.optSelect({ value: this.value });
    },
},
```



## todo

+ v-form
+ UvDialogView
+ changelog
