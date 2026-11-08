---
title: Too Much Love is Scary
description: ''
date: '2026-11-08T04:59:53.213Z'
categories:
  - Writeup
tags:
  - Rev
  - Easy
cover: ''
math: false
draft: false
author: Hân
writeup_group: CTF
writeup_subgroup: SpookyCTF 2026
---
# Too Much Love is Scary
## Challenge description
> Last time I loved I was left broken and in shambles. That’s when I realized that my heart could only hold so much, I must protect it. So I won’t fall in love again, it’s just too scary…
## Solution
![image](/images/post/2026/11/too-much-love-is-scary-1794114227621-rlud1.png)
Nhìn vào IDA, ta có thể nhập vào 2 biến `v4` và `v5`, rồi nhập vào biến `s` tối đa `1000 bytes`. Sau đó so sánh `0x14 bytes` của `s[v4]` và `s2 (Shall I compare thee)`, nếu đúng sẽ in flag.
![image](/images/post/2026/11/too-much-love-is-scary-1794126105856-zzsbt.png)
Nhìn vào hàm `print_flag`, ta có thể thấy nó đang làm một biểu thức tính toán để mã hóa `v4` thành `flag` thông qua đối số a1, a2 được truyền vào.

Ta biết được form flag là `spooky{}`, 

Vì bytes được viết theo Little Endian nên byte đầu tiên được mã hóa để ra được flag là `0x29` và chữ cái đầu của flag là `s(0x73)`. Ta có: `(a2 - a1 + 71) ^ 0x29 = 0x73`

=> `(a2 - a1 + 71) = 0x29 ^ 0x73 = 90`

=> `a2 - a1 = 19`

Vậy ta chỉ cần nhập vào `v4, v5` sao cho `v5 - v4 = 19` và `s[v4] = Shall I compare thee` là lụm lúa

![image](/images/post/2026/11/too-much-love-is-scary-1794126953919-hflle.png)
flag: `spooky{m4yb3_1_n33d_t0_10v3_mys31f}`
