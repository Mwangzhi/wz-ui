import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

import Button from '@/package/button.vue'
import Icon from '@/package/icon.vue'

describe('button.vue', () => {
    it('1.测试1+1', () => {
        expect(1 + 1).to.eq(2)
    })
    it('1.测试button能否正常显示', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'wz-ui'
            }
        });
        expect(wrapper.text()).to.eq('wz-ui')
    })
    it('2.测试icon传入是否能正常显示', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'wz-icon': Icon
            },
            propsData: {
                icon: 'edit'
            }
        });
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-edit');
    })
    it('3.测试loading时，按钮是禁用状态', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'wz-icon': Icon
            },
            propsData: {
                loading: true
            }
        });
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading');
        expect(wrapper.find('button').attributes('disabled')).to.eq('disabled');
    })
    it('4.测试按钮能否正常点击', () => {
        const wrapper = shallowMount(Button, {
            // stubs: ['wz-icon']
        })
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted('click').length).to.eq(1);
    })
    it('5.按钮传入position是否正常显示', () => {
        const wrapper = shallowMount(Button, {
            attachToDocument: true,//将组件挂在到浏览器上
            stubs: {
                'wz-icon': Icon
            },
            slots: {
                default: 'wz-ui'
            },
            propsData: {
                iconPosition: 'left',
                icon: 'edit'
            }
        });
        let ele = wrapper.vm.$el.querySelector('span');
        expect(getComputedStyle(ele).order).to.eq('2');
        wrapper.setProps({ iconPosition: 'right' });//设置props，必须要在下一个事件环去取值
        return wrapper.vm.$nextTick().then(() => {
            expect(getComputedStyle(ele).order).to.eq('1');
        });
    })
})



