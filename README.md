# DreamWeaver Client

DreamWeaver는 사용자가 꿈을 기록하고, 추적하며, 분석할 수 있도록 돕는 현대적이고 몽환적인 꿈 일기 애플리케이션입니다. React 19와 TypeScript로 구축되었으며, 아름다운 글래스모피즘(Glassmorphism) UI, 부드러운 애니메이션, 그리고 매끄러운 사용자 경험을 제공합니다.

## ✨ 주요 기능

- **🌙 꿈 기록**: 상세한 설명, 키워드, 감정 추적 기능을 통해 꿈을 쉽게 기록할 수 있습니다.
- **⏰ 스마트 알람**: 기상 후 바로 꿈을 기록할 수 있도록 도와주는 통합 알람 시스템입니다.
- **📅 꿈 캘린더**: 인터랙티브한 캘린더에서 꿈 기록 내역을 시각적으로 확인할 수 있습니다.
- **📋 꿈 목록**: 깔끔하게 정리된 목록 뷰에서 과거의 꿈들을 찾아볼 수 있습니다.
- **👤 사용자 프로필**: 마이 페이지에서 설정과 환경설정을 관리할 수 있습니다.
- **🎨 몽환적인 UI**: 글래스모피즘, 그라디언트, 유려한 애니메이션이 특징인 "Emotional Tech" 디자인을 적용했습니다.

## 🛠️ 기술 스택

- **프레임워크**: [React 19](https://react.dev/)
- **빌드 도구**: [Vite](https://vitejs.dev/)
- **언어**: [TypeScript](https://www.typescriptlang.org/)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **애니메이션**: [Framer Motion](https://www.framer.com/motion/)
- **상태 관리**: [Zustand](https://zustand-demo.pmnd.rs/) & [TanStack Query](https://tanstack.com/query/latest)
- **라우팅**: [React Router DOM](https://reactrouter.com/)
- **폼(Form)**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **아이콘**: [Lucide React](https://lucide.dev/)

## 🚀 시작하기

### 필수 요구사항

- Node.js (v18 이상 권장)
- npm 또는 yarn

### 설치

1.  저장소를 클론합니다:

    ```bash
    git clone https://github.com/your-username/dreamweaver-client.git
    cd dreamweaver-client
    ```

2.  의존성을 설치합니다:
    ```bash
    npm install
    ```

### 앱 실행

개발 서버를 시작합니다:

```bash
npm start
```

앱은 `http://localhost:5173`에서 확인할 수 있습니다.

### 배포용 빌드

프로덕션 환경을 위해 앱을 빌드합니다:

```bash
npm run build
```

빌드된 앱을 미리보기:

```bash
npm run preview
```

## 📂 프로젝트 구조

```
src/
├── api/            # API 연동 및 서비스
├── assets/         # 정적 자산 (이미지, 폰트 등)
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── dream/      # 꿈 관련 컴포넌트
│   ├── layout/     # 레이아웃 컴포넌트 (헤더, 푸터 등)
│   └── ui/         # 일반 UI 컴포넌트 (버튼, 입력창 등)
├── constants/      # 전역 상수
├── features/       # 기능별 로직 (알람, 캘린더, 기록)
├── hooks/          # 커스텀 React 훅
├── pages/          # 페이지 컴포넌트 (라우트 타겟)
├── store/          # 전역 상태 저장소 (Zustand)
├── types/          # TypeScript 타입 정의
├── App.tsx         # 메인 애플리케이션 컴포넌트
└── main.tsx        # 진입점 (Entry point)
```

## 📜 스크립트

- `npm start`: Vite 개발 서버를 시작합니다.
- `npm run build`: 프로덕션용 애플리케이션을 빌드합니다.
- `npm run lint`: ESLint를 실행하여 코드 품질 문제를 확인합니다.
- `npm run preview`: 프로덕션 빌드를 로컬에서 미리 확인합니다.

---

Contributor: [Castle Bell](https://github.com/whddltjdwhd)
