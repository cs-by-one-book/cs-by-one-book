## :pushpin: 벡터를 사용한 I/O   

- **벡터**  
  - 같은 데이터가 연속적으로 모여 있는 고정된 크기의 데이터 구조    



- 원래 각 파일은 **프레임(헤더+데이터)** 으로 구성되어 있음     

- 다른 장치에서 해당 데이터를 사용하기 위해선 데이터를 복사해야 하는데, 

  프레임 단위로 복사할 경우, 

  1.  문맥 전환 비용 증가  
  2. 장치에 프레임 중 일부만 기록될 경우 해당 장치 오류 발생 가능성 존재 

  같은 단점들 존재 

- 이를 대체하기 위한 방안이 **벡터(크기 + 데이터에 대한 포인터)** 를 운영체제에 넘기는 것   

  -> 이 방법은 충분히 효율적이므로 이런 방식을 지원하는 시스템 콜(readv, writev) 존재     

- 벡터를 넘겨받은 운영체제는 벡터에 저장된 데이터를 사용해 순서대로 프레임 조합  



- **수집 / 분산 **  

  인터넷의 근간이 된 버클리 네트워크 코드의 주류

  -> 통신 종단점으로부터 도착하는 패킷은 프로그램에 전달되기 전 연속적인 스트림으로 수집   

  - **수집** 

    -> 벡터를 활용해 데이터를 쓰는 행위이며, 여러 위치에서 데이터를 모아 쓰므로 **수집**이라고 부름     

  - **분산**  

    -> 벡터를 활용해 데이터를 읽는 행위이며, 여러 위치로 데이터를 분산시키므로 **분산**이라고 부름     



 ## :pushpin:객체 지향의 함정    

- C++를 통해 본격적으로 널리 사용되기 시작     

- **객체** = **메서드(함수)** + **프로퍼티(데이터)**    

  - 정숫값 등 크기가 작은 데이터를 저장하는 프로퍼티는 객체 구조체 안에 포함   
  - 메모리 할당이 더 필요한 프로퍼티는 객체 구조체 안에 있는 포인터를 통해 참조    

- 어떤 객체에 필요한 데이터와 함수는 한 데이터 구조 안에 모여 있다    

  -> 메서드가 아주 많거나 하면 이 구조체가 아주 커질 수 있기 때문에 이를 해결하기 위해 메서드를 별도의 데이터 구조에 나눠 담을 수 있다. (= 시/공간 트레이드 오프의 예)       

  -> 이처럼 자신이 사용할 메서드에 대한 포인터를 가지고 다녀야 하므로 객체와 관련된 부가 비용 존재      

  -> 즉, 객체 내의 데이터는 데이터만 저장하는 데이터 구조처럼 꽉 짜여 있지 않으므로 성능이 결정적으로 중요할 땐 전통적인 배열 활용 추천     



## :pushpin: 정렬 

- 필요 이유   

  - 메모리 접근 횟수 감소 -> 검색 소요 시간 감소     

- 만약, 정렬 대상 > 포인터 크기 라면   

  (데이터 직접 정렬 X ) 데이터를 가리키는 포인터를 재배열하여 데이터 자체가 여기저기로 움직이지 않게 해야 함   

- 산술적인 비교를 통해 정렬을 위한 관례 결정     

  - 포트란 산술 IF 문     

  ```python
  if (식) 분기1, 분기2, 분기3  
  
  # 식 < 0 -> 분기1
  # 식 = 0 -> 분기2
  # 식 > 0 -> 분기3
  ```

- 퀵 정렬   

  - 퀵정렬 알고리즘을 구현한 라이브러리 함수(`qsort`)를 유닉스 버전 III 부터 도입      

    -> C 언어의 함수 포인터 활용   

  ```python
  if (식) 분기1, 분기2, 분기3  
  
  # a > b -> 비교함수 결과값(return 0보다 큰 값) -> 분기 3 
  # a = b -> 비교함수 결과값(return 0) 		 -> 분기 2
  # a < b -> 비교함수 결과값(return 0보다 작은 값) -> 분기 1
  ```

  - 비교함수에 따라 다른 정렬 결과 도출   

    -> 나이 비교하고 이름 비교하는 함수 : 나이순 정렬한 후, 이름순 정렬   

    -> 이름 비교하고 나이 비교하는 함수 : 이름순 정렬한 후, 나이순 정렬   

  - 표준 C 라이브러리 문자열 비교 함수(`strcmp`) 도 `qsort`의 비교함수 기반   

    -> 두 문자열을 비교하면 `0보다 작은값` , `0`, `0보다 큰값` 을 리턴    

    -> 사실상 표준 비교 방식으로 정착     

  - `strcmp` 초기 작동 방식 : 문자열을 아스키 코드로 변환하여 한 문자에서 다른 문자를 빼는 방식 

    -> 아스키로 표현한 문자열만 정렬할 땐 잘 작동했지만, 다른 언어(자연어)를 지원하게 되면서 `아스키 문자만 제대로 수치적인 비교순서 제공`, `언어에 따라 정렬 규칙이 달라진다` 는 등의 부작용 발생    

    `ex. p314`     



## :pushpin: 해시 

- 해싱  

  - 데이터 구조를 순회하며 비교를 여러번 수행하는 것보다 성능 좋은 접근 방법   

  - 검색에 사용할 키에 대해 이들을 균일하게 벽에 흩뿌려주는 해시 함수 적용    

    -> 해시 함수가 계산하기 쉽고, 키를 버킷에 골고루 뿌려준다면 검색 속도 ↑   

    -> 해시 함수의 결과값을 사용하여 키에 대응하는 데이터를 메모리에 저장할 수 있음    

    즉, 해시 함수의 결과값의 범위 < 메모리 크기     

- 해시 테이블  

  - 해시 함수의 결과를 배열 인덱스로 활용하는 방법     

  - **버킷**  

    - 해시 테이블의 각 원소       

  - **충돌**  

    - 해시 함수 값이 동일하여 이미 버킷에 값이 존재하는데 동일 버킷에 넣어야 하는 경우 발생       

    - 해결 방법   
      - 해시 체인   
      - 해시 테이블에서 빈 슬롯을 어떻게든 찾는 알고리즘 사용    



- 해시 체인   

  - 충돌이 발생했을 때의 해결 방법   

  - 가장 간단한 형태는 단일 연결 리스트를 활용한 방식      

  - 삽입을 빠르게 하기 위하여 체인의 맨 앞에 원소 추가 가능     

    -> 체인의 길이가 증가하면 검색 시간도 증가 (정비례)   

    -> 이를 막기 위해 삽입 정렬 활용 (삽입 시간 증가)       

    ​	`or` 더 길어지기 전에 해시 테이블 확장     



- 완전 해시   

  - 해시 함수의 변형이며, 해시 함수에서의 성배(기적)   

  - 각 키를 유일한 버킷에 연결   

    -> 모든 키를 미리 알고 있지 않다면 거의 불가능   

  - 하지만, 수학자들이 훨씬 더 좋은 함수를 만들어 오고 있음    



## :pushpin: 효율성과 성능

- 컴퓨터가 비싸던 시절   

  - 성능 <-> 효율성 연관 ↑    

- 전자 장치의 값이 극적으로 줄어든 지금 시절   

  - 성능 <-> 효율성 연관 ↓    

    `덜 효율적인 알고리즘 + 더 많은 프로세서` > `더 효율적인 알고리즘 + 더 적은 프로세서`  

    같은 상황도 가능     

  - **데이터베이스 샤딩 (=수평 파티셔닝)  **    

    - 위와 같은 상황(성능과 효율성 연관 ↓) 을 응용하는 방법          
    - DB를 각각 다른 기계에서 실행되는 여러 사드로 나누는 방식으로 일종의 로드 밸런싱 기술         
      - 로드 밸런싱(or 부하분산)은 컴퓨터 네트워크 기술의 일종으로 둘 이상의 중앙처리장치 or 저장창치와 같은 컴퓨터 자원들에게 작업을 나누는 것      
    - 인터페이스를 통해 요청이 들어온 DB 연산을 모든 샤드에 전달한 후 -> 컨트롤러가 결과를 하나로 통합     
    - 작업을 동시에 병렬적으로 수행할 수 있어 성능 향상     

  - **맵리듀스**  

    - 샤딩의 변종이며, 근본적으로 컨트롤러가 중간 결과를 모으는 방법을 코드로 직접 작성할 수 있게 한다.     



