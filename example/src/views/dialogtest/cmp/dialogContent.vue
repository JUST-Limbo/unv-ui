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
