/**
 * HỆ THỐNG TÍNH TIỀN TECHMART (LEGACY CODE)
 */

function totalPrice(cart) {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].quantity;
    }

    return subtotal;
}

function discounts(subtotal, customerType) {
    let discount = 0;
    if (customerType === "VIP") {
        discount = subtotal * 0.20; // VIP giảm 20%
    } else if (customerType === "MEMBER") {
        discount = subtotal * 0.10; // Member giảm 10%
    }

    return discount;
}
function totalAfterDiscounts(subtotal, discount) {
    return subtotal - discount;
}


function taxVAT(totalAfterDiscount, taxRate = 0.10) {
    let tax = totalAfterDiscount * taxRate;
    return tax;
}

function finalTotals(totalAfterDiscount, tax) {

    return totalAfterDiscount + tax;
}

function printInvoice(subtotal, discount, tax, finalTotal) {
    console.log("--- HÓA ĐƠN TECHMART ---");
    console.log("Tạm tính: " + subtotal + " VNĐ");
    console.log("Giảm giá: " + discount + " VNĐ");
    console.log("Thuế VAT: " + tax + " VNĐ");
    console.log("TỔNG THANH TOÁN: " + finalTotal + " VNĐ");
    console.log("------------------------");
}

function processOrder(cart, customerType, taxRate = 0.10) {
    let subTotal = totalPrice(cart);
    let dicount = discounts(subTotal, customerType);
    let totalAfterDiscount = totalAfterDiscounts(subTotal, dicount)
    let tax = taxVAT(totalAfterDiscount, taxRate);
    let finalTotal = finalTotals(totalAfterDiscount, tax);
    printInvoice(subTotal, dicount, tax, finalTotal);
}

// Dữ liệu chạy thử
const myCart = [
    { item: "Laptop", price: 15000000, quantity: 1 },
    { item: "Chuột", price: 300000, quantity: 2 }
];
processOrder(myCart, "VIP");

// ==========================================
// CHẠY KIỂM THỬ (TEST CASES)
// ==========================================

// --- TRƯỜNG HỢP 1: GIỎ HÀNG TRỐNG ---
console.log("=== TEST CASE 1: GIỎ HÀNG TRỐNG ===");
const emptyCart = [];
processOrder(emptyCart, "NORMAL");


// --- TRƯỜNG HỢP 2: GIỎ MUA NHIỀU SẢN PHẨM ---
console.log("=== TEST CASE 2: GIỎ MUA NHIỀU SẢN PHẨM (Khách MEMBER) ===");
const bigCart = [
    { item: "Mainboard", price: 3500000, quantity: 1 },
    { item: "RAM 16GB", price: 1200000, quantity: 2 },  // 2,400,000
    { item: "SSD 1TB", price: 2000000, quantity: 3 }    // 6,000,000
]; // Tổng gốc = 11,900,000 VNĐ
processOrder(bigCart, "MEMBER");


// --- TRƯỜNG HỢP 3: THAY ĐỔI THUẾ VAT XUỐNG 8% ---
console.log("=== TEST CASE 3: ĐỔI THUẾ VAT XUỐNG 8% (Khách VIP) ===");
const standardCart = [
    { item: "Laptop", price: 15000000, quantity: 1 },
    { item: "Chuột", price: 300000, quantity: 2 }
]; // Tổng gốc = 15,600,000 VNĐ
// Truyền tham số thứ 3 là 0.08 (tương đương thuế 8%)
processOrder(standardCart, "VIP", 0.08);