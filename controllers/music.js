

const { arrayBufferToBase64, base64ToFile, upload_cloud,makeid } = require('../helpers/utility');
const NodeID3 = require('node-id3')
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const { Musics } = require('../models/account');
const  fs = require('fs');
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const path = require('path');






 const getupload = async (req, res) => {
    res.render('pages/form-upload');
};


const test = async (req, res) => {
    res.render('pages/test');
};



 const musicform = async (req, res) => {
    res.render('pages/music-form');
};


const audiotest = async(req, res) => {
    const  account = req.cookies.id;
    const music = await Musics.findAll({where:{
        account: account
    }})
    res.render("pages/audiotest", {music})
}


const search = async(req, res) => {
    let {searchQuery} = req.query;
    const musics = await Musics.findAll({
        limit: 50,
        where: {
            [Op.or]: [
            {title: { [Op.like]: '%' + searchQuery + '%' }},
            {comment: { [Op.like]: '%' + searchQuery + '%' }},
            {album: { [Op.like]: '%' + searchQuery + '%' }},
            {genre: { [Op.like]: '%' + searchQuery + '%' }},
            {composer: { [Op.like]: '%' + searchQuery + '%' }},
           
            ]
          }
    })
    // console.log(musics)

const searchListFirst = [];
const searchList = [];

for (let value of musics) {
    searchListFirst.push(value.dataValues)
}



for(let key of searchListFirst){
    const keys = Object.keys(key);
    // console.log(keys)
    for(let realkey of keys){
        if (realkey === "album" || realkey === "title" || realkey==="genre"|| realkey==="composer" || realkey==="comment") {
            searchList.push(key[realkey]);
          }
    }
}

const filteredArr = searchList.filter(str => str !== "");
const search = [...new Set(filteredArr)];
console.log(search)

    res.render("pages/search-results", {musics, search})
}





 const filemedia = async (req, res) => {
  const  account = req.cookies.id;
    const musics = await Musics.findAll({where:{
        account: account
    }})




    const searchListFirst = [];
    const searchList = [];
    
    for (let value of musics) {
        searchListFirst.push(value.dataValues)
    }
    
    
    
    for(let key of searchListFirst){
        const keys = Object.keys(key);
        // console.log(keys)
        for(let realkey of keys){
            if (realkey === "album" || realkey === "title" || realkey==="genre"|| realkey==="composer" || realkey==="comment") {
                searchList.push(key[realkey]);
              }
        }
    }
    
    const filteredArr = searchList.filter(str => str !== "");
    const search = [...new Set(filteredArr)];
    
        res.render('pages/file-media', {musics, search})
    };



const musicplayer = async (req, res) => {
      res.render('pages/musicplayer');
  };




 const upload = async (req, res) => {
    let finalresult;
    if (req.file) {
        try {
            ffprobe(req.file.path.replace(/ /g, "_"), { path: ffprobeStatic.path })
                .then(async (info) => {
                    // console.log(info.stream[0].duration)
                    //   Extract the duration of the audio file from the metadata
                    const durationSeconds = info.streams[0].duration;
                    // Convert the duration to minutes and seconds
                    const minutes = Math.floor(durationSeconds / 60);
                    const seconds = Math.floor(durationSeconds % 60);
                    //   Print the duration in minutes and seconds
                    await NodeID3.read(req.file.path.replace(/ /g, "_"), async function (err, tags) {

                        if (!err) {
                            try {

                                const result = await upload_cloud(req.file.path.replace(/ /g, "_"));
                                // fs.unlink(req.file.path.replace(/ /g, "_"));

                                const arrayBuffer = new Uint8Array(tags.image.imageBuffer).buffer;
                                const base64String = arrayBufferToBase64(arrayBuffer);
                                const resultbase = await base64ToFile(base64String, `./image/${makeid(5)}.jpg`);

                                // console.log(tags)
                                console.log({
                                    genre: tags.genre?tags.genre:"",
                                    trackNumber: tags.trackNumber?tags.trackNumber:"",
                                    year: tags.year?tags.year:"",
                                    title: tags.title?tags.title:"",
                                    performerInfo: tags.performerInfo?tags.performerInfo:"",
                                    album: tags.album?tags.album:"",
                                    secure_url: result.secure_url?result.secure_url:"",
                                    length: `${minutes}:${seconds}`??"",
                                    imageBuffer: resultbase.secure_url?resultbase.secure_url:"",
                                    comment: tags.comment?tags.comment.text.toString():"", 
                                    composer: tags.composer?tags.composer.toString():"",
                                })

                                res.send({
                                    upload: true,
                                    date: {
                                        genre: tags.genre?tags.genre:"",
                                        trackNumber: tags.trackNumber?tags.trackNumber:"",
                                        year: tags.year?tags.year:"",
                                        title: tags.title?tags.title:"",
                                        performerInfo: tags.performerInfo?tags.performerInfo:"",
                                        album: tags.album?tags.album:"",
                                        secure_url: result.secure_url?result.secure_url:"",
                                        length: `${minutes}:${seconds}`??"",
                                        imageBuffer: resultbase.secure_url?resultbase.secure_url:"",
                                        comment: tags.comment?tags.comment.text.toString():"", 
                                        composer: tags.composer?tags.composer.toString():"",
                                    }
                                });
                            } catch (error) {
                                console.error(error);
                                res.send({ upload: false })
                            }
                        } else {
                            console.error(err);
                            res.send({ upload: false })
                        }
                    })

                })
                .catch((err) => {
                    console.error(err);
                    res.send({ upload: false })
                });

        } catch (error) {
            console.error(error);
            res.send({ upload: false })
        }
    }
}




 const uploadmusicform = async (req, res) => {
    let { secure_url, trackNumber, length, album, year, title, imageBuffer, genre, comment, composer } = req.body;
    // console.log(secure_url)
//      const arrayBuffer = new Uint8Array(imageBuffer).buffer;
//    const base64String = arrayBufferToBase64(arrayBuffer);
//    const result = await base64ToFile(base64String, './image/main.jpg');
   
    const userId = req.cookies.id;

    if (!secure_url && !trackNumber && !length && !album && !year && !title && imageBuffer&& genre && comment && composer ) {
        res.send({ upload: false, message: "field is required" })
    } else {
     
            const inserData = { secure_url,genre, trackNumber, length, album, year, title, imageBuffer, account:userId, comment , composer }
             await Musics.create(inserData)
            res.send({ upload: true, message: "upload succefully" })
      
    }

};



module.exports ={
    upload,
    filemedia,
    uploadmusicform,
    getupload,
    musicform,
    musicplayer,
    test,
    audiotest,
    search,
   
}