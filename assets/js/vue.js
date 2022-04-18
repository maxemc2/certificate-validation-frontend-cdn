const medicalCertificate = {
    delimiters: ['${', '}'],
    data() {
        return {
            allRecord: [{date:'2022/03/01',status:'未下載',department:'家醫科',kind:'收據',downloadLimit:'-'},
            {date:'2022/02/20',status:'已下載',department:'感染科',kind:'診斷書',downloadLimit:'2022/02/27'},
            {date:'2022/01/15',status:'已下載',department:'家醫科',kind:'收據',downloadLimit:'2022/01/22'},
            {date:'2021/12/20',status:'未下載',department:'皮膚科',kind:'收據',downloadLimit:'-'},
            {date:'2021/10/20',status:'未下載',department:'精神科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/09/21',status:'已下載',department:'骨科',kind:'收據',downloadLimit:'2021/09/28'},
            {date:'2021/07/01',status:'未下載',department:'感染科',kind:'診斷書',downloadLimit:'-'},
            {date:'2021/06/01',status:'已下載',department:'內分泌科',kind:'收據',downloadLimit:'2021/06/08'},
            {date:'2021/05/01',status:'未下載',department:'家醫科',kind:'診斷書',downloadLimit:'-'}],
            kind: '總覽',
            downloadState: '全部',
            sortType: 'date',
            isReverse: false,
        }
    },
    methods: {
        changeKind(kind){
            this.kind = kind;
        },
        changeDownloadState(status){
            this.downloadState = status;
        },
        changeType(type) {
            if (this.sortType == type) {
                this.isReverse = !this.isReverse;
            } else {
                this.isReverse = false;
            }
            this.sortType = type;
        }
    },
    computed: {
        filteredRecord: function(){
            var recordList = this.allRecord;
            var kind = this.kind;
            var downloadState = this.downloadState;
            var type = this.sortType;

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

            if(downloadState == '未下載' || downloadState == '已下載'){
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
                if (this.isReverse) return b[type] - a[type];
                else return a[type] - b[type];
            });            
        }
    }
}

Vue.createApp(medicalCertificate).mount('.medical-certificate');

let $fw = this.$vlayer.popover({
    follow: '#popover4',
    icon: 'warning',
    content: '這是一段內容確定刪除嗎？', 
    time: null, 
    xclose: false,
    btns: [
        {text: 'no', click: () => { $fw.close(); }},
        {text: 'yes', click: () => this.handleXXX()},
    ],
    onClose: function() {
        this.$vlayer.message({content: 'success closed', icon: 'success'})
    }
});
$fw.open();
this.$vlayer.message('這是一條提示資訊');