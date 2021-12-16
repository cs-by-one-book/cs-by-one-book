## HTML 문서

앞에서 언급한 바와 같이 최초의 웹 페이지는 HTML로 작성됐다. 

HTML은 하이퍼 텍스트 (hypertext)를 활용한다.

**하이퍼 텍스트란?**

​	웹 페이지 등 다른 대상에 대한 링크가 들어 있는 텍스트를 말한다.

**마크업 엘리먼트** : **<**   **>** 의 내용

​	< : 마크업 엘리먼트를 시작한다.

​	> : 마크업 엘리먼트를 종료한다.

![image-20211216181811309](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211216181811309.png)

<a href = "http://tcpschool.com/html-tags/intro" >HTML 태그 종류</a>

<a href="http://www.tcpschool.com/xml/xml_dtd_entityDeclaration"> 엔티티 참조</a>



## DOM : 문서 객체 모델

#### 문서 객체 모델(DOM)이란?

문서 객체 모델(DOM, Document Object Model)은 HTML 문서나 XML 문서에 접근하기 위한 일종의 인터페이스입니다.

이 모델은 문서 내의 모든 요소의 목적과 특징을 정의하고, 각각의 요소에 접근하는 방법을 제공합니다.

![image-20211216182829432](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211216182829432.png)

### 트리 관련 용어



![image-20211216182748400](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211216182748400.png)

### DOM 처리

DOM 문서는 아래 그림과 같이 DFS를 활용해서 트리를 해석한다.

![image-20211216183040383](https://raw.githubusercontent.com/yujin-kim-92/typora-image/main/img/image-20211216183040383.png)