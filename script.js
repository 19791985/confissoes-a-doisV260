
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

// Gerar perguntas exemplo
const questions = Array.from({ length: 120 }, (_, i) => ({
  question: `Pergunta ${i + 1}`,
  answers: [
    { text: "Opção 1", value: "emocao" },
    { text: "Opção 2", value: "desejo" },
    { text: "Opção 3", value: "submissao" },
    { text: "Opção 4", value: "dominancia" },
    { text: "Opção 5", value: "exploracao" }
  ]
}));
