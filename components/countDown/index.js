import UvCountDown from "./src/main.vue"

UvCountDown.install = function (Vue) {
	Vue.component(UvCountDown.name, UvCountDown)
}

export default UvCountDown
