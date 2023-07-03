import UvDialogFn from "./src/dialog"

export default {
	install: function (Vue) {
		const $UvDialog = UvDialogFn(Vue)
		window.UvDialog = $UvDialog
		Vue.prototype.$UvDialog = UvDialogFn(Vue)
	}
}
