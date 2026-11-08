---
title: Frankenstein's Password Generator
description: ''
date: '2026-11-08T08:37:58.973Z'
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
# Frankenstein's Password Generator
## Challenge description
> Dr. Frankenstein left behind a strange password generator in an abandoned NJIT laboratory. The machine refuses to start without an activation phrase. His last notebook entry reads, "A bolt at midnight gave it life." Can you figure out what the program expects and wake the creature?
## Solution
![image](/images/post/2026/11/frankenstein-s-password-generator-1794129027126-jrf7c.png)
![image](/images/post/2026/11/frankenstein-s-password-generator-1794129057282-venfp.png)
![image](/images/post/2026/11/frankenstein-s-password-generator-1794129075347-t71m9.png)
Ta thấy chương trình check bytes mình nhập vào ở hàm `sub_401176`, sau đó sẽ in flag ra.

Hàm check yêu cầu số byte mình nhập vào là `14 bytes`, sau đó so sánh

`(a1[i] ^ 0x5D) + 7 * (_BYTE)i + 11 != *(_BYTE *)(i + 0x402010)`

=> `a[i] = (*(_BYTE *)(i + 0x402010) - 11 - 7 * (_BYTE)i) ^ 0x5D`

Ta gdb được `14 bytes` ở địa chỉ `0x402010` là:
![image](/images/post/2026/11/frankenstein-s-password-generator-1794129419821-zogeb.png)
Ta viết chương trình tìm `a[i]`
```Python
haha = bytearray(b"\x2a\x24\x2a\x29\x43\x37\x45\x50\x5c\x5d\x65\x72\x74\x6f")
hihi = bytearray()
for i in range (14):
    x = (haha[i] - 7 * i - 11)^0x5d
    hihi.append(x)
print(hihi)
```
Ta được kết quả input:
![image](/images/post/2026/11/frankenstein-s-password-generator-1794129618539-b02lu.png)
Chạy chương trình ta có được flag:
![image](/images/post/2026/11/frankenstein-s-password-generator-1794129652416-mr4c5.png)
flag: `spooky{its_alive_at_midnight}`


