# "我的"页面子功能设计文档

**项目名称：** 迎鲤酒店智能助手 - 个人中心子页面
**设计日期：** 2026-04-26
**设计人：** Claude AI
**版本：** v1.0

---

## 1. 项目概述

### 1.1 背景
迎鲤酒店智能助手的"我的"页面目前仅有占位提示，需要完善四个核心子功能：酒店信息、员工管理、经营数据、账户安全。这些功能将为酒店管理者提供完整的酒店管理工具。

### 1.2 目标
- 实现四个独立的功能页面，提供完整的酒店管理能力
- 保持与现有页面风格的一致性（主蓝色 #1a365d、金色 #d4af37）
- 实现渐进式开发，先使用demo数据，后续接入Java后端API
- 提供良好的用户体验，包括加载状态、错误处理、表单验证等

### 1.3 技术栈
- **前端：** HTML5 + CSS3 + Vanilla JavaScript
- **字体：** Playfair Display（标题） + Source Sans Pro（正文）
- **后端：** Java（预留接口）
- **数据存储：** localStorage（demo阶段） + REST API（生产阶段）

---

## 2. 整体架构设计

### 2.1 页面结构
```
profile.html (个人中心主页)
    ├── hotel-info.html (酒店信息)
    ├── staff.html (员工管理)
    ├── business-data.html (经营数据)
    └── account-security.html (账户安全)
```

### 2.2 导航流程
- 用户在profile.html点击菜单项
- 跳转到对应子页面
- 子页面顶部有返回按钮，可返回profile.html
- 各子页面之间暂不支持直接跳转

### 2.3 数据流向
```
前端页面
    ├── Demo阶段: localStorage读写
    └── 生产阶段: fetch API → Java后端
```

### 2.4 状态管理
- 使用localStorage存储demo数据
- 使用sessionStorage存储临时表单数据
- 使用URL参数传递页面间数据（如编辑ID）

---

## 3. 页面详细设计

### 3.1 酒店信息页面 (hotel-info.html)

#### 3.1.1 功能范围
- **基本信息管理：** 酒店名称、地址、联系方式、Logo上传
- **房型管理：** 房型列表、新增/编辑/删除房型、房型图片、价格、设施
- **酒店简介：** 文本编辑器、图片上传、设施服务标签

#### 3.1.2 页面布局
```
┌─────────────────────────────────────┐
│  < 返回     酒店信息                │
├─────────────────────────────────────┤
│                                     │
│  ┌─ 基本信息 ───────────────────┐  │
│  │  [酒店名称] [地址] [联系电话]  │  │
│  │  [酒店Logo] [上传图片]        │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 房型管理 ───────────────────┐  │
│  │  [+ 新增房型]                 │  │
│  │  ┌────────────────────────┐  │  │
│  │  │ 标准间 | ¥299/晚      │  │  │
│  │  │ [编辑] [删除]           │  │  │
│  │  └────────────────────────┘  │  │
│  │  ┌────────────────────────┐  │  │
│  │  │ 豪华间 | ¥599/晚      │  │  │
│  │  │ [编辑] [删除]           │  │  │
│  │  └────────────────────────┘  │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 酒店简介 ───────────────────┐  │
│  │  [富文本编辑器区域]           │  │
│  │  [设施服务标签选择]          │  │
│  └────────────────────────────────┘  │
│                                     │
│          [保存更改]                  │
│                                     │
└─────────────────────────────────────┘
```

#### 3.1.3 数据结构
```javascript
// 酒店基本信息
{
  id: "hotel_001",
  name: "悦悦精品酒店",
  address: "上海市浦东新区陆家嘴环路1000号",
  phone: "021-12345678",
  logo: "/assets/hotel-logo.png"
}

// 房型列表
[
  {
    id: "room_001",
    name: "标准间",
    price: 299,
    area: 30,
    beds: "1.8m大床",
    capacity: 2,
    facilities: ["WiFi", "空调", "电视"],
    images: ["/assets/room1-1.jpg", "/assets/room1-2.jpg"],
    description: "温馨舒适的标准客房"
  }
]

// 酒店简介
{
  description: "悦悦精品酒店位于...",
  facilities: ["免费WiFi", "免费停车", "早餐", "健身房", "游泳池"]
}
```

#### 3.1.4 API接口（预留）
```
GET    /api/hotel/info          获取酒店信息
POST   /api/hotel/info          更新酒店信息
GET    /api/hotel/room-types    获取房型列表
POST   /api/hotel/room-types    新增房型
PUT    /api/hotel/room-types/:id  更新房型
DELETE /api/hotel/room-types/:id  删除房型
```

---

### 3.2 员工管理页面 (staff.html)

#### 3.2.1 功能范围
- **员工基本信息：** 姓名、性别、年龄、电话、邮箱、身份证
- **工作信息：** 部门、职位、工号、入职日期、状态
- **教育经历：** 学历、毕业院校、专业、毕业时间
- **考勤绩效：** 考勤记录、绩效评分、奖惩记录

#### 3.2.2 页面布局
```
┌─────────────────────────────────────┐
│  < 返回     员工管理    [+ 新增]   │
├─────────────────────────────────────┤
│                                     │
│  [搜索框]  [部门筛选▼]  [状态▼]    │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ 张三 | 前台部 | 前台服务员    │ │
│  │ 138****8888 | 在职            │ │
│  │ [查看详情] [编辑] [删除]       │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ 李四 | 客房部 | 客房主管      │ │
│  │ 139****9999 | 在职            │ │
│  │ [查看详情] [编辑] [删除]       │ │
│  └────────────────────────────────┘ │
│                                     │
│           [加载更多]                 │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  < 返回     员工详情                │
├─────────────────────────────────────┤
│                                     │
│  ┌─ 基本信息 ───────────────────┐  │
│  │ 姓名：张三  性别：女          │  │
│  │ 年龄：28  电话：138****8888   │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 工作信息 ───────────────────┐  │
│  │ 部门：前台部  职位：前台服务员  │  │
│  │ 工号：ST001  入职：2024-01-15 │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 教育经历 ───────────────────┐  │
│  │ 本科 | 上海旅游学院          │  │
│  │ 酒店管理专业 | 2018年毕业    │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 考勤绩效 ───────────────────┐  │
│  │ 本月考勤：22天 | 绩效：95分  │  │
│  │ 奖励：服务之星               │  │
│  └────────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

#### 3.2.3 数据结构
```javascript
// 员工信息
{
  id: "staff_001",
  basicInfo: {
    name: "张三",
    gender: "女",
    age: 28,
    phone: "13800138000",
    email: "zhangsan@example.com",
    idCard: "310***********1234",
    avatar: "/assets/avatar.jpg"
  },
  workInfo: {
    department: "前台部",
    position: "前台服务员",
    employeeId: "ST001",
    joinDate: "2024-01-15",
    status: "active" // active, resigned, probation
  },
  education: {
    degree: "本科",
    school: "上海旅游学院",
    major: "酒店管理",
    graduateDate: "2018-06"
  },
  performance: {
    attendance: {
      month: "2024-04",
      days: 22,
      late: 0,
      absent: 0
    },
    score: 95,
    rewards: ["服务之星"],
    punishments: []
  }
}
```

#### 3.2.4 API接口（预留）
```
GET    /api/staff               获取员工列表
GET    /api/staff/:id           获取员工详情
POST   /api/staff               新增员工
PUT    /api/staff/:id           更新员工信息
DELETE /api/staff/:id           删除员工
GET    /api/staff/:id/performance 获取考勤绩效
```

---

### 3.3 经营数据页面 (business-data.html)

#### 3.3.1 功能范围
- **运营指标：** 入住率、平均房价、RevPAR、可售房收入
- **财务报表：** 日/周/月/年收入、利润、成本、利润率
- **数据筛选：** 时间范围选择、指标类型选择
- **数据导出：** Excel导出功能（预留）

#### 3.3.2 页面布局
```
┌─────────────────────────────────────┐
│  < 返回     经营数据               │
├─────────────────────────────────────┤
│                                     │
│  [本月 ▼]  [导出]                 │
│                                     │
│  ┌─ 运营指标 ───────────────────┐  │
│  │                              │  │
│  │   入住率                      │  │
│  │   78.5%  ↑ 5.2%              │  │
│  │                              │  │
│  │   平均房价(ADR)              │  │
│  │   ¥456  ↑ 12.3%             │  │
│  │                              │  │
│  │   RevPAR                     │  │
│  │   ¥358  ↑ 18.7%             │  │
│  │                              │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 财务报表 ───────────────────┐  │
│  │  月份    收入    成本    利润  │  │
│  │  4月   ¥150万  ¥90万  ¥60万 │  │
│  │  3月   ¥145万  ¥88万  ¥57万 │  │
│  │  2月   ¥130万  ¥80万  ¥50万 │  │
│  │  1月   ¥120万  ¥75万  ¥45万 │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 收入趋势图 ─────────────────┐  │
│  │  [柱状图/折线图显示]          │  │
│  └────────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

#### 3.3.3 数据结构
```javascript
// 运营指标
{
  period: "2024-04",
  occupancyRate: 78.5,
  adr: 456,
  revpar: 358,
  changeRate: {
    occupancyRate: 5.2,
    adr: 12.3,
    revpar: 18.7
  }
}

// 财务报表
[
  {
    month: "2024-04",
    revenue: 1500000,
    cost: 900000,
    profit: 600000,
    profitRate: 40
  },
  {
    month: "2024-03",
    revenue: 1450000,
    cost: 880000,
    profit: 570000,
    profitRate: 39.3
  }
]

// 收入趋势（用于图表）
{
  labels: ["1月", "2月", "3月", "4月"],
  data: [1200000, 1300000, 1450000, 1500000]
}
```

#### 3.3.4 API接口（预留）
```
GET    /api/business/metrics     获取运营指标
GET    /api/business/financial   获取财务报表
GET    /api/business/trend       获取趋势数据
GET    /api/business/export      导出报表
```

---

### 3.4 账户安全页面 (account-security.html)

#### 3.4.1 功能范围
- **修改密码：** 输入旧密码、新密码、确认密码
- **手机号绑定：** 验证码验证、手机号修改
- **安全提示：** 密码强度提示、上次登录时间

#### 3.4.2 页面布局
```
┌─────────────────────────────────────┐
│  < 返回     账户安全               │
├─────────────────────────────────────┤
│                                     │
│  ┌─ 修改密码 ───────────────────┐  │
│  │                              │  │
│  │  当前密码                    │  │
│  │  [********************]      │  │
│  │                              │  │
│  │  新密码                      │  │
│  │  [********************]      │  │
│  │  [强度：强 ✓]               │  │
│  │                              │  │
│  │  确认新密码                  │  │
│  │  [********************]      │  │
│  │                              │  │
│  │      [确认修改]               │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 手机号绑定 ─────────────────┐  │
│  │                              │  │
│  │  当前手机号                  │  │
│  │  138****8888  [修改]         │  │
│  │                              │  │
│  │  新手机号                    │  │
│  │  [_____________]  [获取验证码] │  │
│  │                              │  │
│  │  验证码                      │  │
│  │  [_____]                     │  │
│  │                              │  │
│  │      [确认绑定]               │  │
│  └────────────────────────────────┘  │
│                                     │
│  ┌─ 安全提示 ───────────────────┐  │
│  │  上次登录：2024-04-26 14:30  │  │
│  │  登录地点：上海市            │  │
│  │  登录设备：Chrome / Windows  │  │
│  └────────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

#### 3.4.3 数据结构
```javascript
// 用户账户信息
{
  userId: "user_001",
  username: "李经理",
  phone: "13800138000",
  email: "manager@example.com",
  lastLogin: {
    time: "2024-04-26T14:30:00",
    location: "上海市",
    device: "Chrome / Windows"
  },
  security: {
    passwordStrength: "strong",
    twoFactorEnabled: false
  }
}
```

#### 3.4.4 API接口（预留）
```
POST   /api/account/password    修改密码
POST   /api/account/sms/send    发送验证码
POST   /api/account/phone/update  更新手机号
GET    /api/account/info        获取账户信息
```

---

## 4. 通用组件设计

### 4.1 顶部导航栏
所有子页面统一使用以下顶部导航栏：
- 左侧：返回按钮（点击返回profile.html）
- 中间：页面标题
- 右侧：操作按钮（如"新增"、"保存"等，按需显示）

### 4.2 加载状态
- 数据加载时显示加载动画
- 使用skeleton screen或spinner
- 超时显示错误提示

### 4.3 错误处理
- 网络错误：显示友好提示，提供重试按钮
- 表单验证：实时验证，显示错误信息
- 服务器错误：显示具体错误码和提示

### 4.4 表单组件
- 统一的输入框样式（圆角、边框、focus效果）
- 必填项标注（*）
- 表单验证规则（手机号、邮箱、密码强度等）
- 提交按钮禁用状态

### 4.5 提示消息
- 成功提示：绿色，带确认图标
- 错误提示：红色，带警告图标
- 信息提示：蓝色，带信息图标
- 3秒后自动消失

---

## 5. 技术实现细节

### 5.1 数据存储策略

#### Demo阶段
```javascript
// localStorage键值
const STORAGE_KEYS = {
  HOTEL_INFO: 'yingli_hotel_info',
  ROOM_TYPES: 'yingli_room_types',
  STAFF_LIST: 'yingli_staff_list',
  BUSINESS_DATA: 'yingli_business_data',
  USER_INFO: 'yingli_user_info'
};

// 初始化demo数据
function initDemoData() {
  if (!localStorage.getItem(STORAGE_KEYS.HOTEL_INFO)) {
    localStorage.setItem(STORAGE_KEYS.HOTEL_INFO, JSON.stringify(demoHotelInfo));
  }
  // ... 其他数据初始化
}
```

#### 生产阶段
```javascript
// API调用封装
const API_BASE_URL = '/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }

    return data;
  } catch (error) {
    showError(error.message);
    throw error;
  }
}
```

### 5.2 路由管理
```javascript
// 返回上一页
function goBack() {
  // 如果有来源页面，返回来源页面
  if (document.referrer) {
    window.history.back();
  } else {
    // 否则返回profile.html
    window.location.href = 'profile.html';
  }
}

// 跳转到详情页
function goToDetail(page, id) {
  window.location.href = `${page}.html?id=${id}`;
}
```

### 5.3 表单验证
```javascript
// 验证规则
const validators = {
  phone: (value) => /^1[3-9]\d{9}$/.test(value),
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  password: (value) => value.length >= 8,
  required: (value) => value && value.trim() !== ''
};

// 表单验证函数
function validateForm(formId, rules) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const errors = {};

  for (const [field, validator] of Object.entries(rules)) {
    const value = formData.get(field);
    if (!validator(value)) {
      errors[field] = `${field}格式不正确`;
    }
  }

  return errors;
}
```

### 5.4 密码强度检测
```javascript
function checkPasswordStrength(password) {
  let strength = 0;
  const criteria = {
    length: password.length >= 8,
    number: /\d/.test(password),
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    special: /[!@#$%^&*]/.test(password)
  };

  strength = Object.values(criteria).filter(Boolean).length;

  if (strength <= 2) return { level: 'weak', label: '弱', color: '#e53e3e' };
  if (strength <= 3) return { level: 'medium', label: '中', color: '#d4af37' };
  return { level: 'strong', label: '强', color: '#38a169' };
}
```

---

## 6. 页面风格一致性

### 6.1 色彩系统
```css
:root {
  --primary-blue: #1a365d;      /* 主色调 - 标题、按钮 */
  --accent-gold: #d4af37;       /* 强调色 - 高亮、图标 */
  --white: #ffffff;             /* 白色 - 背景 */
  --bg-light: #f7fafc;          /* 浅色背景 */
  --text-dark: #2d3748;         /* 深色文字 */
  --text-light: #718096;        /* 浅色文字 */
  --border-color: #e2e8f0;      /* 边框颜色 */
  --success: #38a169;           /* 成功色 */
  --error: #e53e3e;             /* 错误色 */
  --warning: #d4af37;           /* 警告色 */
}
```

### 6.2 字体系统
```css
:root {
  --font-title: 'Playfair Display', serif;    /* 标题字体 */
  --font-body: 'Source Sans Pro', sans-serif; /* 正文字体 */
}
```

### 6.3 间距系统
```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

### 6.4 圆角系统
```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### 6.5 阴影系统
```css
:root {
  --shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-large: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### 6.6 通用样式类
```css
/* 容器 */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

/* 卡片 */
.card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-subtle);
  margin-bottom: var(--spacing-md);
}

/* 按钮 */
.btn {
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-blue) 0%, #2c5282 100%);
  color: var(--white);
}

.btn-gold {
  background: linear-gradient(135deg, var(--accent-gold) 0%, #ecc94b 100%);
  color: var(--white);
}

/* 输入框 */
.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-family: var(--font-body);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}
```

---

## 7. 用户体验设计

### 7.1 加载体验
- 首次加载：显示骨架屏或加载动画
- 数据刷新：显示轻量级spinner
- 超时处理：3秒后显示"加载超时，点击重试"

### 7.2 错误处理
- 网络错误：显示"网络连接失败，请检查网络"
- 表单错误：实时显示错误信息在输入框下方
- 服务器错误：显示"服务暂时不可用，请稍后重试"

### 7.3 操作反馈
- 保存成功：显示成功提示，2秒后返回
- 删除确认：显示确认对话框
- 表单验证：输入时实时验证，失去焦点时提示

### 7.4 响应式设计
- 移动端优先，确保在手机上良好显示
- 横屏适配：表格支持横向滚动
- 字体大小：最小14px，确保可读性

---

## 8. 性能优化

### 8.1 资源加载
- CSS和JavaScript内联在HTML中（demo阶段）
- 图片懒加载
- 使用CDN加载Google Fonts

### 8.2 数据缓存
- localStorage缓存demo数据
- API数据缓存5分钟（生产阶段）
- 使用sessionStorage存储临时表单数据

### 8.3 代码优化
- 使用事件委托处理列表点击
- 防抖处理搜索输入
- 节流处理滚动事件

---

## 9. 安全考虑

### 9.1 输入验证
- 前端验证所有用户输入
- 防止XSS攻击（转义HTML）
- 防止CSRF攻击（添加token）

### 9.2 数据安全
- 敏感信息脱敏显示（手机号、身份证）
- 密码强度要求：至少8位，包含数字和字母
- 验证码有效期：5分钟

### 9.3 权限控制
- 未登录用户重定向到登录页
- 敏感操作需要再次确认
- 登录状态检查：每次API调用

---

## 10. 实施计划

### 10.1 第一阶段：基础框架（第1周）
- 创建4个HTML页面文件
- 实现统一的顶部导航栏
- 实现返回按钮功能
- 定义统一的CSS变量和样式类

### 10.2 第二阶段：数据层（第1-2周）
- 实现localStorage数据存储
- 编写demo数据初始化函数
- 实现数据CRUD操作函数
- 编写API调用封装（预留）

### 10.3 第三阶段：功能开发（第2-3周）
- 酒店信息页面：基本信息、房型管理、酒店简介
- 员工管理页面：列表展示、详情查看、新增编辑
- 经营数据页面：指标展示、报表展示、图表（预留）
- 账户安全页面：修改密码、手机号绑定

### 10.4 第四阶段：优化完善（第3-4周）
- 表单验证完善
- 错误处理完善
- 加载状态完善
- 用户体验优化

### 10.5 第五阶段：测试上线（第4周）
- 功能测试
- 兼容性测试
- 性能测试
- 上线部署

---

## 11. 测试用例

### 11.1 酒店信息页面
- [ ] 能够查看酒店基本信息
- [ ] 能够编辑酒店基本信息并保存
- [ ] 能够添加新房型
- [ ] 能够编辑房型信息
- [ ] 能够删除房型
- [ ] 能够编辑酒店简介
- [ ] 能够选择设施服务标签

### 11.2 员工管理页面
- [ ] 能够查看员工列表
- [ ] 能够搜索员工
- [ ] 能够按部门筛选员工
- [ ] 能够查看员工详情
- [ ] 能够添加新员工
- [ ] 能够编辑员工信息
- [ ] 能够删除员工
- [ ] 列表分页正常工作

### 11.3 经营数据页面
- [ ] 能够查看运营指标
- [ ] 能够查看财务报表
- [ ] 能够切换时间范围
- [ ] 数据显示正确
- [ ] 能够导出报表（预留）

### 11.4 账户安全页面
- [ ] 能够修改密码
- [ ] 密码强度检测正常工作
- [ ] 新旧密码不一致时提示
- [ ] 能够修改手机号
- [ ] 验证码发送功能正常
- [ ] 能够查看上次登录信息

---

## 12. 后续扩展

### 12.1 功能扩展
- 酒店信息：多语言支持、在线预订集成
- 员工管理：排班管理、薪资管理
- 经营数据：更多图表类型、自定义报表
- 账户安全：两步验证、设备管理

### 12.2 技术升级
- 接入真实的Java后端API
- 使用Vue/React重构（可选）
- 引入TypeScript提升代码质量
- 使用Chart.js/ECharts实现图表

### 12.3 性能优化
- 实现虚拟滚动优化长列表
- 使用Service Worker实现离线缓存
- 图片压缩和CDN加速
- 代码分割和懒加载

---

## 13. 附录

### 13.1 参考资料
- [MDN Web Docs](https://developer.mozilla.org/)
- [Google Fonts](https://fonts.google.com/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### 13.2 设计资源
- 图标：Material Design Icons
- 图片：Pexels / Unsplash
- 配色：Tailwind CSS Color Palette

### 13.3 版本历史
- v1.0 (2024-04-26): 初始版本

---

**文档结束**
