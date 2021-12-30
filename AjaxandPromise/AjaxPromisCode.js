let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType,url,callback,async=true,data=null){
    return new Promise(function(resolve,reject){
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            console.log("State Change Called.Ready State: "+xhr.readyState+" Status: "+xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$')){
                resolve(xhr.responseText);
            }else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("XHR failed error");
            }
         }
        xhr.open(methodType,url,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+" request sent to server ");
    });
}

const getURL=" http://localhost:4000/employees/3";
makePromiseCall("GET",getURL,true)
    .then(responseText=>{
        console.log("get user Data: "+responseText)
    })
    .catch(error=>console.log("GET error status: "+JSON.stringify(error)));

const deletURL="http://localhost:4000/employees/6";
makePromiseCall("DELETE",deletURL,true)
    .then(responseText=>{
        console.log("Delete user Data: "+responseText)
    })
    .catch(error=>console.log("Delete error status: "+JSON.stringify(error)));

const postURL="http://localhost:4000/employees";
const EmplData={"name":"Harry","salary":"50000"};
makePromiseCall("POST",postURL,true,EmplData)
    .then(responseText=>{
        console.log("added User Data: "+responseText)
    })
    .catch(error=>console.log("POST error status: "+JSON.stringify(error)));
