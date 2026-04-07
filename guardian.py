import tkinter as tk
from tkinter import messagebox, font
import webbrowser
import random
import threading

# Configuration
WEB_URL = "http://localhost:5173" 
GIFTED_KEY = "KTLT-2013" 
INITIAL_CHALLENGE_ANSWER = "17/9/2013" 
SECRET_WEB_KEY = "SANG-XIN-MIN-2026"
FINAL_SECRET_CODE = "CAM-ON-DA-NHAN-QUA-:)"

MESSAGES = [
    "Chúc mừng sinh nhật! 🎉\n\nBiết là hôm nay là 7/4 rồi, quà đến muộn mất 1 tuần nên đừng giận t nhé.\nNãy giờ đùa vui tí thôi, gọi là chơi giải trí tí, còn đây là những dòng thật lòng nhất t muốn dành cho m:",
    "Dù bây giờ m không còn nghịch như xưa nữa mà đã trưởng thành hơn, đã xinh đẹp hơn, đã thêm 1 tuổi rồi \nnhưng t vẫn luôn trân trọng tình bạn này.\n\nMón quà ngoài đời nhìn có vẻ đơn giản, thô sơ\n(vì t không biết gói ghém quà :) ),",
    "Nhưng t hy vọng 1 chai sữa tắm và 1 chai tẩy trang này\nsẽ thay t nhắc m chăm sóc bản thân thật tốt.\n\nt không giỏi nói lời hoa mỹ, chỉ biết dùng code để gửi tâm tư :),\nnhưng món quà t dành cho m thì luôn là 'hàng thật giá thật'.",
    "T chúc m: Tuổi mới lúc nào cũng rạng rỡ,\nhọc siêu đỉnh và mãi xinh gái nhé! ❤️ (ok thì nhắn t :) )"
]

class BirthdayGuardian:
    def __init__(self, root):
        self.root = root
        self.root.title("Người Gác Cổng")
        self.root.geometry("500x600")
        self.root.resizable(False, False)
        self.root.configure(bg="#f0f8f0") 
        
        self.custom_font = font.Font(family="Arial", size=13)
        self.title_font = font.Font(family="Arial", size=18, weight="bold")
        self.msg_index = 0
        
        self.setup_ui()

    def setup_ui(self):
        # Header
        self.header_label = tk.Label(
            self.root, text="🎓 NGƯỜI GÁC CỔNG 🎓", 
            fg="#2d8659", bg="#f0f8f0", font=self.title_font, pady=30
        )
        self.header_label.pack()

        # Main Container
        self.main_frame = tk.Frame(self.root, bg="#f0f8f0")
        self.main_frame.pack(pady=10, fill="both", expand=True)

        self.show_login_gate()

    def clear_main_frame(self):
        for widget in self.main_frame.winfo_children():
            widget.destroy()

    def show_login_gate(self):
        self.clear_main_frame()
        
        tk.Label(
            self.main_frame, text="Nhập mã bí mật trên hộp quà ngoài đời:",
            fg="#333", bg="#f0f8f0", font=self.custom_font
        ).pack(pady=20)

        self.entry_gift = tk.Entry(self.main_frame, font=self.custom_font, justify="center", width=20, bd=2, relief="flat")
        self.entry_gift.pack(pady=10, ipady=5)

        tk.Button(
            self.main_frame, text="Xác nhận mã", command=self.check_gift_key,
            bg="#2d8659", fg="white", font=self.custom_font, relief="flat", padx=30, pady=10, cursor="hand2"
        ).pack(pady=20)

    def check_gift_key(self):
        if self.entry_gift.get().strip().upper() == GIFTED_KEY:
            self.show_challenge_gate()
        else:
            messagebox.showerror("Lỗi", "Mã hộp quà chưa đúng rùi, xem kỹ lại nhé!")

    def show_challenge_gate(self):
        self.clear_main_frame()
        
        tk.Label(
            self.main_frame, text="Thử thách tiếp theo:\nNgày sinh nhật của t là ngày nào (dd/mm/yyyy)?",
            fg="#333", bg="#f0f8f0", font=self.custom_font, justify="center"
        ).pack(pady=20)

        self.entry_birthday = tk.Entry(self.main_frame, font=self.custom_font, justify="center", width=20, bd=2, relief="flat")
        self.entry_birthday.pack(pady=10, ipady=5)

        tk.Button(
            self.main_frame, text="Giải mã", command=self.check_birthday,
            bg="#2d8659", fg="white", font=self.custom_font, relief="flat", padx=30, pady=10, cursor="hand2"
        ).pack(pady=20)

    def check_birthday(self):
        if self.entry_birthday.get().strip() == INITIAL_CHALLENGE_ANSWER:
            self.show_web_gate()
        else:
            messagebox.showerror("Lỗi", "Bro, m thực sự ko nhớ à 😭!")

    def show_web_gate(self):
        self.clear_main_frame()
        
        tk.Label(
            self.main_frame, text=f"CHÍNH XÁC!\n\nKEY VÀO WEB LÀ:\n{SECRET_WEB_KEY}",
            fg="#2d8659", bg="#f0f8f0", font=("Arial", 14, "bold"), justify="center"
        ).pack(pady=20)

        tk.Button(
            self.main_frame, text="Mở Web Ngay!", command=lambda: webbrowser.open(WEB_URL),
            bg="#2d8659", fg="white", font=self.custom_font, relief="flat", padx=30, pady=10
        ).pack(pady=10)

        tk.Label(
            self.main_frame, text="----------------------------------\nSau khi thắng web, nhập Mã Bí Mật vào đây:",
            fg="#666", bg="#f0f8f0", font=("Arial", 10)
        ).pack(pady=20)

        self.entry_final = tk.Entry(self.main_frame, font=self.custom_font, justify="center", width=20, bd=2, relief="flat")
        self.entry_final.pack(pady=5, ipady=5)

        tk.Button(
            self.main_frame, text="Mở Quà Thật Sự", command=self.check_final_code,
            bg="#FFB7C5", fg="#000", font=self.custom_font, relief="flat", padx=30, pady=10
        ).pack(pady=15)

    def check_final_code(self):
        if self.entry_final.get().strip().upper() == FINAL_SECRET_CODE:
            self.start_finale()
        else:
            messagebox.showwarning("Lỗi", "Mã bí mật chưa đúng!")

    def start_finale(self):
        self.header_label.destroy()
        self.main_frame.destroy()
        
        self.canvas = tk.Canvas(self.root, width=500, height=600, bg="#f0f8f0", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)
        
        self.msg_label = tk.Label(
            self.root, text="", fg="#1a4d33", bg="#f0f8f0",
            font=("Arial", 12, "bold"), justify="center", wraplength=400
        )
        self.msg_window = self.canvas.create_window(250, 250, window=self.msg_label)
        
        self.next_btn = tk.Button(
            self.root, text="Xem tiếp ➔", command=self.next_scene,
            bg="#2d8659", fg="white", font=self.custom_font, relief="flat", padx=20, pady=5
        )
        self.btn_window = self.canvas.create_window(250, 450, window=self.next_btn)

        threading.Thread(target=self.create_confetti, daemon=True).start()
        self.next_scene()

    def next_scene(self):
        if self.msg_index < len(MESSAGES):
            self.msg_label.config(text=MESSAGES[self.msg_index])
            self.msg_index += 1
            if self.msg_index == len(MESSAGES):
                self.next_btn.config(text="🎓 Mãi Mãi Là Best Friend 🎓", command=self.root.quit, bg="#FFB7C5", fg="#000")
        
    def create_confetti(self):
        colors = ["#98FF98", "#FFB7C5", "#2d8659", "#ffd700", "#e6b3cc"]
        pieces = []
        for _ in range(60):
            x = random.randint(0, 500)
            y = random.randint(-500, 0)
            c = random.choice(colors)
            s = random.randint(6, 12)
            
            # Vẽ hình trái tim chuẩn hơn thay vì dùng create_oval thông thường
            p = self.draw_heart(x, y, s, c)
            pieces.append({'id': p, 'speed': random.uniform(2, 5)})

        while True:
            for p in pieces:
                self.canvas.move(p['id'], 0, p['speed'])
                pos = self.canvas.coords(p['id'])
                if len(pos) >= 2 and pos[1] > 600:
                    self.canvas.move(p['id'], 0, -650)
            self.canvas.tag_lower("all")
            self.root.update()
            threading.Event().wait(0.04)

    def draw_heart(self, x, y, size, color):
        # Tọa độ đa giác để tạo hình trái tim cân đối
        pts = [
            x, y + size // 4,
            x - size // 2, y - size // 2,
            x - size, y + size // 4,
            x, y + size,
            x + size, y + size // 4,
            x + size // 2, y - size // 2,
            x, y + size // 4
        ]
        return self.canvas.create_polygon(pts, fill=color, outline="", smooth=True)

if __name__ == "__main__":
    root = tk.Tk()
    app = BirthdayGuardian(root)
    root.mainloop()
