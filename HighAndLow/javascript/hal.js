//カードの変数
var card = new Array(100);
//乱数
var rand;
//カードの初期化判定用変数
var initflag = 0;

//カードの数字とマーク
var number;
var kind;

//場のカードの情報
var cardinformation;

//親と子のカードの数字
var oyanum;
var konum;

//連続正解数
var cnum = 0;

//ボタン
var nb;
var hb;
var lb;

//参考にしたページ->
//https://www.ipentec.com/document/document.aspx?page=javascript-exec-javascript-on-button-click
//http://qiita.com/shuntaro_tamura/items/c9b2fec0f3a9f7d1e987


//カードの初期化(1:ある0:ない)
function InitCard() {
  cnum = 0;
  for ( var i = 0; i < 52; i++ ) {
    card[i] = 1;
  }
}

//0から51の乱数
function Random() {
  if ( initflag == 0 ) {
    InitCard();
  }
  initflag = 1;

  cardnum = 0;

  /*---- while の条件まだ甘い ----*/
  while ( CardNum() > 0 ) {
    rand = Math.floor(Math.random() * 52);
    if ( card[rand] == 1 ) {
      card[rand] = 0;
      break;
    }
  }
  if ( CardNum() <= 0 ) {
    rand = -1;
  }

}

//残りのカードの枚数を返す
function CardNum() {
  var cardnum = 0;
  for ( var n = 0; n < 52; n++ ) {
    if ( card[n] == 1 ) {
      cardnum++;
    }
  }
  return cardnum;
}

//数字をカードの種類に変換
function ChangeToCard() {
  /*-- 数字を二ケタの数に変換 --*/
  number = ChangeTwoDigits(rand % 13);

  /*-- マークに変換 --*/
  kind = ChangeMark(parseInt(rand / 13, 10));

}

//親のカードを引くボタンを押したとき
function NextButtonClick() {
  //選択中は親のカードを変更できないようにボタンを無効化
  nb = document.getElementById("nbid");
  nb.disabled = "disabled";
  //選択できるように
  hb = document.getElementById("hbid");
  hb.disabled = "";
  lb = document.getElementById("lbid");
  lb.disabled = "";

  //正解数の更新
  cnum++;
  //-- 親がランダムにカードを引く(ただの数) --//
  Random();
  if ( rand != -1 ) {
    //-- ただの数をカードの種類に変換する --//
    ChangeToCard();

    oyanum = number;
    target = document.getElementById("card1");
    //文字でカードを表す(コメントアウト)
    //target.innerHTML = kind + "の" + number;
    //画像でカードを表す
    target.innerHTML = '<img src="gif/' + kind + number + '.gif" width="100" height="150" />';

    target = document.getElementById("card2");
    target.innerHTML = '<img src="gif/z02.gif" width="100" height="150" />';

    GetCardInformation();
    target = document.getElementById("card3");
    target.innerHTML = cardinformation;
  } else {
    target = document.getElementById("card1");
    target.innerHTML = "カードが無くなりました。";
  }
}

//カードの一覧情報を取得、場のカードをすべて表示
function GetCardInformation() {
  var skind; //マーク用
  var snumber; //2桁用
  cardinformation = '<br>';
  for ( var j = 0; j < 4; j++ ) {
    for( var i = 0; i < 13; i++ ) {
      if ( card[i+j*13] == 0 ) {
        /*-- 数字を二ケタの数に変換 --*/
        snumber = ChangeTwoDigits(i);
        /*-- マークに変換 --*/
        skind = ChangeMark(j);
        cardinformation = cardinformation + '<img src="gif/' + skind + snumber + '.gif" width="40" height="60" />';
      } else {
        cardinformation = cardinformation + '<img src="gif/z02.gif" width="40" height="60" />';
      }
    }
    cardinformation = cardinformation + '<br>';
  }
}

//2ケタのカードの数字を返す
function ChangeTwoDigits(ctd) {
  var td;
  switch ( ctd + 1 ) {
    case 1:
    td = "01";
    break;
    case 2:
    td = "02";
    break;
    case 3:
    td = "03";
    break;
    case 4:
    td = "04";
    break;
    case 5:
    td = "05";
    break;
    case 6:
    td = "06";
    break;
    case 7:
    td = "07";
    break;
    case 8:
    td = "08";
    break;
    case 9:
    td = "09";
    break;
    case 10:
    td = "10";
    break;
    case 11:
    td = "11";
    break;
    case 12:
    td = "12";
    break;
    case 13:
    td = "13";
    break;
  }
  return td;
}

function ChangeMark(cm) {
  var m;
  switch ( cm ) {
    case 0:
    m = "h";
    break;
    case 1:
    m = "s";
    break;
    case 2:
    m = "d";
    break;
    case 3:
    m = "c";
    break
  }
  return m;
}

//子がHighを宣言
function OnHButtonClick() {
  //-- 子がカードを引く(ただの数) --//
  Random();
  //-- ただの数をカードの種類に変換する --//
  ChangeToCard();

  konum = number;
  target = document.getElementById("card2");
  //文字でカードを表す(コメントアウト)
  //target.innerHTML = kind + "の" + number;
  //画像でカードを表す
  target.innerHTML = '<img src="gif/' + kind + number + '.gif" width="100" height="150" />';

  if ( oyanum > konum ) {
    alert("獲得ポイント：" + cnum);
    //ゲーム初期化
    initflag = 0;
  }
  //親のカードを変更できるようにボタンを有効化
  nb = document.getElementById("nbid");
  nb.disabled = "";
  //選択できないように
  hb = document.getElementById("hbid");
  hb.disabled = "disabled";
  lb = document.getElementById("lbid");
  lb.disabled = "disabled";
}

//子がLowを宣言
function OnLButtonClick() {
  //-- 子がカードを引く(ただの数) --//
  Random();
  //-- ただの数をカードの種類に変換する --//
  ChangeToCard();

  konum = number;
  target = document.getElementById("card2");
  //文字でカードを表す(コメントアウト)
  //target.innerHTML = kind + "の" + number;
  //画像でカードを表す
  target.innerHTML = '<img src="gif/' + kind + number + '.gif" width="100" height="150" />';

  if ( oyanum < konum ) {
    alert("ポイント：" + cnum);
    //ゲーム初期化
    initflag = 0;
  }
  //親のカードを変更できるようにボタンを有効化
  nb = document.getElementById("nbid");
  nb.disabled = "";
  //選択できないように
  hb = document.getElementById("hbid");
  hb.disabled = "disabled";
  lb = document.getElementById("lbid");
  lb.disabled = "disabled";
}
