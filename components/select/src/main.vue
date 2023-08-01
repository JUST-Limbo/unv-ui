<script>
export default {
    name: 'UvSelect',
    inheritAttrs: false,
    props: {
        tag:{
            type:String,
            default:'div'
        },
        value: {
            required: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    provide() {
        return {
            $Selector: this,
        };
    },
    render(h){
        return h(this.tag,this.$slots.default)
    },
    created() {
        if (this.multiple && !Array.isArray(this.value)) {
            this.$emit('input', []);
        }
        if (!this.multiple && Array.isArray(this.value)) {
            this.$emit('input', '');
        }
    },
    methods: {
        optSelect(option) {
            if (this.multiple) {
                const targetIndex = this.value.indexOf(option.value);
                const valueClone = this.value.slice();
                if (targetIndex > -1) {
                    valueClone.splice(targetIndex, 1);
                } else {
                    valueClone.push(option.value);
                }
                this.$emit('input', valueClone);
            } else {
                this.$emit('input', option.value);
            }
        },
        calcOptActive(itemValue) {
            if (this.multiple) {
                return this.value.includes(itemValue);
            } else {
                return this.value == itemValue;
            }
        },
    },
};
</script>
