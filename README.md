# Goodreads Scraper

As of December 2020, [Amazon is no longer supplying Goodreads API keys](https://help.goodreads.com/s/article/Does-Goodreads-support-the-use-of-APIs).

I wanted to pull a list of all of my read books, so here we are.. 


## Usage

```text
Usage: main [options] <url>

Arguments:
  url            The url of a Goodreads profile

Options:
  -V, --version  output the version number
  -h, --help     display help for command
```

## Example

```text
node main.js https://www.goodreads.com/review/list/{insert_user_id_here}?shelf=read
```
