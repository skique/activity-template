/* appear.js 1.0.3 */
appear=(function(){var scrollLastPos=null,scrollTimer=0,scroll={};function track(){var newPos=window.scrollY||window.pageYOffset;if(scrollLastPos!=null){scroll.velocity=newPos-scrollLastPos;scroll.delta=(scroll.velocity>=0)?scroll.velocity:(-1*scroll.velocity)}scrollLastPos=newPos;if(scrollTimer){clearTimeout(scrollTimer)}scrollTimer=setTimeout(function(){scrollLastPos=null},30)}if(window.addEventListener){addEventListener("scroll",track,false)}else{if(window.attachEvent){attachEvent("onscroll",track)}}function viewable(el,bounds){var rect=el.getBoundingClientRect();return((rect.top+rect.height)>=0&&(rect.left+rect.width)>=0&&(rect.bottom-rect.height)<=((window.innerHeight||document.documentElement.clientHeight)+bounds)&&(rect.right-rect.width)<=((window.innerWidth||document.documentElement.clientWidth)+bounds))}return function(obj){return(function(obj){var initd=false,elements=[],elementsLength,reappear=[],appeared=0,disappeared=0,timer,deltaSet,opts={},done;function debounce(fn,delay){return function(){var self=this,args=arguments;clearTimeout(timer);timer=setTimeout(function(){fn.apply(self,args)},delay)}}function checkAppear(){if(scroll.delta<opts.delta.speed){if(!deltaSet){deltaSet=true;doCheckAppear();setTimeout(function(){deltaSet=false},opts.delta.timeout)}}(debounce(function(){doCheckAppear()},opts.debounce)())}function begin(){doCheckAppear();if(window.addEventListener){addEventListener("scroll",checkAppear,false);addEventListener("resize",checkAppear,false)}else{if(window.attachEvent){attachEvent("scroll",checkAppear);attachEvent("resize",checkAppear)}}}function end(){elements=[];if(timer){clearTimeout(timer)}removeListeners()}function removeListeners(){if(window.removeEventListener){removeEventListener("scroll",checkAppear,false);removeEventListener("resize",checkAppear,false)}else{if(document.detachEvent){detachEvent("scroll",checkAppear);detachEvent("resize",checkAppear)}}}function doCheckAppear(){if(done){return}elements.forEach(function(n,i){if(n&&viewable(n,opts.bounds)){if(reappear[i]){reappear[i]=false;appeared++;if(opts.appear){opts.appear(n)}if(!opts.disappear&&!opts.reappear){elements[i]=null}}}else{if(reappear[i]===false){if(opts.disappear){opts.disappear(n)}disappeared++;if(!opts.reappear){elements[i]=null}}reappear[i]=true}});if(!opts.reappear&&(!opts.appear||opts.appear&&appeared===elementsLength)&&(!opts.disappear||opts.disappear&&disappeared===elementsLength)){done=true;removeListeners();if(opts.done){opts.done()}}}function init(){if(initd){return}initd=true;if(opts.init){opts.init()}var els;if(typeof opts.elements==="function"){els=opts.elements()}else{els=opts.elements}if(els){elementsLength=els.length;for(var i=0;i<elementsLength;i+=1){elements.push(els[i]);reappear.push(true)}begin()}}return function(obj){obj=obj||{};opts={init:obj.init,elements:obj.elements,appear:obj.appear,disappear:obj.disappear,done:obj.done,reappear:obj.reappear,bounds:obj.bounds||0,debounce:obj.debounce||50,delta:{speed:obj.deltaSpeed||50,timeout:obj.deltaTimeout||500}};if(window.addEventListener){addEventListener("DOMContentLoaded",init,false)}else{if(window.attachEvent){attachEvent("DOMContentLoaded",init)}}var isIE10=false;if(Function("/*@cc_on return document.documentMode===10@*/")()){isIE10=true}var completeOrLoaded=document.readyState==="complete"||document.readyState==="loaded";if(isIE10){if(completeOrLoaded){init()}}else{if(completeOrLoaded||document.readyState==="interactive"){init()}}return{trigger:function trigger(){doCheckAppear()},pause:function pause(){removeListeners()},resume:function resume(){begin()},destroy:function destroy(){end()}}}}()(obj))}}());

// 一些通用方法封装
window.appearEvent = {
    // 元素进入可视区域，离开可视区域事件处理
    appear: function(className) {
    	// 自定义appear，disappear事件
    	var checkEles = this.getElementsByClassName(document,'appear');

    	var evt = {
    		appear: createInitEvent('appear') ,
    		disappear: createInitEvent('disappear')
    	};

    	// 创建并初始化事件
    	function createInitEvent(type) {
    		if (document.createEvent) {
    			var evt = document.createEvent("HTMLEvents");
    			evt.initEvent(type, false, false);
    			return evt;
    		}
    	}

    	// 自定义事件派发
    	function dispatchEvent(el, type) {
    		if (typeof type === "string") {
    	        if (document.dispatchEvent) {
    	            if (evt[type]) {
    	                el.dispatchEvent(evt[type]);
    	            }
    	        } else if (document.attachEvent) {
    	            // 改变对应自定义属性，触发自定义事件
    	            el["cu" + type]++;
    	        }    
    	    }
    	}

    	// appear.js插件调用
    	var height = window.innerHeight - 400;
    	
    	var ap = appear({
			elements: function elements(){
				return checkEles;
			},
			appear: function appear(el){
				dispatchEvent(el, 'appear');
			},
			disappear: function disappear(el){
				dispatchEvent(el, 'disappear');
			},
			bounds: -height,
			reappear: true
    	});

    	// 对appear和disappear事件增加监听事件
    	// params:{els:elements对象,appCallback:function,disCallback:function}
    	function _addEvents(params) {
    		var els = params.els;
    		if (els.length > 1) {
    			for (var i = 0; i < els.length; i++) {
    				_addEvent(els[i], params);
    			}
    		} else {
    			_addEvent(els, params);
    		}
    	}

    	function _addEvent(el, params) {
    		if (window.addEventListener) {
                if (typeof el === 'object' && !isNaN(el.length)) {
                    el = el[0];
                }
    			typeof params.appCallback==='function' && el.addEventListener('appear', params.appCallback);
    			typeof params.disCallback==='function' && el.addEventListener('disappear', params.disCallback);
    		} else if (window.attachEvent) {
    			if (params.appCallback && typeof params.appCallback==='function') {
    				el.attachEvent("onappear", params.appCallback);
    				evnetsForIE('appear', el, params.appCallback);
    			}
    			if (params.disCallback && typeof params.disCallback==='function') {
    				el.attachEvent("disappear", params.disCallback);
    				evnetsForIE('disappear', el, params.disCallback);
    			}
    		}
    	}

		// events for IE
		function evnetsForIE(type,el,callback) {
			if (isNaN(el["cu" + type])) {
	            // 自定义属性，触发事件用
	            el["cu" + type] = 0; 
	        }
	        
	        var fnEv = function(event) {
	            if (event.propertyName == "cu" + type) {
	                callback.call(el);
	            }
	        };
	        
	        el.attachEvent("onpropertychange", fnEv);
	        
	        // 在元素上存储绑定的propertychange事件，方便删除
	        if (!el['ev'+type]) {
	            el['ev'+type] = [fnEv];
	        } else {
	            el['ev'+type].push(fnEv);
	        }
		}

    	// 删除appear和disappear事件
    	// params:{els:elements对象,type:appear/disappear,delFunction:function(必须，指定要删除的方法)}

    	function _removeEvents(params) {
    		var els = params.els;
    		if (els.length > 1) {
    			for (var i = 0; i < els.length; i++) {
    				_removeEvent(els[i], params);
    			}
    		} else {
    			_removeEvent(els, params);
    		}
    	}

    	function _removeEvent(el,params) {
    		if (window.removeEventListener) {
				el.removeEventListener(params.type, params.delFunction);
    		} else if (document.detachEvent) {
    			
    			el.detachEvent("on"+type);
    			var arrEv = el["ev" + params.type];
				if (arrEv instanceof Array) {
				  for (var i=0; i<arrEv.length; i+=1) {
				      // 删除该方法名下所有绑定的propertychange事件
				      el.detachEvent("onpropertychange", arrEv[i]);
				  }
				}
    		}
    	}
    	return {
    		addEvent: _addEvents,
    		removeEvent: _removeEvents
    	};
    },
    // 兼容处理getElementsByClassName
    getElementsByClassName: function(node,classname){
	    if(node.getElementsByClassName) {
	        return node.getElementsByClassName(classname);
	    }else {
	        var results = [];
	        var elems = node.getElementsByTagName("*");
	        for(var i = 0; i < elems.length; i++){
	            if(elems[i].className.indexOf(classname) != -1){
	                results[results.length] = elems[i];
	            }
	        }
	        return results;
	    }
	}
}