const items = [{
        "volumeInfo": {
            "authors": ["AAA", "BBB", "CCC"],
            "publishedDate": "2015"
        }
    },
    {
        "volumeInfo": {
            "authors": ["DDD"],
            "publishedDate": "2015-03"
        }
    },
    {
        "volumeInfo": {
            "authors": ["BBB"],
            "publishedDate": "2015"
        }
    },
    {
        "volumeInfo": {
            "authors": ["CCC"],
            "publishedDate": ""
        }
    },
    {
        "volumeInfo": {
            "publishedDate": "2014-01-01"
        }
    },
    {
        "volumeInfo": {
            "authors": []
        }
    }

]

const funcPublicationDate = (items) => {
  let earliestDate = "";
  let mostRecentDate = "";
  const res = [];  

  for (let item of items) {
      let publishedDate = item.volumeInfo.publishedDate;
      if (publishedDate && publishedDate !== "") {
          let date = new Date(publishedDate);
          // setting earliest date.
          if (earliestDate !== "") {
              if (date < earliestDate) {
                  earliestDate = date;
              }
          } else {
              earliestDate = date;
          }

          // setting most recent date.
          if (mostRecentDate !== "") {
              if (date > mostRecentDate) {
                  mostRecentDate = date;
              }
          } else {
              mostRecentDate = date;
          }
      }
    }
    earliestDate = earliestDate.toISOString().slice(0, 10)
    mostRecentDate = mostRecentDate.toISOString().slice(0, 10)
    res.push(earliestDate, mostRecentDate)
    return res;
  }
console.log(funcPublicationDate(items))


const funcMaxAuthor = (items) => {
    let authorCounter = new Map();
    let maxCount = 0;
    let maxAuthor = "";

    for (let item of items) {

        let authorsArr = item.volumeInfo.authors;
        if (authorsArr && authorsArr.length !== 0) {
            for (let author of authorsArr) {
                if (authorCounter.has(author)) {
                    authorCounter.set(author, authorCounter.get(author) + 1);
                } else {
                    authorCounter.set(author, 1);
                }
                if (authorCounter.get(author) > maxCount) {
                    maxCount = authorCounter.get(author);
                    maxAuthor = author;
                }
            }
        }
    }
    return maxAuthor
}
console.log(funcMaxAuthor(items))


let str;
console.log(str == null)
console.log(str === null)