
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

// Inserir este bloco no script.js

const questions = [
  {
    "question": "1. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "2. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "3. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "4. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "5. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "6. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "7. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "8. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "9. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "10. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "11. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "12. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "13. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "14. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "15. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "16. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "17. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "18. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "19. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "20. Qual é o gesto que mais representa amor para ti?",
    "answers": [
      {
        "text": "Um abraço inesperado",
        "value": "emocao"
      },
      {
        "text": "Uma mensagem carinhosa",
        "value": "emocao"
      },
      {
        "text": "A forma como me olhas",
        "value": "emocao"
      },
      {
        "text": "As palavras de apoio",
        "value": "emocao"
      },
      {
        "text": "O silêncio confortável",
        "value": "emocao"
      }
    ]
  },
  {
    "question": "21. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "22. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "23. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "24. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "25. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "26. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "27. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "28. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "29. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "30. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "31. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "32. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "33. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "34. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "35. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "36. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "37. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "38. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "39. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "40. Quando te sentes mais seguro(a) comigo?",
    "answers": [
      {
        "text": "Quando conversamos a sério",
        "value": "seguranca"
      },
      {
        "text": "Quando partilhamos segredos",
        "value": "seguranca"
      },
      {
        "text": "Quando me tocas com ternura",
        "value": "seguranca"
      },
      {
        "text": "Quando rimos juntos",
        "value": "seguranca"
      },
      {
        "text": "Quando respeitas o meu espaço",
        "value": "seguranca"
      }
    ]
  },
  {
    "question": "41. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "42. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "43. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "44. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "45. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "46. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "47. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "48. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "49. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "50. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "51. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "52. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "53. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "54. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "55. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "56. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "57. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "58. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "59. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "60. O que mais desperta o teu desejo?",
    "answers": [
      {
        "text": "Olhares provocantes",
        "value": "desejo"
      },
      {
        "text": "Toques suaves",
        "value": "desejo"
      },
      {
        "text": "Palavras ousadas",
        "value": "desejo"
      },
      {
        "text": "A antecipação",
        "value": "curiosidade"
      },
      {
        "text": "Um beijo lento",
        "value": "desejo"
      }
    ]
  },
  {
    "question": "61. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "62. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "63. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "64. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "65. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "66. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "67. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "68. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "69. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "70. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "71. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "72. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "73. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "74. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "75. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "76. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "77. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "78. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "79. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "80. Qual destas fantasias te intriga mais?",
    "answers": [
      {
        "text": "Sexo num local público",
        "value": "exploracao"
      },
      {
        "text": "Ser dominado(a)",
        "value": "submissao"
      },
      {
        "text": "Dominar com força",
        "value": "dominancia"
      },
      {
        "text": "Usar brinquedos",
        "value": "exploracao"
      },
      {
        "text": "Sexo às cegas",
        "value": "curiosidade"
      }
    ]
  },
  {
    "question": "81. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "82. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "83. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "84. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "85. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "86. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "87. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "88. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "89. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "90. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "91. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "92. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "93. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "94. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "95. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "96. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "97. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "98. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "99. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "100. Algo selvagem: como preferes?",
    "answers": [
      {
        "text": "Oral profundo e controlado",
        "value": "raw_pleasure"
      },
      {
        "text": "Penetração com domínio",
        "value": "raw_pleasure"
      },
      {
        "text": "Ser usado(a) com força",
        "value": "raw_pleasure"
      },
      {
        "text": "Explorado(a) por trás",
        "value": "raw_pleasure"
      },
      {
        "text": "Com ordens e palmadas",
        "value": "raw_pleasure"
      }
    ]
  },
  {
    "question": "101. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "102. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "103. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "104. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "105. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "106. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "107. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "108. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "109. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "110. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "111. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "112. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "113. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "114. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "115. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "116. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "117. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "118. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "119. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  },
  {
    "question": "120. Como imaginas a nossa relação no futuro?",
    "answers": [
      {
        "text": "Mais profunda emocionalmente",
        "value": "cumplicidade"
      },
      {
        "text": "Sempre com surpresa e paixão",
        "value": "cumplicidade"
      },
      {
        "text": "Com espaço e liberdade",
        "value": "cumplicidade"
      },
      {
        "text": "A crescer juntos",
        "value": "cumplicidade"
      },
      {
        "text": "Mais intensa sexualmente",
        "value": "cumplicidade"
      }
    ]
  }
];
