import TestCmp from './testcmp';

const components = {
    TestCmp,
};

export default {
    install(Vue) {
        Object.entries(components).forEach(([k, v]) => {
            Vue.component(v.name || k, v);
        });
    },
};
