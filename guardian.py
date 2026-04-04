import tkinter as tk
from tkinter import messagebox, font
import webbrowser
import random
import threading

# Configuration
WEB_URL = "http://localhost:5173"  # Change this to your actual hosted URL later
INITIAL_CHALLENGE_ANSWER = "17/9/2013" # Example: Where we first met
SECRET_WEB_KEY = "SANG-XIN-MIN-2026"
FINAL_SECRET_CODE = "QUA-MUON-NHUNG-CHAT"

class BirthdayGuardian:
    def __init__(self, root):
        self.root = root
        self.root.title("Người Gác Cổng Khác Lớp")
        self.root.geometry("500x700")
        self.root.configure(bg="#f0f8f0") # Mint green background
        
        self.custom_font = font.Font(family="Arial", size=14)
        self.title_font = font.Font(family="Arial", size=20, weight="bold")
        
        self.setup_ui()

    def setup_ui(self):
        # Title
        self.label_title = tk.Label(
            self.root, text="🎓 NGƯỜI GÁC CỔNG 🎓", 
            fg="#000000", bg="#f0f8f0", font=self.title_font, pady=20
        )
        self.label_title.pack()

        # Phase 1 Container
        self.phase1_frame = tk.Frame(self.root, bg="#f0f8f0")
        self.phase1_frame.pack(pady=20)

        tk.Label(
            self.phase1_frame, text="Thử thách đầu tiên:\nNgày sinh nhật của t là ngày nào (dd/mm/yyyy)?",
            fg="#000000", bg="#f0f8f0", font=self.custom_font, justify="center"
        ).pack(pady=10)

        self.entry_ans = tk.Entry(self.phase1_frame, font=self.custom_font, justify="center", width=20, bg="white", fg="black")
        self.entry_ans.pack(pady=10)

        self.btn_unlock = tk.Button(
            self.phase1_frame, text="Trả lời", command=self.check_initial_challenge,
            bg="#2d8659", fg="white", font=self.custom_font, relief="raised", padx=20, bd=2
        )
        self.btn_unlock.pack(pady=10)

        # Hidden Result Frame
        self.result_frame = tk.Frame(self.root, bg="#f0f8f0")
        
        self.label_key = tk.Label(
            self.result_frame, text=f"KEY VÀO WEB: {SECRET_WEB_KEY}",
            fg="#000000", bg="#f0f8f0", font=self.custom_font, pady=10
        )
        self.label_key.pack()

        self.btn_go_web = tk.Button(
            self.result_frame, text="Mở Web Ngay!", command=self.open_web,
            bg="#2d8659", fg="white", font=self.custom_font, relief="raised", padx=20, bd=2
        )
        self.btn_go_web.pack(pady=10)

        # Phase 2: Final Gateway (Hidden initially)
        self.final_frame = tk.Frame(self.root, bg="#f0f8f0")
        tk.Label(
            self.final_frame, text="----------------------------------\nSau khi chơi xong 4 game trên web,\nhãy nhập Mã Bí Mật vào đây nhé:",
            fg="#000000", bg="#f0f8f0", font=self.custom_font
        ).pack(pady=20)

        self.entry_final = tk.Entry(self.final_frame, font=self.custom_font, justify="center", width=25, bg="white", fg="black")
        self.entry_final.pack(pady=10)

        self.btn_final = tk.Button(
            self.final_frame, text="Nhận Quà Thật Sự", command=self.check_final_code,
            bg="#FFB7C5", fg="white", font=self.custom_font, relief="raised", padx=20, bd=2
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
        self.canvas = tk.Canvas(self.root, width=600, height=700, bg="#f0f8f0", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)
        
        # Start confetti animation
        threading.Thread(target=self.create_confetti, daemon=True).start()
        
        # Finale Screen
        self.canvas.create_text(300, 100, text="HAPPY BIRTHDAY! 🎉", 
                               fill="#000000", font=("Arial", 28, "bold"), tags="finale")

        message = (
            "Chúc mừng sinh nhật bạn! 🎉\n\n"
            "Biết là hôm nay 4/4 rồi, quà đến hơi muộn nên đừng giận tui nhé.\n"
            "Nãy giờ đùa Cá tháng Tư tí thôi, còn đây là những dòng thật lòng nhất:\n\n"
            "Dù bây giờ mỗi đứa một lớp, không còn học chung như hồi năm lớp 5 nữa,\n"
            "nhưng tui vẫn luôn trân trọng tình bạn này.\n\n"
            "Món quà ngoài đời nhìn có vẻ đơn giản, thô sơ\n"
            "(vì tui vụng về khoản gói ghém quá),\n"
            "nhưng hy vọng chai sữa tắm với tẩy trang này\n"
            "sẽ thay tui nhắc bạn chăm sóc bản thân thật tốt.\n\n"
            "Tui không giỏi nói lời hoa mỹ,\n"
            "chỉ biết dùng code để gửi tâm tư,\n"
            "nhưng tình cảm dành cho bạn thì luôn là\n"
            "'hàng thật giá thật'.\n\n"
            "Tuổi mới lúc nào cũng rạng rỡ,\n"
            "học siêu đỉnh và mãi xinh gái nhé! ❤️"
        )
        
        # Hiển thị message theo từng dòng để không bị che
        lines = message.split('\n')
        y_pos = 180
        for line in lines:
            if line.strip():  # Chỉ hiển thị dòng không rỗng
                self.canvas.create_text(300, y_pos, text=line.strip(), 
                                       fill="#000000", font=("Arial", 12), tags="finale")
                y_pos += 25

        # Exit button
        exit_btn = tk.Button(self.root, text="🎓 Mãi Là Bạn Tốt 🎓", command=self.root.quit,
                           bg="#2d8659", fg="white", font=self.custom_font, relief="raised", padx=20, bd=2)
        self.canvas.create_window(300, 600, window=exit_btn, tags="finale")

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
                if piece['y'] > 700:
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
