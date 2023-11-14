require('./mongoConnect');
const { ObjectId } = require('mongodb');
const Notice = require('../models/notice');


const noticeList = [
    {
        idx: 1,
        category: 'notification',
        title: 'Chrome 91 업데이트에 따른 로그인 오류 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

    Chrome 브라우저의 91버전 업데이트 후 그룹웨어 결합상품에서 효다닥 로그인이 불가합니다.
    \t– 대상 버전 : Chromium 91 버전(Chrome, Whale, Edge)
    \t– Internet Explorer와 Safari 브라우저는 정상적으로 사용이 가능합니다.
    \t(Safari 브라우저는 공식 지원이 종료되었으나, 로그인 이슈로 인해 한시적으로 이용을 안내드립니다.)
    
    Chrome 브라우저 91버전부터 보안 정책 강화의 일환으로
    현재 사이트에서 도메인이 다른 3rd party 쿠키를 허용하지 않도록 새로운 쿠키 정책이 적용되었습니다.
    
    이에 따라, 고객사 자체 그룹웨어 포탈을 통해 효다닥을 접속하거나
    일부 파트너사에서 제공하고 있는 그룹웨어 결합형 효다닥을 사용하고 계시는 경우,
    포탈 사이트에서 효다닥으로 로그인이 불가한 현상이 발생하고 있습니다.
    
    브라우저 보안 정책은 새로운 공격을 방어하기 위해 계속해서 진화하고 변경됩니다.
    이번 Chrome의 조치는 사이트간 쿠키기반 요청 위조(CSRF, Cross-Site Request Forgery) 공격을 방지하기 위한 보안 강화 차원에서 진행이 되었고,
    향후 다른 브라우저에도 동일한 조치가 적용될 수 있습니다.
    
    \t※CSRF(Cross-Site Request Forgery)란?
    \t사용자가 피싱(Phishing) 사이트에 접근하게 되면
    \t피싱사이트는 접근한 사용자의 효다닥 쿠키를 기반으로 효다닥를 실행하고,
    \t(피싱을 당한) 사용자의 의지와는 무관하게 공격자가 의도한 행위(결제, 수정, 삭제, 등록 등)를 할 수 있습니다.
    
    이러한 보안 강화 흐름에 맞춰 자체 포탈 및 그룹웨어에 효다닥을 결합하여 사용하는 경우
    iframe 방식이 아닌 팝업 방식으로 구현하여 브라우저에서 요구하는 보안 정책을 준수해주시면 감사하겠습니다.
    
    관련 자세한 사항은 각 회사의 IT 관리자 및 그룹웨어를 제공한 파트너사를 통해 문의주시기 바랍니다.
    앞으로도 더 좋은 서비스를 제공하기 위해 지속적으로 노력하겠습니다.
    
    감사합니다.​`,
    },
    {
        idx: 2,
        category: 'event',
        title: '효다닥 X 오더퀸 결합 서비스 신규 가입 20% 추가 할인 (~12.31)',
        createTime: Date.now(),
        contents: `효다닥과 편리하게 연동 되는 전자결재, 출퇴근 근태관리, 비용, 회계 관리 시스템 워크플레이스 (WORKPLACE)!
효다닥과 워크플레이스가 만드는 시너지를 낮은 부담으로 경험해 보실 수 있도록 프로모션을 마련했습니다.

👉 효다닥과 워크플레이스를 ‘결합 서비스’ 형태로 처음 사용하시는 고객을 대상으로
결합 서비스 상시 10% 할인에 더해 20% 추가 할인 프로모션 혜택을 6개월 간 제공합니다.

< 효다닥 X 워크플레이스 20% 추가 할인 프로모션 공지 >
▶ 내용 : 효다닥 X 워크플레이스 결합 서비스 신규 가입 고객 20% 추가 할인 혜택 프로모션
▶ 기간 : ‘22.10.11(화) ~ ‘22.12.31(토)
▶ 대상 : 상기 기간 중 결합 서비스를 신규 유료 사용하는 고객 (월/연간 계약 모두 해당, 인원 수 제한 없음)
▶ 혜택 제공 기간 및 방식 : 결합 서비스 유료 사용 시작 일자 기준, 익월 1일부터 6개월 간 자동 적용
(예시) ’22년 10월 20일 결합 서비스를 월간 또는 연간 계약으로 유료 사용 시작 시, ’22년 11월 1일부터 ‘23년 4월 30일까지 (6개월간) 효다닥과 워크플레이스 서비스 당 이용 요금에 20% 추가 할인이 자동으로 적용됩니다.
▶ 주요 참고사항 :
– 효다닥과 워크플레이스를 결합 서비스로 사용 시 제공되는 ‘10% 할인 혜택’은 상시 적용됩니다. ( ▶할인 내용 자세히 보기 )
– 본 프로모션 대상자에게는 결합 서비스 10% 할인 요금을 기준으로 6개월간 20% 추가 할인이 적용됩니다.
– ‘결합 서비스’란 효다닥과 워크플레이스 두 서비스를 함께 사용하는 것을 의미합니다. 두 서비스를 모두 유료로 사용하기 시작하는 시점에 프로모션 적용 대상이 되며 (1) 효다닥과 워크플레이스를 동시에 신규 가입 (2) 효다닥 사용 중에 워크플레이스를 추가로 신규 사용 (3) 워크플레이스 사용 중에 효다닥를 추가로 신규 사용하는 경우를 모두 포함합니다.
– 효다닥과 워크플레이스 중 하나의 서비스라도 Trial (30일 무료체험) 또는 Free (무료 ) 버전을 사용 중인 경우 대상에서 제외됩니다.

※ 효다닥 파트너 고객인 경우, 파트너사에 프로모션 혜택 문의 및 워크플레이스 가입 지원을 요청해 주시기 바랍니다.
(효다닥 관리자 로그인 후 ‘Admin > 파트너’ 메뉴에서 확인)`,
    },
    {
        idx: 3,
        category: 'notification',
        title: '효다닥 서비스 접속 정상화 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

2022년 12월 10일(화) 오후 14시 30분경부터 효다닥 접속오류가 발생하였고
최종 오후 17시 25분에 메일, 메시지, 캘린더 등 및 기능이 모두 정상화되었습니다. 

서비스는 정상화되었으나 서비스 동작에 이슈가 없는지 계속 점검하고 있습니다. 
서비스의 원활한 사용이 어려우신 경우, 고객지원 > 문의하기 로 문의 부탁드립니다.

장시간 업무에 불편을 드려 대단히 죄송합니다. 

감사합니다.`,
    },
    {
        idx: 4,
        category: 'event',
        title: '효다닥 사용자 무료 교육 안내ㅣ23년 9월 20일(수)',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 사용자를 위한 무료 정기 교육을 안내해 드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 사용자 (사내 효다닥 사용자·관리자)
■ 일정 : 2023년 9월 20일 (수) 10:00 ~ 17:00
■ 장소 : 효다닥 본사 Hcompany Space
■ 프로그램 :
10:00 – 11:00   사용자·관리자를 위한 효다닥 시작하기
11:00 – 12:00   사용자를 위한 효다닥 사용하기 1
12:00 – 13:00   점심시간 
13:30 – 14:30  사용자를 위한 효다닥 사용하기 2 
14:30 – 15:30  관리자를 위한 효다닥 Admin 설정하기 
15:30 – 16:30  사용자·관리자를 위한 워크박스 사용하기 

■ 신청방법 : 교육 신청하기
  ※ 상단 ‘교육 신청하기’를 클릭하신 후 개인 정보를 입력하시면 신청이 완료됩니다. 

■ 안내 사항:
– 본 교육은 ‘사용자·관리자를 위한 워크박스 사용하기’ 교육 세션이 포함되어 있습니다.
– 본 교육은 무료이나 좌석 수가 한정되어 조기 마감될 수 있습니다. 
– 단일 회사에서 여러 명이 참석을 희망하시는 경우, 개인별로 ‘교육 신청하기’ 링크를 통해 신청해 주셔야 합니다.
– 실습 과정이 포함되어 있음으로 개인 노트북을 꼭 지참해주시기 바랍니다.
– 주차 요금을 지원하지 않사오니, 대중교통 이용을 권장드립니다.
– 오프라인 교육은 온라인 동영상으로 제공하지 않습니다. 

감사합니다.`,
    },
    {
        idx: 5,
        category: 'event',
        title: '효다닥 신규 가입자 3개월 무료 제공 혜택',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 브랜드명 변경 기념으로 신규 가입자 대상 효다닥 유료 상품을 3개월 무료로 사용하실 수 있는 혜택을 안내해드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 신규 가입자
■ 가입 기간 : 2022년 05월 24일 (월) ~ 12월 31일 (목)
■ 상품 : 효다닥 유료 상품 (Lite, Basic, Premium)
■ 혜택 : 3개월 서비스 사용료 무료
■ 가입 방법 : 효다닥 브랜드사이트 이용 요금 페이지에서 유료 상품의 [30일 무료 체험하기] 버튼을 클릭 후 가입 진행
■ 안내 :
– 본 혜택은 2022년 05월 24일 (월) ~ 12월 31일 (목) 기간 내 효다닥 유료 상품을 신규 가입하신 고객에 3개월 서비스 사용료를 무료로 제공합니다. 무료로 제공되는 기간 사용 인원에 대한 제한은 없습니다.
– 본 혜택은 고객 당 1회만 제공되며, 가입 기간 내 최초 가입한 상품에 적용됩니다.
– 3개월 무료 기간은 가입 후 평일 기준 2~3일 내로 Admin 서비스에서 확인할 수 있습니다. 본 혜택과 무관하게 가입 프로세스 시 30일 무료 체험 및 30일 무료 체험 기간이 노출되는 점 참고하시기 바랍니다. (확인 경로 : Admin > 업그레이드 > 이용 현황 > 구매 정보 > 계약 상태)
– 무료로 제공되는 기간 중 또는 기간 이후에 원하는 상품으로 유료 전환하여 계속 사용할 수 있습니다.
– 본 혜택은 K-비대면 서비스 바우처 사업으로 효다닥 사용료 할인을 지원 받는 고객에게 중복 적용되지 않습니다.
– 본 혜택은 효다닥클라우드 워크플레이스의 콜라보 라이트, 콜라보, 콜라보+  상품 고객에게 적용되지 않습니다. 

이와 관련해서 궁금한 점이 있으신 분은 효다닥 온라인 문의하기로 문의 부탁드립니다.
감사합니다.`,
    },
    {
        idx: 6,
        category: 'notification',
        title: 'Chrome 91 업데이트에 따른 로그인 오류 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

    Chrome 브라우저의 91버전 업데이트 후 그룹웨어 결합상품에서 효다닥 로그인이 불가합니다.
    \t– 대상 버전 : Chromium 91 버전(Chrome, Whale, Edge)
    \t– Internet Explorer와 Safari 브라우저는 정상적으로 사용이 가능합니다.
    \t(Safari 브라우저는 공식 지원이 종료되었으나, 로그인 이슈로 인해 한시적으로 이용을 안내드립니다.)
    
    Chrome 브라우저 91버전부터 보안 정책 강화의 일환으로
    현재 사이트에서 도메인이 다른 3rd party 쿠키를 허용하지 않도록 새로운 쿠키 정책이 적용되었습니다.
    
    이에 따라, 고객사 자체 그룹웨어 포탈을 통해 효다닥을 접속하거나
    일부 파트너사에서 제공하고 있는 그룹웨어 결합형 효다닥을 사용하고 계시는 경우,
    포탈 사이트에서 효다닥으로 로그인이 불가한 현상이 발생하고 있습니다.
    
    브라우저 보안 정책은 새로운 공격을 방어하기 위해 계속해서 진화하고 변경됩니다.
    이번 Chrome의 조치는 사이트간 쿠키기반 요청 위조(CSRF, Cross-Site Request Forgery) 공격을 방지하기 위한 보안 강화 차원에서 진행이 되었고,
    향후 다른 브라우저에도 동일한 조치가 적용될 수 있습니다.
    
    \t※CSRF(Cross-Site Request Forgery)란?
    \t사용자가 피싱(Phishing) 사이트에 접근하게 되면
    \t피싱사이트는 접근한 사용자의 효다닥 쿠키를 기반으로 효다닥를 실행하고,
    \t(피싱을 당한) 사용자의 의지와는 무관하게 공격자가 의도한 행위(결제, 수정, 삭제, 등록 등)를 할 수 있습니다.
    
    이러한 보안 강화 흐름에 맞춰 자체 포탈 및 그룹웨어에 효다닥을 결합하여 사용하는 경우
    iframe 방식이 아닌 팝업 방식으로 구현하여 브라우저에서 요구하는 보안 정책을 준수해주시면 감사하겠습니다.
    
    관련 자세한 사항은 각 회사의 IT 관리자 및 그룹웨어를 제공한 파트너사를 통해 문의주시기 바랍니다.
    앞으로도 더 좋은 서비스를 제공하기 위해 지속적으로 노력하겠습니다.
    
    감사합니다.​`,
    },
    {
        idx: 7,
        category: 'notification',
        title: '효다닥 X 오더퀸 결합 서비스 신규 가입 20% 추가 할인 (~12.31)',
        createTime: Date.now(),
        contents: `효다닥과 편리하게 연동 되는 전자결재, 출퇴근 근태관리, 비용, 회계 관리 시스템 워크플레이스 (WORKPLACE)!
    효다닥과 워크플레이스가 만드는 시너지를 낮은 부담으로 경험해 보실 수 있도록 프로모션을 마련했습니다.
    
    👉 효다닥과 워크플레이스를 ‘결합 서비스’ 형태로 처음 사용하시는 고객을 대상으로
    결합 서비스 상시 10% 할인에 더해 20% 추가 할인 프로모션 혜택을 6개월 간 제공합니다.
    
    < 효다닥 X 워크플레이스 20% 추가 할인 프로모션 공지 >
    ▶ 내용 : 효다닥 X 워크플레이스 결합 서비스 신규 가입 고객 20% 추가 할인 혜택 프로모션
    ▶ 기간 : ‘22.10.11(화) ~ ‘22.12.31(토)
    ▶ 대상 : 상기 기간 중 결합 서비스를 신규 유료 사용하는 고객 (월/연간 계약 모두 해당, 인원 수 제한 없음)
    ▶ 혜택 제공 기간 및 방식 : 결합 서비스 유료 사용 시작 일자 기준, 익월 1일부터 6개월 간 자동 적용
    (예시) ’22년 10월 20일 결합 서비스를 월간 또는 연간 계약으로 유료 사용 시작 시, ’22년 11월 1일부터 ‘23년 4월 30일까지 (6개월간) 효다닥과 워크플레이스 서비스 당 이용 요금에 20% 추가 할인이 자동으로 적용됩니다.
    ▶ 주요 참고사항 :
    – 효다닥과 워크플레이스를 결합 서비스로 사용 시 제공되는 ‘10% 할인 혜택’은 상시 적용됩니다. ( ▶할인 내용 자세히 보기 )
    – 본 프로모션 대상자에게는 결합 서비스 10% 할인 요금을 기준으로 6개월간 20% 추가 할인이 적용됩니다.
    – ‘결합 서비스’란 효다닥과 워크플레이스 두 서비스를 함께 사용하는 것을 의미합니다. 두 서비스를 모두 유료로 사용하기 시작하는 시점에 프로모션 적용 대상이 되며 (1) 효다닥과 워크플레이스를 동시에 신규 가입 (2) 효다닥 사용 중에 워크플레이스를 추가로 신규 사용 (3) 워크플레이스 사용 중에 효다닥를 추가로 신규 사용하는 경우를 모두 포함합니다.
    – 효다닥과 워크플레이스 중 하나의 서비스라도 Trial (30일 무료체험) 또는 Free (무료 ) 버전을 사용 중인 경우 대상에서 제외됩니다.
    
    ※ 효다닥 파트너 고객인 경우, 파트너사에 프로모션 혜택 문의 및 워크플레이스 가입 지원을 요청해 주시기 바랍니다.
    (효다닥 관리자 로그인 후 ‘Admin > 파트너’ 메뉴에서 확인)`,
    },
    {
        idx: 8,
        category: 'notification',
        title: '효다닥 서비스 접속 정상화 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.
    
2022년 12월 10일(화) 오후 14시 30분경부터 효다닥 접속오류가 발생하였고
최종 오후 17시 25분에 메일, 메시지, 캘린더 등 및 기능이 모두 정상화되었습니다. 

서비스는 정상화되었으나 서비스 동작에 이슈가 없는지 계속 점검하고 있습니다. 
서비스의 원활한 사용이 어려우신 경우, 고객지원 > 문의하기 로 문의 부탁드립니다.

장시간 업무에 불편을 드려 대단히 죄송합니다. 

감사합니다.`,
    },
    {
        idx: 9,
        category: 'notification',
        title: '효다닥 사용자 무료 교육 안내ㅣ23년 9월 20일(수)',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 사용자를 위한 무료 정기 교육을 안내해 드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 사용자 (사내 효다닥 사용자·관리자)
■ 일정 : 2023년 9월 20일 (수) 10:00 ~ 17:00
■ 장소 : 효다닥 본사 Hcompany Space
■ 프로그램 :
10:00 – 11:00   사용자·관리자를 위한 효다닥 시작하기
11:00 – 12:00   사용자를 위한 효다닥 사용하기 1
12:00 – 13:00   점심시간 
13:30 – 14:30  사용자를 위한 효다닥 사용하기 2 
14:30 – 15:30  관리자를 위한 효다닥 Admin 설정하기 
15:30 – 16:30  사용자·관리자를 위한 워크박스 사용하기 

■ 신청방법 : 교육 신청하기
  ※ 상단 ‘교육 신청하기’를 클릭하신 후 개인 정보를 입력하시면 신청이 완료됩니다. 

■ 안내 사항:
– 본 교육은 ‘사용자·관리자를 위한 워크박스 사용하기’ 교육 세션이 포함되어 있습니다.
– 본 교육은 무료이나 좌석 수가 한정되어 조기 마감될 수 있습니다. 
– 단일 회사에서 여러 명이 참석을 희망하시는 경우, 개인별로 ‘교육 신청하기’ 링크를 통해 신청해 주셔야 합니다.
– 실습 과정이 포함되어 있음으로 개인 노트북을 꼭 지참해주시기 바랍니다.
– 주차 요금을 지원하지 않사오니, 대중교통 이용을 권장드립니다.
– 오프라인 교육은 온라인 동영상으로 제공하지 않습니다. 

감사합니다.`,
    },
    {
        idx: 10,
        category: 'event',
        title: '효다닥 신규 가입자 3개월 무료 제공 혜택',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 브랜드명 변경 기념으로 신규 가입자 대상 효다닥 유료 상품을 3개월 무료로 사용하실 수 있는 혜택을 안내해드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 신규 가입자
■ 가입 기간 : 2022년 05월 24일 (월) ~ 12월 31일 (목)
■ 상품 : 효다닥 유료 상품 (Lite, Basic, Premium)
■ 혜택 : 3개월 서비스 사용료 무료
■ 가입 방법 : 효다닥 브랜드사이트 이용 요금 페이지에서 유료 상품의 [30일 무료 체험하기] 버튼을 클릭 후 가입 진행
■ 안내 :
– 본 혜택은 2022년 05월 24일 (월) ~ 12월 31일 (목) 기간 내 효다닥 유료 상품을 신규 가입하신 고객에 3개월 서비스 사용료를 무료로 제공합니다. 무료로 제공되는 기간 사용 인원에 대한 제한은 없습니다.
– 본 혜택은 고객 당 1회만 제공되며, 가입 기간 내 최초 가입한 상품에 적용됩니다.
– 3개월 무료 기간은 가입 후 평일 기준 2~3일 내로 Admin 서비스에서 확인할 수 있습니다. 본 혜택과 무관하게 가입 프로세스 시 30일 무료 체험 및 30일 무료 체험 기간이 노출되는 점 참고하시기 바랍니다. (확인 경로 : Admin > 업그레이드 > 이용 현황 > 구매 정보 > 계약 상태)
– 무료로 제공되는 기간 중 또는 기간 이후에 원하는 상품으로 유료 전환하여 계속 사용할 수 있습니다.
– 본 혜택은 K-비대면 서비스 바우처 사업으로 효다닥 사용료 할인을 지원 받는 고객에게 중복 적용되지 않습니다.
– 본 혜택은 효다닥클라우드 워크플레이스의 콜라보 라이트, 콜라보, 콜라보+  상품 고객에게 적용되지 않습니다. 

이와 관련해서 궁금한 점이 있으신 분은 효다닥 온라인 문의하기로 문의 부탁드립니다.
감사합니다.`,
    },
    {
        idx: 11,
        category: 'notification',
        title: 'Chrome 91 업데이트에 따른 로그인 오류 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

    Chrome 브라우저의 91버전 업데이트 후 그룹웨어 결합상품에서 효다닥 로그인이 불가합니다.
    \t– 대상 버전 : Chromium 91 버전(Chrome, Whale, Edge)
    \t– Internet Explorer와 Safari 브라우저는 정상적으로 사용이 가능합니다.
    \t(Safari 브라우저는 공식 지원이 종료되었으나, 로그인 이슈로 인해 한시적으로 이용을 안내드립니다.)
    
    Chrome 브라우저 91버전부터 보안 정책 강화의 일환으로
    현재 사이트에서 도메인이 다른 3rd party 쿠키를 허용하지 않도록 새로운 쿠키 정책이 적용되었습니다.
    
    이에 따라, 고객사 자체 그룹웨어 포탈을 통해 효다닥을 접속하거나
    일부 파트너사에서 제공하고 있는 그룹웨어 결합형 효다닥을 사용하고 계시는 경우,
    포탈 사이트에서 효다닥으로 로그인이 불가한 현상이 발생하고 있습니다.
    
    브라우저 보안 정책은 새로운 공격을 방어하기 위해 계속해서 진화하고 변경됩니다.
    이번 Chrome의 조치는 사이트간 쿠키기반 요청 위조(CSRF, Cross-Site Request Forgery) 공격을 방지하기 위한 보안 강화 차원에서 진행이 되었고,
    향후 다른 브라우저에도 동일한 조치가 적용될 수 있습니다.
    
    \t※CSRF(Cross-Site Request Forgery)란?
    \t사용자가 피싱(Phishing) 사이트에 접근하게 되면
    \t피싱사이트는 접근한 사용자의 효다닥 쿠키를 기반으로 효다닥를 실행하고,
    \t(피싱을 당한) 사용자의 의지와는 무관하게 공격자가 의도한 행위(결제, 수정, 삭제, 등록 등)를 할 수 있습니다.
    
    이러한 보안 강화 흐름에 맞춰 자체 포탈 및 그룹웨어에 효다닥을 결합하여 사용하는 경우
    iframe 방식이 아닌 팝업 방식으로 구현하여 브라우저에서 요구하는 보안 정책을 준수해주시면 감사하겠습니다.
    
    관련 자세한 사항은 각 회사의 IT 관리자 및 그룹웨어를 제공한 파트너사를 통해 문의주시기 바랍니다.
    앞으로도 더 좋은 서비스를 제공하기 위해 지속적으로 노력하겠습니다.
    
    감사합니다.​`,
    },
    {
        idx: 12,
        category: 'event',
        title: '효다닥 X 오더퀸 결합 서비스 신규 가입 20% 추가 할인 (~12.31)',
        createTime: Date.now(),
        contents: `효다닥과 편리하게 연동 되는 전자결재, 출퇴근 근태관리, 비용, 회계 관리 시스템 워크플레이스 (WORKPLACE)!
    효다닥과 워크플레이스가 만드는 시너지를 낮은 부담으로 경험해 보실 수 있도록 프로모션을 마련했습니다.
    
    👉 효다닥과 워크플레이스를 ‘결합 서비스’ 형태로 처음 사용하시는 고객을 대상으로
    결합 서비스 상시 10% 할인에 더해 20% 추가 할인 프로모션 혜택을 6개월 간 제공합니다.
    
    < 효다닥 X 워크플레이스 20% 추가 할인 프로모션 공지 >
    ▶ 내용 : 효다닥 X 워크플레이스 결합 서비스 신규 가입 고객 20% 추가 할인 혜택 프로모션
    ▶ 기간 : ‘22.10.11(화) ~ ‘22.12.31(토)
    ▶ 대상 : 상기 기간 중 결합 서비스를 신규 유료 사용하는 고객 (월/연간 계약 모두 해당, 인원 수 제한 없음)
    ▶ 혜택 제공 기간 및 방식 : 결합 서비스 유료 사용 시작 일자 기준, 익월 1일부터 6개월 간 자동 적용
    (예시) ’22년 10월 20일 결합 서비스를 월간 또는 연간 계약으로 유료 사용 시작 시, ’22년 11월 1일부터 ‘23년 4월 30일까지 (6개월간) 효다닥과 워크플레이스 서비스 당 이용 요금에 20% 추가 할인이 자동으로 적용됩니다.
    ▶ 주요 참고사항 :
    – 효다닥과 워크플레이스를 결합 서비스로 사용 시 제공되는 ‘10% 할인 혜택’은 상시 적용됩니다. ( ▶할인 내용 자세히 보기 )
    – 본 프로모션 대상자에게는 결합 서비스 10% 할인 요금을 기준으로 6개월간 20% 추가 할인이 적용됩니다.
    – ‘결합 서비스’란 효다닥과 워크플레이스 두 서비스를 함께 사용하는 것을 의미합니다. 두 서비스를 모두 유료로 사용하기 시작하는 시점에 프로모션 적용 대상이 되며 (1) 효다닥과 워크플레이스를 동시에 신규 가입 (2) 효다닥 사용 중에 워크플레이스를 추가로 신규 사용 (3) 워크플레이스 사용 중에 효다닥를 추가로 신규 사용하는 경우를 모두 포함합니다.
    – 효다닥과 워크플레이스 중 하나의 서비스라도 Trial (30일 무료체험) 또는 Free (무료 ) 버전을 사용 중인 경우 대상에서 제외됩니다.
    
    ※ 효다닥 파트너 고객인 경우, 파트너사에 프로모션 혜택 문의 및 워크플레이스 가입 지원을 요청해 주시기 바랍니다.
    (효다닥 관리자 로그인 후 ‘Admin > 파트너’ 메뉴에서 확인)`,
    },
    {
        idx: 13,
        category: 'notification',
        title: '효다닥 서비스 접속 정상화 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.
    
2022년 12월 10일(화) 오후 14시 30분경부터 효다닥 접속오류가 발생하였고
최종 오후 17시 25분에 메일, 메시지, 캘린더 등 및 기능이 모두 정상화되었습니다. 

서비스는 정상화되었으나 서비스 동작에 이슈가 없는지 계속 점검하고 있습니다. 
서비스의 원활한 사용이 어려우신 경우, 고객지원 > 문의하기 로 문의 부탁드립니다.

장시간 업무에 불편을 드려 대단히 죄송합니다. 

감사합니다.`,
    },
    {
        idx: 14,
        category: 'event',
        title: '효다닥 사용자 무료 교육 안내ㅣ23년 9월 20일(수)',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 사용자를 위한 무료 정기 교육을 안내해 드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 사용자 (사내 효다닥 사용자·관리자)
■ 일정 : 2023년 9월 20일 (수) 10:00 ~ 17:00
■ 장소 : 효다닥 본사 Hcompany Space
■ 프로그램 :
10:00 – 11:00   사용자·관리자를 위한 효다닥 시작하기
11:00 – 12:00   사용자를 위한 효다닥 사용하기 1
12:00 – 13:00   점심시간 
13:30 – 14:30  사용자를 위한 효다닥 사용하기 2 
14:30 – 15:30  관리자를 위한 효다닥 Admin 설정하기 
15:30 – 16:30  사용자·관리자를 위한 워크박스 사용하기 

■ 신청방법 : 교육 신청하기
  ※ 상단 ‘교육 신청하기’를 클릭하신 후 개인 정보를 입력하시면 신청이 완료됩니다. 

■ 안내 사항:
– 본 교육은 ‘사용자·관리자를 위한 워크박스 사용하기’ 교육 세션이 포함되어 있습니다.
– 본 교육은 무료이나 좌석 수가 한정되어 조기 마감될 수 있습니다. 
– 단일 회사에서 여러 명이 참석을 희망하시는 경우, 개인별로 ‘교육 신청하기’ 링크를 통해 신청해 주셔야 합니다.
– 실습 과정이 포함되어 있음으로 개인 노트북을 꼭 지참해주시기 바랍니다.
– 주차 요금을 지원하지 않사오니, 대중교통 이용을 권장드립니다.
– 오프라인 교육은 온라인 동영상으로 제공하지 않습니다. 

감사합니다.`,
    },
    {
        idx: 15,
        category: 'event',
        title: '효다닥 신규 가입자 3개월 무료 제공 혜택',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 브랜드명 변경 기념으로 신규 가입자 대상 효다닥 유료 상품을 3개월 무료로 사용하실 수 있는 혜택을 안내해드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 신규 가입자
■ 가입 기간 : 2022년 05월 24일 (월) ~ 12월 31일 (목)
■ 상품 : 효다닥 유료 상품 (Lite, Basic, Premium)
■ 혜택 : 3개월 서비스 사용료 무료
■ 가입 방법 : 효다닥 브랜드사이트 이용 요금 페이지에서 유료 상품의 [30일 무료 체험하기] 버튼을 클릭 후 가입 진행
■ 안내 :
– 본 혜택은 2022년 05월 24일 (월) ~ 12월 31일 (목) 기간 내 효다닥 유료 상품을 신규 가입하신 고객에 3개월 서비스 사용료를 무료로 제공합니다. 무료로 제공되는 기간 사용 인원에 대한 제한은 없습니다.
– 본 혜택은 고객 당 1회만 제공되며, 가입 기간 내 최초 가입한 상품에 적용됩니다.
– 3개월 무료 기간은 가입 후 평일 기준 2~3일 내로 Admin 서비스에서 확인할 수 있습니다. 본 혜택과 무관하게 가입 프로세스 시 30일 무료 체험 및 30일 무료 체험 기간이 노출되는 점 참고하시기 바랍니다. (확인 경로 : Admin > 업그레이드 > 이용 현황 > 구매 정보 > 계약 상태)
– 무료로 제공되는 기간 중 또는 기간 이후에 원하는 상품으로 유료 전환하여 계속 사용할 수 있습니다.
– 본 혜택은 K-비대면 서비스 바우처 사업으로 효다닥 사용료 할인을 지원 받는 고객에게 중복 적용되지 않습니다.
– 본 혜택은 효다닥클라우드 워크플레이스의 콜라보 라이트, 콜라보, 콜라보+  상품 고객에게 적용되지 않습니다. 

이와 관련해서 궁금한 점이 있으신 분은 효다닥 온라인 문의하기로 문의 부탁드립니다.
감사합니다.`,
    },
    {
        idx: 16,
        category: 'notification',
        title: 'Chrome 91 업데이트에 따른 로그인 오류 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

    Chrome 브라우저의 91버전 업데이트 후 그룹웨어 결합상품에서 효다닥 로그인이 불가합니다.
    \t– 대상 버전 : Chromium 91 버전(Chrome, Whale, Edge)
    \t– Internet Explorer와 Safari 브라우저는 정상적으로 사용이 가능합니다.
    \t(Safari 브라우저는 공식 지원이 종료되었으나, 로그인 이슈로 인해 한시적으로 이용을 안내드립니다.)
    
    Chrome 브라우저 91버전부터 보안 정책 강화의 일환으로
    현재 사이트에서 도메인이 다른 3rd party 쿠키를 허용하지 않도록 새로운 쿠키 정책이 적용되었습니다.
    
    이에 따라, 고객사 자체 그룹웨어 포탈을 통해 효다닥을 접속하거나
    일부 파트너사에서 제공하고 있는 그룹웨어 결합형 효다닥을 사용하고 계시는 경우,
    포탈 사이트에서 효다닥으로 로그인이 불가한 현상이 발생하고 있습니다.
    
    브라우저 보안 정책은 새로운 공격을 방어하기 위해 계속해서 진화하고 변경됩니다.
    이번 Chrome의 조치는 사이트간 쿠키기반 요청 위조(CSRF, Cross-Site Request Forgery) 공격을 방지하기 위한 보안 강화 차원에서 진행이 되었고,
    향후 다른 브라우저에도 동일한 조치가 적용될 수 있습니다.
    
    \t※CSRF(Cross-Site Request Forgery)란?
    \t사용자가 피싱(Phishing) 사이트에 접근하게 되면
    \t피싱사이트는 접근한 사용자의 효다닥 쿠키를 기반으로 효다닥를 실행하고,
    \t(피싱을 당한) 사용자의 의지와는 무관하게 공격자가 의도한 행위(결제, 수정, 삭제, 등록 등)를 할 수 있습니다.
    
    이러한 보안 강화 흐름에 맞춰 자체 포탈 및 그룹웨어에 효다닥을 결합하여 사용하는 경우
    iframe 방식이 아닌 팝업 방식으로 구현하여 브라우저에서 요구하는 보안 정책을 준수해주시면 감사하겠습니다.
    
    관련 자세한 사항은 각 회사의 IT 관리자 및 그룹웨어를 제공한 파트너사를 통해 문의주시기 바랍니다.
    앞으로도 더 좋은 서비스를 제공하기 위해 지속적으로 노력하겠습니다.
    
    감사합니다.​`,
    },
    {
        idx: 17,
        category: 'event',
        title: '효다닥 X 오더퀸 결합 서비스 신규 가입 20% 추가 할인 (~12.31)',
        createTime: Date.now(),
        contents: `효다닥과 편리하게 연동 되는 전자결재, 출퇴근 근태관리, 비용, 회계 관리 시스템 워크플레이스 (WORKPLACE)!
    효다닥과 워크플레이스가 만드는 시너지를 낮은 부담으로 경험해 보실 수 있도록 프로모션을 마련했습니다.
    
    👉 효다닥과 워크플레이스를 ‘결합 서비스’ 형태로 처음 사용하시는 고객을 대상으로
    결합 서비스 상시 10% 할인에 더해 20% 추가 할인 프로모션 혜택을 6개월 간 제공합니다.
    
    < 효다닥 X 워크플레이스 20% 추가 할인 프로모션 공지 >
    ▶ 내용 : 효다닥 X 워크플레이스 결합 서비스 신규 가입 고객 20% 추가 할인 혜택 프로모션
    ▶ 기간 : ‘22.10.11(화) ~ ‘22.12.31(토)
    ▶ 대상 : 상기 기간 중 결합 서비스를 신규 유료 사용하는 고객 (월/연간 계약 모두 해당, 인원 수 제한 없음)
    ▶ 혜택 제공 기간 및 방식 : 결합 서비스 유료 사용 시작 일자 기준, 익월 1일부터 6개월 간 자동 적용
    (예시) ’22년 10월 20일 결합 서비스를 월간 또는 연간 계약으로 유료 사용 시작 시, ’22년 11월 1일부터 ‘23년 4월 30일까지 (6개월간) 효다닥과 워크플레이스 서비스 당 이용 요금에 20% 추가 할인이 자동으로 적용됩니다.
    ▶ 주요 참고사항 :
    – 효다닥과 워크플레이스를 결합 서비스로 사용 시 제공되는 ‘10% 할인 혜택’은 상시 적용됩니다. ( ▶할인 내용 자세히 보기 )
    – 본 프로모션 대상자에게는 결합 서비스 10% 할인 요금을 기준으로 6개월간 20% 추가 할인이 적용됩니다.
    – ‘결합 서비스’란 효다닥과 워크플레이스 두 서비스를 함께 사용하는 것을 의미합니다. 두 서비스를 모두 유료로 사용하기 시작하는 시점에 프로모션 적용 대상이 되며 (1) 효다닥과 워크플레이스를 동시에 신규 가입 (2) 효다닥 사용 중에 워크플레이스를 추가로 신규 사용 (3) 워크플레이스 사용 중에 효다닥를 추가로 신규 사용하는 경우를 모두 포함합니다.
    – 효다닥과 워크플레이스 중 하나의 서비스라도 Trial (30일 무료체험) 또는 Free (무료 ) 버전을 사용 중인 경우 대상에서 제외됩니다.
    
    ※ 효다닥 파트너 고객인 경우, 파트너사에 프로모션 혜택 문의 및 워크플레이스 가입 지원을 요청해 주시기 바랍니다.
    (효다닥 관리자 로그인 후 ‘Admin > 파트너’ 메뉴에서 확인)`,
    },
    {
        idx: 18,
        category: 'notification',
        title: '효다닥 서비스 접속 정상화 안내',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.
    
2022년 12월 10일(화) 오후 14시 30분경부터 효다닥 접속오류가 발생하였고
최종 오후 17시 25분에 메일, 메시지, 캘린더 등 및 기능이 모두 정상화되었습니다. 

서비스는 정상화되었으나 서비스 동작에 이슈가 없는지 계속 점검하고 있습니다. 
서비스의 원활한 사용이 어려우신 경우, 고객지원 > 문의하기 로 문의 부탁드립니다.

장시간 업무에 불편을 드려 대단히 죄송합니다. 

감사합니다.`,
    },
    {
        idx: 19,
        category: 'event',
        title: '효다닥 사용자 무료 교육 안내ㅣ23년 9월 20일(수)',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 사용자를 위한 무료 정기 교육을 안내해 드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 사용자 (사내 효다닥 사용자·관리자)
■ 일정 : 2023년 9월 20일 (수) 10:00 ~ 17:00
■ 장소 : 효다닥 본사 Hcompany Space
■ 프로그램 :
10:00 – 11:00   사용자·관리자를 위한 효다닥 시작하기
11:00 – 12:00   사용자를 위한 효다닥 사용하기 1
12:00 – 13:00   점심시간 
13:30 – 14:30  사용자를 위한 효다닥 사용하기 2 
14:30 – 15:30  관리자를 위한 효다닥 Admin 설정하기 
15:30 – 16:30  사용자·관리자를 위한 워크박스 사용하기 

■ 신청방법 : 교육 신청하기
  ※ 상단 ‘교육 신청하기’를 클릭하신 후 개인 정보를 입력하시면 신청이 완료됩니다. 

■ 안내 사항:
– 본 교육은 ‘사용자·관리자를 위한 워크박스 사용하기’ 교육 세션이 포함되어 있습니다.
– 본 교육은 무료이나 좌석 수가 한정되어 조기 마감될 수 있습니다. 
– 단일 회사에서 여러 명이 참석을 희망하시는 경우, 개인별로 ‘교육 신청하기’ 링크를 통해 신청해 주셔야 합니다.
– 실습 과정이 포함되어 있음으로 개인 노트북을 꼭 지참해주시기 바랍니다.
– 주차 요금을 지원하지 않사오니, 대중교통 이용을 권장드립니다.
– 오프라인 교육은 온라인 동영상으로 제공하지 않습니다. 

감사합니다.`,
    },
    {
        idx: 20,
        category: 'event',
        title: '효다닥 신규 가입자 3개월 무료 제공 혜택',
        createTime: Date.now(),
        contents: `안녕하세요, 효다닥입니다.

효다닥 브랜드명 변경 기념으로 신규 가입자 대상 효다닥 유료 상품을 3개월 무료로 사용하실 수 있는 혜택을 안내해드립니다.

자세한 내용은 아래 참고해주시기 바랍니다.

■ 대상 : 효다닥 신규 가입자
■ 가입 기간 : 2022년 05월 24일 (월) ~ 12월 31일 (목)
■ 상품 : 효다닥 유료 상품 (Lite, Basic, Premium)
■ 혜택 : 3개월 서비스 사용료 무료
■ 가입 방법 : 효다닥 브랜드사이트 이용 요금 페이지에서 유료 상품의 [30일 무료 체험하기] 버튼을 클릭 후 가입 진행
■ 안내 :
– 본 혜택은 2022년 05월 24일 (월) ~ 12월 31일 (목) 기간 내 효다닥 유료 상품을 신규 가입하신 고객에 3개월 서비스 사용료를 무료로 제공합니다. 무료로 제공되는 기간 사용 인원에 대한 제한은 없습니다.
– 본 혜택은 고객 당 1회만 제공되며, 가입 기간 내 최초 가입한 상품에 적용됩니다.
– 3개월 무료 기간은 가입 후 평일 기준 2~3일 내로 Admin 서비스에서 확인할 수 있습니다. 본 혜택과 무관하게 가입 프로세스 시 30일 무료 체험 및 30일 무료 체험 기간이 노출되는 점 참고하시기 바랍니다. (확인 경로 : Admin > 업그레이드 > 이용 현황 > 구매 정보 > 계약 상태)
– 무료로 제공되는 기간 중 또는 기간 이후에 원하는 상품으로 유료 전환하여 계속 사용할 수 있습니다.
– 본 혜택은 K-비대면 서비스 바우처 사업으로 효다닥 사용료 할인을 지원 받는 고객에게 중복 적용되지 않습니다.
– 본 혜택은 효다닥클라우드 워크플레이스의 콜라보 라이트, 콜라보, 콜라보+  상품 고객에게 적용되지 않습니다. 

이와 관련해서 궁금한 점이 있으신 분은 효다닥 온라인 문의하기로 문의 부탁드립니다.
감사합니다.`,
    },
]



const init = async(req, res) => {
    try{
        const NOTICE = await Notice.insertMany(
            noticeList
        )
        if(!NOTICE) return res.status(400).json("실패");
        return res.status(200).json("초기데이터 셋 성공");
    }catch (err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const getAllNotices = async(req, res) => {
    try{
        const allNotices = await Notice.find({});
        if(!allNotices) return res.status(400).json("실패");
        return res.status(200).json(allNotices);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}

const selectNoticeOne = async (req, res) => {
    try {
        const noticeOne = await Notice.findOne({
            _id: req.params.id
        });
        if(!noticeOne) return res.status(400).json("해당 공지 없음");
        console.log(noticeOne);
        return res.status(200).json(noticeOne);
    }catch(err){
        console.log(err);
        res.status(500).json("오류 발생");
    }
}
module.exports = {
    init, getAllNotices, selectNoticeOne
}