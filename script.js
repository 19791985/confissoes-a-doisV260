
// Inicialização EmailJS
(function() {
  emailjs.init("user_demoKEY"); // substituir por o teu user ID real do EmailJS
})();

const titleScreen = document.getElementById("title-screen");
const titleStartBtn = document.getElementById("title-start-btn");
const startBtn = document.getElementById("start-btn");
const introScreen = document.getElementById("intro");
const phaseSummaryScreen = document.getElementById("phase-summary");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultScreen = document.getElementById("result");
const summaryEl = document.getElementById("summary");
const continueBtn = document.getElementById("continue-btn");
const shareWhatsappBtn = document.getElementById("share-whatsapp");
const copyLinkBtn = document.getElementById("copy-link");
const sendEmailBtn = document.getElementById("send-email");

let currentPhase = 0;
let currentQuestionIndex = 0;
let results = [];
let phaseSummaries = [];

const questionsPerPhase = 20;

titleStartBtn.onclick = () => {
  titleScreen.classList.remove("active");
  introScreen.classList.remove("hidden");
  introScreen.classList.add("active");
};

startBtn.onclick = () => {
  introScreen.classList.remove("active");
  quizContainer.classList.remove("hidden");
  quizContainer.classList.add("active");
  showQuestion();
};

continueBtn.onclick = () => {
  phaseSummaryScreen.classList.remove("active");
  quizContainer.classList.add("active");
  showQuestion();
};

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach((a) => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.onclick = () => {
      results.push({ question: q.question, answer: a.text, value: a.value });
      currentQuestionIndex++;
      if (currentQuestionIndex % questionsPerPhase === 0 && currentQuestionIndex < questions.length) {
        currentPhase++;
        quizContainer.classList.remove("active");
        phaseSummaryScreen.classList.add("active");
        showPhaseSummary();
      } else if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    };
    answersEl.appendChild(btn);
  });
}

function showPhaseSummary() {
  const phase = phases[currentPhase];
  const analysis = generatePhaseAnalysis(currentPhase);
  document.getElementById("phase-title").textContent = phase.title;
  document.getElementById("phase-description").textContent = phase.description;
  document.getElementById("phase-analysis").textContent = analysis;
  phaseSummaries.push({ phase: phase.title, analysis });
}

function showResult() {
  quizContainer.classList.remove("active");
  resultScreen.classList.add("active");

  const finalAnalysis = generateFinalAnalysis();
  summaryEl.innerHTML = "<h3>Resumo Geral</h3><p>" + finalAnalysis + "</p>";

  // Compartilhar resultado por email automaticamente
  sendResultsByEmail();

  // Link de partilha
  const shareText = encodeURIComponent("Acabei o quiz 'Confissões a Dois' e o meu perfil foi revelador! Descobre o teu também.");
  shareWhatsappBtn.onclick = () => {
    window.open("https://wa.me/?text=" + shareText, "_blank");
  };
  copyLinkBtn.onclick = () => {
    navigator.clipboard.writeText(window.location.href + "#resultado");
    alert("Link copiado para a área de transferência!");
  };
  sendEmailBtn.onclick = () => {
    sendResultsByEmail();
    alert("Resultado enviado por email!");
  };
}

function generatePhaseAnalysis(phaseNumber) {
  const start = phaseNumber * questionsPerPhase;
  const end = start + questionsPerPhase;
  const answers = results.slice(start, end);
  const values = answers.map(a => a.value);
  // Simulação de análise com base em valor dominante
  const freq = {};
  values.forEach(v => freq[v] = (freq[v] || 0) + 1);
  const dominante = Object.entries(freq).sort((a,b) => b[1] - a[1])[0][0];
  return `Nesta fase, demonstraste uma forte inclinação para "${dominante}". Revela um lado muito próprio que merece ser explorado com atenção e carinho. Continuarás a descobrir mais camadas em ti, e este resultado mostra uma profundidade emocional e sensorial digna de nota.`;
}

function generateFinalAnalysis() {
  const resumoBase = phaseSummaries.map(p => p.analysis).join(" ");
  return resumoBase + " Ao longo das 6 fases, revelaste traços de entrega, desejo, conexão e ousadia. O teu perfil reflete alguém em busca de descoberta contínua, de um amor que também seja prazer. Parabéns pela coragem de te revelares!";
}

function sendResultsByEmail() {
  const emailContent = {
    to_name: "Filipe",
    from_name: "Quiz Confissões a Dois",
    message: results.map(r => r.question + " - " + r.answer).join("\n"),
    subject: "Resultados do Quiz"
  };
  emailjs.send("default_service", "template_default", emailContent)
    .then(() => console.log("Email enviado"))
    .catch(err => console.error("Erro ao enviar email", err));
}

function gerarResumoDaFase(faseAtual, respostasFase) {
  let total = respostasFase.reduce((acc, curr) => {
    acc[curr.value] = (acc[curr.value] || 0) + 1;
    return acc;
  }, {});

  let texto = "";

  if (faseAtual === 1) {
    if ((total["emocao"] || 0) >= 10) {
      texto = `Nesta primeira fase do quiz, revelaste um forte apego emocional à tua ligação. Valorizas gestos que não se veem, mas que se sentem profundamente. O teu olhar para o amor é mais sobre entrega emocional do que atos físicos. A tua forma de amar passa pela escuta, pelo cuidado e por pequenos detalhes que constroem a base da relação. Preferes o conforto de um silêncio cúmplice ao espetáculo das palavras. Ao longo desta fase, mostraste que, para ti, a verdadeira intimidade começa quando há vulnerabilidade e presença. O teu afeto manifesta-se na profundidade dos gestos e no querer constante de estar perto.`;
    } else {
      texto = `A tua abordagem emocional mistura carinho e desejo, revelando que procuras mais do que simples afeto. Tens uma tendência equilibrada entre vulnerabilidade e sedução emocional. Procuras toques que falam mais que palavras e gestos que confirmam promessas. Nesta fase, ficou claro que valorizas o tempo partilhado e os olhares sinceros. O teu conceito de ligação envolve respeito e atenção aos detalhes. Desejas mais do que ouvir: queres sentir, ver e ser sentido(a).`;
    }
  }

  return texto;
}

let respostasPorFase = [];
let faseAtual = 1;

const phases = [
  {
    title: "Fase 1: Conexão Emocional",
    description: "Explora o que une os vossos corações e mentes."
  },
  {
    title: "Fase 2: Intimidade e Confiança",
    description: "Descobre como confiam, tocam e se entregam."
  },
  {
    title: "Fase 3: Desejo e Curiosidade",
    description: "Aprofunda a curiosidade e a vontade de mais."
  },
  {
    title: "Fase 4: Fantasias e Ousadia",
    description: "Liberta os desejos mais intensos e secretos."
  },
  {
    title: "Fase 5: Sexo Cru e Fantasias Profundas",
    description: "Explora a intensidade do prazer sem tabus."
  },
  {
    title: "Fase 6: Complicidade Total",
    description: "Sela o amor com visão de futuro e entrega."
  }
];

// Inserir este bloco de perguntas no script.js

  const questions = [
  {
    question: "1. O que mais fortalece a nossa ligação?",
    answers: [
      { text: "Conversas profundas", value: "emocao" },
      { text: "Carinho diário", value: "emocao" },
      { text: "Saber que me escutas", value: "emocao" },
      { text: "Olhares que dizem tudo", value: "emocao" },
      { text: "O tempo que partilhamos", value: "emocao" }
    ]
  },
  {
    question: "2. Quando te sentes mais emocionalmente ligado(a)?",
    answers: [
      { text: "Depois de um abraço longo", value: "emocao" },
      { text: "Ao dormir juntinhos", value: "emocao" },
      { text: "Quando partilhas algo íntimo", value: "emocao" },
      { text: "Quando rimos juntos", value: "emocao" },
      { text: "Ao ouvir um 'amo-te' sincero", value: "emocao" }
    ]
  },
  {
    question: "3. Qual destes gestos mais te toca?",
    answers: [
      { text: "Um beijo na testa", value: "emocao" },
      { text: "Um elogio inesperado", value: "emocao" },
      { text: "Um toque nas costas", value: "emocao" },
      { text: "Olhar nos olhos em silêncio", value: "emocao" },
      { text: "Um sorriso cúmplice", value: "emocao" }
    ]
  },
  {
    question: "4. Quando sentes que te entendo profundamente?",
    answers: [
      { text: "Quando escuto sem julgar", value: "emocao" },
      { text: "Quando te abraço sem motivo", value: "emocao" },
      { text: "Quando acerto nas palavras", value: "emocao" },
      { text: "Quando sinto o teu silêncio", value: "emocao" },
      { text: "Quando estou presente de verdade", value: "emocao" }
    ]
  },
  {
    question: "5. O que representa amor na nossa rotina?",
    answers: [
      { text: "Cuidar um do outro", value: "emocao" },
      { text: "Fazer-te rir", value: "emocao" },
      { text: "Preocupar-me contigo", value: "emocao" },
      { text: "A partilha do dia", value: "emocao" },
      { text: "Os gestos espontâneos", value: "emocao" }
    ]
  },
  {
    question: "6. O que sentes quando estás comigo em silêncio?",
    answers: [
      { text: "Paz", value: "emocao" },
      { text: "Segurança", value: "emocao" },
      { text: "Presença real", value: "emocao" },
      { text: "Desejo de mais", value: "emocao" },
      { text: "Conexão invisível", value: "emocao" }
    ]
  },
  {
    question: "7. Qual destes momentos mais te marcou?",
    answers: [
      { text: "A primeira troca de olhares", value: "emocao" },
      { text: "O primeiro toque íntimo", value: "emocao" },
      { text: "O primeiro 'gosto de ti'", value: "emocao" },
      { text: "Um choro partilhado", value: "emocao" },
      { text: "Um segredo revelado", value: "emocao" }
    ]
  },
  {
    question: "8. Quando mais confias em mim?",
    answers: [
      { text: "Quando me entregas os teus medos", value: "emocao" },
      { text: "Quando partilhas fantasias", value: "emocao" },
      { text: "Quando mostras fraqueza", value: "emocao" },
      { text: "Quando confias em mim no escuro", value: "emocao" },
      { text: "Quando falamos sem filtros", value: "emocao" }
    ]
  },
  {
    question: "9. O que sentes quando somos vulneráveis juntos?",
    answers: [
      { text: "Ligação mais profunda", value: "emocao" },
      { text: "Confiança cega", value: "emocao" },
      { text: "Desejo de proteger", value: "emocao" },
      { text: "Mais amor", value: "emocao" },
      { text: "Admiração verdadeira", value: "emocao" }
    ]
  },
  {
    question: "10. O que representa o nosso olhar cúmplice?",
    answers: [
      { text: "Desejo contido", value: "emocao" },
      { text: "Amor genuíno", value: "emocao" },
      { text: "Segurança mútua", value: "emocao" },
      { text: "Intimidade crua", value: "emocao" },
      { text: "Confiança inabalável", value: "emocao" }
    ]
  },
  {
    question: "11. Quando sentes que me tens mesmo ali?",
    answers: [
      { text: "Quando seguras minha mão com força", value: "emocao" },
      { text: "Quando encostas a tua testa na minha", value: "emocao" },
      { text: "Quando choras ao meu lado", value: "emocao" },
      { text: "Quando partilhas o que ninguém sabe", value: "emocao" },
      { text: "Quando simplesmente estás em silêncio", value: "emocao" }
    ]
  },
  {
    question: "12. O que te faz sentir que te amo mesmo?",
    answers: [
      { text: "O jeito como me olhas", value: "emocao" },
      { text: "As palavras que usas", value: "emocao" },
      { text: "A forma como me tocas", value: "emocao" },
      { text: "O silêncio que respeitas", value: "emocao" },
      { text: "As tuas ações constantes", value: "emocao" }
    ]
  },
  {
    question: "13. Qual momento íntimo não envolve sexo mas te marcou?",
    answers: [
      { text: "Dormir abraçados", value: "emocao" },
      { text: "Cozinhar juntos", value: "emocao" },
      { text: "Rir até chorar", value: "emocao" },
      { text: "Ver um filme no colo", value: "emocao" },
      { text: "Tomar banho juntos", value: "emocao" }
    ]
  },
  {
    question: "14. Quando sentes que te respeito profundamente?",
    answers: [
      { text: "Quando te escuto com atenção", value: "emocao" },
      { text: "Quando aceito as tuas falhas", value: "emocao" },
      { text: "Quando pergunto como estás", value: "emocao" },
      { text: "Quando dou espaço", value: "emocao" },
      { text: "Quando apoio tuas decisões", value: "emocao" }
    ]
  },
  {
    question: "15. Qual destas atitudes mais representa cumplicidade?",
    answers: [
      { text: "Sorrirmos com um olhar", value: "emocao" },
      { text: "Apoiar sem falar", value: "emocao" },
      { text: "Estarmos presentes", value: "emocao" },
      { text: "Cuidarmos um do outro", value: "emocao" },
      { text: "Defender-te em qualquer lugar", value: "emocao" }
    ]
  },
  {
    question: "16. O que simboliza 'intimidade' para ti?",
    answers: [
      { text: "Tocar na alma", value: "emocao" },
      { text: "Olhar sem medo", value: "emocao" },
      { text: "Ser vulnerável", value: "emocao" },
      { text: "Aceitar o outro por inteiro", value: "emocao" },
      { text: "Estar nu de corpo e alma", value: "emocao" }
    ]
  },
  {
    question: "17. Qual destas frases gostas mais de ouvir?",
    answers: [
      { text: "Estou aqui para ti", value: "emocao" },
      { text: "Sinto orgulho de ti", value: "emocao" },
      { text: "És especial para mim", value: "emocao" },
      { text: "Gosto da tua verdade", value: "emocao" },
      { text: "Amo cada detalhe teu", value: "emocao" }
    ]
  },
  {
    question: "18. Quando te sentes mais acolhido(a)?",
    answers: [
      { text: "Quando me deito contigo", value: "emocao" },
      { text: "Quando falamos sobre o passado", value: "emocao" },
      { text: "Quando sonhamos juntos", value: "emocao" },
      { text: "Quando expões as tuas feridas", value: "emocao" },
      { text: "Quando respeitas o meu tempo", value: "emocao" }
    ]
  },
  {
    question: "19. O que significa 'nós' para ti?",
    answers: [
      { text: "Dois que se completam", value: "emocao" },
      { text: "Um refúgio seguro", value: "emocao" },
      { text: "Uma conexão fora do normal", value: "emocao" },
      { text: "Amor com verdade", value: "emocao" },
      { text: "Parceria e tesão", value: "emocao" }
    ]
  },
  {
    question: "20. Qual emoção te domina quando estás comigo?",
    answers: [
      { text: "Paz", value: "emocao" },
      { text: "Desejo", value: "emocao" },
      { text: "Gratidão", value: "emocao" },
      { text: "Segurança", value: "emocao" },
      { text: "Amor", value: "emocao" }
    ]
  },

    if (currentQuestionIndex % 20 === 0) {
  const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
  document.getElementById("phase-summary-text").textContent = resumo;

  questionScreen.classList.add("hidden");
  document.getElementById("phase-summary").classList.remove("hidden");

  faseAtual++;
  respostasPorFase = [];
}
    
  {
    question: "21. Quando te sentes mais seguro(a) comigo?",
    answers: [
      { text: "Quando conversamos a sério", value: "seguranca" },
      { text: "Quando partilhamos segredos", value: "seguranca" },
      { text: "Quando me tocas com ternura", value: "seguranca" },
      { text: "Quando rimos juntos", value: "seguranca" },
      { text: "Quando respeitas o meu espaço", value: "seguranca" }
    ]
  },
  {
    question: "22. Qual destes momentos representa intimidade para ti?",
    answers: [
      { text: "Adormecer lado a lado", value: "seguranca" },
      { text: "Conversar em silêncio", value: "seguranca" },
      { text: "Desabafar sem medo", value: "seguranca" },
      { text: "Olhar nos olhos", value: "seguranca" },
      { text: "Tocar de leve na pele", value: "seguranca" }
    ]
  },
  {
    question: "23. O que te dá mais confiança na relação?",
    answers: [
      { text: "A consistência dos gestos", value: "seguranca" },
      { text: "A forma como me ouves", value: "seguranca" },
      { text: "O carinho fora do sexo", value: "seguranca" },
      { text: "As tuas palavras verdadeiras", value: "seguranca" },
      { text: "O teu silêncio protetor", value: "seguranca" }
    ]
  },
  {
    question: "24. Quando sentes que somos um porto seguro?",
    answers: [
      { text: "Nos abraços apertados", value: "seguranca" },
      { text: "Na partilha de dores", value: "seguranca" },
      { text: "Quando me defendes", value: "seguranca" },
      { text: "Quando posso ser quem sou", value: "seguranca" },
      { text: "Quando me desnudo sem medo", value: "seguranca" }
    ]
  },
  {
    question: "25. Como expressas confiança de forma íntima?",
    answers: [
      { text: "Tocando com presença", value: "seguranca" },
      { text: "Falando sobre o que me assusta", value: "seguranca" },
      { text: "Permitindo o toque emocional", value: "seguranca" },
      { text: "Abrindo segredos", value: "seguranca" },
      { text: "Apenas estando ao teu lado", value: "seguranca" }
    ]
  },
  {
    question: "26. O que mais nutre a tua entrega?",
    answers: [
      { text: "O toque sincero", value: "seguranca" },
      { text: "A escuta ativa", value: "seguranca" },
      { text: "O tempo juntos", value: "seguranca" },
      { text: "A vulnerabilidade mútua", value: "seguranca" },
      { text: "A proteção silenciosa", value: "seguranca" }
    ]
  },
  {
    question: "27. Como sabes que posso confiar em ti?",
    answers: [
      { text: "Respeitas os meus limites", value: "seguranca" },
      { text: "Ficas mesmo nos dias difíceis", value: "seguranca" },
      { text: "Nunca usas minhas dores contra mim", value: "seguranca" },
      { text: "Seguras minha mão em silêncio", value: "seguranca" },
      { text: "Permites que eu me mostre vulnerável", value: "seguranca" }
    ]
  },
  {
    question: "28. Como demonstras cuidado além do sexo?",
    answers: [
      { text: "Cozinhando algo especial", value: "seguranca" },
      { text: "Cobrindo-me quando durmo", value: "seguranca" },
      { text: "Escutando as minhas dores", value: "seguranca" },
      { text: "Apoiando os meus sonhos", value: "seguranca" },
      { text: "Ficando perto mesmo em silêncio", value: "seguranca" }
    ]
  },
  {
    question: "29. Quando te sinto vulnerável, eu...",
    answers: [
      { text: "Quero cuidar de ti", value: "seguranca" },
      { text: "Fico ainda mais próximo(a)", value: "seguranca" },
      { text: "Admiro a tua coragem", value: "seguranca" },
      { text: "Sinto desejo de proteger-te", value: "seguranca" },
      { text: "Quero abraçar-te devagar", value: "seguranca" }
    ]
  },
  {
    question: "30. Quando abro o meu coração contigo, sinto...",
    answers: [
      { text: "Leveza", value: "seguranca" },
      { text: "Cumplicidade profunda", value: "seguranca" },
      { text: "Alívio emocional", value: "seguranca" },
      { text: "Liberdade", value: "seguranca" },
      { text: "Entrega total", value: "seguranca" }
    ]
  },
  {
    question: "31. O que simboliza a entrega verdadeira?",
    answers: [
      { text: "Deixar que me vejas por dentro", value: "seguranca" },
      { text: "Permitir-me errar contigo", value: "seguranca" },
      { text: "Chorar sem vergonha", value: "seguranca" },
      { text: "Falar sobre os meus medos", value: "seguranca" },
      { text: "Aceitar o teu toque emocional", value: "seguranca" }
    ]
  },
  {
    question: "32. A confiança cresce quando...",
    answers: [
      { text: "Te vejo vulnerável", value: "seguranca" },
      { text: "Somos honestos mesmo no erro", value: "seguranca" },
      { text: "Respeitas o meu tempo", value: "seguranca" },
      { text: "Me abraças quando menos espero", value: "seguranca" },
      { text: "Me escutas em silêncio", value: "seguranca" }
    ]
  },
  {
    question: "33. Como reages quando eu me abro emocionalmente?",
    answers: [
      { text: "Com escuta e presença", value: "seguranca" },
      { text: "Com carinho e proteção", value: "seguranca" },
      { text: "Com silêncio acolhedor", value: "seguranca" },
      { text: "Com lágrimas de empatia", value: "seguranca" },
      { text: "Com amor incondicional", value: "seguranca" }
    ]
  },
  {
    question: "34. O que torna o nosso vínculo forte?",
    answers: [
      { text: "A partilha de dores e alegrias", value: "seguranca" },
      { text: "A escuta sem julgamento", value: "seguranca" },
      { text: "A presença nos dias difíceis", value: "seguranca" },
      { text: "A leveza dos momentos", value: "seguranca" },
      { text: "A confiança no silêncio", value: "seguranca" }
    ]
  },
  {
    question: "35. Como expressas carinho sem palavras?",
    answers: [
      { text: "Com um olhar suave", value: "seguranca" },
      { text: "Com um toque leve", value: "seguranca" },
      { text: "Com presença constante", value: "seguranca" },
      { text: "Com gestos simples", value: "seguranca" },
      { text: "Com respeito absoluto", value: "seguranca" }
    ]
  },
  {
    question: "36. Quando te sentes respeitado(a) por mim?",
    answers: [
      { text: "Quando ouço as tuas verdades", value: "seguranca" },
      { text: "Quando não te interrompo", value: "seguranca" },
      { text: "Quando aceito o teu espaço", value: "seguranca" },
      { text: "Quando me calo para ouvir-te", value: "seguranca" },
      { text: "Quando valorizo as tuas emoções", value: "seguranca" }
    ]
  },
  {
    question: "37. Como lidas com a tua vulnerabilidade comigo?",
    answers: [
      { text: "Entrego-a sem medo", value: "seguranca" },
      { text: "Revelo pouco a pouco", value: "seguranca" },
      { text: "Testo o teu acolhimento", value: "seguranca" },
      { text: "Confio no teu silêncio", value: "seguranca" },
      { text: "Ainda aprendo a confiar", value: "seguranca" }
    ]
  },
  {
    question: "38. O que representa proteção emocional?",
    answers: [
      { text: "Estar presente nas dores", value: "seguranca" },
      { text: "Dar colo sem pedir", value: "seguranca" },
      { text: "Respeitar os limites", value: "seguranca" },
      { text: "Fazer-me sentir seguro(a)", value: "seguranca" },
      { text: "Saber que não vais embora", value: "seguranca" }
    ]
  },
  {
    question: "39. O que acontece quando me abres o coração?",
    answers: [
      { text: "Crio mais empatia", value: "seguranca" },
      { text: "Sinto conexão profunda", value: "seguranca" },
      { text: "Quero proteger-te", value: "seguranca" },
      { text: "Fico mais próximo(a)", value: "seguranca" },
      { text: "Sinto-me honrado(a)", value: "seguranca" }
    ]
  },
  {
    question: "40. Qual o maior sinal de confiança num casal?",
    answers: [
      { text: "Partilhar o medo", value: "seguranca" },
      { text: "Aceitar o outro como é", value: "seguranca" },
      { text: "Permitir-se falhar", value: "seguranca" },
      { text: "Estar vulnerável", value: "seguranca" },
      { text: "Não esconder nada", value: "seguranca" }
    ]
  },

  if (currentQuestionIndex % 20 === 0) {
  const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
  document.getElementById("phase-summary-text").textContent = resumo;

  questionScreen.classList.add("hidden");
  document.getElementById("phase-summary").classList.remove("hidden");

  faseAtual++;
  respostasPorFase = [];
}

  {
    question: "41. O que mais desperta o teu desejo?",
    answers: [
      { text: "Olhares provocantes", value: "desejo" },
      { text: "Toques suaves", value: "desejo" },
      { text: "Palavras ousadas", value: "desejo" },
      { text: "A antecipação", value: "curiosidade" },
      { text: "Um beijo lento", value: "desejo" }
    ]
  },
  {
    question: "42. Onde começa o teu desejo?",
    answers: [
      { text: "Na mente", value: "curiosidade" },
      { text: "Nos olhos", value: "desejo" },
      { text: "Na pele", value: "desejo" },
      { text: "Na imaginação", value: "curiosidade" },
      { text: "No cheiro", value: "desejo" }
    ]
  },
  {
    question: "43. Qual toque te deixa mais aceso(a)?",
    answers: [
      { text: "Dedos no pescoço", value: "desejo" },
      { text: "Mãos na cintura", value: "desejo" },
      { text: "Beijos na barriga", value: "desejo" },
      { text: "Lambidas na orelha", value: "desejo" },
      { text: "Arranhões discretos", value: "desejo" }
    ]
  },
  {
    question: "44. Que tipo de beijo mais te excita?",
    answers: [
      { text: "Molhado e profundo", value: "desejo" },
      { text: "Lento e provocador", value: "curiosidade" },
      { text: "Rápido e bruto", value: "desejo" },
      { text: "De língua com mordidas", value: "desejo" },
      { text: "Nos ouvidos ou pescoço", value: "desejo" }
    ]
  },
  {
    question: "45. O que mais estimula a tua mente?",
    answers: [
      { text: "Mensagens provocantes", value: "curiosidade" },
      { text: "Conversas sujas", value: "curiosidade" },
      { text: "Fantasias partilhadas", value: "curiosidade" },
      { text: "Sugestões subtis", value: "curiosidade" },
      { text: "Um olhar que diz tudo", value: "curiosidade" }
    ]
  },
  {
    question: "46. Qual dessas situações te excita mais?",
    answers: [
      { text: "Ser surpreendido(a) com um beijo", value: "desejo" },
      { text: "Ser puxado(a) contra a parede", value: "desejo" },
      { text: "Receber uma mensagem ousada", value: "curiosidade" },
      { text: "Explorar em silêncio", value: "curiosidade" },
      { text: "Ser tocado(a) devagar", value: "desejo" }
    ]
  },
  {
    question: "47. Qual destas ideias te provoca mais?",
    answers: [
      { text: "Transar em local inesperado", value: "curiosidade" },
      { text: "Sexo apenas com toque", value: "curiosidade" },
      { text: "Ficar vendado(a)", value: "curiosidade" },
      { text: "Ficar nu(a) e só observar", value: "curiosidade" },
      { text: "Ficar em silêncio total", value: "curiosidade" }
    ]
  },
  {
    question: "48. O que te deixa com água na boca?",
    answers: [
      { text: "Ver o outro despir-se", value: "desejo" },
      { text: "Ser observado(a)", value: "curiosidade" },
      { text: "Ouvir gemidos ao longe", value: "curiosidade" },
      { text: "Receber ordens", value: "curiosidade" },
      { text: "Tocar e não poder beijar", value: "desejo" }
    ]
  },
  {
    question: "49. O que te acende antes mesmo do toque?",
    answers: [
      { text: "Um olhar fixo", value: "desejo" },
      { text: "Uma respiração próxima", value: "desejo" },
      { text: "Palavras no ouvido", value: "curiosidade" },
      { text: "Ver a outra pessoa se tocar", value: "curiosidade" },
      { text: "Imagens que sugerem", value: "curiosidade" }
    ]
  },
  {
    question: "50. Que som mais te excita?",
    answers: [
      { text: "Gemidos baixinhos", value: "desejo" },
      { text: "Sussurros quentes", value: "desejo" },
      { text: "Respiração acelerada", value: "desejo" },
      { text: "Beijos molhados", value: "desejo" },
      { text: "Palavras de comando", value: "curiosidade" }
    ]
  },
  {
    question: "51. Que papel adoras explorar em momentos quentes?",
    answers: [
      { text: "Provocador(a)", value: "curiosidade" },
      { text: "Misterioso(a)", value: "curiosidade" },
      { text: "Dominador(a)", value: "desejo" },
      { text: "Submisso(a)", value: "desejo" },
      { text: "Observador(a)", value: "curiosidade" }
    ]
  },
  {
    question: "52. Que tipo de toque te enlouquece?",
    answers: [
      { text: "Leve e quente", value: "desejo" },
      { text: "Firme e controlado", value: "desejo" },
      { text: "Arranhado e mordido", value: "desejo" },
      { text: "Feito com intenção", value: "desejo" },
      { text: "Proibido e rápido", value: "desejo" }
    ]
  },
  {
    question: "53. Onde o desejo mais te consome?",
    answers: [
      { text: "No peito", value: "desejo" },
      { text: "Na mente", value: "curiosidade" },
      { text: "Entre as pernas", value: "desejo" },
      { text: "Na boca", value: "desejo" },
      { text: "Nos olhos", value: "curiosidade" }
    ]
  },
  {
    question: "54. Quando é que o desejo te surpreende?",
    answers: [
      { text: "Durante um abraço demorado", value: "desejo" },
      { text: "Ao ver a pessoa nua", value: "desejo" },
      { text: "Num beijo na rua", value: "curiosidade" },
      { text: "Durante uma troca de olhares", value: "curiosidade" },
      { text: "Quando a mente imagina", value: "curiosidade" }
    ]
  },
  {
    question: "55. Qual destes jogos gostarias de explorar?",
    answers: [
      { text: "Ficar vendado(a)", value: "curiosidade" },
      { text: "Tocar sem falar", value: "curiosidade" },
      { text: "Obedecer ordens sexuais", value: "curiosidade" },
      { text: "Ser observado(a)", value: "curiosidade" },
      { text: "Escrever fantasias e realizar", value: "curiosidade" }
    ]
  },
  {
    question: "56. Que parte do corpo te fascina mais explorar?",
    answers: [
      { text: "Boca e língua", value: "desejo" },
      { text: "Pescoço e costas", value: "desejo" },
      { text: "Coxas e ancas", value: "desejo" },
      { text: "Olhos e expressões", value: "curiosidade" },
      { text: "Dedos e mãos", value: "curiosidade" }
    ]
  },
  {
    question: "57. Qual destas provocações te aquece mais?",
    answers: [
      { text: "Sussurrar segredos", value: "curiosidade" },
      { text: "Morder os lábios", value: "desejo" },
      { text: "Deixar marcas discretas", value: "desejo" },
      { text: "Olhar fixamente e sorrir", value: "curiosidade" },
      { text: "Beijar sem permissão", value: "desejo" }
    ]
  },
  {
    question: "58. Que ideia proibida já te excitou?",
    answers: [
      { text: "Sexo em lugar público", value: "curiosidade" },
      { text: "Ser apanhado(a) no ato", value: "curiosidade" },
      { text: "Fazer algo em segredo", value: "curiosidade" },
      { text: "Ir além dos limites", value: "curiosidade" },
      { text: "Explorar um fetiche oculto", value: "curiosidade" }
    ]
  },
  {
    question: "59. Qual destas situações te deixa sem fôlego?",
    answers: [
      { text: "Ser puxado(a) pela nuca", value: "desejo" },
      { text: "Ser encostado(a) contra a parede", value: "desejo" },
      { text: "Ter os pulsos presos", value: "curiosidade" },
      { text: "Ser acariciado(a) com palavras", value: "curiosidade" },
      { text: "Ser provocado(a) lentamente", value: "curiosidade" }
    ]
  },
  {
    question: "60. O que te deixa mais à flor da pele?",
    answers: [
      { text: "Um toque demorado", value: "desejo" },
      { text: "Um olhar que prende", value: "curiosidade" },
      { text: "A tensão antes do beijo", value: "curiosidade" },
      { text: "Ouvir que estás a ser desejado(a)", value: "curiosidade" },
      { text: "Perceber que estás no controlo", value: "curiosidade" }
    ]
  },

if (currentQuestionIndex % 20 === 0) {
  const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
  document.getElementById("phase-summary-text").textContent = resumo;

  questionScreen.classList.add("hidden");
  document.getElementById("phase-summary").classList.remove("hidden");

  faseAtual++;
  respostasPorFase = [];
}

  {
    question: "61. Qual destas fantasias te intriga mais?",
    answers: [
      { text: "Sexo num local público", value: "exploracao" },
      { text: "Ser dominado(a)", value: "submissao" },
      { text: "Dominar com força", value: "dominancia" },
      { text: "Usar brinquedos", value: "exploracao" },
      { text: "Sexo às cegas", value: "curiosidade" }
    ]
  },
  {
    question: "62. Como reagirias se eu dissesse 'obedece-me agora'?",
    answers: [
      { text: "Obedecia com tesão", value: "submissao" },
      { text: "Desafiava com um sorriso", value: "dominancia" },
      { text: "Provocava ainda mais", value: "exploracao" },
      { text: "Curvava-me com prazer", value: "submissao" },
      { text: "Mandava calar e beijava-te", value: "dominancia" }
    ]
  },
  {
    question: "63. Já te imaginaste de olhos vendados, só a sentir?",
    answers: [
      { text: "Sim, e adorei a ideia", value: "exploracao" },
      { text: "Sim, já fiz", value: "curiosidade" },
      { text: "Não, mas excitou-me agora", value: "curiosidade" },
      { text: "Depende de quem guia", value: "submissao" },
      { text: "Prefiro ver tudo", value: "dominancia" }
    ]
  },
  {
    question: "64. Que palavra melhor te define num jogo de poder?",
    answers: [
      { text: "Submisso(a) sedento(a)", value: "submissao" },
      { text: "Dominador(a) feroz", value: "dominancia" },
      { text: "Explorador(a) curioso(a)", value: "exploracao" },
      { text: "Servil, mas provocador(a)", value: "submissao" },
      { text: "Controlador(a) com prazer", value: "dominancia" }
    ]
  },
  {
    question: "65. Onde te imaginas a ser tocado(a) sem aviso?",
    answers: [
      { text: "Num elevador vazio", value: "exploracao" },
      { text: "Num canto escuro", value: "exploracao" },
      { text: "Na casa de banho de um bar", value: "exploracao" },
      { text: "Durante um jantar a dois", value: "curiosidade" },
      { text: "Num parque à noite", value: "exploracao" }
    ]
  },
  {
    question: "66. O que sentes com uma leve palmada no rabo?",
    answers: [
      { text: "Tesão puro", value: "submissao" },
      { text: "Desejo de mais", value: "submissao" },
      { text: "Domínio partilhado", value: "dominancia" },
      { text: "Entrega", value: "submissao" },
      { text: "Quero dar uma de volta", value: "dominancia" }
    ]
  },
  {
    question: "67. Que tipo de jogo mais te atrai?",
    answers: [
      { text: "Mandar e obedecer", value: "dominancia" },
      { text: "Ficar à mercê", value: "submissao" },
      { text: "Explorar os limites", value: "exploracao" },
      { text: "Ser guiado(a) em silêncio", value: "submissao" },
      { text: "Fazer cumprir ordens", value: "dominancia" }
    ]
  },
  {
    question: "68. E se eu dissesse 'ajoelha-te'?",
    answers: [
      { text: "Já estava no chão", value: "submissao" },
      { text: "Olhava-te nos olhos e obedecia", value: "submissao" },
      { text: "Ria e puxava-te para mim", value: "dominancia" },
      { text: "Resistia, mas cedia", value: "exploracao" },
      { text: "Fazia-te ajoelhar tu", value: "dominancia" }
    ]
  },
  {
    question: "69. Já sentiste prazer em servir?",
    answers: [
      { text: "Sim, muito", value: "submissao" },
      { text: "Sim, é excitante", value: "submissao" },
      { text: "Gosto de provocar enquanto sirvo", value: "submissao" },
      { text: "Prefiro ser servido(a)", value: "dominancia" },
      { text: "Nunca experimentei", value: "curiosidade" }
    ]
  },
  {
    question: "70. Que parte do corpo adoras dominar com a boca?",
    answers: [
      { text: "Pescoço", value: "exploracao" },
      { text: "Mamilos", value: "exploracao" },
      { text: "Orelha", value: "exploracao" },
      { text: "Coxas", value: "desejo" },
      { text: "Tudo, sem parar", value: "desejo" }
    ]
  },
  {
    question: "71. Com que frequência tens fantasias durante o dia?",
    answers: [
      { text: "Quase sempre", value: "curiosidade" },
      { text: "Quando estou contigo", value: "curiosidade" },
      { text: "Ao ver certos gestos", value: "curiosidade" },
      { text: "Quando me toco", value: "curiosidade" },
      { text: "Sempre que me provoco a mim mesmo(a)", value: "curiosidade" }
    ]
  },
  {
    question: "72. Qual destes fetiches já consideraste?",
    answers: [
      { text: "Fitas nos olhos", value: "curiosidade" },
      { text: "Amarrar as mãos", value: "submissao" },
      { text: "Ser dominado(a) verbalmente", value: "submissao" },
      { text: "Brinquedos vibrantes", value: "exploracao" },
      { text: "Obedecer com prazer", value: "submissao" }
    ]
  },
  {
    question: "73. Como seria uma noite de pura ousadia?",
    answers: [
      { text: "Entregar o corpo por completo", value: "submissao" },
      { text: "Dominar do início ao fim", value: "dominancia" },
      { text: "Experimentar algo novo", value: "exploracao" },
      { text: "Ser testado(a) até gemer", value: "submissao" },
      { text: "Levar até o limite", value: "dominancia" }
    ]
  },
  {
    question: "74. Onde te imaginas de quatro, olhos fechados?",
    answers: [
      { text: "No chão do quarto", value: "submissao" },
      { text: "Contra a parede", value: "submissao" },
      { text: "Sobre a cama, à espera", value: "submissao" },
      { text: "No sofá", value: "exploracao" },
      { text: "Onde quiseres mandar", value: "submissao" }
    ]
  },
  {
    question: "75. Que ordem te deixaria molhado(a)?",
    answers: [
      { text: "Toca-te agora", value: "submissao" },
      { text: "Não faças nada, só sente", value: "dominancia" },
      { text: "Ajoelha-te e abre a boca", value: "submissao" },
      { text: "Fica de quatro para mim", value: "dominancia" },
      { text: "Obedece e geme", value: "dominancia" }
    ]
  },
  {
    question: "76. Que papel assumias num quarto escuro?",
    answers: [
      { text: "Submisso(a) à espera", value: "submissao" },
      { text: "Dom(a) à caça", value: "dominancia" },
      { text: "Explorador(a) silencioso(a)", value: "exploracao" },
      { text: "Provocador(a) sem medo", value: "curiosidade" },
      { text: "Servil com prazer", value: "submissao" }
    ]
  },
  {
    question: "77. Que pensamento te faz morder os lábios?",
    answers: [
      { text: "Ser apanhado(a) no ato", value: "curiosidade" },
      { text: "Sexo às escondidas", value: "exploracao" },
      { text: "Levar palmadas e gemer", value: "submissao" },
      { text: "Ordenar e ver obedecer", value: "dominancia" },
      { text: "Amarrado(a), sem escapatória", value: "submissao" }
    ]
  },
  {
    question: "78. Como provocarias alguém só com palavras?",
    answers: [
      { text: "Descrevendo o que faria", value: "dominancia" },
      { text: "Contando fantasias explícitas", value: "exploracao" },
      { text: "Mandando gemer ao telefone", value: "submissao" },
      { text: "Com mensagens durante o dia", value: "curiosidade" },
      { text: "Sussurrando no ouvido", value: "curiosidade" }
    ]
  },
  {
    question: "79. Qual destes brinquedos queres usar primeiro?",
    answers: [
      { text: "Algemas", value: "exploracao" },
      { text: "Venda", value: "exploracao" },
      { text: "Vibrador", value: "exploracao" },
      { text: "Plug anal", value: "exploracao" },
      { text: "Chicote leve", value: "exploracao" }
    ]
  },
  {
    question: "80. Qual é a tua fantasia secreta?",
    answers: [
      { text: "Ser usado(a) por completo", value: "submissao" },
      { text: "Controlar todos os teus orgasmos", value: "dominancia" },
      { text: "Ficar nu(a) e exposto(a)", value: "exploracao" },
      { text: "Fazer amor e depois sexo cru", value: "exploracao" },
      { text: "Levar ordens e obedecer gemendo", value: "submissao" }
    ]
  },

  if (currentQuestionIndex % 20 === 0) {
  const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
  document.getElementById("phase-summary-text").textContent = resumo;

  questionScreen.classList.add("hidden");
  document.getElementById("phase-summary").classList.remove("hidden");

  faseAtual++;
  respostasPorFase = [];
}

  {
    question: "81. Quando pensas em engolir tudo até ao fim, sentes...",
    answers: [
      { text: "Tesão total", value: "oral_forte" },
      { text: "Prazer em servir", value: "oral_submisso" },
      { text: "Submissão deliciosa", value: "oral_submisso" },
      { text: "Gosto de provocar com isso", value: "oral_provocador" },
      { text: "Não me atrai", value: "oral_neutro" }
    ]
  },
  {
    question: "82. Já te masturbaste a pensar em ser fodido(a) pelo rabo?",
    answers: [
      { text: "Sim, várias vezes", value: "anal_explorado" },
      { text: "Sim, e gosto da ideia", value: "anal_curioso" },
      { text: "Tenho curiosidade", value: "anal_curioso" },
      { text: "Só em fantasia", value: "anal_fantasia" },
      { text: "Nunca, não é para mim", value: "anal_nah" }
    ]
  },
  {
    question: "83. Oral até as lágrimas...?",
    answers: [
      { text: "Já vivi isso", value: "oral_intenso" },
      { text: "Quero tentar", value: "oral_curioso" },
      { text: "Excita-me só de imaginar", value: "oral_excitado" },
      { text: "Depende da entrega", value: "oral_dependente" },
      { text: "Gosto suave apenas", value: "oral_suave" }
    ]
  },
  {
    question: "84. Já tiveste orgasmo anal?",
    answers: [
      { text: "Sim, e foi brutal", value: "anal_orgasmo" },
      { text: "Sim, mais de uma vez", value: "anal_adepto" },
      { text: "Ainda não, mas quero", value: "anal_curioso" },
      { text: "Só cheguei perto", value: "anal_quase" },
      { text: "Não experimentei", value: "anal_nah" }
    ]
  },
  {
    question: "85. O que sentes com palmadas no sexo?",
    answers: [
      { text: "Mais tesão ainda", value: "bdsm_light" },
      { text: "Domínio delicioso", value: "bdsm_dom" },
      { text: "Gosto de pedir mais", value: "bdsm_sub" },
      { text: "Grito e mordo os lençóis", value: "bdsm_bruto" },
      { text: "Não gosto de dor", value: "bdsm_fora" }
    ]
  },
  {
    question: "86. Já disseste: 'usa-me como quiseres'?",
    answers: [
      { text: "Sim, e fui levado(a) ao limite", value: "submissao_total" },
      { text: "Sim, e adorei a entrega", value: "submissao_prazer" },
      { text: "Já pensei em dizer", value: "submissao_desejo" },
      { text: "Tenho vergonha, mas penso nisso", value: "submissao_oculta" },
      { text: "Nunca diria", value: "submissao_nao" }
    ]
  },
  {
    question: "87. O que fazes ao ver alguém se tocar por ti?",
    answers: [
      { text: "Toco-me junto", value: "espelho" },
      { text: "Fico a ver, excitado(a)", value: "voyeur" },
      { text: "Entro no jogo com ordens", value: "domina" },
      { text: "Fico tímido(a), mas gosto", value: "timidez" },
      { text: "Prefiro agir, não ver", value: "ativo" }
    ]
  },
  {
    question: "88. Já lambeste alguém por trás?",
    answers: [
      { text: "Sim, e amei", value: "oral_anal_ativo" },
      { text: "Sim, com prazer", value: "oral_anal_gostoso" },
      { text: "Tenho vontade", value: "oral_anal_curioso" },
      { text: "Só recebi", value: "oral_anal_passivo" },
      { text: "Nunca, não me atrai", value: "oral_anal_nah" }
    ]
  },
  {
    question: "89. Que gemido te excita mais?",
    answers: [
      { text: "Contido, abafado", value: "som_sutil" },
      { text: "Forte e desesperado", value: "som_intenso" },
      { text: "Enquanto chupo", value: "som_oral" },
      { text: "Enquanto sou dominado(a)", value: "som_sub" },
      { text: "O meu próprio gemido", value: "som_auto" }
    ]
  },
  {
    question: "90. Já desejaste algo proibido com alguém?",
    answers: [
      { text: "Sim, muitas vezes", value: "fantasia_proibida" },
      { text: "Sim, e quase fiz", value: "fantasia_real" },
      { text: "Sim, só na mente", value: "fantasia_oculta" },
      { text: "Sim, e foi intenso", value: "fantasia_executada" },
      { text: "Nunca, prefiro o seguro", value: "fantasia_bloqueio" }
    ]
  },
  {
    question: "91. Já gozaste só com oral?",
    answers: [
      { text: "Sim, várias vezes", value: "oral_climax" },
      { text: "Sim, e forte", value: "oral_forte" },
      { text: "Sim, mas raramente", value: "oral_suave" },
      { text: "Ainda não, mas quero", value: "oral_desejo" },
      { text: "Não gosto tanto de oral", value: "oral_neutro" }
    ]
  },
  {
    question: "92. Já foste enrabado(a) com força?",
    answers: [
      { text: "Sim, e amei", value: "anal_duro" },
      { text: "Sim, com safadeza", value: "anal_prazer" },
      { text: "Tenho essa fantasia", value: "anal_desejo" },
      { text: "Só brinquei", value: "anal_soft" },
      { text: "Nunca aceitei", value: "anal_limite" }
    ]
  },
  {
    question: "93. Sexo selvagem ou lento e intenso?",
    answers: [
      { text: "Selvagem, sem dó", value: "sexo_bruto" },
      { text: "Lento, com olhos fechados", value: "sexo_sensual" },
      { text: "Ambos, num só ato", value: "sexo_duplo" },
      { text: "Depende do dia", value: "sexo_flex" },
      { text: "Gosto mais de carinho", value: "sexo_calmo" }
    ]
  },
  {
    question: "94. Como preferes ser fodido(a)?",
    answers: [
      { text: "De quatro, com força", value: "sexo_doggy" },
      { text: "Por cima, com domínio", value: "sexo_dom" },
      { text: "Na boca, até chorar", value: "oral_intenso" },
      { text: "Com palavras sujas", value: "sexo_dirtytalk" },
      { text: "Com carinho e intensidade", value: "sexo_misto" }
    ]
  },
  {
    question: "95. Já fizeste um 'facial' com prazer?",
    answers: [
      { text: "Sim, e adorei ver", value: "facial_visual" },
      { text: "Sim, e lambi depois", value: "facial_provoca" },
      { text: "Quero tentar", value: "facial_curioso" },
      { text: "Só em pensamento", value: "facial_fantasia" },
      { text: "Nunca faria", value: "facial_nao" }
    ]
  },
  {
    question: "96. Tens prazer em ser usado(a)?",
    answers: [
      { text: "Sim, é libertador", value: "uso_sub" },
      { text: "Sim, quando confio", value: "uso_confianca" },
      { text: "Sim, com ordens", value: "uso_ordem" },
      { text: "Não gosto dessa ideia", value: "uso_nao" },
      { text: "Depende da vibe", value: "uso_condicao" }
    ]
  },
  {
    question: "97. Já imploraste por mais durante o sexo?",
    answers: [
      { text: "Sim, e estava em êxtase", value: "sub_total" },
      { text: "Sim, e foi intenso", value: "sub_quente" },
      { text: "Sim, e fui dominado(a)", value: "sub_dom" },
      { text: "Ainda não, mas adorava", value: "sub_desejo" },
      { text: "Nunca faria isso", value: "sub_limite" }
    ]
  },
  {
    question: "98. O que fazes quando te penetram bem fundo?",
    answers: [
      { text: "Gemo alto", value: "climax_explosao" },
      { text: "Agarro-me forte", value: "climax_reacao" },
      { text: "Peço mais", value: "climax_sub" },
      { text: "Mordo os lábios", value: "climax_controlado" },
      { text: "Choro de prazer", value: "climax_emocao" }
    ]
  },
  {
    question: "99. Já ficaste com as pernas a tremer de tanto prazer?",
    answers: [
      { text: "Sim, muitas vezes", value: "orgasmo_tremor" },
      { text: "Sim, com oral profundo", value: "orgasmo_oral" },
      { text: "Sim, ao ser dominado(a)", value: "orgasmo_sub" },
      { text: "Quero sentir isso", value: "orgasmo_curioso" },
      { text: "Nunca senti assim", value: "orgasmo_nah" }
    ]
  },
  {
    question: "100. E se eu dissesse 'és minha putinha agora'?",
    answers: [
      { text: "Eu gemia e obedecia", value: "dirty_dom" },
      { text: "Eu arrepiava na hora", value: "dirty_sub" },
      { text: "Gosto de ouvir isso", value: "dirty_ousadia" },
      { text: "Ficava excitado(a), mas tímido(a)", value: "dirty_curioso" },
      { text: "Não gosto dessas palavras", value: "dirty_fora" }
    ]
  },

  if (currentQuestionIndex % 20 === 0) {
  const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
  document.getElementById("phase-summary-text").textContent = resumo;

  questionScreen.classList.add("hidden");
  document.getElementById("phase-summary").classList.remove("hidden");

  faseAtual++;
  respostasPorFase = [];
}

  {
    question: "101. O que representa verdadeira cumplicidade para ti?",
    answers: [
      { text: "Saber o que o outro sente sem falar", value: "cumplicidade" },
      { text: "Estar presente mesmo no silêncio", value: "cumplicidade" },
      { text: "Rir juntos do nada", value: "cumplicidade" },
      { text: "Desejar e respeitar ao mesmo tempo", value: "cumplicidade" },
      { text: "Cuidar e provocar com o mesmo olhar", value: "cumplicidade" }
    ]
  },
  {
    question: "102. Quando sentes que somos um só?",
    answers: [
      { text: "Durante o sexo profundo", value: "cumplicidade" },
      { text: "Quando estamos abraçados", value: "cumplicidade" },
      { text: "Nos olhares longos", value: "cumplicidade" },
      { text: "Ao rirmos em sintonia", value: "cumplicidade" },
      { text: "Na forma como tocamos sem pensar", value: "cumplicidade" }
    ]
  },
  {
    question: "103. Que tipo de futuro imaginas connosco?",
    answers: [
      { text: "Cheio de tesão e carinho", value: "cumplicidade" },
      { text: "Com aventuras e conversas íntimas", value: "cumplicidade" },
      { text: "Com liberdade e fidelidade", value: "cumplicidade" },
      { text: "Profundo e desafiante", value: "cumplicidade" },
      { text: "Duradouro e surpreendente", value: "cumplicidade" }
    ]
  },
  {
    question: "104. Como sabes que me desejas além do físico?",
    answers: [
      { text: "Porque quero cuidar de ti", value: "cumplicidade" },
      { text: "Porque te desejo até em silêncio", value: "cumplicidade" },
      { text: "Porque penso em ti nos detalhes", value: "cumplicidade" },
      { text: "Porque o meu corpo responde ao teu", value: "cumplicidade" },
      { text: "Porque a minha alma te reconhece", value: "cumplicidade" }
    ]
  },
  {
    question: "105. Qual seria a nossa rotina ideal?",
    answers: [
      { text: "Beijos longos ao acordar", value: "cumplicidade" },
      { text: "Sexo antes do pequeno-almoço", value: "cumplicidade" },
      { text: "Conversas sem pressa", value: "cumplicidade" },
      { text: "Abraços no fim do dia", value: "cumplicidade" },
      { text: "Olhares cúmplices todos os dias", value: "cumplicidade" }
    ]
  },
  {
    question: "106. Onde sentes que a nossa ligação se reforça?",
    answers: [
      { text: "No toque durante o sexo", value: "cumplicidade" },
      { text: "Nas palavras de conforto", value: "cumplicidade" },
      { text: "Nos momentos em silêncio", value: "cumplicidade" },
      { text: "Na entrega sem medo", value: "cumplicidade" },
      { text: "Na forma como nos respeitamos", value: "cumplicidade" }
    ]
  },
  {
    question: "107. Qual é o maior sinal de confiança entre nós?",
    answers: [
      { text: "Desnudar a alma e o corpo", value: "cumplicidade" },
      { text: "Falar de medos sem receio", value: "cumplicidade" },
      { text: "Aceitar o outro com verdade", value: "cumplicidade" },
      { text: "Sentir desejo com respeito", value: "cumplicidade" },
      { text: "Ser livre e ainda assim escolher o outro", value: "cumplicidade" }
    ]
  },
  {
    question: "108. Quando somos mais intensos?",
    answers: [
      { text: "No meio de um beijo profundo", value: "cumplicidade" },
      { text: "Ao rir depois do sexo", value: "cumplicidade" },
      { text: "Quando partilhamos fantasias", value: "cumplicidade" },
      { text: "Nos silêncios entre toques", value: "cumplicidade" },
      { text: "Ao olhar-nos como ninguém mais olha", value: "cumplicidade" }
    ]
  },
  {
    question: "109. Como defines a nossa intimidade?",
    answers: [
      { text: "Sensual e emocional", value: "cumplicidade" },
      { text: "Crua e verdadeira", value: "cumplicidade" },
      { text: "Profunda e sem máscaras", value: "cumplicidade" },
      { text: "Ligação corpo-alma", value: "cumplicidade" },
      { text: "Amor com tesão e respeito", value: "cumplicidade" }
    ]
  },
  {
    question: "110. O que sentes depois de gozares comigo?",
    answers: [
      { text: "Gratidão", value: "cumplicidade" },
      { text: "Desejo de mais", value: "cumplicidade" },
      { text: "Paz profunda", value: "cumplicidade" },
      { text: "Vontade de abraçar forte", value: "cumplicidade" },
      { text: "Ligação total", value: "cumplicidade" }
    ]
  },
  {
    question: "111. Qual desses gestos representa amor profundo?",
    answers: [
      { text: "Cuidar de mim nu(a)", value: "cumplicidade" },
      { text: "Tocar-me devagar depois do sexo", value: "cumplicidade" },
      { text: "Olhar-me enquanto durmo", value: "cumplicidade" },
      { text: "Envolver-me com carinho intenso", value: "cumplicidade" },
      { text: "Saber o que preciso sem falar", value: "cumplicidade" }
    ]
  },
  {
    question: "112. Como equilibramos o amor e o desejo?",
    answers: [
      { text: "Com respeito e provocação", value: "cumplicidade" },
      { text: "Com entrega mútua", value: "cumplicidade" },
      { text: "Com liberdade para explorar", value: "cumplicidade" },
      { text: "Com conversas sinceras", value: "cumplicidade" },
      { text: "Com sexo que também cura", value: "cumplicidade" }
    ]
  },
  {
    question: "113. O que nunca pode faltar entre nós?",
    answers: [
      { text: "Beijos demorados", value: "cumplicidade" },
      { text: "Palavras sinceras", value: "cumplicidade" },
      { text: "Toques inesperados", value: "cumplicidade" },
      { text: "Confiança absoluta", value: "cumplicidade" },
      { text: "Desejo sem medo", value: "cumplicidade" }
    ]
  },
  {
    question: "114. Quando percebeste que te entregavas de verdade?",
    answers: [
      { text: "Quando gemi o teu nome", value: "cumplicidade" },
      { text: "Quando chorei contigo", value: "cumplicidade" },
      { text: "Quando me deixei tocar de alma", value: "cumplicidade" },
      { text: "Quando confiei sem reserva", value: "cumplicidade" },
      { text: "Quando disse tudo o que sentia", value: "cumplicidade" }
    ]
  },
  {
    question: "115. Como lidas com o nosso silêncio?",
    answers: [
      { text: "Como prova de conexão", value: "cumplicidade" },
      { text: "Como espaço seguro", value: "cumplicidade" },
      { text: "Como um beijo não dado", value: "cumplicidade" },
      { text: "Como pausa para sentir", value: "cumplicidade" },
      { text: "Como momento de presença real", value: "cumplicidade" }
    ]
  },
  {
    question: "116. Como seria o nosso pós-sexo ideal?",
    answers: [
      { text: "Dormir entrelaçados", value: "cumplicidade" },
      { text: "Tomar banho juntos", value: "cumplicidade" },
      { text: "Conversar nus", value: "cumplicidade" },
      { text: "Voltar a fazer amor", value: "cumplicidade" },
      { text: "Ficar em silêncio a sorrir", value: "cumplicidade" }
    ]
  },
  {
    question: "117. Qual destas frases representa o nosso laço?",
    answers: [
      { text: "Somos corpo e alma", value: "cumplicidade" },
      { text: "Somos liberdade e desejo", value: "cumplicidade" },
      { text: "Somos refúgio e fogo", value: "cumplicidade" },
      { text: "Somos verdade e tesão", value: "cumplicidade" },
      { text: "Somos tudo o que sentimos", value: "cumplicidade" }
    ]
  },
  {
    question: "118. Como te sentes quando me vês vulnerável?",
    answers: [
      { text: "Mais apaixonado(a)", value: "cumplicidade" },
      { text: "Com vontade de cuidar", value: "cumplicidade" },
      { text: "Com amor genuíno", value: "cumplicidade" },
      { text: "Com ligação ainda maior", value: "cumplicidade" },
      { text: "Mais próximo(a) que nunca", value: "cumplicidade" }
    ]
  },
  {
    question: "119. O que reforça o nosso laço diariamente?",
    answers: [
      { text: "Gestos sinceros", value: "cumplicidade" },
      { text: "Sexo que nos aproxima", value: "cumplicidade" },
      { text: "Conversas de alma", value: "cumplicidade" },
      { text: "Olhares cúmplices", value: "cumplicidade" },
      { text: "Presença emocional", value: "cumplicidade" }
    ]
  },
  {
    question: "120. Como imaginas a nossa relação no futuro?",
    answers: [
      { text: "Mais profunda emocionalmente", value: "cumplicidade" },
      { text: "Sempre com surpresa e paixão", value: "cumplicidade" },
      { text: "Com espaço e liberdade", value: "cumplicidade" },
      { text: "A crescer juntos", value: "cumplicidade" },
      { text: "Mais intensa sexualmente", value: "cumplicidade" }
    ]
  }

  if (currentQuestionIndex % 20 === 0) {
  const resumo = gerarResumoDaFase(faseAtual, respostasPorFase);
  document.getElementById("phase-summary-text").textContent = resumo;

  questionScreen.classList.add("hidden");
  document.getElementById("phase-summary").classList.remove("hidden");

  faseAtual++;
  respostasPorFase = [];
}

];
