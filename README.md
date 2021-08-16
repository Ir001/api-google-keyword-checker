# API Google Keyword Checker

API Google Keyword Checker adalah tools sederhana untuk mendapatkan informasi jumlah hasil query dari keyword.
![Image](https://github.com/Ir001/api-google-keyword-checker/blob/main/API-Google-Keyword-Checker.png?raw=true)

## Installation

Use the package manager [NodeJS](https://nodejs.org/en/download/) to install API Google Keyword Checker.

```bash
git clone git@github.com:Ir001/api-google-keyword-checker.git
cd api-google-keyword-checker
npm install
npm start

```

## Usage

```bash
curl --location --request POST 'http://localhost:3000/api/' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "keywords" :[
        "irwan antonio",
        "other keywords"
    ]
}'
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
