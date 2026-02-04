let currentMode = 2; // الوضع الافتراضي X2
let isScanning = false;

/**
 * وظيفة تبديل الأنماط (التحكم في X2 و X3)
 */
function switchMode(m) {
    if (isScanning) return; // منع التبديل أثناء المسح
    currentMode = m;
    
    // تحديث الأزرار بصرياً
    document.getElementById('m2').classList.toggle('active', m === 2);
    document.getElementById('m3').classList.toggle('active', m === 3);
    
    // إعادة بناء الشبكة فوراً
    renderGrid();
}

/**
 * وظيفة بناء الشبكة (Grid Construction)
 */
function renderGrid() {
    const grid = document.getElementById('matrixGrid');
    grid.style.gridTemplateColumns = `repeat(${currentMode}, 1fr)`;
    grid.innerHTML = ''; 
    
    // سنعرض 6 صفوف دائماً لضمان ملء الشاشة
    // في X2 المجموع 12 خلية، وفي X3 المجموع 18 خلية
    const totalCells = currentMode * 6; 

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.innerHTML = '<span>SCAN</span>';
        grid.appendChild(cell);
    }
}

/**
 * وظيفة إطلاق المسح
 */
async function executeNeuralScan() {
    if (isScanning) return;
    
    const overlay = document.getElementById('scanOverlay');
    const statusTxt = document.querySelector('.status-txt');
    const btn = document.getElementById('scanBtn');
    
    isScanning = true;
    overlay.style.display = 'flex';
    
    const steps = ["مزامنة التردد...", "فحص الخلايا...", "كشف الذهب..."];
    for(let s of steps) {
        statusTxt.innerText = s;
        await new Promise(r => setTimeout(r, 800));
    }

    overlay.style.display = 'none';
    processResults();
}

/**
 * توزيع الذهب عشوائياً حسب الصفوف
 */
function processResults() {
    const totalRows = 6;
    for (let r = 0; r < totalRows; r++) {
        const winningCol = Math.floor(Math.random() * currentMode);
        
        for (let c = 0; c < currentMode; c++) {
            const idx = (r * currentMode) + c;
            const cell = document.getElementById(`cell-${idx}`);
            
            setTimeout(() => {
                if (c === winningCol) {
                    cell.className = 'cell gold-cell';
                    cell.innerHTML = '<span>GOLD</span>';
                    if(navigator.vibrate) navigator.vibrate(100);
                } else {
                    cell.className = 'cell void-cell';
                    cell.innerHTML = '<span>VOID</span>';
                }
                if (idx === (currentMode * 6) - 1) isScanning = false;
            }, r * 200);
        }
    }
}

// تحديث الساعة والتشغيل الأولي
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString('ar-EG');
    }, 1000);
    renderGrid(); // بناء الشبكة لأول مرة
});