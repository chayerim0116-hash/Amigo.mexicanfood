# 새 프로젝트 시작 가이드

## _template_settings 사용법

새 프로젝트를 시작할 때 `_template_settings`를 복사하여 사용합니다.

```bash
# 1. 템플릿 복사
cp -r lecture1/_template_settings lecture1/my-new-project

# 2. 프로젝트 디렉토리로 이동
cd lecture1/my-new-project

# 3. 의존성 설치
npm install

# 4. 개발 서버 시작
npm run dev
```

## 포함된 패키지
- React 19
- React Router DOM 7
- MUI (Material UI) v9
- Emotion (styled-components 대체)
- MUI Icons
- Fontsource Roboto
- Vite 8

## 프로젝트 구조
```
my-new-project/
├── src/
│   ├── main.jsx          # ThemeProvider + CssBaseline 적용
│   ├── theme.js          # MUI 테마 설정
│   ├── App.jsx           # 루트 컴포넌트
│   ├── components/       # 공통 컴포넌트
│   ├── pages/            # 페이지 컴포넌트
│   └── assets/           # 정적 파일
├── public/               # 빌드 시 복사될 파일
├── package.json
└── vite.config.js
```

## 주요 설정
- 테마: `src/theme.js`에서 수정
- 라우팅: `src/App.jsx`에서 react-router-dom 사용
- 글로벌 스타일: CssBaseline이 자동 적용됨
