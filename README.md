# Y's Library

내가 가진 책을 온라인 서재처럼 보고 관리하는 설치형 웹앱(PWA)입니다. 서버나 회원가입 없이, 각자의 기기 브라우저 안에 서재가 저장됩니다.

**바로 쓰기:** https://yorangj-ux.github.io/ylibrary/

## 기능
- 표지 서가 보기 (표지 사진이 없으면 제목으로 표지 생성)
- ISBN으로 자동 입력 (Google Books, Open Library) 또는 직접 입력
- 읽기 상태, 별점, 태그, 꽂힌 곳, 메모
- 검색, 상태 필터, 정렬
- 서재 이름과 한 줄 소개를 각자 바꾸기
- Google 로그인으로 여러 기기 연동 (각자 본인 Google Drive의 앱 전용 폴더에 저장)
- JSON 내보내기/가져오기 (백업, 기기 이동)
- 휴대폰·PC에 앱으로 설치, 오프라인에서도 열림

## 설치하기
- Android·PC (Chrome/Edge): 화면 아래 ‘앱 설치’ 버튼 또는 주소창의 설치 아이콘
- iPhone·iPad: Safari에서 공유 → 홈 화면에 추가

## 데이터
서재는 각 기기 브라우저에 저장됩니다. Google Drive 연동을 켜면 본인 Drive의 앱 전용 숨김 폴더에도 저장되고, 이 앱은 그 폴더 말고 다른 Drive 파일은 볼 수 없습니다. 브라우저 데이터를 지우면 사라지니 가끔 ‘내보내기’로 백업하세요.

## 폴더 구성
- `index.html`, `manifest.webmanifest`, `sw.js`, `icons/` : 배포되는 앱
- `src/library.html` : 앱 원본. 고친 뒤 `sh src/build.sh`를 실행하면 `index.html`이 다시 만들어집니다.
- `src/icon.svg` : 아이콘 원본

내 주소로 따로 배포하려면 이 저장소를 Fork한 뒤 Settings → Pages에서 `main` 브랜치를 고르면 됩니다. Drive 연동까지 쓰려면 Google Cloud에서 웹용 OAuth 클라이언트 ID를 만들고(범위: `drive.appdata`, 승인된 JavaScript 원본: 내 Pages 주소) `src/library.html`의 `GOOGLE_CLIENT_ID`에 넣은 뒤 `sh src/build.sh`를 실행하세요.
