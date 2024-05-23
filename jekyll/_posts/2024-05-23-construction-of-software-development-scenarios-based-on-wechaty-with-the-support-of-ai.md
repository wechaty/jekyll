---
title: "基于wechaty的软件开发场景在AI加持下的构建"
author: David
categories: article
tags:
  - ai
  - gpt-4
  - automation
  - chatbot
image: /assets/2024/05-construction-of-software-development-scenarios-based-on-wechaty-with-the-support-of-ai/article-picture.webp
---

> 作者: [David], A fanatical AI player.

随着大模型的发展，在AI辅助编程的领域的关注热区已经从代码生成任务，扩展到很多其他开发任务，例如自动生成测试用例、bug 自动修复等。同时，作为上游的需求工程也成为热议的话题。然而，在把程序员从繁重的编码劳动中解放这个伟大的事情落地的过程中，对实际工作场景的重构至关重要，而当下的关注度却远不如AI研究工作本身。

## 为什么软件开发中场景很重要？

我们从一个简单问题说起。GPT-4出现至今，在辅助程序员编程任务上仍然强于代码大模型产品，为什么AI编程需要代码大模型产品，而不是直接用GPT-4？首先，代码大模型工具可以捕获代码上下文数据，可以支持多文件的数据输入，在代码理解能力的提升上具有可扩展性。其次，程序员在编码的时候特别需要连贯性，这种顺畅的编码是极好的用户体验，复制粘贴这种操作是他们不喜欢的。代码大模型产品是以插件的形式嵌入IDE中的，而直接使用GPT-4虽然能力很强，但是没在实际开发场景中，因此没能很好的发挥作用。最后，融入场景能更好的沉淀数据、计算指标、迭代优化。
同样，在编码的上游是Plan阶段，也就是需求工程，目前已经有很多能力可以由大模型完成，但如果不把这样的能力以工具或产品的形态放到实际场景中，那也很难发力。在需求讨论的过程中，这个场景就是在即时聊天工具中的需求讨论。对于多数国内的C端开发者，微信作为最主流的及时聊天工具，如果能把需求讨论的场景梳理清楚，把大模型的能力嫁接进来，对于需求讨论的提效是不可估量的，而wechaty就是这样一个极好的辅助工具。
在扩展人机协作方式中，场景下的用户需求指引AI研究方向，研究成果嫁接到工作场景，只有从场景的角度思考，才有可能打破现有功能边界，产生非线性的效能提升。

## 如何基于wechaty打造AI赋能的软件开发场景

### 软件开发工作流程是什么？

Devops 模式是当下软件开发中典型的最佳实践，通常情况下包括从需求设计、编码、持续集成到持续交付，再通过反馈环路持续学习，回馈到初始的需求设计阶段，形成闭环并持续迭代。在整个环路中，不但需要各阶段的工程实践，还需要实时高效的沟通协作，才能保障业务目标落地。

![devops.webp](/assets/2024/05-construction-of-software-development-scenarios-based-on-wechaty-with-the-support-of-ai/devops.webp)

### 如何利用AI加持各个阶段的工程实践？

在Plan阶段，需求获取、需求拆分、需求分类、需求排序等场景，是需求工程中可以通过大模型完成的任务，相关人员可以通过群聊天记录自动整理需求（例如：@wechaty/summarize，默认把群聊天中的信息自动梳理成需求条目），再把这些需求分类（例如：@wechaty/classify fun，按功能需求和非功能需求区分）。执行这些操作通过调用类似GPT-4接口实现。以下是笔者在代码大模型公司任职时做的一个例子：

```json
{
  "version": 4,
  "history": [
    {
      "id": "2763320d-38aa-4870-a3c6-df0f62bd85c6",
      "name": "我们要做一个日志分析系统，可以通过读取指定错误日志进行分析，...",
      "messages": [
        {
          "role": "user",
          "content": "我们要做一个日志分析系统，可以通过读取指定错误日志进行分析，找出错误原因并给出推荐解法。请做下需求分解"
        },
        {
          "role": "assistant",
          "content": "1. 日志读取模块：\n   a. 支持多种日志格式（如：txt, log, json等）\n   b. 支持日志文件的导入和导出\n   c. 支持实时日志监控和分析\n\n2. 日志解析模块：\n   a. 提取日志中的关键信息（如：错误代码，错误描述，时间戳等）\n   b. 对日志进行分类（如：系统错误，网络错误，用户操作错误等）\n   c. 支持自定义解析规则和过滤条件\n\n3. 错误原因分析模块：\n   a. 根据错误代码和描述，分析错误原因\n   b. 支持自定义错误原因分析规则\n   c. 对相似错误进行归类和统计\n\n4. 推荐解决方案模块：\n   a. 根据错误原因，给出相应的解决方案\n   b. 支持自定义解决方案库\n   c. 支持解决方案的评分和反馈\n\n5. 可视化展示模块：\n   a. 提供日志概览，包括错误数量，类型分布等\n   b. 提供错误详情查看，包括错误原因和推荐解决方案\n   c. 支持自定义报表和图表展示\n\n6. 用户管理模块：\n   a. 支持用户注册和登录\n   b. 支持用户权限管理（如：管理员，普通用户等）\n   c. 支持用户个人信息管理（如：修改密码，查看操作记录等）\n\n7. 系统设置模块：\n   a. 支持日志解析规则和错误原因分析规则的管理\n   b. 支持解决方案库的管理\n   c. 支持系统参数配置（如：日志存储路径，日志保留时间等）\n\n8. API接口模块：\n   a. 提供日志上传和下载接口\n   b. 提供错误原因分析和推荐解决方案查询接口\n   c. 支持第三方系统集成\n\n9. 文档和帮助模块：\n   a. 提供用户手册和操作指南\n   b. 提供常见问题解答\n   c. 支持在线客服和反馈功能"
        },
        {
          "role": "user",
          "content": "技术选型用什么？能给出建议么？"
        },
        {
          "role": "assistant",
          "content": "技术选型需要根据项目需求、团队技能和预算等因素综合考虑。以下是一些建议：\n\n1. 后端技术选型：\n   a. 编程语言：可以选择 Java、Python、Node.js、Go 等，具体取决于团队熟悉程度和项目需求。\n   b. 数据库：可以选择关系型数据库如 MySQL、PostgreSQL，或者非关系型数据库如 MongoDB、Redis，具体取决于数据存储需求。\n   c. 框架：可以选择 Spring Boot（Java）、Django（Python）、Express（Node.js）等，具体取决于编程语言和团队熟悉程度。\n\n2. 前端技术选型：\n   a. 前端框架：可以选择 React、Vue、Angular 等，具体取决于团队熟悉程度和项目需求。\n   b. UI 组件库：可以选择 Ant Design、Element UI、Bootstrap 等，具体取决于前端框架和设计需求。\n   c. 数据可视化库：可以选择 ECharts、Highcharts、D3.js 等，具体取决于数据展示需求。\n\n3. 日志解析技术选型：\n   a. 日志解析库：可以选择 Logstash、Fluentd、Logparser 等，具体取决于日志格式和解析需求。\n   b. 正则表达式：可以使用正则表达式进行自定义日志解析。\n\n4. 服务器和部署选型：\n   a. 服务器：可以选择云服务器如 AWS、阿里云、腾讯云等，或者自建服务器。\n   b. 部署方式：可以选择 Docker 容器化部署，或者传统的服务器部署。\n   c. 持续集成和持续部署（CI/CD）：可以选择 Jenkins、GitLab CI/CD、Travis CI 等。\n\n5. 版本控制和项目管理选型：\n   a. 版本控制：可以选择 Git 进行代码版本管理。\n   b. 项目管理工具：可以选择 Jira、Trello、Teambition 等，具体取决于团队协作需求。\n\n这些技术选型建议仅供参考，具体还需要根据项目实际情况和团队技能进行选择。"
        },
        {
          "role": "user",
          "content": "对于日志这种非关系型数据，数据库怎么选？主要做日志分析"
        },
        {
          "role": "assistant",
          "content": "对于日志这种非关系型数据，可以选择以下几种类型的数据库进行存储和分析：\n\n1. 时间序列数据库（Time Series Database）：\n   时间序列数据库主要用于存储和查询时间序列数据，适合处理日志这种按时间顺序生成的数据。常见的时间序列数据库有 InfluxDB、OpenTSDB、TimescaleDB 等。\n\n2. 列式数据库（Columnar Database）：\n   列式数据库将数据按列存储，适合大量数据的分析查询。常见的列式数据库有 Apache Cassandra、HBase、ClickHouse 等。\n\n3. 文档型数据库（Document Database）：\n   文档型数据库以文档为单位进行数据存储，适合存储日志这种结构不固定的数据。常见的文档型数据库有 MongoDB、Couchbase、RavenDB 等。\n\n4. 搜索引擎数据库（Search Engine Database）：\n   搜索引擎数据库主要用于全文检索和日志分析，可以快速查询和分析大量日志数据。常见的搜索引擎数据库有 Elasticsearch、Apache Solr 等。\n\n在选择数据库时，需要根据日志分析系统的具体需求进行权衡。例如，如果需要实时分析和查询大量日志数据，可以考虑使用 Elasticsearch，它具有强大的全文检索和实时分析能力。如果日志数据量较大，且需要高效地进行时间序列分析，可以考虑使用 InfluxDB 或 TimescaleDB。"
        },
        {
          "role": "user",
          "content": "我们团队从现状出发，决定用Flask + mongodb的技术框架搭建一个日志分析的服务，用来识别和分析交付流水线错误日志。能从实际开发的角度，把整个系统拆分成几个独立的功能模块么？"
        },
        {
          "role": "assistant",
          "content": "基于 Flask + MongoDB 技术框架搭建日志分析服务，可以将整个系统拆分成以下几个独立的功能模块：\n\n1. 日志接收与存储模块：\n   a. 设计 RESTful API 接口，用于接收上传的错误日志。\n   b. 将接收到的日志数据存储到 MongoDB 数据库中。\n\n2. 日志解析模块：\n   a. 编写日志解析函数，用于提取日志中的关键信息（如：错误代码，错误描述，时间戳等）。\n   b. 对日志进行分类（如：系统错误，网络错误，用户操作错误等）。\n   c. 支持自定义解析规则和过滤条件。\n\n3. 错误原因分析模块：\n   a. 根据错误代码和描述，分析错误原因。\n   b. 支持自定义错误原因分析规则。\n   c. 对相似错误进行归类和统计。\n\n4. 推荐解决方案模块：\n   a. 根据错误原因，给出相应的解决方案。\n   b. 支持自定义解决方案库。\n   c. 支持解决方案的评分和反馈。\n\n5. 数据可视化模块：\n   a. 设计 RESTful API 接口，用于查询日志概览，包括错误数量，类型分布等。\n   b. 设计 RESTful API 接口，用于查询错误详情，包括错误原因和推荐解决方案。\n   c. 支持自定义报表和图表展示。\n\n6. 用户认证与权限管理模块：\n   a. 使用 Flask 的认证扩展（如：Flask-Login、Flask-Security 等）实现用户注册、登录和权限管理。\n   b. 支持用户个人信息管理（如：修改密码，查看操作记录等）。\n\n7. 系统设置与配置模块：\n   a. 支持日志解析规则和错误原因分析规则的管理。\n   b. 支持解决方案库的管理。\n   c. 支持系统参数配置（如：日志存储路径，日志保留时间等）。\n\n这些功能模块可以根据实际需求进行调整和优化。在开发过程中，可以采用模块化和分层的设计思想，降低各个模块之间的耦合度，提高系统的可维护性和可扩展性。"
        },
        {
          "role": "user",
          "content": "日志接收与存储模块拆解下吧，践行敏捷开发，拆解成几个需求卡片，每个卡片故事点数控制在 3 左右"
        },
        {
          "role": "assistant",
          "content": "日志接收与存储模块可以拆解成以下几个需求卡片：\n\n1. 需求卡片1：设计日志上传接口（故事点数：3）\n   a. 设计一个 RESTful API 接口，用于接收上传的错误日志。\n   b. 支持多种日志格式（如：txt, log, json等）。\n   c. 对上传的日志进行基本的验证和预处理。\n\n2. 需求卡片2：实现日志存储（故事点数：3）\n   a. 将接收到的日志数据存储到 MongoDB 数据库中。\n   b. 设计合适的数据库结构，以便于后续的日志解析和分析。\n   c. 实现日志数据的增删改查操作。\n\n3. 需求卡片3：实现日志文件导入和导出功能（故事点数：3）\n   a. 实现从本地或远程服务器导入日志文件的功能。\n   b. 实现将数据库中的日志数据导出为文件的功能。\n   c. 支持多种文件格式的导入和导出。\n\n4. 需求卡片4：实现实时日志监控功能（故事点数：3）\n   a. 监控指定路径下的日志文件，实时读取新增的日志内容。\n   b. 将实时读取到的日志内容存储到 MongoDB 数据库中。\n   c. 提供实时日志监控的开启和关闭功能。\n\n这些需求卡片可以根据实际项目进度和团队能力进行调整。在实际开发过程中，可以采用敏捷开发的方式，逐步完善功能并及时调整需求。"
        },
        {
          "role": "user",
          "content": "我们实际情况是这样的：日志从交付流水线中拉取来分析，只对错误日志分析。"
        },
        {
          "role": "assistant",
          "content": "了解您的实际情况，针对从交付流水线中拉取错误日志进行分析的需求，可以将日志接收与存储模块调整如下：\n\n1. 需求卡片1：实现从交付流水线拉取错误日志（故事点数：3）\n   a. 集成交付流水线的 API，用于获取错误日志信息。\n   b. 支持多种日志格式（如：txt, log, json等）。\n   c. 对拉取到的日志进行基本的验证和预处理。\n\n2. 需求卡片2：实现日志存储（故事点数：3）\n   a. 将拉取到的错误日志数据存储到 MongoDB 数据库中。\n   b. 设计合适的数据库结构，以便于后续的日志解析和分析。\n   c. 实现日志数据的增删改查操作。\n\n3. 需求卡片3：实现定时拉取错误日志功能（故事点数：3）\n   a. 设计定时任务，定期从交付流水线拉取错误日志。\n   b. 提供定时任务的启动、停止和调度功能。\n   c. 支持自定义拉取时间间隔。\n\n4. 需求卡片4：实现实时日志监控功能（故事点数：3，可选）\n   a. 监控交付流水线中的错误日志，实时读取新增的日志内容。\n   b. 将实时读取到的日志内容存储到 MongoDB 数据库中。\n   c. 提供实时日志监控的开启和关闭功能。\n\n根据您的实际需求，可以根据以上需求卡片进行调整和优化。在实际开发过程中，可以采用敏捷开发的方式，逐步完善功能并及时调整需求。"
        },
        {
          "role": "user",
          "content": "场景：流水线报错以后，主动触发日志分析系统下载日志，日志格式就是.log格式的文本文件"
        },
        {
          "role": "assistant",
          "content": "了解您的场景需求，针对流水线报错后主动触发日志分析系统下载 .log 格式的文本文件进行分析，可以将日志接收与存储模块调整如下：\n\n1. 需求卡片1：实现流水线报错触发下载错误日志（故事点数：3）\n   a. 集成交付流水线的 API 或 Webhook，用于监听流水线报错事件。\n   b. 在收到报错事件后，主动从交付流水线下载对应的 .log 格式错误日志文件。\n\n2. 需求卡片2：实现日志存储（故事点数：3）\n   a. 将下载到的 .log 格式错误日志数据存储到 MongoDB 数据库中。\n   b. 设计合适的数据库结构，以便于后续的日志解析和分析。\n   c. 实现日志数据的增删改查操作。\n\n3. 需求卡片3：实现日志文件导入和导出功能（故事点数：3，可选）\n   a. 实现从本地或远程服务器导入 .log 格式错误日志文件的功能。\n   b. 实现将数据库中的日志数据导出为 .log 格式文件的功能。\n\n根据您的实际需求，可以根据以上需求卡片进行调整和优化。在实际开发过程中，可以采用敏捷开发的方式，逐步完善功能并及时调整需求。"
        },
        {
          "role": "user",
          "content": "文件导入导出可以先不做"
        },
        {
          "role": "assistant",
          "content": "了解您的需求，那么我们可以将日志接收与存储模块调整为以下两个需求卡片：\n\n1. 需求卡片1：实现流水线报错触发下载错误日志（故事点数：3）\n   a. 集成交付流水线的 API 或 Webhook，用于监听流水线报错事件。\n   b. 在收到报错事件后，主动从交付流水线下载对应的 .log 格式错误日志文件。\n\n2. 需求卡片2：实现日志存储（故事点数：3）\n   a. 将下载到的 .log 格式错误日志数据存储到 MongoDB 数据库中。\n   b. 设计合适的数据库结构，以便于后续的日志解析和分析。\n   c. 实现日志数据的增删改查操作。\n\n根据您的实际需求，可以根据以上需求卡片进行开发。在实际开发过程中，可以采用敏捷开发的方式，逐步完善功能并及时调整需求。如果后续有需要，可以再考虑添加文件导入导出功能。"
        },
        {
          "role": "user",
          "content": "MongoDB的设计能给具体建议么？怎么设计db、Collection、document"
        },
        {
          "role": "assistant",
          "content": "在设计 MongoDB 的数据库结构时，需要考虑日志数据的特点和查询需求。以下是一个基本的 MongoDB 数据库结构设计建议：\n\n1. 数据库（db）：\n   创建一个名为 `log_analysis_db` 的数据库，用于存储所有与日志分析相关的数据。\n\n2. 集合（Collection）：\n   a. 创建一个名为 `logs` 的集合，用于存储错误日志数据。\n   b. 创建一个名为 `error_categories` 的集合，用于存储错误类别信息。\n   c. 创建一个名为 `solutions` 的集合，用于存储解决方案信息。\n\n3. 文档（Document）：\n   a. `logs` 集合中的文档结构示例：\n      ```\n      {\n         \"_id\": ObjectId(\"...\"),\n         \"timestamp\": \"2022-01-01T12:00:00Z\",\n         \"log_level\": \"ERROR\",\n         \"error_code\": \"E001\",\n         \"error_message\": \"Network timeout\",\n         \"error_category_id\": ObjectId(\"...\"),\n         \"file_name\": \"example.log\",\n         \"line_number\": 123,\n         \"additional_info\": {...}\n      }\n      ```\n      其中，`_id` 是 MongoDB 自动生成的唯一标识，`timestamp` 是日志的时间戳，`log_level` 是日志级别（如：ERROR、WARNING等），`error_code` 是错误代码，`error_message` 是错误描述，`error_category_id` 是错误类别的外键，`file_name` 是日志文件名，`line_number` 是错误发生的行号，`additional_info` 是其他附加信息。\n\n   b. `error_categories` 集合中的文档结构示例：\n      ```\n      {\n         \"_id\": ObjectId(\"...\"),\n         \"name\": \"Network Error\",\n         \"description\": \"Errors related to network issues\"\n      }\n      ```\n      其中，`_id` 是 MongoDB 自动生成的唯一标识，`name` 是错误类别名称，`description` 是错误类别描述。\n\n   c. `solutions` 集合中的文档结构示例：\n      ```\n      {\n         \"_id\": ObjectId(\"...\"),\n         \"error_code\": \"E001\",\n         \"solution\": \"Check your network connection and try again.\",\n         \"rating\": 4.5\n      }\n      ```\n      其中，`_id` 是 MongoDB 自动生成的唯一标识，`error_code` 是对应的错误代码，`solution` 是解决方案描述，`rating` 是解决方案的评分。\n\n这些设计建议仅供参考，具体的数据库结构设计需要根据实际项目需求和日志数据特点进行调整。在设计过程中，要充分考虑查询性能和数据扩展性。"
        },
        {
          "role": "user",
          "content": "首先我们要有一个测试环境，从数据库就要先分开"
        },
        {
          "role": "assistant",
          "content": "为了实现测试环境和生产环境的隔离，可以在 MongoDB 中为测试环境创建一个单独的数据库。以下是一个简单的方法：\n\n1. 数据库（db）：\n   a. 创建一个名为 `log_analysis_db_test` 的数据库，用于存储测试环境中与日志分析相关的数据。\n   b. 创建一个名为 `log_analysis_db` 的数据库，用于存储生产环境中与日志分析相关的数据。\n\n2. 集合（Collection）和文档（Document）：\n   测试环境和生产环境的集合结构和文档结构可以保持一致，如之前所述的 `logs`、`error_categories` 和 `solutions` 集合。\n\n在实际开发过程中，可以通过配置文件或环境变量来控制应用程序连接到不同的数据库。例如，在 Flask 应用程序中，可以根据不同的环境设置不同的 `MONGODB_URI` 配置项，以连接到相应的测试或生产数据库。\n\n这样，您可以在测试环境中进行功能开发和测试，而不会影响生产环境中的数据。在功能开发完成并通过测试后，可以将代码部署到生产环境。"
        },
        {
          "role": "user",
          "content": "我想把原始数据做一个存储，但也要包含基本元数据，例如：日志ID（对应流水线唯一ID）、日志获取时间等等看看还有哪些"
        },
        {
          "role": "assistant",
          "content": "在存储原始日志数据的同时，可以将一些基本的元数据也存储到 MongoDB 数据库中。以下是一些建议的元数据字段：\n\n1. 日志ID（对应流水线唯一ID）：用于关联流水线和日志数据，便于后续查询和分析。\n2. 日志获取时间：记录日志从流水线获取的时间，便于分析日志产生和获取的时间差。\n3. 流水线名称：记录日志对应的流水线名称，便于区分不同流水线产生的日志。\n4. 项目名称：记录日志对应的项目名称，便于区分不同项目产生的日志。\n5. 构建版本：记录日志对应的构建版本，便于分析不同版本产生的错误。\n6. 构建状态：记录日志对应的构建状态（如：成功、失败、中止等），便于分析构建状态与错误日志的关系。\n\n根据这些建议，可以将 `logs` 集合中的文档结构调整如下：\n\n```\n{\n   \"_id\": ObjectId(\"...\"),\n   \"log_id\": \"pipeline_unique_id\",\n   \"timestamp\": \"2022-01-01T12:00:00Z\",\n   \"log_level\": \"ERROR\",\n   \"error_code\": \"E001\",\n   \"error_message\": \"Network timeout\",\n   \"error_category_id\": ObjectId(\"...\"),\n   \"file_name\": \"example.log\",\n   \"line_number\": 123,\n   \"additional_info\": {...},\n   \"log_acquisition_time\": \"2022-01-01T12:01:00Z\",\n   \"pipeline_name\": \"example_pipeline\",\n   \"project_name\": \"example_project\",\n   \"build_version\": \"v1.0.0\",\n   \"build_status\": \"failed\"\n}\n```\n\n这些元数据字段仅供参考，具体的字段设计需要根据实际项目需求和日志数据特点进行调整。在设计过程中，要充分考虑查询性能和数据扩展性。"
        },
        {
          "role": "user",
          "content": "我想把日志原始文件存下来一份，怎么在MongoDB中设计这个"
        },
        {
          "role": "assistant",
          "content": "在 MongoDB 中存储日志原始文件，可以使用 GridFS（Grid File System）来实现。GridFS 是 MongoDB 提供的一种用于存储和检索大型文件（如：图片、音频、视频等）"
        },
        {
          "role": "user",
          "content": "能不能存储在Collection中，我好方便和流水线ID对应"
        },
        {
          "role": "assistant",
          "content": "当然可以。您可以将日志原始文件作为一个字段存储在 `logs` 集合的文档中。为了方便存储和查询，可以将日志文件内容转换为 Base64 编码格式。以下是一个调整后的 `logs` 集合文档结构示例：\n\n```\n{\n   \"_id\": ObjectId(\"...\"),\n   \"log_id\": \"pipeline_unique_id\",\n   \"timestamp\": \"2022-01-01T12:00:00Z\",\n   \"log_level\": \"ERROR\",\n   \"error_code\": \"E001\",\n   \"error_message\": \"Network timeout\",\n   \"error_category_id\": ObjectId(\"...\"),\n   \"file_name\": \"example.log\",\n   \"line_number\": 123,\n   \"additional_info\": {...},\n   \"log_acquisition_time\": \"2022-01-01T12:01:00Z\",\n   \"pipeline_name\": \"example_pipeline\",\n   \"project_name\": \"example_project\",\n   \"build_version\": \"v1.0.0\",\n   \"build_status\": \"failed\",\n   \"log_file_content\": \"base64_encoded_log_file_content\"\n}\n```\n\n在这个示例中，`log_file_content` 字段用于存储 Base64 编码后的日志文件内容。在实际应用中，您可以在将日志文件存储到 MongoDB 之前，先将其内容转换为 Base64 编码格式。在查询时，可以将 Base64 编码的内容解码回原始文件内容。\n\n需要注意的是，将大量日志文件内容直接存储在文档中可能会影响查询性能。如果日志文件非常大或者数量非常多，建议使用 GridFS 进行存储。"
        },
        {
          "role": "user",
          "content": "请重新拆解任务，调整下之前的需求卡片"
        },
        {
          "role": "assistant",
          "content": "根据您的新需求，我们可以将日志接收与存储模块调整为以下需求卡片：\n\n1. 需求卡片1：实现流水线报错触发下载错误日志（故事点数：3）\n   a. 集成交付流水线的 API 或 Webhook，用于监听流水线报错事件。\n   b. 在收到报错事件后，主动从交付流水线下载对应的 .log 格式错误日志文件。\n\n2. 需求卡片2：实现日志存储（故事点数：3）\n   a. 将下载到的 .log 格式错误日志数据以及相关元数据存储到 MongoDB 数据库中。\n   b. 设计合适的数据库结构，以便于后续的日志解析和分析。\n   c. 实现日志数据的增删改查操作。\n\n3. 需求卡片3：实现日志原始文件存储（故事点数：3）\n   a. 将下载到的 .log 格式错误日志文件转换为 Base64 编码格式。\n   b. 将 Base64 编码后的日志文件内容存储到 MongoDB 数据库中的 `logs` 集合的文档中。\n   c. 在查询时，提供将 Base64 编码的日志文件内容解码回原始文件内容的功能。\n\n根据您的实际需求，可以根据以上需求卡片进行开发。在实际开发过程中，可以采用敏捷开发的方式，逐步完善功能并及时调整需求。"
        },
        {
          "role": "user",
          "content": "请结合Flask框架，写一下这3 个需求卡片的代码"
        },
        {
          "role": "assistant",
          "content": "以下是结合 Flask 框架实现这 3 个需求卡片的示例代码。请注意，这些代码仅供参考，您可能需要根据实际项目需求和环境进行调整。\n\n1. 安装所需的库：\n\n```bash\npip install flask pymongo requests\n```\n\n2. 创建一个名为 `app.py` 的文件，编写 Flask 应用程序代码：\n\n```python\nfrom flask import Flask, request, jsonify\nfrom pymongo import MongoClient\nimport requests\nimport base64\nimport os\n\napp = Flask(__name__)\n\n# 配置 MongoDB 数据库连接\napp.config[\"MONGO_URI\"] = \"mongodb://localhost:27017/log_analysis_db\"\nmongo_client = MongoClient(app.config[\"MONGO_URI\"])\ndb = mongo_client[\"log_analysis_db\"]\n\n# 配置流水线 API 地址和访问凭证（根据实际情况修改）\nPIPELINE_API_URL = \"https://example.com/pipeline/api\"\nPIPELINE_API_TOKEN = \"your_pipeline_api_token\"\n\n@app.route(\"/webhook\", methods=[\"POST\"])\ndef webhook_handler():\n    # 解析 Webhook 事件（根据实际流水线平台的 Webhook 数据格式进行解析）\n    event_data = request.json\n    pipeline_id = event_data[\"pipeline_id\"]\n    log_url = event_data[\"log_url\"]\n\n    # 下载错误日志文件\n    log_file_content = download_log_file(log_url)\n\n    # 将日志文件内容转换为 Base64 编码\n    log_file_content_base64 = base64.b64encode(log_file_content.encode()).decode()\n\n    # 存储日志数据到 MongoDB\n    log_data = {\n        \"log_id\": pipeline_id,\n        \"log_file_content\": log_file_content_base64,\n        # 其他元数据字段...\n    }\n    db.logs.insert_one(log_data)\n\n    return jsonify({\"message\": \"Log data saved successfully\"}), 200\n\ndef download_log_file(log_url):\n    # 使用流水线 API 访问凭证下载日志文件\n    headers = {\"Authorization\": f\"Bearer {PIPELINE_API_TOKEN}\"}\n    response = requests.get(log_url, headers=headers)\n\n    if response.status_code == 200:\n        return response.text\n    else:\n        raise Exception(f\"Failed to download log file: {response.status_code}\")\n\nif __name__ == \"__main__\":\n    app.run(debug=True)\n```\n\n在这个示例代码中，我们创建了一个 Flask 应用程序，并定义了一个名为 `/webhook` 的路由，用于接收流水线平台发送的 Webhook 事件。当收到 Webhook 事件时，我们从事件数据中解析出流水线 ID 和日志文件 URL，然后下载日志文件并将其内容转换为 Base64 编码格式。最后，将日志数据和元数据存储到 MongoDB 数据库中。\n\n请注意，这个示例代码中的 Webhook 事件解析和日志文件下载部分可能需要根据您实际使用的流水线平台进行调整。同时，您还需要根据实际需求补充其他元数据字段的处理。\n\n在完成代码编写后，您可以运行以下命令启动 Flask 应用程序：\n\n```bash\npython app.py\n```\n\n这样，您的日志分析服务将开始监听流水线平台发送的 Webhook 事件，并自动下载和存储错误日志文件。"
        }
      ],
      "model": {
        "id": "gpt-4",
        "name": "GPT-4"
      },
      "prompt": "你的任务是需求分解",
      "temperature": 0,
      "folderId": null
    }
  ],
  "folders": [],
  "prompts": []
}
```
在Code阶段，代码生成、测试用例生成、bug自动修复、代码解释等场景是目前被众多代码大模型产品优先实现的任务，也是当前AI编码关注的热区。然而，从场景考虑需要把各个任务串联，上一级的输出作为下一级的输入。

![plan-and-code.webp](/assets/2024/05-construction-of-software-development-scenarios-based-on-wechaty-with-the-support-of-ai/plan-and-code.webp)

无论是Plan阶段还是Code阶段，如果结果不符合预期，需要调整后方再进入下一阶段，这一点非常必要，因为大模型是概率模型，几个概率相乘下来结果很可能偏离预期。可以发起多轮对话做调整，或直接手工修正，这恰好是wechaty依托微信群这个实时沟通场景中发挥价值的地方。

另外，当前的代码大模型产品的Chat功能，从场景上看有其局限性，一是只能开发者和Chatbot点对点对话，无法形成多人协作；二是Chat功能的自然语言描述来自于上游需求讨论的结果，在IDE开发场景下无法自动导入，因此需要wechaty这样的外部工具去做从Plan到Code的打通。

最后，更重要的是，当前学术界在需求工程讨论中，有一个痛点是需求数据隐匿性强，且获取成本高。如果从场景出发，基于wechaty和微信群生态很容易沉淀下来实际开发场景的数据，对学术界在需求工程的研究上可以给予很大支持。与此同时，学术界所需的数据信息可以反馈给wechaty社区，在真实开发场景中获取。

### 如何利用AI助力实时高效的沟通协作？

软件开发过程中会出现大量的沟通和协作，例如需求讨论、故障定位，社群运营等。这些成本评估下来往往比实际编码更高，因此如果AI能在具体场景中解决痛点问题，则带来的价值更大。可以基于wechaty构建的场景能力和解决的痛点，详见下表。

|**基于wechaty打造场景能力**|**痛点**|
|------|------|
|自动拉群并添加干系人 |我是个“拉群工程师” |
|自动生成群消息摘要 |我刚进群，你们讨论了啥？ |
|自动得出结论 |开会没结果，事情不了了之 |
|群聊天备份 |之前为那个事讨论那么久，聊啥来着？ |
|群解散 |群太多 |

需要注意的是，一个功能可以用在很多场景中，比如，自动拉群这个功能可以在需求讨论分解任务后，按各任务所指派的人批量建群；在故障定位时，把运行时错误代码做关联性分析，相关开发人员自动拉到一个群里。与此同时，一个场景可能需要多个功能支持，比如，一个问题解决后，群的运营周期结束，需要自动备份群聊天，作为数据和知识的沉淀，同时自动解散该群。

## 基于wechaty的AI编程框架

综上所述，这个项目考虑把AI大模型在软件开发全过程中已经被验证过的能力先用起来，利用wechaty和微信生态，在实际开发场景中让开发者感受到AI在效能提升上的价值，逐渐把各个场景连接，沉淀数据、不断优化，让价值更自动的流动。
