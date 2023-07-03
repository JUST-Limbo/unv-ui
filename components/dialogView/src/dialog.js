import DialogView from "./main.vue"
import "./v-modal.css"

export default function (Vue) {
	return class UvDialog {
		constructor({ view, router, store }, cfg) {
			this.dialog = new (Vue.extend(DialogView))({
				router,
				store
			})
			Object.assign(this.dialog, cfg)
			this.dialog.currentView = {
				mixins: [view],
				data() {
					cfg = cfg || {}
					return cfg
				}
			}
			this.dialog.$mount()
		}

		show() {
			this.dialog.show()
		}
		hide() {
			this.dialog.hide()
		}
	}
}
