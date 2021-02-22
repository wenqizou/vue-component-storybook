import CmbTest from './src/test.vue'
 
CmbTest.install = (Vue) => {
  Vue.component(CmbTest.name, CmbTest)
}
 
export default CmbTest