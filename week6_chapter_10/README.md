

# 10. 애플리케이션 프로그래밍과 시스템 프로그래밍

[TOC]



## :pushpin: 동물 추측 프로그램 버전 1: HTML과 자바스크립트 프로그램

`index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>Demo</title>
    <!-- jquery 포함시키기 -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
  </head>
  <body>
    <!-- 이 부분은 지식 트리이며 결코 표시되지 않는다. -->
    <div id="root" class="invisible">
      <div string="동물이 짖습니까">
        <div string="개"></div>
        <div string="고양이"></div>
      </div>
    </div>

    <div id="dialog">
      <!-- 대화가 여기 들어간다. -->
    </div>

    <!-- 새로운 동물 이름을 얻는 대화 -->
    <div id="what-is-it" class="start-hidden">
      <input id="what" type="text">
      <button id="done-what">이름 입력 완료</button>
    </div>

    <!-- 새로운 동물에 대한 질문을 얻는 대화 -->
    <div id="new-question" class="start-hidden">
      <span id="new"></span>와(과) <span id="old"></span>를(을) 구분하기 위해 던질 수 있는 질문이 무엇입이까? 답은 "예"여야 합니다.
      <input id="question" type="text">
      <button id="done-question">답 입력 완료</button>
    </div>

    <!-- 예와 아니오 버튼 -->
    <div id="yesno" class="start-hidden">
      <button id="yes">예</button>
      <button id="no">아니오</button>
    </div>
    
    <!-- <div>
      <button id="test-button">테스트용 버튼</button>
    </div> -->
    <script src="index.js"></script>
  </body>
</html>
```



`index.js`

```javascript
let node

// 질문하는 함수

// 제공받은 html을 대화에 추가
// 새 노드에 자식이 없다면 -> 더 이상 질문할 내용이 없으므로 끝.
// 새 노드에 자식이 있다면, 
// 새 노드를 현재 노드의 자식으로 만들고 노드의 string 속성 사용해 질문을 던짐
// 노드가 잎 노드이면 질문으로 동물 이름을 던짐
// 새 노드가 잎 노드이면 true 반환
function question(new_node, html) {
  $('#dialog').append(html) //html을 대화에 추가
  // $() 는 document.getElementById() 와 같다! 
  
  if($(new_node).length == 0) {   // 자식이 없으면 질문도 없음
    return true
  } else {
    node = new_node;   // 새 노드로 초기화

    if ($(node).children().length == 0){
      $('#dialog').append($(node).attr('string') + '입니까?')
    } else {
      $('#dialog').append($(node).attr('string')+ '?')
    }
    return false
  }
}

// 다시 시작하는 함수

// 게임을 다시 시작
// 모든 버튼과 텍스트 필드를 감춤
// 텍스트 필드를 지움
// 초기 노드와 인삿말을 설정
// 첫 번째 질문을 던지고 예/아니요 버튼 표시
function restart() {
  $('.start-hidden').hide()
  $('#question, #what').val('')
  question($('#root>div'), '<div><b>동물을 생각해보세요.<b><div>')
  $('#yesno').show()
}

// HTML 문서가 처음 실행되었을 때, restart를 통해 초기화
restart(); 

// 플레이어가 새 질문 입력
// 질문 들어 있는 노드 생성
// 예전의 '아니요'에 해당하는 노드를 새 노드 안에 넣음
// 새 동물이 들어 있는 노드를 만들고,
// 이 노드를 '아니요'에 해당하는 노드 바로 앞에 넣어서 '예'에 해당하는 노드가 되게 만듦
// 그 후 다시 시작
$('#done-question').click(function(){
  $(node).wrap('<div string="'+ $('#question').val() + '"></div>')
  $(node).parent().prepend('<div string="' + $('#what').val() + '"></div>')
  $('#dialog').append("<div>오 굳.<div><p>")
  restart();
})

// 플레이어가 새 동물 이름 입력하고 '이름 입력 완료' 클릭
// 입력에 관련된 엘리먼트들을 없애고, 'new-question' 텍스트 필드와 '딥 입력 완료' 버튼이 보이게 만듦
// 이전 동물과 새 동물 이름을 질문에 끼워 넣는다.

$('#done-what').click(function(){
  $('#what-is-it').hide()
  $('#new').text($('#what').val())
  $('#old').text($(node).attr('string'))
  $('#new-question').show()
  $('#dialog div:last').append(' <i>' + $('#what').val() + '</i>')
})

// 플레이어가 질문에 대해 '예'를 클릭
// 현재 노드가 잎 노드가 아니면
// 트리를 한 단계 내려가고, 잎 노드이면 처음부터 다시시작

$('#yes').click(function(){
  if (question($(node).children(':first-child'), '<i>예</i><br>')) {
    $('#dialog').append("<div>ㅋㅋ 그럴 줄 알았다.<div><p>")
    restart();
  }
})

// 플레이어가 질문에 대해 '아니요'를 클릭
// 현재 노드가 잎 노드가 아니면
// 트리를 한 단계 내려가고,
// 잎 노드이면 예/아니요 버튼 감추고
// what-is-it 텍스트 필드와 '이름 입력 완료' 버튼 표시
$('#no').click(function(){
  if (question($(node).children(':last-child'), '<i>아니요</i><br>')) {
    $('#yesno').hide()
    $('#dialog').append("<div>모르겠음.. ㅠㅠ 뭐야 답 알려줘.. <div><p>")
    $('#what-is-it').show()
  }
})

// const testButton = document.getElementById('test-button')
// console.log(testButton)
// testButton.addEventListener("click", () => {
//   console.log('click')
// });

```



## :pushpin: C 프로그램  

- 고수준 가상 머신인 브라우저 : 중요한 하부 구조를 감추며 빠르고 쉽게 프로그램 작성 가능  

  C  : 더 기초적인 동작이 드러나게 프로그램 작성 가능               



### :pushpin: 터미널과 명령줄      

- 자연어 : 소리/몸짓 -> 문자    

  컴퓨터 언어 : 문자 -> 음성인식 / 제스처     

- 컴퓨터는 **GUI** (graphical user interface) 로 사용자와 통신       

- 터미널  

  - 이전 : 컴퓨터 밖에 있는 하드웨어    
  - 최근 : 소프트웨어로 구현 (명령 프롬프트 cmd 등..)    

- C 프로그램은 GUI 로 `예` or `아니오` 를 선택하는 대신,  

  터미널 프로그램에서 `y` or `n` 을 입력하고 `enter` or `return` 등의 키 입력     

  > q를 입력으로 받으면 종료   



### :pushpin: 프로그램 빌드   

- C는 컴파일 언어이므로 인터프리터 언어처럼 그냥 소스코드 실행 불가   

  -> 기계어 변환 필요    

  -> 기계어 파일을 생성하는 것을 **빌드한다** 고 부른다.    

  ```javascript
  소스파일 이름 : gta.c    
  기계어 파일 생성 명령어 : cc gta.c -o gta   
  // C 컴파일러 cc 에 의해 소스 파일 gta.c 를 기계어 파일 gta 로 출력
  // -o 가 있으면 그 뒤에 출력파일 이름이 온다는 뜻  
  ```

  - 빌드한 이후엔 출력파일(=기계어 파일) 의 이름을 터미널에 타이핑하여 실행   



### :pushpin: 터미널과 장치 드라이버   

- 터미널은 I/O 장치이므로 사용자 프로그램과 직접 통신 X      

- `사용자 프로그램` <- `운영체제 | 장치 드라이버` -> `I/O 장치 (터미널) `  

  - 사용자 프로그램과 운영체제 사이엔 `시스템 콜` 존재       
  - `장치 드라이버`는 물리적 장치와 관련된 처리 담당        

- 터미널이 하드웨어였을 시절엔 물리적으로 컴퓨터와 연결되는 선 존재   

  -> 현재는 소프트웨어로 연결 선을 흉내내므로 레거시 프로그램도 변경하지 않고 사용 가능   



### :pushpin: 문맥전환   

- 운영체제 : 1번에 1개 이상의 사용자 프로그램 실행 가능     

  -> 그러나, 컴퓨터 레지스터 집합은 1개이므로 

  운영체제가 A 프로그램을 실행하다가 B 프로그램을 실행하고자 한다면, 

  레지스터 저장 & 복구 필요 (CPU 레지스터 & MMU 레지스터 & I/O 상태 등등..)     
  - `MMU 레지스터` : 메모리 관리 장치(Memory Management Unit)     

- **프로세스 문맥 (= 문맥)**   

  - 위와 같은 경우에서 저장 & 복구해야하는 모든 내용     

- **문맥전환**   

  - 이전 작업의 문맥을 저장 & 새롭게 실행할 프로세스 상태로 복구 하는 작업      

    ![context](10장/context.jpg)

  - 사용자가 키보드 입력을 한다면 (= 시스템 콜 성사)     

    - 사용자 프로그램이 시스템 콜을 사용해 터미널에서 입력을 읽고자 한다.     

    - 사용자가 Enter 를 누르기 전까진 키 입력이 없는 것이므로 요청 처리 불가 

      -> 사용자 프로그램 슬립   

      -> 그 동안 다른 동작 수행 가능    

      -> **장치 드라이버** 는 터미널에 들어온 입력(문자)를 `버퍼` 에 저장 

      & `Enter` 키 입력이 들어오면 사용자 프로그램 깨우기   

    - **버퍼링 & 에코**      

      장치 드라이버는 터미널에 들어온 문자를 입력 버퍼에 저장 

      & 에코(메아리)로 디스플레이 화면에 즉시 표시    

      & 출력 버퍼에 저장하여 터미널로 출력     

    - 출력 버퍼가 Full인 상태에서 출력하려하면 프로그램 슬립 상태 전환   
    - 입력 버퍼가 Full인 상태에서 입력하려하면 장치 드라이버가 사용자에게 화면 깜빡이거나 삐 소리를 내는 등의 피드백 가능   

    

  - **버퍼**  
    - 선입선출의 FIFO 데이터 구조 (== que)    
    - 하드웨어 영역의 버퍼는 연약한 구성요소를 보호하기 위해 사용하는 회로         
    - 뒷 부분에 더 자세히 설명     

  

  - 드라이버 설정을 변경하기 위해 추가된 **시스템 콜**도 존재   
    - **로 모드(raw mode)**  
      - 버퍼링이 꺼져 있는 경우   
      
    - **쿡드 모드(cooked mode)**   
      - 버퍼링이 켜져 있는 경우     
      
    - 에코 On/ Off 도 가능   
    
    - 사용자 프로그램을 깨우는 프로그램 / 문자를 지우는 키 지정 가능   
    
      
  

### **📌 원형버퍼**

390p 그림 10-13에서 생겨나는 문제가 있는데

원형 버퍼를 만들어서 계속 공간을 사용할 수 있다.



### 📌추상화를 활용한 코드 개선

동물 추측 게임은 다시 시작 할 때마다 고양이와 개밖에 모르는 상태에서 시작한다.

마지막 게임 상태를 저장하여 계속 게임을 진행하면 더 좋을 것이다.

이런 기능은 자바스크립트보다 C 프로그램에서 작성하기 더 쉽다.

![image-20211223175928084](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211223175928084.png)

운영체제는 파일과 장치에 대해 똑같은 인터페이스를 제공한다.

>  인터페이스 : 서로 다른 두 시스템을 연결해주는 것

자바스크립트로 작성한 코드는 브라우저를 거쳐 입력받을 수 있지만, C언어로 작성한 코드는 운영체제에서 직접 입력을 받을 수 있다.



### 📌런타임 라이브러리와 표준 입출력

![image-20211223184506526](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211223184506526.png)

C 언어 실행 과정

*  전처리기 : # 구문(ex #include<stdio.h>) 처리
*  컴파일러 : 고수준 언어 ->  저수준 언어
*  어셈블러 : 저수준 언어 -> 기계어
*  링커 : 여러개의 오브젝트 파일(.obj)을 하나로 합치거나 라이브러리를 합침

>  런타임 라이브러리 : 프로그램을 실행하는 동안 프로그래밍 언어로 기능을 추가하기 위해 컴파일러가 사용하는 특별한 라이브러리 (입출력, 메모리 관리, 산술 함수에 대한 기능이 포함)

런타임 라이브러리는 추가로 터미널 창치 드라이버와 연관된 파일을 하나는 입력을 위해, 다른 하나는 출력을 위해서 연다.

stdio 라이브러리는 시스템 파일 디스크립터를 파일 포인터와 연관시킨다.

>  파일 디스크립터(File Descriptor) : 리눅스 혹은 유닉스 계열의 시스템에서 프로세스(process)가 파일(file)을 다룰 때 사용하는 개념으로, 프로세스에서 특정 파일에 접근할 때 사용하는 추상적인 값이다. **파일 디스크럽터는 일반적으로 0이 아닌 정수값을 갖는다.** 

>  파일 포인터 : 하드디스크에서 메모리로 읽어들일 화일의 `위치 주소` 및 `버퍼링`에 대한 추상화된 정보를 가지고 있는 포인터를 말함, 버퍼링이나 파일 관리에 필요한 데이터 구조

stdio가 제공하는 파일 포인터

*  stdin : 표준 입력
*  stdout : 표준 출력
*  stderr : 표준 오류 출력 

![image-20211223190128033](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211223190128033.png)

stderr, stdout 같은 대상으로 데이터를 보내지만 stdout만 버퍼를 사용한다.

stderr 발명 계기

사진 조판 장치에서 사진 대신 오류 메세지가 찍힌 페이지를 얻는 경우가 있다.

이런 경우 오류 메세지를 사진 조판장치로 보내지 않고 터미널로 보내기 위해서 stderr이 만들어 졌다.

### 📌버퍼 오버플로

초기의 stdio에서는 stdin에서 사용자가 새줄 문자를 입력할 때까지 받은 입력을 사용자가 제공한 버퍼로 전송하는 `gets` 라는 함수가 있었다.

 `gets` 는 입력이 버퍼 끝을 벗어나지 않는지 검사하지 않기 때문에 문제가 있다.

![image-20211223192925676](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211223192925676.png)![image-20211223192933088](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211223192933088.png)

만약 입력 버퍼 다음에 미사일 발사 버퍼가 있고 yyy를 입력하여 미사일 발사 버퍼에 y라는 입력을 넣어 나쁜일이 발생 할 수도 있다.

발견된 보안 문제의 대부분은 이와 같은 오버플로 버그로 인한 문제다.

향후 stdio에는 버퍼 경계를 검사하는 `fgets`하는 함수를 추가하여 수정됐다.



### :pushpin: 동물 추측 프로그램 버전 2: C 프로그램



   

