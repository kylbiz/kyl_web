开业啦官网WEB
-------
[开业啦官网WEB](http://www.kyl.biz)，是开业啦官网3.0版本，欢迎各种问题。

本网站采用 `meteor` 框架，开发和运行请采用 `meteor`技术支持，具体如下：

### 安装配置步骤
#### 第一步: 配置 `meteor`环境

需要配置 `nodejs , meteor, mongodb `环境，请做相应的环境配置

我的配置如下
``` shell
node        v4.2.2
meteor      v1.1.0.3
mongodb     v3.0.6
```

#### 第二步： 新建 meteor 项目，并复制 .meteor 项目到当前root目录下
1. `$ meteor create meteor_temp_project`
2. `$ cp meteor_temp_project/.meteor your_kyl_web_root`

#### 第三步：安装kyl_web项目所依赖的`meteor packages`
使用 `$ meteor add meteor_package` 方式依次安装如下package

```shell
accounts-password           1.1.1  Password support for accounts
aldeed:collection2          2.3.3  Automatic validation of insert and update ...
dburles:collection-helpers  1.0.3  Transform your collections with helpers th...
frozeman:storage            0.1.8  A reactive wrapper for localStorage, which...
iron:router                 1.0.9  Routing specifically designed for Meteor
jquery                      1.11.3_2  Manipulate the DOM using CSS selectors
less                        1.0.14  The dynamic stylesheet language
matteodem:easy-security     0.1.4  Protection against harmful attacks by rate...
meteor-platform             1.2.2  Include a standard set of Meteor packages ...
meteorhacks:npm             1.4.0  Use npm modules with your Meteor App
momentjs:moment             2.10.6  Moment.js (official): parse, validate, ma...
npm-container               1.1.0+ Contains all your npm dependencies
semantic:ui-css             1.12.3* Semantic UI - CSS Release of Semantic UI
useraccounts:semantic-ui    1.11.1* Accounts Templates styled for Semantic UI.
```

#### 启动项目
`$ meteor --port 3000`

### LICENSE MIT
