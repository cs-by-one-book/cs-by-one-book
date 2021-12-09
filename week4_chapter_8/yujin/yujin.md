## 최적화

-  대부분의 언어에는 최적화기 (optimizer)라는 추가 단계가 파스트리와 코드 생성기 사이에 들어간다.

-  최적화기

   -  파스 트리를 분석하고 더 효율적인 코드를 생성해내도록 파스 트리를 변환한다.

      -  ex) 계산 결과를 사용할 때 미리 계산하여 결과만 파스 트리에 남겨 놓는다.

         ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48ac9ca7-500a-4e53-84dd-c004825c61f8/Untitled.png)

      -  ex) 반복문 내에서 반복문이 수행될 때 결과에 변함이 없는 결과 ( 루프 불변 요소 loop invariant )는 반복문 밖에 임시 변수를 생성해서 결과를 저장하고 사용한다.

         ```java
         for (i = 0; i < 10; i++){
         	x = a + b;
         	result[i] = 4 * i + x * x;
         }
         ```

         ```java
         x = a + b;
         optimizer_created_temporary_variable = x * x;
         for (i = 0; i < 10; i++){
         	result[i] = 4 * i + optimizer_created_temporary_variable;
         }
         ```

      -  ex) 비용이 많이 드는 연산을 비용이 더 적게 드는 연산으로 대신하는 방법인 강도 절감 (strength reduction)이라는 최적화 트릭을 보여준다.

         ```java
         x = a + b;
         optimizer_created_temporary_variable = x * x;
         optimizer_created_4_times_i = 0;
         for(i = 0; i < 10; i++){
         	result[i] = optimizer_created_4_times_i + optimizer_created_temporary_variable;
         	optimizer_created_4_times_i = optimizer_created_4_times_i + 4;
         }
         ```

## 하드웨어를 다룰 때 주의하라

-  최적화기는 멋지지만 코드를 최적화하면 예기치 못한 문제가 발생할 수도 있다.

   아래코드는 문제가 없지만 최적화기에서 `PORTB` 에는 값을 쓰기만 하고 읽는 코드가 없어서 그냥 제거해 버리는 경우가 있다.

   ```java
   void
   lights_on()
   {
   	PORTB = 0x01;
   	return (PORTB);
   }
   
   unsigned int
   lights_on()
   {
   	return 0x01;
   }
   ```

   이런 경우에는 최적화기를 실행하지 말아야하는 경우이다.

   일부 언어에서는 최적화기를 막는 매커니즘을 제공하는데, C에서는 volatile라는 키워드를 이용해서 해당 변수에 대한 최적화를 막을 수 있다.

## 정리

-  프로그램을 기기에서 실행하기 위해 어떻게 변환하는지를 설명하고, 프로그램을 컴파일 하거나 인터프린트하는 방법을 배웠다.