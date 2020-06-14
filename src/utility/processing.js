const fs = require('fs')
const articleArr = ['goodbye-clean-code','my-decade-in-review','whats-the-react-team-principle']
for (let i = 0; i < articleArr.length; i++) {
    const artileTitle = articleArr[i];
    fs.readFile('../content/' + artileTitle + '.md','utf-8',(err,data) => {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(artileTitle+'.txt',JSON.stringify(data),err => {
                if (err) {
                    console.log(err);
                    return ;
                }
            });
        }
    })
    
}
