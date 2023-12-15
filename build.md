## electron-builder-config 文件配置

> 官网配置地址 https://www.electron.build/

- appId" 是一个字符串，用于唯一标识您的应用程序。

- `asar: true` 表示使用 asar 格式对应用程序进行打包，将所有源代码和资源文件打包为一个单独的文件。
- `productName` 是您应用程序的名称，用于在构建过程中显示和生成输出文件名。
- `directories.output` 指定构建输出文件的目录路径。
- `files` 指定要包含在构建中的文件和目录。
- `mac` 配置 macOS 目标平台的构建选项，包括目标格式和生成的安装包文件名。
- `win` 配置 Windows 目标平台的构建选项，包括目标格式、架构和生成的安装包文件名。
- `nsis` 配置 NSIS 安装程序的选项，包括是否启用一键安装、是否允许更改安装目录等。
- `linux` 配置 Linux 目标平台的构建选项，包括目标格式和生成的安装包文件名。

### mac、win、linux

> `${}` 语法是用来引用变量的。这些变量的值是从配置文件中的其他字段获取的。
>
> 对于 `${productName}`，它是从配置中的 `productName` 字段获取的应用程序名称。
>
> 对于 `${version}`，它通常是在构建过程中自动从项目的 `package.json` 文件中获取的版本号。
>
> 例如，如果您的 `package.json` 文件中有一个 `"version"` 字段，其值为 `"1.0.0"`，那么 `${version}` 将被替换为 `"1.0.0"`。
>
> `${ext}` 是 Electron Builder 内置的一个变量，表示输出文件的扩展名，根据目标平台的不同，它将被替换为相应的扩展名（如 `.exe`、`.dmg`、`.AppImage` 等）

- `target` 目标平台的构建目标
- `rtifactName` 指定生成的安装包文件名。

### nsis 配置

- `oneClick: false` 表示禁用一键安装模式，即用户需要按下一步按钮来完成安装过程。
- `perMachine: false` 表示禁用以管理员权限安装应用程序，即应用程序将被安装在当前用户的目录中。
- `allowToChangeInstallationDirectory: true` 表示允许用户更改安装目录。
- `deleteAppDataOnUninstall: false` 表示在卸载应用程序时不删除应用程序的数据（如设置文件、缓存等）。
