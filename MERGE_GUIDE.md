# Hướng dẫn Merge Branch feature/mega-menu vào main

Tài liệu này hướng dẫn cách gộp các thay đổi từ nhánh tính năng vào nhánh chính một cách an toàn.

## Các bước thực hiện

### 1. Lưu lại các thay đổi hiện tại (Commit)
Trước khi chuyển nhánh, bạn cần lưu lại toàn bộ công việc đang làm trên nhánh `feature/mega-menu`.
```bash
git add .
git commit -m "feat: hoàn thiện mega menu và mobile accordion"
```

### 2. Chuyển về nhánh main
```bash
git checkout main
```

### 3. Cập nhật nhánh main (Tùy chọn)
Nếu có nhiều người cùng làm việc, hãy đảm bảo nhánh `main` của bạn là mới nhất.
```bash
git pull origin main
```

### 4. Merge nhánh tính năng vào main
```bash
git merge feature/mega-menu
```

### 5. Giải quyết xung đột (Nếu có)
Nếu Git báo có "Conflict", bạn hãy mở file bị xung đột lên, chọn code đúng và lưu lại. Sau đó:
```bash
git add .
git commit -m "chore: giải quyết xung đột khi merge"
```

### 6. Đẩy code lên Server
```bash
git push origin main
```

---
**Mẹo:** Để xóa nhánh tính năng sau khi đã merge thành công cho sạch dự án:
```bash
git branch -d feature/mega-menu
```
