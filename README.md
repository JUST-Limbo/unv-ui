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

**当`省`切换时，你不需要再组织代码来重置`市 区`的选择结果和对应的选项数组。`UvArea`会帮你做这些事。**

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
+  指定选项的值为选项对象的某个属性值 

## todo

+ UvSelect
+ v-form
+ changelog
