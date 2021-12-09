const text = 'abcdefg bbb abcde abbb abc';
const re = /abc/g;
const newText = text.replace(re, 'hi');
console.log(text);
console.log(newText);

const text = 'abc123xyz define "123" 	var g = 123';
const re = /\d/g;
const newText = text.replace(re, '숫자');
console.log(text);
console.log(newText);

const text = 'cat. 896. abc1 ?=+.';
const re = /\./g;
const newText = text.replace(re, '쩜');
console.log(text);
console.log(newText);

const text = 'can man fan dan ran pan';
const re = /[cmf]an/g;
const newText = text.replace(re, '야');
console.log(text);
console.log(newText);

const text = 'hog 좋아 dog 좋아 bog 싫어';
const re = /[^b]og/g;
const newText = text.replace(re, '동물');
console.log(text);
console.log(newText);

const text = 'Ana Bob Cpc aax bby ccz';
const re = /[A-Z]\w\w/g;
const newText = text.replace(re, '사람');
console.log(text);
console.log(newText);

const text = 'wazzzzzup wazzzup wazzup wazup';
const re = /waz{2,5}up/g;
const newText = text.replace(re, '인싸');
console.log(text);
console.log(newText);

const text = 'hhhhcww hhccccw hhww h';
const re = /h+c*w+/g;
const newText = text.replace(re, '커플');
console.log(text);
console.log(newText);

const text = '1 file found? No files found.	2 files found? 24 files found?';
const re = /\d+ files* found\?/g;
const newText = text.replace(re, '찾음');
console.log(text);
console.log(newText);

const text = '1.   abc 	2.	abc	3.           abc 4.abc';
const re = /\d.\s+d+/g;
const newText = text.replace(re, '공백 있음');
console.log(text);
console.log(newText);
