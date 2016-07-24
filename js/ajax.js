/*ajax({
	url:"new.php",//必传
	type="GET"//可传 GET
	data:     //name="zhangsan"&"age"=18{"name":"zhangsan","age","18"}\
	asynch:true;
	success:function(){
	dataType:"json "//text json xml
	}
  })*/
function ajax(obj){
	var obj=obj||{};
	if(!obj.url){
		return;
	}
	/*
	初始化参数 type asynch dataType data */
    var type=obj.type?obj.type:"GET";
    var asynch=obj.asynch?obj.asynch:true;
    var dataType=obj.dataType?obj.dataType:"json";
    var data="";
    if(typeof obj.data=="string"){
       data=obj.data
    }else if(typeof obj.data=="object"){
    	for(var i in obj.data){
            data+=(i+"="+obj.data[i]+"&")
    	}
    	data=data.slice(0,-1);
    }
    /*创建对象*/
    var xml= XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    /*打开请求，发送请求*/
    if(type=="GET"){
    	xml.open(type,obj.url+"?"+data,asynch);
    	xml.send(null);
    }else if(type=="POST"){
    	xml.open(type,obj.url,asynch);
    	xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    	xml.send(data)
    }
    //开始获取数据
    xml.onreadystatechange=function(){
    	//连接服务器
    	if(xml.readyState==4){
    		//h获取数据是否成功
		 		if(xml.status==200){
		 			//数据是否连接成功 ，转化成数据类型
		 			if(dataType=="text"){
		 				obj.success(xml.responseText);
		 			}else if(dataType=="json"){
		 				obj.success(eval("("+xml.responseText+")"))
		 			}else if (dataType=="xml"){
                     obj.success(xml.responseXML);
		 			}

		 		
		 	}
		 }
    }
 //xml.open(type,obj.url+"?name="+data)
 console.log(data)
}