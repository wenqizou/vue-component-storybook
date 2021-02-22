import CmbButton from '../src/button.vue'
 
export default {
  title:'CmbButton',
  component:CmbButton
}
 
export const Button = () => ({
  components: { 
    CmbButton
  },
  template: '<div><cmb-button></cmb-button></div>'
})