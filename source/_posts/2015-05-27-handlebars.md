---
title: "handlerbars"
date: 2015-05-27 09:55:33
tags: [handlerbars,mustache]
categories: 模板引擎
---

![](/images/2015/handlebars.jpg)

Handlebars is largely compatible with Mustache templates. In most cases it is possible to swap out Mustache with Handlebars and continue using your current templates. 

<!--more-->

### tpl + data = html

```html
<!DOCTYPE html>
<html>
<head>
    <title>tpl + data = html</title>
</head>
<body>
<div id="container"></div>
<script src="http://w3clon.com/lib/handlebars-v3.0.3.js"></script>

<script id="tpl" type="text/x-handlebars">
    My name is {{name}}
</script>

<script>
    window.onload = function () {
        //tpl
        var tpl = document.getElementById('tpl').innerHTML;
        var template = Handlebars.compile(tpl);

        //data
        var data = {
            name: 'xuqi'
        };

        //Html
        var html = template(data);

        //output
        document.getElementById('container').innerHTML = html;
    };
</script>
</body>
</html>
```
### Expression Path

```html
<!DOCTYPE html>
<html>
<head>
    <title>Expression Path</title>
</head>
<body>
<div id="container"></div>
<script src="http://w3clon.com/lib/handlebars-v3.0.3.js"></script>

<script id="tpl" type="text/x-handlebars">
    <b>name: {{name.val}}</b>
    <ul>
        {{#each partner}} {{!-- 切换上下文到 partner --}}
        <li>
            Name is {{name}}, Age is {{age}}.
            Root name is {{@root.name.val}} {{!-- 切换上下文到根目录 --}}, Age is {{../age}} {{!-- 切换上下文到上级 --}}
        </li>
        {{/each}}
    </ul>
</script>

<script>
    window.onload = function () {
        //tpl
        var tpl = document.getElementById('tpl').innerHTML;
        var template = Handlebars.compile(tpl);

        //data
        var data = {
            name: {
                val: 'a'
            },
            age: 18,
            partner: [
                {
                    name: 'b',
                    age: 18
                },
                {
                    name: 'c',
                    age: 18
                },
                {
                    name: 'd',
                    age: 18
                },
                {
                    name: 'e',
                    age: 18
                }
            ]
        };

        //Html
        var html = template(data);

        //output
        document.getElementById('container').innerHTML = html;
    };
</script>
</body>
</html>
```

### Partials

```html
<!DOCTYPE html>
<html>
<head>
    <title>Partials</title>
</head>
<body>
<div id="container"></div>
<script src="http://w3clon.com/lib/handlebars-v3.0.3.js"></script>

<script id="tpl" type="text/x-handlebars">
    {{> partial1 age="40"}}
    <br>
    {{> partial2 partner}} {{!-- 第一个参数Partials，第二个参数上下文环境 --}}
    <br>
    {{> (partialFn)}} {{!-- 动态return Partials --}}
    <br>
    {{> (lookup . 'partiaName')}} {{!-- 根据传入的参数渲染,注意参数必须加引号 --}}
</script>

<script>
    window.onload = function () {
        //tpl
        var tpl = document.getElementById('tpl').innerHTML;
        var template = Handlebars.compile(tpl);

        Handlebars.registerPartial('partial1', 'age is:{{age}}');
        Handlebars.registerPartial('partial2', 'Have {{count}} partners:<ul>{{#each list}}<li>{{name}}</li>{{/each}}</ul>')
        //data
        var partiaName = 'partial1';
        var data = {
            name: 'a',
            age: 18,
            partner: {
                count: 10,
                list: [
                    {
                        name: 'b',
                        age: 18
                    }
                ]
            },
            partialFn: function () {
                var ran = parseInt(Math.random() * 10 + '', 10);
                if (ran % 2 === 0) {
                    return 'partial1';
                }
                return 'partial2';
            },
            partiaName: partiaName
        };

        //Html
        var html = template(data);

        //output
        document.getElementById('container').innerHTML = html;
    };
</script>
</body>
</html>
```

### helper

```html
<!DOCTYPE html>
<html>
<head>
    <title>helper</title>
</head>
<body>
<div id="container"></div>
<script src="http://w3clon.com/lib/handlebars-v3.0.3.js"></script>

<script id="tpl" type="text/x-handlebars">
    {{helper1 'http://www.yohobuy.com' 'YOHOBUY'}}
    <br />
    {{helper2 site}} {{!-- 这里的site是上下文环境，不是参数 --}}
    <br />
    {{helper3 'YOHOBUY' href='http://www.yohobuy.com' title='demo'}}
    <br />
    {{#bold}}
    name is {{name}}
    {{/bold}}
</script>
<script>
    window.onload = function () {
        //tpl
        var tpl = document.getElementById('tpl').innerHTML;
        var template = Handlebars.compile(tpl);

        //helper
        Handlebars.registerHelper('helper1', function (url, name) {
            return '<a href="' + url + '">' + name + '</a>';
        });

        Handlebars.registerHelper('helper2', function (val) {
            return '<a href="' + val.url + '">' + val.name + '</a>';
        });

        Handlebars.registerHelper('helper3', function (name, options) {
            var attrs = [],
                    prop;
            for (prop in options.hash) {
                attrs.push(prop + '="' + options.hash[prop] + '"');
            }

            return '<a ' + attrs.join(' ') + '>' + name + '</a>'
        });
        Handlebars.registerHelper('bold', function(options) {
            console.log(this); //this表示当前的上下文环境
            return '<b>' + options.fn(this) + '</b>';
        });
        //data
        var data = {
            name: 'Tom',
            site: {
                url: 'http://www.yohobuy.com',
                name: 'YOHOBUY'
            }
        };

        //Html
        var html = template(data);

        //output
        document.getElementById('container').innerHTML = html;
    };
</script>
</body>
</html>
```

### build-in helper

```html
<!DOCTYPE html>
<html>
<head>
    <title>build-in helper</title>
</head>
<body>
<div id="container"></div>
<script src="http://w3clon.com/lib/handlebars-v3.0.3.js"></script>

<script id="tpl" type="text/x-handlebars">
    <h1>Arr each</h1>
    <ul>
        {{#each partner}}
        <li>
            Index: {{@index}}
            Name: {{name}}
            Age: {{age}}
            {{#if @first}}I am the first
            {{#each others}}
            {{@../index}}.{{@index}} {{name}}
            {{/each}}
            {{/if}}
            {{#if @last}}I am the last{{/if}}
        </li>
        {{else}}
        No Partner
        {{/each}}
    </ul>

    <h1>Object each</h1>
    {{#each me}}
    {{@key}} : {{.}}
    {{else}}
    No content.
    {{/each}}

    <h1>IF</h1>
    {{#if condition}}
    Have condition
    {{else}}
    Have no condition
    {{/if}}

    <h1>Unless</h1>
    {{#unless condition}}
    inverse: have no condition
    {{else}}
    inverse: have condition
    {{/unless}}

    <h1>With</h1>
    {{#with story}}
    {{name}}
    {{date}}
    {{else}}
    story empty
    {{/with}}

    <h1>Look up</h1>
    {{#each story}}
    {{lookup ../me @key}}
    {{/each}}

    <h1>LOG</h1>
    {{log 'Hello'}}
</script>
<script>
    window.onload = function () {
        //tpl
        var tpl = document.getElementById('tpl').innerHTML;
        var template = Handlebars.compile(tpl);

        //helper
        Handlebars.registerHelper('bold', function (options) {
            return '<b>' + options.fn(this) + '</b>';
        });
        //data
        var data = {
            partner: [
                {
                    name: 'a',
                    age: 18,
                    others: [
                        {
                            name: 'haha',
                            age: 88
                        }
                    ]
                },
                {
                    name: 'b',
                    age: 18
                },
                {
                    name: 'c',
                    age: 20
                }
            ],
            me: {
                name: 'd',
                age: 18,
                desc: 'developer'
            },
            story: {
                name: 'hello',
                date: '2015/5/12'
            }
        };

        //Html
        var html = template(data);

        //output
        document.getElementById('container').innerHTML = html;
    };
</script>
</body>
</html>
```

### escape

```html
<!DOCTYPE html>
<html>
<head>
    <title>escape</title>
</head>
<body>
<div id="container"></div>
<script src="http://w3clon.com/lib/handlebars-v3.0.3.js"></script>

<script id="tpl" type="text/x-handlebars">
    {{url}}
    <br>
    {{{url}}}
    <br>
    {{link 'www.baidu.com' 'baidu'}}
    <br>
    {{oLink 'www.baidu.com' '<baidu'}}
</script>
<script>
    window.onload = function () {
        //tpl
        var tpl = document.getElementById('tpl').innerHTML;
        var template = Handlebars.compile(tpl);

        //helper
        Handlebars.registerHelper('link', function (url, name) {
            //return new Handlebars.SafeString('<a href="' + url + '">' + name + '</a>');
            return '<a href="' + url + '">' + name + '</a>';
        });

        Handlebars.registerHelper('oLink', function (url, name) {
            var url = Handlebars.Utils.escapeExpression(url);
            var name = Handlebars.Utils.escapeExpression(name);
            return new Handlebars.SafeString('<a href="' + url + '">' + name + '</a>');
        });

        //data
        var data = {
            url: '&gl,a href="www.baidu.com">baidu</a>'
        };

        //Html
        var html = template(data);

        //output
        document.getElementById('container').innerHTML = html;
    };
</script>
</body>
</html>
```