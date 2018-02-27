<style lang="scss" scoped>
  $blue-color:#20A0FF;/*蓝色*/
  $red-color:#ff4949;/*红色*/
  $menu-bg-cur:#E5E9F2;/*选中颜色*/
  $menu-item-cur:#e3e3e3;/*选中的菜单的背景色*/
  $menu-item-border-color:#ddd;/*菜单项的边框色*/
  $menu-text-color:#333;/*二级菜单字体颜色*/
  $menu-arrow-color:#999;/*右箭头颜色*/
  $menu-link-color:#666;/*三级菜单字体颜色*/
  $menu-link-active-color:#20a0ff;/*三级菜单字体选中颜色*/
  .shrink-animate{transition:all .1s ease;}
  .side{width:190px;position:relative;z-index:9;}
  .side.shrink{width:60px;}
  .logo{overflow:hidden;}
  .logo.shrink{height:60px;}
  .menu-box{top:140px;left:0;right:0;bottom:0;overflow:auto;}
  .menu-box.shrink{overflow:visible;top:70px;}
  .menu-item{position:relative;}
  .menu-item .arrow{color:$menu-arrow-color}
  .menu-icon{width:26px;}
  .side-menu-title{height:45px;padding:0 20px;color:$menu-arrow-color}
  .side-menu-title:hover,.side-menu-title.cur{color:$menu-text-color;background:$menu-bg-cur;}
  .side-menu-name{margin-left:8px;height:45px;display: block;overflow:hidden;line-height:45px;}
  .side-menu-icon{width:20px;height:40px;}
  .submenu{overflow:hidden;position: relative;top:0;left:0;}
  .submenu-link{display: block;height:35px;line-height:35px;padding:0 20px 0 48px;color:$menu-link-color;font-size:12px;}
  .submenu-link:hover,.submenu-link.cur{color:$menu-link-active-color;}
  .submenu.shrink{position:absolute;left:60px;top:0;background:$menu-bg-cur;}
  .submenu.shrink .submenu-link{padding:0 20px;}
  .header{height:60px;padding-right:20px;}
  .toggle-icon{width:60px;height:60px;}
  .toggle-icon i{font-size:24px;}
  .avatar{width:30px;height:30px;border-radius:100%;margin-right:8px;}
  .power-off{margin-left:20px;}
  .power-off i{font-size:20px;}
  .content{top:60px;left:0;right:0;bottom:0;overflow-y:auto;box-sizing: border-box;padding:20px 20px 0 20px;border-radius:10px 0 0 0; background:#fff;}
  .slide-fade-enter-active {transition: all .3s ease;}
  .slide-fade-leave-active {transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
  .slide-fade-enter, .slide-fade-leave-active {transform: translateX(10px);opacity: 0;}
  .logo-normal {width:100%;height:140px;background:url(../assets/images/logo-small.png) no-repeat center;}
  .logo-shrink {width:48px;height:48px;background:url(../assets/images/logo-shrink.jpg) no-repeat center;}
</style>
<template>
  <div class="flex full-height" style="background:#eff4f8;min-width: 1200px;">
    <div class="side full-height relative shrink-animate" :class="{'shrink':shrink}">
      <router-link to="/" class="logo flex flex-center shrink-animate" :class="{'shrink':shrink}">
        <!--<img src="https://misc.360buyimg.com/mtd/pc/index/home/images/logo.v2.png" v-if="!shrink">-->
        <!--<img src="https://st.360buyimg.com/m/images/index/top-jdlogo.png" v-if="shrink" width="40" height="40">-->
        <div class="logo-normal flex flex-align-center flex-justify-center" v-if="!shrink"></div>
        <div class="logo-shrink" v-if="shrink"></div>
      </router-link>
      <div class="menu-box absolute shrink-animate" :class="{'shrink':shrink}">
        <ul>
          <li class="menu-item" v-for="m in sideMenu" :title="m.name">
            <div @click="toggleSubMenu(m.id,m.link)" class="side-menu-title flex flex-align-center flex-justify-between pointer" :class="{'cur':m.id==active.lv2||m.id==currentLevel2}">
              <div class="flex flex-align-center">
                <div class="side-menu-icon flex flex-center">
                  <i :class="['fa','font-14','fa-'+m.icon]"></i>
                </div>
                <span class="font-14 side-menu-name" v-if="!shrink">{{m.name}}</span>
              </div>
              <i class="fa fa-angle-right arrow font-18 shrink-animate" :style="{transform:currentLevel2==m.id?'rotate(90deg)':''}" v-if="m.children.length>0&&!shrink"></i>
            </div>
            <div class="submenu shrink-animate" :class="{'shrink':shrink}" :style="{height:currentLevel2==m.id?m.children.length*35+'px':0,padding:currentLevel2==m.id?'6px 0':0}" v-if="m.children.length>0">
              <router-link :to="s.link" class="submenu-link ellipsis" :class="{'cur':s.link==currentPath}"v-for="(s,index) in m.children" :key="index">{{s.name}}</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="main flex-child-grow relative">
      <div class="header flex flex-justify-between">
        <div class="left-side flex flex-align-center">
          <a href="javascript:;" @click="toggleShrink" class="toggle-icon flex flex-center">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
          <el-dropdown @command="setMenu" menu-align="start">
            <span class="font-16 pointer">{{currentMenuName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="font-14" v-for="(m,index) in menu" :key="index" :command="m.id.toString()"><i class="menu-icon" :class="['fa','font-14','fa-'+m.icon]"></i>{{m.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="right-side flex flex-justify-between flex-align-center">
          <!-- <div class="flex flex-center">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3199570665,3091940154&fm=11&gp=0.jpg" class="avatar">
            <span>dongnaebi</span>
          </div>
          <a href="javascript:;" class="power-off">
            <i class="fa fa-power-off red"></i>
          </a> -->
        </div>
      </div>
      <div class="content absolute">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        shrink: false,
        sideMenu: [],
        active: {
          lv1: 0,
          lv2: 0,
          lv3: 0
        },
        currentLevel2: 0,
        currentMenuName: '菜单',
        currentPath: '/',
        menu: [
          {
            id: 1,
            icon: 'file-code-o',
            link: '',
            name: '页面管理',
            children: [
              {
                id: 22,
                icon: 'home',
                link: '/',
                name: '首页',
                children: []
              },
              {
                id: 2,
                icon: 'file-code-o',
                link: '',
                name: '首页管理',
                children: [
                  {
                    id: 6,
                    icon: 'user-o',
                    link: '/pageManagement/mAndApp',
                    name: 'APP&M版首页管理',
                    children: [
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 7,
            icon: 'cog',
            link: '',
            name: '系统设置',
            children: [
              {
                id: 8,
                icon: 'list',
                link: '',
                name: '菜单管理',
                children: [
                  {
                    id: 9,
                    icon: '',
                    link: '/system/menu',
                    name: '菜单管理',
                    children: [
                    ]
                  }
                ]
              },
              {
                id: 10,
                icon: 'user-o',
                link: '',
                name: '权限管理',
                children: [
                  {
                    id: 11,
                    icon: 'user-o',
                    link: '/order/shuihsou',
                    name: '角色管理',
                    children: [
                    ]
                  },
                  {
                    id: 12,
                    icon: 'user-o',
                    link: '/order/shuihsou',
                    name: '用户管理',
                    children: [
                    ]
                  },
                  {
                    id: 13,
                    icon: 'user-o',
                    link: '/order/shuihsou',
                    name: '用户权限管理',
                    children: [
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 14,
            icon: 'support',
            link: '',
            name: '活动管理',
            children: [
              {
                id: 15,
                icon: 'sun-o',
                link: '/activity/topic/list',
                name: '专题活动模板',
                children: []
              }
            ]
          }
        ]
      }
    },
    created () {
      this.currentPath = this.$route.path
      this.loadMenu()
      // this.fetchMenuData()
    },
    watch: {
      '$route' (to, from) {
        this.currentPath = to.path
        this.loadMenu()
      }
    },
    methods: {
      loadMenu () {
        const self = this
        const path = self.currentPath
        self.menu.forEach(lv1 => {
          if (lv1.link === path) {
            self.active.lv1 = lv1.id
            self.active.lv2 = 0
            self.active.lv3 = 0
          }
          lv1.children.forEach(lv2 => {
            if (lv2.link === path) {
              self.currentMenuName = lv1.name
              self.sideMenu = lv1.children
              self.active.lv1 = lv1.id
              self.active.lv2 = lv2.id
              self.active.lv3 = 0
              self.currentLevel2 = lv2.id
            }
            lv2.children.forEach(lv3 => {
              if (path.indexOf(lv3.link) > -1) {
                self.currentMenuName = lv1.name
                self.currentPath = lv3.link
                self.sideMenu = lv1.children
                self.active.lv1 = lv1.id
                self.active.lv2 = lv2.id
                self.active.lv3 = lv3.id
                self.currentLevel2 = lv2.id
              }
            })
          })
        })
        if (self.shrink) {
          self.currentLevel2 = 0
        }
        if (self.sideMenu.length === 0) {
          self.sideMenu = self.menu[0].children
        }
      },
      setMenu (id) {
        const self = this
        self.menu.forEach(item => {
          if (item.id === parseInt(id)) {
            self.active.lv1 = id
            self.sideMenu = item.children
            self.currentMenuName = item.name
            if (item.link) {
              self.$router.push(item.link)
            }
          }
        })
      },
      toggleSubMenu (id, link) {
        const self = this
        if (self.currentLevel2 === id) {
          self.currentLevel2 = 0
        } else {
          self.currentLevel2 = id
        }
        if (link) {
          self.$router.push(link)
        }
      },
      toggleShrink () {
        this.shrink = !this.shrink
      },
      fetchMenuData () {
        // 从服务端获取菜单
        let self = this
        self.$api.common.getMenu().then(res => {
          if (res.code === 0) {
            let data = res.data
            self.menu = data
            self.loadMenu()
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('获取菜单数据失败' + err)
        })
      }
    }
  }
</script>
