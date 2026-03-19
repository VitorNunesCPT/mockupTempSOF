const requests = [
  {
    id: 1,
    solId: "123456",
    descricao: "Condução em sintomas respiratórios na APS para paciente adulto com comorbidades.",
    dataResposta: "2026-03-10",
    teleconsultor: "Ana Souza",
    perguntaOriginal:
      "Paciente com tosse há 5 dias e dispneia leve. Quais critérios de acompanhamento e encaminhamento?",
    respostaDireta:
      "Realizar estratificação de risco clínico, orientar sinais de alarme e manter acompanhamento seriado.",
    complemento:
      "Reforçar avaliação de saturação, febre persistente e piora da dispneia para decisão de encaminhamento.",
    atributos: "Adulto, APS, Respiratório",
    educacaoPermanente:
      "Disponibilizar material de atualização sobre síndrome gripal e manejo inicial na atenção primária.",
    referencias: "Protocolo local de síndrome gripal e diretrizes nacionais vigentes.",
    tags: "respiratório, tosse, dispneia, aps",
    indicacaoSof: "Não",
    grauEvidencia: "1A",
    status: "resposta",
    dataSubmissao: "",
    dataPublicacao: "",
    url: "",
  },
  {
    id: 2,
    solId: "234567",
    descricao: "Ajuste terapêutico de hipertensão arterial em paciente com diabetes tipo 2.",
    dataResposta: "2026-03-11",
    teleconsultor: "Carlos Lima",
    perguntaOriginal:
      "Paciente com PA fora da meta apesar de uso regular de medicação. Como escalonar conduta?",
    respostaDireta:
      "Confirmar adesão, revisar técnica de aferição e considerar escalonamento medicamentoso conforme diretriz.",
    complemento: "Solicitar monitorização domiciliar e reavaliar em curto prazo para ajuste fino da conduta.",
    atributos: "Doença crônica, HAS, APS",
    educacaoPermanente: "Trilha de manejo da hipertensão e abordagem centrada no risco cardiovascular.",
    referencias: "Diretriz brasileira de hipertensão arterial.",
    tags: "hipertensão, diabetes, ajuste terapêutico",
    indicacaoSof: "Sim",
    grauEvidencia: "1B",
    status: "resposta",
    dataSubmissao: "",
    dataPublicacao: "",
    url: "",
  },
  {
    id: 3,
    solId: "345678",
    descricao: "Rastreamento e prevenção em saúde da mulher por faixa etária.",
    dataResposta: "2026-03-09",
    teleconsultor: "Marina Rocha",
    perguntaOriginal:
      "Quais exames de rastreamento devem ser priorizados por idade e fatores de risco?",
    respostaDireta:
      "Definir rastreamento por ciclo de vida e priorizar avaliação de risco individual para decisões compartilhadas.",
    complemento: "Registrar periodicidade de rastreios e critérios de encaminhamento especializado.",
    atributos: "Saúde da mulher, prevenção",
    educacaoPermanente: "Ciclo de educação permanente em prevenção e rastreamento oportunístico.",
    referencias: "Caderno de atenção primária e linha de cuidado.",
    tags: "rastreamento, mulher, prevenção",
    indicacaoSof: "Não",
    grauEvidencia: "2A",
    status: "submetido",
    dataSubmissao: "2026-03-12",
    dataPublicacao: "",
    url: "https://exemplo.com.br/sof/345678",
  },
  {
    id: 4,
    solId: "456789",
    descricao: "Conduta inicial para cefaleia recorrente sem sinais de alarme.",
    dataResposta: "2026-03-08",
    teleconsultor: "João Pereira",
    perguntaOriginal:
      "Quais critérios de investigação e manejo inicial para cefaleia de padrão estável na APS?",
    respostaDireta:
      "Avaliar red flags, orientar diário de cefaleia e instituir manejo farmacológico e não farmacológico.",
    complemento: "Indicar retorno com reavaliação evolutiva e critérios de encaminhamento definidos.",
    atributos: "Neurologia, APS",
    educacaoPermanente: "Sessão clínica sobre cefaleias primárias e sinais de gravidade.",
    referencias: "Manual de neurologia para atenção primária.",
    tags: "cefaleia, aps, neurologia",
    indicacaoSof: "Sim",
    grauEvidencia: "1A",
    status: "publicado",
    dataSubmissao: "2026-03-10",
    dataPublicacao: "2026-03-14",
    url: "https://exemplo.com.br/sof/456789",
  },
];

let selectedRequestId = null;
let activeHomeTab = "respondidas";

const homeScreen = document.querySelector("#homeScreen");
const detailScreen = document.querySelector("#detailScreen");
const tableTela1 = document.querySelector("#tableTela1");
const tableTela3 = document.querySelector("#tableTela3");
const tableCount = document.querySelector("#tableCount");

const detailSolId = document.querySelector("#detailSolId");
const statusBadge = document.querySelector("#statusBadge");
const metaId = document.querySelector("#metaId");
const metaSolId = document.querySelector("#metaSolId");
const metaDataResposta = document.querySelector("#metaDataResposta");
const metaDataSub = document.querySelector("#metaDataSub");
const metaDataPubli = document.querySelector("#metaDataPubli");
const metaTeleconsultor = document.querySelector("#metaTeleconsultor");
const metaDescricao = document.querySelector("#metaDescricao");
const metaUrl = document.querySelector("#metaUrl");
const perguntaOriginal = document.querySelector("#perguntaOriginal");
const respostaDireta = document.querySelector("#respostaDireta");
const complemento = document.querySelector("#complemento");
const atributos = document.querySelector("#atributos");
const educacaoPermanente = document.querySelector("#educacaoPermanente");
const referencias = document.querySelector("#referencias");
const tags = document.querySelector("#tags");
const indicacaoSof = document.querySelector("#indicacaoSof");
const grauEvidencia = document.querySelector("#grauEvidencia");
const submitButton = document.querySelector("#submitButton");
const publishButton = document.querySelector("#publishButton");
const backButton = document.querySelector("#backButton");

const overlay = document.querySelector("#overlay");
const submitModal = document.querySelector("#submitModal");
const publishModal = document.querySelector("#publishModal");

const toDash = (value) => (value && String(value).length ? value : "-");

const formatDate = (date) => {
  if (!date) return "-";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
};

const statusLabel = (status) => {
  if (status === "resposta") return "Aguarda Avaliação";
  if (status === "submetido") return "Submetido";
  return "Publicado";
};

const renderCount = () => {
  let count = 0;
  if (activeHomeTab === "respondidas") {
    count = requests.filter((item) => item.status === "resposta").length;
  }
  if (activeHomeTab === "sofs") {
    count = requests.filter(
      (item) => item.status === "submetido" || item.status === "publicado"
    ).length;
  }
  tableCount.textContent = `${count} registro(s)`;
};

const renderTables = () => {
  const tela1Rows = requests
    .filter((item) => item.status === "resposta")
    .map(
      (item) => `
      <tr data-id="${item.id}" data-source="respondidas">
        <td><a href="#" data-id="${item.id}">${item.id}</a></td>
        <td>${item.solId}</td>
        <td class="desc-cell">${item.descricao}</td>
        <td>${formatDate(item.dataResposta)}</td>
        <td>${item.teleconsultor}</td>
      </tr>
    `
    )
    .join("");

  const tela3Rows = requests
    .filter((item) => item.status === "submetido" || item.status === "publicado")
    .map(
      (item) => `
      <tr data-id="${item.id}" data-source="sofs">
        <td><a href="#" data-id="${item.id}">${item.id}</a></td>
        <td>${item.solId}</td>
        <td class="desc-cell">${item.descricao}</td>
        <td>${formatDate(item.dataSubmissao)}</td>
        <td>${formatDate(item.dataPublicacao)}</td>
        <td>${item.url ? `<a href="${item.url}" target="_blank" rel="noreferrer">${item.url}</a>` : "-"}</td>
        <td>${item.teleconsultor}</td>
      </tr>
    `
    )
    .join("");

  tableTela1.innerHTML =
    tela1Rows || `<tr><td colspan="5">Nenhuma solicitação respondida disponível.</td></tr>`;

  tableTela3.innerHTML =
    tela3Rows || `<tr><td colspan="7">Nenhuma solicitação submetida/publicada disponível.</td></tr>`;

  renderCount();
};

const openScreen = (target) => {
  homeScreen.classList.remove("active");
  detailScreen.classList.remove("active");
  if (target === "home") {
    homeScreen.classList.add("active");
    return;
  }
  detailScreen.classList.add("active");
};

const activateHomeTab = (tabName) => {
  activeHomeTab = tabName;
  document.querySelectorAll(".home-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.homeTab === tabName);
  });
  document.querySelectorAll(".home-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${tabName}`);
  });
  renderCount();
};

const populateDetail = (requestId, source) => {
  selectedRequestId = Number(requestId);
  if (source) activeHomeTab = source;
  const item = requests.find((req) => req.id === selectedRequestId);
  if (!item) return;

  detailSolId.textContent = item.solId;
  statusBadge.textContent = statusLabel(item.status);
  metaId.textContent = item.id;
  metaSolId.textContent = item.solId;
  metaDataResposta.textContent = formatDate(item.dataResposta);
  metaDataSub.textContent = formatDate(item.dataSubmissao);
  metaDataPubli.textContent = formatDate(item.dataPublicacao);
  metaTeleconsultor.textContent = item.teleconsultor;
  metaDescricao.textContent = item.descricao;
  metaUrl.innerHTML = item.url
    ? `<a href="${item.url}" target="_blank" rel="noreferrer">${item.url}</a>`
    : "-";
  perguntaOriginal.textContent = item.perguntaOriginal;
  respostaDireta.textContent = item.respostaDireta;
  complemento.textContent = item.complemento;
  atributos.textContent = item.atributos;
  educacaoPermanente.textContent = item.educacaoPermanente;
  referencias.textContent = item.referencias;
  tags.textContent = item.tags;
  indicacaoSof.textContent = item.indicacaoSof;
  grauEvidencia.textContent = item.grauEvidencia;

  submitButton.style.display = item.status === "resposta" ? "inline-flex" : "none";
  publishButton.style.display = item.status === "submetido" ? "inline-flex" : "none";

  openScreen("detail");
};

const showOverlay = () => {
  overlay.classList.remove("hidden");
};

const hideOverlay = () => {
  overlay.classList.add("hidden");
};

const openModal = (modal) => {
  showOverlay();
  modal.showModal();
};

const closeModal = (modal) => {
  if (modal.open) modal.close();
  hideOverlay();
};

const setupHomeTabs = () => {
  document.querySelectorAll(".home-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activateHomeTab(tab.dataset.homeTab);
    });
  });
};

const setupTableClick = () => {
  document.addEventListener("click", (event) => {
    const externalLink = event.target.closest("a[href]:not([data-id])");
    if (externalLink) return;

    const link = event.target.closest("a[data-id]");
    if (link) {
      event.preventDefault();
    }
    const row = event.target.closest("tr[data-id]");
    if (!row) return;
    populateDetail(row.dataset.id, row.dataset.source);
  });
};

const setupActions = () => {
  backButton.addEventListener("click", () => {
    openScreen("home");
    activateHomeTab(activeHomeTab);
  });

  document.querySelector("#refreshButton").addEventListener("click", () => {
    renderTables();
  });

  submitButton.addEventListener("click", () => {
    document.querySelector("#submissionDate").value = "";
    openModal(submitModal);
  });

  publishButton.addEventListener("click", () => {
    document.querySelector("#publishDate").value = "";
    document.querySelector("#responseDate").value = "";
    openModal(publishModal);
  });

  document.querySelector("#cancelSubmit").addEventListener("click", () => {
    closeModal(submitModal);
  });

  document.querySelector("#cancelPublish").addEventListener("click", () => {
    closeModal(publishModal);
  });

  document.querySelector("#confirmSubmit").addEventListener("click", () => {
    const submissionDate = document.querySelector("#submissionDate").value;
    if (!submissionDate || selectedRequestId === null) return;

    const item = requests.find((req) => req.id === selectedRequestId);
    if (!item) return;

    item.dataSubmissao = submissionDate;
    item.status = "submetido";
    item.url = item.url || `https://exemplo.com.br/sof/${item.solId}`;
    closeModal(submitModal);
    renderTables();
    activateHomeTab("sofs");
    openScreen("home");
  });

  document.querySelector("#confirmPublish").addEventListener("click", () => {
    const publishDate = document.querySelector("#publishDate").value;
    const responseDate = document.querySelector("#responseDate").value;
    if (!publishDate || !responseDate || selectedRequestId === null) return;

    const item = requests.find((req) => req.id === selectedRequestId);
    if (!item) return;

    item.dataPublicacao = publishDate;
    item.dataResposta = responseDate;
    item.status = "publicado";
    closeModal(publishModal);
    renderTables();
    populateDetail(item.id, "sofs");
  });

  overlay.addEventListener("click", () => {
    closeModal(submitModal);
    closeModal(publishModal);
  });

  [submitModal, publishModal].forEach((modal) => {
    modal.addEventListener("close", hideOverlay);
    modal.addEventListener("cancel", hideOverlay);
  });
};

const init = () => {
  renderTables();
  setupHomeTabs();
  setupTableClick();
  setupActions();
  activateHomeTab("respondidas");
};

init();
