import App from '../src/App.js';

describe('날짜 입력 테스트', () => {
    const app = new App();

    test('날짜 입력이 공백인 경우', () => {
        expect(() => {
            app.getMonthAndDay('');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

    test('월이 1~12의 숫자가 아닌 경우', () => { 
        expect(() => {
            app.getMonthAndDay('13, 월');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

    test('월이 1~12의 숫자가 아닌 경우', () => {
        expect(() => {
            app.getMonthAndDay('0, 수');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

    test('월이 1~12의 숫자인 경우', () => {
        expect(app.getMonthAndDay('12, 월')).toEqual([12, '월']);
    });

    test('요일이 월~일이 아닌 경우', () => {
        expect(() => {
            app.getMonthAndDay('12, 해');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

    test('요일이 월~일인 경우', () => {
        expect(app.getMonthAndDay('6, 수')).toEqual([6, '수']);
    });

    test('날짜 입력이 공백인 경우', () => {
        expect(() => {
            app.getMonthAndDay('');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

});

describe('근무자 입력 테스트', () => {
    const app = new App();
    test('근무자 입력이 공백인 경우', () => {
        expect(() => {
            app.getWorkers('');
        }).toThrow('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    });

    test('근무자의 이름이 중복되는 경우', () => {
        expect(() => {
            app.getWorkers('유빈, 유빈');
        }).toThrow('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    });

    test('근무자의 닉네임이 5자를 넘어가는 경우', () => {
        expect(() => {
            app.getWorkers('유빈, 유빈이멋져용, 잉여');
        }).toThrow('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    });

    test('근무자의 인원이 35명을 넘어가는 경우', () => {
        expect(() => {
            app.getWorkers('비비,푸푸,찰리,모찌,심쿵,윙클,미우,뚜뚜,터틀,꾸꾸,뚜루,뿅뿅,꼬마,랄랄,라임,뿜뿜,미끄,비비,뽀뽀,해피,뿌잉,심쿵,뚜뚜,미우,비비,티라,라임,꼬마,뚜뚜,찰리,뿅뿅,뽀뽀,윙크,푸푸,해피,미우');
        }).toThrow('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
    });

    test('근무자의 인원이 형식에 맞게 입력되는 경우', () => {
        expect(app.getWorkers('준팍,도밥,고니,수아,루루,글로,솔로스타,우코,슬링키,참새,도리')).toEqual(['준팍', '도밥', '고니', '수아', '루루', '글로', '솔로스타', '우코', '슬링키', '참새', '도리']);
    });
});

describe('날 구분 테스트', () => {
    const app = new App();
    test('평일인 경우', () => {
        expect(app.devideDay(5, 2, '화')).toEqual('D');
    });

    test('주말인 경우', () => {
        expect(app.devideDay(5, 2, '토')).toEqual('W');
    });

    test('평일인 공휴일인 경우', () => {
        expect(app.devideDay(5, 5, '화')).toEqual('H');
    });

    test('주말인 공휴일인 경우 주말로 구분한다.', () => {
        expect(app.devideDay(5, 5, '토')).toEqual('W');
    });
});

describe('근무자 배치 테스트', () => {
    const app = new App();
    app.weekdayWorkers = ['준팍','도밥','솔로스타','고니','수아','루루','글로','우코','슬링키','참새','도리'];
    app.weekendWorkers = ['글로','솔로스타','우코','슬링키','참새','도리','준팍','도밥','고니','수아','루루'];

    test('다음으로 근무 할 평일 근무자를 받는다.', () => {
        expect(app.getNextWorker('준팍', 'D')).toEqual('도밥');
    });

    test('다음으로 근무 할 주말 근무자를 받는다.', () => {
        expect(app.getNextWorker('도밥', 'W')).toEqual('글로');
    });

    test('다음으로 근무 할 공휴일 근무자를 받는다.', () => {
        expect(app.getNextWorker('글로', 'H')).toEqual('솔로스타');
    });

    test('이전에 근무한 근무자가 다음 근무면 건너 뛴다.', () => {
        expect(app.getNextWorker('솔로스타', 'D')).toEqual('고니');
    });
})
