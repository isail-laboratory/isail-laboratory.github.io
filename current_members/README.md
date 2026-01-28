# Current Members Directory

This folder contains information for all current lab members. Each member has an independent JSON file.

## How to Update Your Information

### 1. Find Your JSON File

File naming format: `firstname-lastname.json` (lowercase, hyphen-separated)

Examples:
- Baoyu Jing → `baoyu-jing.json`
- Wenxuan Bao → `wenxuan-bao.json`

### 2. Edit Your JSON File

Open your JSON file and modify the fields you want to update:

```json
{
  "name": "Your Name",
  "category": "phd",
  "image": "static/img/people/current/your-photo.jpg",
  "description": "Your research interests description",
  "homepage": "https://your-homepage.com",
  "emphasis": null
}
```

**Field Descriptions:**
- `name`: Your full name
- `category`: Your program (phd or master)
- `image`: Photo path, photos should be placed in the `static/img/people/current/` directory
- `description`: Research interests description (1-2 sentences)
- `homepage`: Personal homepage link (set to `null` or `"#"` if you don't have one)
- `emphasis`: Special tag, such as "On market!" or "On industry market!" (set to `null` if not applicable)

**Note**: Display order is determined by the order in `members-list.json`. No `order` field is needed.

### 3. Update Photo (if needed)

1. Place the new photo in the `static/img/people/current/` directory
2. Update the `image` field in your JSON file with the new filename

### 4. Submit Changes

1. Commit your changes to Git
2. Create a Pull Request
3. Wait for admin review and merge

## Important Notes

1. **JSON Format**: Ensure the JSON format is correct
2. **File Naming**: Use lowercase letters and hyphens for filenames
3. **Photo Path**: Photo paths are relative to the website root directory
4. **Update members-list.json**: If you are a new member, you need to add your filename to `members-list.json`
5. **Display Order**: Member display order is determined by the order in `members-list.json`. To change the order, simply modify the list order in that file.
