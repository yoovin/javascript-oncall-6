import App from '../src/App.js';

describe('기능 테스트', () => {
    const app = new App();

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
            app.getMonthAndDay('12, 화');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

    test('요일이 월~일인 경우', () => {
        expect(app.getMonthAndDay('6, 수')).toEqual([6, '수']);
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
        expect(() => {
            app.getWorkers('준팍,도밥,고니,수아,루루,글로,솔로스타,우코,슬링키,참새,도리');
        }).toEqual(['준팍', '도밥', '고니', '수아', '루루', '글로', '솔로스타', '우코', '슬링키', '참새', '도리']);
    });

});
