<template>
	<div>
		<el-button type="primary" @click="flag = !flag">toggle</el-button>
        <h3>未来的时间</h3>
		<UvCountDown :value="futureDeadline" v-if="flag">
			<template #default="{ d, h, m, s }">
				{{ d }}
				{{ h }}
				{{ m }}
				{{ s }}
			</template>
		</UvCountDown>
        <h3>过去的时间</h3>
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
        <h3>支持tag属性</h3>
		<UvCountDown tag="span" :value="futureDeadline" v-if="flag">
			<template #default="{ d, h, m, s }">
				{{ d }}
				{{ h }}
				{{ m }}
				{{ s }}
			</template>
		</UvCountDown>
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
