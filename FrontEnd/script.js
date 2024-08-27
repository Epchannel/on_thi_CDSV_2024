document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calculate);
});

function calculate() {
    let a = parseFloat(document.getElementById('inputA').value) || 0;
    let b = parseFloat(document.getElementById('inputB').value) || 0;
    let c = parseFloat(document.getElementById('inputC').value) || 0;
    
    let tbcHe10 = (a * 0.6 + b * 0.3 + c * 0.1).toFixed(2);
    document.getElementById('tbcHe10').textContent = tbcHe10;
    
    let tbcHe4, diemChu;

    if (tbcHe10 >= 9.0) {
        tbcHe4 = 4.0;
        diemChu = 'A+';
    } else if (tbcHe10 >= 8.5) {
        tbcHe4 = 3.7;
        diemChu = 'A';
    } else if (tbcHe10 >= 8.0) {
        tbcHe4 = 3.5;
        diemChu = 'B+';
    } else if (tbcHe10 >= 7.0) {
        tbcHe4 = 3.0;
        diemChu = 'B';
    } else if (tbcHe10 >= 6.5) {
        tbcHe4 = 2.5;
        diemChu = 'C+';
    } else if (tbcHe10 >= 5.5) {
        tbcHe4 = 2.0;
        diemChu = 'C';
    } else if (tbcHe10 >= 5.0) {
        tbcHe4 = 1.5;
        diemChu = 'D+';
    } else if (tbcHe10 >= 4.0) {
        tbcHe4 = 1.0;
        diemChu = 'D';
    } else {
        tbcHe4 = 0.0;
        diemChu = 'F';
    }

    document.getElementById('tbcHe4').textContent = tbcHe4;
    document.getElementById('diemChu').textContent = diemChu;
}
