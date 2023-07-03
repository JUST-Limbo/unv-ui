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

<style></style>
