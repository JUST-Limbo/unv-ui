import UvDialogFn from "./src/dialog"

export default {
	install: function (Vue) {
		Vue.prototype.$UvDialog = UvDialogFn(Vue)
	}
}
