import tkinter as tk
from tkinter import messagebox, font
import webbrowser
import random
import threading

# Configuration
WEB_URL = "http://localhost:5173"  # Change this to your actual hosted URL later
INITIAL_CHALLENGE_ANSWER = "căn tin" # Example: Where we first met
SECRET_WEB_KEY = "SANG-XIN-MIN-2026"
FINAL_SECRET_CODE = "QUA-MUON-NHUNG-CHAT"

class BirthdayGuardian:
    def __init__(self, root):
        self.root = root
        self.root.title("Người Gác Cổng Khác Lớp")
        self.root.geometry("500x700")
        self.root.configure(bg="#f0f8f0") # Mint green background
        
        self.custom_font = font.Font(family="Segoe UI", size=12)
        self.title_font = font.Font(family="Segoe UI", size=18, weight="bold")
        
        self.setup_ui()

    def setup_ui(self):
        # Title
        self.label_title = tk.Label(
            self.root, text="🎓 NGƯỜI GÁC CỔNG KHÁC LỚP 🎓", 
            fg="#2d8659", bg="#f0f8f0", font=self.title_font, pady=20
        )
        self.label_title.pack()

        # Phase 1 Container
        self.phase1_frame = tk.Frame(self.root, bg="#f0f8f0")
        self.phase1_frame.pack(pady=20)

        tk.Label(
            self.phase1_frame, text="Thử thách đầu tiên:\nTụi mình quen nhau ở đâu?",
            fg="#2d8659", bg="#f0f8f0", font=self.custom_font, justify="center"
        ).pack(pady=10)

        self.entry_ans = tk.Entry(self.phase1_frame, font=self.custom_font, justify="center", width=15)
        self.entry_ans.pack(pady=10)

        self.btn_unlock = tk.Button(
            self.phase1_frame, text="Giải mã", command=self.check_initial_challenge,
            bg="#ffb7c5", fg="#1a1a1a", font=self.custom_font, relief="flat", padx=20
        )
        self.btn_unlock.pack(pady=10)

        # Hidden Result Frame
        self.result_frame = tk.Frame(self.root, bg="#f0f8f0")
        
        self.label_key = tk.Label(
            self.result_frame, text=f"KEY VÀO WEB: {SECRET_WEB_KEY}",
            fg="#2d8659", bg="#f0f8f0", font=self.custom_font, pady=10
        )
        self.label_key.pack()

        self.btn_go_web = tk.Button(
            self.result_frame, text="Mở Web Ngay!", command=self.open_web,
            bg="#98FF98", fg="#2d8659", font=self.custom_font, relief="flat", padx=20
        )
        self.btn_go_web.pack(pady=10)

        # Phase 2: Final Gateway (Hidden initially)
        self.final_frame = tk.Frame(self.root, bg="#f0f8f0")
        tk.Label(
            self.final_frame, text="----------------------------------\nSau khi chơi xong 4 game trên web,\nhãy nhập Mã Bí Mật vào đây nhé:",
            fg="#2d8659", bg="#f0f8f0", font=("Segoe UI", 10)
        ).pack(pady=20)

        self.entry_final = tk.Entry(self.final_frame, font=self.custom_font, justify="center", width=20)
        self.entry_final.pack(pady=10)

        self.btn_final = tk.Button(
            self.final_frame, text="Nhận Quà Thật Sự", command=self.check_final_code,
            bg="#FFB7C5", fg="#2d8659", font=self.custom_font, relief="flat", padx=20
        )
        self.btn_final.pack(pady=10)

    def check_initial_challenge(self):
        if self.entry_ans.get().strip() == INITIAL_CHALLENGE_ANSWER:
            self.result_frame.pack(pady=10)
            self.final_frame.pack(pady=10)
            messagebox.showinfo("Thành công!", "Chính xác rồi! Hãy lưu lại Key và vào web nhé.")
        else:
            messagebox.showerror("Sai rồi", "Gợi ý: Hãy nhớ lại một chút nhé!")

    def open_web(self):
        webbrowser.open(WEB_URL)

    def check_final_code(self):
        if self.entry_final.get().strip() == FINAL_SECRET_CODE:
            self.show_finale()
        else:
            messagebox.showwarning("Sai Mã", "Mã này không đúng rồi, bạn đã thắng cả 4 game chưa?")

    def show_finale(self):
        # Clear UI
        for widget in self.root.winfo_children():
            widget.destroy()
        
        # Create canvas for confetti
        self.canvas = tk.Canvas(self.root, width=500, height=600, bg="#f0f8f0", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)
        
        # Start confetti animation
        threading.Thread(target=self.create_confetti, daemon=True).start()
        
        # Finale Screen
        self.canvas.create_text(250, 100, text="HAPPY BIRTHDAY! 🎉", 
                               fill="#2d8659", font=("Segoe UI", 24, "bold"), tags="finale")

        message = (
            "Chúc mừng sinh nhật (Tên bạn)! 🎉\n\n"
            "1/4 nên nãy giờ có mấy cái đùa vui thôi, còn đây là thật lòng nè:\n"
            "Chúc bạn tuổi mới lúc nào cũng rạng rỡ, học hành siêu đỉnh và ngày càng xinh gái.\n"
            "Xin lỗi vì món quà này đến hơi muộn (và cái cách nhận quà cũng hơi cồng kềnh tí).\n"
            "Chai sữa tắm với tẩy trang kia là để bạn chăm sóc bản thân tốt hơn đó.\n"
            "Tuy tui có hơi thô sơ, chỉ biết dùng code để gửi lời chúc, nhưng đây là cả tâm huyết của tui dành cho bạn.\n"
            "Mãi là bạn tốt nhé! ❤️"
        )
        
        self.canvas.create_text(250, 300, text=message, fill="#2d8659", 
                               font=("Segoe UI", 12), justify="center", tags="finale")

        # Exit button
        exit_btn = tk.Button(self.root, text="🎓 Mãi Là Bạn Tốt 🎓", command=self.root.quit,
                           bg="#FFB7C5", fg="#2d8659", font=self.custom_font, relief="flat", padx=20)
        self.canvas.create_window(250, 500, window=exit_btn, tags="finale")

    def create_confetti(self):
        colors = ["#98FF98", "#FFB7C5", "#2d8659", "#f0f8f0", "#e6b3cc"]
        confetti_pieces = []
        
        for _ in range(100):
            x = random.randint(0, 500)
            y = random.randint(-600, -50)
            color = random.choice(colors)
            size = random.randint(5, 15)
            speed = random.uniform(2, 8)
            drift = random.uniform(-2, 2)
            
            piece = self.canvas.create_rectangle(x, y, x+size, y+size, fill=color, outline="")
            confetti_pieces.append({'id': piece, 'x': x, 'y': y, 'speed': speed, 'drift': drift})
        
        # Animate confetti
        for _ in range(200):
            for piece in confetti_pieces:
                self.canvas.move(piece['id'], piece['drift'], piece['speed'])
                piece['y'] += piece['speed']
                
                # Reset if out of bounds
                if piece['y'] > 600:
                    self.canvas.coords(piece['id'], piece['x'], -50, 
                                     piece['x'] + 10, -50 + 10)
                    piece['y'] = -50
            
            self.canvas.tag_raise("finale")
            self.root.update()
            threading.Event().wait(0.05)

if __name__ == "__main__":
    root = tk.Tk()
    app = BirthdayGuardian(root)
    root.mainloop()
