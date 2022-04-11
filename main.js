import { Command } from 'commander';
import fetch from 'node-fetch';
import signale from 'signale';
import cheerio from 'cheerio';

const rating_to_stars = {
    'didnot like it': 1,
    'it was ok': 2,
    'liked it': 3,
    'really liked it': 4,
    'it was amazing': 5,
}

const fold = (reducer, init, xs) => {
    let acc = init;
    for (const x of xs) {
        acc = reducer(acc, x);
    }
    return acc;
};

const getRawHtml = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  return html;
}

const main = async (url) => {
    signale.success('Scraping started');
    signale.info(`fetching goodreads profile from ${url}`);
    const html = await getRawHtml(url);
    signale.success('Fetched goodreads profile');
    signale.info('Parsing html');
    
    const $ = cheerio.load(html);
    
    const read_books = $('.bookalike.review')
        .map((_, table) => {
            const reviews = table.children
                .filter(row => $(row).attr('style') != 'display: none')
                .map(row => $(row).text())
                .map(row => 
                    row.split('\n')
                        .map(tok => tok.trim())
                        .filter(tok => tok != '')
                )
                .map(row => ({key: row[0], value: row[1]}))
                .filter(row => row.key && row.value)
                
            return fold((acc, row) => {
                acc[row.key] = row.value;
                return acc;
            }, {}, reviews);

        }).get()
    
    console.log(read_books);
    
    signale.info(`Found ${read_books.length} completed books`);
}

const program = new Command()
program
    .version('0.0.1')
    .argument('<url>', 'The url of a Goodreads profile')
    .parse();

main(program.args[0]);
