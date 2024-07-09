
const process = require('node:process');
const fs = require('node:fs/promises');

const {parse: csvParse} = require('csv-parse/sync');

const compStrings = new Intl.Collator('en-us', {sensitivity: 'base'}).compare; // , ignorePunctuation: true

/**
 * Compares 2 product records by publisher then title.
 *
 * Used in sort function to sort.
 *
 * @param {"Publisher Name": string, "Product title": string} a
 * @param {"Publisher Name": string, "Product title": string} b
 * @returns {number}
 */
function compRecords(a, b) {
  const publisherA = a["Publisher Name"];
  const titleA = a["Product title"];

  const publisherB = b["Publisher Name"];
  const titleB = b["Product title"];

  const pubCompare = compStrings(publisherA, publisherB);
  if (pubCompare === 0) {
    return compStrings(titleA, titleB);
  }
  return pubCompare;
}

/**
 * Generates a string describing the record.
 *
 * @param {"Publisher Name": string, "Product title": string} a
 * @returns {string}
 */
function recordToString(a) {
  return `Publisher Name: ${a["Publisher Name"]}, Product title: ${a["Product title"]}`
}

(async (path) => {
  console.log('check-csv-order: started.');

  const fileContents = await fs.readFile(path, {encoding: 'utf8'});

  // Parse CSV rows into object records.
  const records = csvParse(fileContents, {columns: true});
  // console.log('records: ', records);

  // Sort records
  const recordsSorted = records.toSorted(compRecords);
  // console.log('recordsSorted: ', recordsSorted);

  // Compare input records to sorted records, exit with process error on first difference.
  for (let i = 0; i < records.length; i++) {
    if (compRecords(records[i], recordsSorted[i]) !== 0) {
      console.log(`Mismatch on record ${i}:\n input: "${recordToString(records[i])}"\nsorted: "${recordToString(recordsSorted[i])}"`)
      process.exit(1);
    }
  }
  console.log(`check-csv-order: finished, ${path} is correctly ordered.`);
})('fate-product-list.csv');


