var url = "http://h5.yesno.com.cn/points_mahle/User/TestCode";
var urlusercenter="http://h5.yesno.com.cn/points_mahle/User/UserLogin";
var urllogin="http://h5.yesno.com.cn/points_mahle/User/UserLogin?Length=0";
var index="http://h5.yesno.com.cn/points_mahle/Home/Index/100025";
var username = "15012345678"//你的用户名
var password = "xxxxxxxxxx"//你的密码
var getRes;
var cookiearr=[];
var tid="";
var jsid="";
var sessionid="";
var dcode='1716382943305008';
var dcodeFilepath=("/storage/emulated/0/Qrcode/二维码扫描导出记录_20201027065800.txt");


login();
console.show();
log(jifen(dcode).body.string());
//jifenFromfile();
console.log("积分码"+':'+dcode);
exit();


function login(mode){
    if(mode==1){
    sessionid=files.read("1.txt");
log("存储的sessionid'"+sessionid+"'")
return 0;
    }
try{
getid();
}catch(e){
    log(e);
    }
getid();
sessionid=tid;
rlogin();
console.log(sessionid);
files.write("1.txt",sessionid);

}

    function getid(){
var res=http.get(index, {
    headers: {
        'Host': 'h5.yesno.com.cn',
'Connection': 'keep-alive',
'Upgrade-Insecure-Requests': '1',
'User-Agent': 'Mozilla/5.0 (Linux; Android 9; V1813A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
'cookie':tid
        }
    });
    getRes=res;//内部函数映射到外部

//Set-Cookie: __jsluid_h=301c562326b45b6057e724258b4611b1;

cookiearr=res.headers['Set-Cookie'].split(";");
 //alert(cookiearr[0]);有时候会因为得到的cookie不正确报错。
tid=cookiearr[0];
}


    

function rlogin(){
var reslogin = http.post(urllogin, {
   "url":"/points_mahle/User/UserCenter/100025",
   //"url"="/points_mahle%2FUser%2FUserCenter%2F100025
   "UserName":username,
   "UserPwd":password
},{
    "headers":{
        "Cookie":sessionid
        }
        });

    return reslogin;
}

function jifen(dcode){
var resjf = http.post(url, {
   'DigitalCode':dcode
},{
    "headers":{
        "Cookie":sessionid
        }

        });
if(resjf.statusCode != 200){
    log("请求失败: " + resjf.statusCode + " " + resjf.statusMessage);
//files.write("1.txt","")
//login();
}
    return resjf;
}

function getDcode(){
    var text=files.read(dcodeFilepath);

var matches =text.match(/[0-9]{16}!/g);
if(matches){ //如果matches为null,表示没匹配到
for(i in matches){
    matches[i]=matches[i].substring(0,16);
//log(matches[i]);
}
}
return matches;
    }

function jifenFromfile(){
    var dcodearr=getDcode();
    for(i in dcodearr){
        log(dcodearr[i]);
        log(jifen(dcodearr[i]).body.string());
     }
    }

function rcookie(){
console.log("HTTP Headers:")
for(var headerName in getRes.headers){
    console.log("%s: %s", headerName, getRes.headers[headerName]);
 }
}
       
toast("ok");

exit()
