let conta = [];
let counter = 0;
let equacao;
let ponto;
sigDisabler();
document.getElementById("openPara").disabled = false;
document.getElementById("back").disabled = true;
document.querySelectorAll("button").forEach(btn => btn.classList.add("button-28"));

function inputDig(x) {
  const tela = document.getElementById("tela");
  const dig = document.createElement("dig");
  if (document.getElementById("tela2").textContent != "") {
    inputReset();
  }
  if (ponto == 1) {
    conta[--counter] = `${conta[counter]}.${x}`;
    document.getElementById(`dig${counter}`).textContent = conta[counter];
    counter++;
    ponto = 2;
  } else if (ponto == 2) {
    conta[--counter] = `${conta[counter]}${x}`;
    document.getElementById(`dig${counter}`).textContent = conta[counter];
    counter++;
  } else {
    dig.classList.add("dig");
    dig.id = `dig${counter}`;
    dig.textContent = `${x}`;
    tela.appendChild(dig);
    conta[counter] = x;
    counter++;
    ponto = 0;
  }

  sigEnabler();
  document.getElementById("back").disabled = false;
  document.getElementById("openPara").disabled = true;
  if (x == "0") {
    document.getElementById("div").disabled = true;
  }
  console.log(conta);
  console.log(counter);
}

function inputPonto() {
  ponto = 1;
  sigDisabler();
  document.getElementById("back").disabled = true;
}

function inputSig(x) {
  const tela = document.getElementById("tela");
  const dig = document.createElement("sig");
  dig.classList.add("sig");
  dig.id = `dig${counter}`;
  dig.textContent = ` ${x} `;
  tela.appendChild(dig);
  conta[counter] = x;
  counter++;
  console.log(conta);
  ponto = 0;
  sigDisabler();
  document.getElementById("openPara").disabled = false;
  if (x == "!") {
    digDisabler();
    document.getElementById("openPara").disabled = true;
    document.getElementById("add").disabled = false;
    document.getElementById("sub").disabled = false;
    document.getElementById("mult").disabled = false;
    document.getElementById("div").disabled = false;
    document.getElementById("result").disabled = false;
  }
  if (x == "(") {
    document.getElementById("closePara").disabled = false;
  }
  if (x == ")") {
    sigEnabler();
    digDisabler();
    document.getElementById("result").disabled = false;
    document.getElementById("ponto").disabled = true;
  }
  if(x == "^"){
    digEnabler();
    sigDisabler();
  }
  if (x == "*" || x == "+" || x == "-" || x == "/"){
    digEnabler();
  }
}

function inputBack() {
  --counter;
  conta.pop();
  if (document.getElementById(`dig${counter - 1}`)) {
    if (
      document.getElementById(`dig${counter - 1}`).classList.contains("dig") ==
      true
    ) {
      sigEnabler();
      digEnabler();
    } else {
      digEnabler();
      sigDisabler();
    }
  }
  if (
    document.getElementById(`dig${counter}`).classList.contains("digPonto") ==
    true
  ) {
    document.querySelectorAll(`.digPonto${counter}`).forEach((x) => x.remove());
  } else {
    document.getElementById(`dig${counter}`).remove();
  }
  if (document.getElementById("tela").textContent == "") {
    document.getElementById("back").disabled = true;
    sigDisabler();
    document.getElementById("openPara").disabled = false;
  }
  console.log(conta);
  console.log(counter);
}

function inputReset() {
  counter = 0;
  document.querySelectorAll("dig").forEach((item) => item.remove());
  document.querySelectorAll("sig").forEach((item) => item.remove());
  document.getElementById("tela2").textContent = "";
  document.getElementById("tela").classList.remove("telaConta");
  conta = [];
  equacao = 0;
  console.log(conta);
  console.log(counter);
  console.log(equacao);
  sigDisabler();
  document.getElementById("back").disabled = true;
  digEnabler();
  document.getElementById("openPara").disabled = false;
}

function inputResult() {
  conta = conta.join("");
  equacao = conta.split(/([\(\)\-\+\*\/\^\!])/g).filter(Boolean);
  console.log(equacao);
  console.log(conta);

  while (equacao.includes("(")) {
    parentes(equacao);
    console.log(equacao);
  }
  calculos(equacao);
  console.log(equacao);
  document.getElementById("tela2").textContent = equacao;
  document.getElementById("tela").classList.add("telaConta");
  sigDisabler();
  document.getElementById("back").disabled = true;
}

function parentes(equacao) {
  while (equacao.indexOf("(") != -1) {
    let equacao2;
    let x = equacao.lastIndexOf("(");
    let y = equacao.indexOf(")");
    let z = y - x;
    equacao2 = equacao.slice(
      equacao.lastIndexOf("(") + 1,
      equacao.indexOf(")")
    );
    equacao.splice(x, z);
    equacao[x] = calculos(equacao2);
    return equacao;
  }
}

function calculos(eqc) {
  const equacao = eqc;
  // console.log(equacao);

  while (equacao.indexOf("!") != -1) {
    let x = equacao.indexOf("!");

    equacao[x] = factorial(equacao[x - 1]);
    equacao.splice(x - 1, 1);
  }

  // console.log(equacao);

  while (equacao.indexOf("^") != -1) {
    let x = equacao.indexOf("^");

    equacao[x] = parseFloat(equacao[x - 1]) ** parseFloat(equacao[x + 1]);
    equacao.splice(x - 1, 1);
    equacao.splice(x, 1);
  }

  //  console.log(equacao);

  while (equacao.indexOf("*") != -1) {
    let x = equacao.indexOf("*");

    equacao[x] = parseFloat(equacao[x - 1]) * parseFloat(equacao[x + 1]);
    equacao.splice(x - 1, 1);
    equacao.splice(x, 1);
  }

  //  console.log(equacao);

  while (equacao.indexOf("/") != -1) {
    let x = equacao.indexOf("/");

    equacao[x] = parseFloat(equacao[x - 1]) / parseFloat(equacao[x + 1]);
    equacao.splice(x - 1, 1);
    equacao.splice(x, 1);
  }

  // console.log(equacao);

  while (equacao.indexOf("-") != -1) {
    let x = equacao.indexOf("-");

    equacao[x] = parseFloat(equacao[x - 1]) - parseFloat(equacao[x + 1]);
    equacao.splice(x - 1, 1);
    equacao.splice(x, 1);
  }

  //console.log(equacao);

  while (equacao.indexOf("+") != -1) {
    let x = equacao.indexOf("+");

    equacao[x] = parseFloat(equacao[x - 1]) + parseFloat(equacao[x + 1]);
    equacao.splice(x - 1, 1);
    equacao.splice(x, 1);
  }

  // console.log(equacao);

  return equacao.join("");
}

function factorial(n) {
  if (n < 0) {
    n = n * -1;
  }
  if (n == 0 || n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function digEnabler() {
  document.getElementById("n0").disabled = false;
  document.getElementById("n1").disabled = false;
  document.getElementById("n2").disabled = false;
  document.getElementById("n3").disabled = false;
  document.getElementById("n4").disabled = false;
  document.getElementById("n5").disabled = false;
  document.getElementById("n6").disabled = false;
  document.getElementById("n7").disabled = false;
  document.getElementById("n8").disabled = false;
  document.getElementById("n9").disabled = false;
}
function digDisabler() {
  document.getElementById("n0").disabled = true;
  document.getElementById("n1").disabled = true;
  document.getElementById("n2").disabled = true;
  document.getElementById("n3").disabled = true;
  document.getElementById("n4").disabled = true;
  document.getElementById("n5").disabled = true;
  document.getElementById("n6").disabled = true;
  document.getElementById("n7").disabled = true;
  document.getElementById("n8").disabled = true;
  document.getElementById("n9").disabled = true;
}

function sigEnabler() {
  document.getElementById("ponto").disabled = false;
  document.getElementById("add").disabled = false;
  document.getElementById("sub").disabled = false;
  document.getElementById("mult").disabled = false;
  document.getElementById("div").disabled = false;
  document.getElementById("pot").disabled = false;
  document.getElementById("fact").disabled = false;
  document.getElementById("openPara").disabled = false;
  document.getElementById("closePara").disabled = false;
  document.getElementById("result").disabled = false;
}
function sigDisabler() {
  document.getElementById("ponto").disabled = true;
  document.getElementById("add").disabled = true;
  document.getElementById("sub").disabled = true;
  document.getElementById("mult").disabled = true;
  document.getElementById("div").disabled = true;
  document.getElementById("pot").disabled = true;
  document.getElementById("fact").disabled = true;
  document.getElementById("openPara").disabled = true;
  document.getElementById("closePara").disabled = true;
  document.getElementById("result").disabled = true;
}

document.addEventListener("keyup", function (event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 13:
      document.getElementById("result").click();
      break;
    case 48:
      if (event.shiftKey) {
        document.getElementById("closePara").click();
      } else {
        document.getElementById("n0").click();
      }
      break;
    case 49:
      if (event.shiftKey) {
        document.getElementById("fact").click();
      } else {
        document.getElementById("n1").click();
      }
      break;
    case 50:
      document.getElementById("n2").click();
      break;
    case 51:
      document.getElementById("n3").click();
      break;
    case 52:
      document.getElementById("n4").click();
      break;
    case 53:
      document.getElementById("n5").click();
      break;
    case 54:
      document.getElementById("n6").click();
      break;
    case 55:
      document.getElementById("n7").click();
      break;
    case 56:
      if (event.shiftKey) {
        document.getElementById("mult").click();
      } else {
        document.getElementById("n8").click();
      }
      break;
    case 57:
      if (event.shiftKey) {
        document.getElementById("openPara").click();
      } else {
        document.getElementById("n9").click();
      }
      break;
    case 187:
      if (event.shiftKey) {
        document.getElementById("add").click();
      }
      break;
    case 189:
      document.getElementById("sub").click();
      break;
    case 191:
      document.getElementById("div").click();
      break;
    case 222:
      if (event.shiftKey) {
        document.getElementById("pot").click();
      }
      break;
    case 190:
      document.getElementById("ponto").click();
      break;
    case 8:
      if (event.shiftKey) {
        document.getElementById("reset").click();
      } else {
        document.getElementById("back").click();
      }
      break;
  }
});