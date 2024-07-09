# Fate Product List

The contents of `fate-product-list.csv` is used to run the [Fate SRD Product page](https://fate-srd.com/products).

## The simple way to add your product

Fill out the form at [Add your Fate product to the list](https://docs.google.com/forms/d/e/1FAIpQLScS3fgz0UWqSSlx7f0hkrtb_-y-HFOsD8bDx576aUkrdiZq5w/viewform?usp=sf_link).

If you have multiple links or need to update a product, consider creating an issue or a pull request.

The submission will be reviewed and added to the Fate SRD. This usually happens in a few hours but may take as long as a few days.

## For complex changes to your product listing(s), skip the form and either create an issue or make your own changes

### Making your own changes with a pull request

If you are comfortable with editing files and git/Github, you may [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It will be reviewed and added to the site.

There is a Github check configured to ensure the CSV file is in the expected order. This check is implemented a small
Javascript script that runs under [Nodejs](https://nodejs.org/) version 20.x, which is required. You will get a warning
from `npm` if you try this with older versions of Nodejs.

To check the CSV file order locally, before you push your changes to Github, you must have a current version of Nodejs 
installed, then run the following commands.

```bash
npm install
npm test
```

Example output of successful test:
```
% npm test

> fate-product-list@1.0.0 test
> node scripts/check-csv-order.js

check-csv-order: started.
check-csv-order: finished, fate-product-list.csv is correctly ordered.
%
```

Example output of unsuccessful test:
```
% npm test

> fate-product-list@1.0.0 test
> node scripts/check-csv-order.js

check-csv-order: started.
Mismatch on record 222:
 input: "Publisher Name: Modiphius, Product title: Mindjammer: The Mindjammer Companion"
sorted: "Publisher Name: Modiphius, Product title: Mindjammer: The Core Worlds Sourcebook"
%
```

### Submitting an issue

1. Be logged into Github.
2. [Create a new issue.](https://github.com/fate-srd/fate-product-list/issues/new/choose)
3. Choose the appropriate issue template and fill it out.
4. Submit the issue.

## An important note about DriveThruRPG links

The Fate SRD is financially supported by using DriveThruRPG affiliate links. All DriveThruRPG links in this repo and on the site will use the Fate SRD's affiliate code.

This repo is provided freely to the community. If you use this for your own project and want to change the affiliate code, that is okay.
