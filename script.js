const metricsContainer = document.querySelector("#metrics-container");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderOutputs(outputs) {
  if (!Array.isArray(outputs) || outputs.length === 0) return "-";
  return outputs.map((output) => {
    const label = escapeHtml(output.label);
    const url = escapeHtml(output.url);
    if (output.example) {
      return `<a class="output-example-link" href="${url}" target="_blank" rel="noopener noreferrer">${label}<small>(예시)</small></a>`;
    }
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }).join(" · ");
}

function renderMetrics(stages) {
  metricsContainer.innerHTML = stages.map((stage) => `
    <section class="metric-stage" aria-labelledby="stage-${escapeHtml(stage.id)}-title">
      <div class="metric-stage-header">
        <h3 id="stage-${escapeHtml(stage.id)}-title">${escapeHtml(stage.name)}</h3>
        <p>${escapeHtml(stage.years)}</p>
      </div>
      <div class="table-wrap" tabindex="0" role="region" aria-label="${escapeHtml(stage.name)} 성과지표 표">
        <table class="metrics-table">
          <thead><tr><th scope="col">성과지표</th><th scope="col">평가 지표</th><th scope="col">목표 수치</th><th scope="col">담당 연구진</th><th scope="col">현재 상태</th><th scope="col">공개 결과물</th></tr></thead>
          <tbody>
            ${stage.metrics.map((metric) => `
              <tr>
                <td class="metric-name">${escapeHtml(metric.name)}</td>
                <td>${escapeHtml(metric.evaluation)}</td>
                <td class="target">${escapeHtml(metric.target)}</td>
                <td>${escapeHtml(metric.owners)}</td>
                <td><span class="status status-tbd">${escapeHtml(metric.status)}</span></td>
                <td class="output-cell">${renderOutputs(metric.outputs)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>`).join("");

  const hashTarget = window.location.hash && document.querySelector(window.location.hash);
  if (hashTarget) {
    requestAnimationFrame(() => {
      window.setTimeout(() => hashTarget.scrollIntoView(), 100);
    });
  }
}

async function loadMetrics() {
  try {
    const response = await fetch("data/metrics.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderMetrics(data.stages);
  } catch (error) {
    metricsContainer.innerHTML = `<p class="notice">성과지표 데이터를 불러오지 못했습니다. 로컬에서는 웹 서버를 실행해 확인해 주세요.</p>`;
    console.error("Metrics loading failed:", error);
  }
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
siteNav.addEventListener("click", () => {
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
loadMetrics();
