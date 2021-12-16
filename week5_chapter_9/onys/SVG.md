jquery 딱히 쓸 이유 없어서 이제 안 쓰고요

jsx 씁니다.

https://ko.reactjs.org/docs/introducing-jsx.html



## SVG

Scalable Vector Graphics 크기 변경이 가능한 벡터 그래픽스

마크업 언어에요!

```html
<br>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
	<circle id="c" r="10" cx="200" cy="200" fill="red"/>
    <animate xlink:href="#c" attributeName="r" from="10" to="200" dur="5s" repeatCount="indefinite"/>
</svg>
```

https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95

MBTI 캐릭터가 svg로 만들어져있어요.



## HTML5

HTML의 최신 구현

header footer section 등 여러 semantic 엘리먼트가 추가됐다.

Canvas가 추가됐다. SVG와 비슷한 기능을 하지만 다른 방식이다.

SVG는 무엇을 그릴지 지시하면 그대로 그림이 그려지지만 

캔버스를 사용할 때는 캔버스를 조작하는 프로그램을 조작해야 한다.

SVG는 기존 DOM 함수를 사용해 조작하는 반면 캔버스는 자바스크립트 함수를 통해 조작해야 한다.



## JSON

JavaScript Object Notation

자바스크립트 객체를 사람이 읽기 쉬운 방식으로 표현한 것

자바스크립트의 eval 함수는 JSON을 마치 자바스크립트 프로그램인 것 처럼 직접 실행할 수 있다. 

(이 점에서 XML보다 편리)

다만 분별없이 JSON 데이터를 eval로 import하면 공격자가 원하는 코드를 브라우저에서 실행하도록 허용할 수 있다.

그래서 추가된 것이 JSON.parse라는 함수이다.

이 함수는 JSON을 안전하게 자바스크립트 객체로 되돌릴 수 있다.



## 정리

![image-20211216195403401](SVG.assets/image-20211216195403401.png)

<문서 받아올 때>

통신 인터페이스: 라우터, 모뎀 등 서버랑 통신하기 위한 인터페이스 거쳐서

언어 파서, 자바스크립트 인터프리터 등을 거쳐 DOM으로 렌더링

사용자 인터페이스 엔진으로 출력된다.

문서 보낼 때는 반대!

