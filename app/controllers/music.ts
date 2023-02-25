
import { Request, Response } from 'express';
import { arrayBufferToBase64, base64ToFile, upload_cloud } from '../helpers/utility';
const NodeID3 = require('node-id3')
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
import { Musics } from '../models/music';
import * as fs from 'fs';
import * as path from 'path';






export const getupload = async (req: Request, res: Response) => {
    res.render('pages/form-upload');
};

export const musicform = async (req: Request, res: Response) => {
    res.render('pages/music-form');
};

export const filemedia = async (req: Request, res: Response) => {
  const  account = req.cookies.id;
    const musics = await Musics.findAll({where:{
        account: account
    }})
    res.render('pages/file-media', {musics});

};




export const upload = async (req: Request, res: Response) => {
    let finalresult: string;
    if (req.file) {
        try {
            ffprobe(req.file.path.replace(/ /g, "_"), { path: ffprobeStatic.path })
                .then(async (info: any) => {
                    // console.log(info.stream[0].duration)
                    //   Extract the duration of the audio file from the metadata
                    const durationSeconds = info.streams[0].duration;
                    // Convert the duration to minutes and seconds
                    const minutes = Math.floor(durationSeconds / 60);
                    const seconds = Math.floor(durationSeconds % 60);
                    //   Print the duration in minutes and seconds
                    await NodeID3.read(req.file!.path.replace(/ /g, "_"), async function (err: any, tags: any) {

                        if (!err) {
                            try {

                                const result = await upload_cloud(req.file!.path.replace(/ /g, "_"));

                                const arrayBuffer = new Uint8Array(tags.image.imageBuffer).buffer;
                                const base64String = arrayBufferToBase64(arrayBuffer);
                                const resultbase = await base64ToFile(base64String, './image/main.jpg');

                                // console.log(tags)
                                console.log({
                                    genre: tags.genre,
                                    trackNumber: tags.trackNumber,
                                    year: tags.year,
                                    title: tags.title,
                                    performerInfo: tags.performerInfo,
                                    album: tags.album,
                                    secure_url: result.secure_url,
                                    length: `${minutes}:${seconds}`,
                                    imageBuffer: resultbase.secure_url,
                                    comment: tags.comment.text.toString(), 
                                    composer: tags.composer.toString(),
                                })

                                res.send({
                                    upload: true,
                                    date: {
                                        genre: tags.genre,
                                        trackNumber: tags.trackNumber,
                                        year: tags.year,
                                        title: tags.title,
                                        performerInfo: tags.performerInfo,
                                        album: tags.album,
                                        secure_url: result.secure_url,
                                        length: `${minutes}:${seconds}`,
                                        imageBuffer: resultbase.secure_url,
                                        comment: tags.comment.text.toString(), 
                                        composer: tags.composer.toString(),
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




export const uploadmusicform = async (req: Request, res: Response) => {
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



export default {
    upload,
    filemedia,
    uploadmusicform,
    getupload
}