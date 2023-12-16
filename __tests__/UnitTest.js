import App from '../src/App.js';

describe('기능 테스트', () => {
    const app = new App();

    test('월이 1~12의 숫자가 아닌 경우', () => { 
        expect(() => {
            app.getMonthAndDay('13, 월');
        }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    });

    test('월이 1~12의 숫자가 아닌 경우', () => {
        expact(() => {
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

});
