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
