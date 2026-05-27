/**
 * HỆ THỐNG XỬ LÝ ĐƠN HÀNG - FOODBUG (LEGACY CODE)
 */

function validateOrder(order) {
    if (!order.items || order.items.length === 0) {
        return { status: false, message: "Đơn hàng rỗng!" };
    }
    if (!order.email || !order.email.includes("@")) {
        return { status: false, message: "Email không hợp lệ!" };
    }
    return { status: true };
}

function calculateTotal(items) {
    let total = 0;

    total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Tính thêm 10% thuế VAT
    total += (total * 0.1);

    return total;
}

function saveToDatabase(total) {
    let dbRecord = {
        orderId: Math.floor(Math.random() * 1000),
        amount: total,
        status: "PAID"
    };
    console.log(`[DB] Đã lưu đơn hàng ${dbRecord.orderId} vào CSDL.`);
    return dbRecord;
}

function sendEmail(email, total) {
    console.log(`[EMAIL] Đang gửi biên lai tới ${email}...`);
    console.log(`[EMAIL] Nội dung: Tổng tiền của bạn là ${total} VND.`);
}

function processOrder(order) {
    console.log("--- Bắt đầu xử lý đơn hàng ---");
    let validate = validateOrder(order);
    if (!validate.status) {
        return { status: "FAILED", message: validate.message };
    }
    let total = calculateTotal(order.items);
    let db = saveToDatabase(total);
    let email = sendEmail(order.email, total);

    return { status: "SUCCESS", orderId: db.orderId, total: total };
}

const mockOrder = {
    email: "khachhang@gmail.com",
    items: [
        { name: "Pizza", price: 150000, quantity: 2 },
        { name: "Coca", price: 20000, quantity: 3 }
    ]
};

console.log(processOrder(mockOrder));

/**
 * KỊCH BẢN KIỂM THỬ TỰ ĐỘNG (AUTOMATED TEST CASES)
 */
const testCases = [
    {
        name: "Test Case 1: Đơn hàng hợp lệ (Happy Path)",
        input: {
            email: "khachhang@gmail.com",
            items: [
                { name: "Pizza", price: 150000, quantity: 2 },
                { name: "Coca", price: 20000, quantity: 3 }
            ]
        },
        expected: { status: "SUCCESS", total: 396000 }
    },
    {
        name: "Test Case 2: Đơn hàng rỗng (Mảng items rỗng)",
        input: {
            email: "khachhang@gmail.com",
            items: []
        },
        expected: { status: "FAILED", message: "Đơn hàng rỗng!" }
    },
    {
        name: "Test Case 3: Không truyền thuộc tính items",
        input: {
            email: "khachhang@gmail.com"
        },
        expected: { status: "FAILED", message: "Đơn hàng rỗng!" }
    },
    {
        name: "Test Case 4: Email không hợp lệ (Thiếu @)",
        input: {
            email: "khachhang-gmail.com",
            items: [{ name: "Pizza", price: 150000, quantity: 1 }]
        },
        expected: { status: "FAILED", message: "Email không hợp lệ!" }
    },
    {
        name: "Test Case 5: Không truyền thuộc tính email",
        input: {
            items: [{ name: "Pizza", price: 150000, quantity: 1 }]
        },
        expected: { status: "FAILED", message: "Email không hợp lệ!" }
    }
];

// Hàm chạy và so sánh kết quả
function runTests() {
    console.log("========== BẮT ĐẦU KIỂM THỬ ==========\n");
    let passedCount = 0;

    testCases.forEach((tc, index) => {
        console.log(`[Chạy] ${tc.name}`);
        const result = processOrder(tc.input);

        console.log(` -> Kết quả mong muốn :`, JSON.stringify(tc.expected));
        console.log(` -> Kết quả thực tế   :`, JSON.stringify(result));

        // So sánh kết quả
        let isPassed = false;
        if (tc.expected.status === "SUCCESS" && result.status === "SUCCESS") {
            // Với TH thành công, check xem tổng tiền khớp không và có sinh ra orderId không
            isPassed = (result.total === tc.expected.total) && (typeof result.orderId === "number");
        } else if (tc.expected.status === "FAILED" && result.status === "FAILED") {
            // Với TH thất bại, check xem câu báo lỗi có khớp không
            isPassed = result.message === tc.expected.message;
        }

        if (isPassed) {
            console.log(" ✅ KẾT QUẢ: PASSED\n");
            passedCount++;
        } else {
            console.log(" ❌ KẾT QUẢ: FAILED\n");
        }
    });

    console.log(`========== KẾT QUẢ CHUNG: ĐẠT ${passedCount}/${testCases.length} TEST CASES ==========`);
}

runTests();