function showTime(){
    const date=new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"mins:"+date.getSeconds()+"sec:";
}
function showSessionExpire(){
    console.log("Activity-b:your sassion time exspire"+showTime());
}
console.log("Activity-A:triggered activity-B at"+showTime());
setTimeout(showSessionExpire,5000);
console.log("Activity-A:triggered activity-B at"+showTime()+"will occur after 5 sec");