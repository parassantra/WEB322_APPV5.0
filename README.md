# WEB322_APPV5.0 [![Stories in Ready](https://badge.waffle.io/xwang345/WEB322_APPV5.0.svg?label=ready&title=Ready)](http://waffle.io/xwang345/WEB322_APPV5.0)  [![Build Status](https://travis-ci.org/xwang345/WEB322_APPV5.0.svg?branch=master)](https://travis-ci.org/xwang345/WEB322_APPV5.0) [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
WEB322_ASSIGNMENT6

Here the **[WEB322_APPV5.0](https://cryptic-waters-33866.herokuapp.com/)** website deploy on the Heroku.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/CC-BY_icon.svg/1024px-CC-BY_icon.svg.png" width="20%">

 # :hand::hand::hand: PLEASE DO NOT COPY. :hand::hand::hand: It is just can be a reference.

# Connect MongoDB
1. Create a new connection to mongolab
2. Just select Single Node and Sanbox plan
3. Input database name.
4. Than, create new connection
5. Click on brand new database
6. We got warning message that indicate we don't have any user for our db, so u can create one just for the test propouse.
7. On the above of our menu, mongolab show us how to connect to remote db, both via shell and URL
8. Test the db connection via shell (the fromat like this)

`mongo ds151752.mlab.com:51752/web322_a6 -u xwang345 -p`

## There is one of good [tutorial video](https://www.youtube.com/watch?v=GDqtv1eGGpA) on the youtube that well explain how to connect mongoDB and let it works.

#### Powerd by:

![alt text][logo]

[logo]: http://technotip.com/wp-content/uploads/mongoDB/logo-mongodb-tagline.png "Logo Title Text 2"

<img src="https://softwareengineeringdaily.com/wp-content/uploads/2016/10/PostgreSQL.png">

![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png "Logo Title Text 1")

handlebar的一些用法
概述与介绍

    Handlebars 是 JavaScript 一个语义模板库，通过对view和data的分离来快速构建Web模板。它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译， 这样可以保证模板加载和运行的速度。
    简单的说就是：Handlebars是一个很好的前后端的分离的方案

使用

Handlebars的安装是比较简单和方便的;handlebars是一个纯JS库，因此你可以像使用其他JS脚本一样用script标签来包含handlebars.js

``
<script src="jquery.min.js"></script>
<script type="text/javascript" src=".js/handlebars.js"></script>
``
基本

将对象数据渲染到页面上

    js代码

    //用jquery获取模板
    var tpl   =  $("#tpl").html();
    //预编译模板
    var template = Handlebars.compile(tpl);
    //模拟json数据
    var context = { name: "XXX", content: "this is Handlebars"};
    //匹配json内容
    var aaa = template(context);
    //输入模板
    $("#wrap").html(aaa);

    模板结构

    <script id="tpl" type="text/x-handlebars-template">
    <div class="demo">
    <h1>{{name}}</h1>
    <p>{{content}}</p>
    </div>
    </script>

Handlebar的表达式
block

有时候当你需要对某条表达式进行更深入的操作时，Blocks就派上用场了，在Handlebars中，你可以在表达式后面跟随一个#号来表示Blocks，然后通过{{/表达式}}来结束Blocks。 如果当前的表达式是一个数组，则Handlebars会“自动展开数组”，并将Blocks的上下文设为数组中的元素。
``
<ul>
{{#arr_data}}
    <li>{{language}}</li>
{{/arr_data}}
</ul>
``
以下为json数据

{
  arr_data: [
    {language: "hello"},
    {language: "word"},
    {language: "handlebars"}
  ]
}

上面的代码会自动匹配arr_data数据并展开数据
if/else AND unless

Handlebars的if判断只能判断true和false，没办法进行这种a===10的逻辑判断。

#模板
{{#if isTrue}} <p>isTrue</p> {/if}}
{{#if email}} <p>{{email}}</p> {{else}} <p>is not email</p> {{/if}}
{{#if num}} <p>{{num}}</p> {{/if}}
{{#if data1}} {{else}} <p>没有这个字段</p> {{/if}}

#json数据
{
  isTrue: true,
  email: '',
  num: '0'
};

#页面效果
isTrue
is not email
0
没有这个字段

说明：

    Handlebars if在判断前会做类型转换，如''、undefined、null、0、[]等都会被识别为false。不过，上面的例子中的'0'是字符串，所以还是会显示的。
    if可以判断是否含有某个字段，如果没有执行else的内容
    unlesee和if正好相反，当是false的时候执行; 是true的时候执行else里面的内容

with

{{#with}}一般情况下，Handlebars模板会在编译的阶段的时候进行context传递和赋值。使用with的方法，我们可以将context转移到数据的一个section里面（如果你的数据包含section）。这个方法在操作复杂的template时候非常有用。【简单的说就是，with可以判断这几数据有没有; 个人感觉和if挺像的】

{{#with author}}
  有author就显示里面的内容，没有就不显示
{{/with}}

Handlebar的访问(PATH)

Handlebar支持路径访问,Handlebar还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性
可以通过.来访问属性也可以使用../,来访问父级属性。 例如:（使用.访问的例子）【经常搭配着with一起用的】

#模板
<h1>{{author.id}}</h1>

#json
{
  title: "this is title",
  author: {
    id: 47,
    name: "XXX"
  },
  body: "this is body"
}

遍历each

遍历可以算是一个最常用的功能，对于很多数据的展示都是需要用到each的。Handlebar的遍历对于数组和对象都适用。

#模板
{{#each this}}
  <p>{{this.name}}:{{this.age}}</p>
{{else}}
  <p>no data</p>
{{/each}}

#json
[
  {name: 'aaa', age: 23 },
  {name: 'bbb', age: 55 }
]

遍历的一些小技巧

    @index或者@key都可以获得序号，但是序号都是从0开始的，如果需要从1开始需要写一个helper; @key还可获得对象的索引值
    @first和@last可以判断是否是数组的第一个或者最后一个。

Html转义

有时候，后台传来的一篇文章是富文本内容，而我们想要将其转换为htnl输出怎么办呢？“{{}}”输出默认转义Html，几乎所有的模板引擎输出默认都是转义Html的，避免xss攻击。如果你想避免转义，请这样用“{{{}}}”

#模板
<div>{{richText}}</div>
<div>{{{richText}}}</div>

#数据
var data = {
    richText: '<div>this is content</div>'
};

Helpers

    后台传来的数据往往是需要做处理的，如时间格式化、金额格式化、索引值的开始，甚至一些状态的操作; 那么这个时候就需要Helper了，这个是Handlebar中最主要的功能，因为它才使得Handlebar那么的好用。

#模板
<p>{{format time}}</p>

#Helpers
Handlebars.registerHelper('format', function (date, options) {
  return new Date(date).toLocaleString();
});

#数据
{"time":1450576000281}

    在Helper里也能做一些判断，然后在页面上使用else判断；
    通过return options.fn(this)返回true的结果，
    通过return options.inverse(this)返回else要执行的内容

#模板
{{#equal data1 data2}}
  <p>两个数相等</p>
{{else}}
  <p>不相等</p>
{{/equal}}

#js
Handlebars.registerHelper("equal",function(v1,v2,options){
   if(v1 == v2){
     //满足添加继续执行
     return options.fn(this);
   }else{
     //不满足条件执行{{else}}部分
     return options.inverse(this);
  }
});

    在Helper里Handlebars.SafeString就是不转义Html，如果想转义Html直接return内容即可。

#模板
<p>{{safe}}</p>

#js
Handlebars.registerHelper('safe', function () {
   return new Handlebars.SafeString('<div>safe string</div>')
});

Handlebar的注释

Handlebars也可以使用注释写法如下

{{! 单行注释 }}
{{!-- 多行注释 --}}

Partials

共享同一个模板内容，有些公共部分希望一次书写，然后就能重复使用了；类似一些include的功能; 不需要也能调用Helper的方法

#模板
<p>{{> footer}}</p>

#Helper
Handlebars.registerPartial('footer', function () {
    return new Handlebars.SafeString('<div>This is footer</div>')
});

其他

Handlebars官网的很多内置的helper以及功能可以参考看一下Handlebars官网,入门有时候还是容易的，但是深入学习需要的时间和经验。
