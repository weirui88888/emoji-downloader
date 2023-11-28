## Important

I emphasize again that this is not an emoji component library, it is just a tool to help you download all emojis and help you generate configuration files. With them, you can easily customize your own emoji component library

## What

One line of code helps you download:arrow_down: all emoji images and automatically generates data sources for you

You can use the generated data source to build your own emoji component library

## Demo

[just-a-demo](https://emoji-downloader.newarray.vip)

this is no

## Install

```shell
npm install emoji-downloader -g
```

## Usage

```shell
emoji-downloader download [type...] [options]
```

## Support type

`people` `nature` `food` `activity` `travel` `objects` `symbols` `flags`

You can specify which type of emoji pattern you want to download. If not specified, all types of emoji patterns will be downloaded by default.

**attention:** The order of emoji types you specify is the order of the types in the generated configuration file, if you specify the option `origin`

```shell
emoji-downloader download // download all type emojis
```

```shell
emoji-downloader download people food // download people and food emojis
```

## Options

### target

#### description

Path to download emojis，It is recommended to use the default value

#### default

./emojis

### origin

#### description

Specify the origin of the emoji image in the generated configuration file

If not specified, the configuration file will not be generated（when you just want to download emojis）

#### example

```shell
emoji-downloader download --origin https://example.com
```

If you specify origin as `https://example.com`, all emoji addresses in the generated configuration file will use it as the resource address prefix，just like

```javascript
const data = {
  food: {
    resources: [
      {
        name: 'emoji_u1f32d.png',
        src: 'https://example.com/emojis/food/emoji_u1f32d.png' // view here
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
        src: 'https://example.com/emojis/people/emoji_u1f383.png' // view here
      },
      ...
    ],
    en_name: 'smile_face_and_people',
    zh_name: '笑脸与人物',
    name: 'smile_face_and_people',
    order: 1
  }
}

export default data
```

## General steps

1. Download emojis and specify origin

```shell
emoji-downloader download --origin https://your-real-origin.com
```

2. Upload emojis resources folder to your service（Services provided by origin）

3. Use the generated configuration file to encapsulate your own emoji components

4. enjoy it
