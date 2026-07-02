# 코드 컨벤션

## 파일 및 디렉토리 명명
- 컴포넌트 파일: PascalCase (예: `UserProfile.jsx`)
- 일반 파일: camelCase (예: `apiUtils.js`)
- 스타일 파일: 컴포넌트명과 동일 (예: `UserProfile.module.css`)
- 디렉토리: kebab-case (예: `user-profile/`)

## 컴포넌트 작성 규칙
- 함수형 컴포넌트 사용 (화살표 함수)
- Props는 구조 분해 할당으로 받기
- 컴포넌트당 하나의 파일
- default export 사용

## Import 순서
1. React 관련 (react, react-dom)
2. 외부 라이브러리 (react-router-dom, @mui/material 등)
3. 내부 컴포넌트 (@/components/...)
4. 내부 유틸/훅 (@/utils/..., @/hooks/...)
5. 스타일 파일

## 상태 관리
- 로컬 상태: useState
- 사이드 이펙트: useEffect
- 전역 상태: Context API 또는 Zustand

## 스타일링
- MUI sx prop 우선 사용
- 복잡한 스타일은 styled() 사용
- 인라인 스타일 지양

## 변수 명명
- 변수/함수: camelCase
- 상수: UPPER_SNAKE_CASE
- 타입/인터페이스: PascalCase
- boolean: is/has/can 접두사
