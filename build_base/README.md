build_base.html作为page模版页使用，需要和build.json放在同一目录

build.json内容
====================
* `build-path`: "源码"路径，build_base.html将从该目录加载页面所需的资源

如对于课程页面course.html，可以直接将build_base.html复制到course.html中，

build.json如下：

```json
{
	"build-path":"./src/coursePage/"
}
```

config.json内容
====================
在目录./src/coursePage/下必须包含config.json

**注意：引用的静态资源（比如图片）的目录一定要写相对于base_build.html（这里是course.html）的**

* `child`：一个json数组，表明模版页中的child元素如何加载，
* `final-js`：页面加载后需要运行的js，通常对于每个child组件，应当将child组件的所有用于modify的js写在一个函数中，建议命名为initChildName
然后在`final-js`对应的文件中调用这些函数来对组件初始化。

如下为一个child元素的例子：

```json
{
	"name": "page",
	"selector": "div:jqmData(role='page')",
	"ex-path": "ex/",
	"ex-css": [],
	"ex-js": [],
	"inner-html": ""
}
```

child元素的内容
---------------------
- `name`：child名称--仅作为阅读标识
- `selector`：该child的jquery selector
- `ex-path`： 扩展文件路径
- `ex-css`： 扩展css列表
- `ex-js`： 扩展js列表
- `inner-html`：child内部html

注1：不要重载header、content、footer、page这四个jqm自带元素

注2：inner-html不含html、body、head等标签


**！！！对于jquery mobile widget，一定要调用.trigger("create")来渲染！！！**


