import UvArea from './area';
import UvSelect from './select';
import UvDialog from './dialogView'

const components = {
    UvArea,
    UvSelect,
};

const plugins = {
	UvDialog
}

export default {
    install(Vue) {
        Object.entries(components).forEach(([k, v]) => {
            Vue.component(v.name || k, v);
        });
        Object.entries(plugins).forEach(([k, v]) => {
			Vue.use(v)
		})
    },
};
