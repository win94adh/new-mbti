// ===========================
//  데이터
// ===========================
const questions = [
    { q: "새로운 무대에 오르기 직전 당신은?",            a: "박수 소리가 설레고 기대된다",        b: "차분하게 대본을 복기한다",           type: "EI" },
    { q: "예기치 못한 조명 사고가 발생한다면?",           a: "자연스러운 애드리브로 승화한다",      b: "매뉴얼대로 침착하게 대처한다",       type: "JP" },
    { q: "연습 중 동료가 대사를 까먹었다면?",             a: "효율적인 개선책을 바로 알려준다",     b: "기운 낼 수 있게 따뜻하게 격려한다",  type: "TF" },
    { q: "공연이 끝난 후 뒤풀이 제안을 받는다면?",        a: "밤새도록 떠들며 즐기고 싶다",        b: "혼자 조용히 오늘의 공연을 반추한다", type: "EI" },
    { q: "연습 스케줄을 짤 때 당신의 스타일은?",          a: "분 단위로 철저하게 계획한다",        b: "큰 흐름만 잡고 유연하게 움직인다",   type: "JP" },
    { q: "라이벌이 나보다 더 큰 박수를 받는다면?",        a: "그의 강점이 무엇인지 냉철하게 분석한다", b: "그의 노력이 빛을 발해 진심으로 기쁘다", type: "TF" },
    { q: "나를 수식하는 가장 어울리는 말은?",             a: "빈틈없는 카리스마의 완벽주의자",     b: "사람의 마음을 울리는 감성 아티스트", type: "TF" },
    { q: "공연 당일 배역이 바뀌었다는 소식을 듣는다면?",   a: "새로운 기회라 생각하고 즐긴다",      b: "당황스럽지만 빠르게 계획을 수정한다", type: "JP" },
    { q: "더 선호하는 무대의 형태는?",                    a: "함께 호흡을 맞추는 화려한 합동 무대", b: "나만의 색깔을 온전히 보여주는 솔로 무대", type: "EI" },
    { q: "관객에게 듣고 싶은 최고의 극찬은?",             a: "실력이 정말 압도적이었다는 평가",     b: "당신의 연기로 큰 위로를 받았다는 후기", type: "TF" }
];

// [버그 수정 1] results 키를 실제 계산되는 EI+TF+JP 조합으로 맞춤
const results = {
    "ETJ": {
        title: "찬란한 빛의 지휘자",
        mbti: "ENTJ",
        desc: "완벽한 계획과 흔들리지 않는 카리스마로 무대 전체를 장악하는 타고난 리더. 당신이 선 곳이 곧 중심이 됩니다.",
        color: "#00d4ff", icon: "💎"
    },
    "ETP": {
        title: "무대를 삼킨 폭풍",
        mbti: "ENTP",
        desc: "예측 불가한 에너지와 번뜩이는 기지로 관객을 휘어잡는 즉흥의 달인. 대본 밖에서 진짜 빛이 납니다.",
        color: "#00ffcc", icon: "⚡"
    },
    "EFJ": {
        title: "황금빛 앙상블의 심장",
        mbti: "ENFJ",
        desc: "따뜻한 공감과 섬세한 배려로 무대 위 모두를 하나로 묶는 연결자. 당신이 있어야 팀이 완성됩니다.",
        color: "#ffb347", icon: "🌅"
    },
    "EFP": {
        title: "자유로운 영감의 스파크",
        mbti: "ENFP",
        desc: "넘치는 긍정 에너지와 감성으로 관객의 마음을 단번에 사로잡는 비타민 같은 존재입니다.",
        color: "#ffd700", icon: "🌟"
    },
    "ITJ": {
        title: "고요한 새벽의 전략가",
        mbti: "INTJ",
        desc: "커튼 뒤에서 완벽을 설계하는 침묵의 실력자. 드러나지 않지만, 무대의 모든 것이 당신 손 안에 있습니다.",
        color: "#a29bfe", icon: "🔭"
    },
    "ITP": {
        title: "냉철한 해석의 건축가",
        mbti: "INTP",
        desc: "작품을 구조적으로 분해하고 재조립하는 분석가. 아무도 발견 못한 각도에서 무대를 새로 씁니다.",
        color: "#74b9ff", icon: "🔬"
    },
    "IFJ": {
        title: "깊은 밤의 음유시인",
        mbti: "INFJ",
        desc: "조용하지만 깊이 울리는 감동을 전하는 존재. 당신의 무대는 끝나도 오래 마음에 남습니다.",
        color: "#fd79a8", icon: "🕯️"
    },
    "IFP": {
        title: "부드러운 달빛의 예술가",
        mbti: "ISFP",
        desc: "섬세한 감성과 고요한 내면의 빛으로 관객의 마음을 촉촉이 적시는 순수한 예술가입니다.",
        color: "#fab1a0", icon: "🎨"
    }
};

// ===========================
//  상태
// ===========================
let currentIdx = 0;
let scores = { E: 0, I: 0, T: 0, F: 0, J: 0, P: 0 };
let isClickable = true;

// ===========================
//  커튼 열기
// ===========================
function openGate() {
    document.getElementById('gate-container').classList.add('gate-open');
    setTimeout(() => {
        document.getElementById('quiz-screen').classList.add('active');
        renderQuestion();
    }, 1400);
}

// ===========================
//  퀴즈 렌더링
// ===========================
function renderQuestion() {
    const area = document.getElementById('quiz-area');
    const q = questions[currentIdx];
    const progress = ((currentIdx) / questions.length) * 100;

    area.style.opacity = '1';
    area.style.transform = 'translate(-50%, -50%)';
    area.style.transition = '';

    area.innerHTML = `
        <p class="quiz-scene-label">SCENE ${currentIdx + 1} / ${questions.length}</p>
        <div class="quiz-progress">
            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
        <h2 class="quiz-q">${q.q}</h2>
        <div class="choice-container">
            <button class="btn-choice" onclick="handleSelect('a')">
                <span style="color:var(--gold-dim);font-size:0.75rem;letter-spacing:0.15em;display:block;margin-bottom:6px;">A</span>
                ${q.a}
            </button>
            <button class="btn-choice" onclick="handleSelect('b')">
                <span style="color:var(--gold-dim);font-size:0.75rem;letter-spacing:0.15em;display:block;margin-bottom:6px;">B</span>
                ${q.b}
            </button>
        </div>
    `;
    isClickable = true;
}

// ===========================
//  선택 처리
// ===========================
window.handleSelect = function(choice) {
    if (!isClickable) return;
    isClickable = false;

    const type = questions[currentIdx].type;
    scores[choice === 'a' ? type[0] : type[1]]++;

    currentIdx++;

    if (currentIdx < questions.length) {
        // 짧은 페이드 후 다음 질문
        const area = document.getElementById('quiz-area');
        area.style.opacity = '0';
        area.style.transform = 'translate(-50%, -40%)';
        area.style.transition = 'opacity 0.25s, transform 0.25s';
        setTimeout(() => {
            renderQuestion();
            requestAnimationFrame(() => {
                area.style.transition = 'opacity 0.35s, transform 0.35s';
                area.style.opacity = '1';
                area.style.transform = 'translate(-50%, -50%)';
            });
        }, 280);
    } else {
        startLoadingShow();
    }
};

// ===========================
//  로딩 화면
// ===========================
function startLoadingShow() {
    document.getElementById('quiz-screen').classList.remove('active');

    // [버그 수정 2] 로딩 중 커튼을 다시 닫지 않음 — 그대로 로딩 화면 표시
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('active');
        document.body.classList.add('loading-active');
        setTimeout(revealResult, 4500);
    }, 400);
}

// ===========================
//  결과 계산 및 표시
// ===========================
function revealResult() {
    // [버그 수정 1] EI + TF + JP 3개 축으로 정확하게 계산
    const ei = scores.E >= scores.I ? "E" : "I";
    const tf = scores.T >= scores.F ? "T" : "F";
    const jp = scores.J >= scores.P ? "J" : "P";
    const key = ei + tf + jp;

    const data = results[key] || results["ETJ"];

    document.getElementById('result-title').innerText = data.title;
    document.getElementById('result-mbti').innerText = `# ${data.mbti}`;
    document.getElementById('result-desc').innerText = data.desc;
    document.getElementById('char-icon-container').innerHTML =
        `<span class="char-icon">${data.icon}</span>`;

    document.getElementById('loading-screen').classList.remove('active');
    document.body.classList.remove('loading-active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('main-beam').style.opacity = '1';

    setTimeout(launchFireworks, 300);
}

// ===========================
//  파이어웍스
//  [버그 수정 4] forEach+splice → filter로 교체
// ===========================
function launchFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // 골드 팔레트 위주의 입자색
    const palette = [
        '#c9a84c', '#e8c96b', '#fff0a0',
        '#ffffff', '#ffb347', '#f0e68c'
    ];

    let particles = [];

    function burst(cx, cy) {
        const count = 80 + Math.floor(Math.random() * 40);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 7;
            particles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: palette[Math.floor(Math.random() * palette.length)],
                life: 70 + Math.floor(Math.random() * 50),
                maxLife: 0,
                size: 1.5 + Math.random() * 3
            });
            particles[particles.length - 1].maxLife = particles[particles.length - 1].life;
        }
    }

    // 3번 연속 폭죽
    burst(canvas.width * 0.3, canvas.height * 0.35);
    setTimeout(() => burst(canvas.width * 0.7, canvas.height * 0.28), 300);
    setTimeout(() => burst(canvas.width * 0.5, canvas.height * 0.4),  600);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // [버그 수정 4] splice 대신 filter
        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => {
            p.x  += p.vx;
            p.y  += p.vy;
            p.vy += 0.12; // 중력
            p.vx *= 0.98; // 공기저항
            p.life--;

            const alpha = p.life / p.maxLife;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}
