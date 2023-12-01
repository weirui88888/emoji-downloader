## [English](https://github.com/weirui88888/emoji-downloader/blob/main/EN-README.md)

![demo.gif](https://emoji-downloader.newarray.vip/demo.gif)

## :rotating_light: 重要提示

我再次强调，这不是一个emoji组件库，只是一个帮助你下载所有emoji并生成与之配套的配置文件的工具。借助此工具，你可以轻松自定义自己的emoji组件库。

## 功能

只需一行代码，即可下载所有emoji并自动生成数据源配置文件。

你可以使用生成的数据源配置文件来构建自己的emoji组件库。

## 演示

这是一个简单的[演示](https://emoji-downloader.newarray.vip)。显示的emoji数据源来自执行该脚本生成的配置文件。**:pushpin: 这不是一个emoji组件库**。你可以查看由该脚本生成的完整配置文件[data.js](./emojis/data.js)。

## 安装

```shell
npm install emoji-downloader -g
```

## 使用方法

```shell
emoji-downloader download [type...] [options]
```

## 支持的emoji类型

`people` `nature` `food` `activity` `travel` `objects` `symbols` `flags`

你可以指定要下载的emoji类型。如果未指定，则默认下载所有类型的emoji。

**注意：** 你指定的emoji类型的顺序将是生成的配置文件中的类型顺序（如果指定了`origin`选项）。

```shell
emoji-downloader download // 下载所有类型的emoji
```

```shell
emoji-downloader download people food // 下载people和food类型的emoji
```

## 选项

### target

emoji下载的路径，默认为 **./emojis**（建议使用默认值）。

### origin

指定生成配置文件中emoji的来源。

如果未指定，将不会生成配置文件（当你仅仅只想下载emoji时）。

#### 示例

```shell
emoji-downloader download --origin https://example.com
```

如果将`origin`指定为`https://example.com`，则生成的配置文件中的所有emoji地址都将使用它作为资源地址前缀，如下所示：

```javascript
const data = {
  food: {
    resources: [
      {
        name: 'emoji_u1f32d.png',
        src: 'https://example.com/emojis/food/emoji_u1f32d.png' // 在这里查看
      },
      ...
    ],
    en_name: 'food_and_drink',
    zh_name: '食物与饮料',
    name: 'food_and_drink',
    order: 3
  },
  people: {
    resources: [
      {
        name: 'emoji_u1f383.png',
        src: 'https://example.com/emojis/people/emoji_u1f383.png' // 在这里查看
      },
      ...
    ],
    en_name: 'smile_face_and_people',
    zh_name: '笑脸与人物',
    name: 'smile_face_and_people',
    order: 1
  },
  ...
}

export default data
```

## 一般使用步骤

1. 下载emoji并指定来源

```shell
emoji-downloader download --origin https://your-real-origin.com
```

2. 将下载好的emojis资源文件夹上传至你的服务（由来源提供的服务），比如oss中，origin就是你的oss配置的域名

3. 使用生成的配置文件封装自己的emooji组件

4. :tada: 尽情享用
