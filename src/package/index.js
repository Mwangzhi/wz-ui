
import Button from './button.vue';
import Icon from './icon.vue';
import ButtonGroup from './button-group.vue';
import Row from './layout/row.vue';
import Col from './layout/col.vue';
import Upload from './upload/upload.vue';


const install = (Vue) => {
    Vue.component(Button.name, Button);
    Vue.component(Icon.name, Icon);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Upload.name, Upload);


}
if (typeof window.Vue !== 'undefined') {
    install(Vue);
}
export default { install }



