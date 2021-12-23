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
  $('yesno').show()
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