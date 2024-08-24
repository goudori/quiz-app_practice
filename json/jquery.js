const CST_TOP_Page = 1;
const CST_Prog_Page = 2;
const CST_Anser_Page = 3;
const CST_END_Page = 4;
const CST_RESET_Page = 5;

let page = 0;
let problem_data = [];
let MaxPage = 0;
let answer = "";
let nextPage = 1;
let answerCount = 0;
$(function () {
  $(document).on("click", ".next-button", function () {
    switch (nextPage) {
      case CST_TOP_Page:
        input_json_data();
        break;
      case CST_Prog_Page:
        anser_data_drow(this);
        break;
      case CST_Prog_Page:
        anser_data_drow(this);
        break;

      case CST_Anser_Page:
        change_data();
        break;

      case CST_END_Page:
        End_drow();
        break;

      default:
        data_clear();
        break;
    }
  });
});
function input_json_data() {
  $.ajax({
    url: "./quiz.json",
    type: "GET",
    dataType: "json",
    success: function (data, textStatus) {
      // 成功時の処理
      console.log("JSONデータの読み込みに成功しました。", data);
      problem_data = data;
      MaxPage = data["questions"].length;
      change_data();
    },
    error: function (xhr, textStatus, errorThrown) {
      // エラー時の処理
      console.error("JSONデータの読み込みに失敗しました。", errorThrown);
      alert("Jsonの取得に失敗しました。");
    },
  });
}
function change_data() {
  page++;
  $("#quiz-main").empty();
  let qs_data = problem_data["questions"][page - 1];
  console.log(qs_data);

  let q_data = qs_data["question"];
  let chise_data = qs_data["options"];
  answer = qs_data["answer"];
  $("#quiz-main").append(
    '<div id="question-container">Q.' + page + " " + q_data + "</div>"
  );
  for (let i = 0; i < chise_data.length; i++) {
    $("#quiz-main").append(
      '<div id="answer-buttons" class="next-button btn">' +
        chise_data[i] +
        "</div>"
    );
  }
  nextPage = CST_Prog_Page;
}
function anser_data_drow(e) {
  $("#quiz-main").empty();
  let sentakudata = $(e).text();
  if (sentakudata == answer) {
    $("#quiz-main").append('<div class="hollow-circle">〇</div>');
    $("#quiz-main").append('<div id="question-container">正解です！！</div>');
    answerCount++;
    
  } else {
    $("#quiz-main").append('<div class="cross">✕</div>');
    $("#quiz-main").append(
      '<div id="question-container">不正解！正解は' + answer + "!!</div>"
    );
  }
  if (page == MaxPage) {
    $("#quiz-main").append(
      '<div id="answer-buttons" class="next-button btn">結果を⾒る</div>'
    );
    nextPage = CST_END_Page;
  } else {
    $("#quiz-main").append(
      '<div id="answer-buttons" class="next-button btn">次の問題へ</div>'
    );
    nextPage = CST_Anser_Page;
  }
}

function End_drow() {
  $("#quiz-main").empty();
  $("#quiz-main").append(
    '<h1 id = "question-container">正解数' +
      answerCount +
      "/" +
      MaxPage +
      "</h1>"
  );

  $("#quiz-main").append(
    '<div id="answer-buttons" class="next-button btn">タイトルへ</div>'
  );

  nextPage = CST_RESET_Page;
}

function data_clear() {
  $("#quiz-main").empty();
  $("#quiz-main").append('<button class="btn next-button">はじめる</button>');
  page = 0;
  problem_data = [];
  MaxPage = 0;
  answer = "";
  nextPage = 1;
  answerCount = 0;
}
