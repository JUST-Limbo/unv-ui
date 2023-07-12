<template>
	<div>
		<el-button type="primary" @click="flag = !flag">toggle</el-button>
		<UvCountDown :value="deadline" v-if="flag">
			<template #default="{ d, h, m, s }">
				{{ d }}
				{{ h }}
				{{ m }}
				{{ s }}
			</template>
		</UvCountDown>
		<UvCountDown :value="deadline1" v-if="flag">
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
			deadline: Date.now() + 1000 * 60 * 1,
			deadline1: Date.now() + 1000 * 60 * 60 * 8 + 7000,
			flag: true
		}
	}
}
</script>
