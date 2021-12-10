# XML 등의 마크업 언어
## XML
W3C에서 개발된 많은 종류의 데이터를 기술하는데 사용할 수 있다. 주로 웹의 시스템끼리 데이터를 쉽게 주고 받을 수 있게해 HTML의 한계를 극복할 목적으로 만들어졌다.   
XML과 Ajax를 활용하면 페이지의 일부가 변동되는 부분이 있을 때 페이지 전체를 다시 로딩해야하는 작업을 생략할 수 있다.

W3C는 XML 설계 목표에서 단순성, 일반성, 인터넷을 통한 사용 가능성을 강조했다. 또한 텍스트 데이터 형식으로 유니코드를 사용해 전세계 언어를 지원한다.
```XML
<?xml version="1.0" encoding="UTF-8" ?>
<학생>
    <이름>이동호</이름>
    <소속>SSAFY 6기 대전 캠퍼스</소속>
    <분반>B</분반>
</학생>
```
위와 같이 한글 태그를 사용할 수 있다.

### XML 핵심 요소 (일부)
- (유니코드) 문자
  - XML 문서는 문자로 이루어진 문자열이며 거의 모든 유니코드 문자는 XML 문서에 나타날 수 있다.
- Processor & Application
  - Processor : 마크업을 분석하고 구조화된 정보를 Application에 넘긴다. (XML Parser)
- Markup & Content
  - Markup : 마크업을 구성하는 문자열은 `<>`,`&:`,`<![CDATA[]]`>
  - Content : 마크업이 아닌 문자열
- Tag
  - `<`로 시작해서 `>`로 끝나는 마크업 구조로 시작태그, 끝 태그, 빈 엘리먼트 태그(`<tag />`)로 구성되어있다.
- Element
  - 시작태그 문자열 끝태그 세트
    ```XML
        <테스트>XML보다 JSON이 더 좋아요</테스트>   <!--Element-->
    ```
- Attribute
  - Element에서 Key:Value를 이루는 마크업 구조로 아래 예시에서 src, alt가 Attribute다.
    ```XML
        <img src="../img/test.png" alt="속았지롱"/>
    ```
- XML 선언
    ```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    ```

### XML 특징
- [Well-formed](https://www.w3.org/TR/xml/#sec-well-formed)
  - 모든 XML의 구문을 허용하지만 시작태그와 닫는태그를 반드시 필요로 하며, 태그 이름도 같아야한다.
    - `<tag>`라면 `</tag>` 로 닫아줘야한다.
- [Document Type Definition](https://www.w3.org/TR/xml/#sec-condition-sect)
  - XML을 위한 가장 오래된 스키마 언어, XML 1.0의 표준에 등록.
  - XML의 새로운 기능에 대응하지 못한다 (XML Namespace)
  ```xml
  <? xml version="1.0" encoding="UTF-8">
  <!DOCTYPE food [
  <!ELEMENT food (name,type,cost)>
  <!ELEMENT name (#PCDATA)>
  <!ELEMENT type (#PCDATA)>
  <!ELEMENT cost (#PCDATA)>
  ]>
  <food>
    <name>상추</name>
    <type>야채</type>
    <cost>2000</cost>
  </food>
  ```
    - [참고](http://www.tcpschool.com/xml/xml_dtd_intro)

---

## [XPath](https://ko.wikipedia.org/wiki/XPath)
W3C의 표준, XML문서의 구조를 통해 경로 위에 지정한 구문을 사용해 항목을 배치하고 처리하는 방법을 기술하는 언어이다. 기본적으로 CSS 셀렉터와 같은 기능을 하지만 문법이 다르기 때문에 새롭게 공부해야한다. XPath 자체는 그다지 유용하지 않지만 XSLT의 중요한 부분을 차지하고 있다.

---

## [XSLT](https://www.w3.org/TR/xslt-30/#what-is-xslt)
XML문서를 다른 XML로 변환하는데 사용하는 XML 기반 언어이다. 원본 문서를 변경하지 않고 새로운 XML문서를 만든다. 새 문서는 XML 표준, HTML, 일반 텍스트 형식으로 출력된다.

XML데이터를 웹 페이지로 표시하기 위해 HTML, XHTML로 변환할 때 주로 사용하며, 변환은 클라이언트/서버에서 동적으로 수행하거나 퍼블리싱 단계에서 수행하기도 한다.   

[Input.xml]
```XML
<?xml version="1.0" ?>
<persons>
  <person username="JS1">
    <name>John</name>
    <family-name>Smith</family-name>
  </person>
  <person username="MI1">
    <name>Morka</name>
    <family-name>Ismincius</family-name>
  </person>
</persons>
```
[XSLT.xslt]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/persons">
    <root>
      <xsl:apply-templates select="person"/>
    </root>
  </xsl:template>

  <xsl:template match="person">
    <name username="{@username}">
      <xsl:value-of select="name" />
    </name>
  </xsl:template>

</xsl:stylesheet>
```

[Output.xml]
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <name username="JS1">John</name>
  <name username="MI1">Morka</name>
</root>
```