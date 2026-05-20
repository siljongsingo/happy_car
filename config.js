// ============================================================
// 행복한교회 교우 차량 정보 - 설정 파일
// ============================================================
// 1. Google Apps Script를 배포한 후 아래 URL을 교체하세요.
// 2. 관리자 비밀번호를 원하는 값으로 변경하세요.
// ============================================================

const CONFIG = {
  // Google Apps Script 웹앱 배포 URL (apps-script.gs 배포 후 교체)
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyVKHSezSUmbjxQdSVsEdCcVn5CRfcDg0X-kxiej0hkaZevkS1gISX_ZtarqLaOpoZykg/exec',

  // 관리자 페이지 비밀번호
  ADMIN_PASSWORD: '9943',

  // 버전 정보
  VERSION: '25년 4월 14일',

  // 구글 시트 연동 여부 (URL을 설정하지 않으면 false로 유지됩니다)
  USE_SHEETS: true
};

// ============================================================
// 기본 데이터 (Google Sheets 미연동 또는 오류 시 폴백)
// ============================================================
const DEFAULT_DATA = [
  { plateNum: '1372', makerModel: '현대 소나타', color: '회색', vehicleType: '택시', owner: '김주식 은퇴집사', phone: '010-6234-9651' },
  { plateNum: '1724', makerModel: '현대 아반떼 HD', color: '회색', vehicleType: '승용차', owner: '유태호 청년', phone: '010-8372-2946' },
  { plateNum: '1963', makerModel: '기아 스포티지', color: '흰색', vehicleType: 'SUV', owner: '김민규 집사', phone: '010-8246-3026' },
  { plateNum: '2269', makerModel: '기아 봉고3', color: '노란색', vehicleType: '트럭', owner: '이상환 장로', phone: '010-3379-1013' },
  { plateNum: '2269', makerModel: '현대 포터', color: '흰색', vehicleType: '트럭', owner: '박원균 집사', phone: '010-3729-0021' },
  { plateNum: '2520', makerModel: '현대 GV70', color: '흰색', vehicleType: 'SUV', owner: '한수지 집사', phone: '010-9099-2132' },
  { plateNum: '3024', makerModel: '기아 포터 전기차', color: '흰색', vehicleType: '트럭', owner: '배종철 안수집사', phone: '010-8751-6521' },
  { plateNum: '3124', makerModel: 'KGM 토레스', color: '검정', vehicleType: 'SUV', owner: '최수진 성도', phone: '010-5463-2505' },
  { plateNum: '3154', makerModel: '벤츠 S', color: '검정', vehicleType: '승용차', owner: '박상현 집사', phone: '010-2465-2268' },
  { plateNum: '4198', makerModel: '현대 쏘나타', color: '쥐색', vehicleType: '승용차', owner: '전병주 안수집사', phone: '010-5353-1651' },
  { plateNum: '4263', makerModel: '기아 K8', color: '흰색', vehicleType: '승용차', owner: '김태훈 안수집사', phone: '010-5246-9508' },
  { plateNum: '4484', makerModel: '삼성 SM5', color: '흰색', vehicleType: '승용차', owner: '김연이 권사', phone: '010-9090-6852' },
  { plateNum: '4588', makerModel: '쉐보레 트레일블레이저', color: '자주', vehicleType: 'SUV', owner: '김미경 집사', phone: '010-2458-7908' },
  { plateNum: '4616', makerModel: '현대 엑센트', color: '쥐색', vehicleType: '승용차', owner: '김준희 집사', phone: '010-9732-9419' },
  { plateNum: '5447', makerModel: '쉐보레 트랙스', color: '흰색', vehicleType: 'SUV', owner: '어윤권 청년', phone: '010-7912-6417' },
  { plateNum: '5689', makerModel: '기아 K5', color: '파란색', vehicleType: '승용차', owner: '이민호 집사', phone: '010-5055-5984' },
  { plateNum: '5808', makerModel: '현대 그랜저', color: '흰색', vehicleType: '승용차', owner: '손대현 안수집사', phone: '010-2011-9776' },
  { plateNum: '5902', makerModel: '현대 싼타페 DM', color: '흰색', vehicleType: 'SUV', owner: '김태희 권사', phone: '010-6227-9872' },
  { plateNum: '6004', makerModel: '현대 그랜저', color: '검은색', vehicleType: '승용차', owner: '어준일 성도', phone: '010-5414-6417' },
  { plateNum: '6244', makerModel: '기아 K7', color: '검정', vehicleType: '승용차', owner: '최유훈 청년', phone: '010-7620-3124' },
  { plateNum: '6373', makerModel: '기아 K5 하이브리드', color: '-', vehicleType: '승용차', owner: '전준목 성도', phone: '010-7343-3563' },
  { plateNum: '6836', makerModel: '기아 카니발', color: '메탈그레이', vehicleType: 'SUV', owner: '윤지상 집사', phone: '010-8356-1009' },
  { plateNum: '7000', makerModel: 'BMW X5', color: '쥐색', vehicleType: 'SUV', owner: '유동민 집사', phone: '010-2464-2564' },
  { plateNum: '7032', makerModel: '현대 쏘나타', color: '그레이', vehicleType: '승용차', owner: '최명호 목사', phone: '010-4193-8220' },
  { plateNum: '7347', makerModel: 'BMW 630', color: '쥐색', vehicleType: '승용차', owner: '노광현 성도', phone: '010-7234-3767' },
  { plateNum: '7674', makerModel: '현대 캐스퍼', color: '아이보리', vehicleType: '승용차', owner: '김경아 권사', phone: '010-7513-1813' },
  { plateNum: '7801', makerModel: '기아 모닝', color: '베이지색', vehicleType: '승용차', owner: '정은영 권사', phone: '010-5226-2776' },
  { plateNum: '7998', makerModel: '현대 캐스퍼', color: '진그레이', vehicleType: '승용차', owner: '정지혜 집사', phone: '010-7159-4333' },
  { plateNum: '8027', makerModel: '쉐보레 올란도', color: '흰색', vehicleType: 'SUV', owner: '최동명 집사', phone: '010-6350-1795' },
  { plateNum: '8531', makerModel: '피아트', color: '빨강', vehicleType: 'SUV', owner: '변근영 성도', phone: '010-9476-0588' },
  { plateNum: '9042', makerModel: '볼보 S60', color: '흰색', vehicleType: '승용차', owner: '김지훈 집사', phone: '010-2792-9943' },
  { plateNum: '9056', makerModel: '기아 K3', color: '흰색', vehicleType: '승용차', owner: '선우준 목사', phone: '010-2989-4779' },
  { plateNum: '9426', makerModel: '쉐보레 올란도', color: '은색', vehicleType: 'SUV', owner: '안정도 목사', phone: '010-9862-6966' },
  { plateNum: '9876', makerModel: '현대 아반떼', color: '쥐색', vehicleType: '승용차', owner: '이규환 청년', phone: '010-9355-1635' },
  { plateNum: '9990', makerModel: '기아 K8', color: '그레이', vehicleType: '승용차', owner: '나인호 집사', phone: '010-4813-4669' },
  { plateNum: '9991', makerModel: '르노삼성 QM3', color: '베이지', vehicleType: 'SUV', owner: '김유재 권사', phone: '010-5795-7611' }
];
