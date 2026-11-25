#!/bin/sh
# src/library.html(원본)을 감싸 배포용 ../index.html을 만든다.
cd "$(dirname "$0")"
{
cat <<'HEAD'
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7f3ec">
<meta name="description" content="내가 가진 책을 온라인 서재처럼 보고 관리하는 앱">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-size:14px}img{max-width:100%}[hidden]{display:none!important}</style>
HEAD
sed -n '1,/^<\/style>$/p' library.html
echo '</head>'
echo '<body>'
sed '1,/^<\/style>$/d' library.html
echo '</body>'
echo '</html>'
} > ../index.html
