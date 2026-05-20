# ⛪ 행복한교회 교우차량정보 시스템

> 교우 차량 정보를 Google Sheets와 실시간 연동하여  
> 번호판 검색 · 조회 · 수정 · 신규 등록을 할 수 있는 모바일 최적화 웹 시스템입니다.

🌐 **서비스 주소:** `https://siljongsingo.github.io/happy_car/`

---

## 📱 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 번호판 즉시 검색 | 뒤 4자리 입력 시 실시간 필터링 |
| 📋 차량 목록 조회 | 번호 오름차순 자동 정렬 |
| 📞 전화 바로 걸기 | 카드의 📞 버튼 탭 시 즉시 전화 연결 |
| ☁️ Google Sheets 연동 | 접속 시마다 최신 데이터 자동 반영 |
| 🔒 관리자 페이지 | 신규 등록 · 수정 · 삭제 후 Sheets 즉시 반영 |
| 📵 오프라인 폴백 | Sheets 연결 실패 시 내장 기본 데이터로 자동 전환 |
| 📱 모바일 반응형 | 모바일 카드형 / 데스크탑 테이블형 자동 전환 |

---

## 📁 파일 구성

```
happy_car/
├── index.html        # 메인 페이지 (차량 조회 + 번호판 검색)
├── admin.html        # 관리자 페이지 (수정 / 신규 추가 / 삭제)
├── apps-script.gs    # Google Apps Script 백엔드 코드 (참고용)
└── README.md         # 이 파일
```

> `config.js`는 별도 파일 없이 각 HTML 파일 내부에 인라인으로 포함되어 있습니다.

---

## ⚙️ 시스템 구성

```
[사용자 브라우저]
      │
      ▼
[GitHub Pages]          ← index.html / admin.html
      │
      ▼
[Google Apps Script]    ← 웹앱 배포 URL (exec)
      │
      ▼
[Google Sheets]         ← 실제 데이터 저장소
```

---

## 🚀 최초 설정 순서

### 1단계: Google Sheets + Apps Script 설정

1. [Google Drive](https://drive.google.com) → **새로 만들기 → Google Sheets** 생성
2. 상단 메뉴 → **확장 프로그램 → Apps Script** 클릭
3. `apps-script.gs` 내용 전체 복사 후 붙여넣기 (기존 코드 삭제)
4. 저장 (Ctrl+S)
5. **`initDefaultData` 함수 선택 → 실행** (최초 1회만)
   - 스프레드시트에 기본 데이터 36건 자동 입력됨

### 2단계: 웹앱 배포

1. Apps Script 편집기 → **배포 → 새 배포**
2. 배포 유형: **웹 앱** 선택
3. 설정값:
   - 다음 사용자로 실행: **나 (본인 계정)**
   - 액세스 권한: **모든 사용자**
4. **배포** → 권한 허용 → **웹 앱 URL 복사**

### 3단계: HTML 파일 내 URL 수정

`index.html` 과 `admin.html` 상단 `<script>` 블록에서 아래 값을 교체:

```js
const CONFIG = {
  APPS_SCRIPT_URL: '복사한_웹앱_URL_붙여넣기',
  ADMIN_PASSWORD:  '관리자_비밀번호',
  ...
};
```

### 4단계: GitHub 업로드 및 Pages 활성화

```bash
# 파일 업로드
git add index.html admin.html README.md
git commit -m "update: 차량 데이터 및 디자인 업데이트"
git push origin main
```

**GitHub Pages 설정:**
- 레포지토리 → **Settings → Pages**
- Source: `main` 브랜치 / `/ (root)` → **Save**
- 배포 완료 후: `https://[아이디].github.io/happy_car/` 접속 가능

---

## 🔑 관리자 접속

- **주소:** `https://siljongsingo.github.io/happy_car/admin.html`
- **비밀번호:** 각 HTML 파일 내 `ADMIN_PASSWORD` 값 참조
- 관리자 페이지는 모바일 최적화 — 좌우 스크롤 없이 상하 스크롤만 동작

---

## 📊 데이터 관리

| 항목 | 내용 |
|------|------|
| 저장소 | Google Sheets (`vehicles` 시트) |
| 컬럼 | plateNum · makerModel · color · vehicleType · owner · phone |
| 정렬 기준 | 번호판 4자리 오름차순 자동 정렬 |
| 등록 차량 | 현재 **36대** |
| 최종 업데이트 | 2026년 5월 21일 |

---

## ❓ 자주 묻는 질문

**Q. 접속하면 기본 데이터만 보여요.**  
Apps Script URL이 올바르게 설정되어 있는지 확인하세요.  
URL에 `YOUR_SCRIPT_ID` 가 그대로 남아있으면 기본 데이터(폴백)가 표시됩니다.

**Q. 관리자 로그인이 안 돼요.**  
`index.html` 또는 `admin.html` 상단 `CONFIG.ADMIN_PASSWORD` 값을 확인하세요.

**Q. 수정/추가 후 Sheets에 반영이 안 돼요.**  
Apps Script 배포가 **"새 배포"** 상태인지 확인하세요.  
기존 배포를 수정했다면 반드시 **새 버전으로 재배포**해야 합니다.

**Q. 모바일에서 페이지가 좌우로 움직여요.**  
`admin.html` 은 `touch-action: pan-y` 및 `overscroll-behavior: none` 처리가 적용되어 있습니다.  
브라우저 캐시를 지우고 다시 접속해 보세요.

---

*행복한교회 교우차량정보 시스템 · 2026년 5월 21일 업데이트*
