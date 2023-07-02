import UvArea from './area';
import UvSelect from './select';

const components = {
    UvArea,
    UvSelect,
};

export default {
    install(Vue) {
        Object.entries(components).forEach(([k, v]) => {
            Vue.component(v.name || k, v);
        });
    },
};
