"use strict";

(() => {
  const lessons = CURRICULUM.lessons;
  const coreLessons = lessons.filter(lesson => !lesson.reference);
  const referenceLessons = lessons.filter(lesson => lesson.reference);
  const number = id => byId.get(id).reference ? "참고" : String(coreLessons.findIndex(lesson => lesson.id === id) + 1).padStart(2, "0");
  const byId = new Map(lessons.map(lesson => [lesson.id, lesson]));
  const storageKey = "ai-game-roadmap.v1.progress";
  const main = document.getElementById("main");
  const screenLabel = document.getElementById("screen-label");
  const isDevelopment = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  let completed = new Set();
  let canStore = true;
  let resizeObserver;
  let frame;

  function readProgress() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
      completed = new Set(Array.isArray(stored) ? stored.filter(id => byId.has(id)) : []);
    } catch {
      completed = new Set();
      canStore = false;
    }
  }
  readProgress();

  const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const link = id => `#/lesson/${id}`;
  const stage = id => CURRICULUM.stages.find(item => item.id === id);
  const ready = lesson => lesson.prerequisites.every(id => completed.has(id));
  const storageMessage = () => canStore ? "읽음 표시는 이 브라우저에만 저장됩니다. 기기 간 동기화는 하지 않습니다." : "브라우저 저장을 사용할 수 없어 읽음 표시는 현재 화면에서만 유지됩니다.";

  function ancestors(id, found = new Set()) {
    for (const prerequisite of byId.get(id).prerequisites) {
      if (!found.has(prerequisite)) {
        found.add(prerequisite);
        ancestors(prerequisite, found);
      }
    }
    return lessons.filter(lesson => found.has(lesson.id));
  }

  function chip(id) {
    const lesson = byId.get(id);
    return `<a href="${link(id)}">${completed.has(id) ? "✓ " : ""}${number(id)} ${escape(lesson.title)}</a>`;
  }

  function renderMap() {
    const completedCore = coreLessons.filter(lesson => completed.has(lesson.id)).length;
    const next = coreLessons.find(lesson => !completed.has(lesson.id) && ready(lesson)) || coreLessons.find(lesson => !completed.has(lesson.id));
    document.title = "게임 개발의 첫 지도 · 과정 1";
    screenLabel.textContent = "학습 지도 — 선행 지식을 따라 주제를 선택하는 화면";
    main.innerHTML = `
      <section class="hero" aria-labelledby="map-title">
        <div><p class="eyebrow">COURSE 01 / 게임 개발 공통 지식</p><h1 id="map-title">만들기 전에,<br><em>이해할 순서부터.</em></h1><p class="lead">어떤 질문을 해야 할지 막막할 때 펼치는 첫 지도.<br>필요한 지식부터 연결해, AI와 게임의 구조를 이야기합니다.</p><div class="tags"><span class="tag">14개 주제 + 별도 참고</span><span class="tag">설치 없이 읽는 과정</span><span class="tag">Unity · 웹 공통</span></div></div>
        <aside class="progress-card" aria-label="학습 기록"><h2>나의 학습 기록</h2><div class="progress-count">${completedCore} <span>/ ${coreLessons.length} 읽음</span></div><progress value="${completedCore}" max="${coreLessons.length}" aria-label="읽은 주제 수"></progress><p>${storageMessage()}</p><a class="primary" href="${next ? link(next.id) : link("01")}">${next ? (completedCore ? `${number(next.id)} 이어서 살펴보기` : "01 첫 주제 읽기") : "처음부터 다시 살펴보기"}<span aria-hidden="true">→</span></a></aside>
      </section>
      <div class="intro-strip"><span><strong>항목을 누르면 설명이 열립니다.</strong> 연결선은 권장 선행 지식을 나타냅니다.</span><div class="legend"><span><i class="dot"></i>미읽음</span><span><i class="dot done"></i>읽음</span></div></div>
      <div class="learning-layout"><section class="roadmap-wrap" aria-label="선행 지식으로 연결한 학습 지도"><div class="roadmap" id="roadmap"><svg class="connections" aria-hidden="true"></svg>${coreLessons.map(lesson => `<a href="${link(lesson.id)}" class="node ${completed.has(lesson.id) ? "done" : ""}" data-id="${lesson.id}" data-stage="${lesson.stage}" style="grid-row:${lesson.row};grid-column:${(lesson.col - 1) * 2 + 1} / span 2" aria-label="${number(lesson.id)} ${escape(lesson.title)}${completed.has(lesson.id) ? ", 읽음" : ""}"><div class="node-top"><span class="node-number">${number(lesson.id)}</span><span class="${completed.has(lesson.id) ? "tick" : ""}">${completed.has(lesson.id) ? "✓ 읽음" : escape(stage(lesson.stage).title)}</span></div><h3>${escape(lesson.title)}</h3><p>${escape(lesson.subtitle)}</p><p class="prereq-mini">${lesson.prerequisites.length ? `먼저 읽기 ${lesson.prerequisites.map(number).join(" · ")}` : "여기서 시작하세요"}</p></a>`).join("")}</div></section>
      <aside class="map-sidebar"><div class="sticky-guide"><h2>이렇게 이어집니다</h2><ol class="stage-key">${CURRICULUM.stages.map(item => `<li><span class="stage-bullet s${item.id}" aria-hidden="true"></span><strong>${item.title}</strong><small>${item.description}</small></li>`).join("")}</ol><div class="side-note note"><p><strong>순서는 안내이고, 잠금은 아닙니다.</strong></p><p>처음이라면 01부터 시작하세요. 이미 아는 내용은 건너뛰어도 좋습니다.</p><p>뒤쪽 개념이 낯설면 해당 주제의 ‘먼저 읽기’ 링크로 돌아오세요.</p></div></div></aside></div>
      <section class="map-bottom"><h2>코드를 외우기보다, 선택의 이유를 이해합니다.</h2><p>각 주제에는 세부 목차, 핵심 개념, 게임 사례, AI에게 할 질문과 이해 확인이 있습니다.</p></section>
      <section class="reference-section" aria-labelledby="reference-heading"><p class="eyebrow">별도 참고</p><h2 id="reference-heading">필요할 때 꺼내 읽는 개발 지식</h2><p>학습 순서와 별개로, 실제 작업을 관리할 때 참고하세요. 본 과정의 진도에는 포함하지 않습니다.</p><div class="reference-cards">${referenceLessons.map(item => `<a class="reference-card" href="${link(item.id)}"><span class="reference-label">${completed.has(item.id) ? "✓ 읽음 · 참고" : "참고"}</span><strong>${escape(item.title)}</strong><span>변경을 기록하고, 비교하고, 되돌리는 방법</span><span class="reference-action">참고 내용 읽기 →</span></a>`).join("")}</div></section>`;

    const roadmap = document.getElementById("roadmap");
    for (const node of roadmap.querySelectorAll(".node")) {
      node.addEventListener("mouseenter", () => highlight(node.dataset.id));
      node.addEventListener("mouseleave", () => highlight(null));
      node.addEventListener("focus", () => highlight(node.dataset.id));
      node.addEventListener("blur", () => highlight(null));
    }
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(scheduleLines);
      resizeObserver.observe(roadmap);
    }
    scheduleLines();
  }

  function scheduleLines() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(drawLines);
  }

  function drawLines() {
    const roadmap = document.getElementById("roadmap");
    if (!roadmap) return;
    const svg = roadmap.querySelector("svg");
    const root = roadmap.getBoundingClientRect();
    const mobile = matchMedia("(max-width: 700px)").matches;
    svg.setAttribute("viewBox", `0 0 ${root.width} ${root.height}`);
    svg.innerHTML = `<defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="#8d9f8f"/></marker></defs>`;
    for (const lesson of coreLessons) {
      const target = roadmap.querySelector(`[data-id="${lesson.id}"]`).getBoundingClientRect();
      lesson.prerequisites.forEach((id, index) => {
        const source = roadmap.querySelector(`[data-id="${id}"]`).getBoundingClientRect();
        let pathData;
        if (mobile) {
          const x = 3 + index * 5;
          const sy = source.bottom - root.top - 20;
          const ty = target.top - root.top + 25 + index * 7;
          pathData = `M ${source.left - root.left} ${sy} H ${x} V ${ty} H ${target.left - root.left - 2}`;
        } else if (lesson.routes?.[id] === "outer-right") {
          // This branch leaves and enters at the sides, without sharing the downward trunk.
          const sx = source.right - root.left;
          const sy = source.top - root.top + source.height / 2;
          const tx = target.right - root.left + 3;
          const ty = target.top - root.top + target.height / 2;
          const lane = root.width + 12;
          pathData = `M ${sx} ${sy} H ${lane} V ${ty} H ${tx}`;
        } else {
          const sourceLesson = byId.get(id);
          const bottomTargets = coreLessons.filter(item => item.prerequisites.includes(id) && !item.routes?.[id]).sort((a, b) => a.col - b.col);
          const exitFraction = sourceLesson.splitBottom ? (bottomTargets.indexOf(lesson) + 1) / (bottomTargets.length + 1) : 0.5;
          const sx = source.left - root.left + source.width * exitFraction;
          const sy = source.bottom - root.top;
          const topEntries = lesson.prerequisites.filter(prerequisite => !lesson.routes?.[prerequisite]).sort((a, b) => byId.get(a).col - byId.get(b).col);
          const topIndex = topEntries.indexOf(id);
          const tx = target.left - root.left + target.width / 2 + (topEntries.length > 1 ? (topIndex ? 12 : -12) : 0);
          const ty = target.top - root.top - 3;
          const sameColumnClear = sourceLesson.col === lesson.col && !coreLessons.some(item => item.col === lesson.col && item.row > sourceLesson.row && item.row < lesson.row);
          if (lesson.row - sourceLesson.row > 1 && !sameColumnClear) {
            // Long dependencies go outside the cards, so a hidden line cannot imply a wrong prerequisite.
            const lane = sourceLesson.col === 1 ? -12 - index * 5 : root.width + 12 + index * 5;
            pathData = `M ${sx} ${sy} V ${sy + 20} H ${lane} V ${ty - 21} H ${tx} V ${ty}`;
          } else {
            const middle = sy + (ty - sy) / 2;
            pathData = sx === tx ? `M ${sx} ${sy} V ${ty}` : `M ${sx} ${sy} V ${middle} H ${tx} V ${ty}`;
          }
        }
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("class", "connection");
        path.setAttribute("marker-end", "url(#arrow)");
        path.dataset.from = id;
        path.dataset.to = lesson.id;
        svg.append(path);
      });
    }
    const focused = document.activeElement.closest?.(".node");
    if (focused) highlight(focused.dataset.id);
  }

  function highlight(id) {
    const chain = id ? new Set([id, ...ancestors(id).map(item => item.id)]) : new Set();
    document.querySelectorAll(".connection").forEach(path => path.classList.toggle("active", chain.has(path.dataset.from) && chain.has(path.dataset.to)));
  }

  function renderLesson(lesson) {
    const earlier = ancestors(lesson.id);
    const directNext = coreLessons.filter(item => item.prerequisites.includes(lesson.id));
    const isLast = lesson.id === coreLessons[coreLessons.length - 1].id;
    document.title = `${number(lesson.id)} ${lesson.title} · 게임 개발의 첫 지도`;
    screenLabel.textContent = `주제 안내 ${number(lesson.id)} — ${lesson.title}`;
    main.innerHTML = `<div class="lesson-layout"><aside class="lesson-sidebar"><div class="sticky-guide"><a class="back-link" href="#/">← 전체 학습 지도로</a><nav aria-label="전체 주제"><ol class="chapter-list">${coreLessons.map(item => `<li><a href="${link(item.id)}" ${item.id === lesson.id ? 'aria-current="page"' : ""}><span class="num">${number(item.id)}</span><span>${escape(item.title)}${completed.has(item.id) ? " ✓" : ""}</span></a></li>`).join("")}</ol><div class="reference-nav"><p>별도 참고</p>${referenceLessons.map(item => `<a href="${link(item.id)}" ${item.id === lesson.id ? 'aria-current="page"' : ""}>${escape(item.title)}${completed.has(item.id) ? " ✓" : ""}</a>`).join("")}</div></nav></div></aside>
      <article class="lesson"><header class="lesson-header"><p class="eyebrow">${lesson.reference ? "별도 참고 / 개발 작업 관리" : `COURSE 01 / ${escape(stage(lesson.stage).title)} / ${number(lesson.id)}`}</p><h1>${escape(lesson.title)}</h1><p class="lead">${escape(lesson.description)}</p></header>
      <section class="prerequisites" aria-labelledby="prereq-heading"><h2 id="prereq-heading">${lesson.prerequisites.length ? "먼저 읽으면 이해하기 쉬워요" : "이 주제부터 시작하세요"}</h2><p>${lesson.prerequisites.length ? "연결된 개념이 낯설다면 먼저 읽고 돌아오세요. 읽음 여부와 관계없이 모든 주제를 열 수 있습니다." : "개발 경험이나 프로그램 설치가 필요하지 않습니다. 먼저 사람과 AI의 역할을 살펴봅니다."}</p><div class="chip-links">${lesson.prerequisites.map(chip).join("")}</div>${earlier.length > lesson.prerequisites.length ? `<details style="margin-top:12px"><summary>여기까지 오는 전체 선행 경로 (${earlier.length}개)</summary><div class="chip-links">${earlier.map(item => chip(item.id)).join("")}</div></details>` : ""}</section>
      <section class="lesson-section"><span class="section-no">01 / 배울 내용</span><h2>이 주제의 세부 목차</h2><ul class="topic-list">${lesson.topics.map(topic => `<li>${escape(topic)}</li>`).join("")}</ul></section>
      <section class="lesson-section"><span class="section-no">02 / 핵심 개념</span><h2>먼저 이해할 것</h2>${lesson.concepts.map(([title, body]) => `<div class="concept"><h3>${escape(title)}</h3><p>${escape(body)}</p></div>`).join("")}</section>
      <section class="lesson-section scenario"><span class="section-no">03 / 게임 속 상황</span><h2>이럴 때 필요합니다</h2><p>${escape(lesson.scenario)}</p></section>
      <section class="lesson-section prompt"><span class="section-no">04 / AI와 대화하기</span><h2>이렇게 요청해 보세요</h2><p>${escape(lesson.prompt)}</p></section>
      <section class="lesson-section question"><span class="section-no">05 / 이해 확인</span><h2>잠깐 생각해 보기</h2><p>${escape(lesson.question)}</p><details id="answer"><summary>해설 확인하기</summary><p class="answer">${escape(lesson.answer)}</p></details></section>
      <section class="lesson-section outcome"><h2>이해했다면 설명할 수 있어요</h2><p>${escape(lesson.outcome)}</p></section>
      <div class="completion-row"><button type="button" class="primary completion-toggle" aria-pressed="${completed.has(lesson.id)}">${completed.has(lesson.id) ? "✓ 읽음 표시 취소" : "이 주제를 읽음으로 표시"}</button><p>${storageMessage()}</p></div>
      <section class="next-links"><h2>${lesson.reference ? "학습 지도로 돌아가기" : "다음으로 연결되는 주제"}</h2><p>${directNext.length ? "아래 주제에서는 지금 배운 개념을 사용합니다. 다른 선행 지식도 함께 확인해 보세요." : (lesson.reference ? "이 내용은 주 학습 흐름과 별개인 참고 자료입니다. 필요한 때 다시 찾아보세요." : "학습 지도에서 아직 낯선 주제를 다시 살펴보세요.")}</p><div class="chip-links">${directNext.map(item => chip(item.id)).join("")}<a href="#/">전체 학습 지도로 돌아가기 →</a></div></section>
      ${isLast ? `<section class="course-followup"><h2>과정 1을 모두 살펴보았다면</h2><p>과정 2에서는 지금 배운 지식에 이어지는 추가 내용을 다룹니다. 현재 준비 중입니다.</p></section>` : ""}
      ${lesson.sources ? `<aside class="sources"><p>더 읽기 · 공식 자료</p><ul>${lesson.sources.map(([title, url]) => `<li><a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(title)} ↗</a></li>`).join("")}</ul></aside>` : ""}
      </article></div>`;
    main.querySelector(".completion-toggle").addEventListener("click", () => {
      if (completed.has(lesson.id)) completed.delete(lesson.id);
      else completed.add(lesson.id);
      try { localStorage.setItem(storageKey, JSON.stringify([...completed])); }
      catch { canStore = false; }
      const answerOpen = main.querySelector("#answer").open;
      const y = window.scrollY;
      renderLesson(lesson);
      main.querySelector("#answer").open = answerOpen;
      main.querySelector(".completion-toggle").focus({ preventScroll: true });
      window.scrollTo(0, y);
      document.getElementById("announcement").textContent = completed.has(lesson.id) ? `${lesson.title}, 읽음으로 표시했습니다.` : `${lesson.title}, 읽음 표시를 취소했습니다.`;
    });
  }

  function render(moveFocus = true) {
    resizeObserver?.disconnect();
    cancelAnimationFrame(frame);
    const route = location.hash || "#/";
    const match = route.match(/^#\/lesson\/(\d{2})$/);
    if (["#/", "#"].includes(route)) renderMap();
    else if (match && byId.has(match[1])) renderLesson(byId.get(match[1]));
    else {
      document.title = "주제를 찾을 수 없습니다 · 게임 개발의 첫 지도";
      screenLabel.textContent = "주제 안내 — 존재하지 않는 학습 링크";
      main.innerHTML = '<section class="unknown"><p class="eyebrow">학습 링크 확인</p><h1>이 주제를 찾을 수 없어요.</h1><p>학습 지도에서 원하는 항목을 다시 선택해 주세요.</p><a class="primary" href="#/">학습 지도로 돌아가기</a></section>';
    }
    screenLabel.hidden = !isDevelopment;
    if (moveFocus) {
      main.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }
  window.addEventListener("hashchange", () => render());
  window.addEventListener("resize", scheduleLines);
  window.addEventListener("storage", event => {
    if (event.key !== storageKey && event.key !== null) return;
    readProgress();
    render(false);
  });
  document.fonts?.ready.then(scheduleLines);
  render(false);
})();
