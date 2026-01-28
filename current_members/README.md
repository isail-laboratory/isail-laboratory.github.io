# Current Members Directory

这个文件夹包含所有当前成员的信息。每个成员有一个独立的 JSON 文件。

## 如何更新自己的信息

### 1. 找到你的 JSON 文件

文件名格式：`名字-姓氏.json`（小写，用连字符连接）

例如：
- Baoyu Jing → `baoyu-jing.json`
- Wenxuan Bao → `wenxuan-bao.json`

### 2. 编辑 JSON 文件

打开你的 JSON 文件，修改需要更新的字段：

```json
{
  "name": "你的名字",
  "category": "phd",
  "image": "static/img/people/current/your-photo.jpg",
  "description": "你的研究兴趣描述",
  "homepage": "https://your-homepage.com",
  "emphasis": null
}
```

**字段说明：**
- `name`: 你的全名
- `category`: 你的类别（phd 或 master）
- `image`: 照片路径，照片应该放在 `static/img/people/current/` 目录
- `description`: 研究兴趣描述（1-2 句话）
- `homepage`: 个人主页链接（如果没有可以设为 `null` 或 `"#"`）
- `emphasis`: 特殊标记，如 "On market!" 或 "On industry market!"（如果没有设为 `null`）

**注意**：显示顺序由 `members-list.json` 中的顺序决定，不需要 `order` 字段。

### 3. 更新照片（如果需要）

1. 将新照片放到 `static/img/people/current/` 目录
2. 在 JSON 文件中更新 `image` 字段为新的文件名

### 4. 提交更改

1. 提交你的更改到 Git
2. 创建 Pull Request
3. 等待管理员审核和合并

## 注意事项

1. **JSON 格式**：确保 JSON 格式正确
2. **文件命名**：文件名使用小写字母和连字符
3. **照片路径**：照片路径相对于网站根目录
4. **更新 members-list.json**：如果你是新成员，需要在 `members-list.json` 中添加你的文件名
5. **显示顺序**：成员显示顺序由 `members-list.json` 中的顺序决定，调整顺序只需修改该文件中的列表顺序