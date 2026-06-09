---
title: "How to partially download a file in Chrome"
date_published: "2018-11-14"
tags: ["Tech"]
backlinks:
ai_summary: "The post explains a Chrome trick for partially downloading very large files, especially CSV or TSV feeds, so developers can inspect them without waiting for a full download. By pausing the download and removing the .crdownload extension, the partial file can be opened normally, which is useful for quickly checking headers or obvious data errors."
---

If you're the developer of an app that needs to pull large files from other servers, during testing or development, you may have wanted to partially download a very large file so you don't have to wait for the full, potentially hour-long download to finish.

This is especially true for CSV/TSV files where the first row of text in a file represents the headers and every subsequent row of text corresponds neatly with rows of data.

For example, [Smartly.io](https://smartly.io) needs to pull some extremely large feed files from our clients' servers for creating automated ads. But when something goes wrong and you'd like to download the file (at least partially) to inspect it for obvious errors, like wrong column names or invalid values in cells, downloading the entire feed file may take a very long time. Think 2 GB files.

### How to partially download a file in Chrome

The answer is to use a little trick for pausing downloads in Chrome. So instead of waiting for the full file to download, you can pause it, edit the suffix of the file, and open it. This works perfectly with CSV and TSV spreadsheet files because it is sequential and doesn't have to be whole. Having some rows of data is good enough.

Step by step instructions:

- Open the URL to the hosted file to start downloading via Chrome
- Immediately after download starts, click on the arrow icon next to the file name at the bottom of Chrome, and select "Pause"
- Open your Downloads folder where the partial file is residing
- Remove the ".crdownload" suffix in the filename.
- For example, from "product-feed.csv.crdownload" to "product-feed.csv"
- Open the partial file as per normal - it will work!
