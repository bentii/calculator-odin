let conta = [];
let counter = 0;
let counter2 = 0;
let equacao;
let ponto;
sigDisabler();
document.getElementById("back").disabled = true;

function inputDig(x) {
  const tela = document.getElementById("tela");
  const dig = document.createElement("dig");
  if (document.getElementById("tela2").textContent != "") {
    inputReset();
  }
  if(ponto == 1){
    conta[--counter] = `${conta[counter]}.${x}`;
    document.getElementById(`dig${counter}`).textContent = conta[counter];
    counter++;
    ponto = 2;
  } else if(ponto == 2){
    conta[--counter] = `${conta[counter]}${x}`;
    document.getElementById(`dig${counter}`).textContent = conta[counter];
    counter++;
  }else{
  dig.classList.add("dig");
  dig.id = `dig${counter}`;
  dig.textContent = `${x}`;
  tela.appendChild(dig);
  conta[counter] = x;
  counter++;
  ponto = 0;
  }

  document.getElementById("back").disabled = false;
  sigEnabler();
  if(x == "0"){
    document.getElementById("div").disabled = true;
  }
  console.log(conta);
  console.log(counter);
}

function inputPonto(){
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
  if(x == "!"){
    document.getElementById("openPara").disabled = true;
    document.getElementById("add").disabled = false;
    document.getElementById("sub").disabled = false;
    document.getElementById("mult").disabled = false;
    document.getElementById("div").disabled = false;
  }
  if(x == "/"){
    document.getElementById("n0").disabled = true;
  }
  if(x == "("){
    document.getElementById("closePara").disabled = false;
  }
  if(x == ")"){
    document.getElementById("result").disabled = false;
  }
}

function inputBack() {
  --counter;
  conta.pop();
  if(document.getElementById(`dig${counter - 1}`)){
  if(document.getElementById(`dig${counter - 1}`).classList.contains("dig") == true){
    sigEnabler();
    digEnabler();
  }else{
    digEnabler();
    sigDisabler();
  }
}
  if(document.getElementById(`dig${counter}`).classList.contains("digPonto") == true){
    document.querySelectorAll(`.digPonto${counter}`).forEach(x => x.remove());
  }else{
  document.getElementById(`dig${counter}`).remove();
  }
  if (document.getElementById("tela").textContent == "") {
    document.getElementById("back").disabled = true;
    sigDisabler();
  }
  console.log(conta);
  console.log(counter);
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
  sigDisabler();
  document.getElementById("back").disabled = true;
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

function digEnabler(){
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
function digDisabler(){
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

function sigEnabler(){
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
function sigDisabler(){
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