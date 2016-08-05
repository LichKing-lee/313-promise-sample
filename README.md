# Promise Object  
###Function
* 함수가 객체인 자바스크립트에서 함수는 매우 자유로운 존재    
* 인자로 컨텍스트를 옮겨다닐수도있으며 함수 자신이 this를 선택할 수도 있음.  

**맘대로 이동하는 함수**  
function test1(){  
    alert("hello test1");  
}  

function test2(func){  
    func();  
}  

test2(test1);  

**자바스크립트에서의 this**  
function exposureThis(){  
    console.log(this);  
}  

/* 3가지 모두 this를 출력하지만 모두 출력내용이 다르다 */  
new exposureThis(); //exposureThis object  
exposureThis(); // window object  
exposureThis.call(new Date);  // Object object  

###Callback
* 인자로서 이동하는 함수를 콜백함수라고 부름  
* 함수가 자유로운 자바스크립트에서 비동기처리에 필수적    
* 비동기뿐만아니라 라이브러리 등 자바스크립트 코드내에서 매우 흔히 볼 수 있음  

setTimeout(function(){
    alert("hello first");
}, 1000);

* jquery만 있으면 모든게 다 되던시절엔 그냥 좀 불편한 수준이었으나 nodejs등의 등장으로 자바스크립트의 인기가 폭발적으로 증가하면서 콜백이 오남용되는 현상이 생김  

setTimeout(function(){
    alert("hello first");
    setTimeout(function(){
        alert("hello second");
    }, 1000);
}, 1000);

###Promise
* 자바스크립트의 비동기처리를 위해 등장  
* 조금만 기다려달라 내가 줄것이 있다. 라고 약속하고 믿음을 가져야하기때문에 promise 라고 명명했다고함.(근거는 없음)

var promise = new Promise(function(resolve, reject){  
    setTimeout(function(){  
        alert("hello first");  
        resolve();  
    }, 1000);  
});  

promise.then(function(resolve, reject){  
    setTimeout(function(){  
        alert("hello second");  
        resolve();  
    }, 1000);  
});  

* 비동기 실행결과를 resolve(), reject() 함수로 성공/실패 여부를 판단    
* promise 객체의 then() 함수를 통해 성공/실패 시 실행할 콜백함수 전달  
* 계속 depth를 깊이 들어가며 작성해야하는 콜백구조에 비해 순차적으로 작성하기때문에 가독성에서 월등히 좋음  
* angularjs의 $http가 반환하는 promise 객체가 제공하던 success(), error() 함수는 angularjs에서 추가한 필드  
* 실패시 실행할 함수는 catch() 라는 래퍼 함수를 제공하고있으며 then(null, function(){}) 으로 작성해도되지만 가독성 측면에서 catch() 함수 사용 권장  

var promise = new Promise(function(resolve, reject){  
    setTimeout(function(){  
        alert("hello first");  
        reject();  
    }, 1000);  
});  

promise.catch(function(){  
    alert("error!!!");  
});  

* 다중 프로미스 실행
Promise.all([promise object, promise object]).then(success, error);

#Callback Hell
* 사실 콜백지옥은 구조부터가 문제가 있을수있으니 재설계를 고려해라...