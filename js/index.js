window.onload=function(){
	var sence=document.getElementById('sence');
	var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:0,y:3}]//id=0_0  id=0_1
	var dict={};//{json}  字典 保存保存小蛇的身体
	for(var i in snake){
		dict[snake[i].x+'_'+snake[i].y]=true;
	}
	console.log(dict);
	var dir=39;
	// console.log(sence)

	//创建小鸽子
	for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			var div=document.createElement('div');
			//设置样式
			// div.style.cssText="width:29px;height:29px;background:#fff;margin-left:1px;margin-top:1px;float:left;"  //很麻烦的方法
			div.className='b';//简单的方法
			div.id=i+'_'+j;
			sence.appendChild(div);
		}
	}

	//创建贪吃蛇
	for(var i=0;i<snake.length;i++){
		document.getElementById(snake[i].x+'_'+snake[i].y).className='b s';
	}

	//函数move
	function move(){
		//获取head
		var h=snake[snake.length-1];
		//新蛇头
		var nh=null;
		//判断
		if(dir==37){
			nh={x:h.x,y:h.y-1};
		}
		if(dir==38){
			nh={x:h.x-1,y:h.y};
		}
		if(dir==39){
			nh={x:h.x,y:h.y+1};
		}
		if(dir==40){
			nh={x:h.x+1,y:h.y};
		}
		//碰到边界 游戏结束
		if(dict[nh.x+'_'+nh.y]||nh.y<0||nh.x<0||nh.y>19||nh.x>19){
			clearInterval(t);
			alert('GAME OVER!');
			return false;
		}
		//吃完食物再调用
		if(nh.x==fod.x&&nh.y==fod.y){
			fod=food();
		}else{
			//清除尾部
			var w=snake.shift();
			dict[nh.x+'_'+nh.y]=true;
			delete dict[w.x+'_'+w.y];
			document.getElementById(w.x+'_'+w.y).className='b';
		}
		document.getElementById(nh.x+'_'+nh.y).className='b s';
		snake.push(nh);	
	}

	//键盘事件
	document.onkeydown=function(){
		t=setInterval(move,300);
		document.onkeydown=function(e){
			var ev=e||window.event;//e在前面 现代浏览器效率高
			//防止按了左按右
			if(Math.abs(dir-ev.keyCode==2)){//Math.abs取绝对值
				return false;
			}
			// alert(ev.keyCode);  检测一下键盘事件
			dir=ev.keyCode;			
		}
	}

	var fod=food();//调用函数  猜执行function food(){}
	//食物
	function food(){
		var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*19);
		while(dict[x+'_'+y]){
			x=Math.floor(Math.random()*19);
			y=Math.floor(Math.random()*19);
		}
		//创建食物
		document.getElementById(x+'_'+y).className='b f';
		return{x:x,y:y};
	}
}