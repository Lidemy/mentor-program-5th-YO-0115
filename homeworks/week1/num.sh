#!/bin/bash

#我的解法
read -p "輸入一個數字n,會印出1~n的js檔案: " nu
for  (( i=1; i<=${nu}; i=i+1 ))
do
	touch "$i.js";
done
echo "檔案建立完成";


# 老師解法 (相較之下我的好冗長喔)
#for (( i=1; i<=$1; i=i+1 ))
#do
#  touch "${i}.js";
#done
#echo "檔案建立完成";