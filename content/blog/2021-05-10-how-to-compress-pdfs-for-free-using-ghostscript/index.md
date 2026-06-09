---
title: "How to compress PDFs for free using Ghostscript"
date_published: "2021-05-10"
excerpt: "Faced with a limited file size upload? Compress your file for free using the copyleft licensed software Ghostscript."
tags: ["Tutorial", "Tech"]
backlinks:
ai_summary: "The post explains how the author compressed a large PDF to meet a government upload limit without using an online service, because the documents were sensitive medical records. It says that using Ghostscript commands such as pdf2ps and ps2pdf reduced the file by about 30–50% with no visible quality loss, and concludes by warning that the commands may overwrite files, so a backup copy should be made first."
---

I recently had to submit an online government form that limited file size uploads of supporting documents to 3 MB. By the time I was done compiling my documents, it was 12 MB, well over that limit.

Naturally, looked for solutions to compress the documents! But I didn't want to use an online tool for privacy and security reasons. I was trying to upload sensitive medical documents to the government.

With some googling, I found the solution that involved running two Terminal commands to compress a file. I followed a simple tutorial by [Greg Pittman](https://opensource.com/article/20/8/reduce-pdf):

```
pdf2ps -dLanguageLevel=3 viral_test_results.pdf

ps2pdf -dPDFSETTINGS=/ebook viral_test_results.ps
```

With these settings, I managed to reduce my PDF by around 30-50% without a visible drop in quality.

Those commands -- `pdf2ps` and `ps2pdf` -- are part of Ghostscript. What is [Ghostscript](https://www.ghostscript.com/), though, and how do you get it? Greg's tutorial hadn't mentioned that.

To get Ghostscript for your computer, if you are using macOS, you can use [homebrew](https://brew.sh/). I learned that from [VikingOSX's answer](https://discussions.apple.com/thread/8584571) on the Apple forums:

```
brew update
brew upgrade
brew install ghostscript
brew cleanup
```

If you are using Windows, you can download the program directly from Ghostscript's [downloads](https://www.ghostscript.com/download/gsdnld.html) page. The command line commands may differ from the above.

Careful: The command may overwrite files. Consider making a copy of your file before running commands on it just in case something goes wrong!
