import { MissionUtils } from '@woowacourse/mission-utils';

const holidays = {
    1: [1],
    3: [1],
    5: [5],
    6: [6],
    8: [15],
    10: [3, 9],
    12: [25]
}

const lastDates = {
    1: 31,
    2: 28,
    3: 31,
    4: 30, 
    5: 31,
    6: 30, 
    7: 31,
    8: 31,
    9: 30, 
    10: 31,
    11: 30, 
    12: 31
}

const days = ['월', '화', '수', '목', '금', '토', '일'];

class App {

    pointer = [0, 0];
    weekdayChangeLog = {};
    weekendChangeLog = {};

    async run() {
        const [month, day] = await this.getUserMonthAndDay();
        const [weekdayWorkers, weekendWorkers] = await this.getUserWorkers();
        this.weekdayWorkers = weekdayWorkers;
        this.weekendWorkers = weekendWorkers;
        this.printSchedule(month, day);

    }

    async getUserMonthAndDay() {
        try {
            const input = await MissionUtils.Console.readLineAsync(
                '비상 근무를 배정할 월과 시작 요일을 입력하세요> '
            );
            return this.getMonthAndDay(input);
        } catch (e) {
            MissionUtils.Console.print(e.message);
            return this.getUserMonthAndDay()
        }
    }

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

    async getUserWorkers() {
        try {
            const inputWeekday = await MissionUtils.Console.readLineAsync(
                '평일 비상 근무 순번대로 사원 닉네임을 입력하세요> '
            );
            const inputWeekend = await MissionUtils.Console.readLineAsync(
                '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> '
            );
            return [this.getWorkers(inputWeekday), this.getWorkers(inputWeekend)];
        } catch (e) {
            MissionUtils.Console.print(e.message);
            return this.getUserWorkers();
        }
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

    getNextWorker(preWorker, day) {
        let worker = '';

        if(day === 'D') {
            worker = this.getNextFromWeekday()
            this.pointer[0] = (this.pointer[0] + 1) % this.weekdayWorkers.length;

            if(worker === preWorker){
                const newWorker = this.getNextFromWeekday();
                this.weekdayChangeLog[newWorker] = worker;
                worker = newWorker;
            }

            return worker;
        }

        worker = this.getNextFromWeekend();
        this.pointer[1] = (this.pointer[1] + 1) % this.weekendWorkers.length;

        if(worker === preWorker){
            const newWorker = this.getNextFromWeekend();
            this.weekendChangeLog[newWorker] = worker;
            worker = newWorker;  
        }

        return worker
    }

    getNextFromWeekday() {
        let worker = this.weekdayWorkers[this.pointer[0]];

        if(this.weekdayChangeLog[worker]){
            worker = this.weekdayChangeLog[worker];
            this.weekdayChangeLog[worker] = null;
        }

        return worker;
    }

    getNextFromWeekend() {
        let worker = this.weekendWorkers[this.pointer[1]];

        if(this.weekendChangeLog[worker]){
            worker = this.weekendChangeLog[worker];
            this.weekendChangeLog[worker] = null;
        }

        return worker;
    }

    printSchedule(month, day) {
        const lastDate = lastDates[month];
        const firstDay = days.indexOf(day);
        for(let i = 1; i <= lastDate; i++){
            const day = days[(firstDay + i-1) % 7]
            const dayOfWeek = this.devideDay(month, i, day);
            const worker = this.getNextWorker('', dayOfWeek);
            if(dayOfWeek === 'H'){
                MissionUtils.Console.print(`${month}월 ${i}일 ${day}(휴일) : ${worker}`);
                continue;
            }
            MissionUtils.Console.print(`${month}월 ${i}일 ${day} : ${worker}`);
        }
    }
}

export default App;
