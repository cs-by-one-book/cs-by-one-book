# JavaScript - AJAX

---

# 1. **AJAX**

**✅ AJAX란**

- `Asynchronous JavaScript And XML` (비동기식 JavaScript와 XML)
- 서버와 통신하기 위해 **XMLHttpRequest** 객체를 활용
    - **XMLHttpRequest** 동기식과 비동기식 통신을 모두 지원
- JSON, XML, HTML 그리고 일반 텍스트 형식을 포함한 다양한 형식을
- AJAX의 X가 XML을 의미하긴 하지만, 요즘은 더 가벼운 용량과 JavaScript의 일부라는 장점때문에 JSON을 더 많이 사용

**✅ AJAX 특징**

- 페이지 전체를 reload(새로고침)를 하지 않고서도 수행되는 **비동기성**
    - 사용자의 event가 있으면 전체 페이지가 아닌 일부분만을 업데이트할 수 있음
- AJAX의 주요 두가지 특징은 아래의 작업을 할 수 있게 해준다.
    1. 페이지 새로고침 없이 서버에 요청
    2. 서버로부터 데이터를 받고 작업을 수행

**✅ AJAX 배경**

- 2005년 Google Maps & Gmail 등에 활용되는 기술을 설명하기 위해 AJAX라는 용어를 최초로 사용
- AJAX는 특정 기술이 아닌 기존의 여러 기술을 사용하는 새로운 접근법을 설명하는 용어
    - 기존 기술을 잘 활용할 수 있는 방식으로 구성 및 재조합한 새로운 접근법
- Google 사용 예시
    - **Gmail** : 메일 전송 요청이 모두 처리 되기 전 다른 페이지로 넘어가더라도 메일은 전송 됨
    - **Google Maps** : 스크롤 행위 하나하나가 모두 요청이지만 페이지는 갱신되지 않음

**✅ XMLHttpRequest 객체**

- 서버와 상호작용하기 위해 사용되며 전체 페이지의 새로고침 없이 일부의 데이터를 받아올 수 있다
- 사용자가 하는 것을 방해하지 않으면서 페이지의 일부를 업데이트 할 수 있음
- 주로 AJAX 프로그래밍에 사용
- 이름과 달리 XML 뿐만 아니라 모든 종류의 데이터를 받아오는데 사용 가능
- 생성자 : **`XMLHttpRequest()`**

**✅ XMLHttpRequest 예시**

- console에 todo 데이터가 출력되지 않음
- 데이터 응답을 기다리지 않고 console.log()를 먼저 실행했기 때문

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled.png)

# 2. Asynchronous JavaScript

## ① 동기 vs 비동기

💙 **동기식 vs 비동기식** 

**동기식**

- **순차적**, 직렬적 Task수행
- 요청을 보낸 후 응답을 받아야만 다음 동작이 이루어짐 (blocking)
- 버튼 클릭 후 alert 메시지의 확인 버튼을 누를 때까지 문장이 만들어지지 않음
- 즉, alert 이후의 코드는 alert의 처리가 끝날 때까지 실행되지 않음
- 왜 이런 현상이 발생할까?

→ JavaScript는 single threaded

**비동기식**

- **병렬적** Task 수행
- 요청을 보낸 후 응답을 기다리지 않고 다음 동작이 이루어짐 (non-blocking)
- 요청을 보내고 응답을 기다리지 않고 다음 코드가 실행됨
- 결과적으로 변수 todo에는 응답 데이터가 할당되지 않고 빈 문자열이 출력
- 그렇다면 JS는 왜 기다려주지 않는 방식으로 동작하는가?

→ JavaScript는 single threaded

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%201.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%202.png)

**✅ 왜 비동기(Asynchronus)를 사용하는가?**

👩🏻 **사용자 경험**

- 매우 큰 데이터를 동반하는 앱이 있다고 가정
- 동기식 코드라면 데이터를 모두 불러온 뒤 앱이 실행됨
    - 즉, 데이터를 모두 불러올 때 까지는 앱이 모두 멈춘 것처럼 보임
    - 코드 실행을 차단하여 화면이 멈추고 응답하지 않는 것 같은 사용자 경험을 제공
- 비동기식 코드라면 데이터를 요청하고 응답을 받는 동안, 앱 실행을 함께 진행함
    - 데이터를 불러오는 동안 지속적으로 응답하는 화면을 보여줌으로써 더욱 쾌적한 사용자 경험 제공
- 때문에 많은 웹 API는 현재 비동기 코드를 사용하여 실행됨

**✅ Threads**

- 프로그램이 작업을 완료하는데 사용할 수 있는 단일 프로세스
- 각 thread(스레드)는 한번에 하나의 작업만 수행할 수 있음
- 예시) Task A → Task B → Task C
    - 다음 작업을 시작하려면 반드시 앞의 작업이 완료되어야 함
    - 컴퓨터 CPU는 여러 코어를 가지고 있기 때문에 한번에 여러가지 일을 처리 할 수 있음

**✅ 동기식 예시**

![JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%203.png](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%203.png)

**✅ 비동기식 예시**

![JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%204.png](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%204.png)

**✅ Blocking vs Non Blocking**

![JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%205.png](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%205.png)

```python
# 01_blocking.py

from time import sleep

def sleep_3_seconds():
		sleep(3)
		print("잘 잤다!!!")

print("이제 자야지")
sleep_3_seconds():
print("학교 가자!!!")
```

print("학교 가자!!!")는 그저 멈춰있을 뿐, 반드시 sleep_3_seconds()가 끝난 뒤 실행된다.

앱을 불러오는 동안 앱이 멈춰있는 현상과 같다.

```python
# 01_blocking.py

import requests

response = request.get('https://jsonplaceholder.typicode.com/todos/1/')

todo = response.json()

print(todo)
```

print(todo)는 응답을 기다렸다.

**01_non_blocking.html**

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%206.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%207.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%208.png)

## ② Threads

**✅  JS는 `single threaded` 이다.**

- 컴퓨터가 여러개의 CPU를 가지고 있어도 main thread라 불리는 단일 스레드에서만 작업 수행
- 즉, 이벤트를 처리 하는 **Call Stack**이 하나인 언어라는 의미
- 이 문제를 해결하기 위해 JS는
1. 즉시 처리하지 못하는 이벤트들을 **다른 곳(Web API)**으로 보내서 처리하도록 하고,
2. 처리된 이벤트들은 처리된 순서대로 **대기실(Task Queue)**에 줄을 세워 놓고
3. **Call Stack**이 비면 **담당자(Event Loop)**가 대기줄에서 가장 오래된 (제일 앞의) 이벤트를 Call Stack으로 내보냄

## ③ Concurrency model

> Event loop를 기반으로 하는 **동시성 모델(Concurrency model)**
> 

1. **Call Stack**
- 요청이 들어올 때마다 해당 요청을 순차적으로 처리하는 **Stack(LIFO)** 형태의 자료 구조

1. **Web API (=Browser API)**

⇒ stack에서 바로 처리할 수 없는 부분들은 Web API에서 처리한다.

- JavaScript 엔진이 아닌 브라우저 영역에서 제공하는 API
- `**setTimeout()` , `DOM events` 그리고 AJAX로 데이터를 가져오는 시간이 소요되는 일들을 처리**

1. **Task Queue (Event Queue, Message Queue)**

⇒ 대기실; Web API에서 처리된 친구들이 기다리는 곳

- 비동기 처리된 callback 함수가 대기하는 **Queue(FIFO)** 형태의 자료구조
- main thread가 끝난 후 실행되어 후속 JavaScript 코드가 차단되는 것을 방지

1. ✨**Event Loop**

⇒ 비어있는지 확인만 하는 친구

- **Call stack이 비어 있는지 확인**
- 비어 있는 경우 Task Queue에서 실행 대기 중인 callback 함수가 있는지 확인
- Task Queue에 대기중인 callback 함수가있다면 가장 앞에 있는 callback 함수를 Call stack으로 push

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%209.png)

```python
# 02_eventloop.html
<script>
	console.log('Hi')

	setTimeout(function () {
		console.log('SSAFY')
	}, 3000)

	console.log('Bye')
</script>
```

⇒ setTimeout은 millisecond(1/1000초) 이기 때문에 3초를 원할 경우, 3000을 작성해야한다.

**✅ Zero delays**

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2010.png)

⇒ delay가 0이면 바로 실행되어야 하는 거 아니야? **NO**

⇒ 3초 후에Task queue로 들어간다는 의미

- 실제로 0ms 후에 콜백이 시작된다는 의미가 아님
- 실행은 Task Queue에 대기중인 작업 수에 따라 다르며 해당 예시에서는 callback 함수의 메시지가 처리되기 전에 'Hi' 와 'Bye'가 먼저 출력됨
- 왜냐하면 delay(지연)는 JS가 요청을 처리하는 데 필요한 최소한 시간이기 때문**(보장된 시간이 아님)**
- 기본적으로 `setTimeout` 함수에 특정 시간 제한을 지정했더라고 대기중인 메시지의 모든 코드가 완료될 때까지 대기해야함.

⇒ setTimeout은 기본적으로 바로 처리되는 함수가 아니기때문에 0초로 설정한다고 하더라도 앞에 있는 애가 실행이 끝나지 않으면 기본적으로 대기함.

**✅ 순차적인 비동기 처리하기**

- Web API로 들어오는 순서는 중요하지 않고, 어떤 이벤트가 먼저 **처리**되느냐가 중요 (실행순서 불명확)
- 이를 해결하기 위해 **순차적인 비동기 처리**를 위한 2가지 작성 방식
1. **Async callbacks**
    - 백그라운드에서 실행을 시작할 함수를 호출할 때 인자로 지정된 함수
    - 예시) `addEventListener()` 의 두 번째 **인자**
    
    ⇒ event : ~하면 ~ 한다.
    
2. **promise-style**
    - Modern Web APIs에서의 **새로운 코드 스타일**
    - XMLHttpRequest보다 조금 더 현대적인 버전

---

# 2. Callback Function

## 2.1 Callback Function

💙 **Callback Function**

- 다른 함수에 인자로 전달 된 함수
- 외부 함수 내에세 호출되어 일종의 루틴 또는 작업을 완료함
- 동기식, 비동기식 모두 사용됨
    - 그러나 비동기 작업이 완료된 후 코드 실행을 계속하는 데 주로 사용됨
- 비동기 작업이 완료된 후 코드 실행을 계속하는 데 사용되는 경우 **비동기 콜백**

💙 **JS의 함수는 "일급 객체(First Class Object)다."**

✨ **일급 객체 : 다른 객체들에 적용 가능한 연산을 모두 지원하는 객체**(함수)

✨ **일급 객체의 조건** ⇒ 파이썬과 동일

1. 인자로 넘길 수 있어야 함
2. 함수의 반환 값으로 사용할 수 있어야 함
3. 변수에 할당 할 수 있어야 함.

⇒ 일급 객체이기 때문에 콜백 함수로 활용할 수 있는 것이다.

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2011.png)

## 2.2 Async callbacks (비동기 콜백)

💙 **Async callbacks**

- 백그라운드에서 코드 실행을 시작할 함수를 호출할 때 인자로 지정된 함수
- 백그라운드 코드 실행이 끝나면 callback 함수를 호출하여 작업이 완료되었음을 알리거나, 다른 작업을 실행하게 할 수 있음
    - 예시) `addEventListner()`의 두 번째 매개변수
    - 이벤트가 발생해야 호출하기 때문
- callback 함수를 다른 함수의 인수로 전달할 때, 함수의 참조를 인수로 전달할 뿐이지 즉시 실행되지 않고, 함수의 body에서 "called back"됨. 정의된 함수는 때가 되면 callback 함수를 실행하는 역할을 함

💙 **Why use callback?**

- callback함수는 명시적인 호출이 아닌 특정 루틴 혹은 action에 의해 호출되는 함수
- Django의 경우 **요청이 들어오면**, event의 경우 **특정 이벤트가 발생하면** 이라는 조건으로 함수를 호출할 수 있었던 건 **Callback Function** 개념 때문에 가능
    
    ⇒ 서버에 사용자로부터 어떠한 요청이 들어오면 A를 호출한다.는 식의 개념
    
- **비동기 로직을 수행할 때 callback 함수는 필수**
    - 명시적인 호출이 아니라 다른 함수의 매개변수로 전달하여 해당 함수 내에서 특정 시점에 호출

```python
# 03_callback.py

# 1. Pass function to argument
def my_func(func):
    return func

def my_argument_func():
    return 'Hello My func!'

result = my_func(my_argument_func)
print(result())

# 2. map
numbers = [0, 9, 99]

def plus_one(number):
    return number + 1

print(list(map(plus_one, numbers)))
```

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button>버튼</button>

  <script>
    // 1. My Custom Callback Function
		const myFunc = function (func) {
			return func
		}

		const myArgumentFunc = function () {
			return 'Hello'
		}

		const result = myFunc(myArgumentFunc)
		console.log(result())
    
		// 2. map
    const nums = [1, 2, 3]
    // arrow function
		const doubleNums = nums.map(num => {
			return num * 2
		})
		console.log(doubleNums)

    // 3. Array Helper Method 
    const numbers = [1, 2, 3]
    const newNumbers = []
	
		numbers.forEach(num => {
			newNumber.push(num+1)
		})
		
		console.log(newNumbers)

    // 4. setTimeout
		const helloWorld = function () {
			console.log('happy coding!!')
		}
		setTimeout(helloWorld, 3000)
		console.log('unhappy coding!!')

    // 5. addEventListener
		const myButton = document.querySelector('button')

		myButton.addEventListener('click', function () {
			console.log)('button clicked!!!')
		})
  </script>
</body>
</html>
```

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2012.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2013.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2014.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2015.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2016.png)

⇒ forEach도  callback 함수

**💙 Callback Hell 콜백 지옥 ( = pyramid of doom 파멸의 피라미드 )**

- 순차적인 연쇄 비동기 작업을 처리하기 위해 "callback 함수를 호출하고, 그 다음 callback 함수를 호출하고, 또 그 함수의 callback 함수를 호출하고..."의 패턴이 지속적으로 반복됨.
- 즉, 여러 개의 연쇄 비동기 작업을 할 때 마주하는 상황
- 위 같은 상황이 벌어질 경우 아래 사항들을 통제하기 어려움 ⇒
    - 디버깅
    - 코드 가독성

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2017.png)

💙 **Callback Hell 해결하기**

1. Keep your code shallow (코드 깊이를 얕게 유지)
2. Modularize (모듈화)
3. Handle every single error (모든 단일 오류 처리)
4. **Promise callbacks (Promise 콜백 방식 사용)**

# 3. Promise 프로미스

## 3.1 Promise Object

💙 **Promise Object**

- 비동기 작업의 최종 완료 또는 실패를 나타내는 객체
    - 미래의 완료 또는 실패와 그 결과 값을 나타냄
    - 미래의 어떤 상황에 대한 약속
- 성공(이행)에 대한 약속
    - `**.then()**`
- 실패(거절)에 대한 약속
    - `**.catch()**`
    
    ⇒ .then()에서 에러가 발생했으면 catch에서 알려준다.
    

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2018.png)

## 3.2 Promise Methods

💙 **`.then(callback)`**

- 이전 작업(promise)이 성공했을 때(이행했을 때) 수행할 작업을 나타내는 콜백함수
- 그리고 각 **콜백 함수는 이전 작업의 성공 결과를 인자로 전달 받음**
- 따라서 성공했을 때의 코드를 콜백함수 안에 작성

💙 **`.catch(callback)`**

- .then이 하나라도 실패되면(거부되면) 동작 (동기식의 'try..except' 구문과 유사)
- 이전 작업의 실패로 인해 생성된 error 객체는 catch 블록 안에서 사용할 수 있음

💙 **`.then(callback)`** and **`.catch(callback)`**

- **각각의 .then() 블록은 서로 다른 promise를 반환**
    - 즉, .then()을 여러개 사용(chaining)하여 연쇄적인 작업을 수행할 수 있음
    - 결국 여러 비동기 작업을 차례대로 수행할 수 있다는 뜻
- 마찬가지로 .then()과 .catch() 메서드는 모두 promise를 반환하기 때문에 chaining 가능
- **주의**
    - **반환 값이 반드시 있어야 함** ⇒ 반환 값이 있어야 성공, 실패를 알 수 있으니까
    - 없다면 콜백함수가 이전의 promise 결과를 받을 수 없음

💙 **`.finally(callback)`**

- Promise 객체를 반환
- 결과에 상관없이 무조건 지정된 callback 함수가 실행
- 어떠한 인자도 전달받지 않음
    - Promise가 성공되었는지 거절되었는지 판단할 수 없기 때문
- 무조건 실행되어야 하는 절에서 활용
    - `.then()`과 `.catch()` 블록에서의 코드 중복을 방지

💙 **Callback Hell → Promise**

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2019.png)

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2020.png)

💙 **Promise가 보장하는 것**

> Async callback 작성 스타일과 달리 Promise가 보장하는 특징
> 
1. 콜백은 자바 스크립트 Event Loop가 현재 실행중인 콜 스택을 완료하기 이전에는 절대 호출되지 않음
    - Promise callback 함수는 Event Queue에 배치되는 엄격한 순서로 호출됨
2. 비동기 작업이 성공하거나 실패한 뒤에 `.then()` 메서드를 이용하여 추가한 경우에도 1번과 똑같이 동작
3. `.then()`을 여러번 사용하여 여러 개의 callback 함수를 추가할 수 있음(chaining)
    - 각각의 콜백은 주어진 순서대로 하나 하나 실행하게 됨
    - Chaining은 Promise의 가장 뛰어난 장점

# 4. Axios

- **Promise based Http Client for the browser and Node.js**
- 브라우저를 위한 Promise 기반의 클라이언트
- 원래는 "XHR" 이라는 브라우저 내장 객체를 활용해 AJAX 요청을 처리하는데, 이보다 편리한 AJAX 요청이 가능하도록 도움을 줌
    - **확장 가능한 인터페이스와 함께 패키지로 사용이 간편한 라이브러리를 제공**

![JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2021.png](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2021.png)

💙  **XMLHttpRequest → Axios 변경**

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2022.png)

💙 **Axios 예시**

![JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2023.png](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2023.png)

⇒ 첫번째 : 응답이 잘 오는가?

⇒ data에 타이틀이 있는가?

# 5. Async &  Await(비고)

💙 **Async &  Await**

- 비동기 코드를 작성하는 새로운 방법
    - ECMAScript 2017(ES8)에서 등장
- 기존 Promise 시스템 위에 구축된 syntactic sugar
    - promise구조의 then chaining을 제거
    - 비동기 코드를 조금 더 동기 코드처럼 표현
    - Syntactic sugar
        - 더 쉽게 읽고 표현할 수 있도록 설계된 프로그래밍 언어 내의 구문
        - 즉, 문법적 기능은 그대로 유지하되 사용자가 직관적으로 코드를 읽을 수 있게 만듦

💙 **Promise → async & await 적용**

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2024.png)

# 6. 마무리

**💙 오늘은**

- AJAX
- Asynchronous JavaScript
    - Callback Function
    - Async callbacks
    - Promise
- Axios

**💙 왜 비동기 방식이 필요할까**

![Untitled](JavaScript%20-%20AJAX%206168668dd88a420eabec4d081ed9ed65/Untitled%2025.png)

# Homework

# Workshop

공유된 HTML코드의 주석과 마크업을 참고하여, 버튼을 클릭하면 axios를 통해
API 요청을 보내고 받아 온 이미지 데이터를 페이지에 렌더링 하는 앱을 완성하시오.
• API : https://dog.ceo

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dog API</title>
  <style>
    img {
      height: 500px;
    }
  </style>
</head>
<body>
  <h1>Dog API</h1>
  <img src="" alt="dog">
  <br>
  <button>Get dog</button>
  
  <!-- axios CDN을 삽입한다. -->
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const API_URI = 'https://dog.ceo/api/breeds/image/random'
    
    function getDog () {
      // axios를 사용하여 API_URI로 GET 요청을 보낸다.
      axios.get(API_URI)
      // .then 메서드를 통해 요청이 성공적인 경우의 콜백함수를 정의한다.
        .then(function (response) {
      // 응답객체의 데이터에서 이미지에 대한 리소스를 img 요소의 src 속성으로 할당한다.
          const dogUrl = response.data.message
          const dogImg = document.querySelector('img')
          dogImg.setAttribute('src', dogUrl)
        })
    }

    const button = document.querySelector('button')
    button.addEventListener('click', getDog)
  </script>
</body>
</html>
```