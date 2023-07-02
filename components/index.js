import UvArea from './area';

const components = {
    UvArea,
};

export default {
    install(Vue) {
        Object.entries(components).forEach(([k, v]) => {
            Vue.component(v.name || k, v);
        });
    },
};
