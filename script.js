let conta = [];
let counter = 0;
let equacao;
let ponto;

function inputDig(x) {
  const tela = document.getElementById("tela");
  const dig = document.createElement("dig");
  if (document.getElementById("tela2").textContent != "") {
    inputReset();
  }
  if(ponto == 1){
    conta[--counter] = `${conta[counter]}.${x}`;
    counter++;
    console.log(conta);
    ponto = 0;
    dig.classList.add("dig");
    dig.id = `dig${counter}`;
    dig.textContent = `${x}`;
    tela.appendChild(dig);
  } else{
  dig.classList.add("dig");
  dig.id = `dig${counter}`;
  dig.textContent = `${x}`;
  tela.appendChild(dig);
  conta[counter] = x;
  counter++;
  console.log(conta);
  ponto = 0;
  }
}

function inputPonto(x){
  const tela = document.getElementById("tela");
  const dig = document.createElement("dig");
  dig.classList.add("dig");
  dig.id = `dig${counter}`;
  dig.textContent = `${x}`;
  tela.appendChild(dig);
  ponto = 1;

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
}

function inputBack() {
  --counter;
  conta.pop();
  document.getElementById(`dig${counter}`).remove();
  console.log(conta);
}

function inputReset() {
  counter = 0;
  document.querySelectorAll("dig").forEach((item) => item.remove());
  document.querySelectorAll("sig").forEach((item) => item.remove());
  document.getElementById("tela2").textContent = "";
  conta = [];
  equacao = 0;
  console.log(conta);
  console.log(counter);
  console.log(equacao);
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
