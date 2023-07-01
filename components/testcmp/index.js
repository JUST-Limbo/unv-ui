import TestCmp from './main.vue';

TestCmp.install = function (Vue) {
    Vue.component(TestCmp.name, TestCmp);
};

export default TestCmp;
