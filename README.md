# koishi-plugin-jmcomic

[![npm](https://img.shields.io/npm/v/koishi-plugin-jmcomic?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jmcomic)

本项目基于[JMComic-Crawler-Python](https://github.com/hect0x7/JMComic-Crawler-Python/tree/master)项目
插件本体位于external文件夹中
## 功能实现
- [x] 实现根据albumId下载
- [x] 发送至群聊 
- [x] 上传至插件市场
## 使用教程
### 安装依赖
```
pip install jmcomic -i https://pypi.org/project -U
```
### 启动Koishi服务
```
npm run dev
```
### 群聊指令使用
```
/jm <albumId>
```