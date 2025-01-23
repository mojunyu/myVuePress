# ab测压工具

## 简介

ab是 `apachebench` 命令的缩写。ab是apache自带的压力测试工具。<br/>

ab非常实用，它不仅可以对apache服务器进行网站访问压力测试，也可以对或其它类型的服务器进行压力测试。 <br/>

比如nginx、tomcat、IIS等

## 原理

ab命令会创建 `多个并发访问线程` ，模拟多个访问者同时对某一URL地址进行访问。它的测试目标是 `基于URL` 的，因此，它既可以用来测试apache的负载压力，也可以测试nginx、lighthttp、tomcat、IIS等其它Web服务器的压力。

ab命令对发出负载的计算机要求很低，它既不会占用很高CPU，也不会占用很多内存。 但却会给目标服务器造成巨大的负载，其原理类似CC攻击。<br/>

自己测试使用也需要注意，否则一次上太多的负载。 可能造成目标服务器资源耗完，严重时甚至导致死机。

## 安装

```bash
yum -y install httpd-tools
```

### 输出以下表示安装成功

```bash
ab -V 
```

```
This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/
```

## 参数说明

```
ab: wrong number of arguments
Usage: ab [options] [http[s]://]hostname[:port]/path
Options are:
-n 要执行请求数，默认会执行一个请求
-c 一次执行多个请求的数量，默认是一次一个请求。
-t 用于基准测试的最大秒数，使用它在固定的总时间内对服务器进行基准测试。默认情况下，没有时间限制。
-s 超时之前等待的最大秒数。 默认值是30秒。
-b TCP发送/接收缓冲区的大小，以字节为单位。
-B 进行传出连接时要绑定的地址。
-p 包含数据到POST的文件。 还请记住设置-T。
-u 包含PUT数据的文件。 还请记住设置-T 。
-T Content-type用于POST / PUT数据的内容类型内容类型标题，例如：'application/x-www-form-urlencoded' 默认是'text/plain'
-v verbosity 要打印多少个疑难解答信息，设置详细级别 - 4和以上打印标题信息，3和以上打印响应代码（404,200等），2和以上打印警告和信息。
-w 在HTML表格中打印结果。
-i 使用HEAD代替GET。
-x 用作<table>的属性的字符串。 属性被插入<table here>。
-y 用作<tr>的属性的字符串。
-z 用作<td>的属性的字符串。
-C 将cookie添加到请求。 参数通常采用名称=值对的形式。 这个字段是可重复的。
-H attribute 例如 'Accept-Encoding: gzip' 插入所有普通标题行之后。（重复）
-A 添加基本的WWW认证，该属性是一个冒号分隔的用户名和密码，auth-username:password
-P 添加基本代理验证，属性是一个冒号分隔的用户名和密码，proxy-auth-username:password
-X 使用代理服务器和端口号。
-V 打印版本号并退出。
-k 使用HTTP KeepAlive功能。
-d 不要显示百分点服务表。
-S 不要显示信心估计和警告。
-q 做超过150个请求时不要显示进度。
-g 将收集的数据输出到gnuplot格式文件。
-e 输出提供百分比的CSV文件。
-r 不要退出套接字接收错误。
-h 显示使用情况信息（此消息）。
-Z 密码套件指定SSL / TLS密码套件（请参阅openssl密码）
-f 指定SSL / TLS协议 (SSL3, TLS1, TLS1.1, TLS1.2 or ALL)
```

## 语法

```bash
ab [ -A auth-username:password ] 
   [ -b windowsize ] 
   [ -B local-address ] 
   [ -c concurrency ] 
   [ -C cookie-name=value ] 
   [ -d ] 
   [ -e csv-file ] 
   [ -f protocol ] 
   [ -g gnuplot-file ] 
   [ -h ] 
   [ -H custom-header ] 
   [ -i ] 
   [ -k ] 
   [ -l ] 
   [ -m HTTP-method ] 
   [ -n requests ] 
   [ -p POST-file ] 
   [ -P proxy-auth-username:password ] 
   [ -q ] 
   [ -r ] 
   [ -s timeout ] 
   [ -S ] 
   [ -t timelimit ] 
   [ -T content-type ] 
   [ -u PUT-file ] 
   [ -v verbosity ] 
   [ -V ] 
   [ -w ] 
   [ -x <table>-attributes ] 
   [ -X proxy[:port] ] 
   [ -y <tr>-attributes ] 
   [ -z <td>-attributes ] 
   [ -Z ciphersuite ] 
   [ http[s]:// ]hostname[:port]/path
```

## 使用

请求1000次，每次并发100

```bash
ab -n100 -c10 https://www.baidu.com/	
```

输出

```bash
This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking www.baidu.com (be patient).....done


Server Software:        BWS/1.1    //被测试的Web服务器软件名称
Server Hostname:        www.baidu.com    //被测主机名
Server Port:            443    //被测主机的服务端口号
SSL/TLS Protocol:       TLSv1/SSLv3,ECDHE-RSA-AES128-GCM-SHA256,2048,128    //加密协议

Document Path:          /index.html    //请求的URL中根绝对路径，它同样来自于http请求数据的头信息，通过它的后缀名，我们一般可以理解该请求的类型
Document Length:        227 bytes    //请求的文件index.html大小

Concurrency Level:      10    //表示并发用户数 －c参数指定的数量
Time taken for tests:   2.559 seconds    //表示所有这些请求被处理完成花费的总时间
Complete requests:      100    //表示总请求数，这是我们设置的相应参数。
Failed requests:        0    //表示失败的请求数，这里的失败是指请求的连接服务器、发送数据、接收数据等环节发生异常，以及无响应后超时的情况。对于超时时间的设置可以用ab的-t参数。而如果接受到的http响应数据的头信息中含有2xx以外的状态码，则会在测试结果显示另一个名为“Non-2xx responses”的统计项，用于统计这部分请求数，这些请求并不算是失败的请求。
Write errors:           0
Total transferred:      108192 bytes    //总共传输的数据量，指的是ab从被测服务器接收到的总数据量，包括index.html的文本内容和请求头信息。通过使用ab的-v参数即可查看详细的http头信息。
HTML transferred:       22700 bytes    //表示所有请求的响应数据(index.html文件)的总大小，也就是减去了Total transferred中http响应数据中头信息的长度。
Requests per second:    39.07 [#/sec] (mean)    //吞吐率 平均每秒接收的请求数，尽可能多，反映并发能力 等于Complete requests/Time taken for tests=100/2.559=39.07
Time per request:       255.941 [ms] (mean)
Time per request:       25.594 [ms] (mean, across all concurrent requests)    //每个请求的耗时，尽可能少
Transfer rate:          41.28 [Kbytes/sec] received    //网络传输速度

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       25  236 402.0     35    1075
Processing:     7   12  10.7      8      79
Waiting:        7   11  10.5      8      78
Total:         33  247 403.7     45    1148

Percentage of the requests served within a certain time (ms)
  50%     45
  66%     49
  75%     59
  80%   1033
  90%   1046
  95%   1050
  98%   1053
  99%   1148
 100%   1148 (longest request)
 //这个表第一行表示有50%的请求都是在45ms内完成的
```
