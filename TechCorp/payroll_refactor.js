/**
 * HỆ THỐNG TÍNH LƯƠNG TECHCORP (REFACTORED)
 */

function calculateBonus(baseSalary, performanceScore) {
    return baseSalary * (performanceScore - 1);
}

function calculateTotalIncome(baseSalary, bonus) {
    return baseSalary + bonus;
}

function calculateTax(totalIncome) {
    if (totalIncome > 10000000) {
        return totalIncome * 0.1;
    }
    return 0;
}

function calculateNetSalary(totalIncome, tax) {
    return totalIncome - tax;
}

function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + " VNĐ";
}

function processSalary(baseSalary, performanceScore) {
    const bonus = calculateBonus(baseSalary, performanceScore);
    const totalIncome = calculateTotalIncome(baseSalary, bonus);
    const tax = calculateTax(totalIncome);
    const netSalary = calculateNetSalary(totalIncome, tax);

    return formatCurrency(netSalary);
}

// ==========================================
// CHẠY THỬ VỚI 3 NHÂN VIÊN KHÁC NHAU
// ==========================================

console.log("--- KẾT QUẢ TÍNH LƯƠNG HỆ THỐNG MỚI ---");

// 1. Nhân viên A: Lương 10.000.000, hệ số 1.0 (Không thưởng, Tổng th nhập 10tr -> Không bị tính thuế)
const luongNhanVienA = processSalary(10000000, 1.0);
console.log(`Nhân viên A (10tr, hệ số 1.0) -> Thực nhận: ${luongNhanVienA}`);

// 2. Nhân viên B: Lương 20.000.000, hệ số 1.5 (Thưởng 10tr, Tổng thu nhập 30tr -> Bị tính thuế 10%)
const luongNhanVienB = processSalary(20000000, 1.5);
console.log(`Nhân viên B (20tr, hệ số 1.5) -> Thực nhận: ${luongNhanVienB}`);

// 3. Nhân viên C: Lương 7.500.000, hệ số 1.2 (Thưởng 1.5tr, Tổng thu nhập 9tr -> Không bị tính thuế)
const luongNhanVienC = processSalary(7500000, 1.2);
console.log(`Nhân viên C (7.5tr, hệ số 1.2) -> Thực nhận: ${luongNhanVienC}`);