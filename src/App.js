class App {
    async run() {}

    getMonthAndDay(text) {
        let [month, day] = text.split(',');
        month = Number(month);
        day = day.trim();

        if(!this.monthValidation(month) || !this.dayValidation(day)){
            throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
        }

        return [month, day]
    }

    monthValidation(month) {
        if (month >= 1 && month <= 12) {
            return true;
        }
        return false;
    }

    dayValidation(day) {
        const days = ['월', '화', '수', '목', '금', '토', '일'];
        if (days.includes(day)) {
            return true;
        }
        return false;
    }

    getWorkers() {
        return []
    }
}

export default App;
