## Getting Started - 本地开发

`yarn start` 启动项目

### Installation

要在本地开始，请遵循以下说明:

1. 从 git 上克隆你的代码.
1. 确认你的 node 版本大于 10.0.0.
1. 确认你本地安装了`yarn`; 安装介绍点 [这里](https://yarnpkg.com/lang/en/docs/install/).
1. 从此项目克隆的根目录运行`yarn`（无参数）以安装依赖项.

### 创建一个新的包

添加一个新的包你需要做这些：

1. `yarn lerna create @schiff/PACKAGE_NAME`, 这将为`packages`文件夹中的新包创建基本文件
1. 更改`package.json`将`packages/package`添加到`workspaces`属性。.
1. 添加对其他包的`typescript`支持

### Release & Publish

1. 执行`yarn release` 去发布一个新版本, 此命令会做以下事情：

   - 切到`main`分支并标识当前版本和最新标记
   - 选择一个要发布的新版本
   - 创建一个 release 分支，比如：`release-v1.0.0`
   - 修改包元数据（package.json，version.ts）以反映新版本并生成变更日志
   - 将这些更改提交到发布分支
   - 提交到远程

   你可以执行 `yarn release [patch|minor|major|2.0.0]` 跳过版本选择提示并按该关键字或指定的版本递增版本。

1. 从发布分支向主机提交拉取请求
1. 代码审查和合并请求发布
1. 运行“npm Run pub”to pub lib to npm，此命令将执行以下操作：
   - 获取最新代码并签出到`main`
   - 为新版本创建 tag
   - 提交 tag 到远程
   - 自动运行`yarn build`哪个生成源输出`dist`文件夹
   - `npm publish` 发布到 npm

`yarn release -- --dry-run` or `yarn pub -- --dry-run`

running with the flag `--dry-run` allows you to see what commands would be run, without committing to git or updating files. (意思就是打印一下日志让你看看做了哪些步骤，但是并不会真的执行脚本，你可以放心的执行)

note: 不要使用 npm!不要使用 npm!不要使用 npm!重要的事情说三遍。
