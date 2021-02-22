import CmbTest from '../src/test.vue'
 
export default {
  title:'CmbTest',
  component:CmbTest
}
 
export const Test = () => ({
  components: { 
    CmbTest
  },
  template: '<div><cmb-test></cmb-test></div>'
})