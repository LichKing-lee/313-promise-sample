/**
 * Created by ChangYong on 2016. 7. 31..
 */
setTimeout(function(){
    alert("hello first");

    setTimeout(function(){
        alert("hello second");

        setTimeout(function(){
            alert("hello third");
        }, 3000);

    }, 3000);

}, 3000);