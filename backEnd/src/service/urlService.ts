import { Url } from "../models/urlModel.js";
import { prisma } from "../utils/prisma.js";

export class urlService
{
    private caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    //sorteando quantidade de caracter para a url curta
    async sortLength(min: number, max: number): Promise<number>
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //sorteando os caracteres para a url curta
    async sortUrl(length: number): Promise<string>
    {
        let urlShort = "";

        for(let i=0; i < length; i++)
        {
            const randomIndex = Math.floor(Math.random() * this.caracteres.length);
            urlShort = urlShort + this.caracteres[randomIndex];
        }

        return urlShort;
    }

    //verificar se a url curta já existe no banco de dados
    async existsUrl(urlShort: string): Promise<boolean>
    {
        const url = await prisma.url.findUnique({
            where: { urlShort }
        });

        if(!url)
            return false;

        return true;
    }

    //criar url curta baseada em uma url longa
    async createUrlShort(urlLong: string, expiresAt: Date): Promise<String>
    {
        do
        {
            var urlShort = await this.sortUrl(await this.sortLength(5, 10));
        }while(await this.existsUrl(urlShort));

        const domain = "http://encurtador.com/" + urlShort;

        const url = await prisma.url.create({
            data: {
                urlShort,
                urlLong,
                expiresAt
            }
        });

        return domain;
    }

    //fazer o redirecionamento para a url longa
    async redirectUrlShort(urlShort: string): Promise<string | null>
    {
        const url = await prisma.url.findUnique({
            where: { urlShort }
        });
        
        if(!url)
            return null;

        if(url.expiresAt < new Date())
            return null;

        return url.urlLong;
    }
}

