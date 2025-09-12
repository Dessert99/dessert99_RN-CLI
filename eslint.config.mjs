// eslint.config.mjs
// ─────────────────────────────────────────────────────────────────────────────
// React Native + TypeScript (ESLint v9 / Flat Config) 최소-정석 셋업
// - 포인트: typescript-eslint 권장 설정 + React/RN 플러그인 + import 해석기 + Prettier 충돌 제거
// - 왜 Flat?: ESLint v9부터 기본 형식. .eslintrc.* 대신 eslint.config.* 사용. :contentReference[oaicite:0]{index=0}
// ─────────────────────────────────────────────────────────────────────────────

import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

// React / Hooks 플러그인 (Flat Config 지원)
import react from "eslint-plugin-react"; // flat.recommended / flat['jsx-runtime'] 제공 :contentReference[oaicite:1]{index=1}
import reactHooks from "eslint-plugin-react-hooks"; // 'recommended-latest' 제공(ESLint 9용) :contentReference[oaicite:2]{index=2}

// import 규칙 + 해석기(typescript, react-native)
// - 'import/no-unresolved' 등 규칙이 TS 경로별칭(@/*)과 RN 플랫폼 확장자(.ios/.android)를 제대로 인식하도록 설정
import rn from "eslint-plugin-react-native";
import importPlugin from "eslint-plugin-import";

// Prettier와 충돌하는 ESLint 규칙 끄기(포맷은 Prettier에게 위임)
import prettierFlat from "eslint-config-prettier/flat";

// Node/Jest 전역(설정/테스트 파일용)
import globals from "globals";

export default defineConfig(
  // 0) .eslintignore 대체: 린트에서 완전히 제외할 경로
  //    (빌드 산출물/네이티브 폴더는 보통 제외)
  globalIgnores([
    "eslint.config.*",
    "node_modules",
    "android",
    "ios",
    "build",
    "dist",
  ]),

  // 1) 공통 규칙(모든 JS/TS/JSX/TSX 파일 대상)
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    // 파서/언어 옵션: tseslint 권장셋이 TS 파서를 제공하므로 여기선 기본만 지정
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    // 사용 플러그인 등록. 여기엔 react / react-hooks 넣지 말 것 (extends가 이미 등록함)
    plugins: {
      "react-native": rn,
      import: importPlugin,
    },

    // 해석기/환경 설정
    settings: {
      // React 버전 자동 감지(React 17+의 JSX Transform 포함)
      react: { version: "detect" },

      // import 해석기: TS 경로별칭 + RN의 플랫폼 확장자 인식
      // - eslint-plugin-import가 'no-unresolved' 등을 판단할 때 사용
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
        "react-native": {
          // .ios.ts(x)/.android.ts(x) 같은 확장자 해석
        },
      },
    },

    // 기본 권장 구성들
    extends: [
      // JS 코어 권장
      js.configs.recommended,

      // TS 권장(비-타입체크; 빠름)
      ...tseslint.configs.recommended,

      // React 권장 + React 17+ JSX 런타임
      react.configs.flat.recommended, // 기본 React 권장 규칙들
      react.configs.flat["jsx-runtime"], // React 17+에서 React import 불필요 설정 :contentReference[oaicite:3]{index=3}

      // Hooks 권장(ESLint 9 이상은 'recommended-latest' 사용 권장)
      reactHooks.configs["recommended-latest"], // rules-of-hooks, exhaust-deps 등 포함 :contentReference[oaicite:4]{index=4}

      // Prettier와 충돌하는 규칙 끄기(항상 '마지막')
      prettierFlat,
    ],

    // 팀 취향/현실적인 RN 관례에 맞춘 최소 커스터마이징
    rules: {
      // React 17+에서는 JSX에 React 스코프 불필요
      "react/react-in-jsx-scope": "off",

      // TSX/JSX 파일 확장자 허용
      "react/jsx-filename-extension": [
        "warn",
        { extensions: [".tsx", ".jsx"] },
      ],

      // TS 자주 쓰는 안전장치
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // RN 관례: 안 쓰는 StyleSheet, 플랫폼 분리 권장
      "react-native/no-unused-styles": "warn",
      "react-native/split-platform-components": "warn",
      // 필요 시 인라인 스타일도 제한하려면 아래 주석 해제
      // 'react-native/no-inline-styles': 'warn',

      // import 규칙: 확장자 강제는 해제( RN/웹 혼용 시 편의 )
      "import/extensions": "off",
      // 경로 해석 실패는 에러로(해석기 설정이 맞다면 잡히는 게 이득)
      "import/no-unresolved": "error",
    },
  },
  // 2) Node 기반 설정/툴링 파일 전용 오버라이드
  {
    files: [
      ".prettierrc.js",
      "babel.config.js",
      "metro.config.js",
      "jest.config.js",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs",
    ],
    languageOptions: {
      // Node 전역 허용: module, require, __dirname 등
      globals: globals.node,
      sourceType: "script",
    },
    rules: {
      // 설정 파일은 CommonJS/툴체인 특성상 예외 허용
      "@typescript-eslint/no-require-imports": "off",
      "import/no-unresolved": "off",
      "no-undef": "off", // (globals.node로도 해결되지만 안전빵)
    },
  }
);
