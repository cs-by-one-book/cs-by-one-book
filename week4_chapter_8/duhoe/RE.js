// const text = 'abcdefg bbb abcde abbb abc';
// const re = /abc/g;
// const newText = text.replace(re, 'hi');
// console.log(text);
// console.log(newText);

// const text = 'abc123xyz define "123" 	var g = 123';
// const re = /[0-9]/g;
// const newText = text.replace(re, '숫자');
// console.log(text);
// console.log(newText);

// const text = 'cat. 896. abc1 ?=+.';
// const re = /\./g;
// const newText = text.replace(re, '쩜');
// console.log(text);
// console.log(newText);

// const text = 'can man fan dan ran pan';
// const re = /[cmf]an/g;
// const newText = text.replace(re, '야');
// console.log(text);
// console.log(newText);
// // a or b or c인경우 [abc]와 같이 사용한다.

// const text = 'hog 좋아 dog 좋아 bog 싫어';
// const re = /[^b]og/g;
// const newText = text.replace(re, '동물');
// console.log(text);
// console.log(newText);
// // not a 인 경우 [^a] 와 같이 사용한다.

// const text = 'Ana Bob Cpc aax bby ccz';
// const re = /[A-Z][A-Za-z][A-Za-z]/g;
// const newText = text.replace(re, '사람');
// console.log(text);
// console.log(newText);
// // [] 안에 sequence를 '-'로 이어 표현할 수 있다.

// const text = 'wazzzzzup wazzzup wazzup wazup';
// const re = /waz{2,}up/g;
// const newText = text.replace(re, '인싸');
// console.log(text);
// console.log(newText);
// // 반복 횟수를 {} 를 이용해 정할 수 있다.

// const text = 'hhhhcww hhccccw hhww h';
// const re = /h+c*w+/g;
// const newText = text.replace(re, '커플');
// console.log(text);
// console.log(newText);
// // 0개 또는 그 이상은 '*' 1개 또는 그 이상은 '+'로 표시한다.

// const text = '1 file found? No files found.	2 files found? 24 files found?';
// const re = /\d+ files* found\?/g;
// const newText = text.replace(re, '찾음');
// console.log(text);
// console.log(newText);

// const text = '1.   abc 	2.	abc	3.           abc 4.abc';
// const re = /\d+.\s+\w*/g;
// const newText = text.replace(re, '공백 있음');
// console.log(text);
// console.log(newText);
// // 공백문자는 '\s'이고, 공백문자가 아닌 문자는 '\S'로 표시한다.