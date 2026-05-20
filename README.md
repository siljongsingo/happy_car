# ⛪ 행복한교회 교우 차량 정보 시스템

> 교우 차량 정보를 Google Sheets와 연동하여 조회 · 수정 · 신규 등록할 수 있는 웹 시스템입니다.

---

## 📁 파일 구성

```
happy_car/
├── index.html        # 메인 페이지 (차량 조회 + 번호판 검색)
├── admin.html        # 관리자 페이지 (수정 / 신규 추가 / 삭제)
├── config.js         # 설정 파일 (Apps Script URL, 비밀번호)
├── apps-script.gs    # Google Apps Script 코드 (백엔드)
└── README.md         # 이 파일
```

---

## 🚀 설정 순서

### 1단계: Google Sheets + Apps Script 설정

1. [Google Drive](https://drive.google.com) → **새로 만들기 → Google Sheets** 로 새 스프레드시트 생성
2. 상단 메뉴 → **확장 프로그램 → Apps Script** 클릭
3. `apps-script.gs` 파일의 내용을 전체 복사 → Apps Script 편집기에 붙여넣기 (기존 코드 삭제 후)
4. 저장 (Ctrl+S)
5. **`initDefaultData` 함수 선택 → 실행** (최초 1회만)  
   → 스프레드시트에 기본 데이터 36건이 자동으로 채워집니다

### 2단계: 웹앱 배포

1. Apps Script 편집기 → **배포 → 새 배포**
2. 배포 유형: **웹 앱** 선택
3. 설정:
   - 다음 사용자로 실행: **나** (본인 계정)
   - 액세스 권한: **모든 사용자** (또는 모든 사용자, 익명 포함)
4. **배포** 버튼 클릭 → 권한 허용
5. **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/AKfyc...../exec`)

### 3단계: config.js 수정

```js
const CONFIG = {
  APPS_SCRIPT_URL: '여기에_복사한_URL_붙여넣기',  // ← 교체
  ADMIN_PASSWORD: 'happy2025',                       // ← 원하는 비밀번호로 변경
  ...
};
```

### 4단계: GitHub 업로드

```bash
git init
git remote add origin https://github.com/[사용자명]/happy_car.git
git add .
git commit -m "feat: 초기 차량 정보 시스템"
git push -u origin main
```

**GitHub Pages 활성화:**
- 레포지토리 → Settings → Pages → Source: `main` 브랜치 `/root` 설정
- 자동으로 `https://[사용자명].github.io/happy_car/` 주소 생성

---

## 🔑 기본 관리자 비밀번호

```
happy2025
```
> `config.js`에서 `ADMIN_PASSWORD` 값을 원하는 비밀번호로 변경하세요.

---

## 📱 주요 기능

| 기능 | 설명 |
|------|------|
| 번호판 검색 | 뒤 4자리 숫자 입력 시 즉시 필터링 |
| Google Sheets 연동 | 실시간 데이터 조회 (조회 시마다 최신 데이터) |
| 신규 등록 | 관리자 페이지에서 추가 → 즉시 Sheets 반영 |
| 수정 | 행 클릭 후 인라인 편집 → 저장 시 Sheets 업데이트 |
| 삭제 | 확인 후 Sheets에서 해당 행 삭제 |
| 오프라인 폴백 | Sheets 연결 실패 시 기본 데이터로 자동 전환 |

---

## ❓ 자주 묻는 질문

**Q. Google Sheets 연동 없이 테스트하려면?**  
`config.js`에서 `APPS_SCRIPT_URL`을 기본값(`YOUR_SCRIPT_ID`)으로 두면 자동으로 기본 데이터를 사용합니다.

**Q. 관리자 페이지 로그인이 안 돼요.**  
`config.js`의 `ADMIN_PASSWORD`를 확인하세요. 기본값은 `happy2025`입니다.

**Q. Apps Script 배포 후 CORS 오류가 나요.**  
배포 설정에서 "액세스 권한"을 **"모든 사용자"**로 선택했는지 확인하세요.  
새 배포를 만들 때마다 URL이 바뀌므로 `config.js`도 함께 업데이트해 주세요.

**Q. 데이터를 수정했는데 Google Sheets에 반영이 안 돼요.**  
`config.js`의 URL이 올바른지 확인하고, Apps Script 배포 버전이 최신인지 확인하세요.

---

*Ver. 25년 4월 14일 · 행복한교회*
