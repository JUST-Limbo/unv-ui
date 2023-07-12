# unv-ui

## Introduce

`unv-ui`并不是一个严格意义上的`UI`组件库，它更像是一个工具库。它也包含一些公共的指令，比如`v-form`。

它的很多组件实际上并没有任何样式，比如`UvSelect`、`UvArea`只是做了数据的兼容层。

**为什么要做数据兼容层组件，而不是做一个带有UI样式的完全体组件？**

因为在很多toc的页面中，UI的样式是要靠自己实现的，但是很多通用的功能写到具体的组件中难以维护。

比如我想要一个省市区选择器：它可以是弹窗形式，也可以是并列三连的选择器，也可以是级联选择器。从功能上讲他们都是省市区选择器，然而他们的UI是不同的。数据兼容层组件可以让开发者可以更专注实现组件的视图部分。

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

`UvArea`只做数据层兼容，你可以使用任何组件选择器来配合`UvArea`（比如`el-select`、`a-select`或自己实现的选择器）。

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

### UvDialog

函数式弹窗，将`Vue`组件赋值给参数`view`，调用`show`可以拉起一个弹窗，弹窗的内容是`view`传入的`Vue`组件内容。

组织弹窗功能时，你不再需要导入一个`弹窗.vue`组件，在`components`声明然后再在`template`模板中使用`<弹窗></弹窗>`；更不需要声明一个`isShow`来控制弹窗的开关。

你只需要专注弹窗的内容组件实现即可，这使我们的业务代码的内聚性更高。

**Usage**

```vue
<template>
	<div>
		<div><button @click="showDialog">showDialog</button></div>
	</div>
</template>

<script>
import dialogContent from "./cmp/dialogContent.vue"
export default {
	name: "dialogtest",
	methods: {
		showDialog() {
			const $UvDialog = this.$UvDialog
      // 或 new UvDialog
			new $UvDialog(
				{
					view: dialogContent,
					router: this.$router,
					store: this.$store
				},
				{
					originPage: "dialogTest",
					onConfirm: (data) => {
						console.log("onConfirm", data)
					}
				}
			).show()
		}
	}
}
</script>

```

**dialogContent**

```vue
<template>
	<div class="dialog-content">
		<div>{{ originPage }}</div>
		<div>
			<div>{{ msg }}</div>
			<el-input v-model="msg" placeholder="请输入内容"></el-input>
			<div style="text-align: right">
				<el-button type="primary" @click="printRoute"> 输出$route $store </el-button>
				<el-button @click="close">取消</el-button>
				<el-button type="primary" @click="confirm">确认</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "dialogContent",
	data() {
		return {
			msg: "123"
		}
	},
	methods: {
		close() {
			this.$emit("hide")
		},
		printRoute() {
			console.log(this.$route)
			console.log(this.$router)
			console.log(this.$store)
		},
		confirm() {
			this.onConfirm && this.onConfirm(this.msg)
			this.close()
		}
	}
}
</script>

<style>
.dialog-content {
	width: 500px;
	height: 300px;
	background: white;
}
</style>

```

**Parameter Type**

```js
new UvDialog({view,router,store},cfg)
```

| 参数   | 说明                                                         | 类型         | 默认值 |
| ------ | ------------------------------------------------------------ | ------------ | ------ |
| view   | 弹窗的内容组件                                               | VueComponent |        |
| router | 路由器，如果你需要在`view`中访问路由，那么该参数必填，router:this.$router | VueRouter    |        |
| store  | 状态管理器，如果你需要在`view`中访问`Vuex`的状态，那么该参数必填，store:this.$store | Store        |        |
| cfg    | 额外的参数，这相当于给`view`组件加一个`mixin`，你可以在`view`组件中通过`this`访问到`cfg`的内容，通常用来传递回调事件或者传入初始参数。 | Any          |        |

**todo**

+ 支持挂载到指定的DOM，而不是只挂载`document.body`
+ show支持promise
+ 略去router和store配置

### UvCountDown

倒计时

```vue
<template>
	<div>
		<el-button type="primary" @click="flag = !flag">toggle</el-button>
		<UvCountDown :value="futureDeadline" v-if="flag">
			<template #default="{ d, h, m, s }">
				{{ d }}
				{{ h }}
				{{ m }}
				{{ s }}
			</template>
		</UvCountDown>
		<keepAlive>
			<UvCountDown :value="lastDeadline" v-if="flag">
				<template #default="{ d, h, m, s }">
					{{ d }}
					{{ h }}
					{{ m }}
					{{ s }}
				</template>
			</UvCountDown>
		</keepAlive>
	</div>
</template>

<script>
export default {
	data() {
		return {
			futureDeadline: Date.now() + 1000 * 60 * 70,
			lastDeadline: Date.now() - 1000 * 60 * 60,
			flag: true
		}
	}
}
</script>

```

**CountDown Attributes**

| 参数        | 说明                                                         | 类型               | 可选值     | 默认值 |
| ----------- | ------------------------------------------------------------ | ------------------ | ---------- | ------ |
| value       | 确定的时间点，必填，支持Date对象/毫秒数/YYYY-MM-DD hh:mm:ss三种格式 | Date/Number/String |            |        |
| timeIndices | 是否开启倒计时功能                                           | Boolean            | true/false | true   |

**CountDown Event**

| 事件名 | 说明                                             | 回调参数 |
| ------ | ------------------------------------------------ | -------- |
| start  | 开始倒计时，在mounted、activated阶段触发         |          |
| pause  | 暂停倒计时，在deactivated、beforeDestroy阶段触发 |          |
| end    | 倒计时结束，达到目标时间                         |          |

**CountDown Methods**

| 参数           | 说明       |      |
| -------------- | ---------- | ---- |
| startCountDown | 开始倒计时 |      |
| pauseCountDown | 暂停倒计时 |      |

**todo**

+ 目前修改value的值会让暂停状态下的CountDown启动倒计时，这或许是个bug

## todo

+ v-form
+ changelog
