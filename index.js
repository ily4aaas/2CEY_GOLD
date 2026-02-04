class NeuralEngine {
    constructor() {
        this.canvas = document.getElementById('neuralNet');
        this.ctx = this.canvas.getContext('2d');
        this.pts = [];
        this.init();
        this.animate();
        window.onresize = () => this.init();
    }
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.pts = Array.from({length: 60}, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random()-0.5)*0.5,
            vy: (Math.random()-0.5)*0.5
        }));
    }
    animate() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "rgba(0,247,255,0.06)";
        this.ctx.fillStyle = "rgba(0,247,255,0.2)";
        this.pts.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>this.canvas.width) p.vx*=-1;
            if(p.y<0 || p.y>this.canvas.height) p.vy*=-1;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
            this.ctx.fill();
            for(let j=i+1; j<this.pts.length; j++){
                let p2 = this.pts[j];
                let d = Math.sqrt((p.x-p2.x)**2+(p.y-p2.y)**2);
                if(d<110){
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });
        requestAnimationFrame(() => this.animate());
    }
}

class TerminalSystem {
    constructor() {
        this.el = document.getElementById('terminalText');
        this.logs = [
            "> جاري استدعاء بروتوكولات 2cey...",
            "> تم العثور على مصفوفة البيانات.",
            "> فحص التشفير الكمي... [مؤمن]",
            "> جاري مزامنة الإحداثيات الجغرافية...",
            "> النظام جاهز لاستقبال المصادقة."
        ];
        this.idx = 0;
    }
    start() {
        const add = () => {
            if(this.idx < this.logs.length){
                const d = document.createElement('div');
                d.innerHTML = `<span style="color:var(--cyan)">[✓]</span> ${this.logs[this.idx]}`;
                this.el.appendChild(d);
                this.el.scrollTop = this.el.scrollHeight;
                this.idx++;
                setTimeout(add, 1200);
            }
        };
        add();
    }
}

window.onload = () => {
    new NeuralEngine();
    new TerminalSystem().start();
    setTimeout(() => {
        const m = document.getElementById('loadGauge');
        if(m) m.style.strokeDashoffset = "80";
    }, 500);
    setInterval(() => {
        document.getElementById('digitalClock').innerText = new Date().toLocaleTimeString('ar-EG');
    }, 1000);
};