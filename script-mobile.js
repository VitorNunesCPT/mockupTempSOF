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
    url: "",
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
const evaluationScreen = document.querySelector("#evaluationScreen");
const tableTela1 = document.querySelector("#tableTela1");
const tableTela3 = document.querySelector("#tableTela3");
const listTela1 = document.querySelector("#listTela1");
const listTela3 = document.querySelector("#listTela3");
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
const defaultDetailFields = document.querySelector("#defaultDetailFields");
const sofsDetailFields = document.querySelector("#sofsDetailFields");
const perguntaOriginal = document.querySelector("#perguntaOriginal");
const respostaDireta = document.querySelector("#respostaDireta");
const complemento = document.querySelector("#complemento");
const atributos = document.querySelector("#atributos");
const educacaoPermanente = document.querySelector("#educacaoPermanente");
const referencias = document.querySelector("#referencias");
const tags = document.querySelector("#tags");
const indicacaoSof = document.querySelector("#indicacaoSof");
const grauEvidencia = document.querySelector("#grauEvidencia");
const sofsResposta = document.querySelector("#sofsResposta");
const sofsReferencia = document.querySelector("#sofsReferencia");
const sofsDescMesh = document.querySelector("#sofsDescMesh");
const sofsCategoriaEvidencia = document.querySelector("#sofsCategoriaEvidencia");
const submitButton = document.querySelector("#submitButton");
const publishButton = document.querySelector("#publishButton");
const backButton = document.querySelector("#backButton");
const evaluationBackButton = document.querySelector("#evaluationBackButton");
const evaluationSolId = document.querySelector("#evaluationSolId");
const evaluationFields = document.querySelector("#evaluationFields");
const openSubmitDateButton = document.querySelector("#openSubmitDateButton");

const overlay = document.querySelector("#overlay");
const submitModal = document.querySelector("#submitModal");
const publishModal = document.querySelector("#publishModal");

const evaluationFieldDefinitions = [
  {
    key: "descricao",
    label: "Descrição",
    get: (item) => item.descricao || "-",
    set: (item, value) => {
      item.descricao = value;
    },
  },
  {
    key: "resposta",
    label: "Resposta",
    get: (item) => item.respostaDireta || "-",
    set: (item, value) => {
      item.respostaDireta = value;
    },
  },
  {
    key: "referencia",
    label: "Referência",
    get: (item) => item.referencias || "-",
    set: (item, value) => {
      item.referencias = value;
    },
  },
  {
    key: "descMesh",
    label: "DESC/MESH",
    get: (item) => item.descMesh || item.tags || "-",
    set: (item, value) => {
      item.descMesh = value;
      item.tags = value;
    },
  },
  {
    key: "categoriaEvidencia",
    label: "Categoria/Evidencia",
    get: (item) => item.categoriaEvidencia || `${item.atributos || "-"} / ${item.grauEvidencia || "-"}`,
    set: (item, value) => {
      item.categoriaEvidencia = value;
    },
  },
  {
    key: "teleconsultor",
    label: "Profissional Teleconsultor",
    get: (item) => item.teleconsultor || "-",
    set: (item, value) => {
      item.teleconsultor = value;
    },
  },
  {
    key: "criadoEm",
    label: "Criado em",
    get: (item) => item.criadoEm || formatDate(item.dataResposta),
    set: (item, value) => {
      item.criadoEm = value;
    },
  },
];

const formatDate = (date) => {
  if (!date) return "-";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}/${month}/${year}`;
};

const statusLabel = (status) => {
  if (status === "resposta") return "Indicada";
  if (status === "submetido") return "Submetido";
  return "Publicado";
};

const getDescMesh = (item) => item.descMesh || item.tags || "-";

const getCategoriaEvidencia = (item) => {
  if (item.categoriaEvidencia) return item.categoriaEvidencia;
  const categoria = item.atributos || "-";
  const evidencia = item.grauEvidencia || "-";
  return `${categoria} / ${evidencia}`;
};

const setCount = () => {
  let count = 0;
  if (activeHomeTab === "respondidas") {
    count = requests.filter((item) => item.status === "resposta").length;
  }
  if (activeHomeTab === "sofs") {
    count = requests.filter((item) => item.status === "submetido" || item.status === "publicado").length;
  }
  tableCount.textContent = `${count} registro(s)`;
};

const respondidas = () => requests.filter((item) => item.status === "resposta");
const sofs = () => requests.filter((item) => item.status === "submetido" || item.status === "publicado");

const renderRespondidas = () => {
  const items = respondidas();

  tableTela1.innerHTML = items
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

  listTela1.innerHTML = items
    .map(
      (item) => `
      <article class="mobile-card" data-id="${item.id}" data-source="respondidas">
        <h4 class="mobile-card-title">${item.descricao}</h4>
        <div class="mobile-card-meta">
          <span><strong>ID:</strong> ${item.id}</span>
          <span><strong>Sol. ID:</strong> ${item.solId}</span>
          <span><strong>Resposta:</strong> ${formatDate(item.dataResposta)}</span>
          <span><strong>Teleconsultor:</strong> ${item.teleconsultor}</span>
        </div>
      </article>
    `
    )
    .join("");

  if (!items.length) {
    tableTela1.innerHTML = '<tr><td colspan="5">Nenhuma solicitação respondida disponível.</td></tr>';
    listTela1.innerHTML = '<p class="empty-state">Nenhuma solicitação respondida disponível.</p>';
  }
};

const renderSofs = () => {
  const items = sofs();

  tableTela3.innerHTML = items
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

  listTela3.innerHTML = items
    .map(
      (item) => `
      <article class="mobile-card" data-id="${item.id}" data-source="sofs">
        <h4 class="mobile-card-title">${item.descricao}</h4>
        <div class="mobile-card-meta">
          <span><strong>ID:</strong> ${item.id}</span>
          <span><strong>Sol. ID:</strong> ${item.solId}</span>
          <span><strong>Submissão:</strong> ${formatDate(item.dataSubmissao)}</span>
          <span><strong>Publicação:</strong> ${formatDate(item.dataPublicacao)}</span>
          <span><strong>Teleconsultor:</strong> ${item.teleconsultor}</span>
        </div>
      </article>
    `
    )
    .join("");

  if (!items.length) {
    tableTela3.innerHTML = '<tr><td colspan="7">Nenhuma solicitação submetida/publicada disponível.</td></tr>';
    listTela3.innerHTML = '<p class="empty-state">Nenhuma solicitação submetida/publicada disponível.</p>';
  }
};

const renderAll = () => {
  renderRespondidas();
  renderSofs();
  setCount();
};

const activateHomeTab = (tabName) => {
  activeHomeTab = tabName;
  document.querySelectorAll(".home-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.homeTab === tabName);
  });
  document.querySelectorAll(".home-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `panel-${tabName}`);
  });
  setCount();
};

const openScreen = (name) => {
  homeScreen.classList.remove("active");
  detailScreen.classList.remove("active");
  evaluationScreen.classList.remove("active");
  if (name === "home") {
    homeScreen.classList.add("active");
    return;
  }
  if (name === "evaluation") {
    evaluationScreen.classList.add("active");
    return;
  }
  detailScreen.classList.add("active");
};

const getSelectedItem = () => {
  if (selectedRequestId === null) return null;
  return requests.find((req) => req.id === selectedRequestId) || null;
};

const renderEvaluationFields = (item) => {
  evaluationFields.innerHTML = evaluationFieldDefinitions
    .map((field) => {
      const value = field.get(item);
      return `
      <article class="evaluation-item">
        <div class="evaluation-item-head">
          <h3>${field.label}</h3>
          <button class="btn btn-outline edit-field-btn" data-field-key="${field.key}" type="button">Editar</button>
        </div>
        <p class="evaluation-value">${value}</p>
      </article>
    `;
    })
    .join("");
};

const openEvaluation = () => {
  const item = getSelectedItem();
  if (!item) return;
  evaluationSolId.textContent = item.solId;
  renderEvaluationFields(item);
  openScreen("evaluation");
};

const editEvaluationField = (fieldKey) => {
  const item = getSelectedItem();
  if (!item) return;
  const field = evaluationFieldDefinitions.find((def) => def.key === fieldKey);
  if (!field) return;

  const currentValue = field.get(item);
  const newValue = window.prompt(`Editar campo: ${field.label}`, currentValue);
  if (newValue === null) return;

  field.set(item, newValue.trim());
  renderEvaluationFields(item);
  renderAll();
};

const fillDetail = (id, source) => {
  selectedRequestId = Number(id);
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

  const isSofDetail = item.status === "submetido" || item.status === "publicado";
  defaultDetailFields.style.display = isSofDetail ? "none" : "block";
  sofsDetailFields.classList.toggle("active", isSofDetail);
  if (isSofDetail) {
    sofsResposta.textContent = item.respostaDireta || "-";
    sofsReferencia.textContent = item.referencias || "-";
    sofsDescMesh.textContent = getDescMesh(item);
    sofsCategoriaEvidencia.textContent = getCategoriaEvidencia(item);
  }

  submitButton.style.display = item.status === "resposta" ? "block" : "none";
  publishButton.style.display = item.status === "submetido" ? "block" : "none";

  openScreen("detail");
};

const showOverlay = () => overlay.classList.remove("hidden");
const hideOverlay = () => overlay.classList.add("hidden");

const openModal = (modal) => {
  showOverlay();
  modal.showModal();
};

const closeModal = (modal) => {
  if (modal.open) modal.close();
  hideOverlay();
};

const setupEvents = () => {
  document.querySelectorAll(".home-tab").forEach((tab) => {
    tab.addEventListener("click", () => activateHomeTab(tab.dataset.homeTab));
  });

  document.addEventListener("click", (event) => {
    const editButton = event.target.closest(".edit-field-btn");
    if (editButton) {
      editEvaluationField(editButton.dataset.fieldKey);
      return;
    }

    const externalLink = event.target.closest("a[href]:not([data-id])");
    if (externalLink) return;

    const idLink = event.target.closest("a[data-id]");
    if (idLink) event.preventDefault();

    const row = event.target.closest("tr[data-id]");
    if (row) {
      fillDetail(row.dataset.id, row.dataset.source);
      return;
    }

    const card = event.target.closest(".mobile-card[data-id]");
    if (card) {
      fillDetail(card.dataset.id, card.dataset.source);
    }
  });

  document.querySelector("#refreshButton").addEventListener("click", renderAll);

  backButton.addEventListener("click", () => {
    openScreen("home");
    activateHomeTab(activeHomeTab);
  });

  evaluationBackButton.addEventListener("click", () => {
    const item = getSelectedItem();
    if (!item) return;
    fillDetail(item.id, "respondidas");
  });

  submitButton.addEventListener("click", () => {
    openEvaluation();
  });

  publishButton.addEventListener("click", () => {
    document.querySelector("#publishDate").value = "";
    document.querySelector("#responseDate").value = "";
    openModal(publishModal);
  });

  openSubmitDateButton.addEventListener("click", () => {
    document.querySelector("#submissionDate").value = "";
    openModal(submitModal);
  });

  document.querySelector("#cancelSubmit").addEventListener("click", () => closeModal(submitModal));
  document.querySelector("#cancelPublish").addEventListener("click", () => closeModal(publishModal));

  document.querySelector("#confirmSubmit").addEventListener("click", () => {
    const date = document.querySelector("#submissionDate").value;
    if (!date || selectedRequestId === null) return;

    const item = requests.find((req) => req.id === selectedRequestId);
    if (!item) return;

    item.dataSubmissao = date;
    item.status = "submetido";
    item.url = item.url || `https://exemplo.com.br/sof/${item.solId}`;

    closeModal(submitModal);
    renderAll();
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
    renderAll();
    fillDetail(item.id, "sofs");
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
  renderAll();
  setupEvents();
  activateHomeTab("respondidas");
};

init();
