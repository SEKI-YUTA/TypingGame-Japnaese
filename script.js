let p = document.getElementById('text');
let textb = document.getElementById('text_b');
let typo = 0;
let typing = 0;
let textLists = [
  'This is my app',
];

//  CSV読み込み-------------------------------
const readElement = document.getElementById('read_csv');
readElement.addEventListener('change', function(e) {
  var result = e.target.files[0];
  console.log(result);
  var reader = new FileReader();
  reader.readAsText(result);
  reader.addEventListener('load', function() {
    texts = reader.result.split(',');
    texts.forEach(text => {
      console.log(text);
      textLists.push(text)
    });
    console.log('中身',textLists);
  })
})
//  -------------------------------------------------------------

//  全角半角判定
function CheckLength(str,flg) {
  for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      // Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff
      // Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
      if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
          if(!flg) return true;
      } else {
          if(flg) return true;
      }
  }
  return false;
}
//  ----------------------------------------------------------------




// let rand = Math.random()
let checkTexts = [];

createText();

//  問題表示--------------------------------------------------------
function createText() {
  p.textContent = '';
  let rnd = Math.floor(Math.random() * textLists.length);
  textb.innerText = textLists[rnd];
  if(CheckLength(textLists[rnd],1)) {
    textLists[rnd] = jaconv.toHebon(textLists[rnd]).toLowerCase();
    console.log(textLists[rnd]);
  } else {
    textb.innerText = "";
  }
  checkTexts = textLists[rnd].split('').map(function(value) {
    let span = document.createElement('span');
    span.textContent = value;
    p.appendChild(span);
    return span;
  });
}
//  ------------------------------------------------------------

console.log(checkTexts);

//  正誤判定
document.addEventListener('keydown', keyDown);

function keyDown(e) {
  if (e.key === checkTexts[0].textContent) {
    typing++;
    checkTexts[0].className = 'add-blue';

    checkTexts.shift();

    if (!checkTexts.length)  createText();
  } else  if(e.key != 'Shift' ){
    typo++;
  }
  // console.log(e.key);
  textb.innerText = "総タイピング数" + typing + "間違った数" + typo
}