<template>
  <div class="page-topic">
    <!-- 可视化编辑区域 -->
    <div class="content edit-mode" :class="platform=='pc'?'content-pc':'content-m'" :style="{marginLeft: isShowEdit?'300px':'0px', paddingTop: windowMaximize?'0':''}">
      <template v-for="(fl, index) in floors">
        <!-- sticky楼层 -->
        <sticky v-if="fl.type=='sticky'" class="topic-floor" :key="fl.id" @click="activeNames=fl.id">
          <div :style="{height: fl.height + 'px',backgroundColor: fl.bgcolor,backgroundImage:'url('+fl.bgimg+')',backgroundPosition:fl.bgposition,backgroundRepeat:'no-repeat', backgroundSize: 'cover'}" style="z-index: 20;">
            <div class="floor-wrapper" :class="{'fullpage': isFullpage}">
              <vue-draggable-resizable class="layer" :class="{'layer-edit': fl.id==editFloorId&&layer.id==editLayer.id}" v-for="(layer, index) in fl.layer" 
              :key="index" :w="layer.width" 
              :h="layer.height" 
              :minw="10" 
              :minh="10" 
              :x="layer.left" 
              :y="layer.top" 
              :parent="true" 
              @dragging="onDragLayer"
              @resizing="onResizeLayer"
              @activated="onActivateLayer(fl.id, layer)"
              :ref="'layer'+fl.id+layer.id">
                <div class="layer-inner"
                :data-floorId="fl.id"
                :data-layerId="layer.id"
                :class="[(fl.appearAni && layer.effect.length > 0) ? layer.effect : '']"
                :style="{color: layer.color, borderRadius: layer.layerRadius + 'px', borderWidth: layer.borderWidth + 'px', borderColor: layer.borderColor, borderStyle: layer.borderStyle, opacity: layer.layerOpacity, 
                backgroundColor: layer.bgcolor, backgroundImage: 'url('+layer.bgimg+')', backgroundRepeat: 'no-repeat', fontSize: layer.fontsize + 'px', textAlign: layer.align, lineHeight: layer.lineheight + 'px',
                letterSpacing: layer.letterSpacing + 'px', fontWeight: layer.fontWeight, animationDuration: (layer.effect.length > 0 && layer.duration > 0) ? layer.duration+'s' : '',animationDelay:(layer.effect.length > 0 && layer.delay > 0) ? layer.delay+'s':'',animationIterationCount:layer.effect.length > 0 ? layer.iteration:''}">
                  <!-- text图层 -->
                  <template v-if="layer.type=='text'">
                    {{layer.content}}
                  </template>
                  <!-- html图层 -->
                  <template v-if="layer.type=='html'">
                    <div v-html="layer.content"></div>
                  </template>
                  <!-- 变量图层 -->
                  <template v-if="layer.type=='field'">{{layer.content}}</template>
                  <!-- 图片图层 -->
                  <template v-if="layer.type=='img'">
                    <img :src="layer.content" draggable="false" class="layer-image" />
                  </template>
                  <!-- 组件图层 -->
                  <template v-if="layer.type=='component'">
                    <!-- 选项卡 -->
                    <tab v-if="layer.component=='tab'"
                      :list="layer.tabConfig.btnList"
                      :bgcolor="layer.tabConfig.bgcolor"
                      :bgcolor-active="layer.tabConfig.bgcolorActive"
                      :color="layer.tabConfig.color"
                      :color-active="layer.tabConfig.colorActive"
                      :width="layer.tabConfig.btnWidth?layer.tabConfig.btnWidth:undefined"
                      :height="layer.tabConfig.btnHeight?layer.tabConfig.btnHeight:undefined"
                      :interval="layer.tabConfig.interval"
                      :change-way="layer.tabConfig.changeWay"
                      :fontsize="layer.tabConfig.fontsize?layer.tabConfig.fontsize:undefined">
                    </tab>
                  </template>
                </div>
              </vue-draggable-resizable>
            </div>
          </div>
        </sticky>
        <!-- 其他楼层 -->
        <div :key="fl.id" v-else class="topic-floor" :class="{'float-floor':fl.type=='float', 'appear': fl.hasAnimate}"
          @click="activeNames=fl.id"
          :style="{height: fl.height + 'px',backgroundColor: fl.bgcolor,backgroundImage:'url('+fl.bgimg+')',backgroundPosition:fl.bgposition,backgroundRepeat:'no-repeat',backgroundSize: 'cover', position: isFullpage?'relative':''}"
          @appear="handleAppear(fl.id)"
          @disappear="handleDisappear(fl.id)"
          >
          <div class="floor-wrapper" :class="{'fullpage': isFullpage}">
            <vue-draggable-resizable class="layer" :class="{'layer-edit': fl.id==editFloorId&&layer.id==editLayer.id}" v-for="(layer, index) in fl.layer" 
            :key="index" :w="layer.width" 
            :h="layer.height" 
            :minw="10" 
            :minh="10" 
            :x="layer.left" 
            :y="layer.top" 
            :parent="true" 
            @dragging="onDragLayer"
            @resizing="onResizeLayer"
            @activated="onActivateLayer(fl.id, layer)"
            @deactivated="onDeactivatedLayer"
            :ref="'layer'+fl.id+layer.id">
              <div class="layer-inner"
              :data-floorId="fl.id"
              :data-layerId="layer.id"
              :class="[(fl.appearAni && layer.effect.length > 0) ? layer.effect : '']"
              :style="{color: layer.color, borderRadius: layer.layerRadius + 'px', borderWidth: layer.borderWidth + 'px', borderColor: layer.borderColor, borderStyle: layer.borderStyle, opacity: layer.layerOpacity, 
              backgroundColor: layer.bgcolor, backgroundImage: 'url('+layer.bgimg+')', backgroundRepeat: 'no-repeat', fontSize: layer.fontsize + 'px', textAlign: layer.align, lineHeight: layer.lineheight + 'px',
              letterSpacing: layer.letterSpacing + 'px', fontWeight: layer.fontWeight, animationDuration: (layer.effect.length > 0 && layer.duration > 0) ? layer.duration+'s' : '',animationDelay:(layer.effect.length > 0 && layer.delay > 0) ? layer.delay+'s':'',animationIterationCount:layer.effect.length > 0 ? layer.iteration:''}">
                <!-- text图层 -->
                <template v-if="layer.type=='text'">
                  {{layer.content}}
                </template>
                <!-- html图层 -->
                <template v-if="layer.type=='html'">
                  <div v-html="layer.content"></div>
                </template>
                <!-- 变量图层 -->
                <template v-if="layer.type=='field'">{{layer.content}}</template>
                <!-- 图片图层 -->
                <template v-if="layer.type=='img'">
                  <img :src="layer.content" draggable="false" class="layer-image" />
                </template>
                <!-- 组件图层 -->
                <template v-if="layer.type=='component'">
                  <!-- 普通商品、抢购商品、团购商品、积分购 -->
                  <product :layer="layer" :platform="platform" :now="now" v-if="layer.component=='product' || layer.component=='rush' || layer.component=='team' || layer.component=='integral'"></product>
                  <!-- 组合购 -->
                  <group :layer="layer" :platform="platform" :now="now" v-if="layer.component=='group'"></group>
                  <!-- 弹幕 -->
                  <bullet v-if="layer.component=='bullet'" :bullet-list="layer.componentData" :line="layer.bulletConfig.line?parseInt(layer.bulletConfig.line):4" :top="layer.bulletConfig.top?parseInt(layer.bulletConfig.top):undefined" :distance="layer.bulletConfig.distance?parseInt(layer.bulletConfig.distance):undefined" :showAvatar="layer.bulletConfig.showAvatar" :color="layer.bulletConfig.color" :backgroundColor="layer.bulletConfig.backgroundColor" :fontSize="layer.bulletConfig.fontSize?parseInt(layer.bulletConfig.fontSize):platform=='m'?28:14" :itemHeight="layer.bulletConfig.fontSize?parseInt(layer.bulletConfig.fontSize):platform=='m'?28:14"></bullet>
                  <!-- 3D图 -->
                  <circlr v-if="layer.component=='circlr'" :images-list="layer.componentData"></circlr>
                  <!-- 倒计时 -->
                  <time-play v-if="layer.component=='timePlay'" :times="layer.componentDataStr?layer.componentDataStr:undefined" :format="'<em>{{d}}</em>天<em>{{h}}</em>时<em>{{m}}</em>分<em>{{s}}</em>秒'"></time-play>
                  <!-- 中奖用户名单 -->
                  <marquee style="height: 100%;" v-if="layer.component=='winnerList'" :changed="layer.componentData.length">
                    <div class="marquee-item" v-for="(user, uIndex) in layer.componentData" :key="uIndex">恭喜&nbsp;{{user.username}}&nbsp;获得&nbsp;<span class="prize">{{user.prize}}</span></div>
                  </marquee>
                  <!-- 水果机 -->
                  <fruit-machine v-if="layer.component=='fruitMachine'" :prize-all-list="layer.componentData"
                    :speed="layer.fruitMachineConfig.speed?parseInt(layer.fruitMachineConfig.speed):50"
                    :time="layer.fruitMachineConfig.time?parseInt(layer.fruitMachineConfig.time):3000"
                    :btnWidth="layer.fruitMachineConfig.btnWidth?parseInt(layer.fruitMachineConfig.btnWidth):platform=='m'?300:150"
                    :btnHeight="layer.fruitMachineConfig.btnHeight?parseInt(layer.fruitMachineConfig.btnHeight):platform=='m'?80:40"
                    :btnMarginTop="layer.fruitMachineConfig.btnMarginTop?parseInt(layer.fruitMachineConfig.btnMarginTop):10" 
                    @start="startFruitMachineLottery"
                    @end="endLottery" :ref="'fruitMachine' + layer.id" :callbackData="layer.id">
                  </fruit-machine>
                  <!-- 大转盘 -->
                  <turntable v-if="layer.component=='turntable'" :ref="'turntable' + layer.id" 
                    :turntable="layer.turntableConfig.turntable?layer.turntableConfig.turntable:undefined"
                    :button="layer.turntableConfig.button?layer.turntableConfig.button:undefined"
                    :count="layer.turntableConfig.count?parseInt(layer.turntableConfig.count):undefined"
                    :callbackData="layer.id"
                    @start="startTurntableLottery" @end="endLottery"></turntable>
                  <!-- 跑马灯 -->
                  <revolving-lantern v-if="layer.component=='lantern'"
                    :bg="layer.lanternConfig.lantern?layer.lanternConfig.lantern:undefined"
                    :showBoundary="layer.lanternConfig.showBoundary"
                    :ref="'lantern'+layer.id" @start="startLanternLottery" :callbackData="layer.id"></revolving-lantern>
                  <!-- 视频播放 -->
                  <video-player v-if="layer.component=='video'" :src="layer.videoConfig.video?layer.videoConfig.video:undefined" :poster="layer.videoConfig.poster?layer.videoConfig.poster:undefined"></video-player>
                  <!-- 选项卡 -->
                  <tab v-if="layer.component=='tab'"
                    :list="layer.tabConfig.btnList"
                    :bgcolor="layer.tabConfig.bgcolor"
                    :bgcolor-active="layer.tabConfig.bgcolorActive"
                    :color="layer.tabConfig.color"
                    :color-active="layer.tabConfig.colorActive"
                    :width="layer.tabConfig.btnWidth?layer.tabConfig.btnWidth:undefined"
                    :height="layer.tabConfig.btnHeight?layer.tabConfig.btnHeight:undefined"
                    :interval="layer.tabConfig.interval"
                    :change-way="layer.tabConfig.changeWay"
                    :fontsize="layer.tabConfig.fontsize?layer.tabConfig.fontsize:undefined">
                  </tab>
                </template>
              </div>
            </vue-draggable-resizable>
          </div>
        </div>
      </template>
    </div>
    <!-- 图层编辑 -->
    <div class="lay-edit flex" v-show="!windowMaximize">
      <!-- 基本操作 -->
      <div class="edit-box">
        <div class="edit-box-inner">
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>编号：</span>
              <span class="number">{{editLayer.id}}</span>
            </div>
            <div class="edit-item-box">
              <span>类型：</span>
              <select v-model="editLayer.type" @change="changeLayerType" :disabled="!editLayer.id">
                <option value="img">图片</option>
                <option value="text">文字</option>
                <option value="html">html</option>
                <option value="field">变量</option>
                <option value="component">组件</option>
              </select>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>名称：</span>
              <input type="text" v-model="editLayer.name" :disabled="!editLayer.id" style="width: 126px;text-align:left;padding:0 5px;width:116px;">
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <i class="fa fa-clone btn" title="克隆图层" @click="cloneLayer"></i>
              <i class="fa btn" :class="editLayer.show?'fa fa-eye':'fa-eye-slash'" @click="editLayer.show=!editLayer.show" title="显示或隐藏"></i>
              <i class="fa fa-trash-o btn" title="删除图层" @click="deleteLayer"></i>
              <i class="fa fa-code btn" aria-hidden="true" title="javascript自定义代码" @click="dialogCodeVisible=true"></i>
              <i class="fa fa-floppy-o btn" aria-hidden="true" title="保存 ctrl+s" @click="save"></i>
            </div>
          </div>
        </div>
        <div class="edit-box-name">基本操作</div>
      </div>
      <!-- 编辑 -->
      <div class="edit-box">
        <div class="edit-box-inner">
          <div class="edit-row flex flex-align-center" v-if="editLayer.type=='img'">
            <div class="edit-item-box">
              <span>图片：</span>
              <input type="text" v-model="editLayer.content" :disabled="!editLayer.id" style="width: 195px;" class="img-url"><a href="javascript:;" class="floor-upload blue-bg" @click="triggerUpload('layer',editFloorId,editLayer.id)">点击上传</a>
            </div>
          </div>
          <div class="edit-row flex flex-align-center" v-if="editLayer.type=='field'">
            <div class="edit-item-box">
              <span>变量：</span>
              <input type="text" v-model="editLayer.field" :disabled="!editLayer.id" style="width: 195px;" class="img-url" placeholder="变量名必须为英文"><a href="javascript:;" class="floor-upload blue-bg" @click="randerField">渲染变量</a>
            </div>
          </div>
          <div class="edit-row flex flex-align-center" v-if="editLayer.type!='component'">
            <div class="edit-item-box">
              <span>事件：</span>
              <select v-model="editLayer.linkType" @change="editLayer.link='';editLayer.ruleContent=''" :disabled="!editLayer.id">
                <option value="">无</option>
                <option value="link">链接</option>
                <option value="anchor">跳转楼层</option>
                <option value="img">图片</option>
                <option value="rule">规则</option>
                <option value="tabs">选项卡</option>
                <option value="qrcode">二维码</option>
                <option value="coupon">优惠码</option>
                <option value="fun">执行函数</option>
              </select>
              <input type="text" v-model="editLayer.link" :disabled="!editLayer.id" style="width: 180px;text-align:left;padding: 0px 5px;" v-show="editLayer.linkType!='rule'">
            </div>
            <div class="edit-item-box" v-show="editLayer.linkType=='rule'">
              <a href="javascript:;" class="blue-bg btn-normal" @click="dialogRuleVisible=true">编辑规则</a>
            </div>
          </div>
          <div class="edit-row flex flex-align-center" v-if="editLayer.type=='text'||editLayer.type=='html'||editLayer.type=='component'">
            <div class="edit-item-box">
              <span>内容：</span>
              <textarea style="width:272px;" :disabled="!editLayer.id" v-model="editLayer.content"></textarea>
            </div>
          </div>
          <div class="edit-row flex flex-align-center" v-if="editLayer.type=='component'">
            <div class="edit-item-box">
              <span>组件：</span>
              <select v-model="editLayer.component" style="width:110px;" :disabled="!editLayer.id">
                <option value="bullet">弹幕</option>
                <option value="circlr">3D图</option>
                <option value="product">普通商品</option>
                <option value="rush">抢购商品</option>
                <option value="team">团购商品</option>
                <option value="integral">积分商品</option>
                <option value="group">组合购</option>
                <option value="timePlay">倒计时</option>
                <option value="turntable">大转盘</option>
                <option value="fruitMachine">水果机</option>
                <option value="lantern">跑马灯</option>
                <option value="winnerList">中奖用户</option>
                <option value="video">视频播放</option>
                <option value="tab">选项卡</option>
              </select>
            </div>
            <div class="edit-item-box">
              <span class="btn-normal disabled" v-show="!editLayer.component||editLayer.component=='timePlay'||editLayer.component=='circlr'||editLayer.component=='winnerList'">编辑组件</span>
              <a href="javascript:;" class="blue-bg btn-normal" @click="showComponentsEdit" v-show="editLayer.component&&editLayer.component!='timePlay'&&editLayer.component!='circlr'&&editLayer.component!='winnerList'">编辑组件</a>
            </div>
            <div class="edit-item-box">
              <span class="btn-normal disabled" v-show="editLayer.component=='video' || editLayer.component=='tab'">渲染组件</span>
              <a href="javascript:;" class="blue-bg btn-normal" v-show="editLayer.component!='video' && editLayer.component!='tab'" @click="renderComponentData(editLayer.component)">渲染组件</a>
            </div>
          </div>
        </div>
        <div class="edit-box-name">编辑</div>
      </div>
      <!-- 字体 -->
      <div class="edit-box" v-if="editLayer.type=='text'||editLayer.type=='field' || editLayer.component == 'timePlay'">
        <div class="edit-box-inner">
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>字号：</span>
              <input type="text" v-model.number="editLayer.fontsize" :disabled="!editLayer.id" style="width: 30px;">
            </div>
            <div class="edit-item-box">
              <span>颜色：</span>
              <input type="text" v-model="editLayer.color" :disabled="!editLayer.id" style="width: 30px;">
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>行高：</span>
              <input type="text" v-model.number="editLayer.lineheight" :disabled="!editLayer.id" style="width: 30px;">
            </div>
            <div class="edit-item-box">
              <span>间距：</span>
              <input type="text" v-model.number="editLayer.letterSpacing" :disabled="!editLayer.id" style="width: 30px;">
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <i class="fa fa-bold btn-set" aria-hidden="true" title="加粗" @click="setFontBold" :class="{active: editLayer.fontWeight=='bold'}"></i>
              <i class="fa fa-align-left btn-set" aria-hidden="true" title="左对齐" @click="editLayer.align='left'" :class="{active: editLayer.align=='left'}"></i>
              <i class="fa fa-align-center btn-set" aria-hidden="true" title="居中" @click="editLayer.align='center'" :class="{active: editLayer.align=='center'}"></i>
              <i class="fa fa-align-right btn-set" aria-hidden="true" title="右对齐" @click="editLayer.align='right'" :class="{active: editLayer.align=='right'}"></i>
              <i class="fa fa-align-justify btn-set" aria-hidden="true" title="两端对齐" @click="editLayer.align='justify'" :class="{active: editLayer.align=='justify'}"></i>
            </div>
          </div>
        </div>
        <div class="edit-box-name">字体</div>
      </div>
      <!-- 样式 -->
      <div class="edit-box">
        <div class="edit-box-inner">
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span style="margin-right:13px;">宽：</span>
              <input type="text" v-model.number="editLayer.width" :disabled="!editLayer.id" @input="updateLayer" style="width: 30px;">
            </div>
            <div class="edit-item-box">
              <span style="margin-right:13px;">高：</span>
              <input type="text" v-model.number="editLayer.height" :disabled="!editLayer.id" @input="updateLayer" style="width: 30px;">
            </div>
            <div class="edit-item-box">
              <span style="margin-right:6px;">左：</span>
              <input type="text" v-model.number="editLayer.left" :disabled="!editLayer.id" @input="updateLayer" style="width: 30px;">
            </div>
            <div class="edit-item-box">
              <span>上：</span>
              <input type="text" v-model.number="editLayer.top" :disabled="!editLayer.id" @input="updateLayer" style="width: 30px;">
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>圆角：</span>
              <input type="text" v-model.number="editLayer.layerRadius" :disabled="!editLayer.id" style="width: 30px;">
            </div>
            <div class="edit-item-box">
              <span>描边：</span>
              <input type="text" v-model.number="editLayer.borderWidth" :disabled="!editLayer.id" style="width: 30px;" placeholder="宽">
              <input type="text" v-model="editLayer.borderColor" :disabled="!editLayer.id" style="width: 30px;" placeholder="颜色">
            </div>
            <div class="edit-item-box">
              <select v-model="editLayer.borderStyle" :disabled="!editLayer.id">
                <option value="solid">直线</option>
                <option value="dashed">虚线</option>
                <option value="dotted">点线</option>
              </select>
            </div>
            <div class="edit-item-box">
              <span>不透明度：</span>
              <input type="text" v-model="editLayer.layerOpacity" :disabled="!editLayer.id" style="width: 30px;">
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>背景：</span>
              <input type="text" v-model="editLayer.bgcolor" :disabled="!editLayer.id" style="width: 30px;" placeholder="颜色">
              <input type="text" v-model="editLayer.bgimg" :disabled="!editLayer.id" style="width: 195px;" class="img-url"><a href="javascript:;" class="floor-upload blue-bg" @click="triggerUpload('layerbg', editFloorId, editLayer.id)">点击上传</a>
            </div>
          </div>
        </div>
        <div class="edit-box-name">样式</div>
      </div>
      <!-- 动效 -->
      <div class="edit-box">
        <div class="edit-box-inner">
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>动画效果：</span>
              <select v-model="editLayer.effect" @change="changeAnimateEffect" :disabled="!editLayer.id">
                <option value="">无动画</option>
                <optgroup label="Attention Seekers">
                <option value="bounce">弹跳</option>
                <option value="flash">闪烁</option>
                <option value="pulse">跳动</option>
                <option value="rubberBand">拉伸</option>
                <option value="shake">抖动</option>
                <option value="swing">摇动</option>
                <option value="tada">tada</option>
                <option value="wobble">摇晃</option>
                </optgroup>

                <optgroup label="跳入">
                <option value="bounceIn">跳入</option>
                <option value="bounceInDown">上方跳入</option>
                <option value="bounceInLeft">左侧跳入</option>
                <option value="bounceInRight">右侧跳入</option>
                <option value="bounceInUp">下方跳入</option>
                </optgroup>

                <optgroup label="跳出">
                <option value="bounceOut">跳出</option>
                <option value="bounceOutDown">向下跳出</option>
                <option value="bounceOutLeft">向左跳出</option>
                <option value="bounceOutRight">向右跳出</option>
                <option value="bounceOutUp">向上跳出</option>
                </optgroup>

                <optgroup label="渐入">
                <option value="fadeIn">渐入</option>
                <option value="fadeInDown">向下小距离渐入</option>
                <option value="fadeInDownBig">向下远距离渐入</option>
                <option value="fadeInLeft">左侧小距离渐入</option>
                <option value="fadeInLeftBig">左侧远距离渐入</option>
                <option value="fadeInRight">右侧小距离渐入</option>
                <option value="fadeInRightBig">右侧远距离渐入</option>
                <option value="fadeInUp">向上小距离渐入</option>
                <option value="fadeInUpBig">向上远距离渐入</option>
                </optgroup>

                <optgroup label="渐出">
                <option value="fadeOut">渐出</option>
                <option value="fadeOutDown">向下小距离渐出</option>
                <option value="fadeOutDownBig">向下远距离渐出</option>
                <option value="fadeOutLeft">左侧小距离渐出</option>
                <option value="fadeOutLeftBig">左侧远距离渐出</option>
                <option value="fadeOutRight">右侧小距离渐出</option>
                <option value="fadeOutRightBig">右侧远距离渐出</option>
                <option value="fadeOutUp">向上小距离渐出</option>
                <option value="fadeOutUpBig">向上远距离渐出</option>
                </optgroup>

                <optgroup label="翻转">
                <option value="flip">翻转</option>
                <option value="flipInX">翻入(X轴)</option>
                <option value="flipInY">翻入(Y轴)</option>
                <option value="flipOutX">翻出(X轴)</option>
                <option value="flipOutY">翻出(Y轴)</option>
                </optgroup>

                <optgroup label="Lightspeed">
                <option value="lightSpeedIn">加速进入</option>
                <option value="lightSpeedOut">加速移出</option>
                </optgroup>

                <optgroup label="旋转渐入">
                <option value="rotateIn">旋转渐入</option>
                <option value="rotateInDownLeft">左下旋渐入</option>
                <option value="rotateInDownRight">右下旋渐入</option>
                <option value="rotateInUpLeft">左上旋渐入</option>
                <option value="rotateInUpRight">右上旋渐入</option>
                </optgroup>

                <optgroup label="旋转渐出">
                <option value="rotateOut">旋转渐出</option>
                <option value="rotateOutDownLeft">左下旋渐出</option>
                <option value="rotateOutDownRight">右下旋渐出</option>
                <option value="rotateOutUpLeft">左上旋渐出</option>
                <option value="rotateOutUpRight">右上旋渐出</option>
                </optgroup>

                <optgroup label="滑入">
                <option value="slideInUp">向上滑入</option>
                <option value="slideInDown">向下滑入</option>
                <option value="slideInLeft">左侧滑入</option>
                <option value="slideInRight">右侧滑入</option>

                </optgroup>
                <optgroup label="滑出">
                <option value="slideOutUp">向上滑出</option>
                <option value="slideOutDown">向下滑出</option>
                <option value="slideOutLeft">向左滑出</option>
                <option value="slideOutRight">向右滑出</option>
                
                </optgroup>
                
                <optgroup label="放大进入">
                <option value="zoomIn">放大进入</option>
                <option value="zoomInDown">向下放大进入</option>
                <option value="zoomInLeft">左侧放大进入</option>
                <option value="zoomInRight">右侧放大进入</option>
                <option value="zoomInUp">向上放大进入</option>
                </optgroup>
                
                <optgroup label="缩小离开">
                <option value="zoomOut">缩小离开</option>
                <option value="zoomOutDown">向下缩小离开</option>
                <option value="zoomOutLeft">向左缩小离开</option>
                <option value="zoomOutRight">向右缩小离开</option>
                <option value="zoomOutUp">向上缩小离开</option>
                </optgroup>

                <optgroup label="特效">
                <option value="hinge">转折</option>
                <option value="rollIn">翻滚进入</option>
                <option value="rollOut">翻滚离开</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>播放次数：</span>
              <select v-model="editLayer.iteration" style="width: 130px;" :disabled="!editLayer.id">
                <option value="1">播放1次</option>
                <option value="infinite">循环播放</option>
              </select>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>时长：</span>
              <input type="text" v-model.number="editLayer.duration" :disabled="!editLayer.id" style="width: 30px;"> 秒
            </div>
            <div class="edit-item-box" style="margin-left: 14px;">
              <span>延迟：</span>
              <input type="text" v-model.number="editLayer.delay" :disabled="!editLayer.id" style="width: 30px;"> 秒
            </div>
          </div>
        </div>
        <div class="edit-box-name">动效</div>
      </div>
      <!-- 其他 -->
      <div class="edit-box">
        <div class="edit-box-inner">
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <a href="http://www.9ji.com/Static/documentation/markdownIndex.aspx?doc=/Static/markdown/guide.md" target="_blank">文档教程</a>
            </div>
            <div class="edit-item-box">
              <a href="javascript:;" @click="dialogHelpVisible=true">帮助</a>
            </div>
            <div class="edit-item-box">
              <a href="javascript:;" class="fa fa-window-maximize" title="全屏" @click="windowMaximize=true;isShowEdit=false;"></a>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <a href="javascript:;" @click="dialogShareVisible=true">分享配置</a>
            </div>
            <div class="edit-item-box">
              <a :href="platform === 'm' ? '/activity/' + topicId : '/event/topic.aspx?topicId=' + topicId">查看页面</a>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <a href="javascript:;" @click="isShowEdit = !isShowEdit">{{isShowEdit?'隐藏':'显示'}}编辑窗口</a>
            </div>
            <div class="edit-item-box">
              <a href="javascript:;" @click="switchPlatform">切换到{{platform=='m'?'PC':'M '}}版</a>
            </div>
          </div>
        </div>
        <div class="edit-box-name">其他</div>
      </div>
    </div>
    <a href="javascript:;" class="btn-show-menus fa fa-th-large" v-show="windowMaximize" @click="windowMaximize=false;isShowEdit=true;"></a>
    <!-- 楼层编辑 -->
    <div class="floor-edit" v-show="isShowEdit">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item :name="f.id" v-for="(f, index) in floors" :key="f.id">
          <template slot="title">
            <div class="title-box">
              <div class="title-box-left ellipsis" @click.stop>
                <span @dblclick="showEditFloorName(f.id)" :class="f.id==editId?'hide':''">{{f.name}}</span>
                <el-input v-model="floors[index].name" v-if="editId==f.id&&f.editName" autofocus @blur="hideEditFloorName" placeholder="请输入内容" style="width: 150px;"></el-input>
              </div>
              <div class="title-box-right" @click.stop>
                <i class="fa fa-plus" title="添加图层" @click="addNewLayer(f.id)"></i>
                <i class="fa fa-clone" title="克隆楼层" @click="cloneFloor(f.id)"></i>
                <i class="fa" :class="f.show?'fa fa-eye':'fa-eye-slash'" @click="f.show=!f.show" title="显示或隐藏"></i>
                <i class="fa fa-arrow-up" title="上移" @click="orderUp(index)"></i>
                <i class="fa fa-arrow-down" title="下移" @click="orderDown(index)"></i>
                <i class="fa fa-trash-o" title="删除楼层" @click="deleteFloor(f.id)"></i>
              </div>
            </div>
          </template>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>编号：</span><span class="number" style="width: 70px;">{{f.id}}</span>
            </div>
            <div class="edit-item-box">
              <span style="margin-right: 11px;">类型：</span>
              <select v-model="f.type" @change="changeFloorType(f.type, f.id)" style="width: 93px;">
                <option value="normal">普通楼层</option>
                <option value="float">悬浮层</option>
                <option value="tabs">选项卡</option>
                <option value="sticky">悬停层</option>
                <option value="fullpage">全屏切换</option>
              </select>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>高度：</span><input type="text" v-model="f.height" style="width: 70px;" :disabled="isFullpage" :readonly="isFullpage">
            </div>
            <div class="edit-item-box">
              <span>背景色：</span><input type="text" v-model="f.bgcolor" style="width: 91px;">
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>背景图对齐：</span>
              <select v-model="f.bgposition">
                <option value="center">居中</option>
                <option value="top left">居上居左</option>
                <option value="top center">居上居中</option>
                <option value="top right">居上居右</option>
                <option value="center left">居中居左</option>
                <option value="center right">居中居右</option>
                <option value="bottom left">居下居左</option>
                <option value="bottom center">居下居中</option>
                <option value="bottom right">居下居右</option>
              </select>
            </div>
            <div class="edit-item-box" v-show="f.type=='tabs'">
              <span style="margin-right: 10px;">组：</span><input type="text" v-model="f.group" style="width: 60px;">              
            </div>
          </div>
          <div class="edit-row" style="margin-top: 10px;">
            <div class="edit-item-box">
              <span>背景：</span><input type="text" v-model="f.bgimg" style="width: 146px;" class="img-url"><a href="javascript:;" class="floor-upload blue-bg" @click="triggerUpload('floorbg', f.id)">点击上传</a>
            </div>
          </div>
          <div class="edit-row flex flex-align-center">
            <div class="edit-item-box">
              <span>开始：</span><input type="text" v-model="f.startTime" style="width: 87px;" placeholder="开始时间">
            </div>
            <div class="edit-item-box">
              <span>结束：</span><input type="text" v-model="f.endTime" style="width: 87px;" placeholder="结束时间">
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <a href="javascript:;" class="btn-add-floor blue-bg" @click="addFloor">添加楼层</a>
    </div>
    <!-- 上传form -->
    <form ref="fileForm">
      <input class="hide" type="file" ref="file" @change="uploadImg" accept="image/*">
    </form>
    <!-- 分享配置弹窗 -->
    <el-dialog title="分享配置" :visible="dialogShareVisible" :show-close="false" size="tiny">
      <el-form :model="share" ref="shareForm" label-width="100px" label-position="left" :rules="shareFormRules">
        <el-form-item label="分享标题" prop="title">
          <el-input v-model="share.title" auto-complete="off" placeholder="请输入分享标题"></el-input>
        </el-form-item>
        <el-form-item label="分享描述" prop="desc">
          <el-input v-model="share.desc" auto-complete="off" placeholder="请输入分享描述"></el-input>
        </el-form-item>
        <el-form-item label="分享链接" prop="link">
          <el-input v-model="share.link" auto-complete="off" placeholder="请输入分享链接"></el-input>
        </el-form-item>
        <el-form-item label="分享图片" prop="img">
          <el-input v-model="share.img" auto-complete="off" placeholder="200*200">
            <el-button slot="append" type="primary" @click="triggerUpload('share')">点击上传</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="回调函数" prop="fun">
          <el-input v-model="share.fun" auto-complete="off"></el-input>
          <p class="tip">foo()，除开发人员外，请勿乱写</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogShareVisible = false">完成</el-button>
      </div>
    </el-dialog>
    <!-- 帮助弹窗 -->
    <el-dialog title="使用帮助" :visible.sync="dialogHelpVisible">
      <div class="help">
        <p class="red"><b>建议每个页面只由一个人/一台电脑编辑修改！</b>请不要两个或多个人同时编辑页面！</p>
        <p class="red"><b>设计图尺寸请以iPhone6为参考，两倍图应为750*1334</b></p>
        <h4 class="red margin-top">楼层：</h4>
        <p class="margin-top">浮动层，悬停在屏幕右侧，宽度：PC→140px，M→160px</p>
        <p>选项卡，组→选项卡的组[数字]，每个选项卡都是一个楼层，需要隐藏默认不显示的选项卡</p>
        <p>悬停层，当楼层上边缘滚动到浏览器上边缘时，楼层悬停，不再跟随页面滚动</p>
        <p>全屏切换，全屏切换楼层高度不可更改，移动端高度为1334，相关图层需要放置在楼层内虚线范围内，否则在不同屏幕大小的手机上全屏效果初始化后，会导致图层内容显示不全</p>
        <h4 class="red margin-top">变量图层：</h4>
        <p>变量名必须为英文，写入变量名点渲染变量，从后端获取变量值</p>
        <p>常用变量：</p>
        <p>新机预约数量：newOrder-[ppid]，如 newOrder-123</p>
        <p>商品预订数据：bookNumber-[ppid]，如 bookNumber-123</p>
        <p>报名人数：enrollment-[topicId]，如 enrollment-123</p>
        <h4 class="red margin-top">图层事件：</h4>
        <p>图层事件为点击此图层能触发的相应事件，主要包括以下几种类型：</p>
        <p>
          [<b class="orange normal">链接</b>]→输入链接地址，点击跳转到相应链接；<br />
          [<b class="orange normal">图片</b>]→输入图片地址，点击弹窗显示图片；<br />
          [<b class="orange normal">规则</b>]→点击弹窗显示在规则编辑框中输入的规则内容（如：活动规则等）；<br />
          [<b class="orange normal">选项卡</b>]→输入 “选项卡组号-楼层id”（如：2-1） 切换选项卡显示/隐藏；<br />
          [<b class="orange normal">二维码</b>]→输入二维码地址，点击弹窗显示二维码；<br />
          [<b class="orange normal">优惠码</b>]→输入批次，点击领取优惠码；<br />
          [<b class="orange normal">执行函数</b>]→输入函数名（如：test()），点击执行函数；<br />
        </p>
        <h4 class="red margin-top">组件：</h4>
        <p>商品填对应的id，多个以英文逗号（,）分隔，需选一行排多少列<br/>中奖用户填奖池编号<br/>倒计时格式：2016/11/11 10:00:00</p>
        <p>组件最好先设置好图层的宽高，否则一些依赖图层宽高进行初始化的组件，再调整宽高后显示不准确</p>
        <h4 class="red margin-top">快捷键：</h4>
        <p>保存：ctrl+s；帮助：F1；移动图层：上下左右箭头，要移动的图层需要处于选中状态，即四周有可以拖动的操作点；</p>
        <p class="margin-top">发现bug请截图+链接+说明，发给开发部周子贤</p>
      </div>
    </el-dialog>
    <!-- 组件编辑弹窗 -->
    <el-dialog title="组件编辑" :visible.sync="dialogComponentVisible" :show-close="false">
      <el-form :model="editLayer" label-width="100px" label-position="left">
        <el-form-item label="一排" prop="product.col" v-if="editLayer.type=='component'&&(editLayer.component=='product'||editLayer.component=='rush'||editLayer.component=='team'||editLayer.component=='integral')">
          <el-select v-model="editLayer.product.col">
            <template v-if="platform=='m'">
              <el-option label="一列" :value="1"></el-option>
              <el-option label="两列" :value="2"></el-option>
            </template>
            <template v-if="platform=='pc'">
              <el-option label="一列" :value="1"></el-option>
              <el-option label="两列" :value="2"></el-option>
              <el-option label="三列" :value="3"></el-option>
              <el-option label="四列" :value="4"></el-option>
              <el-option label="五列" :value="5"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="样式" prop="product.productStyle" v-if="editLayer.type=='component'&&(editLayer.component=='product'||editLayer.component=='rush'||editLayer.component=='team'||editLayer.component=='integral')">
          <el-select v-model="editLayer.product.productStyle">
            <el-option label="默认样式" value="default"></el-option>
            <el-option label="样式1" value="style1"></el-option>
            <el-option label="样式2" value="style2"></el-option>
            <el-option label="样式3" value="style3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="按钮颜色" prop="product.btnBgColor" v-if="editLayer.type=='component'&&(editLayer.component=='product'||editLayer.component=='rush'||editLayer.component=='team'||editLayer.component=='integral'||editLayer.component=='group')">
          <el-input v-model="editLayer.product.btnBgColor" auto-complete="off" placeholder="自定义按钮背景色"></el-input>
        </el-form-item>
        <el-form-item label="按钮文字" prop="product.btnText" v-if="editLayer.type=='component'&&(editLayer.component=='product'||editLayer.component=='group')">
          <el-input v-model="editLayer.product.btnText" auto-complete="off" placeholder="自定义按钮文字"></el-input>
        </el-form-item>
        <!-- 弹幕组件设置 -->
        <template v-if="editLayer.type=='component'&&editLayer.component=='bullet'">
          <el-form-item label="行数" prop="bulletConfig.line">
            <el-input v-model.number="editLayer.bulletConfig.line" auto-complete="off" placeholder="弹幕行数，默认4行"></el-input>
          </el-form-item>
          <el-form-item label="每行间隔" prop="bulletConfig.distance">
            <el-input v-model.number="editLayer.bulletConfig.distance" auto-complete="off" placeholder="每行间隔距离"></el-input>
          </el-form-item>
          <el-form-item label="字体颜色" prop="bulletConfig.color">
            <el-input v-model="editLayer.bulletConfig.color" auto-complete="off" placeholder="弹幕字体颜色"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色" prop="bulletConfig.backgroundColor">
            <el-input v-model="editLayer.bulletConfig.backgroundColor" auto-complete="off" placeholder="弹幕背景颜色"></el-input>
          </el-form-item>
          <el-form-item label="字体大小" prop="bulletConfig.fontSize">
            <el-input v-model.number="editLayer.bulletConfig.fontSize" auto-complete="off" placeholder="字体大小"></el-input>
          </el-form-item>
          <el-form-item label="距离顶部距离" prop="bulletConfig.top">
            <el-input v-model.number="editLayer.bulletConfig.top" auto-complete="off" placeholder="第一行与容器顶部距离"></el-input>
          </el-form-item>
          <el-form-item label="" prop="bulletConfig.showAvatar">
            <el-checkbox v-model="editLayer.bulletConfig.showAvatar">显示头像</el-checkbox>
          </el-form-item>
        </template>
        <!-- 水果机设置 -->
        <template v-if="editLayer.type=='component'&&editLayer.component=='fruitMachine'">
          <el-form-item label="滚动速度" prop="fruitMachineConfig.speed">
            <el-input v-model="editLayer.fruitMachineConfig.speed" auto-complete="off" placeholder="滚动速度，默认50"></el-input>
          </el-form-item>
          <el-form-item label="滚动时间" prop="fruitMachineConfig.time">
            <el-input v-model="editLayer.fruitMachineConfig.time" auto-complete="off" placeholder="滚动时间，默认3000，单位毫秒"></el-input>
          </el-form-item>
          <el-form-item label="开始按钮宽度" prop="fruitMachineConfig.btnWidth">
            <el-input v-model="editLayer.fruitMachineConfig.btnWidth" auto-complete="off" placeholder="开始按钮宽度，默认150px"></el-input>
          </el-form-item>
          <el-form-item label="开始按钮高度" prop="fruitMachineConfig.btnHeight">
            <el-input v-model="editLayer.fruitMachineConfig.btnHeight" auto-complete="off" placeholder="开始按钮高度，默认40px"></el-input>
          </el-form-item>
          <el-form-item label="按钮上方距离" prop="fruitMachineConfig.btnMarginTop">
            <el-input v-model="editLayer.fruitMachineConfig.btnMarginTop" auto-complete="off" placeholder="按钮与上方抽奖区域的距离，默认10px"></el-input>
          </el-form-item>
          <p class="tip">按钮只能在下方居中，后台设置奖品时，没有奖品图片的（如谢谢参与）要在最后</p>
        </template>
        <!-- 大转盘设置 -->
        <template v-if="editLayer.type=='component'&&editLayer.component=='turntable'">
          <el-form-item label="转盘图片" prop="turntableConfig.turntable">
            <el-input v-model="editLayer.turntableConfig.turntable" auto-complete="off" placeholder="转盘图片，宽高比1:1，建议尺寸900*900">
              <el-button slot="append" type="primary" @click="triggerUpload('turntable')">点击上传</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="按钮图片" prop="turntableConfig.button">
            <el-input v-model="editLayer.turntableConfig.button" auto-complete="off" placeholder="按钮图片，宽高比3:16，建议尺寸195*240">
              <el-button slot="append" type="primary" @click="triggerUpload('turntableButton')">点击上传</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="奖品数量" prop="turntableConfig.count">
            <el-input v-model.number="editLayer.turntableConfig.count" auto-complete="off" placeholder="奖品数量"></el-input>
          </el-form-item>
        </template>
        <!-- 跑马灯设置 -->
        <template v-if="editLayer.type=='component'&&editLayer.component=='lantern'">
          <el-form-item label="跑马灯图片" prop="lanternConfig.lantern">
            <el-input v-model="editLayer.lanternConfig.lantern" auto-complete="off" placeholder="转盘图片，宽高比1:1，建议尺寸900*900">
              <el-button slot="append" type="primary" @click="triggerUpload('lantern')">点击上传</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="lanternConfig.showBoundary">
            <el-checkbox v-model="editLayer.lanternConfig.showBoundary">显示分界线</el-checkbox>
          </el-form-item>
        </template>
        <!-- 视频设置 -->
        <template v-if="editLayer.type=='component'&&editLayer.component=='video'">
          <el-form-item label="视频地址" prop="videoConfig.video">
            <el-input v-model="editLayer.videoConfig.video" auto-complete="off" placeholder="请输入视频地址或上传视频"></el-input>
          </el-form-item>
          <el-form-item label="视频封面" prop="videoConfig.poster">
            <el-input v-model="editLayer.videoConfig.poster" auto-complete="off" placeholder="请输入视频封面地址或上传封面图片">
              <el-button slot="append" type="primary" @click="triggerUpload('videoPoster')">点击上传</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="视频上传" prop="">
            <!-- <uploader :options="options" class="uploader" ref="uploader" @file-complete="fileComplete" @complete="complete"></uploader> -->
            <uploader :options="options" class="uploader-example" ref="uploader" @file-complete="fileComplete" @complete="complete">
              <uploader-unsupport></uploader-unsupport>
              <uploader-drop>
                <uploader-btn :attrs="attrs">选择视频</uploader-btn>
              </uploader-drop>
              <uploader-list></uploader-list>
            </uploader>
          </el-form-item>
        </template>
        <!-- 选项卡设置 -->
        <template v-if="editLayer.type=='component'&&editLayer.component=='tab'">
          <el-form-item label="背景色" prop="tabConfig.bgcolor">
            <el-input v-model="editLayer.tabConfig.bgcolor" auto-complete="off" placeholder="请输入tab按钮背景色"></el-input>
          </el-form-item>
          <el-form-item label="选中背景色" prop="tabConfig.bgcolorActive">
            <el-input v-model="editLayer.tabConfig.bgcolorActive" auto-complete="off" placeholder="请输入tab按钮选中时的背景色"></el-input>
          </el-form-item>
          <el-form-item label="文字颜色" prop="tabConfig.color">
            <el-input v-model="editLayer.tabConfig.color" auto-complete="off" placeholder="请输入tab按钮的文字颜色"></el-input>
          </el-form-item>
          <el-form-item label="选中文字颜色" prop="tabConfig.colorActive">
            <el-input v-model="editLayer.tabConfig.colorActive" auto-complete="off" placeholder="请输入tab按钮选中时的文字颜色"></el-input>
          </el-form-item>
          <el-form-item label="文字字号" prop="tabConfig.fontsize">
            <el-input v-model="editLayer.tabConfig.fontsize" auto-complete="off" placeholder="请输入tab按钮文字字号"></el-input>
          </el-form-item>
          <el-form-item label="按钮宽" prop="tabConfig.btnWidth">
            <el-input v-model="editLayer.tabConfig.btnWidth" auto-complete="off" placeholder="请输入tab按钮的宽"></el-input>
          </el-form-item>
          <el-form-item label="按钮高" prop="tabConfig.btnHeight">
            <el-input v-model="editLayer.tabConfig.btnHeight" auto-complete="off" placeholder="请输入tab按钮的高"></el-input>
          </el-form-item>
          <el-form-item label="按钮间隔" prop="tabConfig.interval">
            <el-input v-model="editLayer.tabConfig.interval" auto-complete="off" placeholder="请输入tab按钮间的间隔"></el-input>
          </el-form-item>
          <el-form-item label="切换方式" prop="tabConfig.changeWay" v-if="platform==='pc'">
            <el-radio v-model="editLayer.tabConfig.changeWay" label="click">点击切换</el-radio>
            <el-radio v-model="editLayer.tabConfig.changeWay" label="over">鼠标滑过切换</el-radio>
          </el-form-item>
          <el-form-item :label="'按钮' + (index + 1)" prop="" v-for="(btn, index) in editLayer.tabConfig.btnList" :key="index">
            <el-input v-model="btn.text" auto-complete="off" placeholder="请输入按钮文字" style="width: 15%;"></el-input>
            <el-input v-model="btn.link" auto-complete="off" placeholder="组-楼层id" style="width: 20%;"></el-input>
            <el-input v-model="btn.imagePath1" auto-complete="off" style="width: 30%;">
              <el-button slot="append" type="primary" @click="triggerUpload('tab', index + '-1')">点击上传</el-button>
            </el-input>
            <el-input v-model="btn.imagePath2" auto-complete="off" style="width: 30%;">
              <el-button slot="append" type="primary" @click="triggerUpload('tab', index + '-2')">点击上传</el-button>
            </el-input>
            <a href="javascript:;" class="tab-item-delete fa fa-times" @click="deleteTabBtn(index)"></a>
          </el-form-item>
          <div class="btn-row">
            <el-button @click="addTabBtn">添加按钮</el-button>
          </div>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogComponentVisible = false">完 成</el-button>
      </div>
    </el-dialog>
    <!-- 规则内容弹窗 -->
    <el-dialog title="规则编辑" :visible.sync="dialogRuleVisible" size="tiny">
      <el-input
        type="textarea"
        :rows="10"
        v-model="editLayer.ruleContent"
        placeholder="请输入规则内容">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRuleVisible = false">完 成</el-button>
      </div>
    </el-dialog>
    <!-- 自定义代码弹窗 -->
    <el-dialog title="自定义代码" :visible.sync="dialogCodeVisible" :close-on-click-modal="false">
      <div class="code-wrapper">
        <!-- <codemirror v-model="customCode"></codemirror> -->
      </div>      
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogCodeVisible = false">完 成</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Vue from 'vue'
  import 'assets/plugin/appear.js'
  import { Loading } from 'element-ui'
  import sticky from 'pages/activity/topic/sticky'
  import bullet from 'pages/activity/topic/bullet'
  import circlr from 'pages/activity/topic/circlr'
  import fruitMachine from 'pages/activity/topic/fruitMachine'
  import turntable from 'pages/activity/topic/turntable'
  import product from 'pages/activity/topic/product'
  import group from 'pages/activity/topic/group'
  import timePlay from 'pages/activity/topic/time-play'
  import marquee from 'pages/activity/topic/marquee'
  import revolvingLantern from 'pages/activity/topic/revolving-lantern'
  import videoPlayer from 'components/video-player'
  import uploader from 'vue-simple-uploader'
  import VueDraggableResizable from 'components/vue-draggable-resizable.vue'
  import tab from './tab'
  import 'assets/style/animate.min.css'
  // import { codemirror } from 'vue-codemirror-lite'
  // require('codemirror/mode/javascript/javascript')
  // require('codemirror/addon/hint/show-hint.js')
  // require('codemirror/addon/hint/show-hint.css')
  // require('codemirror/addon/hint/javascript-hint.js')
  const regImg = /(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/
  window.floorappear = null
  Vue.use(uploader)
  export default {
    components: {
      sticky,
      bullet,
      circlr,
      fruitMachine,
      VueDraggableResizable,
      // codemirror,
      product,
      group,
      timePlay,
      marquee,
      turntable,
      revolvingLantern,
      videoPlayer,
      tab
    },
    data () {
      return {
        topicId: '', // 模板id
        activeNames: 1,
        editId: 0,
        uploadImgInfo: {
          type: '',
          floorId: 0,
          layerId: 0,
          tabIndex: 0
        },
        platform: 'm',
        isShowEdit: true,
        isFullpage: false,
        floors: [], // 楼层list
        editFloorId: 0,
        editLayer: {}, // 正在编辑的图层
        dialogShareVisible: false,
        share: {
          'title': '', // 分享标题
          'desc': '', // 分享描述
          'img': '', // 分享图片
          'link': '', // 分享链接
          'fun': '' // 分享回调函数
        },
        shareFormRules: {
          title: [
            { required: true, message: '请输入分享标题', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入分享描述', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '请上传分享图片', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入分享链接', trigger: 'blur' }
          ]
        },
        customCode: '',
        dialogLoading: false,
        dialogHelpVisible: false,
        disabledLayerEdit: false,
        dialogComponentVisible: false,
        dialogRuleVisible: false,
        dialogCodeVisible: false,
        now: 0,
        windowMaximize: false,
        options: {
          target: '//jsonplaceholder.typicode.com/posts/',
          singleFile: true,
          headers: {
            authorization: ''
          }
        },
        attrs: {
          accept: 'video/*'
        },
        lock: 0,
        layerActive: false
      }
    },
    created () {
      // 没有传入模板id，则返回到模板列表
      let topicId = this.$route.query.id
      if (!topicId) {
        this.$router.replace('/#/activity/topic/list')
        return
      }
      this.topicId = topicId
      this.platform = this.$route.query.platform || 'pc'
      // if (this.platform === 'm') {
      //   let cw = window.innerWidth
      //   cw = cw / 10
      //   // 计算倍数，数值可变。
      //   if (cw < 32) { cw = 32 } // 最小宽度
      //   if (cw > 64) { cw = 64 } // 最大宽度
      //   document.documentElement.style.cssText = 'font-size:' + cw + 'px !important'
      // }
      this.fetchData()
      this.options.headers.authorization = this.$store.state.token
      this._initAppearEvent()
    },
    mounted () {
      document.addEventListener('keydown', this.handleKeyDown)
    },
    beforeRouteLeave (to, from, next) {
      document.documentElement.style.cssText = ''
      document.removeEventListener('keydown', this.handleKeyDown)
    },
    methods: {
      fetchData () {
        // 获取专题模板数据
        const self = this
        let loadingInstance = Loading.service({ fullscreen: true })
        self.$api.activity.topicData({id: self.topicId, platform: self.platform}).then(res => {
          if (res.code === 0) {
            let data = res.data
            let topicData = data.topicData
            if (typeof topicData === 'string' && topicData.length > 0) {
              topicData = JSON.parse(topicData)
              Object.assign(self.share, topicData.share)
              self.customCode = data.customCode
              self.isFullpage = topicData.isFullpage
              // 回填数据
              if (topicData.floor.length > 0) {
                // if (self.floors[0].layer.length > 0) {
                //   self.editLayer = self.floors[0].layer[0]
                // }
                topicData.floor.forEach(floor => {
                  floor.layer.forEach(lay => {
                    if (lay.type === 'html') {
                      lay.content = self.htmlDecode(lay.content)
                    }
                    if (lay.type === 'component') {
                      lay.componentData = []
                    }
                    if (lay.type === 'field') {
                      lay.content = ''
                    }
                    if (lay.linkType === 'rule') {
                      lay.ruleContent = self.htmlDecode(lay.ruleContent)
                    }
                  })
                })
                self.floors = topicData.floor
                if (self.editFloorId === 0) {
                  self.activeNames = self.floors[0].id
                  self.editFloorId = self.floors[0].id
                }
                self.randerField()
                self.renderComponentData()
              }
            }
          } else {
            self.$message.error(res.userMsg)
          }
          loadingInstance.close()
        }, err => {
          loadingInstance.close()
          self.$message.error('获取模板数据失败，请稍后再试...' + err)
        })
      },
      showEditFloorName (id) {
        this.editId = id
      },
      hideEditFloorName () {
        this.editId = 0
      },
      triggerUpload (type, index, layerId) {
        // 点击触发文件选择
        const self = this
        if (!self.editLayer.id) return
        self.uploadImgInfo.type = type
        if (type === 'tab') {
          self.uploadImgInfo.tabIndex = index || ''
        } else {
          self.uploadImgInfo.floorId = index || ''
        }
        self.uploadImgInfo.layerId = layerId || ''
        self.$refs.file.click()
      },
      addFloor () {
        // 新增楼层
        const self = this
        let height = 1334
        if (self.platform === 'pc') {
          height = document.documentElement.clientHeight || window.innerHeight
        }
        let floorsId = []
        self.floors.forEach(floor => {
          floorsId.push(floor.id)
        })
        let newFloorId = 1
        if (floorsId.length > 0) {
          newFloorId = Math.max(...floorsId) + 1
        }
        let newFloor = {
          'id': newFloorId, // 楼层id
          'sort': self.floors.length + 1, // 楼层排序
          'type': 'normal', // 楼层类型 普通楼层-normal，悬浮层-float，选项卡-tabs，悬停层-hover，全屏切换-fullpage
          'group': '', // 选项卡分组
          'name': '楼层' + (self.floors.length + 1), // 楼层名称
          'editName': true,
          'height': self.isFullpage ? height : 450, // 楼层高
          'bgcolor': '#fff', // 背景颜色
          'bgimg': '', // 背景图片
          'bgposition': 'top center', // 背景图对其方式
          'tile': false,
          'show': true, // 是否显示
          'layer': [], // 楼层包含的图层数组
          'appearAni': false, // 是否播放动画
          'hasAnimate': false, // 楼层是否有动画
          'startTime': '', // 开始显示时间
          'endTime': '' // 结束显示时间
        }
        self.floors.push(newFloor)
        self.activeNames = newFloor.id
      },
      orderUp (index) {
        // 楼层上移
        let self = this
        if (index === 0) return
        let floor = self.floors[index]
        let floorBefore = self.floors[index - 1]
        floor.sort -= 1
        floorBefore.sort += 1
        self.$set(self.floors, index - 1, floor)
        self.$set(self.floors, index, floorBefore)
      },
      orderDown (index) {
        // 楼层下移
        let self = this
        if (index === self.floors.length - 1) return
        let floor = self.floors[index]
        let floorAfter = self.floors[index + 1]
        floor.sort += 1
        floorAfter.sort -= 1
        self.$set(self.floors, index + 1, floor)
        self.$set(self.floors, index, floorAfter)
      },
      deleteFloor (id) {
        // 删除楼层
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (id === floors[i].id) {
            self.$confirm('确定要删除楼层“[' + floors[i].name + ']”吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              floors.splice(i, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              floors.forEach(item => {
                if (item.sort > i + 1) {
                  item.sort -= 1
                }
              })
            }).catch(() => {
            })
            break
          }
        }
      },
      cloneFloor (id) {
        // 克隆楼层
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (id === floors[i].id) {
            let newFloor = Object.assign({}, floors[i])
            newFloor.id = self.floors.length + 1
            newFloor.sort = self.floors.length + 1
            if (newFloor.name.indexOf('拷贝') === -1) {
              newFloor.name += '-拷贝'
            }
            self.floors.push(newFloor)
            self.activeNames = newFloor.id
            break
          }
        }
      },
      changeFloorType (type, floorId) {
        // 改变楼层类型
        // 全屏切换时，所有楼层高度设定，并不可更改，type改为fullpage，
        const self = this
        if (type === 'fullpage') {
          let height = 1334
          if (self.platform === 'pc') {
            height = document.body.clientHeight || document.documentElement.clientHeight
          }
          self.floors.forEach(fl => {
            fl.height = height
            if (fl.id !== floorId) {
              fl.type = 'fullpage'
            }
          })
          self.isFullpage = true
        } else {
          if (self.isFullpage === true) {
            // 从fullpage转变为其他状态，除了当前操作楼层，其他楼层回复为普通楼层
            self.floors.forEach(fl => {
              if (fl.id !== floorId) {
                fl.type = 'normal'
              }
            })
            self.isFullpage = false
            // self.$nextTick(function () {
            //   self._initAppearEvent()
            // })
          }
        }
        if (type === 'tabs') {
          for (let i = 0; i < self.floors.length; i++) {
            if (self.floors[i].id === floorId) {
              self.floors[i].group = 1
              break
            }
          }
        } else {
          for (let i = 0; i < self.floors.length; i++) {
            if (self.floors[i].id === floorId) {
              self.floors[i].group = ''
              break
            }
          }
        }
      },
      setFontBold () {
        // 设置和取消字体加粗
        const self = this
        if (self.editLayer.fontWeight === 'bold') {
          self.editLayer.fontWeight = 'normal'
        } else {
          self.editLayer.fontWeight = 'bold'
        }
      },
      switchPlatform () {
        // 切换PC版与M版
        if (this.platform === 'm') {
          this.platform = 'pc'
        } else {
          this.platform = 'm'
        }
        this.fetchData()
      },
      saveShare () {
        // 保存分享配置
        const self = this
        self.$refs.shareForm.validate((valid) => {
          if (valid) {
            self.dialogShareVisible = false
          }
        })
      },
      randerField () {
        // 渲染变量
        const self = this
        let fields = [] // 所有变量
        let temp = [] // 暂存变量图层的楼层id，图层id，变量值
        let floors = self.floors
        floors.forEach(floor => {
          floor.layer.forEach(layer => {
            if (layer.type === 'field') {
              // 找到变量图层
              let field = layer.field.trim()
              if (field.length > 0) {
                temp.push({floorId: floor.id, layerId: layer.id, field: field, content: ''})
                fields.push(field)
              }
            }
          })
        })
        if (fields.length === 0) return
        self.$api.activity.getField(fields.join(',')).then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            temp.forEach(t => {
              for (let key in data) {
                if (t.field === key) {
                  t.content = data[key]
                }
              }
            })
            floors.forEach(floor => {
              floor.layer.forEach(layer => {
                temp.forEach(t => {
                  if (t.floorId === floor.id && t.layerId === layer.id) {
                    layer.content = t.content
                  }
                })
              })
            })
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('获取模板数据失败，请稍后再试...' + err)
        })
      },
      changeLayerType () {
        // 改变图层类型
        const self = this
        self.editLayer.content = ''
        self.editLayer.link = ''
        self.editLayer.ruleContent = ''
        self.editLayer.field = ''
        self.editLayer.component = ''
        self.editLayer.componentData = []
        self.editLayer.componentDataStr = ''
      },
      addNewLayer (id) {
        // 新增楼层
        const self = this
        self.activeNames = id
        self.editFloorId = id
        let newLayer = {
          'id': 0, // 图层id
          'name': '', // 图层标题
          'type': 'text', // 图层类型 图片-img，文字-text，html-html，变量-field，组件-component
          'active': false,
          'show': true, // 是否可见
          'content': '', // 内容
          'field': '', // 变量
          'color': '', // 字体颜色
          'bgcolor': '', // 背景颜色
          'bgimg': '', // 背景图片
          'lineheight': '', // 行高
          'fontsize': self.platform === 'm' ? 28 : 14, // 字体大小
          'align': 'left', // 对齐方式
          'width': 180, // 图层宽度
          'height': 50, // 图层高度
          'top': 0,
          'left': 0,
          'linkType': '', // 链接类型
          'link': '', // 链接
          'ruleContent': '', // 链接类型为规则时，规则的内容
          'component': '', // 组件类型 普通商品-product，抢购商品-rush，团购商品-team，积分商品-integral，组合购-group，大转盘-turntable，中奖用户-turntableuser，倒计时-timeplay
          'componentData': [], // 组件数据
          'componentDataStr': '',
          'product': {
            'col': self.platform === 'm' ? 2 : 3, // 商品组件列数
            'btnText': '', // 组件按钮文字，默认为立即购买
            'productStyle': 'default', // 组件按钮样式
            'btnBgColor': '' // 组件按钮自定义颜色
          },
          'bulletConfig': {
            'line': 4, // 弹幕显示函数，默认4行
            'top': 20, // 第一行距离容器顶部距离
            'distance': 60, // 每行间隔
            'showAvatar': true, // 是否显示头像
            'color': '', // 弹幕字体颜色
            'backgroundColor': '', // 背景色
            'fontSize': self.platform === 'm' ? 28 : 14 // 字体大小
          },
          'fruitMachineConfig': {
            'speed': '', // 速度
            'time': '', // 滚动时间
            'btnWidth': '', // 开始按钮宽
            'btnHeight': '', // 开始按钮高
            'btnMarginTop': '' // 开始按钮与抽奖区域距离
          },
          'turntableConfig': {
            'turntable': '', // 大转盘图片
            'button': '', // 按钮
            'count': '' // 奖品数量
          },
          'lanternConfig': {
            'lantern': '', // 背景图片
            'showBoundary': true // 是否显示边界线
          },
          'videoConfig': {
            'video': '', // 视频地址
            'poster': '' // 封面图片
          },
          'tabConfig': {
            'bgcolor': '',
            'bgcolorActive': '',
            'color': '',
            'colorActive': '',
            'fontsize': self.platform === 'm' ? '28' : '12',
            'btnWidth': '',
            'btnHeight': self.platform === 'm' ? '60' : '30',
            'interval': '',
            'changeWay': 'click',
            'btnList': []
          },
          'effect': '', // slide的切换效果
          'duration': 1, // 动画持续时间
          'delay': 0, // 动画延迟时间
          'iteration': 1, // 动画播放次数
          'letterSpacing': '', // 字间距
          'fontWeight': 'normal',
          'layerRadius': 0, // 图层圆角半径
          'borderWidth': 0, // 边宽
          'borderColor': '#fff', // 边颜色
          'borderStyle': 'solid', // 边类型
          'layerOpacity': 1
        }
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === self.editFloorId) {
            // 当前正在编辑的楼层
            let layer = floors[i].layer
            let layersId = []
            layer.forEach(item => {
              layersId.push(item.id)
            })
            if (layersId.length > 0) {
              newLayer.id = Math.max(...layersId) + 1
            } else {
              newLayer.id = 1
            }
            newLayer.name = '图层' + (layer.length + 1)
            layer.push(newLayer)
            self.editLayer = newLayer
            break
          }
        }
      },
      cloneLayer () {
        // 克隆图层
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === self.editFloorId) {
            // 当前正在编辑的楼层
            let layer = floors[i].layer
            let newLayer = Object.assign({}, self.editLayer)
            newLayer.id = layer.length + 1
            if (newLayer.name.indexOf('拷贝') === -1) {
              newLayer.name += '-拷贝'
            }
            layer.push(newLayer)
            self.editLayer = newLayer
            break
          }
        }
      },
      deleteLayer () {
        // 删除图层
        const self = this
        let layerId = self.editLayer.id
        let floors = self.floors
        self.disabledLayerEdit = true
        self.editLayer = {}
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === self.editFloorId) {
            let layer = floors[i].layer
            for (let j = 0; j < layer.length; j++) {
              if (layer[j].id === layerId) {
                layer.splice(j, 1)
                break
              }
            }
            break
          }
        }
      },
      onActivateLayer (fid, layer) {
        // 选中图层
        this.activeNames = fid
        this.editFloorId = fid
        this.editLayer = {}
        this.editLayer = layer
        this.layerActive = true
      },
      onDeactivatedLayer () {
        this.layerActive = false
      },
      onDragLayer (x, y) {
        // 拖动图层
        this.editLayer.top = y
        this.editLayer.left = x
      },
      onResizeLayer (x, y, width, height) {
        // resize 图层
        this.editLayer.top = y
        this.editLayer.left = x
        this.editLayer.width = width
        this.editLayer.height = height
      },
      updateLayer () {
        let target = 'layer' + this.editFloorId + this.editLayer.id + ''
        this.$refs[target][0].updateData(this.editLayer.left, this.editLayer.top, this.editLayer.width, this.editLayer.height)
      },
      startFruitMachineLottery (callbackData) {
        console.log('水果机开始抽奖...')
        // this.$refs['fruitMachine' + callbackData][0].run(11, {})
      },
      startTurntableLottery (callbackData) {
        console.log('大转盘开始抽奖...')
      },
      startLanternLottery (callbackData) {
        console.log('跑马灯开始抽奖...')
      },
      endLottery (callbackObj) {
        console.log('抽奖结束...')
        console.log(callbackObj)
      },
      renderComponentData (type) {
        // 渲染组件
        const self = this
        if (type === 'winnerList') {
          // 获取中奖用户数据
          self.getWinnerList()
        } else {
          let temp = {
            product: [],
            rush: [],
            team: [],
            integral: [],
            group: [],
            bullet: [],
            circlr: [],
            fruitMachine: []
          }
          let floors = self.floors
          floors.forEach(floor => {
            floor.layer.forEach(lay => {
              if (lay.type === 'component') {
                // 组件图层
                let ids = lay.content.split(',')
                lay.component === 'product' && (temp.product = temp.product.concat(ids))
                lay.component === 'rush' && (temp.rush = temp.rush.concat(ids))
                lay.component === 'team' && (temp.team = temp.team.concat(ids))
                lay.component === 'integral' && (temp.integral = temp.integral.concat(ids))
                lay.component === 'group' && (temp.group = temp.group.concat(ids))
                lay.component === 'bullet' && (temp.bullet = temp.bullet.concat(ids))
                lay.component === 'circlr' && (temp.circlr = temp.circlr.concat(ids))
                lay.component === 'fruitMachine' && (temp.fruitMachine = temp.fruitMachine.concat(ids))
              }
            })
          })
          // 请求参数
          let params = {
            topicId: self.topicId,
            ppids: temp.product.join(','),
            qids: temp.rush.join(','),
            teamIds: temp.team.join(','),
            integralIds: temp.integral.join(','),
            groupIds: temp.group.join(','),
            nids: temp.bullet.join(','),
            circlr: temp.circlr.join(','),
            batch: temp.fruitMachine.join(',')
          }
          // 获取组件数据
          self.$api.activity.getComponentData(params).then(res => {
            if (res.code === 0) {
              let data = res.data
              self.now = data.now // 当前服务器时间，倒计时组件需要
              floors.forEach(floor => { // 依次处理每一个楼层的每一个图层，回填数据
                floor.layer.forEach(lay => {
                  if (lay.type === 'component') {
                    if (lay.component === 'timePlay') {
                      // 倒计时
                      lay.componentDataStr = (new Date(lay.content).getTime() / 1000) - self.now / 1000
                    } else {
                      // 其他组件
                      lay.componentData = []
                      // 普通商品
                      if (lay.component === 'product') {
                        let ppids = lay.content.split(',')
                        ppids.forEach(ppid => {
                          data.product.forEach(item => {
                            if (ppid === item.ppid + '') {
                              // 多个层的处理
                              lay.componentData.push(item)
                            }
                          })
                        })
                      }
                      // 抢购商品
                      if (lay.component === 'rush') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.rush.forEach(item => {
                            if (id === item.id + '') {
                              // 多个层的处理
                              lay.componentData.push(item)
                            }
                          })
                        })
                      }
                      // 积分购
                      if (lay.component === 'integral') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.integral.forEach(item => {
                            if (id === item.id + '') {
                              // 多个层的处理
                              lay.componentData.push(item)
                            }
                          })
                        })
                      }
                      // 团购
                      if (lay.component === 'team') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.team.forEach(item => {
                            if (id === item.ppid + '') {
                              // 多个层的处理
                              lay.componentData.push(item)
                            }
                          })
                        })
                      }
                      // 组合购
                      if (lay.component === 'group') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.group.forEach(item => {
                            if (id === item.id + '') {
                              // 多个层的处理
                              lay.componentData.push(item)
                            }
                          })
                        })
                      }
                      // 弹幕
                      if (lay.component === 'bullet') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.bullet.forEach(item => {
                            if (id === item.nid + '') {
                              lay.componentData = item.list
                            }
                          })
                        })
                      }
                      // 3D图
                      if (lay.component === 'circlr') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.circlr.forEach(item => {
                            if (id === item.ppid + '') {
                              lay.componentData = item.images
                            }
                          })
                        })
                      }
                      // 水果机 所有奖品
                      if (lay.component === 'fruitMachine') {
                        let ids = lay.content.split(',')
                        ids.forEach(id => {
                          data.prize.forEach(item => {
                            if (id === item.batch + '') {
                              lay.componentData = item.list
                            }
                          })
                        })
                      }
                      // end
                    }
                  }
                })
              })
            } else {
              self.$message.error(res.userMsg)
            }
          }, err => {
            self.$message.error('获取组件数据失败，请稍后再试...' + err)
          })
        }
      },
      getWinnerList () {
        // 获取中奖用户名单
        const self = this
        let temp = {
          winnerList: []
        }
        let floors = self.floors
        floors.forEach(floor => {
          floor.layer.forEach(lay => {
            if (lay.type === 'component') {
              // 组件图层
              let ids = lay.content.split(',')
              lay.component === 'winnerList' && (temp.winnerList = temp.winnerList.concat(ids))
            }
          })
        })
        if (temp.winnerList.length === 0) return
        // 请求参数
        let params = {
          batch: temp.winnerList.join(',')
        }
        // 获取组件数据
        self.$api.activity.getWinnerList(params).then(res => {
          if (res.code === 0) {
            let data = res.data
            floors.forEach(floor => { // 依次处理每一个楼层的每一个图层，回填数据
              floor.layer.forEach(lay => {
                if (lay.type === 'component') {
                  lay.componentData = []
                    // 普通商品
                  if (lay.component === 'winnerList') {
                    let ids = lay.content.split(',')
                    ids.forEach(id => {
                      data.forEach(item => {
                        if (id === item.batch + '') {
                          lay.componentData = item.list
                        }
                      })
                    })
                  }
                }
              })
            })
          } else {
            self.$message.error(res.userMsg)
          }
        }, err => {
          self.$message.error('获取获奖名单失败，请稍后再试...' + err)
        })
      },
      showComponentsEdit () {
        this.dialogComponentVisible = true
        if (this.editLayer.component === 'video') {
          this.$nextTick(() => {
            window.uploader = this.$refs.uploader.uploader
          })
        }
      },
      complete () {
        console.log('complete', arguments)
      },
      fileComplete () {
        console.log('file complete', arguments)
      },
      changeAnimateEffect () {
        // 改变图层动画效果
        // 正在编辑的楼层id
        const self = this
        if (self.editLayer.effect.length > 0 && self.editLayer.duration > 0) {
          let floorId = self.editFloorId
          let floors = self.floors
          for (let i = 0; i < floors.length; i++) {
            if (floors[i].id === floorId && !floors[i].hasAnimate) {
              floors[i].hasAnimate = true
              self.$nextTick(function () {
                self._initAppearEvent()
              })
              break
            }
          }
        }
      },
      handleAppear (floorId) {
        // 楼层出现
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === floorId) {
            self.$set(floors[i], 'appearAni', true)
            break
          }
        }
      },
      handleDisappear (floorId) {
        // 楼层消失
        const self = this
        let floors = self.floors
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === floorId) {
            self.$set(floors[i], 'appearAni', false)
            break
          }
        }
      },
      save () {
        const self = this
        if (self.platform === 'm') {
          // m版验证分享信息
          if (!self.share.title || !self.share.desc || !self.share.img || !self.share.link) {
            self.dialogShareVisible = true
            self.$alert('请填写分享信息', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                self.$refs.shareForm.validate((valid) => {
                  if (!valid) {
                    // 显示分享信息填写弹窗
                    self.dialogShareVisible = true
                  }
                })
              }
            })
            return
          }
        }
        // 验证customCode
        let customCode = self.customCode
        if (customCode.indexOf('<textarea>') > -1) {
          self.$alert('js代码里不能包含textarea标签，会截断', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
        }
        if (self.floors.length === 0) {
          self.$alert('数据为空，不能提交', '提示', {
            confirmButtonText: '好的',
            callback: action => {}
          })
        }
        let loadingInstance = Loading.service({ fullscreen: true })
        let floors = JSON.parse(JSON.stringify(self.floors))
        floors.forEach(floor => {
          floor.layer.forEach(lay => {
            if (lay.type === 'html') {
              lay.content = self.htmlEncode(lay.content)
            }
            if (lay.type === 'component') {
              lay.componentData = []
            }
            if (lay.type === 'field') {
              lay.content = ''
            }
            if (lay.linkType === 'rule') {
              lay.ruleContent = lay.ruleContent.replace('\n', '<br>')
              lay.ruleContent = self.htmlEncode(lay.ruleContent)
            }
          })
        })
        let topicData = {
          share: self.share,
          floor: floors,
          isFullpage: self.isFullpage
        }
        // self.customCode.replace(/'/g, '\\\'').replace(/"/g, '\\"')
        let params = {id: self.topicId, topicData: JSON.stringify(topicData), platform: self.platform, customCode: self.customCode}
        console.log(params.topicData)
        console.log(params.customCode)
        self.$api.activity.saveTopic(params).then(res => {
          if (res.code === 0) {
            self.$message({
              message: '数据保存成功！',
              type: 'success'
            })
            // self.fetchData()
            // self.editLayer = {}
            self.lock = 0
          } else {
            self.$message.error(res.userMsg)
          }
          loadingInstance.close()
        }, err => {
          loadingInstance.close()
          self.$message.error('获取模板数据失败，请稍后再试...' + err)
        })
      },
      handleKeyDown (e) {
        const self = this
        if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
          e.preventDefault()
          // 保存快捷键
          self.save()
        } else if (e.keyCode === 37 && self.layerActive) {
          // 左移图层一像素
          if (self.editLayer.left > 1) {
            self.editLayer.left -= 1
          }
          self.updateLayer()
        } else if (e.keyCode === 38 && self.layerActive) {
          // 上移一像素
          e.preventDefault()
          if (self.editLayer.top > 1) {
            self.editLayer.top -= 1
          }
          self.updateLayer()
        } else if (e.keyCode === 39 && self.layerActive) {
          // 右移一像素
          e.preventDefault()
          let right = self.editLayer.left + self.editLayer.width
          if ((self.platform === 'm' && right < 750 && self.layerActive) || (self.platform === 'pc' && right < 1200 && self.layerActive)) {
            self.editLayer.left += 1
          }
          self.updateLayer()
        } else if (e.keyCode === 40 && self.layerActive) {
          // 下移一像素
          e.preventDefault()
          let floors = self.floors
          for (let i = 0; i < floors.length; i++) {
            if (floors[i].id === self.editFloorId) {
              let floorHeight = parseInt(floors[i].height)
              let bottom = self.editLayer.top + self.editLayer.height
              if (self.platform === 'm' && bottom < floorHeight) {
                self.editLayer.top += 1
              }
              break
            }
          }
          self.updateLayer()
        } else if (e.keyCode === 112) {
          // 按下F1
          e.preventDefault()
          e.stopPropagation()
          self.dialogHelpVisible = !self.dialogHelpVisible
        }
      },
      htmlEncode (str) {
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/</g, '&lt;')
        s = s.replace(/>/g, '&gt;')
        s = s.replace(/ /g, '&nbsp;')
        s = s.replace(/'/g, '&#39;')
        s = s.replace(/"/g, '&quot;')
        s = s.replace(/(&lt;)br(&gt;)/gi, function () {
          if (arguments.length > 1) {
            return '<br>'
          }
        })
        return s
      },
      htmlDecode (str) {
        let s = ''
        if (str.length === 0) return ''
        s = str.replace(/&amp;/g, '&')
        s = s.replace(/&lt;/g, '<')
        s = s.replace(/&gt;/g, '>')
        s = s.replace(/&nbsp;/g, ' ')
        s = s.replace(/&#39;/g, '\'')
        s = s.replace(/&quot;/g, '"')
        return s
      },
      addTabBtn () {
        // 添加tab组件按钮
        const self = this
        let btn = {
          text: '',
          link: '',
          imagePath1: '',
          imagePath2: ''
        }
        self.editLayer.tabConfig.btnList.push(btn)
      },
      deleteTabBtn (index) {
        // 删除tab组件按钮
        const self = this
        self.editLayer.tabConfig.btnList.splice(index, 1)
      },
      // 初始化非全屏时，appear，disappear监听事件
      _initAppearEvent () {
        /* eslint-disable no-undef */
        window.floorappear = appearEvent.appear('appear')
      },
      uploadImg (e) {
        // 图片上传
        const self = this
        let file = e.target.files[0]
        if (file && file.length === 0) return
        let fileName = file.name
        let suffix = fileName.split('.')[1]
        if (!regImg.test(suffix)) {
          self.$alert('请选择图片上传', '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        /* eslint-disable no-undef */
        let form = new FormData()
        form.append('image', file)
        let loadingInstance = Loading.service({ fullscreen: true })
        self.$api.common.upload(form).then(res => {
          if (res.code === 0) {
            let data = res.data
            // 回填数据
            let floors = self.floors
            if (self.uploadImgInfo.type === 'floorbg') {
              // 上传楼层背景图片
              for (let i = 0; i < floors.length; i++) {
                if (floors[i].id === self.uploadImgInfo.floorId) {
                  floors[i].bgimg = data.imagePath
                  break
                }
              }
            } else if (self.uploadImgInfo.type === 'layer' || self.uploadImgInfo.type === 'layerbg') {
              // 上传图片图层的图片 or 图层的背景图片
              for (let i = 0; i < floors.length; i++) {
                if (floors[i].id === self.uploadImgInfo.floorId) {
                  let layers = floors[i].layer
                  for (let j = 0; j < layers.length; j++) {
                    if (layers[j].id === self.uploadImgInfo.layerId) {
                      if (self.uploadImgInfo.type === 'layer') {
                        layers[j].content = data.imagePath
                      } else {
                        layers[j].bgimg = data.imagePath
                      }
                      var img = new Image()
                      img.src = data.imagePath
                      img.onload = function () {
                        layers[j].width = img.width + 2
                        layers[j].height = img.height + 2
                        self.updateLayer()
                      }
                      break
                    }
                  }
                }
              }
            } else if (self.uploadImgInfo.type === 'share') {
              // 上传分享图片
              self.share.img = data.imagePath
            } else if (self.uploadImgInfo.type === 'turntable') {
              // 上传大转盘图片
              self.editLayer.turntableConfig.turntable = data.imagePath
            } else if (self.uploadImgInfo.type === 'turntableButton') {
              // 上传大转盘按钮
              self.editLayer.turntableConfig.button = data.imagePath
            } else if (self.uploadImgInfo.type === 'lantern') {
              // 上传跑马灯背景图片
              self.editLayer.lanternConfig.lantern = data.imagePath
            } else if (self.uploadImgInfo.type === 'videoPoster') {
              // 上传视频封面
              self.editLayer.videoConfig.poster = data.imagePath
            } else if (self.uploadImgInfo.type === 'tab') {
              // 上传tab组件图片
              let [btnIndex, imageIndex] = self.uploadImgInfo.tabIndex.split('-')
              btnIndex = parseInt(btnIndex)
              imageIndex = parseInt(imageIndex)
              self.editLayer.tabConfig.btnList[btnIndex]['imagePath' + imageIndex] = data.imagePath
            }
          } else {
            self.$message.error(res.userMsg)
          }
          loadingInstance.close()
          self.$refs.fileForm.reset()
        }, err => {
          loadingInstance.close()
          self.$refs.fileForm.reset()
          self.$message.error('上传图片失败' + err)
        })
      }
    },
    watch: {
      'floors': {
        handler (val, oldVal) {
          const self = this
          self.lock ++
          if (self.lock === 4) {
            let loadingInstance = Loading.service({ fullscreen: true })
            self.$api.activity.lockTopic({id: self.topicId, platform: self.platform}).then(res => {
              if (res.code === 0) {
                let data = res.data
                if (data.status === 0) {
                  // 锁定成功
                  this.$alert('页面已锁，必须你提交后别人才能编辑', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  })
                } else {
                  // 锁定失败，已被其他用户锁定
                  this.$alert(`当前编辑页已被工号【${data.number}】的同事锁住，请等他提交后再修改！`, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      self.lock = 0
                    }
                  })
                }
              } else {
                self.$message.error(res.userMsg)
              }
              loadingInstance.close()
            }, err => {
              loadingInstance.close()
              self.$message.error('锁定模板失败，请稍后再试' + err)
            })
          }
          if (self.lock > 1000) {
            self.lock = 5
          }
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-topic {
    min-height: 100%;
    background: #626262;
    min-width: 1440px;
  }
  .floor-edit{
    width: 295px;
    position: fixed;
    left: 0;
    top: 150px;
    bottom: 0;
    overflow: auto;
    background-color: #fbfdff;
  }
  .title-box {
    display: inline-block;
    width: 88%;
    .title-box-left {
      display: inline-block;
      max-width: 215px;
      vertical-align: bottom;
    }
    .title-box-right {
      float: right;
      .fa{
        cursor: pointer;
        &:hover {
          color: #20A0FF;
        }
        & + .fa{
          margin-left: 5px;
        }
      }
    }
  }
  .edit-row {
    & + .edit-row {
      margin-top: 8px;
    }
    .edit-item-box {
      line-height: 28px;
      & + .edit-item-box {
        margin-left: 5px;
      }
      select, input, .number {
        height: 28px;
        line-height: 28px;
        border: 1px solid #bfcbd9;
        background-color: #fff;
        border-radius: 4px;
        &:focus {
          outline: none;
          border: 1px solid #20A0FF;
        }
        &:disabled {
          background-color: #eee;
        }
      }
      select {
        height: 30px;
      }
      textarea {
        border: 1px solid #bfcbd9;
        background-color: #fff;
        border-radius: 4px;
        resize: none;
        vertical-align: top;
        box-sizing: border-box;
        height: 68px;
        padding: 0 5px;
        &:focus {
          outline: none;
          border: 1px solid #20A0FF;
        }
      }
      input {
        text-align: center;
      }
      .number {
        display: inline-block;
        width: 30px;
        text-align: center;
        overflow: hidden;
        vertical-align: bottom;
        box-sizing: border-box;
        background-color: #eee;
      }
      .img-url {
        border-right: 0;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        text-align: left;
        padding: 0 5px;
        height: 30px;
        box-sizing: border-box;
        &:focus {
          border-right: 0;
        }
      }
      .fa{
        cursor: pointer;
        margin-left: 5px;
        font-size: 15px;
        &.btn:hover {
          color: #20A0FF;
        }
        &.btn {
          & + .btn {
            margin-left: 15px;
          }
        }
        &.btn-set {
          color: #c8c8c8;
          & + .btn-set {
            margin-left: 15px;
          }
          &.active {
            color: #333;
          }
        }
      }
    }
  }
  .btn-add-floor {
    display: block;
    width: 90%;
    margin: 10px auto 0px;
    height: 40px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    border-radius: 5px;
    &:hover{
      background-color: #58B7FF;
    }
  }
  .floor-upload {
    display: inline-block;
    width: 76px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    vertical-align: top;
    &:hover{
      background-color: #58B7FF;
    }
  }
  .btn-normal {
    display: inline-block;
    width: 76px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    &:hover{
      background-color: #58B7FF;
    }
    &.disabled {
      background-color: #c8c8c8;
    }
    &.disabled:hover{
      background-color: #c8c8c8;
    }
  }
  .content {
    padding-top: 150px;
    padding-bottom: 10px;
  }
  .code-wrapper {
    border: 1px solid #ddd;
  }
  // 图层编辑
  .lay-edit {
    height: 140px;
    position: fixed;
    top: 0;
    width: 100%;
    min-width: 1470px;
    background-color: #fff;
    border-bottom: 1px solid #dfe6ec;
    .edit-box {
      border-right: 1px solid #dfe6ec;
    }
    .edit-box-inner {
      box-sizing: border-box;
      height: 140px;
      padding: 10px 10px 20px;
    }
    .edit-box-name {
      margin-top: -20px;
      line-height: 20px;
      height: 20px;
      color: #bbb;
      text-align: center;
      font-size: 12px;
    }
  }
  .tip {
    font-size: 12px;
    color: #999;
    line-height: 16px;
  }
  // 可视化编辑区域样式
  .topic-floor {
    border-bottom: solid 1px #4affff;
  }
  // PC样式
  .content-pc {
    .topic-floor {
      &.float-floor {
        position: fixed;
        width: 140px;
        right: 35px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none;
        .floor-wrapper {
          width: 140px;
          border: none;
        }
      }
      .floor-wrapper {
        position: relative;
        height: 100%;
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        border-left: solid 1px #4affff;
        border-right: solid 1px #4affff;
      }
      .layer {
        .marquee-item {
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 1.5;
          .prize {
            color: #ff6700;
          }
        }
      }
    }
  }
  // M样式
  .content-m {
    .topic-floor {
      width: 750px;
      margin: 0 auto;
      &.float-floor {
        position: fixed;
        right: 10px;
        bottom: 20px;
        width: 160px;
        overflow: hidden;
        border: 0;
        .floor-wrapper {
          width: 100%;
        }
      }
    }
    &.edit-mode {
      .topic-floor {
        &.float-floor {
          right: 160px;
        }
      }
    }
    .floor-wrapper {
      position: relative;
      height: 100%;
      width: 750px;
      font-size: 28x;
      &.fullpage {
        position: absolute;
        width: 100%;
        height: 1100px;
        top: 50%;
        margin-top: -550px;
        border-top: dotted 1px #ddd;
        border-bottom: dotted 1px #ddd;
      }
      .layer {
        .marquee-item {
          font-size: 28px;
          color: #fff;
          text-align: center;
          .prize {
            color: #ff6700;
          }
        }
      }
    }
  }
  .layer {
    width:180px;
    height:50px;
    position:absolute;
    border: 1px dotted #333;
    &.layer-edit {
      background-color: rgba(0,0,0,.3);
      animation: layerBg 2s ease-in-out infinite;
    }
    .handle{
      border:1px solid #000;
      background:#fff;
      opacity:.9
    }
    .layer-inner {
      height: 100%;
      width: 100%;
      overflow: hidden;
      .layer-image {
        width: 100%;
      }
    }
  }
  @keyframes layerBg{
    0%{background-color:rgba(0,0,0,.3)}
    50%{background-color:rgba(255,255,255,.3)}
    100%{background-color:rgba(0,0,0,.3)}
  }
  .btn-show-menus {
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 30px;
    color: #ddd;
  }
  .uploader {
    border: 1px solid #bfcbd9;
    min-height: 34px;
    border-radius: 3px;
  }
  .uploader .uploader-btn {
    margin-right: 4px;
  }
  .uploader .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .tab-item-delete {
    color: #97a8be;
    &:hover{
      color: #20a0ff;
    }
  }
</style>
