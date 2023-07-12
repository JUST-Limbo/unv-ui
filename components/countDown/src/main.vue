<template>
	<div>
		<slot
			v-bind="{
				d,
				h,
				m,
				s
			}"
		></slot>
	</div>
</template>

<script>
function getTimeDuration(futureTime) {
	const currentTime = new Date()
	let futureDateTime

	if (futureTime instanceof Date) {
		futureDateTime = futureTime
	} else if (typeof futureTime === "number") {
		futureDateTime = new Date(futureTime)
	} else if (typeof futureTime === "string") {
		futureDateTime = new Date(futureTime)
	} else {
		return { d: 0, h: 0, m: 0, s: 0 }
	}

	const timeDiff = futureDateTime - currentTime
	// 如果为过去的时间，则返回全为 0 的时长对象
	if (timeDiff < 0) {
		return { d: 0, h: 0, m: 0, s: 0 }
	}

	const seconds = Math.floor(timeDiff / 1000)

	const days = Math.floor(seconds / (60 * 60 * 24))
	const hours = Math.floor(seconds / (60 * 60)) % 24
	const minutes = Math.floor(seconds / 60) % 60
	const remainingSeconds = seconds % 60

	return { d: days, h: hours, m: minutes, s: remainingSeconds }
}

export default {
	name: "UvCountDown",
	props: {
		// 是否开启倒计时功能
		timeIndices: {
			type: Boolean,
			default: true
		},
		value: {
			type: [String, Date, Number],
			default: () => ""
		}
	},
	data() {
		return {
			rafId: "",
			d: "",
			h: "",
			m: "",
			s: ""
		}
	},
	activated() {
		this.startCountDown()
	},
	deactivated() {
		this.pauseCountDown()
	},
	mounted() {
		this.startCountDown()
	},
	watch: {
		value() {
			this.startCountDown()
		}
	},
	beforeDestroy() {
		this.pauseCountDown()
	},
	methods: {
		startCountDown() {
			this.pauseCountDown()
			this.continuouslyCalculate(this.value)
			this.$emit("start")
		},
		pauseCountDown() {
			window.cancelAnimationFrame(this.rafId)
			this.rafId = ""
			this.$emit("pause")
		},
		continuouslyCalculate(futureTime) {
			const remainingTime = getTimeDuration(futureTime)
			this.d = remainingTime.d
			this.h = remainingTime.h
			this.m = remainingTime.m
			this.s = remainingTime.s

			if (remainingTime.d === 0 && remainingTime.h === 0 && remainingTime.m === 0 && remainingTime.s === 0) {
				// 达到目标时间，停止递归
				this.$emit("end")
				this.rafId = ""
				return
			}

			this.rafId = requestAnimationFrame(() => this.continuouslyCalculate(futureTime))
		}
	}
}
</script>
