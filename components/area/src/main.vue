<template>
    <div>
        <slot name="province" :options="province_list"></slot>
        <slot name="city" :options="city_list"></slot>
        <slot name="area" :options="area_list"></slot>
    </div>
</template>

<script>
import { areaList, cascaderAreaData } from './areaData';
export default {
    name: 'UvArea',
    props: ['value'],
    data() {
        return {
            province_list: cascaderAreaData,
        };
    },
    computed: {
        city_list() {
            const curProvinceCode = this.value.p;
            const province = cascaderAreaData.find((item) => {
                return item.value == curProvinceCode;
            });
            return province ? province.children : [];
        },
        area_list() {
            const curCityCode = this.value.c;
            const city = this.city_list.find((item) => {
                return item.value == curCityCode;
            });
            return city ? city.children : [];
        },
    },
    watch: {
        'value.p': function (val, oldVal) {
            this.$emit('input', {
                p: val,
                c: '',
                a: '',
            });
            this.$emit('provinceChange', val);
            this.$emit('change', {
                p: val,
                c: '',
                a: '',
            });
        },
        'value.c': function (val, oldVal) {
            this.$emit('input', {
                p: this.value.p,
                c: val,
                a: '',
            });
            this.$emit('cityChange', val);
            this.$emit('change', {
                p: this.value.p,
                c: val,
                a: '',
            });
        },
        'value.a': function (val, oldVal) {
            this.$emit('areaChange', val);
            this.$emit('change', {
                p: this.value.p,
                c: this.value.c,
                a: val,
            });
        },
    },
    methods: {
        // public method
        getText() {
            const pText = areaList.province_list[this.value.p] || '';
            const cText = areaList.city_list[this.value.c] || '';
            const aText = areaList.county_list[this.value.a] || '';
            return {
                p: pText,
                c: cText,
                a: aText,
            };
        },
    },
};
</script>

<style></style>
