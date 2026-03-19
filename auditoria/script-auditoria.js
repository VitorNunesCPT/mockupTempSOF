const screenSetup = document.querySelector("#screenSetup");
const screenAudit = document.querySelector("#screenAudit");

const modalitySelect = document.querySelector("#modalitySelect");
const yearSelect = document.querySelector("#yearSelect");
const monthSelect = document.querySelector("#monthSelect");
const fieldYear = document.querySelector("#fieldYear");
const fieldMonth = document.querySelector("#fieldMonth");
const progressModality = document.querySelector("#progressModality");
const progressYear = document.querySelector("#progressYear");
const progressMonth = document.querySelector("#progressMonth");
const summaryBox = document.querySelector("#summaryBox");
const totalMonth = document.querySelector("#totalMonth");
const totalAudit = document.querySelector("#totalAudit");
const calcReference = document.querySelector("#calcReference");
const startButton = document.querySelector("#startButton");

const backSetupButton = document.querySelector("#backSetupButton");
const auditContext = document.querySelector("#auditContext");
const teleCodeSelect = document.querySelector("#teleCodeSelect");
const loadTeleButton = document.querySelector("#loadTeleButton");
const auditFormSection = document.querySelector("#auditFormSection");
const ratingFields = document.querySelector("#ratingFields");
const observationInput = document.querySelector("#observationInput");
const saveNotesButton = document.querySelector("#saveNotesButton");
const clearNotesButton = document.querySelector("#clearNotesButton");
const feedbackMessage = document.querySelector("#feedbackMessage");

const fieldConfig = [
  { key: "profissaoSolicitante", label: "Profissao do solicitante", rateable: false },
  { key: "descricao", label: "Descricao", rateable: true },
  { key: "respostaDireta", label: "Resposta Direta", rateable: true },
  { key: "complemento", label: "Complemento", rateable: true },
  { key: "atributos", label: "Atributos", rateable: true },
  { key: "educacaoPermanente", label: "Educacao permanente", rateable: true },
  { key: "referencia", label: "Referencia", rateable: true },
];

const profissaoSamples = [
  "Enfermeiro",
  "Medico da APS",
  "Fisioterapeuta",
  "Psicologo",
  "Farmaceutico",
  "Nutricionista",
];

const descricaoSamples = [
  "Duvida sobre conduta em hipertensao com comorbidades.",
  "Solicitacao de apoio em saude mental na atencao primaria.",
  "Pergunta sobre ajuste de tratamento em doenca cronica.",
  "Orientacao para manejo clinico em sintomas respiratorios.",
  "Apoio para rastreamento e prevencao em saude da mulher.",
];

const respostaSamples = [
  "Realizar avaliacao de risco clinico e ajustar conduta conforme protocolo.",
  "Orientar sinais de alerta, plano de seguimento e retorno programado.",
  "Priorizar abordagem multiprofissional e reavaliacao em curto prazo.",
  "Definir criterios de encaminhamento conforme gravidade e contexto local.",
];

const complementoSamples = [
  "Registrar plano terapeutico e reforcar educacao em saude para o usuario.",
  "Avaliar adesao ao tratamento e monitorar indicadores clinicos.",
  "Articular cuidado com a rede conforme necessidade e risco identificado.",
];

const atributosSamples = [
  "APS; Adulto; Condicao cronica",
  "APS; Saude mental; Cuidado compartilhado",
  "APS; Respiratorio; Manejo inicial",
  "APS; Prevencao; Linha de cuidado",
];

const educacaoSamples = [
  "Sugerir material de educacao permanente sobre estratificacao de risco.",
  "Reforcar protocolo municipal de teleconsultoria e seguranca do paciente.",
  "Indicar trilha de aprendizado sobre condutas em APS.",
];

const referenciaSamples = [
  "Diretriz nacional vigente e protocolo local de teleconsultoria.",
  "Linha de cuidado da APS e caderno de atencao primaria.",
  "Guia clinico institucional para manejo multiprofissional.",
];

const modalityLabel = {
  assincrona: "Teleconsultoria assincrona",
  regulacao: "Teleconsultoria de Regulacao",
  teleinterconsulta: "Teleinterconsulta",
};

const monthLabel = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Marco",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

let selectedSummary = null;
let generatedTeleconsultorias = [];
let loadedTeleconsultoria = null;
const notesByCode = {};

const toPad = (value) => String(value).padStart(2, "0");

const randomFrom = (list, index) => list[index % list.length];

const initYears = () => {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 4; year -= 1) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  }
};

const updateProgressiveFilters = (trigger) => {
  if (trigger === "modality") {
    yearSelect.value = "";
    monthSelect.value = "";
  }

  const hasModality = Boolean(modalitySelect.value);
  fieldYear.classList.toggle("hidden", !hasModality);
  yearSelect.disabled = !hasModality;
  if (!hasModality) {
    yearSelect.value = "";
    monthSelect.value = "";
    monthSelect.disabled = true;
    fieldMonth.classList.add("hidden");
    renderSummary();
    return;
  }

  if (trigger === "year") {
    monthSelect.value = "";
  }

  const hasYear = Boolean(yearSelect.value);
  fieldMonth.classList.toggle("hidden", !hasYear);
  monthSelect.disabled = !hasYear;
  if (!hasYear) {
    monthSelect.value = "";
  }

  renderSummary();
};

const calculateMonthlyData = (modality, year, month) => {
  const modalityIndex = ["assincrona", "regulacao", "teleinterconsulta"].indexOf(modality) + 1;
  const yearNumber = Number(year);
  const monthNumber = Number(month);

  const realizadas = 90 + modalityIndex * 21 + (yearNumber % 10) * 4 + monthNumber * 3;
  const auditadas = Math.max(8, Math.round(realizadas * 0.1));

  return {
    realizadas,
    auditadas,
    referencia:
      "Calculo considerado: 10% do total de teleconsultorias realizadas no mes, com arredondamento para inteiro mais proximo.",
  };
};

const buildTeleconsultorias = (summary) => {
  const prefix = summary.modality === "assincrona" ? "TA" : summary.modality === "regulacao" ? "TR" : "TI";
  const list = [];
  for (let i = 1; i <= summary.auditadas; i += 1) {
    const code = `${prefix}-${summary.year}${toPad(summary.month)}-${String(i).padStart(3, "0")}`;
    list.push({
      code,
      profissaoSolicitante: randomFrom(profissaoSamples, i + 2),
      descricao: randomFrom(descricaoSamples, i + 3),
      respostaDireta: randomFrom(respostaSamples, i + 4),
      complemento: randomFrom(complementoSamples, i + 5),
      atributos: randomFrom(atributosSamples, i + 6),
      educacaoPermanente: randomFrom(educacaoSamples, i + 7),
      referencia: randomFrom(referenciaSamples, i + 8),
    });
  }
  return list;
};

const updateSelectionProgress = () => {
  const modality = modalitySelect.value;
  const year = yearSelect.value;
  const month = monthSelect.value;

  if (modality) {
    progressModality.querySelector("span").textContent = modalityLabel[modality];
    progressModality.classList.remove("hidden");
  } else {
    progressModality.classList.add("hidden");
  }

  if (year) {
    progressYear.querySelector("span").textContent = year;
    progressYear.classList.remove("hidden");
  } else {
    progressYear.classList.add("hidden");
  }

  if (month) {
    progressMonth.querySelector("span").textContent = monthLabel[month] || month;
    progressMonth.classList.remove("hidden");
  } else {
    progressMonth.classList.add("hidden");
  }
};

const renderSummary = () => {
  updateSelectionProgress();

  const modality = modalitySelect.value;
  const year = yearSelect.value;
  const month = monthSelect.value;
  if (!modality || !year || !month) {
    summaryBox.classList.add("hidden");
    startButton.disabled = true;
    selectedSummary = null;
    return;
  }

  const monthly = calculateMonthlyData(modality, year, month);
  selectedSummary = {
    modality,
    year,
    month,
    ...monthly,
  };

  totalMonth.textContent = String(monthly.realizadas);
  totalAudit.textContent = String(monthly.auditadas);
  calcReference.textContent = monthly.referencia;
  summaryBox.classList.remove("hidden");
  startButton.disabled = false;
};

const switchScreen = (target) => {
  screenSetup.classList.remove("active");
  screenAudit.classList.remove("active");
  if (target === "setup") {
    screenSetup.classList.add("active");
    return;
  }
  screenAudit.classList.add("active");
};

const loadCodes = () => {
  teleCodeSelect.innerHTML = '<option value="">Selecione um codigo</option>';
  generatedTeleconsultorias.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.code;
    option.textContent = item.code;
    teleCodeSelect.appendChild(option);
  });
};

const renderRatingFields = (teleconsultoria, existingNotes) => {
  ratingFields.innerHTML = fieldConfig
    .map((field) => {
      const currentValue = teleconsultoria[field.key] || "-";
      const scoreValue = existingNotes?.scores?.[field.key] ?? "";
      const options = Array.from({ length: 11 }, (_, value) => {
        const selected = String(scoreValue) === String(value) ? "selected" : "";
        return `<option value="${value}" ${selected}>${value}</option>`;
      }).join("");
      const scoreControl = field.rateable
        ? `
          <div class="score-row">
            <label for="score-${field.key}">Nota (0 a 10)</label>
            <select id="score-${field.key}" data-field-key="${field.key}">
              <option value="">Selecione</option>
              ${options}
            </select>
          </div>
        `
        : "";
      return `
        <article class="rating-card">
          <h3>${field.label}</h3>
          <p>${currentValue}</p>
          ${scoreControl}
        </article>
      `;
    })
    .join("");
};

const startAudit = () => {
  if (!selectedSummary) return;
  generatedTeleconsultorias = buildTeleconsultorias(selectedSummary);
  loadCodes();
  loadedTeleconsultoria = null;
  feedbackMessage.textContent = "";
  auditFormSection.classList.add("hidden");
  auditContext.textContent = `${modalityLabel[selectedSummary.modality]} | ${selectedSummary.year} | mes ${toPad(
    selectedSummary.month
  )} | amostra ${selectedSummary.auditadas}`;
  switchScreen("audit");
};

const loadTeleconsultoria = () => {
  const selectedCode = teleCodeSelect.value;
  if (!selectedCode) return;
  const found = generatedTeleconsultorias.find((item) => item.code === selectedCode);
  if (!found) return;

  loadedTeleconsultoria = found;
  const existingNotes = notesByCode[selectedCode];
  renderRatingFields(found, existingNotes);
  observationInput.value = existingNotes?.observation || "";
  feedbackMessage.textContent = "";
  auditFormSection.classList.remove("hidden");
};

const collectScores = () => {
  const scores = {};
  const scoreSelects = ratingFields.querySelectorAll("select[data-field-key]");

  for (const select of scoreSelects) {
    const value = select.value.trim();
    if (value === "") {
      return { valid: false, message: "Preencher todas as notas antes de cadastrar." };
    }
    const numeric = Number(value);
    if (Number.isNaN(numeric) || numeric < 0 || numeric > 10) {
      return { valid: false, message: "As notas devem estar entre 0 e 10." };
    }
    scores[select.dataset.fieldKey] = numeric;
  }

  return { valid: true, scores };
};

const saveNotes = () => {
  if (!loadedTeleconsultoria) return;
  const collected = collectScores();
  if (!collected.valid) {
    feedbackMessage.textContent = collected.message;
    return;
  }

  notesByCode[loadedTeleconsultoria.code] = {
    scores: collected.scores,
    observation: observationInput.value.trim(),
  };

  feedbackMessage.textContent = `Notas cadastradas para ${loadedTeleconsultoria.code}.`;
};

const clearNotes = () => {
  if (!loadedTeleconsultoria) return;
  ratingFields
    .querySelectorAll("select[data-field-key]")
    .forEach((select) => (select.value = ""));
  observationInput.value = "";
  delete notesByCode[loadedTeleconsultoria.code];
  feedbackMessage.textContent = "Notas atribuidas limpas.";
};

const bindEvents = () => {
  modalitySelect.addEventListener("change", () => updateProgressiveFilters("modality"));
  yearSelect.addEventListener("change", () => updateProgressiveFilters("year"));
  monthSelect.addEventListener("change", () => updateProgressiveFilters("month"));

  startButton.addEventListener("click", startAudit);
  backSetupButton.addEventListener("click", () => switchScreen("setup"));
  loadTeleButton.addEventListener("click", loadTeleconsultoria);
  saveNotesButton.addEventListener("click", saveNotes);
  clearNotesButton.addEventListener("click", clearNotes);
};

const init = () => {
  initYears();
  bindEvents();
  updateProgressiveFilters("modality");
};

init();
