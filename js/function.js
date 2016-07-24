/*
getClass("one",[context])
获取具有指定class的集合
select  指定的className
context 指定的范围 如果传入指定的范围那么我们就在指定的范围查询，
                   如果不传的话context=document
思路：
context初始化
1.判断浏览器
document.getElementsByClassName
2.获取指定的元素
true  w3c
  document.getElementsByClassName()

false  ie6-8
   获取所有的元素
   遍历所有的元素
   筛选  obj.className==select
          arr.push(obj)

        return arr
*/ 
function getClass(select,context){
	var context=context?context:document;
	if(document.getElementByClassName){
		return context.getElementByClassName(select);//w3c
	}else{
		var all=context.getElementsByTagName("*");//ie6~8
		var arr=[];
		for(var i=0;i<all.length;i++){
			//"one two three"  "one"
			//当前元素的className是否包含指定的select
			if(checkClass(all[i].className,select)){
				arr.push(all[i]);
			}
		}
		return arr;

	}
}
 //          one two three four    one
 //classname是否包含指定的select
 //all[i].className->classname   select->select
function checkClass(classname,select){
	var arr=classname.split(" ");//切割开变数组
	//"one two three four"->arr["one" "two" "three" "four"]
	for(var i=0;i<arr.length;i++){
		if(arr[i]==select){
			return true;
		}
	}
	return false;	
}

/*
setcontent(obj,[val])
obj  指定的对象
val   要设置的值
1.判断val
如果val有值  设置obj的文本
如果val没有值  获取obj的文本
*/ 
function setcontent(obj,val){
	if(val==undefined){
		if(obj.innerText){
			obj.innerText=val;
		}else{
			obj.textContent=val;
		}
				
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}		
	}
}

//优化
/*$(string)获取页面中的元素
".one"获取指定类名的元素的集合
"#one"获取指定id的第一个元素
"div"获取指定标签的元素的集合

思路：
第一步：
      判断字符串的首字符
      .  getClass()
      #   document.getElementById
      div标签   document.getElementsByTagName
      <div>  创建一个div
*/
function $(selecctor,context){
	if(typeof selecctor=="string"){
		var context=context||document;//初始化  范围
		var selecctor=trim(selecctor);
		if(selecctor.charAt(0)=="."){
			//.one->one
			return getClass(selecctor.slice(1),context);
		}else if(selecctor.charAt(0)=="#"){
			//#one->one
			return context.getElementById(selecctor.slice(1));
		}else if(/^[a-z][a-z1-6]{0,8}$/.test(selecctor)){
			//div
			return context.getElementsByTagName(selecctor);
		}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(selecctor)){
			return document.createElement(selecctor.slice(1,-1));
		}
	}else if(typeof selecctor=="function"){//$(function(){})
		// window.onload=function(){
		// 	selecctor();
		// }
		addEvent(window,"load",selecctor);
	}	
}
//字符串去空的正则表达式
		function trim(str,type){
			//初始化
			var type=type||"both";
			if(type=="left"){
				var reg=/^\s*/;
				return str.replace(reg,"");
			}else if(type=="right"){
				var reg=/\s*$/;
				return str.replace(reg,"");
			}else if(type=="both"){
				var reg=/^\s*|\s*$/g;
				return str.replace(reg,"");
			}else if(type=="all"){
				var reg=/\s*/g;
				return str.replace(reg,"");
			}
		}

/*
getStyle(one,"width")
attr   属性
用来获取指定元素指定的样式
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		// alert(1)
		return obj.currentStyle[attr];//.attr会报错，因为下标会超出，解决方法：给每一个对象添加一个下标，所以用[attr]
	}else{
		// alert(obj)
		return getComputedStyle(obj,null)[attr];
	}
}

/*
obj  指定的对象
type  获取子节点的类型

思路：第一步：获取所有的子节点
	          初始化
      第二步：声明一个空数组
      第三步：遍历所有的子节点
      		通过子节点的类型判断
      		true  child[i].nodeType==1
      		false  child[i].nodeType==1||(child[i].nodeType==3&&(/^\s+$/.test(child[i].nodeValue)))
      第四步：返回数组
			
*/ 
//获取指定元素的子节点
function getChild(obj,type){
	var child=obj.childNodes;
	var type=type==undefined?true:type;
	var arr=[];
	for(var i=0;i<child.length;i++){
		if(type==true){
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}
		}else{
			if(child[i].nodeType==1||(child[i].nodeType==3&&!(/^\s+$/.test(child[i].nodeValue)))){
				arr.push(child[i]);
			}
		}
	}
	return arr;
}
//获取指定元素的第一个子节点
function firstChild(obj,type){
	return getChild(obj,type)[0];
}
//获取指定元素的最后一个子节点
function lastChild(obj,type){
	return getChild(obj,type)[getChild(obj,type).length-1];
}
//获取指定元素的任意一个子节点
function randomChild(obj,type,num){
	return getChild(obj,type)[num];
}


/*
思路：
 	获取下一个元素节点
	判断obj是否有下一个元素节点
	判断next:==null
    没有   false 
    有     while(注释类型||文本类型){
		更新next=next.nextSibling
		next  判断是否为空   		   
    }
    return next 		   
*/ 
//获取指定元素的下一个元素节点
function getNext1(obj){
	var next=obj.nextSibling;	
	if(next==null){
		return false;
	}
	while(next.nodeType==8||next.nodeType==3){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next;
}
function getNext2(obj){
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	while(next.nodeType==8||(next.nodeType==3&&/^\s+$/.test(next.nodeValue))){
		next=next.nextSibling;
		if(next==null){
			return false;
		}
	}
	return next;
}

function getNext(obj,type){
	if(type){
		return getNext1(obj,type);
	}else{
		return getNext2(obj,type);
	}
}

//获取指定元素的上一个元素节点
function getPrevious1(obj){
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	while(previous.nodeType==8||previous.nodeType==3){
		previous=previous.nextSibling;
		if(previous==null){
			return false;
		}
	}
	return previous;
}

function getPrevious2(obj){
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	while(previous.nodeType==8||(previous.nodeType==3&&/^\s+$/.test(previous.nodeValue))){
		previous=previous.nextSibling;
		if(previous==null){
			return false;
		}
	}
	return previous;
}

function getPrevious(obj,type){
	if(type){
		return getPrevious1(obj,type);
	}else{
		return getPrevious2(obj,type);
	}
}


/*
insertAfter(obj,obj1)
将obj插入到obj1后面
思路：将obj插入到obj1下一个兄弟节点的前面
	1.获取obj1的下一个兄弟节点和父元素
	2.判断下一个兄弟节点
	true  parent.insertBefore(obj,next);
	false  parent.appendChild(obj)
*/
//将obj插入到obj1后面
function insertAfter(obj,obj1){
	var next=getNext(obj1);
	// console.log(next)
	var parent=obj1.parentNode;
	if(next){
		parent.insertBefore(obj,next);
	}else{
		parent.appendChild(obj);
	}
}

//将obj插入到obj1里面
function insertBefore(obj,obj1){
	var parent=obj1.parentNode;
	parent.appendChild(obj);
}

/*
appendBefore(obj,obj1)
//将obj插入到父元素obj1的最前面
思路：
	1.获取obj1的第一个子元素first
	2.
	true  obj1.insertBefore(obj,first);
	false  obj1.appendChild(obj);
*/
//将obj插入到父元素obj1的最前面
function appendBefore(obj,obj1){
	var first=obj1.firstChild;
	if(first){
		obj1.insertBefore(obj,first);
	}else{
		obj1.appendChild(obj);
	}
}


/*
//添加事件
addEvent(one,"click",aa)
*/ 
function addEvent(obj,type,fn){
	if(obj.attachEvent){
		obj.attachEvent("on"+type,fn);
	}else{
		obj.addEventListener(type,fn,false);
	}
}
//删除事件
function removeEvent(obj,type,fn){
	if(obj.attachEvent){
		obj.detachEvent("on"+type,fn);
	}else{
		obj.removeEventListener(type,fn,false);
	}
}

/*
offset()   获取obj到浏览器的距离
{left:左边,top:上边}
思路：
1.获取具有定位属性的父元素
2.将所有父元素的offsetLeft+(border-left)+自身offsetLeft
*/

//获取obj到浏览器的距离
function offset(obj){
	var result={left:0,top:0};
	var arr=[];
	arr.push(obj);
	//1.获取所有具有定位属性的父元素
	var parent=obj.parentNode;
	while(parent.nodeName!=="BODY"){
		
		if(getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute"){
			arr.push(parent);
		}
		//更新parent
		parent=parent.parentNode;
	}
	// 2.将所有父元素的offsetLeft+(border-left)+自身offsetLeft
	for(var i=0;i<arr.length;i++){
		var left=arr[i].offsetLeft;
		// console.log(left)
		var borderleft=getStyle(arr[i],"border-left")?parseInt(getStyle(arr[i],"border-left")):0;
		if(i==0){
			borderleft=0;
		}
		var top=arr[i].offsetTop;
		var bordertop=getStyle(arr[i],"border-top")?parseInt(getStyle(arr[i],"border-top")):0;
		if(i==0){
			bordertop=0;
		}
		// console.log(left)
		result.left+=(left+borderleft);
		result.top+=(top+bordertop);
	}
	return result;
	
}

       //滚轮事件的兼容函数
		function mousewheel(obj,downfn,upfn){
			if(document.attachEvent){
				document.attachEvent("onmousewheel",scrollFn); //IE、 opera
			}else if(document.addEventListener){
				document.addEventListener("mousewheel",scrollFn,false);
				//chrome,safari -webkit-
				document.addEventListener("DOMMouseScroll",scrollFn,false);
				//firefox -moz-
		    }

			function scrollFn(e){
				var ev=e||window.event;
				var dir=ev.wheelDelta||ev.detail;//dir向上向下的值
				//阻止默认浏览器动作
				if(ev.preventDefault){
					ev.preventDefault(); //阻止默认浏览器动作(W3C)
				}else{
					ev.returnValue = false;//IE中阻止函数器默认动作的方式
				}

				if(dir==-120||dir==3){
					downfn.call(obj);
				}else if(dir==120||dir==-3){
					upfn.call(obj);
				}
			}
		}


		

		