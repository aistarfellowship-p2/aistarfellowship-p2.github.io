# AI Star Fellowship - Project 2

AI Star Fellowship Project 2의 공식 GitHub Pages 홈페이지 저장소입니다.

## Project

**AI 영상통화 기반 멀티유닛 딥페이크 선제방어 및 에이전트 인증**

이 사이트는 프로젝트 개요, 단계별 성과지표, 참여 연구진과 성과지표별 공개 결과물 링크를 제공합니다. 순수 HTML, CSS, JavaScript로 작성되어 별도 빌드 과정 없이 GitHub Pages에서 자동 배포되는 정적 사이트입니다.

## Structure

```text
.
├── index.html          # 메인 페이지와 콘텐츠 구조
├── favicon.svg         # 프로젝트 식별용 브라우저 아이콘
├── styles.css          # 반응형 레이아웃 및 스타일
├── script.js           # 성과지표 렌더링과 모바일 메뉴
├── data/
│   └── metrics.json    # 단계별 성과지표와 공개 결과물 데이터
└── .nojekyll           # Jekyll 처리 없이 정적 파일 배포
```

## Local preview

브라우저의 로컬 파일 열기 대신 저장소 루트에서 간단한 HTTP 서버를 실행합니다.

```bash
python -m http.server 8000
```

그 후 `http://localhost:8000`에서 확인합니다.

## Updating metrics and public outputs

성과지표의 목표 수치, 담당 연구진, 상태는 `data/metrics.json`에서 관리합니다. 실제 결과물이 공개되면 해당 항목의 `outputs` 배열에 공식 링크를 추가합니다.

```json
"outputs": [
  { "label": "GitHub", "url": "https://github.com/..." },
  { "label": "Paper", "url": "https://doi.org/..." }
]
```

공식 확인이 가능한 공개 자료만 연결하며 비공개 자료와 개인정보는 게시하지 않습니다.
