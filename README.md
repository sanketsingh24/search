# TapSearch

[Visit here to use this app](https://tapsearchsanketsingh24.herokuapp.com/)

Simple program that achieves these objectives-
1. It takes in multiple paragraphs of text, assigns a unique ID To each paragraph and stores the words to paragraph mappings on an inverted index. This is similar to what elasticsearch does. This paragraph can also be referred to as a ‘document’

2. Given a word to search for, it lists out the top 10 paragraphs in which the word is present

### Tech Stack
- Node.js
- Express
- Multer
- pdfreader

### Features
- Text Search 
- PDF Option Available

### Instructions for running
1. ```git clone``` the repository.
2. Install dependencies using ```npm install```.
3. Run the app using ```npm start```. To run in debug mode, run ```npm debug```.
4. Open [```http://127.0.0.1:4000/```](http://127.0.0.1:4000/)
