/**
 * CÔNG CỤ QUÉT VIRUS - CLOUDBUG (LEGACY CODE)
 * Nhiệm vụ: Tìm tất cả các file có đuôi .exe (virus) trong hệ thống
 */

const fileSystem = {
    name: "C:",
    type: "folder",
    children: [
        { name: "document.pdf", type: "file" },
        {
            name: "System", type: "folder", children: [
                { name: "config.json", type: "file" },
                {
                    name: "HiddenFolder", type: "folder", children: [
                        { name: "safe_file.txt", type: "file" },
                        { name: "virus1.exe", type: "file" }, // Tầng 3: Code cũ tìm được
                        {
                            name: "DeepFolder", type: "folder", children: [
                                { name: "virus_nguy_hiem.exe", type: "file" } // Tầng 4: Code cũ BÓ TAY!
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

function createDeepFileSystem(maxDepth) {
    // Khởi tạo gốc (Tầng 1)
    let root = {
        name: "Folder_Level_1",
        type: "folder",
        children: [
            { name: "virus_level_1.exe", type: "file" } // Virus ở ngay tầng 1
        ]
    };

    let currentFolder = root;

    // Vòng lặp để xây dựng sâu xuống các tầng tiếp theo
    for (let depth = 2; depth <= maxDepth; depth++) {
        // Tạo một folder mới cho tầng hiện tại
        let newFolder = {
            name: `Folder_Level_${depth}`,
            type: "folder",
            children: []
        };

        // Cứ mỗi 10 tầng, ta "gài" một con virus vào để thử nghiệm quét
        if (depth % 10 === 0 || depth === maxDepth) {
            newFolder.children.push({
                name: `virus_level_${depth}.exe`,
                type: "file"
            });
        }

        // Đẩy folder mới vào children của folder tầng trước
        currentFolder.children.push(newFolder);

        // Dịch chuyển con trỏ xuống tầng vừa tạo để lặp tiếp
        currentFolder = newFolder;
    }

    return root;
}

// Tạo dữ liệu với độ sâu đúng 50 tầng
const deepFileSystem = createDeepFileSystem(50);


function scanVirus(item) {
    let infectedFiles = [];

    if (item.type === "file" && item.name.includes(".exe")) {
        infectedFiles.push(item.name);
    } else if (item.type === "folder" && Array.isArray(item.children)) {
        for (let i = 0; i < item.children.length; i++) {
            let filesChild = scanVirus(item.children[i]);
            infectedFiles = infectedFiles.concat(filesChild);
        }
    }

    return infectedFiles;
}


console.log("--- BẮT ĐẦU KIỂM TRA ĐỆ QUY 50 TẦNG ---");

// Đo thời gian bắt đầu chạy
const startTime = performance.now();

// Chạy hàm quét
const result = scanVirus(deepFileSystem);

// Đo thời gian kết thúc
const endTime = performance.now();

console.log(`\n✅ Kết quả: Thành công! Không xảy ra lỗi tràn bộ nhớ.`);
console.log(`⏱️ Thời gian xử lý: ${(endTime - startTime).toFixed(4)} ms (mili-giây)`);
console.log(`🦠 Tổng số virus tìm được: ${result.length} file.`);
console.log(`📋 Danh sách cụ thể:`, result);