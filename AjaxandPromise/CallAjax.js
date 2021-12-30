let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date=new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"mins:"+date.getSeconds()+"sec:";
}
function makeAJAXCall(methodType,url,callback,async=true,data=null){
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        console.log("State Change Called.Ready State: "+xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState===4){
            //matching all 200 series responses
            if(xhr.status===200||xhr.status===201){
                callback(xhr.responceText);
            }else if(xhr.status>=400){
                console.log("Handle 400 client error or 500 server error");
            }
        }
        xhr.open(methodType,url,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
    console.log(methodType+" request sent to server "+showTime());
    }
}

const getURL=" http://localhost:4000/employees/11";
function getUserDetails(data){
    console.log("Get User Data: "+data)
}
makeAJAXCall("GET",getURL,getUserDetails);

const deleteURL="http://localhost:4000/employees/8";
function UserDeleted(data){
    console.log("Delete User Data: "+data)
}
makeAJAXCall("DELETE",deleteURL,UserDeleted,false);

const postURL="http://localhost:4000/employees";
const EmplData={"name":"Harry","salary":"50000"};
function UserAdded(data){
    console.log("added User Data: "+data)
}
makeAJAXCall("POST",postURL,UserAdded,true,EmplData);