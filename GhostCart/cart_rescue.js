/**
 * HỆ THỐNG XỬ LÝ GIỎ HÀNG - SHOPBUG (THỬ NGHIỆM SONG SONG 2 CÁCH)
 */

// Hàm khởi tạo giỏ hàng (Dùng để tạo mới hoặc reset dữ liệu về ban đầu)
function initCart() {
    return {
        userId: "U123",
        totalPrice: 1500,
        items: ["Laptop", "Chuột không dây"],
        metadata: { isLocked: false }
    };
}

// =========================================================================
// CÁCH 1: HÀM CŨ (BỊ LỖI THAM CHIẾU)
// =========================================================================
function previewCheckout_LOI(cartData, newDiscountAmount, extraGift) {
    let tempCart = cartData; // Gán trực tiếp ô nhớ

    tempCart.totalPrice = tempCart.totalPrice - newDiscountAmount;
    tempCart.items.push(extraGift);
    tempCart.metadata.isLocked = true;

    return tempCart;
}

// =========================================================================
// CÁCH 2: HÀM MỚI (ĐÃ SỬA - DEEP COPY)
// =========================================================================
function previewCheckout_SUA(cartData, newDiscountAmount, extraGift) {
    let tempCart = JSON.parse(JSON.stringify(cartData)); // Bẻ gãy tham chiếu hoàn toàn

    tempCart.totalPrice = tempCart.totalPrice - newDiscountAmount;
    tempCart.items.push(extraGift);
    tempCart.metadata.isLocked = true;

    return tempCart;
}


// =========================================================================
// KHU VỰC CHẠY THỬ NGHIỆM VÀ IN CONSOLE SO SÁNH
// =========================================================================

console.log("--- KỊCH BẢN 1: CHẠY HÀM CŨ (BỊ LỖI) ---");
let globalCart1 = initCart(); // Tạo giỏ hàng số 1

console.log("1. Giỏ hàng gốc BAN ĐẦU:   ", JSON.stringify(globalCart1));

let result1 = previewCheckout_LOI(globalCart1, 200, "Bàn di chuột");
console.log("2. Giỏ xem trước trả về:  ", JSON.stringify(result1));
console.log("3. Giỏ hàng gốc SAU ĐÓ:    ", JSON.stringify(globalCart1));
console.log("=> KẾT LUẬN: Giỏ gốc bị SỬA SAI mất tiêu (Trừ tiền, thêm quà dù chưa mua)!");


console.log("\n------------------------------------------------------------------\n");


console.log("--- KỊCH BẢN 2: CHẠY HÀM MỚI (ĐÃ SỬA) ---");
let globalCart2 = initCart(); // Reset lại giỏ hàng mới tinh (giỏ số 2) để test công bằng

console.log("1. Giỏ hàng gốc BAN ĐẦU:   ", JSON.stringify(globalCart2));

let result2 = previewCheckout_SUA(globalCart2, 200, "Bàn di chuột");
console.log("2. Giỏ xem trước trả về:  ", JSON.stringify(result2));
console.log("3. Giỏ hàng gốc SAU ĐÓ:    ", JSON.stringify(globalCart2));
console.log("=> KẾT LUẬN: Giỏ gốc AN TOÀN tuyệt đối, không hề bị thay đổi dữ liệu!");