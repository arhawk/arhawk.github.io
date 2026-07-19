// Sync with ../projects.js when English content changes.
// Keys are project slugs. See AGENTS.md for translation whitelist and style rules.

export const projectCopyZh = {
  'nem-monitoring-dashboard': {
    category: '数据工程',
    summary:
      '可维护的 NEM 数据 pipeline：Bash CLI 编排、14 条 QC 规则门禁、CI 强制 mart 校验、MQTT 发布，Streamlit dashboard 作为实时消费端。',
    problem:
      '需要一条可审计的链路：导入多源 NEM 电力数据、校验可发布 artifact、实时推送更新，同时让 dashboard 保持响应——还不能依赖持久化数据库。',
    whatBuilt:
      '做了多阶段 pipeline（raw → staging → mart → validate）：Bash CLI 入口、结构化 pass/fail QC 报告与 run manifest、MQTT 发布，下游用 Streamlit 展示摘要卡片、趋势线、地图和表格。',
    dataMethods:
      '确定性清洗与 metadata 对齐产出分层 CSV；QC 覆盖 schema、唯一性、空值率、staging/mart 一致性和 publish payload 字段。Ruff、pytest 与 GitHub Actions 门禁 release——tracked mart 必须通过 validate，CI 才能绿。',
    results:
      '每次 pipeline run 产出 QC 报告与 manifest metadata；校验通过的数据经 MQTT 发布，本地与 Render 部署路径稳定；流过期或中断时有 fallback replay 兜底。',
    limitations:
      '实时缓存只在内存里，不落库，所以更适合监控和 demo，不适合长期存历史数据。',
    nextSteps: '加持久化存储、更完善的告警，以及面向长期运行的运维监控。',
    reproducibility:
      '仓库里有 pipeline CLI、QC 规则与阈值、publisher、dashboard、broker 配置、RUNBOOK 和数据处理文档，可复现整条链路。',
    projectType: '应用型数据系统项目',
    myContribution:
      '负责 ingestion、QC validation、publishing 和 dashboard 四层的设计与实现，并写了 runbook、部署和 fallback 行为说明。',
    engineeringHighlights:
      '主要工程点：带 fail-fast validate gate 的 Bash pipeline CLI；14 条 QC 规则层（baseline 阈值 + JSON/Markdown/HTML 报告）；run-level manifest；CI 集成 mart validation；MQTT topic 设计；有界 StreamCache；Streamlit + 自定义 Leaflet 地图组件。'
  },
  'infinite-canvas-studio': {
    category: '软件工程',
    summary:
      '浏览器里的教学与演示平台：在无限画布上编排非线性课程，支持实时协作。',
    problem:
      '老师和演讲者想要一个浏览器原生工作区，能自由组合文字、媒体、嵌入和交互，做出非线性课程板——又不想被传统幻灯片编辑器绑死。',
    whatBuilt:
      '团队做了一个协作创作系统，支持可编辑页面、样式文本、便签、图片、形状、iframe、本地视频、JavaScript 代码运行、排序活动、附件、连线，以及 Edit / Present 两种模式。',
    dataMethods:
      '前端用类架构（App、ModeManager、StageController）加 plugin、tool、command、component 基类；save / load、undo / redo、房间分享和导出都通过显式文档状态和消息传递完成。',
    results:
      '支持临时在线房间协作、前后端分开部署，还能导出 JSON、单文件 HTML 和 PROJ 文件夹。',
    limitations: '线上 demo 故意做成临时的，不保存长期云端状态。',
    nextSteps: '加持久化存储、更清晰的在线状态提示，以及面向大班教学的协作编辑能力。',
    reproducibility:
      '仓库记录了前端、Node.js WebSocket relay、Vercel 与 Render 的部署拆分，还有 unit 和 Playwright E2E 测试方案。',
    projectType: '协作型软件工程项目',
    myContribution:
      '参与产品范围界定、前端画布实现、Edit/Present 流程、WebSocket 协作、文档、测试和部署。',
    engineeringHighlights:
      '主要工程点：画布平移缩放、组件化编辑、Edit/Present 切换、JSON / HTML / PROJ 导出、WebSocket 房间分享，以及方便后续维护的可测试架构。'
  },
  'medical-image-ml-algorithm': {
    category: 'AI / ML',
    summary:
      '组织病理图像分类案例：在 9 类医学影像数据上对比 Random Forest、MLP 和 CNN，配合 Grad-CAM 可解释性和误差分析。',
    problem:
      '病理切片的自动组织分类能辅助诊断，但在相同数据和评估标准下，哪种模型更好，一开始并不清楚。',
    whatBuilt:
      '把分析流程重构成可复现的 Python 包：CLI 入口、缓存 RF GridSearch、支持 Apple Silicon GPU 的 CNN 训练、Grad-CAM 可视化，以及跨模型误差对比。',
    dataMethods:
      '加载 28×28 RGB NumPy 数组（32,000 train / 8,000 test），像素归一化到 [0, 1]；RF 和 MLP baseline 走 PCA，CNN 在原始 tensor 上训练，带 L2、BatchNorm、dropout 和 early stopping。',
    results:
      'CNN test accuracy 90.1%，高于 PCA + Random Forest（65.7%）和 PCA + MLP（69.3%）。Grad-CAM 和 confusion matrix 标出了空间特征带来的收益，以及最容易混淆的组织类别。',
    limitations:
      '图像是 28×28 小切片，不是全分辨率病理图；MLP baseline 在 Apple Silicon 上对 GPU mixed-precision 比较敏感。',
    nextSteps:
      '试更高分辨率输入，对比 transfer-learning baseline，并为临床审阅加 calibration 和 threshold tuning。',
    reproducibility:
      '仓库有 pyproject.toml、`medimg-train` CLI、setup 脚本、缓存调参产物，以及 docs/SHOWCASE.md 说明。',
    projectType: '端到端 ML 工程项目',
    myContribution:
      '设计端到端链路，实现 CLI 和训练代码，补充 Grad-CAM 和误差分析，并写了本地和 Apple Silicon 的可复现 setup。',
    engineeringHighlights:
      '主要工程点：notebook 打包进 `src/medical_image_ml`、缓存 RF GridSearch、TensorFlow Metal 运行时调优，以及作品集展示的自动出图。'
  },
  'eduattain-prediction': {
    category: '数据分析',
    summary:
      '预测分析项目：用 ABS microdata，经 EDA 和特征清洗，配合 R/Python 集成分类器，估计最高教育程度（ISCED 2011）。',
    problem:
      '政策和劳动力规划需要更清楚地看到：人口统计、社会经济、地理和学徒经历，怎么影响一个人在澳洲的最高教育程度。',
    whatBuilt:
      '团队对 ABS Microdata TableBuilder 做了端到端分析：清洗编码 146 个调查变量，看类别不平衡和缺失，再比较经典模型和 gradient-boosting 分类器，做 10 类 ISCED 预测。',
    dataMethods:
      '导入 40,976 条记录，用 ABS metadata 核对 146 个编码字段，去掉未匹配和仅权重列，未知编码当缺失处理；用 stratified train/test split，以 macro-F1 和 accuracy 评估多分类。',
    results:
      '产出清洗后的建模数据集、探索性报告，以及调好的 XGBoost、LightGBM、CatBoost 链路，同时保留 R baseline（Random Forest、SVM 等）做最高教育程度分类。',
    limitations:
      '调查数据类别多、高基数字段多，没有更强正则或领域分组的话，特征选择和可解释性还是难。',
    nextSteps:
      '给政策读者加 feature-importance 报告，试稀疏类别的 grouped encoding，并评估少数类别的 cost-sensitive 指标。',
    reproducibility:
      '仓库有分阶段 R Markdown notebook、清洗后 CSV、metadata crosswalk 脚本，以及带 RandomizedSearchCV 的可复现 boosting 调优 Python 脚本。',
    projectType: '协作型预测分析项目',
    myContribution:
      '参与基于 ABS metadata 的数据导入与清洗、探索性分析、模型对比，以及 XGBoost、LightGBM、CatBoost 调优的 Python 自动化。',
    engineeringHighlights:
      '主要工程点：解析半结构化 ABS metadata、对齐 146 个变量的编码差异，以及可复用 Python 脚本（自动识别目标列 + stratified cross-validation）。'
  }
};
