#! /bin/sh
if [ "x$(ps -A | grep python)" != "x" ];then
    echo "haha" > /tmp/test
fi
