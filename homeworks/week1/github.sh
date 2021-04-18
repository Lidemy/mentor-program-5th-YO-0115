#!/bin/sh

# 老師作業檢討寫法,但我看不懂
# 先複製過來,方便以後查看

username=$1;

data=$(curl --silent https://api.github.com/users/$username);
echo $data | grep -o '"name": ".*", "company' | sed 's/"name": "//g' | sed 's/", "company//g';
echo $data | grep -o '"bio": ".*", "twitter_username' | sed 's/"bio": "//g' | sed 's/", "twitter_username//g';
echo $data | grep -o '"location": ".*", "email' | sed 's/"location": "//g' | sed 's/", "email//g';
echo $data | grep -o '"blog": ".*", "location' | sed 's/"blog": "//g' | sed 's/", "location//g';

   