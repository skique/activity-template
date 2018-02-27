
function load (component) {
    return () => import(`../pages/${component}.vue`)
}
export default [
  {
    path: '/m/activity/:id',
    component: load('m/activity/index'),
    meta: {title: '活动'}
  }
]