const accountState = {
    data(){
        return{
            message:{
                accept: '可登入',
                error: '登入5次錯誤，3小時後自動解鎖',
                danger: '登入10次錯誤',
            },
            state: 'danger',
        }
    },
    methods: {
        unlock() {
            if (confirm("解鎖此民眾的登入帳號？") == true) {
                alert('帳號解鎖成功\n民眾憑身份證號及最近 180 天中，其中一筆就醫紀錄的西元年月日登入數位醫療證明申請網站');
                this.state = 'accept';
            } else {
                alert('帳號解鎖失敗\n解鎖失敗，請重新嘗試');
            }
        },
    },
    computed: {
        stateMessage: function(){
            if(this.state == 'accept'){
                return this.message.accept;
            }else if(this.state == 'error'){
                return this.message.error;
            }else if(this.state == 'danger'){
                return this.message.danger;
            }
        }
    }
}
Vue.createApp(accountState).mount('#digit-account');

const certificateManagement = {
    data() {
        return {
            allRecord: [{date:'2022/03/01',status:'已下載',department:'家醫科',kind:'收據',downloadLimit:'-'},
            {date:'2022/02/20',status:'可下載',department:'感染科',kind:'診斷書',downloadLimit:'2022/02/27'},
            {date:'2022/01/15',status:'可下載',department:'家醫科',kind:'收據',downloadLimit:'2022/01/22'},
            {date:'2021/12/20',status:'已下載',department:'皮膚科',kind:'收據',downloadLimit:'-'},
            {date:'2021/10/20',status:'已下載',department:'精神科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/09/21',status:'可下載',department:'骨科',kind:'收據',downloadLimit:'2021/09/28'},
            {date:'2021/07/01',status:'已下載',department:'感染科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/06/01',status:'可下載',department:'內分泌科',kind:'收據',downloadLimit:'2021/06/08'},
            {date:'2021/05/01',status:'已下載',department:'家醫科',kind:'診斷書',downloadLimit:'-'}],
            kind: '總覽',
            downloadState: '全部',
            sortType: 'date',
            isReverse: false,
            recordCheck: [],
        }
    },
    methods: {
        changeKind(kind) {
            this.kind = kind;
            this.recordCheck = [];
            // var buttons = this.$el.querySelectorAll('.tab-btns .btn');
            // buttons.forEach(element => {
            //     element.classList.remove('active');
            // });
        },
        changeDownloadState(status) {
            this.downloadState = status;
            this.recordCheck = [];
        },
        changeType(type) {
            if (this.sortType == type) {
                this.isReverse = !this.isReverse;
            } else {
                this.isReverse = false;
            }
            this.sortType = type;
        },
        downloadAll(){
            // var $el = this.$el;
            // this.recordCheck.forEach(record => {
            //     console.log($el.querySelector(tr[ref=record]));
            // });
            // console.log(this.$refs);
            var message = '開放數位醫療證明？\n開放後，民眾登入數位醫療證明申請網站進行下載\n';

            this.recordCheck.forEach(record => {
                message = message + record + '\n';
            });
            if (confirm(message) == true) {
                alert('開放下載成功\n民眾憑身份證號及最近 180 天中，其中一筆就醫紀錄的西元年月日登入數位醫療證明申請網站進行下載');
                this.recordCheck = [];
            } else {
                alert('開放下載失敗');
            }
        }
    },
    computed: {
        filteredRecord: function(){
            var recordList = this.allRecord;
            var kind = this.kind;
            var downloadState = this.downloadState;
            var type = this.sortType;
            var isReverse = this.isReverse;

            if(kind == '診斷書' || kind == '收據'){
                recordList = recordList.filter(function(record){
                    if(record.kind == kind){
                        return record;
                    }
                })
            }
            else{
                recordList = recordList;
            }

            if(downloadState == '已下載' || downloadState == '可下載'){
                recordList = recordList.filter(function(record){
                    if(record.status == downloadState){
                        return record;
                    }
                })
            }
            else{
                recordList = recordList;
            }
            
            return recordList.sort(function (a, b) {
                if (isReverse) return b[type] - a[type];
                else return a[type] - b[type];
            });            
        },
        checkNum: function(){
            return this.recordCheck.length;
        }
    }
}
Vue.createApp(certificateManagement).mount('#medical-certificate-management');

const certificateApply = {
    data() {
        return {
            allRecord: [{date:'2022/04/01',status:'2022/04/01 12:36',department:'家醫科',kind:'診斷書',downloadLimit:'-'},
            {date:'2022/03/20',status:'尚未下載',department:'家醫科',kind:'收據',downloadLimit:'2022/09/15'},
            {date:'2022/12/01',status:'2022/12/15 15:03',department:'家醫科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/10/19',status:'尚未下載',department:'家醫科',kind:'收據',downloadLimit:'2022/04/16'},
            {date:'2021/10/10',status:'2022/10/12 15:03',department:'精神科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/09/21',status:'尚未下載',department:'骨科',kind:'收據',downloadLimit:'2021/09/28'},
            {date:'2021/07/01',status:'2022/07/08 15:03',department:'感染科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/06/01',status:'尚未下載',department:'內分泌科',kind:'收據',downloadLimit:'2021/06/08'},
            {date:'2021/05/01',status:'2022/05/07 15:03',department:'家醫科',kind:'診斷書',downloadLimit:'-'}],
            kind: '總覽',
            downloadState: '全部',
            sortType: 'date',
            isReverse: false,
            timeVal: 20,
            timeInterval: null,
            isStart: false,
            startTimeVal: 600,
        }
    },
    methods: {
        changeKind(kind) {
            this.kind = kind;
        },
        changeDownloadState(status) {
            this.downloadState = status;
        },
        changeType(type) {
            if (this.sortType == type) {
                this.isReverse = !this.isReverse;
            } else {
                this.isReverse = false;
            }
            this.sortType = type;
        },
        download(date, kind, department){            
            var message = '下載以下數位證明\n將消耗可下載次數\n'+date
            +' '+kind+' '+department;
            if (confirm(message) == true) {
                alert('下載數位證明成功\n請保管數位證明檔案');
            } else {
                alert('下載失敗');
            }
        },
        checkRecords(){
            var now = new Date().getTime();
            var monthMS = 2592000000; // ms of a month
            var count = 0;
            var message = '';
            this.allRecord.forEach(element => {
                var downloadLimit = element.downloadLimit;
                if(downloadLimit != '-'){
                    var past = Date.parse(new Date(downloadLimit));
                    var distance = now - past;
                    if(distance < monthMS && distance > 0){
                        count = count + 1;
                        message = message + element.date + ' ' + element.department +'\n';
                    }
                }
            });
            message = '您有'+count+'筆數位證明即將到期，請盡速下載檔案\n' + message;
            confirm(message);
        },
        start() {
            if (this.timeVal === 0) {
                return;
            }
            this.timeInterval = setInterval(this.countDown, 1000);
            this.isStart = true;
        },
        countDown() {
            this.timeVal = this.timeVal - 1;
            if (this.timeVal === 0) {
                this.finish();
            }
        },
        finish() {
            this.stop();
            alert('您在系統上已閒置超過10分鐘\n為了您的資料安全，已為您登出\n如有需要，請重新登入');
            window.location = '/login.html';

        },        
        stop() {
            clearInterval(this.timeInterval);
            this.isStart = false;
        },
        reset() {
            this.timeVal = this.startTimeVal;
        },
    },
    computed: {
        filteredRecord: function(){
            var recordList = this.allRecord;
            var kind = this.kind;
            var downloadState = this.downloadState;
            var type = this.sortType;
            var isReverse = this.isReverse;

            if(kind == '診斷書' || kind == '收據'){
                recordList = recordList.filter(function(record){
                    if(record.kind == kind){
                        return record;
                    }
                })
            }
            else{
                recordList = recordList;
            }

            if(downloadState == '可下載'){
                recordList = recordList.filter(function(record){
                    if(record.status == '尚未下載'){
                        return record;
                    }
                })
            }else if(downloadState == '已下載'){
                recordList = recordList.filter(function(record){
                    if(record.status != '尚未下載'){
                        return record;
                    }
                })
            }else{
                recordList = recordList;
            }
            
            return recordList.sort(function (a, b) {
                if (isReverse) return b[type] - a[type];
                else return a[type] - b[type];
            });            
        },
        checkNum: function(){
            return this.recordCheck.length;
        }
    },
    mounted(){
        this.start();
    }
}
Vue.createApp(certificateApply).mount('#medical-certificate-apply');

const loginForm = {
    data() {
        return{
            id: '',
            birthday: '',
            medicalDate: '',
            isError: false,
            errorNum: 0,
        }
    },
    methods: {
        checkAccount() {
            var id = this.$el.querySelector("#person-id").value;
            var birthday = this.$el.querySelector("#birthday").value;
            var medicalDate = this.$el.querySelector("#medical-date").value;
            if(id == 'A123456789' && birthday == '1990/01/01' && medicalDate == '2022/04/01'){
                this.isError = false;
                window.location = '/apply.html';
            }else if(this.errorNum < 4){                
                this.isError = true;
                this.errorNum = this.errorNum + 1;
                alert('無法登入\n原因原因～～～\n錯誤次數:' + this.errorNum);
            }else if(this.errorNum < 9){                
                this.isError = true;
                this.errorNum = this.errorNum + 1;
                alert('登入失敗達五次，您的帳號已被封鎖\n請於 3 小時 00 分後再登入');
            }else{
                this.isError = true;
                this.errorNum = this.errorNum + 1;
                alert('登入失敗達十次，您的帳號已被封鎖\n請前往醫院櫃台？申請帳號解鎖');
            }
        },
    }
}
Vue.createApp(loginForm).mount('#login-form');