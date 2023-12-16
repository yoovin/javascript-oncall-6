const holidays = {
    1: [1],
    3: [1],
    5: [5],
    6: [6],
    8: [15],
    10: [3, 9],
    12: [25]
}

class App {

    pointer = [0, 0];

    async run() {}

    getMonthAndDay(text) {
        if(text === ''){
            throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
        }

        let [month, day] = text.split(',').map(item => item.trim());
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

    getWorkers(text) {
        if(text === ''){
            throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
        }

        const workers = text.split(',').map((worker) => worker.trim());
        if(!this.workerValication(workers)){
            throw new Error('[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.');
        }
        return workers
    }

    workerValication(workers) {
        const set = new Set(workers);
        if (set.size !== workers.length) {
            return false;
        }

        if (workers.length > 35) {
            return false;
        }

        for (let worker of workers) {
            if (worker.length > 5) {
                return false;
            }
        }

        return true;
    }

    devideDay(month, date, dayOfWeek) {
        if (dayOfWeek === '토' || dayOfWeek === '일') {
            return 'W';
        }

        if(holidays[month].includes(date)){
            return 'H';
        }

        return 'D';
    }
    
}

export default App;
