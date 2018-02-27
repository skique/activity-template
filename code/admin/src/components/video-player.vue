<style scoped>
  .video-box{position:relative;background:#000;}
  .video-box:-webkit-full-screen{width:100%;height:100%;}
  .video{width:100%;height:100%;display:block;}
  .video::-webkit-media-controls {display:none !important;}
  .video-logo{position:absolute;top:20px;left:20px;}
  .gesture-mask{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;justify-content:center;align-items:center;z-index:1;}
  .ie9 .play-btn{position:absolute;left:50%;top:50%;margin-left:-10px;margin-top:-10px}
  .control{height:50px;background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.8));position:absolute;left:0;bottom:0;width:100%;display:flex;align-items:center;z-index:2;}
  .toggle-play{height:50px;width:50px;display:flex;justify-content:center;align-items:center;}
  .progress-bar{display: flex;flex-grow: 1;align-items: center;}
  .video-time{color:#fff;font-size:14px;}
  .bar{background:#eee;height:5px;flex-grow: 1;margin:0 10px;cursor:pointer;transition: height .1s ease;opacity:.9;border-radius:3px;position:relative;}
  .bar:hover{height:10px;}
  .buffered-percent{position:absolute;top:0;left:0;height:100%;background:#ccc;border-radius:3px;}
  .bar-percent{position:absolute;top:0;left:0;height:100%;background:#ff6700;border-radius:3px;}
  .progress-head{position: absolute;width:10px;height:10px;border-radius:100%;right:-2px;top:-2.5px;background:#fff;transition:all .2s ease;}
  .bar:hover .progress-head{top:0;}
  .progress-head:hover{transform:scale(1.3)}
  .tools{display:flex;position:relative}
  .volume{width:40px;height:50px;display: flex;justify-content: center;align-items: center;}
  .volume-control{background:rgba(0,0,0,.9);width:30px;height:90px;position:absolute;bottom:50px;right:55px;}
  .volume-runway{width:4px;height:70px;margin:10px auto;background:#eee;position:relative;}
  .volume-thumb{width:10px;height:10px;border-radius:100%;left:-3px;position:absolute;}
  .full-screen{width:40px;height:50px;display: flex;justify-content: center;align-items: center;margin-right:10px;}
</style>
<template>
  <div class="video-box" ref="videoBox">
    <video
      class="video"
      ref="video"
      :autoplay="autoPlay"
      :controls="isIE&&ieVersion<=10"
      :volume="volume2"
      @durationchange="durationchange"
      @play="play"
      @pause="pause"
      @ended="ended"
      @error="error"
      @waiting="waiting"
      :src="src"
      :poster="poster"
      webkit-playsinline
      playsinline
    ></video>
    <img :src="logo" class="video-logo" :style="{width:isMobile?'80px':'120px'}">
    <div class="gesture-mask" :class="{ie9:isIE&&ieVersion==9}" @click="maskClick" @dblclick="maskDbClick" @mousemove="maskMouseMove" @mouseleave="hideControl">
      <svg v-if="!playing&&!autoPlay" class="play-btn" style="fill:#fff" viewBox="0 0 1024 1024" width="50" height="50">
        <path d="M512.718 1.549C230.377 1.549 1.494 230.432 1.494 512.774S230.377 1024 512.718 1024s511.224-228.884 511.224-511.226S795.06 1.55 512.718 1.55z m0 971.325c-254.108 0-460.102-205.996-460.102-460.102S258.61 52.67 512.718 52.67 972.82 258.665 972.82 512.772 766.826 972.874 512.718 972.874z m232.06-496.332c-79.556-54.133-223.815-135.157-305.959-185.36-33.678-21.239-61.996-12.71-64.717 24.8-1.971 100.468 0 294.317 0 396.523 1.711 38.08 35.282 43.101 64.419 27.812 82.05-49.71 223.071-135.147 305.536-185.11-0.54-0.327 62.614-35.06 0.72-78.665z" p-id="5260"></path>
      </svg>
    </div>
    <transition name="slide-up">
      <div class="control" v-show="showControl&&!(isIE&&ieVersion<11)" @mousemove="controlMouseMove" @mouseleave="hideControl">
        <a href="javascript:" @click="togglePlay" class="toggle-play">
          <svg v-if="!playing||pausing" style="fill:#fff" viewBox="0 0 1024 1024" width="20px" height="20px">
            <path d="M229.365 128c5.045 0 15.864 1.415 32.391 10.711L784.18 480.039l1.474 0.963 1.524 0.88c23.048 13.311 29.141 25.538 29.142 30.143 0.002 4.615-6.095 16.87-29.178 30.221l-1.503 0.869-1.454 0.95L261.78 885.308C245.251 894.588 234.43 896 229.382 896c-6.477 0-8.187-2.129-9.561-3.839-2.069-2.576-8.821-12.918-8.821-37.841V169.642c0-24.892 6.749-35.229 8.817-37.804 1.374-1.71 3.083-3.838 9.548-3.838m0-64C180.666 64 147 102.811 147 169.642V854.32C147 921.206 180.677 960 229.382 960c19.85 0 42.193-6.441 65.776-20.051l524.027-342.302c81.513-47.147 81.513-124.11 0-171.186L295.158 84.085C271.571 70.452 249.218 64 229.365 64z" p-id="5037"></path>
          </svg>
          <svg v-if="playing&&!pausing" style="fill:#fff" viewBox="0 0 1024 1024" width="20px" height="20px">
            <path d="M261.8 135.2h57.3c31.6 0.1 57.2 25.7 57.3 57.3v641.2c-0.1 31.6-25.7 57.2-57.3 57.3h-57.3c-31.6-0.1-57.2-25.7-57.3-57.3V192.4c0.2-31.6 25.7-57.1 57.3-57.2z m446.6 0h57.3c31.6 0.1 57.2 25.7 57.3 57.3v641.2c-0.1 31.6-25.7 57.2-57.3 57.3h-57.3c-31.6-0.1-57.2-25.7-57.3-57.3V192.4c0.1-31.6 25.7-57.1 57.3-57.2z" p-id="1696"></path>
          </svg>
        </a>
        <div class="progress-bar">
          <span class="video-time">{{currentTime|timePretty}}/{{duration|timePretty}}</span>
          <div class="bar" ref="progressBar">
            <div class="buffered-percent" :style="{width:bufferedTime/duration*100+'%'}"></div>
            <div class="bar-percent" :style="{backgroundColor:theme,width:currentTime/duration*100+'%'}">
              <a href="javascript:" class="progress-head"></a>
            </div>
          </div>
        </div>
        <div class="tools">
          <a href="javascript:" @mouseenter="showVolumeControl" @mouseleave="hideVolumeControl" @click="toggleMute" class="volume" v-if="!isMobile">
            <svg v-if="!muted" style="fill:#fff" viewBox="0 0 1024 1024" width="20px" height="20px">
              <path d="M784 371.2c-16-25.6-35.2-44.8-44.8-54.4-9.6-9.6-28.8-9.6-38.4 3.2-9.6 9.6-9.6 28.8 3.2 38.4l9.6 9.6c9.6 9.6 19.2 22.4 25.6 35.2 57.6 86.4 57.6 179.2-38.4 278.4-9.6 9.6-9.6 28.8 0 38.4 9.6 9.6 28.8 9.6 38.4 0 112-121.6 112-243.2 44.8-348.8z" fill="" p-id="1033"></path>
              <path d="M896 246.4c-16-25.6-35.2-48-54.4-70.4-9.6-12.8-19.2-19.2-25.6-25.6-9.6-9.6-28.8-9.6-38.4 3.2-9.6 9.6-9.6 28.8 3.2 38.4 3.2 3.2 12.8 9.6 22.4 22.4 16 19.2 32 38.4 48 64 105.6 160 105.6 336-70.4 518.4-9.6 9.6-9.6 28.8 0 38.4 9.6 9.6 28.8 9.6 38.4 0 195.2-204.8 195.2-409.6 76.8-588.8zM483.2 86.4L265.6 272H156.8C99.2 272 48 320 48 380.8v272c0 60.8 48 108.8 108.8 108.8h96L483.2 944c54.4 41.6 105.6 16 105.6-51.2V137.6c0-70.4-54.4-96-105.6-51.2z m51.2 803.2c0 22.4-3.2 22.4-19.2 9.6L278.4 713.6c-3.2-3.2-9.6-6.4-16-6.4H156.8c-28.8 0-54.4-25.6-54.4-54.4v-272c0-28.8 25.6-54.4 54.4-54.4h118.4c6.4 0 12.8-3.2 16-6.4l224-192c16-12.8 16-12.8 16 6.4v755.2z" fill="" p-id="1034"></path>
            </svg>
            <svg v-if="muted" style="fill:#fff" viewBox="0 0 1024 1024" width="20px" height="20px">
              <path d="M492.24674 96.964307L280.511335 277.562152H174.643632c-56.047607 0-105.867702 46.706339-105.867702 105.867702v264.669256c0 59.161363 46.706339 105.867702 105.867702 105.867703h93.412679L492.24674 931.450902c52.933851 40.478827 102.753946 15.56878 102.753946-49.820095V146.784402c0-68.502631-52.933851-93.412679-102.753946-49.820095z m49.820095 781.552744c0 21.796292-3.113756 21.796292-18.682536 9.341268L292.966359 707.260473c-3.113756-3.113756-9.341268-6.227512-15.56878-6.227511H174.643632c-28.023804 0-52.933851-24.910048-52.933851-52.933852v-264.669256c0-28.023804 24.910048-52.933851 52.933851-52.933851h115.208971c6.227512 0 12.455024-3.113756 15.568779-6.227512L523.384299 137.443134c15.56878-12.455024 15.56878-12.455024 15.56878 6.227512v734.846405h3.113756zM854.53711 513.80014l92.224343-93.106168c26.344078-25.470767-14.938731-66.753576-40.409498-40.400984l-91.343733 93.096438-91.342518-93.096438c-25.470767-26.352592-66.753576 14.930217-40.400983 40.400984l92.224343 93.106168-91.352248 91.342518c-9.658725 14.048391-9.658725 26.352592 0 40.400983 11.423592 10.54055 28.988338 10.54055 40.410714 0l90.461908-92.224343 90.471639 92.224343c25.470767 26.352592 66.753576-14.930217 40.400983-40.400983l-91.34495-91.342518z" p-id="4324"></path>
            </svg>
          </a>
          <div class="volume-control" @mouseenter="showVolumeControl" @mouseleave="hideVolumeControl" v-show="volumeControlVisible">
            <div class="volume-runway" ref="volumeRunway">
              <div class="volume-thumb" ref="volumeThumb" :style="{background:theme,bottom:volume2*70-5+'px'}"></div>
            </div>
          </div>
          <a href="javascript:" @click="toggleFullScreen" class="full-screen">
            <svg v-if="!isFullScreen" style="fill:#fff" viewBox="0 0 1024 1024" width="18px" height="18px">
              <path d="M428 928H141.2l299.2-299.2c12.5-12.5 12.5-32.8 0-45.2s-32.8-12.5-45.2 0L96 882.7V598c0-17.7-14.3-32-32-32s-32 14.3-32 32v362c0 17.7 14.3 32 32 32h364c17.7 0 32-14.3 32-32s-14.3-32-32-32zM598 96h284.8L583.6 395.2c-12.5 12.5-12.5 32.8 0 45.2s32.8 12.5 45.2 0L928 141.3V424c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H598c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="4832"></path>
            </svg>
            <svg v-if="isFullScreen" style="fill:#fff" viewBox="0 0 1024 1024" width="40px" height="40px">
              <path d="M468.936 534.973h-193.544c-10.916 0-19.819 8.903-19.82 19.82s8.903 19.819 19.82 19.82h150.345l-165.673 165.673c-7.432 7.432-7.432 19.432 0 26.864s19.432 7.432 26.864 0l166.835-166.912v152.745c0 10.916 8.903 19.819 19.82 19.82s19.819-8.903 19.82-19.82v-198.189c0-14.943-8.593-19.82-24.464-19.82v0z" p-id="1429"></path><path d="M555.141 495.608h193.544c10.916 0 19.819-8.903 19.82-19.82s-8.903-19.819-19.82-19.82h-150.421l165.673-165.673c7.433-7.432 7.432-19.432 0-26.863s-19.432-7.432-26.864 0l-166.835 166.912v-152.745c0-10.916-8.903-19.819-19.82-19.82s-19.819 8.903-19.82 19.82v198.189c0 12.695 9.909 19.82 24.542 19.82v0z" p-id="1430"></path>
            </svg>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import 'assets/style/transition.css'
  import draggable from 'util/draggable.js'
  export default {
    props: {
      theme: {
        type: [String],
        default: '#ff6700'
      },
      logo: {
        type: [String],
        default: 'http://img2.ch999img.com/static/images/logo.png'
      },
      src: {
        type: [String],
        default: ''
      },
      poster: {
        type: [String],
        default: ''
      },
      autoPlay: {
        type: [Boolean],
        default: false
      },
      loop: {
        type: [Boolean],
        default: false
      },
      volume: {
        type: [Number],
        default: 0.5
      },
      preload: {
        type: [String],
        default: 'meta'
      }
    },
    data () {
      return {
        video: null,
        duration: 0,
        currentTime: 0,
        bufferedTime: 0,
        playTimer: null,
        playing: false,
        pausing: false,
        muted: false,
        volume2: 0,
        isFullScreen: false,
        showControl: false,
        hoverTimer: null,
        volumeControlVisible: false,
        volumeControlTimer: null
      }
    },
    computed: {
      isMobile () {
        return /mobile/.test(navigator.userAgent.toLowerCase())
      },
      isIE () {
        return !!window.ActiveXObject || 'ActiveXObject' in window
      },
      ieVersion () {
        const u = window.navigator.userAgent.toLowerCase()
        if (this.isIE) {
          if (!/rv:11/.test(u)) {
            return parseInt(u.match(/msie (\d+\.\d+)/)[1])
          } else {
            return 11
          }
        }
        return 0
      }
    },
    filters: {
      timePretty (value) {
        let m = Math.floor(value / 60)
        let s = Math.ceil(value % 60)
        if (m < 10) {
          m = '0' + m
        }
        if (s < 10) {
          s = '0' + s
        }
        return (m + ':' + s)
      }
    },
    created () {
      this.volume2 = this.volume
    },
    mounted () {
      const self = this
      if (self.autoPlay) {
        self.playing = true
      }
      self.video = self.$refs.video
      /* progress drag */
      // todo
      /* volume control */
      const volumeThumb = self.$refs.volumeThumb
      let volumeStartY = 0
      const volumeRunwayHeight = 70
      let currentVolume = self.volume2
      draggable(volumeThumb, {
        start: (e) => {
          volumeStartY = e.pageY
          currentVolume = self.volume2
        },
        drag: (e) => {
          let vol = (volumeStartY - e.pageY + currentVolume * volumeRunwayHeight) / volumeRunwayHeight
          if (vol < 0) {
            vol = 0
          }
          if (vol > 1) {
            vol = 1
          }
          self.video.volume = vol
          self.volume2 = vol
        },
        end: (e) => {

        }
      })
      // 进度条
      const video = this.$refs.video
      const progressBar = self.$refs.progressBar
      let progressRunwayWidth = progressBar.getBoundingClientRect().width
      let progressBarX = 0
      draggable(progressBar, {
        start: (e) => {
          self.togglePlay()
          progressRunwayWidth = progressBar.getBoundingClientRect().width
          progressBarX = progressBar.getBoundingClientRect().left || progressBar.getBoundingClientRect().x
        },
        drag: (e) => {
          let dragX = e.clientX - progressBarX
          if (dragX > 0 && dragX <= progressRunwayWidth) {
            let percent = dragX / progressRunwayWidth
            self.currentTime = self.duration * percent
            video.currentTime = self.duration * percent
          }
        },
        end: (e) => {
          let dragX = e.clientX - progressBarX
          if (dragX > 0 && dragX <= progressRunwayWidth) {
            let percent = dragX / progressRunwayWidth
            self.currentTime = self.duration * percent
            video.currentTime = self.duration * percent
          }
          self.togglePlay()
        }
      })
    },
    methods: {
      durationchange (e) {
        this.duration = e.target.duration
      },
      play (e) {
        const self = this
        clearInterval(self.playTimer)
        self.playTimer = setInterval(() => {
          self.currentTime = e.target.currentTime
          self.bufferedTime = e.target.buffered.end(0)
          // console.log('Start: ' + e.target.buffered.start(0) + ' End: ' + e.target.buffered.end(0))
        }, 200)
        this.playing = true
        self.pausing = false
        self.showControl = true
        self.hideControl()
      },
      pause () {
        this.pausing = true
        clearInterval(this.playTimer)
        this.showControl = true
        clearTimeout(this.hoverTimer)
      },
      ended () {
        this.playing = false
      },
      error () {

      },
      waiting () {

      },
      togglePlay () {
        const self = this
        if (self.video.played.length === 0) { // 第一次播放
          self.video.play()
        } else {
          if (self.video.paused) {
            self.video.play()
            return
          }
          self.video.pause()
        }
      },
      maskClick () {
        const self = this
        if (!self.isMobile) {
          self.togglePlay()
        } else {
          if (!self.playing) { // 第一次播放
            self.video.play()
          } else {
            self.showControl = !self.showControl
            if (self.showControl) {
              self.hideControl()
            }
          }
        }
      },
      maskDbClick () {
        if (!this.isMobile) {
          this.toggleFullScreen()
        } else {
          this.togglePlay()
        }
      },
      maskMouseMove () {
        const self = this
        if (self.playing && !self.isMobile) {
          self.showControl = true
          self.hideControl()
        }
      },
      controlMouseMove () {
        clearTimeout(this.hoverTimer)
      },
      hideControl () {
        const self = this
        if (!self.pausing) {
          clearTimeout(self.hoverTimer)
          self.hoverTimer = setTimeout(() => {
            self.showControl = false
          }, 3000)
        }
      },
      progressbarClick (e) {
        const video = this.$refs.video
        let width = this.$refs.progressBar.getBoundingClientRect().width
        let clickX = e.offsetX
        let percent = clickX / width
        this.currentTime = this.duration * percent
        video.currentTime = this.duration * percent
      },
      toggleMute () {
        this.video.muted = !this.video.muted
        this.muted = this.video.muted
      },
      showVolumeControl () {
        clearTimeout(this.volumeControlTimer)
        this.volumeControlVisible = true
      },
      hideVolumeControl () {
        clearTimeout(this.volumeControlTimer)
        this.volumeControlTimer = setTimeout(() => {
          this.volumeControlVisible = false
        }, 300)
      },
      toggleFullScreen () {
        let video = this.$refs.video
        if (!this.isMobile || !this.isIE) {
          video = this.$refs.videoBox
        }
        let isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
        if (!isFullscreen) {
          (video.requestFullscreen && video.requestFullscreen()) ||
          (video.mozRequestFullScreen && video.mozRequestFullScreen()) ||
          (video.webkitRequestFullscreen && video.webkitRequestFullscreen()) ||
          (video.msRequestFullscreen && video.msRequestFullscreen())
          this.isFullScreen = true
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
          this.isFullScreen = false
        }
      }
    }
  }
</script>
