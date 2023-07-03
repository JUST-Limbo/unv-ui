<template>
	<div class="dialog-view" :class="classes">
		<component :is="currentView" @hide="hide" @show="show" ref="content"></component>
	</div>
</template>

<script>
function getModalDom() {
	const modalDom = document.createElement("div")
	modalDom.className = "v-modal"
	modalDom.style.zIndex = 2000
	return modalDom
}

export default {
	name: "UvDialogView",
	data() {
		return {
			currentView: null,
			classes: [],
			modalDom: null
		}
	},
	methods: {
		show() {
			document.body.appendChild(this.$el)
			this.modalDom = getModalDom()
			document.body.appendChild(this.modalDom)
		},
		hide() {
			document.body.removeChild(this.modalDom)
			this.modalDom = null
			this.$destroy()
			document.body.removeChild(this.$el)
		}
	}
}
</script>

<style lang="scss">
.dialog-view {
	position: absolute;
	z-index: 2001;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
