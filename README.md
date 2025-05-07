## Bigint

**BigInt** là một kiểu dữ liệu nguyên thủy (primitive type) trong JavaScript, dùng để biểu diễn số nguyên rất lớn mà kiểu `Number` không thể biểu diễn chính xác được.

- **Giá trị biểu diễn**
    - **Number (64 bit IEE 754)**: Khoảng từ $-(2^{53} - 1)$ đến $2^{53} - 1$ (~ $\pm 9 \times 10^{15}$) bao gồm số nguyên và số thực.
    - **BigInt (Linh hoạt)**: Có thể biểu diễn số nguyên cực lớn gần như không giới hạn. Độ chính xác tuyệt đối.
- **Phép tính**
    - **Number**:
        - Hỗ trợ ECMAScript đầu tiên.
        - Hỗ trợ đầy đủ các toán tử và `Math.*`.
        - Có thể chuyển sang bigint.
        ```javascript
        const x = 9999999999999999; // Vượt quá giới hạn Number
        console.log(x); //  In ra 10000000000000000 => bị làm tròn
        ```
    - **Bigint**:
        - Có từ **ECMAScript 2020** (ES11).
        - Hỗ trợ đầy đủ các toán tử, không hỗ trợ `Math.*`.
        - Cần lưu ý khi so sánh với `Number` (ép kiểu).
        ```javascript
        const x = 9999999999999999n;
        console.log(x); //  In ra đúng 9999999999999999n
        ```
    - Khi so sánh giữa 2 kiểu dữ liệu cần ép kiểu về cùng 1 kiểu dữ liệu.
    - Hiệu suất bigint chậm hơn Number.
- **Ứng dụng**: Dùng bigint khi làm việc với số nguyên lớn, cần độ chính xác cao, hoặc xử lý các thuật toán toán học phức tạp như mã hóa, blockchain, tính toán số học chính xác.

## IEEE 754

**IEEE 754** là chuẩn biểu diễn số thực trong máy tính ở dạng nhị phân, được dùng phổ biến trong nhiều ngôn ngữ lập trình, bao gồm JavaScript.

- Có nhiều dạng, tuy nhiên 2 dạng chính là:
    - **Single Precision (32 bit)**: Dùng cho tính toán nhanh, tiết kiệm bộ nhớ.
    - **Double Precision (64 bit)**: Dùng cho tính toán chính xác hơn (Trong JavaScript, mọi `Number` đều là IEEE 754 dạng 64-bit).
- Quy định IEEE 754 được chia làm 3 phần (64 bit):
    - **Sign (1 bit)**: Dấu của số (0 là dương, 1 là âm).
    - **Exponent (11 bit)**: Phần mũ – dùng để di chuyển dấu phẩy.
    - **Mantissa / Fraction (52 bit)**: Phần trị số – lưu phần chính của số.
- **Ưu và nhược điểm**
    - **Ưu điểm**: Phổ biến và là chuẩn toàn cầu, hiệu suất tính toán cao.
    - **Nhược điểm**: Không lưu tất cả các số với độ chính xác tuyệt đối. Một số phép tính cơ bản bị sai số.
        - **Vấn đề sai số**
        ```javascript
        console.log(0.1 + 0.2);       // 0.30000000000000004
        console.log(0.1 + 0.2 === 0.3); // false
        // 0.1 trong nhị phân ≈ 0.00011001100110011... (lặp vô hạn)
        // 0.2 trong nhị phân ≈ 0.0011001100110011... (lặp vô hạn)
        ```
        - **Giải pháp**
            - Có thể dùng các thư viện: `decimal.js`, `big.js`.
            - Sử dụng epsilon để so sánh số thực: Thay vì so sánh trực tiếp `a === b`, hãy kiểm tra xem `Math.abs(a - b) < epsilon` (`epsilon`: là giá trị sai số tối đa cho phép).
            - Sử dụng `toFixed()` hoặc các phương pháp làm tròn khác để giảm thiểu sai số hiển thị.

## Destructure

**Destructuring** là cú pháp ES6 cho phép tách dữ liệu từ array hoặc object và gán vào biến riêng biệt một cách nhanh chóng và rõ ràng.

- **Destructuring với Primitive Types**:
    - Khi thao tác với kiểu dữ liệu nguyên thủy sẽ tạo một bản sao → khi thực hiện thay đổi giá trị của biến không làm ảnh hưởng đến giá trị ban đầu.

    ```javascript
    let fullName = "Tran Van Teo";
    let [firstChar] = fullName;
    console.log("fullName ban đầu:", fullName); // Output: fullName ban đầu: Tran Van Teo
    console.log("firstChar ban đầu:", firstChar); // Output: firstChar ban đầu: T
    firstChar = 'á';
    console.log("fullName sau khi thay đổi firstChar:", fullName); // Output: fullName sau khi thay đổi firstChar: Tran Van Teo
    console.log("firstChar sau khi thay đổi:", firstChar); // Output: firstChar sau khi thay đổi: á
    // ==> Vì "Tran Van Teo" là kiểu nguyên thủy (string) nên firstChar là một bản sao, không liên quan tới giá trị gốc.
    ```

- **Destructuring với object**:
    - Khi thao tác với object hoặc array → Không tạo ra vùng nhớ mới để lưu giá trị của biến (tham chiếu) → Nếu thay đổi giá trị từ biến được destructure sẽ làm thay đổi giá trị gốc.
    ```javascript
    const A = {
        id: 1,
        name: 'Thanh',
        B: {
            age: 25,
            city: 'Hanoi'
        }
    };

    const { B } = A;
    B.city = 'Ho Chi Minh';
    console.log(A.B.city); // 'Ho Chi Minh'
    // ==> B là một object (reference type) nằm trong A. Khi destructure: const { B } = A; → không tạo bản sao của B mà tạo ra một biến trỏ tới cùng vùng nhớ với A.B, Vì thế, khi thay đổi B.city, thì A.B.city cũng thay đổi, do cùng vùng nhớ.
    ```